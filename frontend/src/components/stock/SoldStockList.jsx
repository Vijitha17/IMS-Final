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
  FileText,
  Clock,
  Undo2
} from "lucide-react";

const SoldStockList = () => {
  const soldItems = [
    { 
      id: "SOLD001", 
      name: "Used Laptop", 
      category: "electronics", 
      quantity: 1, 
      originalLocation: "IT Department",
      soldTo: "David Wilson",
      salePrice: 250,
      saleDate: "2025-02-20",
      invoiceNumber: "INV-2025-021",
      createdAt: "2025-02-20 11:30:00",
      updatedAt: "2025-02-20 11:30:00"
    },
    { 
      id: "SOLD002", 
      name: "Office Furniture Set", 
      category: "furniture", 
      quantity: 5, 
      originalLocation: "Administration",
      soldTo: "ABC Startup",
      salePrice: 1200,
      saleDate: "2025-03-05",
      invoiceNumber: "INV-2025-035",
      createdAt: "2025-03-05 14:15:00",
      updatedAt: "2025-03-05 14:15:00"
    },
    { 
      id: "SOLD003", 
      name: "Projector", 
      category: "electronics", 
      quantity: 1, 
      originalLocation: "Conference Room",
      soldTo: "Local School",
      salePrice: 350,
      saleDate: "2025-04-10",
      invoiceNumber: "INV-2025-047",
      createdAt: "2025-04-10 09:45:00",
      updatedAt: "2025-04-10 09:45:00"
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
  
  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(amount);
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
            <TableHead>Sold To</TableHead>
            <TableHead>Sale Price</TableHead>
            <TableHead>Sale Date</TableHead>
            <TableHead>Invoice #</TableHead>
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
          {soldItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{getCategoryBadge(item.category)}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.originalLocation}</TableCell>
              <TableCell>{item.soldTo}</TableCell>
              <TableCell>{formatCurrency(item.salePrice)}</TableCell>
              <TableCell>{formatDateTime(item.saleDate)}</TableCell>
              <TableCell>{item.invoiceNumber}</TableCell>
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
                      <FileText className="mr-2 h-4 w-4" />
                      <span>View Invoice</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Undo2 className="mr-2 h-4 w-4" />
                      <span>Reverse Sale</span>
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

export default SoldStockList;