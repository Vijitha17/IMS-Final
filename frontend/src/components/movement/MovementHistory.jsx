import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { format } from "date-fns";
import { CalendarIcon, Download, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const MovementHistory = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [filters, setFilters] = useState({
    transactionType: "all",
    sourceDepartment: "all",
    destinationDepartment: "all",
    startDate: null,
    endDate: null,
    status: "all"
  });

  // Mock movement history data
  const mockMovements = [
    {
      id: "MOV-1234",
      items: [{ name: "Laptop", id: "LP-001" }, { name: "Projector", id: "PRJ-002" }],
      sourceDepartment: "IT Department",
      destinationDepartment: "Computer Science",
      transactionType: "Borrow",
      transactionDate: new Date(2025, 3, 15),
      handledBy: "John Doe",
      status: "Completed"
    },
    {
      id: "MOV-2345",
      items: [{ name: "Conference Table", id: "TB-003" }, { name: "Chairs (5)", id: "CH-004" }],
      sourceDepartment: "Inventory",
      destinationDepartment: "MBA",
      transactionType: "Borrow",
      transactionDate: new Date(2025, 3, 10),
      handledBy: "Kevin Anderson",
      status: "Completed"
    },
    {
      id: "MOV-3456",
      items: [{ name: "Laptop", id: "LP-002" }],
      sourceDepartment: "Computer Science",
      destinationDepartment: "IT Department",
      transactionType: "Return",
      transactionDate: new Date(2025, 3, 5),
      handledBy: "Jane Smith",
      status: "Completed"
    },
    {
      id: "MOV-4567",
      items: [{ name: "Printer", id: "PR-005" }, { name: "Scanner", id: "SC-006" }],
      sourceDepartment: "Inventory",
      destinationDepartment: "Civil",
      transactionType: "Borrow",
      transactionDate: new Date(2025, 3, 1),
      handledBy: "David Martinez",
      status: "In Transit"
    }
  ];

  // Get unique departments for filter dropdowns
  const departments = [...new Set([
    ...mockMovements.map(m => m.sourceDepartment),
    ...mockMovements.map(m => m.destinationDepartment)
  ])];

  // Apply filters and search
  const filteredMovements = mockMovements.filter(movement => {
    let match = true;
    
    // Apply search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const searchFields = [
        movement.id.toLowerCase(),
        ...movement.items.map(item => item.name.toLowerCase()),
        ...movement.items.map(item => item.id.toLowerCase()),
        movement.sourceDepartment.toLowerCase(),
        movement.destinationDepartment.toLowerCase(),
        movement.handledBy.toLowerCase()
      ];
      match = searchFields.some(field => field.includes(query));
    }
    
    // Apply filters - only filter if not "all"
    if (match && filters.transactionType !== "all" && movement.transactionType !== filters.transactionType) {
      match = false;
    }
    
    if (match && filters.sourceDepartment !== "all" && movement.sourceDepartment !== filters.sourceDepartment) {
      match = false;
    }
    
    if (match && filters.destinationDepartment !== "all" && movement.destinationDepartment !== filters.destinationDepartment) {
      match = false;
    }
    
    if (match && filters.status !== "all" && movement.status !== filters.status) {
      match = false;
    }
    
    if (match && filters.startDate && new Date(movement.transactionDate) < new Date(filters.startDate)) {
      match = false;
    }
    
    if (match && filters.endDate && new Date(movement.transactionDate) > new Date(filters.endDate)) {
      match = false;
    }
    
    return match;
  });

  const handleFilterChange = (field, value) => {
    setFilters(prev => ({ ...prev, [field]: value }));
  };

  const resetFilters = () => {
    setFilters({
      transactionType: "all",
      sourceDepartment: "all",
      destinationDepartment: "all",
      startDate: null,
      endDate: null,
      status: "all"
    });
    setSearchQuery("");
  };

  const handleExport = () => {
    console.log("Exporting data...");
    // In a real application, you'd generate and download a CSV/Excel file
    alert("Export functionality would generate a CSV/Excel file with the current filtered data.");
  };

  return (
    <div className="container mx-auto py-8">
      <div className="bg-white rounded-lg shadow-md p-6">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Movement History</h1>
          <Button onClick={handleExport} className="flex items-center gap-1">
            <Download className="h-4 w-4" />
            <span>Export</span>
          </Button>
        </div>
        
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              type="search"
              placeholder="Search by ID, item name, department, or person..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
          <div>
            <label className="block text-sm font-medium mb-1">Transaction Type</label>
            <Select 
              value={filters.transactionType} 
              onValueChange={(value) => handleFilterChange("transactionType", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="Borrow">Borrow</SelectItem>
                <SelectItem value="Return">Return</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Source Department</label>
            <Select 
              value={filters.sourceDepartment} 
              onValueChange={(value) => handleFilterChange("sourceDepartment", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={`source-${dept}`} value={dept}>{dept}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Destination Department</label>
            <Select 
              value={filters.destinationDepartment} 
              onValueChange={(value) => handleFilterChange("destinationDepartment", value)}
            >
              <SelectTrigger>
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All</SelectItem>
                {departments.map(dept => (
                  <SelectItem key={`dest-${dept}`} value={dept}>{dept}</SelectItem>
                ))}
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
                <SelectItem value="Completed">Completed</SelectItem>
                <SelectItem value="In Transit">In Transit</SelectItem>
                <SelectItem value="Pending">Pending</SelectItem>
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
                <TableHead>Movement ID</TableHead>
                <TableHead>Item Details</TableHead>
                <TableHead>Source Department</TableHead>
                <TableHead>Destination Department</TableHead>
                <TableHead>Transaction Type</TableHead>
                <TableHead>Transaction Date</TableHead>
                <TableHead>Handled By</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredMovements.length > 0 ? (
                filteredMovements.map(movement => (
                  <TableRow key={movement.id}>
                    <TableCell>{movement.id}</TableCell>
                    <TableCell>
                      {movement.items.map(item => (
                        <div key={item.id}>
                          {item.name} ({item.id})
                        </div>
                      ))}
                    </TableCell>
                    <TableCell>{movement.sourceDepartment}</TableCell>
                    <TableCell>{movement.destinationDepartment}</TableCell>
                    <TableCell>
                      <span className={cn(
                        "px-2 py-1 rounded text-xs font-medium",
                        movement.transactionType === "Borrow" && "bg-blue-100 text-blue-800",
                        movement.transactionType === "Return" && "bg-green-100 text-green-800"
                      )}>
                        {movement.transactionType}
                      </span>
                    </TableCell>
                    <TableCell>{format(movement.transactionDate, "dd/MM/yyyy")}</TableCell>
                    <TableCell>{movement.handledBy}</TableCell>
                    <TableCell>
                      <span className={cn(
                        "px-2 py-1 rounded text-xs font-medium",
                        movement.status === "Completed" && "bg-green-100 text-green-800",
                        movement.status === "In Transit" && "bg-yellow-100 text-yellow-800",
                        movement.status === "Pending" && "bg-blue-100 text-blue-800"
                      )}>
                        {movement.status}
                      </span>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-4">
                    No movement records found matching the current filters.
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

export default MovementHistory;