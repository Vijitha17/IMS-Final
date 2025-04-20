
import React from "react";
import { useNavigate } from "react-router-dom";
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
  Building
} from "lucide-react";

const VendorList = ({ type }) => {
  const navigate = useNavigate();
  
  // Sample data - in a real app, this would come from an API
  const vendors = [
    { 
      id: "VEN001", 
      name: "TechServ Solutions", 
      type: "service",
      contact: "John Smith",
      email: "john@techserv.com",
      phone: "123-456-7890",
      address: "123 Tech Street, City, State, ZIP",
      products: ["Computer Repair", "Network Setup", "IT Support"]
    },
    { 
      id: "VEN002", 
      name: "Office Supplies Co", 
      type: "product",
      contact: "Sarah Johnson",
      email: "sarah@officesupplies.com",
      phone: "987-654-3210",
      address: "456 Supply Road, Town, State, ZIP",
      products: ["Paper", "Printers", "Stationery"]
    }
  ].filter(vendor => vendor.type === type);
  
  return (
    <div className="bg-white rounded-lg shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Contact Person</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Products/Services</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vendors.map((vendor) => (
            <TableRow key={vendor.id}>
              <TableCell className="font-medium">{vendor.id}</TableCell>
              <TableCell>{vendor.name}</TableCell>
              <TableCell>{vendor.contact}</TableCell>
              <TableCell>{vendor.email}</TableCell>
              <TableCell>{vendor.phone}</TableCell>
              <TableCell className="truncate max-w-[200px]">{vendor.address}</TableCell>
              <TableCell>
                <div className="flex flex-wrap gap-1">
                  {vendor.products.slice(0, 2).map((product) => (
                    <Badge key={product} variant="secondary">
                      {product}
                    </Badge>
                  ))}
                  {vendor.products.length > 2 && (
                    <Badge variant="outline">+{vendor.products.length - 2}</Badge>
                  )}
                </div>
              </TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate(`/vendor/view/${vendor.id}`)}>
                      <Eye className="mr-2 h-4 w-4" />
                      <span>View Details</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(`/vendor/edit/${vendor.id}`)}>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit Vendor</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Delete Vendor</span>
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

export default VendorList;
