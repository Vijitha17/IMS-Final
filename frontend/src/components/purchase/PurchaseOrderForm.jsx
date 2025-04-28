import React, { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Trash2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const PurchaseOrderForm = ({ isEditing = false, onCancel }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  
  // Sample data - in a real app, this would come from an API
  const vendors = [
    { id: 1, name: "Tech Solutions Ltd" },
    { id: 2, name: "Office Supplies Co" },
    { id: 3, name: "Lab Equipment Inc" }
  ];

  const purchaseRequests = [
    { id: "PR-2023-001", title: "Laptops (5)" },
    { id: "PR-2023-002", title: "Desk Chairs (10)" },
    { id: "PR-2023-003", title: "Microscopes (3)" }
  ];

  const categories = [
    { id: 1, name: "Electronics" },
    { id: 2, name: "Furniture" },
    { id: 3, name: "Lab Equipment" },
    { id: 4, name: "Stationery" }
  ];

  const paymentModes = ["ONLINE", "OFFLINE"];
  const paymentStatuses = ["PENDING", "COMPLETED", "PARTIAL"];
  const orderStatuses = ["Pending", "Placed", "Received", "Cancelled"];

  const [formData, setFormData] = useState({
    purchase_request_id: "",
    vendor_name: "",
    order_date: new Date().toISOString().split('T')[0],
    items: [
      {
        item_name: "",
        quantity: 1,
        category_name: "",
        unit_price: 0,
        total_price: 0
      }
    ],
    total_cost: 0,
    paid_amount: 0,
    pending_amount: 0,
    payment_status: "PENDING",
    payment_mode: "",
    payment_id: "",
    bill_id: "",
    bill_copy: "",
    status: "Pending"
  });

  const handleItemChange = (index, field, value) => {
    const updatedItems = [...formData.items];
    updatedItems[index] = {
      ...updatedItems[index],
      [field]: value
    };
    
    // Calculate total price if quantity or unit price changes
    if (field === "quantity" || field === "unit_price") {
      updatedItems[index].total_price = 
        updatedItems[index].quantity * updatedItems[index].unit_price;
    }
    
    setFormData(prev => ({
      ...prev,
      items: updatedItems,
      total_cost: updatedItems.reduce((sum, item) => sum + item.total_price, 0),
      pending_amount: prev.total_cost - prev.paid_amount
    }));
  };

  const handlePaymentChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
      pending_amount: field === "paid_amount" 
        ? prev.total_cost - value 
        : prev.pending_amount
    }));
  };

  const addItem = () => {
    setFormData(prev => ({
      ...prev,
      items: [
        ...prev.items,
        {
          item_name: "",
          quantity: 1,
          category_name: "",
          unit_price: 0,
          total_price: 0
        }
      ]
    }));
  };

  const removeItem = (index) => {
    if (formData.items.length <= 1) return;
    
    const updatedItems = formData.items.filter((_, i) => i !== index);
    setFormData(prev => ({
      ...prev,
      items: updatedItems,
      total_cost: updatedItems.reduce((sum, item) => sum + item.total_price, 0),
      pending_amount: prev.total_cost - prev.paid_amount
    }));
  };

  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      // Fallback behavior if no onCancel is provided
      navigate("/purchase-orders");
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // In a real app, you would call an API here
    const action = isEditing ? "updated" : "created";
    toast({
      title: `Purchase Order ${action}`,
      description: `Purchase order has been ${action} successfully.`,
    });
    
    navigate("/purchase-orders");
  };

  return (
    <div className="space-y-6">
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div className="space-y-2">
            <label htmlFor="purchase_request_id" className="text-sm font-medium">
              Purchase Request
            </label>
            <Select
              onValueChange={(value) => handlePaymentChange("purchase_request_id", value)}
              value={formData.purchase_request_id}
              required
            >
              <SelectTrigger id="purchase_request_id">
                <SelectValue placeholder="Select purchase request" />
              </SelectTrigger>
              <SelectContent>
                {purchaseRequests.map(request => (
                  <SelectItem key={request.id} value={request.id}>
                    {request.id} - {request.title}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="vendor_name" className="text-sm font-medium">
              Vendor
            </label>
            <Select 
              onValueChange={(value) => handlePaymentChange("vendor_name", value)}
              value={formData.vendor_name}
              required
            >
              <SelectTrigger id="vendor_name">
                <SelectValue placeholder="Select vendor" />
              </SelectTrigger>
              <SelectContent>
                {vendors.map(vendor => (
                  <SelectItem key={vendor.id} value={vendor.name}>
                    {vendor.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <label htmlFor="order_date" className="text-sm font-medium">
              Order Date
            </label>
            <input
              id="order_date"
              type="date"
              className="w-full px-3 py-2 border rounded-md"
              value={formData.order_date}
              onChange={(e) => handlePaymentChange("order_date", e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="status" className="text-sm font-medium">
              Status
            </label>
            <Select 
              onValueChange={(value) => handlePaymentChange("status", value)}
              value={formData.status}
              required
            >
              <SelectTrigger id="status">
                <SelectValue placeholder="Select status" />
              </SelectTrigger>
              <SelectContent>
                {orderStatuses.map(status => (
                  <SelectItem key={status} value={status}>
                    {status}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="border-t pt-4 mt-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="font-medium text-lg">Order Items</h3>
            <Button 
              type="button" 
              size="sm" 
              variant="outline" 
              className="flex items-center"
              onClick={addItem}
            >
              <Plus className="h-4 w-4 mr-1" /> Add Item
            </Button>
          </div>

          <div className="space-y-4">
            {formData.items.map((item, index) => (
              <div key={index} className="grid gap-4 md:grid-cols-6 p-4 bg-gray-50 rounded-md">
                <div className="md:col-span-2">
                  <label htmlFor={`item_name_${index}`} className="text-sm font-medium">
                    Item Name
                  </label>
                  <input
                    id={`item_name_${index}`}
                    type="text"
                    className="w-full px-3 py-2 border rounded-md mt-1"
                    value={item.item_name}
                    onChange={(e) => handleItemChange(index, "item_name", e.target.value)}
                    required
                  />
                </div>

                <div>
                  <label htmlFor={`quantity_${index}`} className="text-sm font-medium">
                    Quantity
                  </label>
                  <input
                    id={`quantity_${index}`}
                    type="number"
                    min="1"
                    className="w-full px-3 py-2 border rounded-md mt-1"
                    value={item.quantity}
                    onChange={(e) => handleItemChange(index, "quantity", parseInt(e.target.value))}
                    required
                  />
                </div>

                <div>
                  <label htmlFor={`category_name_${index}`} className="text-sm font-medium">
                    Category
                  </label>
                  <Select 
                    onValueChange={(value) => handleItemChange(index, "category_name", value)}
                    value={item.category_name}
                    required
                  >
                    <SelectTrigger id={`category_name_${index}`}>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map(category => (
                        <SelectItem key={category.id} value={category.name}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label htmlFor={`unit_price_${index}`} className="text-sm font-medium">
                    Unit Price (₹)
                  </label>
                  <input
                    id={`unit_price_${index}`}
                    type="number"
                    min="0"
                    step="0.01"
                    className="w-full px-3 py-2 border rounded-md mt-1"
                    value={item.unit_price}
                    onChange={(e) => handleItemChange(index, "unit_price", parseFloat(e.target.value))}
                    required
                  />
                </div>

                <div className="flex items-end justify-center pb-1">
                  {formData.items.length > 1 && (
                    <Button 
                      type="button" 
                      variant="ghost" 
                      size="icon" 
                      className="text-red-500"
                      onClick={() => removeItem(index)}
                    >
                      <Trash2 className="h-5 w-5" />
                    </Button>
                  )}
                </div>
              </div>
            ))}

            <div className="flex justify-end p-4 bg-gray-100 rounded-md">
              <div className="space-y-2 w-64">
                <div className="flex justify-between">
                  <span className="text-sm">Subtotal:</span>
                  <span className="font-medium">₹{formData.total_cost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-sm">Paid Amount:</span>
                  <span className="font-medium">₹{formData.paid_amount.toLocaleString()}</span>
                </div>
                <div className="flex justify-between pt-2 border-t">
                  <span className="font-medium">Pending Amount:</span>
                  <span className="font-bold">₹{formData.pending_amount.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t pt-4 mt-6">
          <h3 className="font-medium text-lg mb-4">Payment Information</h3>
          
          <div className="grid gap-6 md:grid-cols-2">
            <div className="space-y-2">
              <label htmlFor="payment_status" className="text-sm font-medium">
                Payment Status
              </label>
              <Select 
                onValueChange={(value) => handlePaymentChange("payment_status", value)}
                value={formData.payment_status}
                required
              >
                <SelectTrigger id="payment_status">
                  <SelectValue placeholder="Select payment status" />
                </SelectTrigger>
                <SelectContent>
                  {paymentStatuses.map(status => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <label htmlFor="payment_mode" className="text-sm font-medium">
                Payment Mode
              </label>
              <Select 
                onValueChange={(value) => handlePaymentChange("payment_mode", value)}
                value={formData.payment_mode}
              >
                <SelectTrigger id="payment_mode">
                  <SelectValue placeholder="Select payment mode" />
                </SelectTrigger>
                <SelectContent>
                  {paymentModes.map(mode => (
                    <SelectItem key={mode} value={mode}>
                      {mode}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {formData.payment_mode === "ONLINE" && (
              <div className="space-y-2">
                <label htmlFor="payment_id" className="text-sm font-medium">
                  Payment ID
                </label>
                <input
                  id="payment_id"
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.payment_id}
                  onChange={(e) => handlePaymentChange("payment_id", e.target.value)}
                  required={formData.payment_mode === "ONLINE"}
                />
              </div>
            )}

            {formData.payment_mode === "OFFLINE" && (
              <div className="space-y-2">
                <label htmlFor="bill_id" className="text-sm font-medium">
                  Bill ID
                </label>
                <input
                  id="bill_id"
                  type="text"
                  className="w-full px-3 py-2 border rounded-md"
                  value={formData.bill_id}
                  onChange={(e) => handlePaymentChange("bill_id", e.target.value)}
                  required={formData.payment_mode === "OFFLINE"}
                />
              </div>
            )}

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="paid_amount" className="text-sm font-medium">
                Paid Amount (₹)
              </label>
              <input
                id="paid_amount"
                type="number"
                min="0"
                step="0.01"
                className="w-full px-3 py-2 border rounded-md"
                value={formData.paid_amount}
                onChange={(e) => handlePaymentChange("paid_amount", parseFloat(e.target.value))}
                required
              />
            </div>

            <div className="space-y-2 md:col-span-2">
              <label htmlFor="bill_copy" className="text-sm font-medium">
                Bill Copy/Invoice (URL)
              </label>
              <input
                id="bill_copy"
                type="url"
                className="w-full px-3 py-2 border rounded-md"
                value={formData.bill_copy}
                onChange={(e) => handlePaymentChange("bill_copy", e.target.value)}
                placeholder="https://example.com/bill.jpg"
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-2 pt-4">
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button type="submit">
            {isEditing ? "Update Purchase Order" : "Submit Purchase Order"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default PurchaseOrderForm;