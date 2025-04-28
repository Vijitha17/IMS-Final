import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const CreatePurchaseRequest = ({ onCancel }) => {
  const [formData, setFormData] = React.useState({
    purchase_request_id: Math.floor(100000 + Math.random() * 900000), // Auto-generated 6-digit ID
    item_name: "",
    category_name: "",
    quantity: 1,
    estimated_cost: 0,
    vendor_name: "",
    requested_by: "",
    approve_by: "",
    approver_email: "",
    request_date: new Date().toISOString().slice(0, 16),
    approval_status: "Pending"
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    
    if (["quantity", "estimated_cost"].includes(name)) {
      processedValue = parseFloat(value) || 0;
    }
    
    setFormData(prev => ({ ...prev, [name]: processedValue }));
  };
  
  const handleSelectChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    onCancel();
  };

  return (
    <div className="space-y-6">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          {/* Purchase Request ID Field - Read Only */}
          <div className="space-y-2">
            <Label htmlFor="purchase_request_id">Purchase Request ID</Label>
            <Input
              id="purchase_request_id"
              name="purchase_request_id"
              type="text"
              value={formData.purchase_request_id}
              readOnly
              className="bg-gray-100"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="item_name">Item Name</Label>
            <Input
              id="item_name"
              name="item_name"
              type="text"
              value={formData.item_name}
              onChange={handleChange}
              required
            />
          </div>
          
          {/* Rest of the form fields remain the same */}
          <div className="space-y-2">
            <Label htmlFor="category_name">Category</Label>
            <Select 
              value={formData.category_name} 
              onValueChange={(value) => handleSelectChange("category_name", value)}
            >
              <SelectTrigger id="category_name">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Furniture">Furniture</SelectItem>
                <SelectItem value="Lab Equipment">Lab Equipment</SelectItem>
                <SelectItem value="Office Supplies">Office Supplies</SelectItem>
                <SelectItem value="Other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="quantity">Quantity</Label>
            <Input
              id="quantity"
              name="quantity"
              type="number"
              min="1"
              value={formData.quantity}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="estimated_cost">Estimated Cost</Label>
            <Input
              id="estimated_cost"
              name="estimated_cost"
              type="number"
              min="0"
              step="0.01"
              value={formData.estimated_cost}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="vendor_name">Vendor Name</Label>
            <Input
              id="vendor_name"
              name="vendor_name"
              type="text"
              value={formData.vendor_name}
              onChange={handleChange}
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="requested_by">Requested By</Label>
            <Input
              id="requested_by"
              name="requested_by"
              type="text"
              value={formData.requested_by}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="approve_by">Approver Name</Label>
            <Input
              id="approve_by"
              name="approve_by"
              type="text"
              value={formData.approve_by}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="approver_email">Approver Email</Label>
            <Input
              id="approver_email"
              name="approver_email"
              type="email"
              value={formData.approver_email}
              onChange={handleChange}
              required
              placeholder="approver@example.com"
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="request_date">Request Date</Label>
            <Input
              id="request_date"
              name="request_date"
              type="datetime-local"
              value={formData.request_date}
              onChange={handleChange}
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="approval_status">Approval Status</Label>
            <Select 
              value={formData.approval_status} 
              onValueChange={(value) => handleSelectChange("approval_status", value)}
            >
              <SelectTrigger id="approval_status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" type="button" onClick={onCancel}>
            Cancel
          </Button>
          <Button type="submit">Submit Request</Button>
        </div>
      </form>
    </div>
  );
};

export default CreatePurchaseRequest;