import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { 
  ShoppingCart, 
  FileText, 
  CheckCircle, 
  History,
  Plus,
  Search,
  FileEdit
} from "lucide-react";
import PurchaseRequestList from "@/components/purchase/PurchaseRequestList";
import PurchaseList from "@/components/purchase/PurchaseList";
import PurchaseForm from "@/components/purchase/PurchaseForm";
import { useNavigate } from "react-router-dom";

const PurchaseManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [isCreatingRequest, setIsCreatingRequest] = useState(false);
  const navigate = useNavigate();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Updated handler to toggle state instead of navigating
  const handleCreatePurchaseRequest = () => {
    setIsCreatingRequest(true);
  };
  
  // Handler to cancel request creation
  const handleCancelRequest = () => {
    setIsCreatingRequest(false);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} />
        
        <main className={`flex-1 p-6 md:p-8 transition-all duration-300 ${sidebarOpen ? "md:ml-64" : "md:ml-20"}`}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <h1 className="text-2xl font-bold mb-4 md:mb-0">Purchase Management</h1>
            
            <div className="flex flex-col md:flex-row w-full md:w-auto space-y-2 md:space-y-0 md:space-x-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search purchases..." 
                  className="pl-8 pr-4 py-2 w-full rounded-md border border-input bg-background"
                />
              </div>
              
              {/* Only show "Create Purchase" when not creating anything */}
              {!isCreating && !isCreatingRequest && (
                <Button onClick={() => setIsCreating(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Create Purchase
                </Button>
              )}
              {/* Show Cancel button when creating a purchase */}
              {isCreating && (
                <Button variant="outline" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
              )}
              {/* Show Cancel button when creating a request */}
              {isCreatingRequest && (
                <Button variant="outline" onClick={handleCancelRequest}>
                  Cancel
                </Button>
              )}
            </div>
          </div>
          
          {/* Conditional rendering based on what we're creating */}
          {isCreating ? (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Create New Purchase</h2>
              <PurchaseForm onCancel={() => setIsCreating(false)} />
            </div>
          ) : isCreatingRequest ? (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Create Purchase Request</h2>
              <form className="space-y-6">
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <label htmlFor="department" className="text-sm font-medium">
                      Department
                    </label>
                    <Select>
                      <SelectTrigger id="department">
                        <SelectValue placeholder="Select department" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="cs">Computer Science</SelectItem>
                        <SelectItem value="physics">Physics</SelectItem>
                        <SelectItem value="chemistry">Chemistry</SelectItem>
                        <SelectItem value="admin">Administration</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="category" className="text-sm font-medium">
                      Category
                    </label>
                    <Select>
                      <SelectTrigger id="category">
                        <SelectValue placeholder="Select category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="equipment">Equipment</SelectItem>
                        <SelectItem value="supplies">Supplies</SelectItem>
                        <SelectItem value="furniture">Furniture</SelectItem>
                        <SelectItem value="services">Services</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="priority" className="text-sm font-medium">
                      Priority
                    </label>
                    <Select>
                      <SelectTrigger id="priority">
                        <SelectValue placeholder="Select priority" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="high">High</SelectItem>
                        <SelectItem value="medium">Medium</SelectItem>
                        <SelectItem value="low">Low</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="requestedBy" className="text-sm font-medium">
                      Requested By
                    </label>
                    <input
                      id="requestedBy"
                      type="text"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Your name"
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="items" className="text-sm font-medium">
                      Items Required
                    </label>
                    <textarea
                      id="items"
                      className="w-full px-3 py-2 border rounded-md"
                      rows={3}
                      placeholder="Enter items (one per line with quantity)"
                    />
                  </div>
                  
                  <div className="space-y-2 md:col-span-2">
                    <label htmlFor="justification" className="text-sm font-medium">
                      Justification
                    </label>
                    <textarea
                      id="justification"
                      className="w-full px-3 py-2 border rounded-md"
                      rows={3}
                      placeholder="Explain why these items are needed"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="estimatedCost" className="text-sm font-medium">
                      Estimated Cost
                    </label>
                    <input
                      id="estimatedCost"
                      type="number"
                      min="0"
                      step="0.01"
                      className="w-full px-3 py-2 border rounded-md"
                      placeholder="Enter estimated cost"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <label htmlFor="requiredBy" className="text-sm font-medium">
                      Required By (Date)
                    </label>
                    <input
                      id="requiredBy"
                      type="date"
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                </div>
                
                <div className="flex justify-end space-x-2">
                  <Button variant="outline" onClick={handleCancelRequest}>
                    Cancel
                  </Button>
                  <Button type="submit">Submit Request</Button>
                </div>
              </form>
            </div>
          ) : (
            <Tabs defaultValue="requests" className="space-y-4">
              <TabsList>
                <TabsTrigger value="requests" className="flex items-center">
                  <FileText className="h-4 w-4 mr-2" />
                  Purchase Requests
                </TabsTrigger>
                <TabsTrigger value="purchases" className="flex items-center">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  Purchases
                </TabsTrigger>
                <TabsTrigger value="approved" className="flex items-center">
                  <CheckCircle className="h-4 w-4 mr-2" />
                  Approved
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center">
                  <History className="h-4 w-4 mr-2" />
                  History
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="requests" className="space-y-4">
                <div className="flex justify-end mb-4">
                  <Button onClick={handleCreatePurchaseRequest}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Request
                  </Button>
                </div>
                <PurchaseRequestList />
              </TabsContent>
              
              <TabsContent value="purchases" className="space-y-4">
                <PurchaseList />
              </TabsContent>
              
              <TabsContent value="approved" className="space-y-4">
                <PurchaseList status="approved" />
              </TabsContent>
              
              <TabsContent value="history" className="space-y-4">
                <PurchaseList status="completed" />
              </TabsContent>
            </Tabs>
          )}
        </main>
      </div>
    </div>
  );
};

export default PurchaseManagement;