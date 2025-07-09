
import { useState, useEffect } from "react";
import { Separator } from "@/components/ui/separator";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import ProductGrid from "@/components/ProductGrid";
import products from "@/data/products";
import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import { useLocation } from "react-router-dom";

interface FilterState {
  categories: string[];
  priceRange: [number, number];
  rating: number | null;
  searchTerm: string;
}

const Shop = () => {
  const isMobile = useIsMobile();
  const [showFilter, setShowFilter] = useState(!isMobile);
  const location = useLocation();
  
  // Extract unique categories and determine price range
  const categories = Array.from(new Set(products.map((product) => product.category)));
  const minPrice = Math.min(...products.map((product) => product.price));
  const maxPrice = Math.max(...products.map((product) => product.price));
  
  // Get search query from URL
  const searchParams = new URLSearchParams(location.search);
  const searchFromUrl = searchParams.get("search") || "";
  
  const [filters, setFilters] = useState<FilterState>({
    categories: [],
    priceRange: [minPrice, maxPrice],
    rating: null,
    searchTerm: searchFromUrl,
  });
  
  // Update filters when search parameter changes
  useEffect(() => {
    setFilters(prev => ({
      ...prev,
      searchTerm: searchFromUrl
    }));
  }, [searchFromUrl]);
  
  // Filter products based on selected filters
  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      filters.categories.length === 0 || filters.categories.includes(product.category);
    const matchesPrice =
      product.price >= filters.priceRange[0] && product.price <= filters.priceRange[1];
    const matchesRating = filters.rating === null || product.rating >= filters.rating;
    const matchesSearch = filters.searchTerm === "" || 
      product.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(filters.searchTerm.toLowerCase());
    
    return matchesCategory && matchesPrice && matchesRating && matchesSearch;
  });
  
  const toggleCategory = (category: string) => {
    setFilters((prev) => {
      const exists = prev.categories.includes(category);
      return {
        ...prev,
        categories: exists
          ? prev.categories.filter((c) => c !== category)
          : [...prev.categories, category],
      };
    });
  };
  
  const handlePriceChange = (values: number[]) => {
    setFilters((prev) => ({
      ...prev,
      priceRange: [values[0], values[1]] as [number, number],
    }));
  };
  
  const setRatingFilter = (rating: number) => {
    setFilters((prev) => ({
      ...prev,
      rating: prev.rating === rating ? null : rating,
    }));
  };
  
  const resetFilters = () => {
    setFilters({
      categories: [],
      priceRange: [minPrice, maxPrice],
      rating: null,
      searchTerm: filters.searchTerm, // Preserve search term when resetting other filters
    });
  };
  
  const toggleFilterVisibility = () => {
    setShowFilter(!showFilter);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-serif font-bold">Coffee Shop</h1>
        <p className="text-muted-foreground mt-2">
          Browse our selection of premium coffee powders from across Indonesia.
        </p>
        {filters.searchTerm && (
          <p className="mt-2 text-coffee-accent">
            Search results for: <strong>"{filters.searchTerm}"</strong>
          </p>
        )}
      </div>
      
      <div className="md:hidden mb-4">
        <Button onClick={toggleFilterVisibility} variant="outline" className="w-full">
          {showFilter ? "Hide Filters" : "Show Filters"}
        </Button>
      </div>
      
      <div className="flex flex-col md:flex-row gap-8">
        {/* Filters */}
        {showFilter && (
          <div className="w-full md:w-64 shrink-0 space-y-6">
            <div>
              <h3 className="font-medium mb-3">Categories</h3>
              <div className="space-y-2">
                {categories.map((category) => (
                  <div key={category} className="flex items-center space-x-2">
                    <Checkbox
                      id={`category-${category}`}
                      checked={filters.categories.includes(category)}
                      onCheckedChange={() => toggleCategory(category)}
                    />
                    <Label htmlFor={`category-${category}`} className="capitalize">
                      {category}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-3">Price Range</h3>
              <div className="px-2">
                <Slider
                  defaultValue={[minPrice, maxPrice]}
                  min={minPrice}
                  max={maxPrice}
                  step={5000}
                  value={[filters.priceRange[0], filters.priceRange[1]]}
                  onValueChange={handlePriceChange}
                  className="mb-6"
                />
                <div className="flex justify-between text-sm">
                  <span>Rp {filters.priceRange[0].toLocaleString()}</span>
                  <span>Rp {filters.priceRange[1].toLocaleString()}</span>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="font-medium mb-3">Rating</h3>
              <div className="space-y-2">
                {[4, 3, 2, 1].map((rating) => (
                  <Button
                    key={rating}
                    variant={filters.rating === rating ? "default" : "outline"}
                    size="sm"
                    className="mr-2"
                    onClick={() => setRatingFilter(rating)}
                  >
                    {rating}★ & above
                  </Button>
                ))}
              </div>
            </div>
            
            <Button onClick={resetFilters} variant="outline" className="w-full mt-4">
              Reset Filters
            </Button>
          </div>
        )}
        
        {/* Products */}
        <div className="flex-1">
          <ProductGrid products={filteredProducts} />
        </div>
      </div>
    </div>
  );
};

export default Shop;
