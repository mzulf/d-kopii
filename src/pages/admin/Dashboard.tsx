
import { useState, useEffect } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Coffee, Package, Users } from "lucide-react";

// Mock data for dashboard
const mockStats = {
  totalProducts: 24,
  totalUsers: 156,
  lowStockItems: 5,
  monthlySales: 1245
};

// Mock sales data for chart
const mockSalesData = [
  { month: "Jan", sales: 400 },
  { month: "Feb", sales: 300 },
  { month: "Mar", sales: 500 },
  { month: "Apr", sales: 700 },
  { month: "May", sales: 600 },
  { month: "Jun", sales: 800 },
  { month: "Jul", sales: 1000 },
  { month: "Aug", sales: 900 },
];

const AdminDashboard = () => {
  const [stats, setStats] = useState(mockStats);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-6">
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {/* Product Count Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Products
              </CardTitle>
              <Coffee className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? (
                  <div className="h-8 w-16 animate-pulse rounded bg-muted"></div>
                ) : (
                  stats.totalProducts
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Different coffee products
              </p>
            </CardContent>
          </Card>

          {/* User Count Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Total Users
              </CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? (
                  <div className="h-8 w-16 animate-pulse rounded bg-muted"></div>
                ) : (
                  stats.totalUsers
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Registered customers
              </p>
            </CardContent>
          </Card>

          {/* Low Stock Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Low Stock Items
              </CardTitle>
              <Package className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? (
                  <div className="h-8 w-16 animate-pulse rounded bg-muted"></div>
                ) : (
                  stats.lowStockItems
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Products needing restock
              </p>
            </CardContent>
          </Card>

          {/* Monthly Sales Card */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Monthly Sales
              </CardTitle>
              <BarChart className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">
                {isLoading ? (
                  <div className="h-8 w-24 animate-pulse rounded bg-muted"></div>
                ) : (
                  `$${stats.monthlySales.toLocaleString()}`
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                Revenue this month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Sales Overview Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Sales Overview</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="h-80 w-full animate-pulse rounded bg-muted"></div>
            ) : (
              <div className="h-80">
                {/* In a real implementation, this would be a chart component */}
                <div className="flex h-full items-end gap-2">
                  {mockSalesData.map((item) => (
                    <div key={item.month} className="flex flex-1 flex-col items-center">
                      <div 
                        className="w-full bg-coffee-dark rounded-t" 
                        style={{ height: `${(item.sales / 1000) * 100}%` }}
                      ></div>
                      <span className="mt-2 text-xs">{item.month}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
