
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { ArrowLeft } from "lucide-react";

const EditStockForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
  // In a real app, you'd fetch this using the id
  const [stockData, setStockData] = useState({
    id: id,
    name: "Desktop Computer",
    category: "electronics",
    quantity: 25,
    supplier: "TechSupplies Ltd.",
    condition: "good",
    purchaseDate: "2024-10-15",
    warrantyEnd: "2026-10-15",
    purchasePrice: 799.99,
    location: "Computer Science Department",
    description: "High-performance desktop computer for office use.",
    notes: "Regular maintenance required every 6 months."
  });
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleChange = (field, value) => {
    setStockData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting updated stock data:", stockData);
    
    toast({
      title: "Stock updated successfully",
      description: `${stockData.name} has been updated.`,
    });
    
    navigate("/stock");
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} />
        
        <main className={`flex-1 p-6 md:p-8 transition-all duration-300 ${sidebarOpen ? "md:ml-64" : "md:ml-20"}`}>
          <div className="flex items-center mb-6">
            <Button variant="ghost" onClick={() => navigate("/stock")} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Stock
            </Button>
            <h1 className="text-2xl font-bold">Edit Stock Item</h1>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Item Name</label>
                  <input
                    type="text"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter item name"
                    value={stockData.name}
                    onChange={(e) => handleChange("name", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <Select value={stockData.category} onValueChange={(value) => handleChange("category", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="electronics">Electronics</SelectItem>
                      <SelectItem value="furniture">Furniture</SelectItem>
                      <SelectItem value="stationery">Stationery</SelectItem>
                      <SelectItem value="equipment">Equipment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Quantity</label>
                  <input
                    type="number"
                    min="1"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter quantity"
                    value={stockData.quantity}
                    onChange={(e) => handleChange("quantity", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Supplier/Vendor</label>
                  <Select value={stockData.supplier} onValueChange={(value) => handleChange("supplier", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select supplier" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="TechSupplies Ltd.">TechSupplies Ltd.</SelectItem>
                      <SelectItem value="Office Solutions">Office Solutions</SelectItem>
                      <SelectItem value="Furniture Masters">Furniture Masters</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Condition</label>
                  <Select value={stockData.condition} onValueChange={(value) => handleChange("condition", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="good">Good</SelectItem>
                      <SelectItem value="average">Average</SelectItem>
                      <SelectItem value="needs-repair">Needs Repair</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Purchase Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border rounded-md"
                    value={stockData.purchaseDate}
                    onChange={(e) => handleChange("purchaseDate", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Warranty End Date</label>
                  <input
                    type="date"
                    className="w-full px-3 py-2 border rounded-md"
                    value={stockData.warrantyEnd}
                    onChange={(e) => handleChange("warrantyEnd", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Purchase Price</label>
                  <input
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border rounded-md"
                    placeholder="Enter purchase price"
                    value={stockData.purchasePrice}
                    onChange={(e) => handleChange("purchasePrice", e.target.value)}
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">Location/Department</label>
                  <Select value={stockData.location} onValueChange={(value) => handleChange("location", value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select location" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Computer Science Department">Computer Science</SelectItem>
                      <SelectItem value="Information Technology Department">Information Technology</SelectItem>
                      <SelectItem value="Electrical Engineering Department">Electrical Engineering</SelectItem>
                      <SelectItem value="Administrative Office">Administrative Office</SelectItem>
                      <SelectItem value="Main Store">Main Store</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <textarea
                  className="w-full px-3 py-2 border rounded-md min-h-[100px]"
                  placeholder="Enter item description"
                  value={stockData.description}
                  onChange={(e) => handleChange("description", e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Additional Notes</label>
                <textarea
                  className="w-full px-3 py-2 border rounded-md min-h-[100px]"
                  placeholder="Enter any additional notes"
                  value={stockData.notes}
                  onChange={(e) => handleChange("notes", e.target.value)}
                />
              </div>

              <div className="flex justify-end space-x-2">
                <Button variant="outline" type="button" onClick={() => navigate("/stock")}>Cancel</Button>
                <Button type="submit">Update Stock</Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
};

export default EditStockForm;
