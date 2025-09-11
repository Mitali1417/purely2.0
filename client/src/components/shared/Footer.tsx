import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";
import { Heart, Mail, Phone, MapPin, Instagram, Twitter, Facebook } from 'lucide-react';
import api from '@/api';
import { getResizedImageUrl } from "@/utils/getResizedImageUrl";

interface Category {
  name: string;
  count: number;
}

// Helper function to append resize parameters safely
const getResizedImageUrl = (url: string, width: number, height: number) => {
  if (!url) return "/placeholder-image.jpg";
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}w=${width}&h=${height}&fit=cover`;
};

const Footer = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/products/categories');
        setCategories(response.data.slice(0, 12)); // Show only first 12 categories
      } catch (error) {
        console.error('Error fetching categories:', error);
        // Fallback categories
        setCategories([
          { name: 'cleansers', count: 0 },
          { name: 'moisturizers', count: 0 },
          { name: 'serums', count: 0 },
          { name: 'sunscreens', count: 0 },
          { name: 'shampoo', count: 0 },
          { name: 'conditioner', count: 0 },
          { name: 'foundation', count: 0 },
          { name: 'lipstick', count: 0 }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const getCategoryDisplayName = (name: string) => {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  return (
    <footer className="bg-foreground/80 text-gray-300 mt-4 md:mt-8">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center space-x-2">
             <img
              src={getResizedImageUrl("/logo.png", 32, 32)}
              alt="logo"
              width={32}
              height={32}
              loading="lazy"
              decoding="async"
              className="w-[32px] h-[32px] object-cover rounded-full"
              onError={(e) => { e.currentTarget.src = "/placeholder-image.jpg"; }}
            />
              <span className="text-xl font-bold text-white">Purely</span>
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed">
              Your trusted destination for premium beauty and skincare products. 
              Discover the perfect routine for your unique skin and hair needs.
            </p>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Quick Links</h3>
            <ul className="space-y-2">
              <li><Link to="/" className="text-xs text-gray-400 hover:text-white transition-colors">Home</Link></li>
              <li><Link to="/about" className="text-xs text-gray-400 hover:text-white transition-colors">About</Link></li>
              {/* <li><Link to="/guide" className="text-xs text-gray-400 hover:text-white transition-colors">Guide</Link></li> */}
              <li><Link to="/mira" className="text-xs text-gray-400 hover:text-white transition-colors">Assistant</Link></li>
              <li><Link to="/wishlist" className="text-xs text-gray-400 hover:text-white transition-colors">Wishlist</Link></li>
              <li><Link to="/cart" className="text-xs text-gray-400 hover:text-white transition-colors">Cart</Link></li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Categories</h3>
            {loading ? (
              <div className="text-xs text-gray-400">Loading categories...</div>
            ) : (
              <div className="grid grid-cols-2 gap-1">
                {categories.map((category) => (
                  <Link
                    key={category.name}
                    to={`/categories/${category.name}`}
                    className="text-xs text-gray-400 hover:text-white transition-colors truncate"
                  >
                    {getCategoryDisplayName(category.name)}
                  </Link>
                ))}
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-white uppercase tracking-wider">Contact</h3>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Mail className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-400">mitali9205@gmail.com</span>
              </div>
              <div className="flex items-center space-x-2">
                <MapPin className="h-3 w-3 text-gray-400" />
                <span className="text-xs text-gray-400">Haryana, India</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-background/20 mt-8 pt-6">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-2 md:space-y-0">
            <div className="text-xs text-gray-400">
              © {new Date().getFullYear()} Purely. All rights reserved.
            </div >
            <div className="text-xs text-gray-400">
              Made with 🤍 by Mitali
            </div>
            {/* <div className="flex space-x-6">
              <Link to="/privacy" className="text-xs text-gray-400 hover:text-white transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-xs text-gray-400 hover:text-white transition-colors">
                Terms of Service
              </Link>
              <Link to="/shipping" className="text-xs text-gray-400 hover:text-white transition-colors">
                Shipping Info
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
