
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
import { 
  Plus,
  MoreHorizontal, 
  Edit, 
  Trash,
  Eye,
  BookOpen
} from "lucide-react";

const DepartmentList = () => {
  // Sample data
  const departments = [
    { id: 1, name: "Computer Science", college: "Engineering College", hod: "Prof. Sarah Johnson" },
    { id: 2, name: "Electrical Engineering", college: "Engineering College", hod: "Dr. Michael Lee" },
    { id: 3, name: "Mechanical Engineering", college: "Engineering College", hod: "Prof. David Miller" },
    { id: 4, name: "Physics", college: "Science College", hod: "Dr. Robert Brown" },
    { id: 5, name: "Chemistry", college: "Science College", hod: "Dr. Jennifer Williams" },
    { id: 6, name: "English Literature", college: "Arts College", hod: "Prof. Elizabeth Davis" }
  ];
  
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add Department
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">Department Name</TableHead>
              <TableHead>College</TableHead>
              <TableHead>Head of Department</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {departments.map((department) => (
              <TableRow key={department.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <BookOpen className="h-4 w-4 mr-2 text-green-600" />
                    {department.name}
                  </div>
                </TableCell>
                <TableCell>{department.college}</TableCell>
                <TableCell>{department.hod}</TableCell>
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
                        <span>Edit Department</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Delete Department</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default DepartmentList;
