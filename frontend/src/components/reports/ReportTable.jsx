
import React from "react";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell,
  TableCaption
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const ReportTable = ({ type }) => {
  // Sample data - in a real app, this would come from an API
  const activityData = [
    { id: 1, date: "2025-04-15", event: "Purchase Order Created", department: "Computer Science", user: "John Doe", status: "completed" },
    { id: 2, date: "2025-04-14", event: "Stock Allocated", department: "Electrical Engineering", user: "Jane Smith", status: "completed" },
    { id: 3, date: "2025-04-14", event: "Requirement Created", department: "Mechanical Engineering", user: "Alex Johnson", status: "pending" },
    { id: 4, date: "2025-04-13", event: "Vendor Payment", department: "Administrative", user: "Sarah Williams", status: "completed" },
    { id: 5, date: "2025-04-12", event: "Service Request", department: "Information Technology", user: "Michael Brown", status: "in-progress" }
  ];
  
  const stockData = [
    { id: "ST001", name: "Desktop Computer", category: "electronics", quantity: 45, allocated: 38, condition: "good" },
    { id: "ST002", name: "Student Chair", category: "furniture", quantity: 250, allocated: 220, condition: "good" },
    { id: "ST003", name: "Printer", category: "electronics", quantity: 12, allocated: 10, condition: "good" },
    { id: "ST004", name: "Whiteboard", category: "equipment", quantity: 18, allocated: 15, condition: "good" },
    { id: "ST005", name: "Lab Equipment Set", category: "equipment", quantity: 5, allocated: 4, condition: "good" }
  ];
  
  const requirementData = [
    { id: "REQ001", department: "Computer Science", items: "Computers, Printers", requestedBy: "Dr. Williams", date: "2025-04-02", status: "approved" },
    { id: "REQ002", department: "Electrical Lab", items: "Oscilloscopes, Multimeters", requestedBy: "Prof. Johnson", date: "2025-04-05", status: "pending" },
    { id: "REQ003", department: "Library", items: "Bookshelves, Study Tables", requestedBy: "Ms. Davis", date: "2025-04-08", status: "approved" },
    { id: "REQ004", department: "Administrative Office", items: "Filing Cabinets, Chairs", requestedBy: "Mr. Miller", date: "2025-04-10", status: "rejected" },
    { id: "REQ005", department: "Physics Lab", items: "Lab Equipment, Safety Gear", requestedBy: "Dr. Brown", date: "2025-04-12", status: "pending" }
  ];
  
  const vendorData = [
    { id: "VEN001", name: "TechSupplies Ltd.", type: "product", contact: "John Smith", email: "john@techsupplies.com", products: "Electronics, Computers" },
    { id: "VEN002", name: "Furniture Masters", type: "product", contact: "Emily Johnson", email: "emily@furnituremasters.com", products: "Desks, Chairs, Tables" },
    { id: "VEN003", name: "Office Solutions", type: "product", contact: "David Williams", email: "david@officesolutions.com", products: "Stationery, Office Supplies" },
    { id: "VEN004", name: "Tech Repairs Inc.", type: "service", contact: "Sarah Brown", email: "sarah@techrepairs.com", products: "Computer Maintenance, Printer Repair" },
    { id: "VEN005", name: "Lab Equipment Co.", type: "product", contact: "Michael Davis", email: "michael@labequipment.com", products: "Laboratory Equipment, Safety Gear" }
  ];
  
  const expenditureData = [
    { id: "EXP001", category: "Purchase", description: "Computer Lab Equipment", department: "Computer Science", amount: 125000, date: "2025-04-02" },
    { id: "EXP002", category: "Service", description: "AC Maintenance", department: "Administrative", amount: 15000, date: "2025-04-05" },
    { id: "EXP003", category: "Purchase", description: "Office Furniture", department: "Principal Office", amount: 45000, date: "2025-04-10" },
    { id: "EXP004", category: "Purchase", description: "Library Books", department: "Library", amount: 75000, date: "2025-04-12" },
    { id: "EXP005", category: "Service", description: "Generator Maintenance", department: "Electrical Dept", amount: 12500, date: "2025-04-15" }
  ];
  
  const getStatusBadge = (status) => {
    const statusColors = {
      completed: "bg-green-100 text-green-800",
      pending: "bg-yellow-100 text-yellow-800",
      "in-progress": "bg-blue-100 text-blue-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800"
    };
    
    return (
      <Badge variant="outline" className={`${statusColors[status]} border-none`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };
  
  // Render different tables based on the report type
  switch (type) {
    case "activity":
      return (
        <Table>
          <TableCaption>Recent system activity</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Date</TableHead>
              <TableHead>Event</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {activityData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.date}</TableCell>
                <TableCell>{item.event}</TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell>{item.user}</TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
      
    case "stock":
      return (
        <Table>
          <TableCaption>Current stock inventory</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Item Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Total Quantity</TableHead>
              <TableHead>Allocated</TableHead>
              <TableHead>Condition</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {stockData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell className="capitalize">{item.category}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.allocated}</TableCell>
                <TableCell className="capitalize">{item.condition}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
      
    case "requirement":
      return (
        <Table>
          <TableCaption>Requirement requests</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Requested By</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {requirementData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell>{item.items}</TableCell>
                <TableCell>{item.requestedBy}</TableCell>
                <TableCell>{item.date}</TableCell>
                <TableCell>{getStatusBadge(item.status)}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
      
    case "vendor":
      return (
        <Table>
          <TableCaption>Vendor information</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Vendor Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Contact Person</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Products/Services</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {vendorData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell className="capitalize">{item.type}</TableCell>
                <TableCell>{item.contact}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{item.products}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
      
    case "expenditure":
      return (
        <Table>
          <TableCaption>Expenditure records</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Amount (₹)</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {expenditureData.map((item) => (
              <TableRow key={item.id}>
                <TableCell>{item.id}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell>{item.description}</TableCell>
                <TableCell>{item.department}</TableCell>
                <TableCell>{item.amount.toLocaleString('en-IN')}</TableCell>
                <TableCell>{item.date}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      );
      
    default:
      return (
        <div className="flex items-center justify-center h-64">
          <p className="text-muted-foreground">Select a report type to view data</p>
        </div>
      );
  }
};

export default ReportTable;
