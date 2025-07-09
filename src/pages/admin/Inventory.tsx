
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { Search, Plus } from "lucide-react";

// Mock coffee products data
const mockProducts = [
  { id: "1", name: "Arabica Premium", stock: 50, price: 15.99, category: "Beans" },
  { id: "2", name: "Robusta Classic", stock: 30, price: 12.99, category: "Beans" },
  { id: "3", name: "Espresso Gold", stock: 25, price: 18.99, category: "Ground" },
  { id: "4", name: "Caramel Latte Mix", stock: 10, price: 9.99, category: "Instant" },
  { id: "5", name: "Dark Roast", stock: 40, price: 14.99, category: "Beans" },
  { id: "6", name: "Colombian Supremo", stock: 5, price: 21.99, category: "Beans" },
];

const InventoryPage = () => {
  const [products, setProducts] = useState(mockProducts);
  const [isAddingProduct, setIsAddingProduct] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  
  // Form state for new product
  const [newProduct, setNewProduct] = useState({
    name: "",
    stock: 0,
    price: 0,
    category: "Beans"
  });

  // Filter products based on search term
  const filteredProducts = searchTerm 
    ? products.filter(product => 
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.category.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : products;

  // Handle input change for new product form
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewProduct(prev => ({
      ...prev,
      [name]: name === 'stock' || name === 'price' ? parseFloat(value) : value
    }));
  };

  // Handle form submission for new product
  const handleAddProduct = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would be an API call to add the product
    const newProductWithId = {
      id: Date.now().toString(),
      ...newProduct
    };
    
    setProducts(prev => [...prev, newProductWithId]);
    setNewProduct({ name: "", stock: 0, price: 0, category: "Beans" });
    setIsAddingProduct(false);
    
    toast({
      title: "Product added",
      description: `${newProduct.name} has been added to inventory.`
    });
  };

  return (
    <AdminLayout title="Inventory Management">
      <div className="space-y-4">
        {/* Search and Add Product Row */}
        <div className="flex flex-col sm:flex-row justify-between gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          {/* Add Product Button */}
          <Dialog open={isAddingProduct} onOpenChange={setIsAddingProduct}>
            <DialogTrigger asChild>
              <Button className="gap-2 bg-coffee-dark hover:bg-coffee-accent">
                <Plus className="h-4 w-4" />
                Add Product
              </Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
              </DialogHeader>
              
              <form onSubmit={handleAddProduct} className="space-y-4 py-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Product Name</Label>
                  <Input
                    id="name"
                    name="name"
                    value={newProduct.name}
                    onChange={handleInputChange}
                    placeholder="Arabica Premium"
                    required
                  />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="stock">Stock Quantity</Label>
                    <Input
                      id="stock"
                      name="stock"
                      type="number"
                      value={newProduct.stock}
                      onChange={handleInputChange}
                      min="0"
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="price">Price ($)</Label>
                    <Input
                      id="price"
                      name="price"
                      type="number"
                      value={newProduct.price}
                      onChange={handleInputChange}
                      min="0.01"
                      step="0.01"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="category">Category</Label>
                  <Input
                    id="category"
                    name="category"
                    value={newProduct.category}
                    onChange={handleInputChange}
                    placeholder="Beans, Ground, Instant, etc."
                    required
                  />
                </div>
                
                <DialogFooter>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setIsAddingProduct(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit" className="bg-coffee-dark hover:bg-coffee-accent">
                    Add Product
                  </Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
        
        {/* Products Table */}
        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50 text-muted-foreground">
                  <th className="py-3 px-4 text-left font-medium">Product</th>
                  <th className="py-3 px-4 text-left font-medium">Category</th>
                  <th className="py-3 px-4 text-left font-medium">Stock</th>
                  <th className="py-3 px-4 text-left font-medium">Price</th>
                  <th className="py-3 px-4 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="py-6 text-center text-muted-foreground">
                      No products found.
                    </td>
                  </tr>
                ) : (
                  filteredProducts.map((product) => (
                    <tr key={product.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="py-3 px-4">{product.name}</td>
                      <td className="py-3 px-4">{product.category}</td>
                      <td className="py-3 px-4">
                        <span className={product.stock <= 10 ? "text-red-500 font-medium" : ""}>
                          {product.stock}
                        </span>
                      </td>
                      <td className="py-3 px-4">${product.price.toFixed(2)}</td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Edit</Button>
                          <Button variant="outline" size="sm" className="text-red-500 hover:text-red-700">
                            Delete
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
};

export default InventoryPage;
