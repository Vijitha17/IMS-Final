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
  Eye,
  Wrench,
  RefreshCw,
  Clock,
  Trash2,
  CheckCircle,
  XCircle,
  AlertCircle,
  X
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

// Helper functions
const getStatusBadge = (status) => {
  const statusColors = {
    Available: "bg-green-100 text-green-800",
    Allocated: "bg-blue-100 text-blue-800",
    'In Service': "bg-orange-100 text-orange-800",
    Trashed: "bg-red-100 text-red-800",
    Sold: "bg-purple-100 text-purple-800"
  };

  return (
    <Badge variant="outline" className={`${statusColors[status]} border-none`}>
      {status}
    </Badge>
  );
};

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

// View Details Component
const ViewAllocationDetails = ({ allocation, isOpen, onClose }) => {
  if (!allocation || !isOpen) return null;

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
              <h2 className="text-xl font-semibold">Allocation Details</h2>
              <p className="text-sm text-gray-500 mt-1">
                Allocation ID: {allocation.Allocate_id} • Created: {formatDate(allocation.created_at)}
              </p>
            </div>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-6">
            {/* Basic Information Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h3 className="font-medium text-gray-700">Item Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Item ID</p>
                    <p className="mt-1">{allocation.item_id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <div className="mt-1">{getStatusBadge(allocation.status)}</div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Item Name</p>
                    <p className="mt-1">{allocation.item_name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Category</p>
                    <p className="mt-1">{allocation.category_name}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-gray-700">Allocation Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Quantity</p>
                    <p className="mt-1">{allocation.quantity}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Allocated To</p>
                    <p className="mt-1">{allocation.allocated_to || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Allocation Date</p>
                    <p className="mt-1">{formatDate(allocation.allocated_date)}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Purchase Item ID</p>
                    <p className="mt-1">{allocation.purchase_item_id || '-'}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Location Information Section */}
            <div className="space-y-2">
              <h3 className="font-medium text-gray-700">Location Information</h3>
              <div className="border rounded-md p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">College</p>
                    <p className="mt-1">{allocation.college_name || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Department</p>
                    <p className="mt-1">{allocation.department_name || '-'}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Location</p>
                    <p className="mt-1">{allocation.location_name || '-'}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Remarks Section */}
            {allocation.remarks && (
              <div className="space-y-2">
                <h3 className="font-medium text-gray-700">Remarks</h3>
                <div className="border rounded-md p-4">
                  <p className="whitespace-pre-wrap">{allocation.remarks}</p>
                </div>
              </div>
            )}
            
            {/* Timestamps Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Created At</p>
                <p>{formatDate(allocation.created_at)}</p>
              </div>
              <div>
                <p className="text-gray-500">Last Updated</p>
                <p>{formatDate(allocation.updated_at)}</p>
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
const EditAllocationForm = ({ allocation, onCancel, onSave }) => {
  const [formData, setFormData] = useState(allocation || {
    item_id: '',
    item_name: '',
    category_name: '',
    college_name: '',
    department_name: '',
    location_name: '',
    status: 'Available',
    quantity: 1,
    allocated_to: '',
    allocated_date: new Date().toISOString().split('T')[0],
    purchase_item_id: '',
    remarks: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="item_id" className="text-sm font-medium">Item ID</label>
          <input
            id="item_id"
            name="item_id"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.item_id}
            onChange={handleChange}
            required
          />
        </div>
        
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
          <label htmlFor="college_name" className="text-sm font-medium">College</label>
          <input
            id="college_name"
            name="college_name"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.college_name || ''}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="department_name" className="text-sm font-medium">Department</label>
          <input
            id="department_name"
            name="department_name"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.department_name || ''}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="location_name" className="text-sm font-medium">Location</label>
          <input
            id="location_name"
            name="location_name"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.location_name || ''}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="status" className="text-sm font-medium">Status</label>
          <select
            id="status"
            name="status"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="Available">Available</option>
            <option value="Allocated">Allocated</option>
            <option value="In Service">In Service</option>
            <option value="Trashed">Trashed</option>
            <option value="Sold">Sold</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="allocated_to" className="text-sm font-medium">Allocated To</label>
          <input
            id="allocated_to"
            name="allocated_to"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.allocated_to || ''}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="allocated_date" className="text-sm font-medium">Allocation Date</label>
          <input
            id="allocated_date"
            name="allocated_date"
            type="date"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.allocated_date}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="purchase_item_id" className="text-sm font-medium">Purchase Item ID</label>
          <input
            id="purchase_item_id"
            name="purchase_item_id"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.purchase_item_id || ''}
            onChange={handleChange}
          />
        </div>
      </div>

      <div className="space-y-2">
        <label htmlFor="remarks" className="text-sm font-medium">Remarks</label>
        <textarea
          id="remarks"
          name="remarks"
          rows="3"
          className="w-full px-3 py-2 border rounded-md"
          value={formData.remarks || ''}
          onChange={handleChange}
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Save Changes
        </Button>
      </div>
    </form>
  );
};

const AllocatedStockList = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedAllocation, setSelectedAllocation] = useState(null);
  const [allocationToDelete, setAllocationToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [allocationToEdit, setAllocationToEdit] = useState(null);

  // Sample data - in a real app, this would come from an API
  const [allocations, setAllocations] = useState([
    {
      Allocate_id: 1,
      item_id: 101,
      item_name: "Desktop Computer",
      category_name: "Electronics",
      college_name: "Engineering College",
      department_name: "Computer Science",
      location_name: "Lab 101",
      status: "Allocated",
      quantity: 5,
      allocated_to: "Dr. Smith",
      allocated_date: "2023-05-15T10:30:00",
      purchase_item_id: 501,
      remarks: "For research project use",
      created_at: "2023-05-15T10:30:00",
      updated_at: "2023-05-15T10:30:00"
    },
    {
      Allocate_id: 2,
      item_id: 102,
      item_name: "Office Chair",
      category_name: "Furniture",
      college_name: "Business School",
      department_name: "Administration",
      location_name: "Dean's Office",
      status: "Allocated",
      quantity: 2,
      allocated_to: "Dean Johnson",
      allocated_date: "2023-05-10T09:15:00",
      purchase_item_id: 502,
      remarks: "Executive chairs for office",
      created_at: "2023-05-10T09:15:00",
      updated_at: "2023-05-12T11:45:00"
    },
    {
      Allocate_id: 3,
      item_id: 103,
      item_name: "Projector",
      category_name: "Electronics",
      college_name: "Arts College",
      department_name: "Media Studies",
      location_name: "Lecture Hall 3",
      status: "In Service",
      quantity: 1,
      allocated_to: "Media Department",
      allocated_date: "2023-05-20T14:00:00",
      purchase_item_id: 503,
      remarks: "Currently being repaired",
      created_at: "2023-05-20T14:00:00",
      updated_at: "2023-06-01T16:30:00"
    }
  ]);

  const handleDeleteAllocation = (allocation) => {
    setAllocationToDelete(allocation);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteAllocation = () => {
    // Remove the allocation from the state
    setAllocations(prev => prev.filter(a => a.Allocate_id !== allocationToDelete.Allocate_id));
    toast({
      title: "Allocation Deleted",
      description: `Allocation #${allocationToDelete.Allocate_id} has been deleted.`,
    });
    setIsDeleteDialogOpen(false);
  };

  const handleViewDetails = (allocation) => {
    setSelectedAllocation(allocation);
    setIsViewDialogOpen(true);
  };

  const handleEditAllocation = (allocation) => {
    setAllocationToEdit(allocation);
    setIsEditing(true);
  };

  const handleUpdateAllocation = (updatedAllocation) => {
    setAllocations(prev => prev.map(allocation => 
      allocation.Allocate_id === updatedAllocation.Allocate_id 
        ? { 
            ...updatedAllocation, 
            updated_at: new Date().toISOString() 
          } 
        : allocation
    ));
    toast({
      title: "Allocation Updated",
      description: `Allocation #${updatedAllocation.Allocate_id} has been updated.`,
    });
    setIsEditing(false);
    setAllocationToEdit(null);
  };

  const handleStatusUpdate = (allocation, newStatus) => {
    setAllocations(prev => prev.map(a => 
      a.Allocate_id === allocation.Allocate_id 
        ? { ...a, status: newStatus, updated_at: new Date().toISOString() } 
        : a
    ));
    toast({
      title: "Status Updated",
      description: `Allocation #${allocation.Allocate_id} is now marked as ${newStatus}.`,
    });
  };

  return (
    <div className="space-y-4">
      {isEditing ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Edit Allocation</h2>
          <EditAllocationForm 
            allocation={allocationToEdit}
            onCancel={() => setIsEditing(false)}
            onSave={handleUpdateAllocation}
          />
        </div>
      ) : (
        <>
          <h2 className="text-lg font-medium">Allocated Stock</h2>

          <div className="bg-white rounded-lg shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Allocation ID</TableHead>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Allocated To</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Status</TableHead>
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
                {allocations.map((allocation) => (
                  <TableRow key={allocation.Allocate_id}>
                    <TableCell className="font-medium">{allocation.Allocate_id}</TableCell>
                    <TableCell>{allocation.item_name}</TableCell>
                    <TableCell>{allocation.category_name}</TableCell>
                    <TableCell>{allocation.quantity}</TableCell>
                    <TableCell>{allocation.allocated_to || '-'}</TableCell>
                    <TableCell>{allocation.location_name || '-'}</TableCell>
                    <TableCell>{getStatusBadge(allocation.status)}</TableCell>
                    <TableCell className="text-sm text-muted-foreground">
                      {formatDateTime(allocation.updated_at)}
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
                          <DropdownMenuItem onClick={() => handleViewDetails(allocation)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditAllocation(allocation)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Allocation
                          </DropdownMenuItem>
                          {allocation.status === "Allocated" && (
                            <>
                              <DropdownMenuItem onClick={() => handleStatusUpdate(allocation, "Available")}>
                                <RefreshCw className="mr-2 h-4 w-4" />
                                Return to Stock
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                            </>
                          )}
                          {allocation.status === "Available" && (
                            <>
                              <DropdownMenuItem onClick={() => handleStatusUpdate(allocation, "Allocated")}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Mark as Allocated
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                            </>
                          )}
                          {allocation.status !== "In Service" && (
                            <DropdownMenuItem onClick={() => handleStatusUpdate(allocation, "In Service")}>
                              <Wrench className="mr-2 h-4 w-4" />
                              Send to Service
                            </DropdownMenuItem>
                          )}
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeleteAllocation(allocation)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Allocation
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
      <ViewAllocationDetails 
        allocation={selectedAllocation} 
        isOpen={isViewDialogOpen} 
        onClose={() => setIsViewDialogOpen(false)} 
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete allocation #{allocationToDelete?.Allocate_id} 
              and all its associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteAllocation}
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

export default AllocatedStockList;