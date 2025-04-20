
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  DollarSign,
  Wrench
} from "lucide-react";
import PurchaseExpenditure from "@/components/expenditure/PurchaseExpenditure";
import ServiceExpenditure from "@/components/expenditure/ServiceExpenditure";

const ExpenditureManagement = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  
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
            <h1 className="text-2xl font-bold mb-4 md:mb-0">Expenditure Management</h1>
            
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search expenditures..." 
                className="pl-8 pr-4 py-2 w-full rounded-md border border-input bg-background"
              />
            </div>
          </div>
          
          <Tabs defaultValue="purchase" className="space-y-4">
            <TabsList>
              <TabsTrigger value="purchase" className="flex items-center">
                <DollarSign className="h-4 w-4 mr-2" />
                Purchase Expenditure
              </TabsTrigger>
              <TabsTrigger value="service" className="flex items-center">
                <Wrench className="h-4 w-4 mr-2" />
                Service Expenditure
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="purchase" className="space-y-4">
              <PurchaseExpenditure />
            </TabsContent>
            
            <TabsContent value="service" className="space-y-4">
              <ServiceExpenditure />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default ExpenditureManagement;
