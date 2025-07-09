
import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X, Plus, Minus } from "lucide-react";
import { Product } from "@/components/ProductCard";

interface CartItemProps {
  item: CartItem;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemove: (id: number) => void;
}

export interface CartItem extends Product {
  quantity: number;
}

const CartItem = ({ item, onUpdateQuantity, onRemove }: CartItemProps) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value);
    if (newQuantity > 0) {
      setQuantity(newQuantity);
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  const incrementQuantity = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onUpdateQuantity(item.id, newQuantity);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      setQuantity(newQuantity);
      onUpdateQuantity(item.id, newQuantity);
    }
  };

  return (
    <div className="flex flex-col sm:flex-row items-center gap-4 py-4 border-b last:border-b-0">
      <Link to={`/product/${item.id}`} className="w-20 h-20 rounded-md overflow-hidden">
        <img
          src={item.image}
          alt={item.name}
          className="w-full h-full object-cover"
        />
      </Link>
      
      <div className="flex-grow">
        <Link to={`/product/${item.id}`} className="font-serif font-medium hover:text-coffee-accent transition-colors">
          {item.name}
        </Link>
        <p className="text-sm text-muted-foreground">{item.category}</p>
      </div>
      
      <div className="flex items-center gap-2">
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 p-0" 
          onClick={decrementQuantity}
        >
          <Minus className="h-3 w-3" />
        </Button>
        
        <Input
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
          className="w-16 h-8 text-center"
        />
        
        <Button 
          variant="outline" 
          size="icon" 
          className="h-8 w-8 p-0" 
          onClick={incrementQuantity}
        >
          <Plus className="h-3 w-3" />
        </Button>
      </div>
      
      <div className="font-medium text-right min-w-[80px]">
        Rp {(item.price * quantity).toLocaleString()}
      </div>
      
      <Button 
        variant="ghost" 
        size="icon" 
        onClick={() => onRemove(item.id)}
        className="text-muted-foreground hover:text-destructive"
      >
        <X className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default CartItem;
