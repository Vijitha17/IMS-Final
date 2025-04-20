
import React, { useState } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  ClipboardList,
  History,
  Plus,
  CheckCircle,
  XCircle,
  Eye
} from "lucide-react";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import ApprovalDetail from "@/components/approval/ApprovalDetail";
import ApprovalForm from "@/components/approval/ApprovalForm";

const RequestApproval = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCreatingRequest, setIsCreatingRequest] = useState(false);
  const [selectedApproval, setSelectedApproval] = useState(null);
  const [requests, setRequests] = useState([
    {
      id: "REQ001",
      type: "Purchase",
      department: "Computer Science",
      description: "New Computers for the lab to replace the old equipment. Urgent need for the next semester.",
      requestedBy: "John Doe",
      date: "2025-04-15",
      status: "pending",
      items: "10 x Desktop Computers",
      amount: 15000,
      vendor: "TechSupplies Ltd."
    },
    {
      id: "REQ002",
      type: "Service",
      department: "Physics",
      description: "Equipment Maintenance",
      requestedBy: "Jane Smith",
      date: "2025-04-16",
      status: "pending",
      items: "5 x Lab Equipment Service",
      amount: 3500,
      vendor: "Lab Services Co."
    },
    {
      id: "REQ003",
      type: "Purchase",
      department: "Chemistry",
      description: "Lab Supplies",
      requestedBy: "Alex Brown",
      date: "2025-04-18",
      status: "pending",
      items: "Various chemicals and equipment",
      amount: 7800,
      vendor: "Science Supplies Inc."
    }
  ]);
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  const handleApprove = (requestId) => {
    // In a real app, you would update API
    setRequests(requests.map(req => 
      req.id === requestId ? {...req, status: "approved"} : req
    ));
    
    if (selectedApproval && selectedApproval.id === requestId) {
      setSelectedApproval({...selectedApproval, status: "approved"});
    }
  };
  
  const handleReject = (requestId) => {
    // In a real app, you would update API
    setRequests(requests.map(req => 
      req.id === requestId ? {...req, status: "rejected"} : req
    ));
    
    if (selectedApproval && selectedApproval.id === requestId) {
      setSelectedApproval({...selectedApproval, status: "rejected"});
    }
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} />
        
        <main className={`flex-1 p-6 md:p-8 transition-all duration-300 ${sidebarOpen ? "md:ml-64" : "md:ml-20"}`}>
          {selectedApproval ? (
            <ApprovalDetail 
              approval={selectedApproval} 
              onBack={() => setSelectedApproval(null)}
              onApprove={() => handleApprove(selectedApproval.id)}
              onReject={() => handleReject(selectedApproval.id)}
            />
          ) : (
            <>
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
                <h1 className="text-2xl font-bold mb-4 md:mb-0">Requests & Approvals</h1>
                
                <div className="flex flex-col md:flex-row w-full md:w-auto space-y-2 md:space-y-0 md:space-x-2">
                  {!isCreatingRequest && (
                    <>
                      <div className="relative w-full md:w-64">
                        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                        <input 
                          type="text" 
                          placeholder="Search requests..." 
                          className="pl-8 pr-4 py-2 w-full rounded-md border border-input bg-background"
                        />
                      </div>
                      
                      <Button onClick={() => setIsCreatingRequest(true)}>
                        <Plus className="h-4 w-4 mr-2" />
                        New Request
                      </Button>
                    </>
                  )}
                  
                  {isCreatingRequest && (
                    <Button variant="outline" onClick={() => setIsCreatingRequest(false)}>
                      Cancel
                    </Button>
                  )}
                </div>
              </div>
              
              {isCreatingRequest ? (
                <ApprovalForm onCancel={() => setIsCreatingRequest(false)} />
              ) : (
                <Tabs defaultValue="approvals" className="space-y-4">
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
                    <div className="bg-white rounded-lg shadow">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Requested By</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {requests.filter(req => req.status === "pending").map((req) => (
                            <TableRow key={req.id}>
                              <TableCell className="font-medium">{req.id}</TableCell>
                              <TableCell>{req.type}</TableCell>
                              <TableCell>{req.department}</TableCell>
                              <TableCell>{req.description}</TableCell>
                              <TableCell>{req.requestedBy}</TableCell>
                              <TableCell>{req.date}</TableCell>
                              <TableCell>
                                <Badge variant={req.status === "approved" ? "success" : "warning"}>
                                  {req.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="space-x-2">
                                <Button variant="ghost" size="icon" onClick={() => setSelectedApproval(req)}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-green-500" onClick={() => handleApprove(req.id)}>
                                  <CheckCircle className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="icon" className="text-red-500" onClick={() => handleReject(req.id)}>
                                  <XCircle className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                  
                  <TabsContent value="approvals" className="space-y-4">
                    <div className="bg-white rounded-lg shadow">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>ID</TableHead>
                            <TableHead>Type</TableHead>
                            <TableHead>Department</TableHead>
                            <TableHead>Description</TableHead>
                            <TableHead>Submitted By</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Actions</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {requests.filter(req => req.status !== "pending").map((req) => (
                            <TableRow key={req.id}>
                              <TableCell className="font-medium">{req.id}</TableCell>
                              <TableCell>{req.type}</TableCell>
                              <TableCell>{req.department}</TableCell>
                              <TableCell>{req.description}</TableCell>
                              <TableCell>{req.requestedBy}</TableCell>
                              <TableCell>{req.date}</TableCell>
                              <TableCell>
                                <Badge variant={req.status === "approved" ? "success" : "destructive"}>
                                  {req.status}
                                </Badge>
                              </TableCell>
                              <TableCell className="space-x-2">
                                <Button variant="ghost" size="icon" onClick={() => setSelectedApproval(req)}>
                                  <Eye className="h-4 w-4" />
                                </Button>
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </TabsContent>
                </Tabs>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};

export default RequestApproval;
