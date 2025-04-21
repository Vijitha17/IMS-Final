import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { CalendarIcon, Check, Eye, X } from "lucide-react";
import { cn } from "@/lib/utils";

const IncomingRequests = () => {
  const [filters, setFilters] = useState({
    status: "all",
    startDate: null,
    endDate: null,
    requestingDepartment: "all"
  });

  // Mock request data
  const mockRequests = [
    {
      id: "REQ-5678",
      requestingDepartment: "Computer Science",
      requestedBy: "John Doe",
      items: ["Laptop", "Projector"],
      dateRequested: new Date(2025, 3, 15),
      dateNeeded: new Date(2025, 3, 20),
      returnDate: new Date(2025, 4, 15),
      status: "Pending"
    },
    {
      id: "REQ-6789",
      requestingDepartment: "Electronics",
      requestedBy: "Emily Davis",
      items: ["Conference Table", "Chairs (5)"],
      dateRequested: new Date(2025, 3, 10),
      dateNeeded: new Date(2025, 3, 17),
      returnDate: new Date(2025, 4, 10),
      status: "Pending"
    },
    {
      id: "REQ-7890",
      requestingDepartment: "Mechanical",
      requestedBy: "Michael Brown",
      items: ["Whiteboard", "Printer"],
      dateRequested: new Date(2025, 3, 5),
      dateNeeded: new Date(2025, 3, 12),
      returnDate: new Date(2025, 4, 5),
      status: "Approved"
    },
    {
      id: "REQ-8901",
      requestingDepartment: "Civil",
      requestedBy: "David Martinez",
      items: ["Scanner", "Desk"],
      dateRequested: new Date(2025, 3, 1),
      dateNeeded: new Date(2025, 3, 8),
      returnDate: new Date(2025, 4, 1),
      status: "Rejected"
    }
  ];

  // Filter departments for dropdown
  const departments = [...new Set(mockRequests.map(req => req.requestingDepartment))];

  // Apply filters to requests
  const filteredRequests = mockRequests.filter(request => {
    let match = true;
    
    if (filters.status && filters.status !== "all" && request.status !== filters.status) {
      match = false;
    }
    
    if (filters.requestingDepartment && filters.requestingDepartment !== "all" && request.requestingDepartment !== filters.requestingDepartment) {
      match = false;
    }
    
    if (filters.startDate && new Date(request.dateRequested) < new Date(filters.startDate)) {
      match = false;
    }
    
    if (filters.endDate && new Date(request.dateRequested) > new Date(filters.endDate)) {
      match = false;
    }
    
    return match;
  });

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const resetFilters = () => {
    setFilters({
      status: "all",
      startDate: null,
      endDate: null,
      requestingDepartment: "all"
    });
  };

  const handleViewDetails = (requestId) => {
    console.log("View details for request:", requestId);
    // In a real application, you'd navigate to a details page or open a modal
    alert(`Viewing details for request: ${requestId}`);
  };

  const handleApprove = (requestId) => {
    console.log("Approve request:", requestId);
    // In a real application, you'd send a request to approve this item
    if (confirm(`Are you sure you want to approve request ${requestId}?`)) {
      alert(`Request ${requestId} has been approved`);
    }
  };

  const handleReject = (requestId) => {
    console.log("Reject request:", requestId);
    // In a real application, you'd send a request to reject this item
    if (confirm(`Are you sure you want to reject request ${requestId}?`)) {
      alert(`Request ${requestId} has been rejected`);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h1 className="text-2xl font-bold mb-6">Incoming Requests</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Status</label>
            <Select 
              value={filters.status} 
              onValueChange={(value) => handleFilterChange("status", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
                <SelectItem value="Approved">Approved</SelectItem>
                <SelectItem value="Rejected">Rejected</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Start Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !filters.startDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.startDate ? format(filters.startDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filters.startDate}
                  onSelect={(date) => handleFilterChange("startDate", date)}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">End Date</label>
            <Popover>
              <PopoverTrigger asChild>
                <Button 
                  variant="outline" 
                  className={cn(
                    "w-full justify-start text-left font-normal",
                    !filters.endDate && "text-muted-foreground"
                  )}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {filters.endDate ? format(filters.endDate, "PPP") : <span>Pick a date</span>}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={filters.endDate}
                  onSelect={(date) => handleFilterChange("endDate", date)}
                  initialFocus
                  className="p-3 pointer-events-auto"
                />
              </PopoverContent>
            </Popover>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Requesting Department</label>
            <Select 
              value={filters.requestingDepartment} 
              onValueChange={(value) => handleFilterChange("requestingDepartment", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={dept} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="flex justify-end mb-4">
          <Button variant="outline" onClick={resetFilters}>
            Reset Filters
          </Button>
        </div>
        
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request ID</TableHead>
                <TableHead>Requesting Department</TableHead>
                <TableHead>Requested By</TableHead>
                <TableHead>Items Requested</TableHead>
                <TableHead>Date Requested</TableHead>
                <TableHead>Date Needed</TableHead>
                <TableHead>Return Date</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map(request => (
                  <TableRow key={request.id}>
                    <TableCell>{request.id}</TableCell>
                    <TableCell>{request.requestingDepartment}</TableCell>
                    <TableCell>{request.requestedBy}</TableCell>
                    <TableCell>{request.items.join(", ")}</TableCell>
                    <TableCell>{format(request.dateRequested, "dd/MM/yyyy")}</TableCell>
                    <TableCell>{format(request.dateNeeded, "dd/MM/yyyy")}</TableCell>
                    <TableCell>{format(request.returnDate, "dd/MM/yyyy")}</TableCell>
                    <TableCell>
                      <span className={cn(
                        "px-2 py-1 rounded text-xs font-medium",
                        request.status === "Pending" && "bg-yellow-100 text-yellow-800",
                        request.status === "Approved" && "bg-green-100 text-green-800",
                        request.status === "Rejected" && "bg-red-100 text-red-800"
                      )}>
                        {request.status}
                      </span>
                    </TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button 
                          variant="ghost" 
                          size="icon" 
                          onClick={() => handleViewDetails(request.id)}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        {request.status === "Pending" && (
                          <>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleApprove(request.id)}
                              className="text-green-600"
                            >
                              <Check className="h-4 w-4" />
                            </Button>
                            <Button 
                              variant="ghost" 
                              size="icon" 
                              onClick={() => handleReject(request.id)}
                              className="text-red-600"
                            >
                              <X className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={9} className="text-center py-4">
                    No requests found matching the selected filters.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};

export default IncomingRequests;