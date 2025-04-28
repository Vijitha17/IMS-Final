import React, { useState, useEffect } from "react";
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

const AddDepartmentForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    departmentId: "",
    college: "",
    name: ""
  });
  
  const colleges = [
    { id: "1", name: "Engineering College" },
    { id: "2", name: "Science College" },
    { id: "3", name: "Arts College" },
    { id: "4", name: "Commerce College" }
  ];
  
  // Generate a department ID when component mounts
  useEffect(() => {
    const generateDepartmentId = () => {
      const randomId = "DEPT-" + Math.floor(10000 + Math.random() * 90000);
      setFormData(prev => ({ ...prev, departmentId: randomId }));
    };
    
    generateDepartmentId();
  }, []);
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting department data:", formData);
    toast({
      title: "Department added successfully",
      description: `${formData.name} has been added to the system.`
    });
    navigate("/users/departments");
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
            <Button variant="ghost" onClick={() => navigate("/users/departments")} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Departments
            </Button>
            <h1 className="text-2xl font-bold">Add New Department</h1>
          </div>
          
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Department Information</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                {/* Department ID Field (Auto-generated) */}
                <div className="space-y-2">
                  <label htmlFor="departmentId" className="text-sm font-medium">Department ID (Auto-generated)</label>
                  <input
                    id="departmentId"
                    type="text"
                    name="departmentId"
                    className="w-full px-3 py-2 border rounded-md bg-gray-100"
                    value={formData.departmentId}
                    readOnly
                  />
                </div>
                
                {/* College Selection Dropdown */}
                <div className="space-y-2">
                  <label htmlFor="college" className="text-sm font-medium">College</label>
                  <Select 
                    value={formData.college} 
                    onValueChange={(value) => handleSelectChange("college", value)}
                  >
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select a college" />
                    </SelectTrigger>
                    <SelectContent>
                      {colleges.map((college) => (
                        <SelectItem key={college.id} value={college.id}>
                          {college.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                {/* Department Name Field */}
                <div className="space-y-2">
                  <label htmlFor="name" className="text-sm font-medium">Department Name</label>
                  <input
                    id="name"
                    type="text"
                    name="name"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline" type="button" onClick={() => navigate("/users/departments")}>
                  Cancel
                </Button>
                <Button type="submit">
                  Add Department
                </Button>
              </CardFooter>
            </form>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AddDepartmentForm;