
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useCart } from "@/context/CartContext";
import CartItem from "@/components/CartItem";
import { ArrowRight, ShoppingCart } from "lucide-react";

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, clearCart, cartTotal } = useCart();
  
  // Calculate shipping based on cart total
  const calculateShipping = () => {
    if (cartTotal === 0) return 0;
    if (cartTotal >= 300000) return 0; // Free shipping for orders over 300k
    return 15000; // Standard shipping fee
  };
  
  const shipping = calculateShipping();
  const total = cartTotal + shipping;
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif font-bold mb-6">Shopping Cart</h1>
      
      {cart.length === 0 ? (
        <div className="text-center py-16">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-muted rounded-full mb-4">
            <ShoppingCart className="h-8 w-8 text-muted-foreground" />
          </div>
          <h2 className="text-2xl font-medium mb-2">Your cart is empty</h2>
          <p className="text-muted-foreground mb-6">Looks like you haven't added any products to your cart yet.</p>
          <Button asChild>
            <Link to="/shop">Start Shopping</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-lg font-medium">Cart Items ({cart.length})</h2>
                <Button variant="ghost" onClick={clearCart}>
                  Clear Cart
                </Button>
              </div>
              
              <div>
                {cart.map((item) => (
                  <CartItem
                    key={item.id}
                    item={item}
                    onUpdateQuantity={updateQuantity}
                    onRemove={removeFromCart}
                  />
                ))}
              </div>
            </div>
          </div>
          
          <div>
            <Card>
              <CardContent className="pt-6">
                <h2 className="text-lg font-medium mb-4">Order Summary</h2>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>Rp {cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `Rp ${shipping.toLocaleString()}`
                      )}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between font-medium text-lg">
                    <span>Total</span>
                    <span>Rp {total.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex flex-col gap-2">
                <Button
                  asChild
                  className="w-full bg-coffee-dark hover:bg-coffee-accent"
                >
                  <Link to="/checkout">
                    Proceed to Checkout <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  asChild
                  variant="outline"
                  className="w-full"
                >
                  <Link to="/shop">Continue Shopping</Link>
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
