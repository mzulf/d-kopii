
import { useState } from "react";
import AdminLayout from "@/components/admin/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Search, Mail } from "lucide-react";

// Mock users data
const mockUsers = [
  { id: "1", name: "John Doe", email: "john@example.com", role: "user", orders: 5, status: "active" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", role: "user", orders: 8, status: "active" },
  { id: "3", name: "Mike Johnson", email: "mike@example.com", role: "user", orders: 3, status: "inactive" },
  { id: "4", name: "Sarah Williams", email: "sarah@example.com", role: "user", orders: 12, status: "active" },
  { id: "5", name: "Robert Brown", email: "robert@example.com", role: "admin", orders: 0, status: "active" },
  { id: "6", name: "Emily Davis", email: "emily@example.com", role: "user", orders: 7, status: "inactive" },
];

const UsersPage = () => {
  const [users, setUsers] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState<string>("all");

  // Filter users based on search term and role
  const filteredUsers = users.filter(user => {
    const matchesSearch = searchTerm === "" || 
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesRole = selectedRole === "all" || user.role === selectedRole;
    
    return matchesSearch && matchesRole;
  });

  // Update user role
  const updateUserRole = (userId: string, newRole: string) => {
    setUsers(prev => prev.map(user => 
      user.id === userId ? { ...user, role: newRole } : user
    ));
    
    toast({
      title: "Role updated",
      description: "User role has been updated successfully."
    });
  };

  return (
    <AdminLayout title="User Management">
      <div className="space-y-4">
        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search users..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          
          {/* Role Filter */}
          <Select 
            value={selectedRole} 
            onValueChange={setSelectedRole}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
              <SelectItem value="user">User</SelectItem>
            </SelectContent>
          </Select>
          
          {/* Contact Users Button */}
          <Button className="gap-2 bg-coffee-dark hover:bg-coffee-accent">
            <Mail className="h-4 w-4" />
            Contact Users
          </Button>
        </div>
        
        {/* Users Table */}
        <div className="rounded-md border">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b bg-muted/50 text-muted-foreground">
                  <th className="py-3 px-4 text-left font-medium">Name</th>
                  <th className="py-3 px-4 text-left font-medium">Email</th>
                  <th className="py-3 px-4 text-left font-medium">Role</th>
                  <th className="py-3 px-4 text-left font-medium">Orders</th>
                  <th className="py-3 px-4 text-left font-medium">Status</th>
                  <th className="py-3 px-4 text-left font-medium">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="py-6 text-center text-muted-foreground">
                      No users found.
                    </td>
                  </tr>
                ) : (
                  filteredUsers.map((user) => (
                    <tr key={user.id} className="border-b last:border-0 hover:bg-muted/50">
                      <td className="py-3 px-4">{user.name}</td>
                      <td className="py-3 px-4">{user.email}</td>
                      <td className="py-3 px-4">
                        <Select 
                          defaultValue={user.role}
                          onValueChange={(value) => updateUserRole(user.id, value)}
                        >
                          <SelectTrigger className="w-[100px] h-8">
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="admin">Admin</SelectItem>
                            <SelectItem value="user">User</SelectItem>
                          </SelectContent>
                        </Select>
                      </td>
                      <td className="py-3 px-4">{user.orders}</td>
                      <td className="py-3 px-4">
                        <span className={`inline-block px-2 py-1 text-xs rounded-full ${
                          user.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                        }`}>
                          {user.status}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">View</Button>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="text-red-500 hover:text-red-700"
                          >
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

export default UsersPage;
