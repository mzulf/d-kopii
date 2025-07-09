
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";

export interface Product {
  id: number;
  name: string;
  price: number;
  image: string;
  category: string;
  rating: number;
}

interface ProductCardProps {
  product: Product;
  onAddToCart?: (product: Product) => void;
}

const ProductCard = ({ product, onAddToCart }: ProductCardProps) => {
  const { id, name, price, image } = product;
  const { addToCart } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (onAddToCart) {
      onAddToCart(product);
    } else {
      addToCart(product, 1);
      console.log("Added to cart from ProductCard:", product);
    }
  };

  return (
    <Card className="overflow-hidden product-card-hover card-shadow border-0">
      <Link to={`/product/${id}`}>
        <div className="h-48 overflow-hidden">
          <img
            src={image}
            alt={name}
            className="w-full h-full object-cover object-center transition-transform duration-300 hover:scale-110"
          />
        </div>
        <CardContent className="p-4">
          <h3 className="font-serif font-semibold text-lg truncate">{name}</h3>
          <div className="flex justify-between items-center mt-2">
            <span className="font-medium text-coffee-accent">Rp {price.toLocaleString()}</span>
            <Button 
              size="sm" 
              onClick={handleAddToCart}
              className="bg-coffee-dark hover:bg-coffee-accent text-white"
            >
              <ShoppingCart className="h-4 w-4 mr-1" />
              <span>Add</span>
            </Button>
          </div>
        </CardContent>
      </Link>
    </Card>
  );
};

export default ProductCard;
