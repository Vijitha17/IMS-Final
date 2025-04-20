
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
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  MoreHorizontal,
  Eye,
  Edit,
  CheckCircle,
  XCircle,
  FileText
} from "lucide-react";

const PurchaseList = ({ status }) => {
  // Sample data - in a real app, this would come from an API
  const purchases = [
    {
      id: 1,
      requestNumber: "PR-2025-001",
      items: "Computer Equipment",
      department: "Computer Science",
      requestedBy: "John Smith",
      amount: 25000,
      status: "pending"
    },
    {
      id: 2,
      requestNumber: "PR-2025-002",
      items: "Lab Equipment",
      department: "Physics",
      requestedBy: "Sarah Johnson",
      amount: 35000,
      status: "approved"
    },
    {
      id: 3,
      requestNumber: "PR-2025-003",
      items: "Office Supplies",
      department: "Administration",
      requestedBy: "Mike Davis",
      amount: 5000,
      status: "completed"
    }
  ];

  const filteredPurchases = status 
    ? purchases.filter(purchase => purchase.status === status)
    : purchases;

  const getStatusBadge = (status) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      completed: "bg-blue-100 text-blue-800"
    };

    return (
      <Badge variant="outline" className={`${statusColors[status]} border-none`}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
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
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredPurchases.map((purchase) => (
            <TableRow key={purchase.id}>
              <TableCell>{purchase.requestNumber}</TableCell>
              <TableCell>{purchase.items}</TableCell>
              <TableCell>{purchase.department}</TableCell>
              <TableCell>{purchase.requestedBy}</TableCell>
              <TableCell>₹{purchase.amount.toLocaleString()}</TableCell>
              <TableCell>{getStatusBadge(purchase.status)}</TableCell>
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
                    {purchase.status === "pending" && (
                      <>
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
                      </>
                    )}
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <FileText className="mr-2 h-4 w-4" />
                      <span>Download PDF</span>
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

export default PurchaseList;
