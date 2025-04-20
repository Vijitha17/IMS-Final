
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
  Building
} from "lucide-react";

const CollegeList = () => {
  // Sample data
  const colleges = [
    { id: 1, name: "Engineering College", address: "123 College Road, Campus Area", principal: "Dr. John Smith" },
    { id: 2, name: "Arts College", address: "456 University Ave, Campus Area", principal: "Dr. Emily Wilson" },
    { id: 3, name: "Science College", address: "789 Science Way, Campus Area", principal: "Dr. Robert Johnson" },
    { id: 4, name: "Commerce College", address: "321 Business Blvd, Campus Area", principal: "Dr. James Anderson" }
  ];
  
  return (
    <div className="space-y-4">
      <div className="flex justify-end">
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Add College
        </Button>
      </div>
      
      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px]">College Name</TableHead>
              <TableHead>Address</TableHead>
              <TableHead>Principal</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {colleges.map((college) => (
              <TableRow key={college.id}>
                <TableCell className="font-medium">
                  <div className="flex items-center">
                    <Building className="h-4 w-4 mr-2 text-blue-600" />
                    {college.name}
                  </div>
                </TableCell>
                <TableCell>{college.address}</TableCell>
                <TableCell>{college.principal}</TableCell>
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
                        <span>Edit College</span>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem className="text-red-600">
                        <Trash className="mr-2 h-4 w-4" />
                        <span>Delete College</span>
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

export default CollegeList;
