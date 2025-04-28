import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const AddLocationForm = () => {
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [formData, setFormData] = useState({ 
    location_id: "",
    location_number: "",
    location_name: "",
    college_name: "",
    department_name: ""
  });

  // Sample data that would normally come from your API
  const colleges = [
    { college_id: 1, college_name: "Engineering College" },
    { college_id: 2, college_name: "Science College" },
    { college_id: 3, college_name: "Arts College" }
  ];

  const departments = [
    { department_id: 1, department_name: "Computer Science", college_name: "Engineering College" },
    { department_id: 2, department_name: "Electrical Engineering", college_name: "Engineering College" },
    { department_id: 3, department_name: "Physics", college_name: "Science College" },
    { department_id: 4, department_name: "Chemistry", college_name: "Science College" },
    { department_id: 5, department_name: "English Literature", college_name: "Arts College" }
  ];

  // Filter departments based on selected college
  const filteredDepartments = departments.filter(
    dept => dept.college_name === formData.college_name
  );

  // Generate a random location ID when component mounts
  useEffect(() => {
    const generateLocationId = () => {
      // Generate a random alphanumeric ID (e.g., "LOC-12345")
      const randomId = "LOC-" + Math.floor(10000 + Math.random() * 90000);
      setFormData(prev => ({ ...prev, location_id: randomId }));
    };
    
    generateLocationId();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field, value) => {
    // Handle "none" value for department
    if (field === "department_name" && value === "none") {
      setFormData(prev => {
        return { ...prev, [field]: "" };
      });
    } else {
      setFormData(prev => {
        // Reset department_name when college changes
        if (field === "college_name") {
          return { ...prev, college_name: value, department_name: "" };
        }
        return { ...prev, [field]: value };
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Location added:", formData);
    navigate("/users/locations");
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar toggleSidebar={() => setSidebarOpen(!sidebarOpen)} sidebarOpen={sidebarOpen} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} />
        
        <main className={`flex-1 p-6 md:p-8 transition-all duration-300 ${sidebarOpen ? "md:ml-64" : "md:ml-20"}`}>
          <div className="flex items-center mb-6">
            <Button variant="ghost" onClick={() => navigate("/users/locations")}>
              <ArrowLeft className="h-4 w-4 mr-2" /> Back to Locations
            </Button>
            <h1 className="text-2xl font-bold ml-2">Add New Location</h1>
          </div>
          
          <Card>
            <form onSubmit={handleSubmit}>
              <CardHeader>
                <CardTitle>Location Information</CardTitle>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location ID (Auto-generated)</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md bg-gray-100"
                    value={formData.location_id}
                    readOnly
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="location_number" className="text-sm font-medium">Location Number</label>
                  <input
                    id="location_number"
                    name="location_number"
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.location_number}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="location_name" className="text-sm font-medium">Location Name</label>
                  <input
                    id="location_name"
                    name="location_name"
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    value={formData.location_name}
                    onChange={handleChange}
                    required
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="college_name" className="text-sm font-medium">College Name</label>
                  <Select 
                    onValueChange={(value) => handleSelectChange("college_name", value)}
                    value={formData.college_name}
                    required
                  >
                    <SelectTrigger id="college_name">
                      <SelectValue placeholder="Select College" />
                    </SelectTrigger>
                    <SelectContent>
                      {colleges.map(college => (
                        <SelectItem key={college.college_id} value={college.college_name}>
                          {college.college_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="department_name" className="text-sm font-medium">Department Name (Optional)</label>
                  <Select 
                    onValueChange={(value) => handleSelectChange("department_name", value)}
                    value={formData.department_name || "none"}
                    disabled={!formData.college_name}
                  >
                    <SelectTrigger id="department_name">
                      <SelectValue placeholder={formData.college_name ? "Select Department" : "First select a college"} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">None</SelectItem>
                      {filteredDepartments.map(department => (
                        <SelectItem key={department.department_id} value={department.department_name}>
                          {department.department_name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </CardContent>
              
              <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" onClick={() => navigate("/users/locations")}>
                  Cancel
                </Button>
                <Button type="submit">Save Location</Button>
              </CardFooter>
            </form>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default AddLocationForm;