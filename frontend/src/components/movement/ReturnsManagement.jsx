
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { format, differenceInDays } from "date-fns";
import { cn } from "@/lib/utils";
import { ArrowDown, Mail, Check } from "lucide-react";

const ReturnsManagement = () => {
  const [selectedReturn, setSelectedReturn] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [returnForm, setReturnForm] = useState({
    returnDate: format(new Date(), "yyyy-MM-dd"),
    condition: "",
    notes: "",
    receivedBy: ""
  });

  // Mock borrowed items data
  const borrowedItems = [
    {
      requestId: "REQ-1234",
      items: ["Laptop", "Projector"],
      borrowingDepartment: "Computer Science",
      dateBorrowed: new Date(2025, 3, 1),
      expectedReturnDate: new Date(2025, 4, 1),
      status: "On Time"
    },
    {
      requestId: "REQ-2345",
      items: ["Conference Table", "Chairs (5)"],
      borrowingDepartment: "MBA",
      dateBorrowed: new Date(2025, 2, 15),
      expectedReturnDate: new Date(2025, 3, 25),
      status: "Approaching Due"
    },
    {
      requestId: "REQ-3456",
      items: ["Whiteboard", "Printer"],
      borrowingDepartment: "Mechanical",
      dateBorrowed: new Date(2025, 2, 1),
      expectedReturnDate: new Date(2025, 3, 15),
      status: "Overdue"
    },
    {
      requestId: "REQ-4567",
      items: ["Scanner", "Desk"],
      borrowingDepartment: "Civil",
      dateBorrowed: new Date(2025, 1, 15),
      expectedReturnDate: new Date(2025, 2, 15),
      status: "Overdue"
    }
  ];

  // Calculate days remaining or overdue
  const calculateDaysRemaining = (expectedReturnDate) => {
    const today = new Date();
    const days = differenceInDays(new Date(expectedReturnDate), today);
    
    if (days < 0) {
      return `${Math.abs(days)} days overdue`;
    } else if (days === 0) {
      return "Due today";
    } else {
      return `${days} days remaining`;
    }
  };

  const handleFormChange = (field, value) => {
    setReturnForm(prev => ({ ...prev, [field]: value }));
  };

  const handleProcessReturn = (item) => {
    setSelectedReturn(item);
    setDialogOpen(true);
  };

  const handleSendReminder = (requestId) => {
    console.log("Send reminder for:", requestId);
    // In a real application, you'd send an email reminder
    alert(`Reminder sent for request: ${requestId}`);
  };

  const handleSubmitReturn = () => {
    console.log("Return processed for:", selectedReturn?.requestId, returnForm);
    // In a real application, you'd send this data to your backend
    alert("Return processed successfully!");
    setDialogOpen(false);
    setSelectedReturn(null);
    setReturnForm({
      returnDate: format(new Date(), "yyyy-MM-dd"),
      condition: "",
      notes: "",
      receivedBy: ""
    });
  };

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Returns Management</h1>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Items</TableHead>
                <TableHead>Borrowing Department</TableHead>
                <TableHead>Date Borrowed</TableHead>
                <TableHead>Expected Return Date</TableHead>
                <TableHead>Days Remaining/Overdue</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {borrowedItems.map(item => (
                <TableRow key={item.requestId}>
                  <TableCell>{item.requestId}</TableCell>
                  <TableCell>{item.items.join(", ")}</TableCell>
                  <TableCell>{item.borrowingDepartment}</TableCell>
                  <TableCell>{format(item.dateBorrowed, "dd/MM/yyyy")}</TableCell>
                  <TableCell>{format(item.expectedReturnDate, "dd/MM/yyyy")}</TableCell>
                  <TableCell>{calculateDaysRemaining(item.expectedReturnDate)}</TableCell>
                  <TableCell>
                    <span className={cn(
                      "px-2 py-1 rounded text-xs font-medium",
                      item.status === "On Time" && "bg-green-100 text-green-800",
                      item.status === "Approaching Due" && "bg-yellow-100 text-yellow-800",
                      item.status === "Overdue" && "bg-red-100 text-red-800"
                    )}>
                      {item.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleProcessReturn(item)}
                        className="flex items-center gap-1"
                      >
                        <ArrowDown className="h-3 w-3" />
                        <span>Process Return</span>
                      </Button>
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleSendReminder(item.requestId)}
                        className="flex items-center gap-1"
                      >
                        <Mail className="h-3 w-3" />
                        <span>Reminder</span>
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        
        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Process Return: {selectedReturn?.requestId}</DialogTitle>
            </DialogHeader>
            
            <div className="space-y-4 py-4">
              <div>
                <p className="text-sm font-medium mb-1">Items:</p>
                <p>{selectedReturn?.items.join(", ")}</p>
              </div>
              
              <div>
                <p className="text-sm font-medium mb-1">Borrowing Department:</p>
                <p>{selectedReturn?.borrowingDepartment}</p>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Return Date</label>
                <Input 
                  type="date" 
                  value={returnForm.returnDate} 
                  onChange={(e) => handleFormChange("returnDate", e.target.value)}
                  required
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Condition on Return</label>
                <Select 
                  value={returnForm.condition} 
                  onValueChange={(value) => handleFormChange("condition", value)}
                  required
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select condition" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Excellent">Excellent</SelectItem>
                    <SelectItem value="Good">Good</SelectItem>
                    <SelectItem value="Fair">Fair</SelectItem>
                    <SelectItem value="Poor">Poor</SelectItem>
                    <SelectItem value="Damaged">Damaged</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Notes</label>
                <Textarea 
                  value={returnForm.notes}
                  onChange={(e) => handleFormChange("notes", e.target.value)}
                  placeholder="Any notes about the condition or issues with the returned items"
                  rows={3}
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Received By</label>
                <Input 
                  value={returnForm.receivedBy}
                  onChange={(e) => handleFormChange("receivedBy", e.target.value)}
                  placeholder="Name of person receiving the returned items"
                  required
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-4">
              <Button variant="outline" onClick={() => setDialogOpen(false)}>
                Cancel
              </Button>
              <Button onClick={handleSubmitReturn} className="flex items-center gap-1">
                <Check className="h-4 w-4" />
                <span>Complete Return</span>
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
};

export default ReturnsManagement;
