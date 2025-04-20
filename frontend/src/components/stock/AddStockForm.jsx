import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

const AddStockForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted");
    
    toast({
      title: "Stock added successfully",
      description: "The new stock item has been added.",
    });
    
    navigate("/stock");
  };
  
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold">Add New Stock</h2>
        <Button variant="outline" onClick={() => navigate("/stock")}>
          Cancel
        </Button>
      </div>
      
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Item Name</label>
            <input
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Enter item name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select>
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
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Supplier/Vendor</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select supplier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="techsupplies">TechSupplies Ltd.</SelectItem>
                <SelectItem value="officesolutions">Office Solutions</SelectItem>
                <SelectItem value="furnituremasters">Furniture Masters</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Condition</label>
            <Select>
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
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Warranty End Date</label>
            <input
              type="date"
              className="w-full px-3 py-2 border rounded-md"
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
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Location/Department</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select location" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cs">Computer Science</SelectItem>
                <SelectItem value="it">Information Technology</SelectItem>
                <SelectItem value="eee">Electrical Engineering</SelectItem>
                <SelectItem value="admin">Administrative Office</SelectItem>
                <SelectItem value="store">Main Store</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <textarea
            className="w-full px-3 py-2 border rounded-md min-h-[100px]"
            placeholder="Enter item description"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Additional Notes</label>
          <textarea
            className="w-full px-3 py-2 border rounded-md min-h-[100px]"
            placeholder="Enter any additional notes"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button type="submit">Save Stock</Button>
        </div>
      </form>
    </div>
  );
};

export default AddStockForm;
