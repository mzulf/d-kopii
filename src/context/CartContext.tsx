
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/components/ProductCard";
import { CartItem } from "@/components/CartItem";
import { useToast } from "@/hooks/use-toast";

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number) => void;
  removeFromCart: (id: number) => void;
  updateQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
  cartTotal: number;
  cartCount: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

// Use a consistent key for localStorage
const CART_STORAGE_KEY = "dkopi-cart";

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [cartTotal, setCartTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const { toast } = useToast();

  // Load cart from localStorage on initial load
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem(CART_STORAGE_KEY);
      
      if (storedCart) {
        const parsedCart = JSON.parse(storedCart);
        
        // Validate that we have an array
        if (Array.isArray(parsedCart)) {
          setCart(parsedCart);
          
          // Calculate initial values
          const total = parsedCart.reduce(
            (sum: number, item: CartItem) => sum + item.price * item.quantity, 
            0
          );
          setCartTotal(total);
          
          const count = parsedCart.reduce(
            (sum: number, item: CartItem) => sum + item.quantity, 
            0
          );
          setCartCount(count);
          
          console.log("Cart loaded from localStorage:", parsedCart, "Items:", parsedCart.length);
        } else {
          console.error("Invalid cart data format in localStorage:", parsedCart);
          localStorage.removeItem(CART_STORAGE_KEY);
        }
      } else {
        console.log("No cart found in localStorage");
      }
    } catch (error) {
      console.error("Error loading cart from localStorage:", error);
      localStorage.removeItem(CART_STORAGE_KEY);
    }
  }, []);

  // Update localStorage and calculate totals whenever cart changes
  useEffect(() => {
    console.log("Cart state updated:", cart);
    try {
      // Save to localStorage
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
      
      // Calculate totals
      const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
      setCartTotal(total);
      
      const count = cart.reduce((sum, item) => sum + item.quantity, 0);
      setCartCount(count);
      
      console.log("Cart saved to localStorage. Items:", cart.length, "Total:", total, "Count:", count);
      
    } catch (error) {
      console.error("Error saving cart to localStorage:", error);
    }
  }, [cart]);

  const addToCart = (product: Product, quantity = 1) => {
    console.log("Adding to cart:", product, "quantity:", quantity);
    
    setCart(prevCart => {
      const existingItemIndex = prevCart.findIndex(item => item.id === product.id);
      
      if (existingItemIndex >= 0) {
        // If item exists, update quantity
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += quantity;
        
        toast({
          title: "Cart updated",
          description: `${product.name} quantity increased to ${updatedCart[existingItemIndex].quantity}.`,
        });
        
        console.log("Updated item in cart:", updatedCart);
        return updatedCart;
      } else {
        // Add new item
        toast({
          title: "Added to cart",
          description: `${product.name} has been added to your cart.`,
        });
        
        const newCartItem: CartItem = { ...product, quantity };
        const newCart = [...prevCart, newCartItem];
        console.log("New item added to cart:", newCart);
        return newCart;
      }
    });
  };

  const removeFromCart = (id: number) => {
    setCart(prevCart => {
      const product = prevCart.find(item => item.id === id);
      
      if (product) {
        toast({
          title: "Item removed",
          description: `${product.name} has been removed from your cart.`,
        });
      }
      
      return prevCart.filter(item => item.id !== id);
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    
    setCart(prevCart => 
      prevCart.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    localStorage.removeItem(CART_STORAGE_KEY);
    
    toast({
      title: "Cart cleared",
      description: "All items have been removed from your cart.",
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartTotal,
        cartCount
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
