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
  Trash2,
  RefreshCw,
  Clock
} from "lucide-react";

const TrashedStockList = () => {
  const trashedItems = [
    { 
      id: "TRSH001", 
      name: "Broken Chair", 
      category: "furniture", 
      quantity: 1, 
      originalLocation: "Classroom 101",
      reason: "Irreparable damage",
      disposedBy: "John Doe",
      disposalDate: "2025-03-10",
      createdAt: "2025-03-10 14:30:00",
      updatedAt: "2025-03-10 14:30:00"
    },
    { 
      id: "TRSH002", 
      name: "Old Monitor", 
      category: "electronics", 
      quantity: 2, 
      originalLocation: "Computer Lab 2",
      reason: "Obsolete technology",
      disposedBy: "Jane Smith",
      disposalDate: "2025-03-15",
      createdAt: "2025-03-15 10:15:00",
      updatedAt: "2025-03-15 10:15:00"
    },
    { 
      id: "TRSH003", 
      name: "Damaged Table", 
      category: "furniture", 
      quantity: 1, 
      originalLocation: "Staff Room",
      reason: "Structural damage",
      disposedBy: "Mike Johnson",
      disposalDate: "2025-04-05",
      createdAt: "2025-04-05 16:45:00",
      updatedAt: "2025-04-05 16:45:00"
    }
  ];
  
  const formatDateTime = (dateString) => {
    if (!dateString) return '-';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getCategoryBadge = (category) => {
    const categoryColors = {
      electronics: "bg-blue-100 text-blue-800",
      furniture: "bg-amber-100 text-amber-800",
      stationery: "bg-green-100 text-green-800",
      equipment: "bg-purple-100 text-purple-800"
    };
    
    return (
      <Badge variant="outline" className={`${categoryColors[category]} border-none`}>
        {category.charAt(0).toUpperCase() + category.slice(1)}
      </Badge>
    );
  };
  
  return (
    <div className="bg-white rounded-lg shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Item Name</TableHead>
            <TableHead>Category</TableHead>
            <TableHead>Quantity</TableHead>
            <TableHead>Original Location</TableHead>
            <TableHead>Reason for Disposal</TableHead>
            <TableHead>Disposed By</TableHead>
            <TableHead>Disposal Date</TableHead>
            <TableHead className="whitespace-nowrap">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Last Updated
              </div>
            </TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trashedItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{getCategoryBadge(item.category)}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.originalLocation}</TableCell>
              <TableCell>{item.reason}</TableCell>
              <TableCell>{item.disposedBy}</TableCell>
              <TableCell>{formatDateTime(item.disposalDate)}</TableCell>
              <TableCell className="text-sm text-muted-foreground">
                {formatDateTime(item.updatedAt)}
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
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      <span>View Details</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <RefreshCw className="mr-2 h-4 w-4" />
                      <span>Restore Item</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      <span>Permanently Delete</span>
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

export default TrashedStockList;