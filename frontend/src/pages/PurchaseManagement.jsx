
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
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
  const navigate = useNavigate();
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const handleCreatePurchaseRequest = () => {
    navigate('/purchase/create-request');
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
              
              {!isCreating && (
                <>
                  <Button onClick={() => setIsCreating(true)}>
                    <Plus className="h-4 w-4 mr-2" />
                    Create Purchase
                  </Button>
                  
                  <Button onClick={handleCreatePurchaseRequest} variant="outline">
                    <FileEdit className="h-4 w-4 mr-2" />
                    Create Request
                  </Button>
                </>
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
              <h2 className="text-xl font-semibold mb-4">Create New Purchase</h2>
              <PurchaseForm onCancel={() => setIsCreating(false)} />
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
