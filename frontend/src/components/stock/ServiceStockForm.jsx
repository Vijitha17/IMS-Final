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
import { Textarea } from "@/components/ui/textarea";
import { Wrench } from "lucide-react";

const ServiceStockForm = ({ onSuccess }) => {
  const { toast } = useToast();
  
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const data = Object.fromEntries(formData.entries());
    
    console.log("Service request submitted", data);
    
    toast({
      title: "Service Request Created",
      description: `Service ticket for ${data.itemId} has been submitted.`,
    });
    
    onSuccess();
  };

  // Sample data - in a real app, this would come from an API
  const stockItems = [
    { id: "STK-001", name: "Desktop Computer", category: "Electronics" },
    { id: "STK-002", name: "Projector", category: "Electronics" },
    { id: "STK-003", name: "Office Chair", category: "Furniture" },
    { id: "STK-004", name: "Printer", category: "Electronics" },
  ];

  const serviceTypes = [
    "Repair",
    "Maintenance",
    "Calibration",
    "Inspection",
    "Upgrade"
  ];

  const priorities = ["Low", "Medium", "High", "Critical"];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label className="text-sm font-medium">Item ID</label>
            <Select name="itemId" required>
              <SelectTrigger>
                <SelectValue placeholder="Select item" />
              </SelectTrigger>
              <SelectContent>
                {stockItems.map((item) => (
                  <SelectItem key={item.id} value={item.id}>
                    {item.id} - {item.name} ({item.category})
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Service Type</label>
            <Select name="serviceType" required>
              <SelectTrigger>
                <SelectValue placeholder="Select service type" />
              </SelectTrigger>
              <SelectContent>
                {serviceTypes.map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Request Date</label>
            <Input
              name="requestDate"
              type="date"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Expected Return Date</label>
            <Input
              name="expectedReturnDate"
              type="date"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Priority</label>
            <Select name="priority" required>
              <SelectTrigger>
                <SelectValue placeholder="Select priority" />
              </SelectTrigger>
              <SelectContent>
                {priorities.map((priority) => (
                  <SelectItem key={priority} value={priority}>
                    {priority}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Service Vendor</label>
            <Input
              name="serviceVendor"
              type="text"
              placeholder="Enter vendor name"
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Contact Person</label>
            <Input
              name="contactPerson"
              type="text"
              placeholder="Enter contact name"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Contact Phone</label>
            <Input
              name="contactPhone"
              type="tel"
              placeholder="Enter phone number"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Estimated Cost</label>
            <Input
              name="estimatedCost"
              type="number"
              min="0"
              step="0.01"
              placeholder="Enter estimated cost"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Issue Description</label>
          <Textarea
            name="issueDescription"
            className="min-h-[100px]"
            placeholder="Describe the issue or service needed"
            required
          />
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Special Instructions</label>
          <Textarea
            name="specialInstructions"
            className="min-h-[100px]"
            placeholder="Any special handling instructions"
          />
        </div>

        <div className="flex justify-end">
          <Button type="submit">
            <Wrench className="mr-2 h-4 w-4" />
            Submit Service Request
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ServiceStockForm;