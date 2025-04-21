import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { CalendarIcon, Plus, Minus, Trash } from "lucide-react";
import { cn } from "@/lib/utils";

const RequestInventory = ({ onCancel }) => {
  const [requestData, setRequestData] = useState({
    requestId: `REQ-${Math.floor(Math.random() * 10000)}`,
    requestingDepartment: "Computer Science",
    targetDepartment: "",
    accountablePerson: "",
    accountablePersonRole: "",
    purpose: "",
    dateNeeded: null,
    returnDate: null,
    comments: ""
  });

  const [selectedItems, setSelectedItems] = useState([
    { id: null, name: "", quantity: 1 }
  ]);

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

  const handleAddItem = () => {
    setSelectedItems([...selectedItems, { id: null, name: "", quantity: 1 }]);
  };

  const handleRemoveItem = (index) => {
    if (selectedItems.length === 1) return;
    const newItems = [...selectedItems];
    newItems.splice(index, 1);
    setSelectedItems(newItems);
  };

  const handleItemChange = (index, field, value) => {
    const newItems = [...selectedItems];
    
    if (field === "id") {
      const selectedItem = items.find(item => item.id === value);
      newItems[index] = { 
        ...newItems[index], 
        id: value,
        name: selectedItem ? selectedItem.name : ""
      };
    } else {
      newItems[index][field] = value;
    }
    
    setSelectedItems(newItems);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const submitData = {
      ...requestData,
      items: selectedItems
    };
    console.log("Form submitted:", submitData);
    // In a real application, you'd send this data to your backend
    alert("Inventory request submitted successfully!");
    onCancel(); // Close the form after submission
  };

  return (
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
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium">Requested Items</label>
              <Button type="button" size="sm" onClick={handleAddItem}>
                <Plus className="h-4 w-4 mr-2" />
                Add Item
              </Button>
            </div>
            
            <div className="space-y-4">
              {selectedItems.map((item, index) => (
                <div key={index} className="flex items-end gap-4 p-4 border rounded-md bg-gray-50">
                  <div className="space-y-2 flex-1">
                    <label className="text-sm font-medium">Item</label>
                    <Select 
                      value={item.id?.toString() || ""}
                      onValueChange={(value) => handleItemChange(index, "id", parseInt(value))}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select item" />
                      </SelectTrigger>
                      <SelectContent>
                        {items.map(option => (
                          <SelectItem key={option.id} value={option.id.toString()}>
                            {option.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2 w-40">
                    <label className="text-sm font-medium">Quantity</label>
                    <div className="flex items-center">
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => {
                          if (item.quantity > 1) {
                            handleItemChange(index, "quantity", item.quantity - 1);
                          }
                        }}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <Input
                        type="number"
                        min="1"
                        value={item.quantity}
                        onChange={(e) => handleItemChange(index, "quantity", parseInt(e.target.value) || 1)}
                        className="w-16 text-center mx-2"
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => handleItemChange(index, "quantity", item.quantity + 1)}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                  
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="text-red-500"
                    onClick={() => handleRemoveItem(index)}
                    disabled={selectedItems.length === 1}
                  >
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
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
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button type="submit">Submit Request</Button>
      </div>
    </form>
  );
};

export default RequestInventory;