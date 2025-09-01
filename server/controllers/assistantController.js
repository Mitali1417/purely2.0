const axios = require("axios");
const User = require("../models/userModel");

const suggestWithRules = (products, context) => {
  const { category, search, profile } = context;
  const searchLower = (search || "").toLowerCase();
  return products.filter((p) => {
    const matchesCategory = category ? (p?.category || "") === category : true;
    const hay = `${p?.productName || ""} ${p?.productDescription || ""}`.toLowerCase();
    const matchesSearch = searchLower ? hay.includes(searchLower) : true;
    // Profile-based naive rules
    if (profile?.skinType === "sensitive" && hay.includes("fragrance")) return false;
    return matchesCategory && matchesSearch;
  }).slice(0, 12);
};

exports.suggest = async (req, res) => {
  try {
    const { messages, filters } = req.body || {};
    const user = await User.findById(req.user.id).select("profile");

    // Fetch products from existing API internally
    const base = process.env.CLIENT_URL?.replace(/:\d+$/, ":5003") || "http://localhost:5003";
    const prodResp = await axios.get(`${base}/api/products`);
    const products = Array.isArray(prodResp.data) ? prodResp.data : [];

    const apiKey = process.env.LLM_API_KEY || "";

    if (!apiKey) {
      const recs = suggestWithRules(products, { ...filters, profile: user?.profile || {} });
      return res.json({ source: "rules", reply: "AI key missing; returning best matches.", recommendations: recs });
    }

    let tags = [];
    let reply = "";

    // Gemini generateContent
    const url = process.env.LLM_API_URL || "";
    const systemPrompt = "You are a skincare recommendation assistant. Reply with JSON: {\"message\": string, \"tags\": string[]} where tags are keywords to filter products.";
    const contextParts = [
      `User profile: ${JSON.stringify(user?.profile || {})}`,
      `Filters: ${JSON.stringify(filters || {})}`,
    ];
    const convo = (messages || []).slice(-6).map(m => `${m.role}: ${m.content || m.text || ""}`).join("\n");
    const geminiPayload = {
      contents: [
        { role: "user", parts: [{ text: systemPrompt }] },
        { role: "user", parts: [{ text: contextParts.join("\n") }] },
        { role: "user", parts: [{ text: convo }] },
      ],
      generationConfig: { temperature: 0.3 },
    };
    const llmResp = await axios.post(url, geminiPayload, { headers: { "Content-Type": "application/json" }, params: { key: apiKey } });
    const text = llmResp.data?.candidates?.[0]?.content?.parts?.[0]?.text || "";
    reply = text;
    // Try to extract JSON object from text
    const start = text.indexOf('{');
    const end = text.lastIndexOf('}');
    if (start !== -1 && end !== -1 && end > start) {
      try {
        const parsed = JSON.parse(text.slice(start, end + 1));
        if (typeof parsed.message === "string") reply = parsed.message;
        if (Array.isArray(parsed.tags)) tags = parsed.tags.filter(Boolean);
      } catch {}
    }

    const search = tags.join(" ");
    const recs = suggestWithRules(products, { ...filters, search, profile: user?.profile || {} });
    return res.json({ source: "llm", tags, reply, recommendations: recs });
  } catch (err) {
    console.error("Assistant suggest error", err?.response?.data || err);
    return res.status(200).json({ source: "fallback", reply: "Issue contacting AI; please try again.", recommendations: [] });
  }
};


