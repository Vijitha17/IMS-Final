import React, { useState, useEffect } from "react";
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
  X,
  Upload
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
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { Calendar as CalendarIcon } from "lucide-react";
import { format } from "date-fns";

// Helper function for received status badge
const getReceivedStatusBadge = (receivedDate) => {
  if (!receivedDate) {
    return <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-none">Pending</Badge>;
  }
  return <Badge variant="outline" className="bg-green-100 text-green-800 border-none">Received</Badge>;
};

// View Details Component
const ViewPurchaseItemDetails = ({ item, isOpen, onClose }) => {
  if (!item || !isOpen) return null;

  const formatDate = (dateString) => {
    if (!dateString) return "Not received";
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-semibold">Purchase Item Details</h2>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Item Name</p>
                  <p className="mt-1">{item.item_name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Category</p>
                  <p className="mt-1">{item.category_name}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Vendor</p>
                  <p className="mt-1">{item.vendor_name}</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm font-medium text-gray-500">Quantity</p>
                  <p className="mt-1">{item.quantity}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Unit Price</p>
                  <p className="mt-1">₹{item.unit_cost.toLocaleString()}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-500">Total Cost</p>
                  <p className="mt-1 font-semibold">₹{(item.quantity * item.unit_cost).toLocaleString()}</p>
                </div>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Received Date</p>
                <p className="mt-1">{formatDate(item.received_date)}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Status</p>
                <div className="mt-1">{getReceivedStatusBadge(item.received_date)}</div>
              </div>
              {item.remarks && (
                <div>
                  <p className="text-sm font-medium text-gray-500">Remarks</p>
                  <p className="mt-1">{item.remarks}</p>
                </div>
              )}
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
const EditPurchaseItemForm = ({ item, isOpen, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    purchase_item_id: "",
    order_id: "",
    status: "Placed",
    purchase_request: "",
    order_date: new Date(),
    vendor_name: "",
    item_name: "",
    category_name: "",
    quantity: 1,
    unit_cost: 0,
    total_cost: 0,
    paid_amount: 0,
    pending_amount: 0,
    payment_status: "PENDING",
    payment_mode: "ONLINE",
    payment_id: "",
    received_date: null,
    remarks: "",
    attached_document: null
  });

  // Initialize form data when item prop changes
  useEffect(() => {
    if (item) {
      setFormData({
        purchase_item_id: item.purchase_item_id || "",
        order_id: item.order_id || "",
        status: item.status || "Placed",
        purchase_request: item.purchase_request || "",
        order_date: item.order_date ? new Date(item.order_date) : new Date(),
        vendor_name: item.vendor_name || "",
        item_name: item.item_name || "",
        category_name: item.category_name || "",
        quantity: item.quantity || 1,
        unit_cost: item.unit_cost || 0,
        total_cost: (item.quantity || 0) * (item.unit_cost || 0),
        paid_amount: item.paid_amount || 0,
        pending_amount: item.pending_amount || ((item.quantity || 0) * (item.unit_cost || 0)) - (item.paid_amount || 0),
        payment_status: item.payment_status || "PENDING",
        payment_mode: item.payment_mode || "ONLINE",
        payment_id: item.payment_id || "",
        received_date: item.received_date ? new Date(item.received_date) : null,
        remarks: item.remarks || "",
        attached_document: item.attached_document || null
      });
    }
  }, [item]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (name === "paid_amount") {
      const total = formData.quantity * formData.unit_cost;
      const pending = total - parseFloat(value);
      setFormData(prev => ({
        ...prev,
        [name]: value,
        pending_amount: pending >= 0 ? pending : 0,
        payment_status: 
          pending <= 0 ? "PAID" : 
          parseFloat(value) > 0 ? "PARTIAL" : "PENDING"
      }));
    }
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleDateSelect = (date, field) => {
    setFormData({ ...formData, [field]: date });
  };

  useEffect(() => {
    const total = formData.quantity * formData.unit_cost;
    const pending = total - formData.paid_amount;
    
    setFormData(prev => ({
      ...prev,
      total_cost: total,
      pending_amount: pending >= 0 ? pending : 0,
      payment_status: 
        pending <= 0 ? "PAID" : 
        formData.paid_amount > 0 ? "PARTIAL" : "PENDING"
    }));
  }, [formData.quantity, formData.unit_cost, formData.paid_amount]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-start mb-6">
            <h2 className="text-xl font-semibold">Edit Purchase Item</h2>
            <button 
              onClick={onClose} 
              className="text-gray-500 hover:text-gray-700"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Order Information Section */}
            <div>
              <h3 className="text-md font-medium mb-4 pb-1 border-b">Order Information</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="order_id">Order ID</Label>
                  <Input
                    id="order_id"
                    name="order_id"
                    value={formData.order_id}
                    onChange={handleChange}
                    placeholder="Enter order ID"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => handleSelectChange("status", value)}
                  >
                    <SelectTrigger id="status">
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Placed">Placed</SelectItem>
                      <SelectItem value="Processed">Processed</SelectItem>
                      <SelectItem value="Shipped">Shipped</SelectItem>
                      <SelectItem value="Delivered">Delivered</SelectItem>
                      <SelectItem value="Canceled">Canceled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="purchase_request">Purchase Request</Label>
                  <Input
                    id="purchase_request"
                    name="purchase_request"
                    value={formData.purchase_request}
                    onChange={handleChange}
                    placeholder="PR number"
                  />
                </div>

                <div className="space-y-2">
                  <Label>Order Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.order_date ? (
                          format(formData.order_date, "PPP")
                        ) : (
                          <span>Select date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.order_date}
                        onSelect={(date) => handleDateSelect(date, "order_date")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </div>

            {/* Vendor Information Section */}
            <div>
              <h3 className="text-md font-medium mb-4 pb-1 border-b">Vendor Information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="vendor_name">Vendor Name</Label>
                  <Select
                    value={formData.vendor_name}
                    onValueChange={(value) => handleSelectChange("vendor_name", value)}
                    required
                  >
                    <SelectTrigger id="vendor_name">
                      <SelectValue placeholder="Select vendor" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Tech Solutions Ltd">Tech Solutions Ltd</SelectItem>
                      <SelectItem value="Office Supplies Co">Office Supplies Co</SelectItem>
                      <SelectItem value="Lab Equipment Inc">Lab Equipment Inc</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>

            {/* Item Details Section */}
            <div>
              <h3 className="text-md font-medium mb-4 pb-1 border-b">Item Details</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="space-y-2">
                  <Label htmlFor="item_name">Item Name</Label>
                  <Input
                    id="item_name"
                    name="item_name"
                    value={formData.item_name}
                    onChange={handleChange}
                    placeholder="Item name"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="quantity">Quantity</Label>
                  <Input
                    id="quantity"
                    name="quantity"
                    type="number"
                    min="1"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="Qty"
                    required
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="category_name">Category</Label>
                  <Select
                    value={formData.category_name}
                    onValueChange={(value) => handleSelectChange("category_name", value)}
                    required
                  >
                    <SelectTrigger id="category_name">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="Equipment">Equipment</SelectItem>
                      <SelectItem value="Furniture">Furniture</SelectItem>
                      <SelectItem value="Supplies">Supplies</SelectItem>
                      <SelectItem value="Electronics">Electronics</SelectItem>
                      <SelectItem value="Software">Software</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="unit_cost">Unit Price</Label>
                  <Input
                    id="unit_cost"
                    name="unit_cost"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.unit_cost}
                    onChange={handleChange}
                    placeholder="Price per unit"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Financial Information Section */}
            <div>
              <h3 className="text-md font-medium mb-4 pb-1 border-b">Financial Information</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="total_cost">Total Cost</Label>
                  <Input
                    id="total_cost"
                    name="total_cost"
                    type="number"
                    value={formData.total_cost}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="paid_amount">Paid Amount</Label>
                  <Input
                    id="paid_amount"
                    name="paid_amount"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.paid_amount}
                    onChange={handleChange}
                    placeholder="Amount paid"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="pending_amount">Pending Amount</Label>
                  <Input
                    id="pending_amount"
                    name="pending_amount"
                    type="number"
                    value={formData.pending_amount}
                    readOnly
                    className="bg-gray-50"
                  />
                </div>
              </div>
            </div>

            {/* Payment Information Section */}
            <div>
              <h3 className="text-md font-medium mb-4 pb-1 border-b">Payment Information</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2">
                  <Label htmlFor="payment_status">Payment Status</Label>
                  <Select
                    value={formData.payment_status}
                    onValueChange={(value) => handleSelectChange("payment_status", value)}
                  >
                    <SelectTrigger id="payment_status">
                      <SelectValue placeholder="Payment status" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PENDING">Pending</SelectItem>
                      <SelectItem value="PARTIAL">Partial</SelectItem>
                      <SelectItem value="PAID">Paid</SelectItem>
                      <SelectItem value="REFUNDED">Refunded</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payment_mode">Payment Mode</Label>
                  <Select
                    value={formData.payment_mode}
                    onValueChange={(value) => handleSelectChange("payment_mode", value)}
                  >
                    <SelectTrigger id="payment_mode">
                      <SelectValue placeholder="Payment mode" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CASH">Cash</SelectItem>
                      <SelectItem value="CHEQUE">Cheque</SelectItem>
                      <SelectItem value="ONLINE">Online</SelectItem>
                      <SelectItem value="BANK_TRANSFER">Bank Transfer</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="payment_id">Payment ID</Label>
                  <Input
                    id="payment_id"
                    name="payment_id"
                    value={formData.payment_id}
                    onChange={handleChange}
                    placeholder="Payment reference"
                  />
                </div>
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <h3 className="text-md font-medium mb-4 pb-1 border-b">Additional Information</h3>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="space-y-2">
                  <Label>Received Date</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {formData.received_date ? (
                          format(formData.received_date, "PPP")
                        ) : (
                          <span>Select date</span>
                        )}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={formData.received_date}
                        onSelect={(date) => handleDateSelect(date, "received_date")}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="remarks">Remarks</Label>
                  <Input
                    id="remarks"
                    name="remarks"
                    value={formData.remarks}
                    onChange={handleChange}
                    placeholder="Any additional remarks"
                  />
                </div>

                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="attached_document">Attached Document</Label>
                  <div className="flex items-center space-x-2">
                    {formData.attached_document ? (
                      <>
                        <Button variant="outline" size="sm" type="button">
                          <Eye className="h-4 w-4 mr-2" /> View Bill/Invoice
                        </Button>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          type="button" 
                          className="text-red-500"
                          onClick={() => setFormData({...formData, attached_document: null})}
                        >
                          <Trash2 className="h-4 w-4 mr-2" /> Remove
                        </Button>
                      </>
                    ) : (
                      <div className="flex items-center justify-center w-full">
                        <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100">
                          <div className="flex flex-col items-center justify-center pt-5 pb-6">
                            <Upload className="w-8 h-8 mb-4 text-gray-500" />
                            <p className="mb-2 text-sm text-gray-500">
                              <span className="font-semibold">Click to upload</span> or drag and drop
                            </p>
                            <p className="text-xs text-gray-500">PDF, PNG, JPG or DOCX (MAX. 10MB)</p>
                          </div>
                          <input 
                            id="file-upload" 
                            type="file" 
                            className="hidden" 
                            accept=".pdf,.png,.jpg,.jpeg,.docx"
                            onChange={(e) => {
                              if (e.target.files && e.target.files[0]) {
                                setFormData({...formData, attached_document: e.target.files[0]});
                              }
                            }}
                          />
                        </label>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 pt-4">
              <Button variant="outline" type="button" onClick={onClose}>
                Cancel
              </Button>
              <Button type="submit">
                Save Changes
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

const PurchaseItemList = () => {
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [itemToDelete, setItemToDelete] = useState(null);

  // Sample data - in a real app, this would come from an API
  const [purchaseItems, setPurchaseItems] = useState([
    {
      purchase_item_id: 1,
      order_id: "PO-2023-001",
      item_name: "Dell XPS 13 Laptop",
      category_name: "Equipment",
      vendor_name: "Tech Solutions Ltd",
      quantity: 5,
      unit_cost: 89000,
      received_date: "2023-05-20",
      remarks: "For new hires",
      created_at: "2023-05-15 10:30:00",
      status: "Placed",
      payment_status: "PAID",
      payment_mode: "ONLINE",
      payment_id: "PAY12345",
      paid_amount: 445000,
      pending_amount: 0,
      purchase_request: "PR-2023-001"
    },
    {
      purchase_item_id: 2,
      order_id: "PO-2023-001",
      item_name: "HP LaserJet Pro Printer",
      category_name: "Equipment",
      vendor_name: "Tech Solutions Ltd",
      quantity: 2,
      unit_cost: 35000,
      received_date: null,
      remarks: "",
      created_at: "2023-05-15 10:30:00",
      status: "Placed",
      payment_status: "PENDING",
      payment_mode: "ONLINE",
      payment_id: "",
      paid_amount: 0,
      pending_amount: 70000,
      purchase_request: "PR-2023-001"
    },
    {
      purchase_item_id: 3,
      order_id: "PO-2023-002",
      item_name: "Lab Oscilloscope",
      category_name: "Equipment",
      vendor_name: "Lab Equipment Inc",
      quantity: 3,
      unit_cost: 120000,
      received_date: "2023-05-18",
      remarks: "For physics lab",
      created_at: "2023-05-10 09:15:00",
      status: "Delivered",
      payment_status: "PARTIAL",
      payment_mode: "BANK_TRANSFER",
      payment_id: "TRANS7890",
      paid_amount: 240000,
      pending_amount: 120000,
      purchase_request: "PR-2023-002"
    },
    {
      purchase_item_id: 4,
      order_id: "PO-2023-003",
      item_name: "Office Chairs",
      category_name: "Furniture",
      vendor_name: "Office Supplies Co",
      quantity: 20,
      unit_cost: 7500,
      received_date: "2023-05-12",
      remarks: "For new office setup",
      created_at: "2023-05-05 14:00:00",
      status: "Received",
      payment_status: "PAID",
      payment_mode: "CHEQUE",
      payment_id: "CHQ4567",
      paid_amount: 150000,
      pending_amount: 0,
      purchase_request: "PR-2023-003"
    },
    {
      purchase_item_id: 5,
      order_id: "PO-2023-003",
      item_name: "Stationery Set",
      category_name: "Supplies",
      vendor_name: "Office Supplies Co",
      quantity: 50,
      unit_cost: 250,
      received_date: "2023-05-12",
      remarks: "",
      created_at: "2023-05-05 14:00:00",
      status: "Received",
      payment_status: "PAID",
      payment_mode: "CHEQUE",
      payment_id: "CHQ4567",
      paid_amount: 12500,
      pending_amount: 0,
      purchase_request: "PR-2023-003"
    }
  ]);

  const handleDeleteItem = (item) => {
    setItemToDelete(item);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteItem = () => {
    setPurchaseItems(prev => prev.filter(i => i.purchase_item_id !== itemToDelete.purchase_item_id));
    toast({
      title: "Item Deleted",
      description: `Item "${itemToDelete.item_name}" has been deleted.`,
    });
    setIsDeleteDialogOpen(false);
  };

  const handleViewDetails = (item) => {
    setSelectedItem(item);
    setIsViewDialogOpen(true);
  };

  const handleEditItem = (item) => {
    setSelectedItem(item);
    setIsEditDialogOpen(true);
  };

  const handleUpdateItem = (updatedItem) => {
    setPurchaseItems(prev => prev.map(item => 
      item.purchase_item_id === updatedItem.purchase_item_id 
        ? { 
            ...updatedItem,
            // Ensure dates are in string format for display
            order_date: updatedItem.order_date instanceof Date ? updatedItem.order_date.toISOString().split('T')[0] : updatedItem.order_date,
            received_date: updatedItem.received_date instanceof Date ? updatedItem.received_date.toISOString().split('T')[0] : updatedItem.received_date
          } 
        : item
    ));
    toast({
      title: "Item Updated",
      description: `Item "${updatedItem.item_name}" has been updated.`,
    });
    setIsEditDialogOpen(false);
  };

  const markAsReceived = (item) => {
    setPurchaseItems(prev => prev.map(i => 
      i.purchase_item_id === item.purchase_item_id 
        ? { ...i, received_date: new Date().toISOString().split('T')[0] } 
        : i
    ));
    toast({
      title: "Item Updated",
      description: `Item "${item.item_name}" has been marked as received.`,
    });
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-medium">Purchase Items</h2>

      <div className="bg-white rounded-lg shadow">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order ID</TableHead>
              <TableHead>Item Name</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Vendor</TableHead>
              <TableHead>Qty</TableHead>
              <TableHead>Unit Cost</TableHead>
              <TableHead>Received Date</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {purchaseItems.map((item) => (
              <TableRow key={item.purchase_item_id}>
                <TableCell className="font-medium">{item.order_id}</TableCell>
                <TableCell>{item.item_name}</TableCell>
                <TableCell>{item.category_name}</TableCell>
                <TableCell>{item.vendor_name}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>₹{item.unit_cost.toLocaleString()}</TableCell>
                <TableCell>
                  {item.received_date ? (
                    new Date(item.received_date).toLocaleDateString()
                  ) : (
                    <Badge variant="outline" className="bg-yellow-100 text-yellow-800 border-none">
                      Pending
                    </Badge>
                  )}
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
                      <DropdownMenuItem onClick={() => handleViewDetails(item)}>
                        <Eye className="mr-2 h-4 w-4" />
                        View Details
                      </DropdownMenuItem>
                      <DropdownMenuItem onClick={() => handleEditItem(item)}>
                        <Edit className="mr-2 h-4 w-4" />
                        Edit Item
                      </DropdownMenuItem>
                      {!item.received_date && (
                        <DropdownMenuItem onClick={() => markAsReceived(item)}>
                          <CheckCircle className="mr-2 h-4 w-4" />
                          Mark as Received
                        </DropdownMenuItem>
                      )}
                      <DropdownMenuSeparator />
                      <DropdownMenuItem 
                        className="text-red-600"
                        onClick={() => handleDeleteItem(item)}
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Remove Item
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* View Details Modal */}
      <ViewPurchaseItemDetails 
        item={selectedItem} 
        isOpen={isViewDialogOpen} 
        onClose={() => setIsViewDialogOpen(false)} 
      />

      {/* Edit Item Modal */}
      <EditPurchaseItemForm 
        item={selectedItem} 
        isOpen={isEditDialogOpen} 
        onClose={() => setIsEditDialogOpen(false)}
        onSave={handleUpdateItem}
      />

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the item "{itemToDelete?.item_name}" 
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

export default PurchaseItemList;