import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ChevronRight, Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils';
import api from '@/api';


interface Category {
  name: string;
  count: number;
}

interface CategoryRowProps {
  className?: string;
}

const CategoryRow = ({ className }: CategoryRowProps) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        const response = await api.get('/products/categories');
        setCategories(response.data);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError('Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const handleCategoryClick = (categoryName: string) => {
    navigate(`/categories/${categoryName}`);
  };

  const getCategoryDisplayName = (name: string) => {
    return name
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  if (loading) {
    return (
      <div className={cn("bg-white border-b", className)}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-center space-x-2">
            <Loader2 className="h-4 w-4 animate-spin" />
            <span className="text-sm text-gray-600">Loading categories...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("bg-white border-b", className)}>
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="text-center text-sm text-red-600">
            {error}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("fixed top-16 z-50 w-full backdrop-blur-3xl bg-muted border-b shadow-sm", className)}>
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center space-x-1 overflow-x-auto scrollbar-hide">
          {/* All Categories Button */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigate('/categories')}
            className="flex-shrink-0 h-8 px-3 text-xs font-medium"
          >
            All Categories
            <ChevronRight className="h-3 w-3 ml-1" />
          </Button>

          {/* Category Buttons */}
          {categories.map((category) => (
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
