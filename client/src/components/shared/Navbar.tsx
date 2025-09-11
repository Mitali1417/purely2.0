import React, { useState, useEffect, useMemo, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import { navLinks } from "@/data";
import { Button } from "@/components/ui/button";
import {
  ShoppingCart,
  Heart,
  Menu,
  X,
  Search,
  User,
  LogOut,
  Home,
} from "lucide-react";
import { useAuthStore, useCartStore } from "@/lib/store";
import CategoryRow from "./CategoryRow";
import { SearchDialog } from "./SearchDialog";
import Logout from "./Logout";
import ProfileDialog from "./ProfileDialog";
import { toast } from "sonner";

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { user, isAuthenticated, logout } = useAuthStore();
  const cart = useCartStore((state) => state.items);
  const wishlist = useCartStore((state) => state.wishlist);
  const location = useLocation();

  const cartItemCount = useMemo(
    () => cart.reduce((total, item) => total + item.quantity, 0),
    [cart]
  );
  const wishlistCount = useMemo(() => wishlist.length, [wishlist]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 0);

    // Throttle scroll events to improve performance
    let ticking = false;
    const throttledHandleScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledHandleScroll, { passive: true });
    return () => window.removeEventListener("scroll", throttledHandleScroll);
  }, []);

  const handleLogout = useCallback(() => {
    logout();
    toast.success("Logged out successfully!");
  }, [logout]);

  const openSearch = useCallback(() => {
    setIsSearchOpen(true);
    setIsMobileMenuOpen(false);
  }, []);
  const closeSearch = useCallback(() => setIsSearchOpen(false), []);
  const toggleMobile = useCallback(() => setIsMobileMenuOpen((v) => !v), []);

  // Close mobile menu when route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <>
      <div>
        <nav
          className={`fixed top-0 z-50 w-full transition-all duration-300 ${
            isScrolled
              ? "bg-background/95 backdrop-blur-md shadow-md"
              : "bg-background border-b"
          }`}
        >
          <div className="px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <div className="flex-shrink-0">
                <Link to="/" className="flex items-center space-x-2">
                  <img
                    src="https://res.cloudinary.com/duju3bhds/image/upload/v1757332773/Purely_LOGO_tbqdli.png"
                    alt="logo"
                    className="w-10 h-10 rounded-md"
                  />
                  <span className="text-xl font-bold text-primary">Purely</span>
                </Link>
              </div>

              {/* Desktop Links */}
              <div className="hidden md:flex space-x-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.id}
                    to={link.navLink}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      location.pathname === link.navLink
                        ? "text-primary"
                        : "text-foreground/80"
                    }`}
                  >
                    {link.navText}
                  </Link>
                ))}
              </div>

              {/* Right-side Actions */}
              <div className="hidden md:flex items-center space-x-3">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={openSearch}
                  className="rounded-full"
                  aria-label="Search"
                >
                  <Search className="h-4 w-4 text-primary" />
                </Button>

                {/* Cart */}
                <Link to="/cart">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative rounded-full"
                    aria-label="Shopping cart"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {isAuthenticated && cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-amber-600 text-primary-foreground text-[8px] sm:text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                        {cartItemCount > 9 ? "9+" : cartItemCount}
                      </span>
                    )}
                  </Button>
                </Link>

                {/* Wishlist */}
                <Link to="/wishlist">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative rounded-full"
                    aria-label="Wishlist"
                  >
                    <Heart className="h-4 w-4" />
                    {isAuthenticated && wishlistCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-destructive text-destructive-foreground text-[8px] sm:text-xs font-bold rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                        {wishlistCount > 9 ? "9+" : wishlistCount}
                      </span>
                    )}
                  </Button>
                </Link>

                {/* User Menu */}
                {isAuthenticated && user ? (
                  <div className="flex items-center space-x-2 ml-2">
                    <ProfileDialog />
                    <Logout handleLogout={handleLogout} />
                  </div>
                ) : (
                  <div className="flex items-center space-x-2">
                    <Link to="/login">
                      <Button size="sm" variant="outline">
                        Login
                      </Button>
                    </Link>
                    <Link to="/register">
                      <Button size="sm">Sign Up</Button>
                    </Link>
                  </div>
                )}
              </div>

              {/* Mobile Actions */}
              <div className="flex md:hidden items-center space-x-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={openSearch}
                  className="rounded-full"
                  aria-label="Search"
                >
                  <Search className="h-4 w-4 text-primary" />
                </Button>

                <Link to="/cart">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="relative rounded-full"
                    aria-label="Shopping cart"
                  >
                    <ShoppingCart className="h-4 w-4" />
                    {isAuthenticated && cartItemCount > 0 && (
                      <span className="absolute -top-1 -right-1 bg-amber-500 text-primary-foreground text-[8px] sm:text-xs rounded-full h-4 w-4 sm:h-5 sm:w-5 flex items-center justify-center">
                        {cartItemCount > 9 ? "9+" : cartItemCount}
                      </span>
                    )}
                  </Button>
                </Link>

                {/* Mobile Menu Toggle */}
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={toggleMobile}
                  className="rounded-full"
                  aria-label="Toggle menu"
                >
                  {isMobileMenuOpen ? (
                    <X className="h-5 w-5 text-primary" />
                  ) : (
                    <Menu className="h-5 w-5 text-primary" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Mobile Menu Drawer */}
          <div
            className={`md:hidden bg-background/95 backdrop-blur-lg transition-all duration-300 ease-in-out overflow-hidden ${
              isMobileMenuOpen ? "max-h-96 border-t shadow-inner" : "max-h-0"
            }`}
          >
            <div className="px-4 py-4 space-y-4">
              {/* Home Link */}
              <Link
                to="/"
                className="flex items-center text-sm py-2 px-3 rounded-lg hover:bg-muted/50 text-foreground font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Home className="h-4 w-4 mr-3" />
                Home
              </Link>

              {/* Navigation Links */}
              <div className="space-y-1">
                {navLinks.map((link) => (
                  <Link
                    key={link.id}
                    to={link.navLink}
                    className={`flex items-center text-sm py-2 px-3 rounded-lg hover:bg-muted/50 ${
                      location.pathname === link.navLink
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-foreground/80 hover:text-foreground"
                    }`}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {link.navText}
                  </Link>
                ))}
              </div>

              {/* Divider */}
              <div className="border-t my-2"></div>

              {/* Account Actions */}
              <div className="space-y-1">
                <Link
                  to="/wishlist"
                  className="flex items-center text-sm py-2 px-3 rounded-lg hover:bg-muted/50 text-foreground/80 hover:text-foreground relative"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Heart className="h-4 w-4 mr-3" />
                  Wishlist
                  {wishlistCount > 0 && (
                    <span className="absolute right-3 bg-destructive text-destructive-foreground text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center">
                      {wishlistCount > 9 ? "9+" : wishlistCount}
                    </span>
                  )}
                </Link>

                {isAuthenticated && user ? (
                  <>
                    <Link
                      to="/profile"
                      className="flex items-center text-sm py-2 px-3 rounded-lg hover:bg-muted/50 text-foreground/80 hover:text-foreground"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      <User className="h-4 w-4 mr-3" />
                      Profile
                    </Link>
                    <div className="flex items-end justify-end">
                    <Logout handleLogout={handleLogout} />
                    </div>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="flex items-center text-sm py-2 px-3 rounded-lg hover:bg-muted/50 text-foreground/80 hover:text-foreground"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Login
                    </Link>
                    <Link
                      to="/register"
                      className="flex items-center text-sm py-2 px-3 rounded-lg hover:bg-muted/50 text-foreground/80 hover:text-foreground"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Sign Up
                    </Link>
                  </>
                )}
              </div>
            </div>
          </div>
        </nav>
        <CategoryRow />
      </div>

      <SearchDialog
        isOpen={isSearchOpen}
        onOpenChange={(open) => (open ? openSearch() : closeSearch())}
      />
    </>
  );
};

export default React.memo(Navbar);
