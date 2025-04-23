import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { CalendarIcon, Eye, X } from "lucide-react";
import { cn } from "@/lib/utils";

const RequestStatus = () => {
  const navigate = useNavigate();
  const [filters, setFilters] = useState({
    status: "all",
    startDate: null,
    endDate: null,
    targetDepartment: "all"
  });

  // Mock request data
  const mockRequests = [
    {
      id: "REQ-1234",
      items: ["Laptop", "Projector"],
      targetDepartment: "Electronics",
      accountablePerson: "Robert Johnson",
      dateRequested: new Date(2025, 3, 15),
      dateNeeded: new Date(2025, 3, 20),
      status: "Pending"
    },
    {
      id: "REQ-2345",
      items: ["Conference Table", "Chairs (5)"],
      targetDepartment: "MBA",
      accountablePerson: "Michelle Garcia",
      dateRequested: new Date(2025, 3, 10),
      dateNeeded: new Date(2025, 3, 17),
      status: "Approved"
    },
    {
      id: "REQ-3456",
      items: ["Whiteboard", "Printer"],
      targetDepartment: "Mechanical",
      accountablePerson: "Michael Brown",
      dateRequested: new Date(2025, 3, 5),
      dateNeeded: new Date(2025, 3, 12),
      status: "Rejected"
    },
    {
      id: "REQ-4567",
      items: ["Scanner", "Desk"],
      targetDepartment: "Civil",
      accountablePerson: "Lisa Thomas",
      dateRequested: new Date(2025, 3, 1),
      dateNeeded: new Date(2025, 3, 8),
      status: "Completed"
    }
  ];

  // Filter departments for dropdown
  const departments = [...new Set(mockRequests.map(req => req.targetDepartment))];
  
  // Apply filters to requests
  const filteredRequests = mockRequests.filter(request => {
    let match = true;
    
    if (filters.status && filters.status !== "all" && request.status !== filters.status) {
      match = false;
    }
    
    if (filters.targetDepartment && filters.targetDepartment !== "all" && request.targetDepartment !== filters.targetDepartment) {
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
      targetDepartment: "all"
    });
  };

  const handleViewDetails = (requestId) => {
    console.log("View details for request:", requestId);
    // In a real application, you'd navigate to a details page or open a modal
    alert(`Viewing details for request: ${requestId}`);
  };

  const handleCancelRequest = (requestId) => {
    console.log("Cancel request:", requestId);
    // In a real application, you'd send a request to cancel this item
    if (confirm(`Are you sure you want to cancel request ${requestId}?`)) {
      alert(`Request ${requestId} has been cancelled`);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Request Status</h1>
          {/* Removed the "Create New Request" button */}
        </div>
        
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
                <SelectItem value="Completed">Completed</SelectItem>
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
            <label className="block text-sm font-medium mb-1">Target Department</label>
            <Select 
              value={filters.targetDepartment} 
              onValueChange={(value) => handleFilterChange("targetDepartment", value)}
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
                <TableHead>Items Requested</TableHead>
                <TableHead>Target Department</TableHead>
                <TableHead>Accountable Person</TableHead>
                <TableHead>Date Requested</TableHead>
                <TableHead>Date Needed</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map(request => (
                  <TableRow key={request.id}>
                    <TableCell>{request.id}</TableCell>
                    <TableCell>{request.items.join(", ")}</TableCell>
                    <TableCell>{request.targetDepartment}</TableCell>
                    <TableCell>{request.accountablePerson}</TableCell>
                    <TableCell>{format(request.dateRequested, "dd/MM/yyyy")}</TableCell>
                    <TableCell>{format(request.dateNeeded, "dd/MM/yyyy")}</TableCell>
                    <TableCell>
                      <span className={cn(
                        "px-2 py-1 rounded text-xs font-medium",
                        request.status === "Pending" && "bg-yellow-100 text-yellow-800",
                        request.status === "Approved" && "bg-green-100 text-green-800",
                        request.status === "Rejected" && "bg-red-100 text-red-800",
                        request.status === "Completed" && "bg-blue-100 text-blue-800"
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
                          <Button 
                            variant="ghost" 
                            size="icon" 
                            onClick={() => handleCancelRequest(request.id)}
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">
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

export default RequestStatus;