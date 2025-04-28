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
  Edit, 
  Eye,
  RefreshCw,
  CheckCircle,
  AlertCircle,
  Clock
} from "lucide-react";

const ServiceStockList = ({ type }) => {
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

  const toServiceItems = [
    { 
      id: "SVC001", 
      name: "Desktop Computer", 
      category: "electronics", 
      quantity: 3, 
      originalLocation: "Computer Lab 1",
      issueDescription: "Boot failure, possible hardware issue",
      serviceType: "in-house",
      requestDate: "2025-04-10",
      status: "pending",
      createdAt: "2025-04-10 09:15:00",
      updatedAt: "2025-04-10 09:15:00"
    },
    { 
      id: "SVC002", 
      name: "Printer", 
      category: "electronics", 
      quantity: 1, 
      originalLocation: "Administrative Office",
      issueDescription: "Paper jam mechanism faulty",
      serviceType: "vendor",
      requestDate: "2025-04-12",
      status: "approved",
      createdAt: "2025-04-12 11:30:00",
      updatedAt: "2025-04-12 14:45:00"
    },
    { 
      id: "SVC003", 
      name: "Lab Equipment", 
      category: "equipment", 
      quantity: 2, 
      originalLocation: "Physics Lab",
      issueDescription: "Calibration required",
      serviceType: "vendor",
      requestDate: "2025-04-15",
      status: "pending",
      createdAt: "2025-04-15 10:20:00",
      updatedAt: "2025-04-15 10:20:00"
    }
  ];
  
  const inServiceItems = [
    { 
      id: "SVC001", 
      name: "Desktop Computer", 
      category: "electronics", 
      quantity: 3, 
      originalLocation: "Computer Lab 1",
      serviceProvider: "IT Department",
      serviceStartDate: "2025-04-12",
      expectedCompletionDate: "2025-04-20",
      status: "in-progress",
      createdAt: "2025-04-12 09:00:00",
      updatedAt: "2025-04-15 16:30:00"
    },
    { 
      id: "SVC004", 
      name: "Air Conditioner", 
      category: "equipment", 
      quantity: 2, 
      originalLocation: "Library",
      serviceProvider: "Cooling Solutions Inc.",
      serviceStartDate: "2025-04-10",
      expectedCompletionDate: "2025-04-18",
      status: "completed",
      createdAt: "2025-04-10 14:15:00",
      updatedAt: "2025-04-18 11:00:00"
    },
    { 
      id: "SVC005", 
      name: "Projector", 
      category: "electronics", 
      quantity: 1, 
      originalLocation: "Conference Room",
      serviceProvider: "TechRepair Services",
      serviceStartDate: "2025-04-08",
      expectedCompletionDate: "2025-04-25",
      status: "in-progress",
      createdAt: "2025-04-08 10:45:00",
      updatedAt: "2025-04-15 09:30:00"
    }
  ];
  
  const items = type === "to-service" ? toServiceItems : inServiceItems;
  
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
  
  const getStatusBadge = (status) => {
    const statusColors = {
      pending: "bg-yellow-100 text-yellow-800",
      approved: "bg-green-100 text-green-800",
      rejected: "bg-red-100 text-red-800",
      "in-progress": "bg-blue-100 text-blue-800",
      completed: "bg-green-100 text-green-800"
    };
    
    const statusLabels = {
      pending: "Pending",
      approved: "Approved",
      rejected: "Rejected",
      "in-progress": "In Progress",
      completed: "Completed"
    };
    
    return (
      <Badge variant="outline" className={`${statusColors[status]} border-none`}>
        {statusLabels[status]}
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
            
            {type === "to-service" ? (
              <>
                <TableHead>Issue Description</TableHead>
                <TableHead>Service Type</TableHead>
                <TableHead>Request Date</TableHead>
              </>
            ) : (
              <>
                <TableHead>Service Provider</TableHead>
                <TableHead>Service Start</TableHead>
                <TableHead>Expected Completion</TableHead>
              </>
            )}
            
            <TableHead className="whitespace-nowrap">
              <div className="flex items-center">
                <Clock className="h-4 w-4 mr-1" />
                Last Updated
              </div>
            </TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell className="font-medium">{item.id}</TableCell>
              <TableCell>{item.name}</TableCell>
              <TableCell>{getCategoryBadge(item.category)}</TableCell>
              <TableCell>{item.quantity}</TableCell>
              <TableCell>{item.originalLocation}</TableCell>
              
              {type === "to-service" ? (
                <>
                  <TableCell>{item.issueDescription}</TableCell>
                  <TableCell className="capitalize">{item.serviceType}</TableCell>
                  <TableCell>{formatDateTime(item.requestDate)}</TableCell>
                </>
              ) : (
                <>
                  <TableCell>{item.serviceProvider}</TableCell>
                  <TableCell>{formatDateTime(item.serviceStartDate)}</TableCell>
                  <TableCell>{formatDateTime(item.expectedCompletionDate)}</TableCell>
                </>
              )}
              
              <TableCell className="text-sm text-muted-foreground">
                {formatDateTime(item.updatedAt)}
              </TableCell>
              <TableCell>{getStatusBadge(item.status)}</TableCell>
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
                    
                    {type === "to-service" && item.status === "pending" && (
                      <>
                        <DropdownMenuItem>
                          <CheckCircle className="mr-2 h-4 w-4 text-green-600" />
                          <span>Approve</span>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <AlertCircle className="mr-2 h-4 w-4 text-red-600" />
                          <span>Reject</span>
                        </DropdownMenuItem>
                      </>
                    )}
                    
                    {type === "in-service" && item.status === "completed" && (
                      <DropdownMenuItem>
                        <RefreshCw className="mr-2 h-4 w-4" />
                        <span>Return to Stock</span>
                      </DropdownMenuItem>
                    )}
                    
                    {type === "in-service" && item.status === "in-progress" && (
                      <DropdownMenuItem>
                        <Edit className="mr-2 h-4 w-4" />
                        <span>Update Status</span>
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

export default ServiceStockList;