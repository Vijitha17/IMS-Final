
import React from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const CreatePurchaseRequest = () => {
  const [sidebarOpen, setSidebarOpen] = React.useState(false);
  const navigate = useNavigate();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleCancel = () => {
    navigate('/purchase');
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} />
        
        <main className={`flex-1 p-6 md:p-8 transition-all duration-300 ${sidebarOpen ? "md:ml-64" : "md:ml-20"}`}>
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold">Create Purchase Request</h1>
            <Button variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow p-6">
            <form className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label htmlFor="department" className="text-sm font-medium">
                    Department
                  </label>
                  <Select>
                    <SelectTrigger id="department">
                      <SelectValue placeholder="Select department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cs">Computer Science</SelectItem>
                      <SelectItem value="physics">Physics</SelectItem>
                      <SelectItem value="chemistry">Chemistry</SelectItem>
                      <SelectItem value="admin">Administration</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="category" className="text-sm font-medium">
                    Category
                  </label>
                  <Select>
                    <SelectTrigger id="category">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="equipment">Equipment</SelectItem>
                      <SelectItem value="supplies">Supplies</SelectItem>
                      <SelectItem value="furniture">Furniture</SelectItem>
                      <SelectItem value="services">Services</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="priority" className="text-sm font-medium">
                    Priority
                  </label>
                  <Select>
                    <SelectTrigger id="priority">
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="high">High</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="low">Low</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="requestedBy" className="text-sm font-medium">
                    Requested By
                  </label>
                  <input
                    id="requestedBy"
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Your name"
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="items" className="text-sm font-medium">
                    Items Required
                  </label>
                  <textarea
                    id="items"
                    className="w-full px-3 py-2 border rounded-md"
                    rows={3}
                    placeholder="Enter items (one per line with quantity)"
                  />
                </div>
                
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="justification" className="text-sm font-medium">
                    Justification
                  </label>
                  <textarea
                    id="justification"
                    className="w-full px-3 py-2 border rounded-md"
                    rows={3}
                    placeholder="Explain why these items are needed"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="estimatedCost" className="text-sm font-medium">
                    Estimated Cost
                  </label>
                  <input
                    id="estimatedCost"
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter estimated cost"
                  />
                </div>
                
                <div className="space-y-2">
                  <label htmlFor="requiredBy" className="text-sm font-medium">
                    Required By (Date)
                  </label>
                  <input
                    id="requiredBy"
                    type="date"
                    className="w-full px-3 py-2 border rounded-md"
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
                <Button type="submit">Submit Request</Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default CreatePurchaseRequest;
