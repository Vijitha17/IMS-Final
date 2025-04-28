import React, { useState } from "react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  MoreHorizontal, 
  Edit, 
  Trash2,
  Eye,
  User,
  X,
  Filter,
  RefreshCw
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const UserForm = ({ user, isEditing, onCancel, onSave }) => {
  const form = useForm({
    defaultValues: user || {
      fin_no: "",
      full_name: "",
      email: "",
      role: "",
      college_name: null,
      department_name: null,
      phone_no: "",
      stats: "Active",
    },
  });

  const roles = [
    { value: "management_admin", label: "Management Admin" },
    { value: "management_people", label: "Management Staff" },
    { value: "principal", label: "Principal" },
    { value: "hod", label: "HOD" },
    { value: "department_admin", label: "Department Admin" },
  ];

  const colleges = [
    { value: null, label: "None" },
    { value: "Engineering College", label: "Engineering College" },
    { value: "Science College", label: "Science College" },
    { value: "Arts College", label: "Arts College" },
  ];

  const departments = [
    { value: null, label: "None" },
    { value: "Computer Science", label: "Computer Science" },
    { value: "Electrical Engineering", label: "Electrical Engineering" },
    { value: "Physics", label: "Physics" },
  ];

  const statusOptions = [
    { value: "Active", label: "Active" },
    { value: "Inactive", label: "Inactive" },
  ];

  const onSubmit = (data) => {
    onSave(data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="fin_no"
            render={({ field }) => (
              <FormItem>
                <FormLabel>FIN Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="full_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Full Name</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input type="email" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone_no"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {roles.map((role) => (
                      <SelectItem key={role.value} value={role.value}>
                        {role.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="stats"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {statusOptions.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        {status.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="college_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>College</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select college" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {colleges.map((college) => (
                      <SelectItem key={college.value} value={college.value}>
                        {college.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="department_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Department</FormLabel>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {departments.map((department) => (
                      <SelectItem key={department.value} value={department.value}>
                        {department.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {isEditing ? "Update User" : "Create User"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

const ViewUserDetails = ({ user, isOpen, onClose }) => {
  if (!user) return null;

  const getRoleLabel = (role) => {
    const roleLabels = {
      management_admin: "Management Admin",
      management_people: "Management Staff",
      principal: "Principal",
      hod: "HOD",
      department_admin: "Department Admin"
    };
    return roleLabels[role] || role;
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold">User Details</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">FIN Number</p>
                <p className="mt-1">{user.fin_no}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Full Name</p>
                <p className="mt-1">{user.full_name}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Email</p>
                <p className="mt-1">{user.email}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Phone</p>
                <p className="mt-1">{user.phone_no}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">College</p>
                <p className="mt-1">{user.college_name || "—"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Department</p>
                <p className="mt-1">{user.department_name || "—"}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Role</p>
                <div className="mt-1">{getRoleLabel(user.role)}</div>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <div className="mt-1">
                  <Badge 
                    variant="outline" 
                    className={user.stats === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                  >
                    {user.stats}
                  </Badge>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Created At</p>
                <p className="mt-1">{new Date(user.created_at).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Updated At</p>
                <p className="mt-1">{new Date(user.updated_at).toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const UserList = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [userToEdit, setUserToEdit] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [userToDelete, setUserToDelete] = useState(null);
  
  // Filter state
  const [collegeFilter, setCollegeFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);
  
  // Sample data - in a real app, this would come from an API
  const [users, setUsers] = useState([
    { 
      id: 1, 
      fin_no: "F12345", 
      full_name: "Dr. John Smith", 
      email: "john.smith@college.edu", 
      college_name: "Engineering College", 
      department_name: null,
      role: "principal", 
      stats: "Active",
      phone_no: "555-123-4567",
      created_at: "2023-05-10",
      updated_at: "2024-02-15"
    },
    { 
      id: 2, 
      fin_no: "F23456", 
      full_name: "Prof. Sarah Johnson", 
      email: "sarah.johnson@college.edu", 
      college_name: "Engineering College", 
      department_name: "Computer Science",
      role: "hod", 
      stats: "Active",
      phone_no: "555-234-5678",
      created_at: "2023-06-12",
      updated_at: "2024-01-10"
    },
    { 
      id: 3, 
      fin_no: "F34567", 
      full_name: "Mr. Michael Davis", 
      email: "michael.davis@college.edu", 
      college_name: "Science College", 
      department_name: "Physics",
      role: "department_admin", 
      stats: "Inactive",
      phone_no: "555-345-6789",
      created_at: "2023-07-22",
      updated_at: "2024-03-05"
    }
  ]);

  // Get unique colleges and departments for filters
  const uniqueColleges = [...new Set(users.filter(user => user.college_name).map(user => user.college_name))];
  const uniqueDepartments = [...new Set(users.filter(user => user.department_name).map(user => user.department_name))];
  
  // Filtered users based on selected filters
  const filteredUsers = users.filter(user => {
    const collegeMatch = collegeFilter === "all" || user.college_name === collegeFilter;
    const departmentMatch = departmentFilter === "all" || user.department_name === departmentFilter;
    return collegeMatch && departmentMatch;
  });

  const resetFilters = () => {
    setCollegeFilter("all");
    setDepartmentFilter("all");
  };

  const getRoleBadge = (role) => {
    const roleColors = {
      management_admin: "bg-purple-100 text-purple-800",
      management_people: "bg-indigo-100 text-indigo-800",
      principal: "bg-blue-100 text-blue-800",
      hod: "bg-green-100 text-green-800",
      department_admin: "bg-amber-100 text-amber-800"
    };
    
    const roleLabels = {
      management_admin: "Management Admin",
      management_people: "Management Staff",
      principal: "Principal",
      hod: "HOD",
      department_admin: "Department Admin"
    };
    
    return (
      <Badge variant="outline" className={`${roleColors[role]} border-none`}>
        {roleLabels[role]}
      </Badge>
    );
  };

  const handleViewDetails = (user) => {
    setSelectedUser(user);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (user) => {
    setUserToEdit(user);
    setIsEditing(true);
  };

  const handleDelete = (user) => {
    setUserToDelete(user);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setUsers(prev => prev.filter(u => u.id !== userToDelete.id));
    toast({
      title: "User Deleted",
      description: `${userToDelete.full_name} has been removed.`,
    });
    setIsDeleteDialogOpen(false);
  };

  const handleSaveEdit = (updatedUser) => {
    setUsers(prev => prev.map(u => 
      u.id === updatedUser.id ? { 
        ...updatedUser, 
        updated_at: new Date().toISOString() 
      } : u
    ));
    toast({
      title: "User Updated",
      description: "User details have been updated.",
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setUserToEdit(null);
  };

  return (
    <div className="space-y-4">
      {isEditing ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">
            {userToEdit ? "Edit User" : "Create User"}
          </h2>
          <UserForm 
            user={userToEdit}
            isEditing={!!userToEdit}
            onCancel={handleCancelEdit}
            onSave={handleSaveEdit}
          />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow">
          {/* Filter section */}
          <div className="p-4 border-b">
            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium">Filters</h3>
              <div className="flex space-x-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  onClick={() => setShowFilters(!showFilters)}
                >
                  <Filter className="h-4 w-4 mr-1" />
                  {showFilters ? "Hide Filters" : "Show Filters"}
                </Button>
                {showFilters && (
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={resetFilters}
                  >
                    <RefreshCw className="h-3 w-3 mr-1" />
                    Reset
                  </Button>
                )}
              </div>
            </div>
            
            {showFilters && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2">
                <div>
                  <label htmlFor="college-filter" className="text-sm font-medium mb-1 block">College</label>
                  <Select value={collegeFilter} onValueChange={setCollegeFilter}>
                    <SelectTrigger id="college-filter">
                      <SelectValue placeholder="Filter by college" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Colleges</SelectItem>
                      {uniqueColleges.map(college => (
                        <SelectItem key={college} value={college}>{college}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="department-filter" className="text-sm font-medium mb-1 block">Department</label>
                  <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                    <SelectTrigger id="department-filter">
                      <SelectValue placeholder="Filter by department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {uniqueDepartments.map(department => (
                        <SelectItem key={department} value={department}>{department}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            )}
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>College/Department</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div>
                      <div>{user.full_name}</div>
                      <div className="text-sm text-muted-foreground">{user.email}</div>
                    </div>
                  </TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>
                    <div>
                      <div className="text-sm">{user.college_name || "—"}</div>
                      <div className="text-xs text-muted-foreground">{user.department_name || "—"}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline" 
                      className={user.stats === "Active" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}
                    >
                      {user.stats}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Open menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleViewDetails(user)}>
                          <Eye className="mr-2 h-4 w-4" />
                          View Details
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => handleEdit(user)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit User
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem 
                          className="text-red-600"
                          onClick={() => handleDelete(user)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete User
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
              {filteredUsers.length === 0 && (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-6">
                    <div className="text-muted-foreground">
                      No users found matching the selected filters
                    </div>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="mt-2"
                      onClick={resetFilters}
                    >
                      Reset Filters
                    </Button>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {isViewDialogOpen && (
        <ViewUserDetails 
          user={selectedUser}
          isOpen={isViewDialogOpen}
          onClose={() => setIsViewDialogOpen(false)}
        />
      )}

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the user "{userToDelete?.full_name}" 
              and remove their data from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default UserList;