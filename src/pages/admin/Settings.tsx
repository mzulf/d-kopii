
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAdminAuth } from "@/context/AdminAuthContext";

const AdminSettings = () => {
  const { adminUser } = useAdminAuth();
  const [storeName, setStoreName] = useState("D'Kopi Coffee Shop");
  const [storeEmail, setStoreEmail] = useState("contact@dkopi.com");
  const [currency, setCurrency] = useState("USD");
  const [timezone, setTimezone] = useState("UTC+7");
  const [enableNotifications, setEnableNotifications] = useState(true);
  const [enableInventoryAlerts, setEnableInventoryAlerts] = useState(true);
  const [theme, setTheme] = useState("light");
  const [isLoading, setIsLoading] = useState(false);

  const handleSaveGeneralSettings = () => {
    setIsLoading(true);
    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Settings saved",
        description: "Your general settings have been updated successfully.",
      });
    }, 1000);
  };

  const handleSaveNotificationSettings = () => {
    setIsLoading(true);
    // Mock API call
    setTimeout(() => {
      setIsLoading(false);
      toast({
        title: "Notification settings saved",
        description: "Your notification preferences have been updated.",
      });
    }, 1000);
  };

  return (
    <AdminLayout title="Settings">
      <div className="max-w-4xl mx-auto">
        <Tabs defaultValue="general" className="w-full">
          <TabsList className="grid grid-cols-3 mb-8">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>
          
          <TabsContent value="general">
            <Card>
              <CardHeader>
                <CardTitle>General Settings</CardTitle>
                <CardDescription>
                  Manage your store's basic information and preferences.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label htmlFor="storeName">Store Name</Label>
                  <Input 
                    id="storeName" 
                    value={storeName}
                    onChange={(e) => setStoreName(e.target.value)}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="storeEmail">Store Email</Label>
                  <Input 
                    id="storeEmail" 
                    type="email"
                    value={storeEmail}
                    onChange={(e) => setStoreEmail(e.target.value)}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="currency">Currency</Label>
                    <Select value={currency} onValueChange={setCurrency}>
                      <SelectTrigger id="currency">
                        <SelectValue placeholder="Select currency" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="USD">US Dollar (USD)</SelectItem>
                        <SelectItem value="EUR">Euro (EUR)</SelectItem>
                        <SelectItem value="GBP">British Pound (GBP)</SelectItem>
                        <SelectItem value="IDR">Indonesian Rupiah (IDR)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="timezone">Timezone</Label>
                    <Select value={timezone} onValueChange={setTimezone}>
                      <SelectTrigger id="timezone">
                        <SelectValue placeholder="Select timezone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="UTC-8">Pacific Time (UTC-8)</SelectItem>
                        <SelectItem value="UTC-5">Eastern Time (UTC-5)</SelectItem>
                        <SelectItem value="UTC+0">Greenwich Mean Time (UTC+0)</SelectItem>
                        <SelectItem value="UTC+7">Western Indonesian Time (UTC+7)</SelectItem>
                        <SelectItem value="UTC+9">Japan Standard Time (UTC+9)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleSaveGeneralSettings} 
                  disabled={isLoading}
                  className="bg-coffee-dark hover:bg-coffee-accent"
                >
                  {isLoading ? (
                    <>
                      <span className="animate-spin mr-2">⌛</span>
                      Saving...
                    </>
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>Notification Preferences</CardTitle>
                <CardDescription>
                  Control how and when you receive notifications.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive daily summary of store activities</p>
                  </div>
                  <Switch 
                    checked={enableNotifications}
                    onCheckedChange={setEnableNotifications}
                  />
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Low Stock Alerts</p>
                    <p className="text-sm text-muted-foreground">Get notified when inventory is running low</p>
                  </div>
                  <Switch 
                    checked={enableInventoryAlerts}
                    onCheckedChange={setEnableInventoryAlerts}
                  />
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={handleSaveNotificationSettings} 
                  disabled={isLoading}
                  className="bg-coffee-dark hover:bg-coffee-accent"
                >
                  {isLoading ? "Saving..." : "Save Preferences"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="appearance">
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>
                  Customize how the admin dashboard looks.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <Label>Theme</Label>
                  <div className="grid grid-cols-3 gap-4">
                    <div 
                      className={`border rounded-md p-4 cursor-pointer flex flex-col items-center ${theme === 'light' ? 'border-coffee-dark bg-muted' : ''}`}
                      onClick={() => setTheme('light')}
                    >
                      <div className="w-full h-20 bg-background border rounded mb-2"></div>
                      <span>Light</span>
                    </div>
                    <div 
                      className={`border rounded-md p-4 cursor-pointer flex flex-col items-center ${theme === 'dark' ? 'border-coffee-dark bg-muted' : ''}`}
                      onClick={() => setTheme('dark')}
                    >
                      <div className="w-full h-20 bg-slate-800 border rounded mb-2"></div>
                      <span>Dark</span>
                    </div>
                    <div 
                      className={`border rounded-md p-4 cursor-pointer flex flex-col items-center ${theme === 'system' ? 'border-coffee-dark bg-muted' : ''}`}
                      onClick={() => setTheme('system')}
                    >
                      <div className="w-full h-20 bg-gradient-to-r from-background to-slate-800 border rounded mb-2"></div>
                      <span>System</span>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button 
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => {
                      setIsLoading(false);
                      toast({
                        title: "Theme updated",
                        description: "Your appearance preferences have been saved.",
                      });
                    }, 1000);
                  }} 
                  disabled={isLoading}
                  className="bg-coffee-dark hover:bg-coffee-accent"
                >
                  {isLoading ? "Applying..." : "Apply Theme"}
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AdminLayout>
  );
};

export default AdminSettings;
