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
  Trash, 
  Eye,
  CheckCircle
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

// Create StockItemForm component for editing
const StockItemForm = ({ item, isEditing, onCancel, onSave }) => {
  const [formData, setFormData] = useState(item || {
    item_id: "",
    item_name: "",
    category_name: "",
    quantity: 1,
    vendor_name: "",
    purchase_item_id: "",
    condition: "good"
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    
    // Convert numeric fields
    if (["quantity", "purchase_item_id"].includes(name)) {
      processedValue = parseInt(value) || 0;
    }
    
    setFormData(prev => ({
      ...prev,
      [name]: processedValue
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
            disabled
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
          <select
            id="category_name"
            name="category_name"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.category_name}
            onChange={handleChange}
            required
          >
            <option value="">Select Category</option>
            <option value="electronics">Electronics</option>
            <option value="furniture">Furniture</option>
            <option value="stationery">Stationery</option>
            <option value="equipment">Equipment</option>
          </select>
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
          <label htmlFor="purchase_item_id" className="text-sm font-medium">Purchase Item ID</label>
          <input
            id="purchase_item_id"
            name="purchase_item_id"
            type="number"
            min="1"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.purchase_item_id}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="condition" className="text-sm font-medium">Condition</label>
          <select
            id="condition"
            name="condition"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.condition}
            onChange={handleChange}
            required
          >
            <option value="good">Good</option>
            <option value="fair">Fair</option>
            <option value="poor">Poor</option>
            <option value="damaged">Damaged</option>
          </select>
        </div>
      </div>

      <div className="flex justify-end space-x-2">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {isEditing ? "Update Item" : "Save Item"}
        </Button>
      </div>
    </form>
  );
};

const StockList = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [itemToEdit, setItemToEdit] = useState(null);

  const [stockItems, setStockItems] = useState([
    { 
      item_id: 1, 
      item_name: "Desktop Computer", 
      category_name: "electronics", 
      quantity: 25, 
      vendor_name: "TechSupplies Ltd.",
      purchase_item_id: 101,
      condition: "good",
      created_at: "2024-10-15 09:00:00",
      updated_at: "2024-10-15 09:00:00"
    },
    { 
      item_id: 2, 
      item_name: "Office Chair", 
      category_name: "furniture", 
      quantity: 50, 
      vendor_name: "Furniture Masters",
      purchase_item_id: 102,
      condition: "good",
      created_at: "2024-11-05 10:30:00",
      updated_at: "2025-01-15 14:20:00"
    },
    { 
      item_id: 3, 
      item_name: "Printer", 
      category_name: "electronics", 
      quantity: 5, 
      vendor_name: "TechSupplies Ltd.",
      purchase_item_id: 103,
      condition: "good",
      created_at: "2025-01-20 11:15:00",
      updated_at: "2025-01-20 11:15:00"
    },
    { 
      item_id: 4, 
      item_name: "Whiteboard", 
      category_name: "equipment", 
      quantity: 10, 
      vendor_name: "Office Solutions",
      purchase_item_id: 104,
      condition: "good",
      created_at: "2025-02-10 08:45:00",
      updated_at: "2025-03-01 16:30:00"
    },
    { 
      item_id: 5, 
      item_name: "A4 Paper (Reams)", 
      category_name: "stationery", 
      quantity: 100, 
      vendor_name: "Office Solutions",
      purchase_item_id: 105,
      condition: "good",
      created_at: "2025-03-15 13:20:00",
      updated_at: "2025-03-15 13:20:00"
    }
  ]);
  
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
  
  const getConditionBadge = (condition) => {
    const conditionColors = {
      good: "bg-green-100 text-green-800",
      fair: "bg-yellow-100 text-yellow-800",
      poor: "bg-red-100 text-red-800",
      damaged: "bg-gray-100 text-gray-800"
    };
    
    return (
      <Badge variant="outline" className={`${conditionColors[condition]} border-none capitalize`}>
        {condition}
      </Badge>
    );
  };

  const handleDeleteItem = (item) => {
    setItemToDelete(item);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteItem = () => {
    setStockItems(prev => prev.filter(i => i.item_id !== itemToDelete.item_id));
    toast({
      title: "Item Deleted",
      description: `Item #${itemToDelete.item_id} has been deleted.`,
    });
    setIsDeleteDialogOpen(false);
  };

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setIsViewDialogOpen(true);
  };

  const handleEditItem = (item) => {
    setItemToEdit(item);
    setIsEditing(true);
  };

  const handleUpdateItem = (updatedItem) => {
    setStockItems(prev => prev.map(item => 
      item.item_id === updatedItem.item_id 
        ? { 
            ...updatedItem, 
            updated_at: new Date().toISOString() 
          } 
        : item
    ));
    toast({
      title: "Item Updated",
      description: `Item #${updatedItem.item_id} has been updated.`,
    });
    setIsEditing(false);
    setItemToEdit(null);
  };

  return (
    <div className="space-y-4">
      {isEditing ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Edit Stock Item</h2>
          <StockItemForm 
            item={itemToEdit}
            isEditing={true}
            onCancel={() => setIsEditing(false)}
            onSave={handleUpdateItem}
          />
        </div>
      ) : (
        <>
          <h2 className="text-lg font-medium">Stock Items</h2>

          <div className="bg-white rounded-lg shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Item ID</TableHead>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Vendor</TableHead>
                  <TableHead>Purchase Item ID</TableHead>
                  <TableHead>Condition</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {stockItems.map((item) => (
                  <TableRow key={item.item_id}>
                    <TableCell className="font-medium">{item.item_id}</TableCell>
                    <TableCell>{item.item_name}</TableCell>
                    <TableCell>{getCategoryBadge(item.category_name)}</TableCell>
                    <TableCell>{item.quantity}</TableCell>
                    <TableCell>{item.vendor_name}</TableCell>
                    <TableCell>{item.purchase_item_id}</TableCell>
                    <TableCell>{getConditionBadge(item.condition)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(item)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditItem(item)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Item
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeleteItem(item)}
                          >
                            <Trash className="mr-2 h-4 w-4" />
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
        </>
      )}

      {/* View Details Modal */}
      {selectedItem && (
        <div className={`fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50 ${isViewDialogOpen ? 'block' : 'hidden'}`}>
          <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-xl font-semibold">Stock Item Details</h2>
                  <p className="text-sm text-gray-500 mt-1">
                    Item ID: {selectedItem.item_id} • Created: {new Date(selectedItem.created_at).toLocaleDateString()}
                  </p>
                </div>
                <button 
                  onClick={() => setIsViewDialogOpen(false)} 
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-700">Basic Information</h3>
                      <div className="mt-2 space-y-2">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Item Name</p>
                          <p className="mt-1">{selectedItem.item_name}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Category</p>
                          <p className="mt-1">{getCategoryBadge(selectedItem.category_name)}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Quantity</p>
                          <p className="mt-1">{selectedItem.quantity}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-medium text-gray-700">Vendor Information</h3>
                      <div className="mt-2 space-y-2">
                        <div>
                          <p className="text-sm font-medium text-gray-500">Vendor Name</p>
                          <p className="mt-1">{selectedItem.vendor_name}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-500">Purchase Item ID</p>
                          <p className="mt-1">{selectedItem.purchase_item_id}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <h3 className="font-medium text-gray-700">Condition & Status</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm font-medium text-gray-500">Condition</p>
                      <p className="mt-1">{getConditionBadge(selectedItem.condition)}</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">Created At</p>
                    <p>{new Date(selectedItem.created_at).toLocaleDateString()}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Last Updated</p>
                    <p>{new Date(selectedItem.updated_at).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 flex justify-end">
                <Button onClick={() => setIsViewDialogOpen(false)}>Close</Button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete item #{itemToDelete?.item_id} 
              and all its associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteItem}
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

export default StockList;