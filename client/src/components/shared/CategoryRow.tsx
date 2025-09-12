import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { useQuery } from "@tanstack/react-query";
import { getCategories } from "@/api/category.api";

interface Category {
  name: string;
  count: number;
}

interface CategoryRowProps {
  className?: string;
}

const CategoryRow = ({ className }: CategoryRowProps) => {
  // const [categories, setCategories] = useState<Category[]>([]);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  // useEffect(() => {
  //   const fetchCategories = async () => {
  //     try {
  //       setLoading(true);
  //       const response = await api.get("/products/categories");
  //       setCategories(response.data);
  //     } catch (err) {
  //       console.error("Error fetching categories:", err);
  //       setError("Failed to load categories");
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchCategories();
  // }, []);

  const { data: categories, isLoading: loading } = useQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const res = await getCategories();
      return res;
    },
  });

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/categories/${categoryName}`);
  };

  const getCategoryDisplayName = (name: string) => {
    return name
      .split("-")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };


  return (
    <div
      className={cn(
        "fixed top-16 z-50 w-full backdrop-blur-3xl bg-muted border-b shadow-sm",
        className
      )}
    >
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center space-x-1 overflow-x-auto scrollbar-hide">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate("/categories")}
            className="flex-shrink-0 h-8 px-3 text-xs font-medium"
          >
            All Categories
            <ChevronRight className="h-3 w-3 ml-1" />
          </Button>

            {loading
            ? Array.from({ length: 8 }).map((_, index: number) => (
              <div
                key={index}
                className="flex-shrink-0 h-6 w-20 bg-white/50 rounded-md animate-pulse"
              />
              ))
            : (categories as Category[]).map((category: Category) => (
              <Button
                key={category.name}
                variant="ghost"
                size="sm"
                onClick={() => handleCategoryClick(category.name)}
                className="flex-shrink-0 h-8 px-3 text-xs font-medium text-muted-foreground whitespace-nowrap"
              >
                {getCategoryDisplayName(category.name)}
              </Button>
              ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryRow;
