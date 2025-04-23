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

const AddDepartmentForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    college: "",
    hod: "",
    phone: "",
    email: "",
    establishedYear: "",
    description: ""
  });
  
  const colleges = [
    { id: "1", name: "Engineering College" },
    { id: "2", name: "Science College" },
    { id: "3", name: "Arts College" },
    { id: "4", name: "Commerce College" }
  ];
  
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
                {/* Rest of your form fields */}
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