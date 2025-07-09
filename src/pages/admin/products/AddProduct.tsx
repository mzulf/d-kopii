
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import { ImagePlus } from "lucide-react";

const AddProduct = () => {
  const navigate = useNavigate();
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [weight, setWeight] = useState("");
  const [origin, setOrigin] = useState("");
  const [roastLevel, setRoastLevel] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Mock API call for adding product
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Product added",
        description: `${productName} has been added to your inventory.`,
      });
      navigate("/admin/products");
    }, 1500);
  };

  return (
    <AdminLayout title="Add New Product">
      <div className="max-w-3xl mx-auto">
        <form onSubmit={handleSubmit}>
          <Card>
            <CardHeader>
              <CardTitle>Product Information</CardTitle>
              <CardDescription>
                Add details about your new coffee product.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="productName">Product Name</Label>
                <Input 
                  id="productName" 
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  placeholder="e.g., Sumatra Dark Roast"
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea 
                  id="description" 
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe the flavor profile, aroma, and other characteristics"
                  rows={4}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="price">Price (USD)</Label>
                  <Input 
                    id="price" 
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    placeholder="0.00"
                    min="0"
                    step="0.01"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="stock">Stock Quantity</Label>
                  <Input 
                    id="stock" 
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    placeholder="0"
                    min="0"
                    step="1"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Select value={category} onValueChange={setCategory} required>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="single_origin">Single Origin</SelectItem>
                      <SelectItem value="blend">Blend</SelectItem>
                      <SelectItem value="espresso">Espresso</SelectItem>
                      <SelectItem value="decaf">Decaf</SelectItem>
                      <SelectItem value="instant">Instant Coffee</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="weight">Weight/Size</Label>
                  <Input 
                    id="weight" 
                    value={weight}
                    onChange={(e) => setWeight(e.target.value)}
                    placeholder="e.g., 12 oz, 1 kg"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="origin">Origin</Label>
                  <Input 
                    id="origin" 
                    value={origin}
                    onChange={(e) => setOrigin(e.target.value)}
                    placeholder="e.g., Ethiopia, Colombia"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="roastLevel">Roast Level</Label>
                  <Select value={roastLevel} onValueChange={setRoastLevel}>
                    <SelectTrigger id="roastLevel">
                      <SelectValue placeholder="Select roast level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">Light</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="medium_dark">Medium-Dark</SelectItem>
                      <SelectItem value="dark">Dark</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label>Product Images</Label>
                <div className="border-2 border-dashed rounded-lg p-8 text-center">
                  <div className="mx-auto flex flex-col items-center justify-center">
                    <ImagePlus className="h-12 w-12 text-muted-foreground mb-4" />
                    <h3 className="text-lg font-medium">Drag images here or click to upload</h3>
                    <p className="text-sm text-muted-foreground mt-1">
                      Support for JPG, PNG or GIF (Maximum 5MB)
                    </p>
                    <Button type="button" variant="outline" className="mt-4">
                      Select Images
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Button 
                type="button" 
                variant="outline"
                onClick={() => navigate("/admin/products")}
              >
                Cancel
              </Button>
              <Button 
                type="submit" 
                disabled={isLoading}
                className="bg-coffee-dark hover:bg-coffee-accent"
              >
                {isLoading ? (
                  <>
                    <span className="animate-spin mr-2">⌛</span>
                    Adding Product...
                  </>
                ) : (
                  "Add Product"
                )}
              </Button>
            </CardFooter>
          </Card>
        </form>
      </div>
    </AdminLayout>
  );
};

export default AddProduct;
