
import React from "react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, Edit, Trash } from "lucide-react";

const RequestList = ({ onView }) => {
  const requests = [
    {
      id: "REQ001",
      type: "Purchase",
      department: "Computer Science",
      description: "New Computers",
      requestedBy: "John Doe",
      date: "2025-04-15",
      status: "pending"
    },
    {
      id: "REQ002",
      type: "Service",
      department: "Physics",
      description: "Equipment Maintenance",
      requestedBy: "Jane Smith",
      date: "2025-04-16",
      status: "approved"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Requested By</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {requests.map((req) => (
            <TableRow key={req.id}>
              <TableCell className="font-medium">{req.id}</TableCell>
              <TableCell>{req.type}</TableCell>
              <TableCell>{req.department}</TableCell>
              <TableCell>{req.description}</TableCell>
              <TableCell>{req.requestedBy}</TableCell>
              <TableCell>{req.date}</TableCell>
              <TableCell>
                <Badge variant={req.status === "approved" ? "success" : "warning"}>
                  {req.status}
                </Badge>
              </TableCell>
              <TableCell className="space-x-2">
                <Button variant="ghost" size="icon" onClick={onView}>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                  <Edit className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-red-500">
                  <Trash className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default RequestList;
