import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Plus, 
  Filter, 
  Package, 
  Share2,
  Wrench
} from "lucide-react";
import RequestStatus from "@/components/movement/RequestStatus";
import IncomingRequests from "@/components/movement/IncomingRequests";
import HandoverManagement from "@/components/movement/HandoverManagement";
import ReturnsManagement from "@/components/movement/ReturnsManagement";
import MovementHistory from "@/components/movement/MovementHistory";
import RequestInventory from "@/components/movement/RequestInventory";

const StockMovement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [isCreatingRequest, setIsCreatingRequest] = useState(false);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} />
        
        <main className={`flex-1 p-6 md:p-8 transition-all duration-300 ${sidebarOpen ? "md:ml-64" : "md:ml-20"}`}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <h1 className="text-2xl font-bold mb-4 md:mb-0">Stock Movement</h1>
            
            <div className="flex flex-col md:flex-row w-full md:w-auto space-y-2 md:space-y-0 md:space-x-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search stock..." 
                  className="pl-8 pr-4 py-2 w-full rounded-md border border-input bg-background"
                />
              </div>
              
              <Button 
                variant="outline" 
                size="icon" 
                onClick={() => setFilterOpen(!filterOpen)}
              >
                <Filter className="h-4 w-4" />
              </Button>
              
              {!isCreatingRequest ? (
                <Button onClick={() => setIsCreatingRequest(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Request Stock
                </Button>
              ) : (
                <Button variant="outline" onClick={() => setIsCreatingRequest(false)}>
                  Cancel
                </Button>
              )}
            </div>
          </div>
          
          {filterOpen && (
            <div className="mb-6 bg-white p-4 rounded-lg shadow">
              <h3 className="font-medium mb-3">Filter Options</h3>
              <div className="grid gap-4 md:grid-cols-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium">Category</label>
                  <select className="w-full px-3 py-2 border rounded-md">
                    <option value="">All Categories</option>
                    <option value="electronics">Electronics</option>
                    <option value="furniture">Furniture</option>
                    <option value="stationery">Stationery</option>
                    <option value="equipment">Equipment</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <label className="text-sm font-medium">Location/Department</label>
                  <select className="w-full px-3 py-2 border rounded-md">
                    <option value="">All Locations</option>
                    <option value="cs">Computer Science</option>
                    <option value="it">Information Technology</option>
                    <option value="eee">Electrical Engineering</option>
                    <option value="admin">Administrative Office</option>
                  </select>
                </div>
                
                <div className="flex items-end">
                  <Button className="w-full">Apply Filters</Button>
                </div>
              </div>
            </div>
          )}
          
          {isCreatingRequest ? (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Create New Stock Request</h2>
              <RequestInventory onCancel={() => setIsCreatingRequest(false)} />
            </div>
          ) : (
            <Tabs defaultValue="request-status" className="space-y-4">
              <TabsList>
                <TabsTrigger value="request-status" className="flex items-center">
                  <Package className="h-4 w-4 mr-2" />
                  Request Status
                </TabsTrigger>
                <TabsTrigger value="incoming-requests" className="flex items-center">
                  <Share2 className="h-4 w-4 mr-2" />
                  Incoming Requests
                </TabsTrigger>
                <TabsTrigger value="handover" className="flex items-center">
                  <Wrench className="h-4 w-4 mr-2" />
                  Handover Management
                </TabsTrigger>
                <TabsTrigger value="returns" className="flex items-center">
                  <Wrench className="h-4 w-4 mr-2" />
                  Returns Management
                </TabsTrigger>
                <TabsTrigger value="history" className="flex items-center">
                  <Wrench className="h-4 w-4 mr-2" />
                  Movement History
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="request-status" className="space-y-4">
                <RequestStatus />
              </TabsContent>
              <TabsContent value="incoming-requests" className="space-y-4">
                <IncomingRequests />
              </TabsContent>
              <TabsContent value="handover" className="space-y-4">
                <HandoverManagement />
              </TabsContent>
              <TabsContent value="returns" className="space-y-4">
                <ReturnsManagement />
              </TabsContent>
              <TabsContent value="history" className="space-y-4">
                <MovementHistory />
              </TabsContent>
            </Tabs>
          )}
        </main>
      </div>
    </div>
  );
};

export default StockMovement;