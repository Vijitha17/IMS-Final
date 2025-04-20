
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  ClipboardList,
  History 
} from "lucide-react";
import RequestList from "@/components/requests/RequestList";
import ApprovalList from "@/components/requests/ApprovalList";

const RequestApproval = () => {
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
            <h1 className="text-2xl font-bold mb-4 md:mb-0">Requests & Approvals</h1>
            
            <div className="relative w-full md:w-64">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <input 
                type="text" 
                placeholder="Search requests..." 
                className="pl-8 pr-4 py-2 w-full rounded-md border border-input bg-background"
              />
            </div>
          </div>
          
          <Tabs defaultValue="requests" className="space-y-4">
            <TabsList>
              <TabsTrigger value="requests" className="flex items-center">
                <ClipboardList className="h-4 w-4 mr-2" />
                Requests
              </TabsTrigger>
              <TabsTrigger value="approvals" className="flex items-center">
                <History className="h-4 w-4 mr-2" />
                Approvals
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="requests" className="space-y-4">
              <RequestList />
            </TabsContent>
            
            <TabsContent value="approvals" className="space-y-4">
              <ApprovalList />
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
};

export default RequestApproval;
