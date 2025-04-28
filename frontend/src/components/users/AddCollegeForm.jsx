import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";

const AddCollegeForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ 
    id: "",
    name: "" 
  });
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // Generate a random college ID when component mounts
  useEffect(() => {
    const generateCollegeId = () => {
      // Generate a random alphanumeric ID (e.g., "COL-12345")
      const randomId = "COL-" + Math.floor(10000 + Math.random() * 90000);
      setFormData(prev => ({ ...prev, id: randomId }));
    };
    
    generateCollegeId();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("College added:", formData);
    navigate("/users/colleges");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} />
        
        <main className={`flex-1 p-6 md:p-8 transition-all duration-300 ${sidebarOpen ? "md:ml-64" : "md:ml-20"}`}>
          <div className="flex items-center mb-6">
            <Button variant="ghost" onClick={() => navigate("/users/colleges")}>
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Colleges
            </Button>
            <h1 className="text-2xl font-bold ml-2">Add New College</h1>
          </div>
          
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>College Information</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">College ID (Auto-generated)</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md bg-gray-100"
                    value={formData.id}
                    readOnly
                  />
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">College Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                  />
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => navigate("/users/colleges")}>
                  Cancel
                </Button>
                <Button type="submit">Save College</Button>
              </CardFooter>
            </form>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AddCollegeForm;