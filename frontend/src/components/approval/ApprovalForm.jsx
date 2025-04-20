
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";

const ApprovalForm = ({ onCancel }) => {
  const [approvalType, setApprovalType] = useState("purchase");
  
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-6">Create Approval Request</h2>
      
      <form className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">
              Request Type
            </label>
            <Select onValueChange={setApprovalType} defaultValue="purchase">
              <SelectTrigger>
                <SelectValue placeholder="Select request type" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="purchase">Purchase</SelectItem>
                <SelectItem value="service">Service</SelectItem>
                <SelectItem value="allocation">Allocation</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Department</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="cs">Computer Science</SelectItem>
                <SelectItem value="it">Information Technology</SelectItem>
                <SelectItem value="eee">Electrical Engineering</SelectItem>
                <SelectItem value="library">Library</SelectItem>
                <SelectItem value="admin">Administration</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {approvalType === "purchase" && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">Items</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter items to purchase"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Estimated Amount</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter estimated amount"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Vendor (Optional)</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select vendor" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="vendor1">TechSupplies Ltd.</SelectItem>
                    <SelectItem value="vendor2">Office Solutions</SelectItem>
                    <SelectItem value="vendor3">Furniture Masters</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </>
          )}

          {approvalType === "service" && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">Service Type</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select service type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="repair">Repair</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="installation">Installation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Equipment/Assets</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter equipment or assets"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Estimated Cost</label>
                <input
                  type="number"
                  min="0"
                  step="0.01"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter estimated cost"
                />
              </div>
            </>
          )}

          {approvalType === "allocation" && (
            <>
              <div className="space-y-2">
                <label className="text-sm font-medium">Items to Allocate</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter items to allocate"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Destination</label>
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="Enter destination department/area"
                />
              </div>
            </>
          )}

          <div className="space-y-2">
            <label className="text-sm font-medium">Priority</label>
            <Select>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high">High</SelectItem>
                <SelectItem value="medium">Medium</SelectItem>
                <SelectItem value="low">Low</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Description</label>
          <textarea
            className="w-full px-3 py-2 border rounded-md min-h-[100px]"
            placeholder="Enter detailed description of the request"
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Attachments (if any)</label>
          <input
            type="file"
            className="w-full px-3 py-2 border rounded-md"
          />
        </div>

        <div className="flex justify-end space-x-2">
          <Button variant="outline" onClick={onCancel}>Cancel</Button>
          <Button type="submit">Submit Request</Button>
        </div>
      </form>
    </div>
  );
};

export default ApprovalForm;
