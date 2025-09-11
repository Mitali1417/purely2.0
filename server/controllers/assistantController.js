const axios = require("axios");
const User = require("../models/userModel");

const suggestWithRules = (products, context) => {
  const { category, search, profile } = context;
  const searchLower = (search || "").toLowerCase();
  
  // Enhanced filtering with better keyword matching
  return products.filter((p) => {
    const matchesCategory = category ? (p?.category || "") === category : true;
    
    // Create a comprehensive search string
    const searchString = `${p?.productName || ""} ${p?.brand || ""} ${p?.category || ""}`.toLowerCase();
    
    // If no search term, return all products that match category
    if (!searchLower) return matchesCategory;
    
    // Check if any search keyword matches
    const searchKeywords = searchLower.split(/\s+/).filter(word => word.length > 2);
    const matchesSearch = searchKeywords.some(keyword => searchString.includes(keyword));
    
    // Profile-based rules
    if (profile?.skinType === "sensitive" && searchString.includes("fragrance")) return false;
    
    return matchesCategory && matchesSearch;
  })
  .sort((a, b) => {
    // Sort by relevance - products with more keyword matches first
    const aScore = getRelevanceScore(a, searchLower);
    const bScore = getRelevanceScore(b, searchLower);
    return bScore - aScore;
  })
  .slice(0, 6);
};

// Helper function to calculate relevance score
const getRelevanceScore = (product, searchTerm) => {
  if (!searchTerm) return 0;
  
  const searchString = `${product?.productName || ""} ${product?.brand || ""} ${product?.category || ""}`.toLowerCase();
  const keywords = searchTerm.split(/\s+/).filter(word => word.length > 2);
  
  let score = 0;
  keywords.forEach(keyword => {
    if (searchString.includes(keyword)) {
      score += 1;
      // Bonus points for exact matches in product name
      if ((product?.productName || "").toLowerCase().includes(keyword)) {
        score += 2;
      }
      // Bonus points for brand matches
      if ((product?.brand || "").toLowerCase().includes(keyword)) {
        score += 1;
      }
    }
  });
  
  return score;
};

const generateBeautyResponse = (userMessage, tags = []) => {
  const message = userMessage.toLowerCase();
  const allText = [...tags, message].join(' ').toLowerCase();
  
  // Determine concern type
  const hairKeywords = ['hair', 'scalp', 'dandruff', 'bald', 'thinning', 'frizz', 'split ends', 'hair loss', 'shampoo', 'conditioner'];
  const bodyKeywords = ['body', 'back', 'chest', 'arms', 'legs', 'stretch marks', 'body acne', 'exfoliate', 'body lotion'];
  const skinKeywords = ['skin', 'face', 'acne', 'pimple', 'blackhead', 'whitehead', 'dry', 'oily', 'sensitive', 'wrinkle', 'dark spot', 'pigmentation', 'moisturizer', 'cleanser', 'serum'];
  
  const hairScore = hairKeywords.filter(keyword => allText.includes(keyword)).length;
  const bodyScore = bodyKeywords.filter(keyword => allText.includes(keyword)).length;
  const skinScore = skinKeywords.filter(keyword => allText.includes(keyword)).length;
  
  let concernType = 'skin';
  if (hairScore > bodyScore && hairScore > skinScore) concernType = 'hair';
  else if (bodyScore > skinScore) concernType = 'body';
  
  // Generate appropriate response
  let response = "I understand your concern. ";
  
  if (concernType === 'skin') {
    if (allText.includes('acne') || allText.includes('pimple')) {
      response += "For acne concerns, I recommend using a gentle cleanser with salicylic acid and a non-comedogenic moisturizer. ";
    } else if (allText.includes('dry')) {
      response += "For dry skin, focus on hydrating products with hyaluronic acid and ceramides. ";
    } else if (allText.includes('oily')) {
      response += "For oily skin, use oil-free products and lightweight moisturizers. ";
    } else {
      response += "For your skin concern, I'll recommend some gentle, effective products. ";
    }
  } else if (concernType === 'hair') {
    if (allText.includes('hair loss') || allText.includes('thinning')) {
      response += "For hair loss concerns, I recommend strengthening shampoos and scalp treatments. ";
    } else if (allText.includes('dandruff')) {
      response += "For dandruff, look for anti-fungal shampoos with zinc pyrithione or ketoconazole. ";
    } else {
      response += "For your hair concern, I'll suggest some nourishing hair care products. ";
    }
  } else if (concernType === 'body') {
    if (allText.includes('body acne')) {
      response += "For body acne, use gentle exfoliating products and non-comedogenic body washes. ";
    } else if (allText.includes('dry') || allText.includes('rough')) {
      response += "For dry body skin, use rich moisturizers and gentle exfoliants. ";
    } else {
      response += "For your body care concern, I'll recommend some effective products. ";
    }
  }
  
  response += "Here are some products that should help address your specific needs.";
  
  return response;
};

exports.suggest = async (req, res) => {
  try {
    const { messages, filters } = req.body || {};
    const user = await User.findById(req.user.id).select("profile");

    // Get the latest user message
    const latestMessage = messages && messages.length > 0 ? messages[messages.length - 1] : null;
    const userMessage = latestMessage?.content || latestMessage?.text || "";

    // Fetch products directly from database
    const ProductList = require("../models/productListModel");
    const products = await ProductList.find({}).limit(100); // Get up to 100 products

    const apiKey = process.env.LLM_API_KEY || "";
    let tags = [];
    let reply = "";

    if (!apiKey || !process.env.LLM_API_URL) {
      // Fallback to rule-based system
      reply = generateBeautyResponse(userMessage);
      const recs = suggestWithRules(products, { ...filters, search: userMessage, profile: user?.profile || {} });
      
      return res.json({ 
        source: "rules", 
        reply, 
        recommendations: recs,
        tags: extractKeywords(userMessage)
      });
    }

    try {
      // Try to use LLM API
      const url = process.env.LLM_API_URL || "";
      const systemPrompt = "You are a beauty and skincare recommendation assistant. Reply with JSON: {\"message\": string, \"tags\": string[]} where tags are keywords to filter products. Be helpful and empathetic.";
      const contextParts = [
        `User profile: ${JSON.stringify(user?.profile || {})}`,
        `Filters: ${JSON.stringify(filters || {})}`,
        `Available product categories: ${[...new Set(products.map(p => p.category))].join(', ')}`,
        `Available brands: ${[...new Set(products.map(p => p.brand))].join(', ')}`
      ];
      const convo = (messages || []).slice(-6).map(m => `${m.role}: ${m.content || m.text || ""}`).join("\n");
      
      const llmPayload = {
        contents: [
          { role: "user", parts: [{ text: systemPrompt }] },
          { role: "user", parts: [{ text: contextParts.join("\n") }] },
          { role: "user", parts: [{ text: convo }] },
        ],
        generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
      };
      
      const llmResp = await axios.post(url, llmPayload, { 
        headers: { "Content-Type": "application/json" }, 
        params: { key: apiKey } 
      });
      
      const text = llmResp.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
      
      // Try to extract JSON object from text
      const start = text.indexOf('{');
      const end = text.lastIndexOf('}');
      if (start !== -1 && end !== -1 && end > start) {
        try {
          const parsed = JSON.parse(text.slice(start, end + 1));
          if (typeof parsed.message === "string") reply = parsed.message;
          if (Array.isArray(parsed.tags)) tags = parsed.tags.filter(Boolean);
        } catch (parseError) {
          console.log("Failed to parse LLM response as JSON, using raw text");
          reply = text;
        }
      } else {
        reply = text || generateBeautyResponse(userMessage);
      }

    } catch (llmError) {
      console.log("LLM API error, falling back to rule-based system:", llmError.message);
      reply = generateBeautyResponse(userMessage);
    }

    // Generate recommendations
    const search = tags.length > 0 ? tags.join(" ") : userMessage;
    const recs = suggestWithRules(products, { ...filters, search, profile: user?.profile || {} });
    

    
    return res.json({ 
      source: "llm", 
      tags: tags.length > 0 ? tags : extractKeywords(userMessage), 
      reply, 
      recommendations: recs 
    });
    
  } catch (err) {
    console.error("Assistant suggest error", err?.response?.data || err);
    return res.status(200).json({ 
      source: "fallback", 
      reply: "I'm having trouble processing your request right now. Please try again or describe your concern in a different way.", 
      recommendations: [],
      tags: []
    });
  }
};

// Helper function to extract keywords from user message
const extractKeywords = (message) => {
  const keywords = [];
  const messageLower = message.toLowerCase();
  
  // Common beauty keywords that might match product names/categories
  const beautyKeywords = [
    // Skin care terms
    'acne', 'pimple', 'blackhead', 'whitehead', 'dry', 'oily', 'sensitive', 'wrinkle', 
    'dark spot', 'pigmentation', 'moisturizer', 'cleanser', 'serum', 'sunscreen',
    'face', 'skin', 'cream', 'lotion', 'gel', 'foam', 'wash', 'toner',
    
    // Hair care terms
    'hair', 'scalp', 'dandruff', 'hair loss', 'thinning', 'frizz', 'split ends',
    'shampoo', 'conditioner', 'oil', 'mask', 'treatment', 'serum',
    
    // Body care terms
    'body', 'exfoliate', 'body acne', 'stretch marks', 'body lotion', 'scrub',
    'back', 'chest', 'arms', 'legs', 'feet', 'hands',
    
    // General terms
    'beauty', 'care', 'treatment', 'repair', 'nourish', 'hydrate', 'moisturize'
  ];
  
  beautyKeywords.forEach(keyword => {
    if (messageLower.includes(keyword)) {
      keywords.push(keyword);
    }
  });
  
  // Also add individual words from the message (longer than 3 characters)
  const words = messageLower.split(/\s+/).filter(word => word.length > 3);
  keywords.push(...words);
  
  return [...new Set(keywords)]; // Remove duplicates
};


