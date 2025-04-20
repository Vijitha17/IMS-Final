
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardFooter, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

const CreateUserForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
    college: "",
    department: "",
    position: "",
    phone: ""
  });
  
  // Sample data - in a real app, you'd fetch this from an API
  const colleges = [
    { id: "1", name: "Engineering College" },
    { id: "2", name: "Science College" },
    { id: "3", name: "Arts College" },
    { id: "4", name: "Commerce College" }
  ];
  
  const departments = [
    { id: "1", collegeId: "1", name: "Computer Science" },
    { id: "2", collegeId: "1", name: "Electrical Engineering" },
    { id: "3", collegeId: "1", name: "Mechanical Engineering" },
    { id: "4", collegeId: "2", name: "Physics" },
    { id: "5", collegeId: "2", name: "Chemistry" },
    { id: "6", collegeId: "3", name: "English" },
    { id: "7", collegeId: "3", name: "History" },
    { id: "8", collegeId: "4", name: "Accounting" },
    { id: "9", collegeId: "4", name: "Economics" }
  ];
  
  const filteredDepartments = formData.college 
    ? departments.filter(dept => dept.collegeId === formData.college) 
    : [];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (field, value) => {
    if (field === "college") {
      // Reset department when college changes
      setFormData(prev => ({ ...prev, college: value, department: "" }));
    } else {
      setFormData(prev => ({ ...prev, [field]: value }));
    }
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, you'd save this to the database
    console.log("Submitting user data:", formData);
    
    toast({
      title: "User created successfully",
      description: `${formData.name} has been added to the system.`
    });
    
    navigate("/users");
  };
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} />
        
        <main className={`flex-1 p-6 md:p-8 transition-all duration-300 ${sidebarOpen ? "md:ml-64" : "md:ml-20"}`}>
          <div className="flex items-center mb-6">
            <Button variant="ghost" onClick={() => navigate("/users")} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Users
            </Button>
            <h1 className="text-2xl font-bold">Create New User</h1>
          </div>
          
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>User Information</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Full Name</label>
                    <input
                      type="text"
                      name="name"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter full name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Email</label>
                    <input
                      type="email"
                      name="email"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter email address"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Role</label>
                  <Select value={formData.role} onValueChange={(value) => handleSelectChange("role", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="management_people">Management People</SelectItem>
                      <SelectItem value="management_admin">Management Admin</SelectItem>
                      <SelectItem value="principal">Principal</SelectItem>
                      <SelectItem value="hod">HOD</SelectItem>
                      <SelectItem value="department_admin">Department Admin</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">College</label>
                    <Select value={formData.college} onValueChange={(value) => handleSelectChange("college", value)}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select college" />
                      </SelectTrigger>
                      <SelectContent>
                        {colleges.map(college => (
                          <SelectItem key={college.id} value={college.id}>
                            {college.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Department</label>
                    <Select 
                      value={formData.department} 
                      onValueChange={(value) => handleSelectChange("department", value)}
                      disabled={!formData.college}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder={formData.college ? "Select department" : "Select college first"} />
                      </SelectTrigger>
                      <SelectContent>
                        {filteredDepartments.map(dept => (
                          <SelectItem key={dept.id} value={dept.id}>
                            {dept.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Position</label>
                    <input
                      type="text"
                      name="position"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter position/title"
                      value={formData.position}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter phone number"
                      value={formData.phone}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Password</label>
                  <input
                    type="password"
                    name="password"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter temporary password"
                    required
                  />
                  <p className="text-xs text-muted-foreground mt-1">
                    User will be prompted to change this password on first login
                  </p>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline" type="button" onClick={() => navigate("/users")}>
                  Cancel
                </Button>
                <Button type="submit">
                  Create User
                </Button>
              </CardFooter>
            </form>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default CreateUserForm;
