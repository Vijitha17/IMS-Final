import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Search, Plus, Building, Truck, RefreshCw, X } from "lucide-react";
import VendorList from "@/components/vendors/VendorList";
import VendorForm from "@/components/vendors/VendorForm";
import { toast } from "@/components/ui/use-toast";

const VendorManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [vendors, setVendors] = useState([
    { 
      vendor_id: "VEN001", 
      vendor_name: "TechServ Solutions", 
      vendor_type: "Service",
      phone: "123-456-7890",
      email: "info@techserv.com",
      contact_name: "John Smith",
      contact_phone: "123-456-7891",
      contact_email: "john@techserv.com",
      address: "123 Tech Street, City, State, ZIP",
      description: "IT services provider",
      created_at: "2023-01-15T10:30:00Z",
      updated_at: "2023-01-15T10:30:00Z"
    },
    { 
      vendor_id: "VEN002", 
      vendor_name: "Office Supplies Co", 
      vendor_type: "Product",
      phone: "987-654-3210",
      email: "info@officesupplies.com",
      contact_name: "Sarah Johnson",
      contact_phone: "987-654-3211",
      contact_email: "sarah@officesupplies.com",
      address: "456 Supply Road, Town, State, ZIP",
      description: "Office supplies distributor",
      created_at: "2023-02-20T14:45:00Z",
      updated_at: "2023-02-20T14:45:00Z"
    }
  ]);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const filteredVendors = (type) => {
    return vendors
      .filter(vendor => vendor.vendor_type === type)
      .filter(vendor => 
        vendor.vendor_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.vendor_id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vendor.phone.includes(searchTerm) ||
        vendor.email.toLowerCase().includes(searchTerm.toLowerCase())
      );
  };

  const handleAddVendor = (newVendor) => {
    const vendorId = `VEN${String(vendors.length + 1).padStart(3, '0')}`;
    const now = new Date().toISOString();
    
    setVendors(prev => [...prev, {
      ...newVendor,
      vendor_id: vendorId,
      created_at: now,
      updated_at: now
    }]);
    
    toast({
      title: "Vendor Added",
      description: `${newVendor.vendor_name} has been added successfully.`,
    });
    setIsCreating(false);
  };

  const handleUpdateVendor = (updatedVendor) => {
    setVendors(prev => prev.map(v => 
      v.vendor_id === updatedVendor.vendor_id ? {
        ...updatedVendor,
        updated_at: new Date().toISOString()
      } : v
    ));
    
    toast({
      title: "Vendor Updated",
      description: `${updatedVendor.vendor_name} has been updated successfully.`,
    });
  };

  const handleDeleteVendor = (vendorId) => {
    setVendors(prev => prev.filter(v => v.vendor_id !== vendorId));
    toast({
      title: "Vendor Deleted",
      description: "Vendor has been removed successfully.",
    });
  };

  const resetFilters = () => {
    setSearchTerm("");
  };

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
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
                {searchTerm && (
                  <Button 
                    variant="ghost" 
                    size="icon" 
                    className="absolute right-2.5 top-2.5 h-4 w-4"
                    onClick={() => setSearchTerm("")}
                  >
                    <X className="h-3 w-3" />
                  </Button>
                )}
              </div>
              
              {searchTerm && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetFilters}
                  className="flex items-center"
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Reset
                </Button>
              )}
              
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
              <VendorForm 
                onCancel={() => setIsCreating(false)}
                onSave={handleAddVendor}
              />
            </div>
          ) : (
            <Tabs defaultValue="Service" className="space-y-4">
              <TabsList>
                <TabsTrigger value="Service" className="flex items-center">
                  <Truck className="h-4 w-4 mr-2" />
                  Service Vendors
                </TabsTrigger>
                <TabsTrigger value="Product" className="flex items-center">
                  <Building className="h-4 w-4 mr-2" />
                  Product Vendors
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="Service" className="space-y-4">
                <VendorList 
                  vendors={filteredVendors("Service")} 
                  onDelete={handleDeleteVendor}
                />
              </TabsContent>
              
              <TabsContent value="Product" className="space-y-4">
                <VendorList 
                  vendors={filteredVendors("Product")} 
                  onDelete={handleDeleteVendor}
                />
              </TabsContent>
            </Tabs>
          )}
        </main>
      </div>
    </div>
  );
};

export default VendorManagement;