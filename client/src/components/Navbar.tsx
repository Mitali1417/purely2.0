import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ShoppingCart, Heart, User, Menu, X, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { Link, useLocation } from "react-router-dom";
import { SearchDialog } from "@/components/SearchDialog"; // Import the new search dialog

import logo from "../assets/Hero/1.png";
import { useAuthStore } from "@/lib/store";
import { useShoppingCart } from "@/hooks/useShoppingCart";
import { navLinks } from "@/data";

// Assume you have access to a list of all products
// You can get this from a hook, a global state, or a context.
// For this example, let's assume it's passed as a prop from a parent component.
// e.g., <Navbar allProducts={productsData} />

const Navbar = ({ allProducts }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { logout, isAuthenticated, user } = useAuthStore();
  const { cartItemCount, wishlistCount } = useShoppingCart();

  const location = useLocation();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
    document.body.style.overflow = !isMenuOpen ? "hidden" : "visible";
  };

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsScrolled(scrollPosition > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.body.style.overflow = "visible";
    };
  }, []);

  useEffect(() => {
    setIsMenuOpen(false);
    document.body.style.overflow = "visible";
  }, [location.pathname]);

  return (
    <>
      <div
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out",
          isScrolled ? "py-2" : "py-4"
        )}
      >
        <div className="max-w-7xl mx-auto px-4">
          <nav
            className={cn(
              "relative flex items-center justify-between px-6 py-4 rounded-2xl transition-all duration-300 ease-out",
              isScrolled
                ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-black/5 border border-white/20"
                : "bg-white/10 backdrop-blur-md border border-white/20"
            )}
          >
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3 group">
              <img src={logo} className="w-[2.5rem] h-[2.5rem] rounded-full" alt="Logo" />
              <span
                className={cn(
                  "font-bold text-xl transition-colors duration-300",
                  isScrolled ? "text-gray-900" : "text-white"
                )}
              >
                Purely
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => {
                const pathname = location.pathname;
                const isActive = pathname === link.navLink || (pathname === "/home" && link.navLink === "/");
                return (
                  <Link
                    key={link.id}
                    to={link.navLink}
                    className={cn(
                      "relative px-4 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105",
                      isActive
                        ? "text-blue-600 bg-blue-50/80"
                        : isScrolled
                        ? "text-gray-700 hover:text-gray-900 hover:bg-gray-100/50"
                        : "text-white/90 hover:text-white hover:bg-white/10"
                    )}
                  >
                    {link.navText}
                    {isActive && (
                      <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-blue-600 rounded-full" />
                    )}
                  </Link>
                );
              })}
            </div>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-3">
              {/* Search Button */}
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsSearchOpen(true)}
                className={cn(
                  "transition-all duration-200 hover:scale-110",
                  isScrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"
                )}
              >
                <Search className="w-5 h-5" />
              </Button>

              {isAuthenticated ? (
                <>
                  {/* Cart Icon */}
                  <Link
                    to="/cart"
                    className={cn(
                      "relative p-2 rounded-lg transition-all duration-200 hover:scale-110",
                      isScrolled ? "hover:bg-gray-100" : "hover:bg-white/10"
                    )}
                  >
                    <ShoppingCart
                      className={cn("w-5 h-5 transition-colors", isScrolled ? "text-gray-700" : "text-white")}
                    />
                    {cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium animate-pulse">
                        {cartItemCount}
                      </span>
                    )}
                  </Link>

                  {/* Wishlist Icon */}
                  <Link
                    to="/wishlist"
                    className={cn(
                      "relative p-2 rounded-lg transition-all duration-200 hover:scale-110",
                      isScrolled ? "hover:bg-gray-100" : "hover:bg-white/10"
                    )}
                  >
                    <Heart className={cn("w-5 h-5 transition-colors", isScrolled ? "text-gray-700" : "text-white")} />
                    {wishlistCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-medium">
                        {wishlistCount}
                      </span>
                    )}
                  </Link>

                  {/* User Avatar */}
                  <Avatar className="w-8 h-8 ring-2 ring-white/20 hover:ring-white/40 transition-all cursor-pointer">
                    <AvatarImage src={user?.avatar || "/placeholder.svg"} alt={user?.name} />
                    <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white text-sm font-medium">
                      {user?.name?.charAt(0).toUpperCase() || <User className="w-4 h-4" />}
                    </AvatarFallback>
                  </Avatar>

                  {/* Logout Button - Hidden on mobile */}
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={logout}
                    className={cn(
                      "hidden sm:flex transition-all duration-200 hover:scale-105",
                      isScrolled
                        ? "border-gray-300 text-gray-700 hover:bg-gray-50"
                        : "border-white/30 text-white hover:bg-white/10"
                    )}
                  >
                    Logout
                  </Button>
                </>
              ) : (
                <div className="hidden sm:flex items-center space-x-2">
                  <Link to="/auth/login">
                    <Button
                      variant="ghost"
                      size="sm"
                      className={cn(
                        "transition-all duration-200",
                        isScrolled ? "text-gray-700 hover:bg-gray-100" : "text-white hover:bg-white/10"
                      )}
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link to="/auth/register">
                    <Button
                      size="sm"
                      className="bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 transition-all duration-200 hover:scale-105"
                    >
                      Sign Up
                    </Button>
                  </Link>
                </div>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className={cn(
                  "md:hidden p-2 rounded-lg transition-all duration-200 hover:scale-110",
                  isScrolled ? "hover:bg-gray-100" : "hover:bg-white/10"
                )}
                aria-label="Toggle menu"
              >
                {isMenuOpen ? (
                  <X className={cn("w-6 h-6 transition-colors", isScrolled ? "text-gray-700" : "text-white")} />
                ) : (
                  <Menu className={cn("w-6 h-6 transition-colors", isScrolled ? "text-gray-700" : "text-white")} />
                )}
              </button>
            </div>
          </nav>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-40 md:hidden transition-all duration-300 ease-out",
          isMenuOpen ? "opacity-100 visible" : "opacity-0 invisible pointer-events-none"
        )}
      >
        {/* Backdrop */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={toggleMenu} />

        {/* Menu Content */}
        <div
          className={cn(
            "absolute top-0 right-0 h-full w-80 max-w-[85vw] bg-white/95 backdrop-blur-xl shadow-2xl transition-transform duration-300 ease-out",
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          )}
        >
          <div className="flex flex-col h-full">
            {/* Menu Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-200/50">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold">P</span>
                </div>
                <span className="font-bold text-lg text-gray-900">Purely</span>
              </div>
              <button onClick={toggleMenu} className="p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <X className="w-5 h-5 text-gray-700" />
              </button>
            </div>

            {/* Navigation Links */}
            <div className="flex-1 px-6 py-8">
              <nav className="space-y-2">
                {navLinks.map((link) => {
                  const pathname = location.pathname;
                  const isActive = pathname === link.navLink;
                  return (
                    <Link
                      key={link.id}
                      to={link.navLink}
                      className={cn(
                        "flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-200",
                        isActive
                          ? "bg-blue-50 text-blue-600 border-l-4 border-blue-600"
                          : "text-gray-700 hover:bg-gray-50 hover:text-gray-900"
                      )}
                    >
                      {link.navText}
                    </Link>
                  );
                })}
              </nav>

              {/* Mobile Actions */}
              {isAuthenticated && (
                <div className="mt-8 pt-8 border-t border-gray-200/50">
                  <Button variant="outline" onClick={logout} className="w-full justify-center bg-transparent">
                    Logout
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* The Search Dialog component */}
      <SearchDialog
        isOpen={isSearchOpen}
        onOpenChange={setIsSearchOpen}
        products={allProducts} // Pass products to the dialog
      />

      {/* Spacer to prevent content from hiding behind fixed navbar */}
      <div className="h-20" />
    </>
  );
};

export default Navbar;