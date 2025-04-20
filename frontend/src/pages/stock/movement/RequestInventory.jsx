
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";

const RequestInventory = () => {
  const navigate = useNavigate();
  const [requestData, setRequestData] = useState({
    requestId: `REQ-${Math.floor(Math.random() * 10000)}`,
    requestingDepartment: "Computer Science",
    selectedItems: [],
    targetDepartment: "",
    accountablePerson: "",
    accountablePersonRole: "",
    purpose: "",
    dateNeeded: null,
    returnDate: null,
    comments: ""
  });

  // Mock data for dropdown options
  const departments = ["Computer Science", "Electronics", "Mechanical", "Civil", "MBA"];
  const accountablePersons = {
    "Computer Science": ["John Doe", "Jane Smith"],
    "Electronics": ["Robert Johnson", "Emily Davis"],
    "Mechanical": ["Michael Brown", "Sarah Wilson"],
    "Civil": ["David Martinez", "Lisa Thomas"],
    "MBA": ["Kevin Anderson", "Michelle Garcia"]
  };
  const items = [
    { id: 1, name: "Laptop" },
    { id: 2, name: "Projector" },
    { id: 3, name: "Whiteboard" },
    { id: 4, name: "Printer" },
    { id: 5, name: "Scanner" },
    { id: 6, name: "Conference Table" },
    { id: 7, name: "Chairs" },
    { id: 8, name: "Desk" }
  ];

  const handleChange = (field, value) => {
    setRequestData(prev => {
      const newData = { ...prev, [field]: value };
      
      // If target department changes, reset accountable person and their role
      if (field === "targetDepartment") {
        newData.accountablePerson = "";
        newData.accountablePersonRole = "";
      }
      
      // If accountable person changes, set their role
      if (field === "accountablePerson" && value) {
        // Mock role assignment based on person name
        if (value.includes("John") || value.includes("Robert") || value.includes("Michael") || value.includes("David") || value.includes("Kevin")) {
          newData.accountablePersonRole = "Professor";
        } else {
          newData.accountablePersonRole = "Assistant Professor";
        }
      }
      
      return newData;
    });
  };

  const handleItemSelection = (itemId) => {
    setRequestData(prev => {
      const currentItems = [...prev.selectedItems];
      const itemIndex = currentItems.findIndex(item => item === itemId);
      
      if (itemIndex >= 0) {
        currentItems.splice(itemIndex, 1);
      } else {
        currentItems.push(itemId);
      }
      
      return { ...prev, selectedItems: currentItems };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", requestData);
    // In a real application, you'd send this data to your backend
    alert("Inventory request submitted successfully!");
    navigate("/stock/movement/request-status");
  };

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Request Inventory</h1>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-1">Request ID</label>
              <Input value={requestData.requestId} disabled className="bg-gray-100" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Requesting Department</label>
              <Input value={requestData.requestingDepartment} disabled className="bg-gray-100" />
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Select Items</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
                {items.map(item => (
                  <div key={item.id} className="flex items-center space-x-2">
                    <input 
                      type="checkbox" 
                      id={`item-${item.id}`}
                      checked={requestData.selectedItems.includes(item.id)}
                      onChange={() => handleItemSelection(item.id)}
                      className="rounded text-primary"
                    />
                    <label htmlFor={`item-${item.id}`}>{item.name}</label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Target Department</label>
              <Select 
                value={requestData.targetDepartment} 
                onValueChange={(value) => handleChange("targetDepartment", value)}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select department" />
                </SelectTrigger>
                <SelectContent>
                  {departments.map(dept => (
                    <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Accountable Person</label>
              <Select 
                value={requestData.accountablePerson}
                onValueChange={(value) => handleChange("accountablePerson", value)}
                disabled={!requestData.targetDepartment}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select person" />
                </SelectTrigger>
                <SelectContent>
                  {requestData.targetDepartment && 
                    accountablePersons[requestData.targetDepartment].map(person => (
                      <SelectItem key={person} value={person}>{person}</SelectItem>
                    ))
                  }
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Role of Accountable Person</label>
              <Input value={requestData.accountablePersonRole} disabled className="bg-gray-100" />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Purpose</label>
              <Input 
                value={requestData.purpose} 
                onChange={(e) => handleChange("purpose", e.target.value)}
                placeholder="Briefly describe why you need these items"
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Date Needed</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !requestData.dateNeeded && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {requestData.dateNeeded ? format(requestData.dateNeeded, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={requestData.dateNeeded}
                    onSelect={(date) => handleChange("dateNeeded", date)}
                    initialFocus
                    disabled={(date) => date < new Date()}
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Expected Return Date</label>
              <Popover>
                <PopoverTrigger asChild>
                  <Button 
                    variant="outline" 
                    className={cn(
                      "w-full justify-start text-left font-normal",
                      !requestData.returnDate && "text-muted-foreground"
                    )}
                  >
                    <CalendarIcon className="mr-2 h-4 w-4" />
                    {requestData.returnDate ? format(requestData.returnDate, "PPP") : <span>Pick a date</span>}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={requestData.returnDate}
                    onSelect={(date) => handleChange("returnDate", date)}
                    initialFocus
                    disabled={(date) => date < (requestData.dateNeeded || new Date())}
                    className="p-3 pointer-events-auto"
                  />
                </PopoverContent>
              </Popover>
            </div>
            
            <div className="md:col-span-2">
              <label className="block text-sm font-medium mb-1">Comments/Notes</label>
              <Textarea 
                value={requestData.comments}
                onChange={(e) => handleChange("comments", e.target.value)}
                placeholder="Additional information about your request"
                rows={4}
              />
            </div>
          </div>
          
          <div className="flex justify-end space-x-4">
            <Button 
              type="button" 
              variant="outline" 
              onClick={() => navigate("/stock/movement/request-status")}
            >
              Cancel
            </Button>
            <Button type="submit">Submit Request</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RequestInventory;
