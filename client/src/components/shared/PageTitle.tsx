import { useEffect, useMemo } from "react";
import { useLocation, matchPath } from "react-router-dom";

const base = "Purely";

const titleForPath = (pathname: string): string => {
  const mappings: Array<{ pattern: string; title: string | ((m: any) => string) }> = [
    { pattern: "/", title: "Home" },
    { pattern: "/about", title: "About" },
    { pattern: "/mira", title: "Assistant" },
    { pattern: "/wishlist", title: "Wishlist" },
    { pattern: "/cart", title: "Cart" },
    { pattern: "/sale", title: "Sale" },
    { pattern: "/categories", title: "Categories" },
    { pattern: "/categories/:categoryName", title: (m) => `Category: ${m.params.categoryName}` },
    { pattern: "/categories/:categoryName/:subcategoryName", title: (m) => `Category: ${m.params.subcategoryName}` },
    { pattern: "/products", title: "Products" },
    { pattern: "/products/:productId", title: "Product Details" },
    { pattern: "/brands", title: "Brands" },
    { pattern: "/brands/:brandName", title: (m) => `Brand: ${m.params.brandName}` },
    { pattern: "/login", title: "Login" },
    { pattern: "/signup", title: "Sign Up" },
    { pattern: "/profile", title: "Profile" },
  ];

  for (const m of mappings) {
    const res = matchPath({ path: m.pattern, end: m.pattern === "/" }, pathname);
    if (res) {
      const t = typeof m.title === "function" ? m.title(res) : m.title;
      return `${base} | ${t}`;
    }
  }
  return `${base}`;
};

export const PageTitle = () => {
  const location = useLocation();
  const title = useMemo(() => titleForPath(location.pathname), [location.pathname]);

  useEffect(() => {
    document.title = title;
  }, [title]);

  return null;
};

export default PageTitle;


