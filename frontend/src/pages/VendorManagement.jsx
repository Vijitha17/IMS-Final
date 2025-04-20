
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, Plus, Filter, Building, Truck } from "lucide-react";
import VendorList from "@/components/vendors/VendorList";
import VendorForm from "@/components/vendors/VendorForm";

const VendorManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} />
        
        <main className={`flex-1 p-6 md:p-8 transition-all duration-300 ${sidebarOpen ? "md:ml-64" : "md:ml-20"}`}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <h1 className="text-2xl font-bold mb-4 md:mb-0">Vendor Management</h1>
            
            <div className="flex flex-col md:flex-row w-full md:w-auto space-y-2 md:space-y-0 md:space-x-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search vendors..." 
                  className="pl-8 pr-4 py-2 w-full rounded-md border border-input bg-background"
                />
              </div>
              
              {!isCreating && (
                <Button onClick={() => setIsCreating(true)}>
                  <Plus className="h-4 w-4 mr-2" />
                  Add Vendor
                </Button>
              )}
              
              {isCreating && (
                <Button variant="outline" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
              )}
            </div>
          </div>
          
          {isCreating ? (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Add New Vendor</h2>
              <VendorForm onCancel={() => setIsCreating(false)} />
            </div>
          ) : (
            <Tabs defaultValue="service" className="space-y-4">
              <TabsList>
                <TabsTrigger value="service" className="flex items-center">
                  <Truck className="h-4 w-4 mr-2" />
                  Service Vendors
                </TabsTrigger>
                <TabsTrigger value="product" className="flex items-center">
                  <Building className="h-4 w-4 mr-2" />
                  Product Vendors
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="service" className="space-y-4">
                <VendorList type="service" />
              </TabsContent>
              
              <TabsContent value="product" className="space-y-4">
                <VendorList type="product" />
              </TabsContent>
            </Tabs>
          )}
        </main>
      </div>
    </div>
  );
};

export default VendorManagement;
