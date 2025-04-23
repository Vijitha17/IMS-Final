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
import StockList from "@/components/stock/StockList";
import AllocatedStockList from "@/components/stock/AllocatedStockList";
import ServiceStockList from "@/components/stock/ServiceStockList";
import AddStockForm from "@/components/stock/AddStockForm";
import ServiceStockForm from "@/components/stock/ServiceStockForm";

const StockManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [filterOpen, setFilterOpen] = useState(false);
  const [activeForm, setActiveForm] = useState(null); // 'add' or 'service'
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleAddStock = () => setActiveForm('add');
  const handleSendToService = () => setActiveForm('service');
  const handleCancel = () => setActiveForm(null);

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} />
        
        <main className={`flex-1 p-6 md:p-8 transition-all duration-300 ${sidebarOpen ? "md:ml-64" : "md:ml-20"}`}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <h1 className="text-2xl font-bold mb-4 md:mb-0">
              {activeForm === 'add' ? 'Add New Stock' : 
               activeForm === 'service' ? 'Send to Service' : 
               'Stock Management'}
            </h1>
            
            <div className="flex flex-col md:flex-row w-full md:w-auto space-y-2 md:space-y-0 md:space-x-2">
              {!activeForm && (
                <>
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
                </>
              )}
              
              {activeForm ? (
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              ) : (
                <>
                  <Button onClick={handleAddStock}>
                    <Plus className="h-4 w-4 mr-2" />
                    Add Stock
                  </Button>
                  <Button onClick={handleSendToService} variant="outline">
                    <Wrench className="h-4 w-4 mr-2" />
                    Send to Service
                  </Button>
                </>
              )}
            </div>
          </div>
          
          {activeForm === 'add' ? (
            <div className="bg-white rounded-lg shadow p-6">
              <AddStockForm onSuccess={handleCancel} />
            </div>
          ) : activeForm === 'service' ? (
            <div className="bg-white rounded-lg shadow p-6">
              <ServiceStockForm onSuccess={handleCancel} />
            </div>
          ) : (
            <>
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
                      <label className="text-sm font-medium">Condition</label>
                      <select className="w-full px-3 py-2 border rounded-md">
                        <option value="">All Conditions</option>
                        <option value="good">Good</option>
                        <option value="average">Average</option>
                        <option value="needs-repair">Needs Repair</option>
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
              
              <Tabs defaultValue="current" className="space-y-4">
                <TabsList>
                  <TabsTrigger value="current" className="flex items-center">
                    <Package className="h-4 w-4 mr-2" />
                    Current Stock
                  </TabsTrigger>
                  <TabsTrigger value="allocated" className="flex items-center">
                    <Share2 className="h-4 w-4 mr-2" />
                    Allocated Stock
                  </TabsTrigger>
                  <TabsTrigger value="inService" className="flex items-center">
                    <Wrench className="h-4 w-4 mr-2" />
                    Stock in Service
                  </TabsTrigger>
                </TabsList>
                
                <TabsContent value="current" className="space-y-4">
                  <StockList />
                </TabsContent>
                
                <TabsContent value="allocated" className="space-y-4">
                  <AllocatedStockList />
                </TabsContent>
                
                <TabsContent value="inService" className="space-y-4">
                  <ServiceStockList type="in-service" />
                </TabsContent>
              </Tabs>
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default StockManagement;