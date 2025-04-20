
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
  Share2,
  Wrench
} from "lucide-react";

const StockList = () => {
  const navigate = useNavigate();
  
  const stockItems = [
    { 
      id: "STK001", 
      name: "Desktop Computer", 
      category: "electronics", 
      quantity: 25, 
      supplier: "TechSupplies Ltd.",
      condition: "good",
      purchaseDate: "2024-10-15",
      warrantyEnd: "2026-10-15"
    },
    { 
      id: "STK002", 
      name: "Office Chair", 
      category: "furniture", 
      quantity: 50, 
      supplier: "Furniture Masters",
      condition: "good",
      purchaseDate: "2024-11-05",
      warrantyEnd: "2027-11-05"
    },
    { 
      id: "STK003", 
      name: "Printer", 
      category: "electronics", 
      quantity: 5, 
      supplier: "TechSupplies Ltd.",
      condition: "good",
      purchaseDate: "2025-01-20",
      warrantyEnd: "2027-01-20"
    },
    { 
      id: "STK004", 
      name: "Whiteboard", 
      category: "equipment", 
      quantity: 10, 
      supplier: "Office Solutions",
      condition: "good",
      purchaseDate: "2025-02-10",
      warrantyEnd: "2030-02-10"
    },
    { 
      id: "STK005", 
      name: "A4 Paper (Reams)", 
      category: "stationery", 
      quantity: 100, 
      supplier: "Office Solutions",
      condition: "good",
      purchaseDate: "2025-03-15",
      warrantyEnd: "N/A"
    }
  ];
  
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
            <TableHead>Supplier</TableHead>
            <TableHead>Condition</TableHead>
            <TableHead>Purchase Date</TableHead>
            <TableHead>Warranty Until</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {stockItems.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{getCategoryBadge(item.category)}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.supplier}</TableCell>
              <TableCell className="capitalize">{item.condition}</TableCell>
              <TableCell>{item.purchaseDate}</TableCell>
              <TableCell>{item.warrantyEnd}</TableCell>
              <TableCell className="text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => navigate(`/stock/view/${item.id}`)}>
                      <Eye className="mr-2 h-4 w-4" />
                      <span>View Details</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(`/stock/edit/${item.id}`)}>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit Stock</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(`/stock/allocate/${item.id}`)}>
                      <Share2 className="mr-2 h-4 w-4" />
                      <span>Allocate Stock</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => navigate(`/stock/service/${item.id}`)}>
                      <Wrench className="mr-2 h-4 w-4" />
                      <span>Send to Service</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Delete</span>
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

export default StockList;
