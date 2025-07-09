
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useCart } from "@/context/CartContext";
import { useToast } from "@/hooks/use-toast";

const Checkout = () => {
  const { cart, cartTotal, clearCart } = useCart();
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Calculate shipping based on cart total
  const calculateShipping = () => {
    if (cartTotal === 0) return 0;
    if (cartTotal >= 300000) return 0; // Free shipping for orders over 300k
    return 15000; // Standard shipping fee
  };
  
  const shipping = calculateShipping();
  const total = cartTotal + shipping;
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (cart.length === 0) {
      toast({
        title: "Cart is empty",
        description: "Please add items to your cart before checking out.",
        variant: "destructive",
      });
      navigate("/shop");
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call for order processing
    setTimeout(() => {
      clearCart();
      toast({
        title: "Order placed successfully",
        description: "Thank you for your purchase! You will receive a confirmation email shortly.",
      });
      navigate("/");
      setIsSubmitting(false);
    }, 1500);
  };
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif font-bold mb-8">Checkout</h1>
      
      <form onSubmit={handleSubmit}>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Customer and Shipping Information */}
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input id="firstName" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input id="lastName" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input id="phone" type="tel" required />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Shipping Address</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="address">Street Address</Label>
                  <Input id="address" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="city">City</Label>
                    <Input id="city" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="postalCode">Postal Code</Label>
                    <Input id="postalCode" required />
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="province">Province</Label>
                  <Select>
                    <SelectTrigger id="province">
                      <SelectValue placeholder="Select province" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="jakarta">DKI Jakarta</SelectItem>
                      <SelectItem value="west-java">West Java</SelectItem>
                      <SelectItem value="east-java">East Java</SelectItem>
                      <SelectItem value="central-java">Central Java</SelectItem>
                      <SelectItem value="yogyakarta">Yogyakarta</SelectItem>
                      <SelectItem value="bali">Bali</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="notes">Order Notes (Optional)</Label>
                  <Textarea 
                    id="notes"
                    placeholder="Notes about your order, e.g. special notes for delivery"
                  />
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle>Payment Method</CardTitle>
              </CardHeader>
              <CardContent>
                <RadioGroup defaultValue="bank-transfer">
                  <div className="flex items-center space-x-2 py-2">
                    <RadioGroupItem value="bank-transfer" id="bank-transfer" />
                    <Label htmlFor="bank-transfer" className="flex-grow">
                      Bank Transfer
                    </Label>
                    <img src="https://via.placeholder.com/60x30?text=Bank" alt="Bank transfer" className="h-8" />
                  </div>
                  <div className="flex items-center space-x-2 py-2">
                    <RadioGroupItem value="credit-card" id="credit-card" />
                    <Label htmlFor="credit-card" className="flex-grow">
                      Credit Card
                    </Label>
                    <img src="https://via.placeholder.com/60x30?text=Cards" alt="Credit card" className="h-8" />
                  </div>
                  <div className="flex items-center space-x-2 py-2">
                    <RadioGroupItem value="e-wallet" id="e-wallet" />
                    <Label htmlFor="e-wallet" className="flex-grow">
                      E-Wallet
                    </Label>
                    <img src="https://via.placeholder.com/60x30?text=Wallet" alt="E-wallet" className="h-8" />
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>
          </div>
          
          {/* Order Summary */}
          <div>
            <Card className="sticky top-20">
              <CardHeader>
                <CardTitle>Order Summary</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {cart.map((item) => (
                    <div key={item.id} className="flex justify-between">
                      <div>
                        <span className="font-medium">{item.name}</span>
                        <div className="text-sm text-muted-foreground">
                          Quantity: {item.quantity}
                        </div>
                      </div>
                      <div className="text-right">
                        Rp {(item.price * item.quantity).toLocaleString()}
                      </div>
                    </div>
                  ))}
                  
                  <Separator />
                  
                  <div className="flex justify-between">
                    <span>Subtotal</span>
                    <span>Rp {cartTotal.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-green-600">Free</span>
                      ) : (
                        `Rp ${shipping.toLocaleString()}`
                      )}
                    </span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-lg font-medium">
                    <span>Total</span>
                    <span>Rp {total.toLocaleString()}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  type="submit" 
                  className="w-full bg-coffee-dark hover:bg-coffee-accent"
                  disabled={isSubmitting || cart.length === 0}
                >
                  {isSubmitting ? (
                    <>
                      <div className="animate-spin mr-2 h-4 w-4 border-2 border-current border-t-transparent rounded-full"></div>
                      Processing...
                    </>
                  ) : (
                    "Place Order"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Checkout;
