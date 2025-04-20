
import React, { useState } from "react";
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
  Edit, 
  Trash, 
  Eye,
  CheckSquare,
  XSquare
} from "lucide-react";

const RequirementList = ({ type }) => {
  // Sample data - in a real app, this would come from an API
  const currentRequirements = [
    { 
      id: "REQ001", 
      department: "Computer Science", 
      college: "Engineering College", 
      items: [
        { name: "Desktop Computers", category: "electronics", quantity: 20 },
        { name: "Office Chairs", category: "furniture", quantity: 20 }
      ],
      requestedBy: "Prof. Sarah Johnson",
      date: "2025-04-10",
      status: "pending"
    },
    { 
      id: "REQ002", 
      department: "Electrical Lab", 
      college: "Engineering College", 
      items: [
        { name: "Oscilloscopes", category: "equipment", quantity: 10 },
        { name: "Digital Multimeters", category: "equipment", quantity: 15 }
      ],
      requestedBy: "Dr. Michael Lee",
      date: "2025-04-12",
      status: "approved"
    },
    { 
      id: "REQ003", 
      department: "Administrative Office", 
      college: "Engineering College", 
      items: [
        { name: "Filing Cabinets", category: "furniture", quantity: 5 },
        { name: "A4 Papers (Reams)", category: "stationery", quantity: 50 }
      ],
      requestedBy: "Mr. David Miller",
      date: "2025-04-15",
      status: "pending"
    }
  ];
  
  const historyRequirements = [
    { 
      id: "REQ001", 
      department: "Computer Science", 
      college: "Engineering College", 
      items: [
        { name: "Desktop Computers", category: "electronics", quantity: 20 },
        { name: "Office Chairs", category: "furniture", quantity: 20 }
      ],
      requestedBy: "Prof. Sarah Johnson",
      date: "2025-03-05",
      status: "approved",
      completedDate: "2025-03-15"
    },
    { 
      id: "REQ002", 
      department: "Physics Lab", 
      college: "Science College", 
      items: [
        { name: "Lab Equipment", category: "equipment", quantity: 5 }
      ],
      requestedBy: "Dr. Robert Brown",
      date: "2025-03-10",
      status: "rejected",
      completedDate: "2025-03-12"
    },
    { 
      id: "REQ003", 
      department: "Library", 
      college: "Arts College", 
      items: [
        { name: "Bookshelves", category: "furniture", quantity: 8 },
        { name: "Study Tables", category: "furniture", quantity: 10 }
      ],
      requestedBy: "Ms. Elizabeth Davis",
      date: "2025-03-18",
      status: "approved",
      completedDate: "2025-03-25"
    }
  ];
  
  const requirements = type === "current" ? currentRequirements : historyRequirements;
  
  const getStatusBadge = (status) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800"
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
            <TableHead>ID</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>College</TableHead>
            <TableHead>Items</TableHead>
            <TableHead>Requested By</TableHead>
            <TableHead>Date</TableHead>
            {type === "history" && <TableHead>Completed Date</TableHead>}
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requirements.map((req) => (
            <TableRow key={req.id}>
              <TableCell className="font-medium">{req.id}</TableCell>
              <TableCell>{req.department}</TableCell>
              <TableCell>{req.college}</TableCell>
              <TableCell>
                {req.items.map((item, index) => (
                  <span key={index}>
                    {item.quantity} {item.name}
                    {index < req.items.length - 1 ? ', ' : ''}
                  </span>
                ))}
              </TableCell>
              <TableCell>{req.requestedBy}</TableCell>
              <TableCell>{req.date}</TableCell>
              {type === "history" && <TableCell>{req.completedDate}</TableCell>}
              <TableCell>{getStatusBadge(req.status)}</TableCell>
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
                    
                    {type === "current" && req.status === "pending" && (
                      <>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          <span>Edit Requirement</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <CheckSquare className="mr-2 h-4 w-4 text-green-600" />
                          <span>Approve</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <XSquare className="mr-2 h-4 w-4 text-red-600" />
                          <span>Reject</span>
                        </DropdownMenuItem>
                      </>
                    )}
                    
                    {type === "current" && (
                      <DropdownMenuSeparator />
                    )}
                    
                    {type === "current" && (
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Delete</span>
                      </DropdownMenuItem>
                    )}
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

export default RequirementList;
