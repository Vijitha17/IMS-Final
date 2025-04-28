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
  Eye,
  Edit,
  CheckCircle,
  XCircle
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

// Helper function for approval status badge
const getApprovalStatusBadge = (status) => {
  const statusColors = {
    Approved: "bg-green-100 text-green-800",
    Rejected: "bg-red-100 text-red-800",
    Pending: "bg-yellow-100 text-yellow-800"
  };

  return (
    <Badge variant="outline" className={`${statusColors[status]} border-none`}>
      {status}
    </Badge>
  );
};

// View Details Component
const ViewPurchaseRequestDetails = ({ request, isOpen, onClose }) => {
  if (!request || !isOpen) return null;

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-semibold">Purchase Request Details</h2>
              <p className="text-sm text-gray-500 mt-1">
                PR-{request.purchase_request_id} • Created: {formatDate(request.request_date)}
              </p>
            </div>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700"
            >
              <XCircle className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Basic Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="font-medium text-gray-700">Request Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Request ID</p>
                    <p className="mt-1">PR-{request.purchase_request_id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <div className="mt-1">{getApprovalStatusBadge(request.approval_status)}</div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Requested By</p>
                    <p className="mt-1">{request.requested_by}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Request Date</p>
                    <p className="mt-1">{formatDate(request.request_date)}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-gray-700">Approval Information</h3>
                <div>
                  <p className="text-sm font-medium text-gray-500">Approved By</p>
                  <p className="mt-1">{request.approve_by}</p>
                </div>
                {request.approval_status !== 'Pending' && (
                  <div>
                    <p className="text-sm font-medium text-gray-500">Approval Date</p>
                    <p className="mt-1">{formatDate(request.approved_date)}</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Item Details Section */}
            <div className="space-y-2">
              <h3 className="font-medium text-gray-700">Item Details</h3>
              <div className="border rounded-md p-4">
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Item Name</p>
                    <p className="mt-1">{request.item_name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Quantity</p>
                    <p className="mt-1">{request.quantity}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Category</p>
                    <p className="mt-1">{request.category_name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Estimated Cost</p>
                    <p className="mt-1">₹{request.estimated_cost?.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Vendor Information Section */}
            {request.vendor_name && (
              <div className="space-y-2">
                <h3 className="font-medium text-gray-700">Vendor Information</h3>
                <div className="border rounded-md p-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Vendor Name</p>
                    <p className="mt-1">{request.vendor_name}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Timestamps Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Created At</p>
                <p>{formatDate(request.created_at)}</p>
              </div>
              <div>
                <p className="text-gray-500">Last Updated</p>
                <p>{formatDate(request.updated_at)}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Edit Form Component
const EditPurchaseRequestForm = ({ request, isEditing, onCancel, onSave }) => {
  const [formData, setFormData] = useState(request || {
    item_name: "",
    category_name: "",
    quantity: 1,
    estimated_cost: 0,
    vendor_name: "",
    requested_by: "",
    approve_by: "",
    approval_status: "Pending"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    
    if (["quantity", "estimated_cost"].includes(name)) {
      processedValue = parseFloat(value) || 0;
    }
    
    setFormData(prev => ({ ...prev, [name]: processedValue }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="item_name" className="text-sm font-medium">Item Name</label>
          <input
            id="item_name"
            name="item_name"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.item_name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="category_name" className="text-sm font-medium">Category</label>
          <input
            id="category_name"
            name="category_name"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.category_name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="quantity" className="text-sm font-medium">Quantity</label>
          <input
            id="quantity"
            name="quantity"
            type="number"
            min="1"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.quantity}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="estimated_cost" className="text-sm font-medium">Estimated Cost (₹)</label>
          <input
            id="estimated_cost"
            name="estimated_cost"
            type="number"
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.estimated_cost}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="vendor_name" className="text-sm font-medium">Vendor Name</label>
          <input
            id="vendor_name"
            name="vendor_name"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.vendor_name}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="requested_by" className="text-sm font-medium">Requested By</label>
          <input
            id="requested_by"
            name="requested_by"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.requested_by}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="approve_by" className="text-sm font-medium">Approved By</label>
          <input
            id="approve_by"
            name="approve_by"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.approve_by}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="approval_status" className="text-sm font-medium">Approval Status</label>
          <select
            id="approval_status"
            name="approval_status"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.approval_status}
            onChange={handleChange}
            required
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {isEditing ? "Update Request" : "Save Request"}
        </Button>
      </div>
    </form>
  );
};

const PurchaseRequestList = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState(null);
  const [requestToDelete, setRequestToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [requestToEdit, setRequestToEdit] = useState(null);

  // Sample data - in a real app, this would come from an API
  const [purchaseRequests, setPurchaseRequests] = useState([
    {
      purchase_request_id: 1,
      item_name: "Laptops",
      category_name: "Electronics",
      quantity: 5,
      estimated_cost: 250000,
      vendor_name: "Tech Solutions Ltd",
      requested_by: "John Smith",
      approve_by: "Admin User",
      approval_status: "Approved",
      request_date: "2023-05-15 10:30:00",
      approved_date: "2023-05-16 14:20:00",
      created_at: "2023-05-15 10:30:00",
      updated_at: "2023-05-16 14:20:00"
    },
    {
      purchase_request_id: 2,
      item_name: "Desk Chairs",
      category_name: "Furniture",
      quantity: 10,
      estimated_cost: 50000,
      vendor_name: "Office Supplies Co",
      requested_by: "Sarah Johnson",
      approve_by: "Admin User",
      approval_status: "Pending",
      request_date: "2023-05-10 09:15:00",
      approved_date: null,
      created_at: "2023-05-10 09:15:00",
      updated_at: "2023-05-10 09:15:00"
    },
    {
      purchase_request_id: 3,
      item_name: "Microscopes",
      category_name: "Lab Equipment",
      quantity: 3,
      estimated_cost: 75000,
      vendor_name: "Lab Equipment Inc",
      requested_by: "Mike Davis",
      approve_by: "Admin User",
      approval_status: "Rejected",
      request_date: "2023-05-20 14:00:00",
      approved_date: "2023-05-21 11:30:00",
      created_at: "2023-05-20 14:00:00",
      updated_at: "2023-05-21 11:30:00"
    }
  ]);

  const handleDeleteRequest = (request) => {
    setRequestToDelete(request);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteRequest = () => {
    setPurchaseRequests(prev => prev.filter(r => r.purchase_request_id !== requestToDelete.purchase_request_id));
    toast({
      title: "Request Deleted",
      description: `Request #${requestToDelete.purchase_request_id} has been deleted.`,
    });
    setIsDeleteDialogOpen(false);
  };

  const handleViewDetails = (request) => {
    setSelectedRequest(request);
    setIsViewDialogOpen(true);
  };

  const handleEditRequest = (request) => {
    setRequestToEdit(request);
    setIsEditing(true);
  };

  const handleUpdateRequest = (updatedRequest) => {
    setPurchaseRequests(prev => prev.map(request => 
      request.purchase_request_id === updatedRequest.purchase_request_id 
        ? { 
            ...updatedRequest, 
            updated_at: new Date().toISOString() 
          } 
        : request
    ));
    toast({
      title: "Request Updated",
      description: `Request #${updatedRequest.purchase_request_id} has been updated.`,
    });
    setIsEditing(false);
    setRequestToEdit(null);
  };

  const handleStatusUpdate = (request, newStatus) => {
    setPurchaseRequests(prev => prev.map(r => 
      r.purchase_request_id === request.purchase_request_id 
        ? { 
            ...r, 
            approval_status: newStatus,
            approved_date: newStatus !== 'Pending' ? new Date().toISOString() : null,
            updated_at: new Date().toISOString() 
          } 
        : r
    ));
    toast({
      title: "Status Updated",
      description: `Request #${request.purchase_request_id} is now marked as ${newStatus}.`,
    });
  };

  return (
    <div className="space-y-4">
      {isEditing ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Edit Purchase Request</h2>
          <EditPurchaseRequestForm 
            request={requestToEdit}
            isEditing={true}
            onCancel={() => setIsEditing(false)}
            onSave={handleUpdateRequest}
          />
        </div>
      ) : (
        <>
          <h2 className="text-lg font-medium">Purchase Requests</h2>

          <div className="bg-white rounded-lg shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Request ID</TableHead>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Estimated Cost</TableHead>
                  <TableHead>Approved By</TableHead>
                  <TableHead>Approval Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchaseRequests.map((request) => (
                  <TableRow key={request.purchase_request_id}>
                    <TableCell className="font-medium">PR-{request.purchase_request_id}</TableCell>
                    <TableCell>{request.item_name}</TableCell>
                    <TableCell>{request.category_name}</TableCell>
                    <TableCell>{request.quantity}</TableCell>
                    <TableCell>₹{request.estimated_cost?.toLocaleString()}</TableCell>
                    <TableCell>{request.approve_by}</TableCell>
                    <TableCell>{getApprovalStatusBadge(request.approval_status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(request)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditRequest(request)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Request
                          </DropdownMenuItem>
                          {request.approval_status === "Pending" && (
                            <>
                              <DropdownMenuItem onClick={() => handleStatusUpdate(request, "Approved")}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Approve
                              </DropdownMenuItem>
                              <DropdownMenuItem 
                                className="text-red-600"
                                onClick={() => handleStatusUpdate(request, "Rejected")}
                              >
                                <XCircle className="mr-2 h-4 w-4" />
                                Reject
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                            </>
                          )}
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeleteRequest(request)}
                          >
                            <XCircle className="mr-2 h-4 w-4" />
                            Delete Request
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}

      {/* View Details Modal */}
      <ViewPurchaseRequestDetails 
        request={selectedRequest} 
        isOpen={isViewDialogOpen} 
        onClose={() => setIsViewDialogOpen(false)} 
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete purchase request #{requestToDelete?.purchase_request_id} 
              and all its associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteRequest}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default PurchaseRequestList;