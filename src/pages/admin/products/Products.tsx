
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell
} from "@/components/ui/table";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Plus, Search } from "lucide-react";
import { Link } from "react-router-dom";

type ProductStatus = "available" | "low_stock" | "out_of_stock";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  category: string;
  status: ProductStatus;
};

const ProductsPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("all");

  // Mock data for products
  const products: Product[] = [
    {
      id: "1",
      name: "Arabica Coffee Beans",
      price: 15.99,
      stock: 150,
      category: "beans",
      status: "available"
    },
    {
      id: "2",
      name: "Robusta Coffee Beans",
      price: 12.99,
      stock: 120,
      category: "beans",
      status: "available"
    },
    {
      id: "3",
      name: "Coffee Filter Papers",
      price: 5.99,
      stock: 200,
      category: "accessories",
      status: "available"
    },
    {
      id: "4",
      name: "Coffee Grinder",
      price: 49.99,
      stock: 15,
      category: "equipment",
      status: "low_stock"
    },
    {
      id: "5",
      name: "Espresso Machine",
      price: 299.99,
      stock: 0,
      category: "equipment",
      status: "out_of_stock"
    },
    {
      id: "6", 
      name: "Ceramic Coffee Mug",
      price: 9.99,
      stock: 75,
      category: "mugs",
      status: "available"
    }
  ];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === "all" || product.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Updated to use valid Badge variants
  const getStatusBadgeVariant = (status: ProductStatus) => {
    switch (status) {
      case "available":
        return "default";
      case "low_stock":
        return "outline";
      case "out_of_stock":
        return "destructive";
      default:
        return "secondary";
    }
  };

  return (
    <AdminLayout>
      <div className="px-6 py-4">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h1 className="text-2xl font-bold">Products</h1>
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full md:w-auto">
            <div className="relative w-full md:w-80">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search products..."
                className="pl-8 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger className="w-full sm:w-40">
                <SelectValue placeholder="Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="beans">Beans</SelectItem>
                <SelectItem value="accessories">Accessories</SelectItem>
                <SelectItem value="equipment">Equipment</SelectItem>
                <SelectItem value="mugs">Mugs</SelectItem>
              </SelectContent>
            </Select>
            <Button asChild className="w-full sm:w-auto">
              <Link to="/admin/products/add">
                <Plus className="mr-1 h-4 w-4" />
                Add Product
              </Link>
            </Button>
          </div>
        </div>

        <div className="rounded-md border shadow">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead className="text-right">Price</TableHead>
                <TableHead className="text-right">Stock</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <TableRow key={product.id}>
                    <TableCell className="font-medium">{product.name}</TableCell>
                    <TableCell className="capitalize">{product.category}</TableCell>
                    <TableCell className="text-right">${product.price.toFixed(2)}</TableCell>
                    <TableCell className="text-right">{product.stock}</TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(product.status as ProductStatus)}>
                        {product.status.replace("_", " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <div className="flex justify-end gap-2">
                        <Button variant="ghost" size="sm">
                          Edit
                        </Button>
                        <Button variant="ghost" size="sm" className="text-red-500 hover:text-red-700 hover:bg-red-50">
                          Delete
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="text-center py-6 text-muted-foreground">
                    No products found. Try adjusting your search or filter.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </AdminLayout>
  );
};

export default ProductsPage;
