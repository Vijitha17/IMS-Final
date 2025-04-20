
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const VendorForm = ({ onCancel }) => {
  return (
    <form className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Vendor Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter vendor name"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="type" className="text-sm font-medium">
            Vendor Type
          </label>
          <Select>
            <SelectTrigger id="type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="service">Service Vendor</SelectItem>
              <SelectItem value="product">Product Vendor</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="contact" className="text-sm font-medium">
            Contact Person
          </label>
          <input
            id="contact"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter contact person name"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter email address"
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="address" className="text-sm font-medium">
            Address
          </label>
          <textarea
            id="address"
            className="w-full px-3 py-2 border rounded-md"
            rows={3}
            placeholder="Enter vendor address"
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="products" className="text-sm font-medium">
            Products/Services
          </label>
          <textarea
            id="products"
            className="w-full px-3 py-2 border rounded-md"
            rows={3}
            placeholder="Enter products or services (one per line)"
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Vendor</Button>
      </div>
    </form>
  );
};

export default VendorForm;
