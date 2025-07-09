
import ProductGrid from "@/components/ProductGrid";
import { Product } from "@/components/ProductCard";

interface FeaturedProductsProps {
  products: Product[];
}

const FeaturedProducts = ({ products }: FeaturedProductsProps) => {
  // Filter to only feature some products (e.g., 8 products)
  const featuredProducts = products.slice(0, 8);

  return (
    <section className="py-16 bg-muted/50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-serif font-bold mb-4">Featured Products</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Discover our finest selection of premium coffee powders, carefully selected for their exceptional quality and taste.
          </p>
        </div>
        
        <ProductGrid products={featuredProducts} />
        
      </div>
    </section>
  );
};

export default FeaturedProducts;
