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
  Trash2,
  CheckCircle,
  XCircle,
  FileText,
  Truck,
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

// Helper functions moved outside components
const getStatusBadge = (status) => {
  const statusColors = {
    Pending: "bg-yellow-100 text-yellow-800",
    Placed: "bg-blue-100 text-blue-800",
    Received: "bg-green-100 text-green-800",
    Cancelled: "bg-red-100 text-red-800"
  };

  return (
    <Badge variant="outline" className={`${statusColors[status]} border-none`}>
      {status}
    </Badge>
  );
};

const getPaymentStatusBadge = (status) => {
  const statusColors = {
    PENDING: "bg-yellow-100 text-yellow-800",
    COMPLETED: "bg-green-100 text-green-800",
    PARTIAL: "bg-orange-100 text-orange-800"
  };

  return (
    <Badge variant="outline" className={`${statusColors[status]} border-none`}>
      {status}
    </Badge>
  );
};

// Create PurchaseOrderForm component for editing
const PurchaseOrderForm = ({ order, isEditing, onCancel, onSave }) => {
  const [formData, setFormData] = useState(order || {
    purchase_request_id: "",
    vendor_name: "",
    item_name: "",
    quantity: 1,
    category_name: "",
    total_cost: 0,
    paid_amount: 0,
    payment_status: "PENDING",
    payment_mode: "",
    status: "Pending",
    order_date: new Date().toISOString().split('T')[0]
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    let processedValue = value;
    
    // Convert numeric fields
    if (["quantity", "total_cost", "paid_amount"].includes(name)) {
      processedValue = parseFloat(value) || 0;
    }
    
    setFormData(prev => {
      const updatedData = { ...prev, [name]: processedValue };
      
      // Auto-calculate pending amount
      if (["total_cost", "paid_amount"].includes(name)) {
        updatedData.pending_amount = updatedData.total_cost - updatedData.paid_amount;
        
        // Auto-update payment status
        if (updatedData.paid_amount === 0) {
          updatedData.payment_status = "PENDING";
        } else if (updatedData.paid_amount < updatedData.total_cost) {
          updatedData.payment_status = "PARTIAL";
        } else {
          updatedData.payment_status = "COMPLETED";
        }
      }
      
      return updatedData;
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="purchase_request_id" className="text-sm font-medium">Purchase Request ID</label>
          <input
            id="purchase_request_id"
            name="purchase_request_id"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.purchase_request_id}
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
          <label htmlFor="total_cost" className="text-sm font-medium">Total Cost (₹)</label>
          <input
            id="total_cost"
            name="total_cost"
            type="number"
            min="0"
            step="0.01"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.total_cost}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="paid_amount" className="text-sm font-medium">Paid Amount (₹)</label>
          <input
            id="paid_amount"
            name="paid_amount"
            type="number"
            min="0"
            step="0.01"
            max={formData.total_cost}
            className="w-full px-3 py-2 border rounded-md"
            value={formData.paid_amount}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="payment_mode" className="text-sm font-medium">Payment Mode</label>
          <select
            id="payment_mode"
            name="payment_mode"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.payment_mode || ""}
            onChange={handleChange}
          >
            <option value="">Select Payment Mode</option>
            <option value="ONLINE">Online</option>
            <option value="OFFLINE">Offline</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="status" className="text-sm font-medium">Order Status</label>
          <select
            id="status"
            name="status"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.status}
            onChange={handleChange}
            required
          >
            <option value="Pending">Pending</option>
            <option value="Placed">Placed</option>
            <option value="Received">Received</option>
            <option value="Cancelled">Cancelled</option>
          </select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="order_date" className="text-sm font-medium">Order Date</label>
          <input
            id="order_date"
            name="order_date"
            type="date"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.order_date}
            onChange={handleChange}
            required
          />
        </div>
        
        {formData.payment_mode === "ONLINE" && (
          <div className="space-y-2">
            <label htmlFor="payment_id" className="text-sm font-medium">Payment ID</label>
            <input
              id="payment_id"
              name="payment_id"
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              value={formData.payment_id || ""}
              onChange={handleChange}
            />
          </div>
        )}
        
        {formData.payment_mode === "OFFLINE" && (
          <div className="space-y-2">
            <label htmlFor="bill_id" className="text-sm font-medium">Bill ID</label>
            <input
              id="bill_id"
              name="bill_id"
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              value={formData.bill_id || ""}
              onChange={handleChange}
            />
          </div>
        )}
      </div>

      <div className="space-y-2">
        <label htmlFor="bill_copy" className="text-sm font-medium">Bill/Invoice URL (Optional)</label>
        <input
          id="bill_copy"
          name="bill_copy"
          type="url"
          className="w-full px-3 py-2 border rounded-md"
          value={formData.bill_copy || ""}
          onChange={handleChange}
          placeholder="https://example.com/bill.pdf"
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {isEditing ? "Update Order" : "Save Order"}
        </Button>
      </div>
    </form>
  );
};

const ViewPurchaseOrderDetails = ({ order, isOpen, onClose }) => {
  if (!order || !isOpen) return null;

  // Helper function to display date in readable format
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
              <h2 className="text-xl font-semibold">Purchase Order Details</h2>
              <p className="text-sm text-gray-500 mt-1">
                PO-{order.order_id} • Created: {formatDate(order.created_at)}
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
                <h3 className="font-medium text-gray-700">Order Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Order ID</p>
                    <p className="mt-1">PO-{order.order_id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Status</p>
                    <div className="mt-1">{getStatusBadge(order.status)}</div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Purchase Request</p>
                    <p className="mt-1">{order.purchase_request_id}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Order Date</p>
                    <p className="mt-1">{new Date(order.order_date).toLocaleDateString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="space-y-2">
                <h3 className="font-medium text-gray-700">Vendor Information</h3>
                <div>
                  <p className="text-sm font-medium text-gray-500">Vendor Name</p>
                  <p className="mt-1">{order.vendor_name}</p>
                </div>
              </div>
            </div>
            
            {/* Item Details Section */}
            <div className="space-y-2">
              <h3 className="font-medium text-gray-700">Item Details</h3>
              <div className="border rounded-md p-4">
                <div className="grid grid-cols-4 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Item Name</p>
                    <p className="mt-1">{order.item_name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Quantity</p>
                    <p className="mt-1">{order.quantity}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Category</p>
                    <p className="mt-1">{order.category_name}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Unit Price</p>
                    <p className="mt-1">₹{(order.total_cost / order.quantity).toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Financial Information Section */}
            <div className="space-y-2">
              <h3 className="font-medium text-gray-700">Financial Information</h3>
              <div className="border rounded-md p-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Total Cost</p>
                    <p className="mt-1 text-lg font-semibold">₹{order.total_cost.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Paid Amount</p>
                    <p className="mt-1">₹{order.paid_amount.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Pending Amount</p>
                    <p className="mt-1">₹{order.pending_amount.toLocaleString()}</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Payment Information Section */}
            <div className="space-y-2">
              <h3 className="font-medium text-gray-700">Payment Information</h3>
              <div className="border rounded-md p-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm font-medium text-gray-500">Payment Status</p>
                    <div className="mt-1">{getPaymentStatusBadge(order.payment_status)}</div>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">Payment Mode</p>
                    <p className="mt-1">{order.payment_mode || 'Not specified'}</p>
                  </div>
                  {order.payment_mode === 'ONLINE' && order.payment_id && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Payment ID</p>
                      <p className="mt-1">{order.payment_id}</p>
                    </div>
                  )}
                  {order.payment_mode === 'OFFLINE' && order.bill_id && (
                    <div>
                      <p className="text-sm font-medium text-gray-500">Bill ID</p>
                      <p className="mt-1">{order.bill_id}</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
            
            {/* Document Section */}
            {order.bill_copy && (
              <div className="space-y-2">
                <h3 className="font-medium text-gray-700">Attached Document</h3>
                <div className="border rounded-md p-4">
                  <div className="flex items-center">
                    <FileText className="h-5 w-5 mr-2 text-blue-500" />
                    <a 
                      href={order.bill_copy} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Bill/Invoice
                    </a>
                  </div>
                </div>
              </div>
            )}
            
            {/* Timestamps Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500">Created At</p>
                <p>{formatDate(order.created_at)}</p>
              </div>
              <div>
                <p className="text-gray-500">Last Updated</p>
                <p>{formatDate(order.updated_at)}</p>
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

const PurchaseOrderList = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [orderToDelete, setOrderToDelete] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [orderToEdit, setOrderToEdit] = useState(null);

  // Sample data - in a real app, this would come from an API
  const [purchaseOrders, setPurchaseOrders] = useState([
    {
      order_id: 1,
      purchase_request_id: "PR-2023-001",
      vendor_name: "Tech Solutions Ltd",
      item_name: "Laptop",
      quantity: 5,
      category_name: "Electronics",
      total_cost: 250000,
      paid_amount: 100000,
      pending_amount: 150000,
      payment_status: "PARTIAL",
      payment_mode: "ONLINE",
      payment_id: "PAY12345",
      bill_copy: "https://example.com/bill1.jpg",
      status: "Placed",
      order_date: "2023-05-15",
      created_at: "2023-05-15 10:30:00",
      updated_at: "2023-05-16 14:20:00"
    },
    {
      order_id: 2,
      purchase_request_id: "PR-2023-002",
      vendor_name: "Office Supplies Co",
      item_name: "Desk Chairs",
      quantity: 10,
      category_name: "Furniture",
      total_cost: 50000,
      paid_amount: 50000,
      pending_amount: 0,
      payment_status: "COMPLETED",
      payment_mode: "OFFLINE",
      bill_id: "BILL67890",
      bill_copy: "https://example.com/bill2.jpg",
      status: "Received",
      order_date: "2023-05-10",
      created_at: "2023-05-10 09:15:00",
      updated_at: "2023-05-12 11:45:00"
    },
    {
      order_id: 3,
      purchase_request_id: "PR-2023-003",
      vendor_name: "Lab Equipment Inc",
      item_name: "Microscopes",
      quantity: 3,
      category_name: "Lab Equipment",
      total_cost: 75000,
      paid_amount: 0,
      pending_amount: 75000,
      payment_status: "PENDING",
      payment_mode: null,
      payment_id: null,
      bill_id: null,
      bill_copy: null,
      status: "Pending",
      order_date: "2023-05-20",
      created_at: "2023-05-20 14:00:00",
      updated_at: "2023-05-20 14:00:00"
    }
  ]);

  const handleDeleteOrder = (order) => {
    setOrderToDelete(order);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteOrder = () => {
    // Remove the order from the state
    setPurchaseOrders(prev => prev.filter(o => o.order_id !== orderToDelete.order_id));
    toast({
      title: "Order Deleted",
      description: `Order #${orderToDelete.order_id} has been deleted.`,
    });
    setIsDeleteDialogOpen(false);
  };

  const handleViewDetails = (order) => {
    setSelectedOrder(order);
    setIsViewDialogOpen(true);
  };

  const handleEditOrder = (order) => {
    setOrderToEdit(order);
    setIsEditing(true);
  };

  const handleUpdateOrder = (updatedOrder) => {
    setPurchaseOrders(prev => prev.map(order => 
      order.order_id === updatedOrder.order_id 
        ? { 
            ...updatedOrder, 
            updated_at: new Date().toISOString() 
          } 
        : order
    ));
    toast({
      title: "Order Updated",
      description: `Order #${updatedOrder.order_id} has been updated.`,
    });
    setIsEditing(false);
    setOrderToEdit(null);
  };

  const handleStatusUpdate = (order, newStatus) => {
    setPurchaseOrders(prev => prev.map(o => 
      o.order_id === order.order_id 
        ? { ...o, status: newStatus, updated_at: new Date().toISOString() } 
        : o
    ));
    toast({
      title: "Status Updated",
      description: `Order #${order.order_id} is now marked as ${newStatus}.`,
    });
  };

  return (
    <div className="space-y-4">
      {isEditing ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Edit Purchase Order</h2>
          <PurchaseOrderForm 
            order={orderToEdit}
            isEditing={true}
            onCancel={() => setIsEditing(false)}
            onSave={handleUpdateOrder}
          />
        </div>
      ) : (
        <>
          <h2 className="text-lg font-medium">Purchase Orders</h2>

          <div className="bg-white rounded-lg shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Order ID</TableHead>
                  <TableHead>Item Name</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Category</TableHead>
                  <TableHead>Total Cost</TableHead>
                  <TableHead>Paid</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {purchaseOrders.map((order) => (
                  <TableRow key={order.order_id}>
                    <TableCell className="font-medium">PO-{order.order_id}</TableCell>
                    <TableCell>{order.item_name}</TableCell>
                    <TableCell>{order.quantity}</TableCell>
                    <TableCell>{order.category_name}</TableCell>
                    <TableCell>₹{order.total_cost.toLocaleString()}</TableCell>
                    <TableCell>
                      <div className="flex flex-col">
                        <span>₹{order.paid_amount.toLocaleString()}</span>
                        <span className="text-xs text-gray-500">
                          {getPaymentStatusBadge(order.payment_status)}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell>{getStatusBadge(order.status)}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewDetails(order)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditOrder(order)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit Order
                          </DropdownMenuItem>
                          {order.status === "Pending" && (
                            <>
                              <DropdownMenuItem onClick={() => handleStatusUpdate(order, "Placed")}>
                                <CheckCircle className="mr-2 h-4 w-4" />
                                Mark as Placed
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                            </>
                          )}
                          {order.status === "Placed" && (
                            <>
                              <DropdownMenuItem onClick={() => handleStatusUpdate(order, "Received")}>
                                <Truck className="mr-2 h-4 w-4" />
                                Mark as Received
                              </DropdownMenuItem>
                              <DropdownMenuSeparator />
                            </>
                          )}
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeleteOrder(order)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete Order
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
      <ViewPurchaseOrderDetails 
        order={selectedOrder} 
        isOpen={isViewDialogOpen} 
        onClose={() => setIsViewDialogOpen(false)} 
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete purchase order #{orderToDelete?.order_id} 
              and all its associated data.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteOrder}
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

export default PurchaseOrderList;