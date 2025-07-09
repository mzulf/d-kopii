
import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ShoppingCart,
  Minus,
  Plus,
  ArrowLeft,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import products from "@/data/products";
import { useCart } from "@/context/CartContext";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import ProductCard from "@/components/ProductCard";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const product = products.find((p) => p.id.toString() === id);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  
  if (!product) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <h2 className="text-2xl font-bold mb-4">Product Not Found</h2>
        <p className="mb-6">The product you are looking for does not exist.</p>
        <Button asChild>
          <Link to="/shop">Back to Shop</Link>
        </Button>
      </div>
    );
  }
  
  const handleAddToCart = () => {
    addToCart(product, quantity);
  };
  
  const incrementQuantity = () => {
    setQuantity(prev => prev + 1);
  };
  
  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };
  
  // Get related products (same category but not the current product)
  const relatedProducts = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);
  
  return (
    <div className="container mx-auto px-4 py-8">
      <Button
        variant="ghost"
        className="mb-6 pl-0 flex items-center gap-2"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="h-4 w-4" />
        Back
      </Button>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
        {/* Product Image */}
        <div className="aspect-square overflow-hidden rounded-lg shadow-lg">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover"
          />
        </div>
        
        {/* Product Details */}
        <div>
          <h1 className="text-3xl font-serif font-bold mb-2">{product.name}</h1>
          
          <div className="flex items-center mb-4">
            <div className="flex items-center">
              {[...Array(5)].map((_, i) => (
                <span key={i} className={`text-xl ${i < Math.round(product.rating) ? "text-yellow-500" : "text-gray-300"}`}>
                  ★
                </span>
              ))}
            </div>
            <span className="ml-2 text-muted-foreground">
              {product.rating} ({Math.floor(product.rating * 10)})
            </span>
          </div>
          
          <p className="text-2xl font-semibold text-coffee-accent mb-4">
            Rp {product.price.toLocaleString()}
          </p>
          
          <p className="text-gray-600 mb-6">
            Premium {product.category} coffee beans, carefully roasted to perfection to bring out the unique flavors and aromas. This coffee powder is ideal for espresso, drip, or French press brewing methods.
          </p>
          
          <div className="mb-6">
            <p className="font-medium mb-2">Category: <span className="capitalize">{product.category}</span></p>
            <p className="font-medium">Available: <span className="text-green-600">In Stock</span></p>
          </div>
          
          <Separator className="my-6" />
          
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <div className="flex items-center border rounded-md">
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={decrementQuantity}
                disabled={quantity <= 1}
                className="h-10 rounded-none"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <Input
                type="number"
                min="1"
                value={quantity}
                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                className="w-16 text-center h-10 rounded-none border-0"
              />
              <Button 
                variant="ghost" 
                size="icon"
                onClick={incrementQuantity}
                className="h-10 rounded-none"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
            
            <Button 
              onClick={handleAddToCart}
              className="bg-coffee-dark hover:bg-coffee-accent text-white flex-1 sm:flex-none"
            >
              <ShoppingCart className="mr-2 h-4 w-4" />
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
      
      {/* Product Description Tabs */}
      <Tabs defaultValue="description" className="mb-16">
        <TabsList className="bg-muted/50">
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="brewing">Brewing Guide</TabsTrigger>
        </TabsList>
        <TabsContent value="description" className="pt-6">
          <h3 className="text-xl font-medium mb-4">{product.name} Description</h3>
          <p className="text-gray-600 mb-4">
            Experience the rich and authentic flavor of our premium {product.category} coffee powder. Sourced from the highlands of Indonesia, this coffee offers a unique taste profile that coffee enthusiasts will appreciate.
          </p>
          <p className="text-gray-600">
            Each batch is carefully roasted to bring out the optimal flavor notes, resulting in a balanced cup with the perfect blend of acidity and richness. Whether you prefer your coffee black or with milk, this versatile blend delivers a satisfying experience with every sip.
          </p>
        </TabsContent>
        <TabsContent value="details" className="pt-6">
          <h3 className="text-xl font-medium mb-4">Product Details</h3>
          <ul className="list-disc list-inside space-y-2 text-gray-600">
            <li>Origin: Indonesia</li>
            <li>Type: {product.category.charAt(0).toUpperCase() + product.category.slice(1)}</li>
            <li>Roast Level: Medium-Dark</li>
            <li>Weight: 250g</li>
            <li>Packaging: Resealable pouch with one-way valve</li>
            <li>Shelf Life: 12 months from production date</li>
          </ul>
        </TabsContent>
        <TabsContent value="brewing" className="pt-6">
          <h3 className="text-xl font-medium mb-4">Brewing Guide</h3>
          <div className="space-y-6">
            <div>
              <h4 className="font-medium mb-2">French Press</h4>
              <p className="text-gray-600">
                Use coarse grind. Ratio: 1:15 (coffee to water). Brew for 4 minutes before pressing.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Pour Over</h4>
              <p className="text-gray-600">
                Use medium grind. Ratio: 1:16 (coffee to water). Total brew time: 3-4 minutes.
              </p>
            </div>
            <div>
              <h4 className="font-medium mb-2">Espresso</h4>
              <p className="text-gray-600">
                Use fine grind. 18-20g coffee for a double shot. Extraction time: 25-30 seconds.
              </p>
            </div>
          </div>
        </TabsContent>
      </Tabs>
      
      {/* Related Products */}
      {relatedProducts.length > 0 && (
        <div>
          <h2 className="text-2xl font-serif font-bold mb-6">Related Products</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {relatedProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProductDetail;
