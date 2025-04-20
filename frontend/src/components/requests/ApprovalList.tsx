
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Eye, CheckCircle, XCircle } from "lucide-react";

const ApprovalList = () => {
  const approvals = [
    {
      id: "APP001",
      type: "Purchase",
      department: "Computer Science",
      description: "Software Licenses",
      submittedBy: "John Doe",
      date: "2025-04-15",
      status: "pending"
    },
    {
      id: "APP002",
      type: "Service",
      department: "Physics",
      description: "Lab Maintenance",
      submittedBy: "Jane Smith",
      date: "2025-04-16",
      status: "pending"
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
            <TableHead>Submitted By</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {approvals.map((app) => (
            <TableRow key={app.id}>
              <TableCell className="font-medium">{app.id}</TableCell>
              <TableCell>{app.type}</TableCell>
              <TableCell>{app.department}</TableCell>
              <TableCell>{app.description}</TableCell>
              <TableCell>{app.submittedBy}</TableCell>
              <TableCell>{app.date}</TableCell>
              <TableCell>
                <Badge variant={app.status === "approved" ? "success" : "warning"}>
                  {app.status}
                </Badge>
              </TableCell>
              <TableCell className="space-x-2">
                <Button variant="ghost" size="icon">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-green-500">
                  <CheckCircle className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon" className="text-red-500">
                  <XCircle className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApprovalList;
