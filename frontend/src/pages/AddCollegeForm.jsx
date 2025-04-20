
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
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

const AddCollegeForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    address: "",
    phone: "",
    email: "",
    principal: "",
    establishedYear: "",
    description: ""
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, you'd save this to the database
    console.log("Submitting college data:", formData);
    
    toast({
      title: "College added successfully",
      description: `${formData.name} has been added to the system.`
    });
    
    navigate("/users/college");
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
            <Button variant="ghost" onClick={() => navigate("/users/college")} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Colleges
            </Button>
            <h1 className="text-2xl font-bold">Add New College</h1>
          </div>
          
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>College Information</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">College Name</label>
                    <input
                      type="text"
                      name="name"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter college name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">College Code</label>
                    <input
                      type="text"
                      name="code"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter college code"
                      value={formData.code}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Address</label>
                  <textarea
                    name="address"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter college address"
                    value={formData.address}
                    onChange={handleChange}
                    required
                    rows={3}
                  />
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Phone Number</label>
                    <input
                      type="tel"
                      name="phone"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter phone number"
                      value={formData.phone}
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
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Principal</label>
                    <input
                      type="text"
                      name="principal"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter principal's name"
                      value={formData.principal}
                      onChange={handleChange}
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Established Year</label>
                    <input
                      type="number"
                      name="establishedYear"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter year established"
                      value={formData.establishedYear}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Description</label>
                  <textarea
                    name="description"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter college description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                  />
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-end space-x-2">
                <Button variant="outline" type="button" onClick={() => navigate("/users/college")}>
                  Cancel
                </Button>
                <Button type="submit">
                  Add College
                </Button>
              </CardFooter>
            </form>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AddCollegeForm;
