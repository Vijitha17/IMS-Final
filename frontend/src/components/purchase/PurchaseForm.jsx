
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const PurchaseForm = ({ onCancel }) => {
  return (
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
          <label htmlFor="vendor" className="text-sm font-medium">
            Vendor
          </label>
          <Select>
            <SelectTrigger id="vendor">
              <SelectValue placeholder="Select vendor" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="vendor1">Tech Solutions Ltd</SelectItem>
              <SelectItem value="vendor2">Office Supplies Co</SelectItem>
              <SelectItem value="vendor3">Lab Equipment Inc</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="amount" className="text-sm font-medium">
            Total Amount
          </label>
          <input
            id="amount"
            type="number"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter amount"
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="items" className="text-sm font-medium">
            Items
          </label>
          <textarea
            id="items"
            className="w-full px-3 py-2 border rounded-md"
            rows={3}
            placeholder="Enter items (one per line)"
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="remarks" className="text-sm font-medium">
            Remarks
          </label>
          <textarea
            id="remarks"
            className="w-full px-3 py-2 border rounded-md"
            rows={3}
            placeholder="Enter any additional remarks"
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Submit Purchase Request</Button>
      </div>
    </form>
  );
};

export default PurchaseForm;
