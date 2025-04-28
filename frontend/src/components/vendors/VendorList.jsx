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
  Trash2, 
  Eye,
  Building,
  Truck,
  X
} from "lucide-react";
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
import { toast } from "@/components/ui/use-toast";

const VendorForm = ({ vendor, isEditing, onCancel, onSave }) => {
  const [formData, setFormData] = useState(vendor || {
    vendor_name: "",
    vendor_type: "Product",
    phone: "",
    email: "",
    address: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="vendor_name" className="text-sm font-medium">Vendor Name</label>
          <input
            id="vendor_name"
            name="vendor_name"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.vendor_name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="vendor_type" className="text-sm font-medium">Vendor Type</label>
          <select
            id="vendor_type"
            name="vendor_type"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.vendor_type}
            onChange={handleChange}
            required
          >
            <option value="Product">Product</option>
            <option value="Service">Service</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2 md:col-span-2">
          <label htmlFor="address" className="text-sm font-medium">Address</label>
          <textarea
            id="address"
            name="address"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.address}
            onChange={handleChange}
            rows={3}
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {isEditing ? "Update Vendor" : "Save Vendor"}
        </Button>
      </div>
    </form>
  );
};

const ViewVendorDetails = ({ vendor, isOpen, onClose }) => {
  if (!vendor) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold">Vendor Details</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Vendor ID</p>
                <p className="mt-1">{vendor.vendor_id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Vendor Name</p>
                <p className="mt-1">{vendor.vendor_name}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Vendor Type</p>
                <Badge variant={vendor.vendor_type === "Service" ? "default" : "secondary"}>
                  {vendor.vendor_type}
                </Badge>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Contact</p>
                <p className="mt-1">{vendor.phone}</p>
                <p className="mt-1 text-sm text-gray-500">{vendor.email}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Address</p>
                <p className="mt-1">{vendor.address}</p>
              </div>
            </div>

            {/* Added Created At and Updated At fields */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Created At</p>
                <p className="mt-1">
                  {vendor.created_at ? new Date(vendor.created_at).toLocaleString() : 'N/A'}
                </p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Updated At</p>
                <p className="mt-1">
                  {vendor.updated_at ? new Date(vendor.updated_at).toLocaleString() : 'N/A'}
                </p>
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

const VendorList = ({ vendors, onDelete, onUpdate }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [vendorToEdit, setVendorToEdit] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedVendor, setSelectedVendor] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [vendorToDelete, setVendorToDelete] = useState(null);

  const handleViewVendorDetails = (vendor) => {
    setSelectedVendor(vendor);
    setIsViewDialogOpen(true);
  };

  const handleEditVendor = (vendor) => {
    setVendorToEdit(vendor);
    setIsEditing(true);
  };

  const handleDeleteClick = (vendor) => {
    setVendorToDelete(vendor);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    onDelete(vendorToDelete.vendor_id);
    setIsDeleteDialogOpen(false);
    toast({
      title: "Vendor Deleted",
      description: `${vendorToDelete.vendor_name} has been removed.`,
    });
  };

  const handleSaveVendorEdit = (updatedVendor) => {
    onUpdate(updatedVendor);
    setIsEditing(false);
    toast({
      title: "Vendor Updated",
      description: "Vendor details have been updated.",
    });
  };

  return (
    <div className="space-y-4">
      {isEditing ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Edit Vendor</h2>
          <VendorForm 
            vendor={vendorToEdit}
            isEditing={true}
            onCancel={() => setIsEditing(false)}
            onSave={handleSaveVendorEdit}
          />
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Vendor ID</TableHead>
                  <TableHead>Vendor Name</TableHead>
                  <TableHead>Vendor Type</TableHead>
                  <TableHead>Phone Number</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {vendors.map((vendor) => (
                  <TableRow key={vendor.vendor_id}>
                    <TableCell className="font-medium">{vendor.vendor_id}</TableCell>
                    <TableCell>
                      <div className="flex items-center">
                        {vendor.vendor_type === "Service" ? (
                          <Truck className="h-4 w-4 mr-2 text-blue-600" />
                        ) : (
                          <Building className="h-4 w-4 mr-2 text-green-600" />
                        )}
                        {vendor.vendor_name}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant={vendor.vendor_type === "Service" ? "default" : "secondary"}>
                        {vendor.vendor_type}
                      </Badge>
                    </TableCell>
                    <TableCell>{vendor.phone}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewVendorDetails(vendor)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditVendor(vendor)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeleteClick(vendor)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>

          {isViewDialogOpen && (
            <ViewVendorDetails 
              vendor={selectedVendor}
              isOpen={isViewDialogOpen}
              onClose={() => setIsViewDialogOpen(false)}
            />
          )}

          <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently delete the vendor "{vendorToDelete?.vendor_name}" 
                  and remove its data from the system.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction 
                  onClick={confirmDelete}
                  className="bg-red-600 hover:bg-red-700"
                >
                  Delete
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </>
      )}
    </div>
  );
};

export default VendorList;