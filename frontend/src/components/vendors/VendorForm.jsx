import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";
import { toast } from "@/components/ui/use-toast";

const VendorForm = ({ vendor, onCancel, onSave }) => {
  const [formData, setFormData] = useState(vendor || {
    vendor_name: "",
    vendor_type: "",
    phone: "",
    email: "",
    description: "",
    contact_name: "",
    contact_phone: "",
    contact_email: "",
    address: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="vendor_name" className="text-sm font-medium">
            Vendor Name *
          </label>
          <input
            id="vendor_name"
            name="vendor_name"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.vendor_name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="vendor_type" className="text-sm font-medium">
            Vendor Type *
          </label>
          <Select 
            name="vendor_type" 
            value={formData.vendor_type}
            onValueChange={(value) => setFormData(prev => ({ ...prev, vendor_type: value }))}
            required
          >
            <SelectTrigger id="vendor_type">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Service">Service Vendor</SelectItem>
              <SelectItem value="Product">Product Vendor</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">
            Vendor Phone *
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Vendor Email *
          </label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="description" className="text-sm font-medium">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            className="w-full px-3 py-2 border rounded-md"
            rows={3}
            value={formData.description}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="contact_name" className="text-sm font-medium">
            Contact Person *
          </label>
          <input
            id="contact_name"
            name="contact_name"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.contact_name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="contact_phone" className="text-sm font-medium">
            Contact Phone *
          </label>
          <input
            id="contact_phone"
            name="contact_phone"
            type="tel"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.contact_phone}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="contact_email" className="text-sm font-medium">
            Contact Email *
          </label>
          <input
            id="contact_email"
            name="contact_email"
            type="email"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.contact_email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="address" className="text-sm font-medium">
            Address *
          </label>
          <textarea
            id="address"
            name="address"
            className="w-full px-3 py-2 border rounded-md"
            rows={3}
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {vendor ? "Update Vendor" : "Save Vendor"}
        </Button>
      </div>
    </form>
  );
};

export default VendorForm;