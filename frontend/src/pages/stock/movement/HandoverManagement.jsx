
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

const HandoverManagement = () => {
  const [acknowledgmentForm, setAcknowledgmentForm] = useState({
    requestId: "",
    handoverDate: format(new Date(), "yyyy-MM-dd"),
    condition: "",
    notes: "",
    signature: ""
  });

  // Mock pending handovers data
  const pendingHandovers = [
    {
      requestId: "REQ-7890",
      requestingDepartment: "Mechanical",
      requestedBy: "Michael Brown",
      items: ["Whiteboard", "Printer"],
      dateApproved: new Date(2025, 3, 6),
      dateNeeded: new Date(2025, 3, 12),
      returnDate: new Date(2025, 4, 5)
    },
    {
      requestId: "REQ-9012",
      requestingDepartment: "Computer Science",
      requestedBy: "Jane Smith",
      items: ["Laptop", "Scanner"],
      dateApproved: new Date(2025, 3, 16),
      dateNeeded: new Date(2025, 3, 22),
      returnDate: new Date(2025, 4, 15)
    },
    {
      requestId: "REQ-3456",
      requestingDepartment: "Electronics",
      requestedBy: "Emily Davis",
      items: ["Oscilloscope", "Function Generator"],
      dateApproved: new Date(2025, 3, 8),
      dateNeeded: new Date(2025, 3, 14),
      returnDate: new Date(2025, 4, 8)
    }
  ];

  const handleFormChange = (field, value) => {
    setAcknowledgmentForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Acknowledgment form submitted:", acknowledgmentForm);
    // In a real application, you'd send this data to your backend
    alert("Handover acknowledgment submitted successfully!");
    setAcknowledgmentForm({
      requestId: "",
      handoverDate: format(new Date(), "yyyy-MM-dd"),
      condition: "",
      notes: "",
      signature: ""
    });
  };

  const handleInitiateHandover = (requestId) => {
    console.log("Initiate handover for:", requestId);
    // Pre-fill the form with the selected request ID
    setAcknowledgmentForm(prev => ({ ...prev, requestId }));
    // Switch to the Acknowledgment Form tab
    document.getElementById("acknowledgment-tab").click();
  };

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Handover Management</h1>
        
        <Tabs defaultValue="pending">
          <TabsList className="mb-6">
            <TabsTrigger value="pending">Pending Handovers</TabsTrigger>
            <TabsTrigger value="acknowledgment" id="acknowledgment-tab">Acknowledgment Form</TabsTrigger>
          </TabsList>
          
          <TabsContent value="pending">
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Request ID</TableHead>
                    <TableHead>Requesting Department</TableHead>
                    <TableHead>Requested By</TableHead>
                    <TableHead>Items</TableHead>
                    <TableHead>Date Approved</TableHead>
                    <TableHead>Date Needed</TableHead>
                    <TableHead>Return Date</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {pendingHandovers.length > 0 ? (
                    pendingHandovers.map(handover => (
                      <TableRow key={handover.requestId}>
                        <TableCell>{handover.requestId}</TableCell>
                        <TableCell>{handover.requestingDepartment}</TableCell>
                        <TableCell>{handover.requestedBy}</TableCell>
                        <TableCell>{handover.items.join(", ")}</TableCell>
                        <TableCell>{format(handover.dateApproved, "dd/MM/yyyy")}</TableCell>
                        <TableCell>{format(handover.dateNeeded, "dd/MM/yyyy")}</TableCell>
                        <TableCell>{format(handover.returnDate, "dd/MM/yyyy")}</TableCell>
                        <TableCell>
                          <Button 
                            variant="outline" 
                            size="sm" 
                            onClick={() => handleInitiateHandover(handover.requestId)}
                          >
                            Process Handover
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  ) : (
                    <TableRow>
                      <TableCell colSpan={8} className="text-center py-4">
                        No pending handovers at this time.
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </div>
          </TabsContent>
          
          <TabsContent value="acknowledgment">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium mb-1">Request ID</label>
                  <Select 
                    value={acknowledgmentForm.requestId} 
                    onValueChange={(value) => handleFormChange("requestId", value)}
                    required
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select request ID" />
                    </SelectTrigger>
                    <SelectContent>
                      {pendingHandovers.map(handover => (
                        <SelectItem key={handover.requestId} value={handover.requestId}>
                          {handover.requestId} - {handover.requestingDepartment}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Handover Date</label>
                  <Input 
                    type="date" 
                    value={acknowledgmentForm.handoverDate} 
                    onChange={(e) => handleFormChange("handoverDate", e.target.value)}
                    required
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium mb-1">Condition at Handover</label>
                  <Select 
                    value={acknowledgmentForm.condition} 
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
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Handover Notes</label>
                  <Textarea 
                    value={acknowledgmentForm.notes}
                    onChange={(e) => handleFormChange("notes", e.target.value)}
                    placeholder="Additional notes about the condition or special instructions"
                    rows={4}
                  />
                </div>
                
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium mb-1">Digital Signature</label>
                  <div className="border border-gray-300 rounded-md h-32 flex items-center justify-center bg-gray-50">
                    <p className="text-gray-500">
                      Sign here (Digital signature capture would be implemented here)
                    </p>
                  </div>
                  <Input 
                    type="text" 
                    value={acknowledgmentForm.signature}
                    onChange={(e) => handleFormChange("signature", e.target.value)}
                    placeholder="Type your name to acknowledge receipt"
                    className="mt-2"
                    required
                  />
                </div>
              </div>
              
              <div className="flex justify-end space-x-4">
                <Button 
                  type="button" 
                  variant="outline" 
                  onClick={() => document.getElementById("pending-tab").click()}
                >
                  Cancel
                </Button>
                <Button type="submit">Submit Acknowledgment</Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default HandoverManagement;
