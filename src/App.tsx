
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "@/context/CartContext";
import { AdminAuthProvider } from "@/context/AdminAuthContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// Pages
import Index from "./pages/Index";
import Shop from "./pages/Shop";
import ProductDetail from "./pages/ProductDetail";
import Cart from "./pages/Cart";
import Checkout from "./pages/Checkout";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import NotFound from "./pages/NotFound";
import About from "./pages/About";
import Contact from "./pages/Contact";

// Admin Pages
import AdminLogin from "./pages/admin/Login";
import AdminRegister from "./pages/admin/Register";
import AdminDashboard from "./pages/admin/Dashboard";
import InventoryPage from "./pages/admin/Inventory";
import UsersPage from "./pages/admin/Users";
import SettingsPage from "./pages/admin/Settings";
import ProductsPage from "./pages/admin/products/Products";
import AddProductPage from "./pages/admin/products/AddProduct";
import OrdersPage from "./pages/admin/Orders";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <CartProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AdminAuthProvider>
            <Routes>
              {/* Customer Routes with Navbar and Footer */}
              <Route path="/" element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow">
                    <Index />
                  </main>
                  <Footer />
                </div>
              } />
              
              <Route path="/shop" element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow">
                    <Shop />
                  </main>
                  <Footer />
                </div>
              } />
              
              <Route path="/product/:id" element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow">
                    <ProductDetail />
                  </main>
                  <Footer />
                </div>
              } />
              
              <Route path="/cart" element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow">
                    <Cart />
                  </main>
                  <Footer />
                </div>
              } />
              
              <Route path="/checkout" element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow">
                    <Checkout />
                  </main>
                  <Footer />
                </div>
              } />
              
              <Route path="/login" element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow">
                    <Login />
                  </main>
                  <Footer />
                </div>
              } />
              
              <Route path="/register" element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow">
                    <Register />
                  </main>
                  <Footer />
                </div>
              } />
              
              <Route path="/forgot-password" element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow">
                    <ForgotPassword />
                  </main>
                  <Footer />
                </div>
              } />
              
              <Route path="/about" element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow">
                    <About />
                  </main>
                  <Footer />
                </div>
              } />
              
              <Route path="/contact" element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow">
                    <Contact />
                  </main>
                  <Footer />
                </div>
              } />
              
              {/* Admin Routes without Navbar and Footer */}
              <Route path="/admin/login" element={<AdminLogin />} />
              <Route path="/admin/register" element={<AdminRegister />} />
              <Route path="/admin/dashboard" element={<AdminDashboard />} />
              <Route path="/admin/inventory" element={<InventoryPage />} />
              <Route path="/admin/users" element={<UsersPage />} />
              <Route path="/admin/settings" element={<SettingsPage />} />
              <Route path="/admin/products" element={<ProductsPage />} />
              <Route path="/admin/products/add" element={<AddProductPage />} />
              <Route path="/admin/orders" element={<OrdersPage />} />
              
              {/* 404 Route */}
              <Route path="*" element={
                <div className="flex flex-col min-h-screen">
                  <Navbar />
                  <main className="flex-grow">
                    <NotFound />
                  </main>
                  <Footer />
                </div>
              } />
            </Routes>
          </AdminAuthProvider>
        </BrowserRouter>
      </CartProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
