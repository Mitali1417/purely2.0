import { useState, useMemo } from 'react';
import type { Product } from '../data/products';
import { useDebounce } from './useDebounce';

export const useProductFilters = (products: Product[]) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState<'productName' | 'productPrice'>('productName');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  
  // Debounce search term to avoid excessive filtering
  const debouncedSearchTerm = useDebounce(searchTerm, 200);

  // Filter products based on search term and category
  const filteredProducts = useMemo(() => {
    const normalizedSearch = (debouncedSearchTerm || '').toLowerCase();
    return products.filter((product) => {
      const name = (product?.productName ?? '').toLowerCase();
      const description = (product?.productDescription ?? '').toLowerCase();
      const category = product?.category ?? '';
      const matchesSearch = name.includes(normalizedSearch) || description.includes(normalizedSearch);
      const matchesCategory = categoryFilter === 'all' || category === categoryFilter;
      return matchesSearch && matchesCategory;
    });
  }, [products, debouncedSearchTerm, categoryFilter]);

  // Sort filtered products
  const sortedProducts = useMemo(() => {
    return [...filteredProducts].sort((a, b) => {
      let aValue: string | number;
      let bValue: string | number;

      if (sortBy === 'productName') {
        aValue = a.productName.toLowerCase();
        bValue = b.productName.toLowerCase();
      } else {
        aValue = a.productPrice;
        bValue = b.productPrice;
      }

      if (sortOrder === 'asc') {
        return aValue > bValue ? 1 : aValue < bValue ? -1 : 0;
      } else {
        return aValue < bValue ? 1 : aValue > bValue ? -1 : 0;
      }
    });
  }, [filteredProducts, sortBy, sortOrder]);

  // Get unique categories for filter dropdown
  const categories = useMemo(() => {
    const uniqueCategories = [...new Set(products.map(product => product.category))];
    return ['all', ...uniqueCategories];
  }, [products]);

  const handleSearchChange = (value: string) => {
    setSearchTerm(value);
  };

  const handleSortChange = (value: string) => {
    const [type, order] = value.split('-');
    setSortBy(type as 'productName' | 'productPrice');
    setSortOrder(order as 'asc' | 'desc');
  };

  const handleCategoryChange = (category: string) => {
    setCategoryFilter(category);
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSortBy('productName');
    setSortOrder('asc');
    setCategoryFilter('all');
  };

  return {
    // State
    searchTerm,
    sortBy,
    sortOrder,
    categoryFilter,
    categories,
    
    // Computed values
    filteredProducts,
    sortedProducts,
    
    // Actions
    handleSearchChange,
    handleSortChange,
    handleCategoryChange,
    clearFilters,
  };
}; 