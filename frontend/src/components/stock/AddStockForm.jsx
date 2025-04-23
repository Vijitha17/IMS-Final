import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Input } from "@/components/ui/input";

const AddStockForm = ({ onSuccess }) => {
  const { toast } = useToast();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    console.log("Form submitted", data);
    
    toast({
      title: "Stock added successfully",
      description: `${data.itemName} has been added to inventory.`,
    });
    
    onSuccess();
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">ID</label>
            <Input
              name="id"
              type="text"
              placeholder="STK-001"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Item Name</label>
            <Input
              name="itemName"
              type="text"
              placeholder="Enter item name"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Category</label>
            <Select name="category">
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="electronics">Electronics</SelectItem>
                <SelectItem value="furniture">Furniture</SelectItem>
                <SelectItem value="stationery">Stationery</SelectItem>
                <SelectItem value="equipment">Equipment</SelectItem>
                <SelectItem value="tools">Tools</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Quantity</label>
            <Input
              name="quantity"
              type="number"
              min="1"
              placeholder="Enter quantity"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Supplier</label>
            <Select name="supplier">
              <SelectTrigger>
                <SelectValue placeholder="Select supplier" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="techsupplies">TechSupplies Ltd.</SelectItem>
                <SelectItem value="officesolutions">Office Solutions</SelectItem>
                <SelectItem value="furnituremasters">Furniture Masters</SelectItem>
                <SelectItem value="generalsupply">General Supply Co.</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Condition</label>
            <Select name="condition">
              <SelectTrigger>
                <SelectValue placeholder="Select condition" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">New</SelectItem>
                <SelectItem value="used-good">Used - Good</SelectItem>
                <SelectItem value="used-fair">Used - Fair</SelectItem>
                <SelectItem value="needs-repair">Needs Repair</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Purchase Date</label>
            <Input
              name="purchaseDate"
              type="date"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Warranty Until</label>
            <Input
              name="warrantyUntil"
              type="date"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <Input
            name="description"
            type="text"
            placeholder="Enter item description"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Additional Notes</label>
          <textarea
            name="notes"
            className="w-full px-3 py-2 border rounded-md min-h-[100px]"
            placeholder="Enter any additional notes"
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit">Add Stock</Button>
        </div>
      </form>
    </div>
  );
};

export default AddStockForm;