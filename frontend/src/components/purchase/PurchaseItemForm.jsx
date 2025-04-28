import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Plus, Trash2, Upload } from "lucide-react";
import { format } from "date-fns";

const PurchaseItemForm = ({ onCancel, purchaseRequest }) => {
  const [formData, setFormData] = useState({
    order_id: purchaseRequest?.order_id || "",
    item_name: purchaseRequest?.item_name || "",
    category_name: purchaseRequest?.category_name || "",
    vendor_name: purchaseRequest?.vendor_name || "",
    quantity: purchaseRequest?.quantity || 1,
    unit_cost: purchaseRequest?.unit_cost || 0,
    received_date: purchaseRequest?.received_date || null,
    remarks: purchaseRequest?.remarks || ""
  });

  const [items, setItems] = useState(purchaseRequest ? [{
    order_id: purchaseRequest.order_id,
    item_name: purchaseRequest.item_name,
    category_name: purchaseRequest.category_name,
    vendor_name: purchaseRequest.vendor_name,
    quantity: purchaseRequest.quantity,
    unit_cost: purchaseRequest.unit_cost,
    received_date: purchaseRequest.received_date,
    remarks: purchaseRequest.remarks
  }] : []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSelectChange = (name, value) => {
    setFormData({ ...formData, [name]: value });
  };

  const handleDateSelect = (date, name) => {
    setFormData({ ...formData, [name]: date });
  };

  const addItem = () => {
    if (formData.item_name && formData.quantity && formData.unit_cost) {
      setItems([...items, {
        order_id: formData.order_id,
        item_name: formData.item_name,
        category_name: formData.category_name,
        vendor_name: formData.vendor_name,
        quantity: formData.quantity,
        unit_cost: formData.unit_cost,
        received_date: formData.received_date,
        remarks: formData.remarks
      }]);
      // Reset item fields
      setFormData({
        ...formData,
        item_name: "",
        category_name: "",
        vendor_name: "",
        quantity: 1,
        unit_cost: 0,
        received_date: null,
        remarks: ""
      });
    }
  };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const calculateTotal = () => {
    return items.reduce((total, item) => {
      return total + (item.quantity * item.unit_cost);
    }, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would typically send the data to your API
    console.log({
      order_id: formData.order_id,
      items,
      total_cost: calculateTotal()
    });
    // Then you might navigate away or show a success message
  };

  return (
    <form className="space-y-6" onSubmit={handleSubmit}>
      <div className="grid gap-6 md:grid-cols-2">
        {/* Order ID */}
        <div className="space-y-2">
          <Label htmlFor="order_id">Order ID</Label>
          <Input
            id="order_id"
            name="order_id"
            type="number"
            min="1"
            value={formData.order_id}
            onChange={handleChange}
            placeholder="Enter order ID"
            required
          />
        </div>

        {/* Vendor Selection */}
        <div className="space-y-2">
          <Label htmlFor="vendor_name">Vendor</Label>
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

        {/* Received Date */}
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

        {/* Remarks */}
        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="remarks">Remarks</Label>
          <Input
            id="remarks"
            name="remarks"
            value={formData.remarks}
            onChange={handleChange}
            placeholder="Any additional remarks"
          />
        </div>
      </div>

      {/* Items Section */}
      <div className="border-t pt-4 mt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-medium text-lg">Purchase Items</h3>
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

        {/* Item Form */}
        <div className="grid gap-4 md:grid-cols-6 p-4 bg-gray-50 rounded-md mb-4">
          <div className="md:col-span-2 space-y-2">
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
                <SelectItem value="Software">Software</SelectItem>
              </SelectContent>
            </Select>
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

          <div className="flex items-end justify-center pb-1">
            <Button 
              type="button" 
              variant="outline" 
              onClick={addItem}
              disabled={!formData.item_name || !formData.quantity || !formData.unit_cost}
            >
              <Plus className="h-5 w-5" />
            </Button>
          </div>
        </div>

        {/* Items List */}
        {items.length > 0 ? (
          <div className="space-y-2">
            <div className="border rounded-md">
              <div className="grid grid-cols-12 gap-4 p-4 bg-gray-100 font-medium">
                <div className="col-span-3">Item Name</div>
                <div className="col-span-2">Category</div>
                <div className="col-span-2">Vendor</div>
                <div className="col-span-1">Qty</div>
                <div className="col-span-2">Unit Price</div>
                <div className="col-span-2">Received Date</div>
              </div>
              {items.map((item, index) => (
                <div key={index} className="grid grid-cols-12 gap-4 p-4 border-t">
                  <div className="col-span-3">{item.item_name}</div>
                  <div className="col-span-2">{item.category_name}</div>
                  <div className="col-span-2">{item.vendor_name}</div>
                  <div className="col-span-1">{item.quantity}</div>
                  <div className="col-span-2">₹{item.unit_cost.toLocaleString()}</div>
                  <div className="col-span-2">
                    {item.received_date ? format(item.received_date, "PPP") : "Not received"}
                  </div>
                </div>
              ))}
            </div>

            {/* Total Section */}
            <div className="flex justify-end p-4 bg-gray-100 rounded-md">
              <div className="space-y-2 w-64">
                <div className="flex justify-between pt-2 border-t">
                  <span className="font-medium">Total:</span>
                  <span className="font-bold">₹{calculateTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-8 text-gray-500">
            No items added yet
          </div>
        )}
      </div>

      {/* Form Actions */}
      <div className="flex justify-end space-x-2 pt-4">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Submit Purchase Items
        </Button>
       </div>
    </form>
  );
};

export default PurchaseItemForm;