
import React from "react";
import { 
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from "@/components/ui/table";
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MoreHorizontal,
  Eye,
  Edit,
  CheckCircle,
  XCircle
} from "lucide-react";

const PurchaseRequestList = () => {
  // Sample data - in a real app, this would come from an API
  const requests = [
    {
      id: 1,
      requestNumber: "REQ-2025-001",
      items: "Laptops (5)",
      department: "Computer Science",
      requestedBy: "John Smith",
      priority: "high",
      status: "pending"
    },
    {
      id: 2,
      requestNumber: "REQ-2025-002",
      items: "Lab Equipment",
      department: "Physics",
      requestedBy: "Sarah Johnson",
      priority: "medium",
      status: "pending"
    },
    {
      id: 3,
      requestNumber: "REQ-2025-003",
      items: "Office Chairs",
      department: "Administration",
      requestedBy: "Mike Davis",
      priority: "low",
      status: "pending"
    }
  ];

  const getPriorityBadge = (priority) => {
    const priorityColors = {
      high: "bg-red-100 text-red-800",
      medium: "bg-yellow-100 text-yellow-800",
      low: "bg-green-100 text-green-800"
    };

    return (
      <Badge variant="outline" className={`${priorityColors[priority]} border-none`}>
        {priority.charAt(0).toUpperCase() + priority.slice(1)}
      </Badge>
    );
  };

  return (
    <div className="bg-white rounded-lg shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Request Number</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Requested By</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((request) => (
            <TableRow key={request.id}>
              <TableCell className="font-medium">{request.requestNumber}</TableCell>
              <TableCell>{request.items}</TableCell>
              <TableCell>{request.department}</TableCell>
              <TableCell>{request.requestedBy}</TableCell>
              <TableCell>{getPriorityBadge(request.priority)}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      <span>View Details</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit Request</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <CheckCircle className="mr-2 h-4 w-4" />
                      <span>Approve</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <XCircle className="mr-2 h-4 w-4" />
                      <span>Reject</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default PurchaseRequestList;
