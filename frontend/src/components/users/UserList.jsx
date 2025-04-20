
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
  Key,
  Eye
} from "lucide-react";

const UserList = () => {
  // Sample data - in a real app, this would come from an API
  const users = [
    { id: 1, name: "Dr. John Smith", email: "john.smith@college.edu", role: "principal", college: "Engineering College", department: "" },
    { id: 2, name: "Prof. Sarah Johnson", email: "sarah.johnson@college.edu", role: "hod", college: "Engineering College", department: "Computer Science" },
    { id: 3, name: "Mr. Michael Davis", email: "michael.davis@college.edu", role: "department_admin", college: "Science College", department: "Physics" },
    { id: 4, name: "Dr. Emily Wilson", email: "emily.wilson@college.edu", role: "hod", college: "Arts College", department: "English" },
    { id: 5, name: "Mr. David Brown", email: "david.brown@college.edu", role: "management_admin", college: "", department: "" },
    { id: 6, name: "Ms. Jennifer Lee", email: "jennifer.lee@college.edu", role: "management_people", college: "", department: "" }
  ];
  
  const getRoleBadge = (role) => {
    const roleColors = {
      management_admin: "bg-purple-100 text-purple-800",
      management_people: "bg-indigo-100 text-indigo-800",
      principal: "bg-blue-100 text-blue-800",
      hod: "bg-green-100 text-green-800",
      department_admin: "bg-amber-100 text-amber-800"
    };
    
    const roleLabels = {
      management_admin: "Management Admin",
      management_people: "Management Staff",
      principal: "Principal",
      hod: "HOD",
      department_admin: "Department Admin"
    };
    
    return (
      <Badge variant="outline" className={`${roleColors[role]} border-none`}>
        {roleLabels[role]}
      </Badge>
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[250px]">Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>College</TableHead>
            <TableHead>Department</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{getRoleBadge(user.role)}</TableCell>
              <TableCell>{user.college || "—"}</TableCell>
              <TableCell>{user.department || "—"}</TableCell>
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
                      <span>Edit User</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Key className="mr-2 h-4 w-4" />
                      <span>Reset Password</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Delete User</span>
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

export default UserList;
