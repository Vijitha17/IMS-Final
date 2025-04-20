
import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Mail, Phone, MapPin } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell
} from "@/components/ui/table";

const VendorView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // In a real app, fetch this data from an API
  const vendor = {
    id: id || "VEN001",
    name: "TechServ Solutions",
    type: "service",
    contact: "John Smith",
    email: "john@techserv.com",
    phone: "123-456-7890",
    address: "123 Tech Street, City, State, ZIP",
    description: "Leading provider of IT services and solutions for educational institutions.",
    products: ["Computer Repair", "Network Setup", "IT Support", "Software Installation", "Data Recovery"],
    history: [
      {
        id: "SRV001",
        date: "2025-01-15",
        service: "Network Setup",
        department: "Computer Science",
        cost: 1200,
        status: "Completed"
      },
      {
        id: "SRV002",
        date: "2025-02-03",
        service: "Computer Repair",
        department: "Administrative Office",
        cost: 350,
        status: "Completed"
      },
      {
        id: "SRV003",
        date: "2025-03-10",
        service: "Software Installation",
        department: "Electrical Engineering",
        cost: 500,
        status: "In Progress"
      }
    ]
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} />
        
        <main className={`flex-1 p-6 md:p-8 transition-all duration-300 ${sidebarOpen ? "md:ml-64" : "md:ml-20"}`}>
          <div className="flex items-center mb-6">
            <Button variant="ghost" onClick={() => navigate("/vendor/service")} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Vendors
            </Button>
            <h1 className="text-2xl font-bold flex-1">Vendor Details</h1>
            
            <Button onClick={() => navigate(`/vendor/edit/${id}`)}>
              <Edit className="h-4 w-4 mr-2" />
              Edit Vendor
            </Button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">{vendor.name}</h2>
                    <p className="text-muted-foreground">ID: {vendor.id}</p>
                  </div>
                  <Badge className={vendor.type === "service" ? "bg-blue-100 text-blue-800" : "bg-green-100 text-green-800"}>
                    {vendor.type === "service" ? "Service Provider" : "Product Supplier"}
                  </Badge>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{vendor.description}</p>
                </div>
                
                <div className="space-y-3 pt-4 border-t">
                  <div className="flex items-center">
                    <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p>{vendor.email}</p>
                  </div>
                  <div className="flex items-center">
                    <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                    <p>{vendor.phone}</p>
                  </div>
                  <div className="flex items-start">
                    <MapPin className="h-4 w-4 mr-2 mt-1 text-muted-foreground" />
                    <p>{vendor.address}</p>
                  </div>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-2">Contact Person</h3>
                  <p>{vendor.contact}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Services / Products</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {vendor.products.map((product, index) => (
                    <li key={index} className="flex items-center p-2 rounded-md bg-muted/50">
                      <span>{product}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">Service / Purchase History</CardTitle>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="all">
                <TabsList className="mb-4">
                  <TabsTrigger value="all">All History</TabsTrigger>
                  <TabsTrigger value="completed">Completed</TabsTrigger>
                  <TabsTrigger value="in-progress">In Progress</TabsTrigger>
                </TabsList>
                
                <TabsContent value="all">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Service/Product</TableHead>
                          <TableHead>Department</TableHead>
                          <TableHead>Cost</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {vendor.history.map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.id}</TableCell>
                            <TableCell>{item.date}</TableCell>
                            <TableCell>{item.service}</TableCell>
                            <TableCell>{item.department}</TableCell>
                            <TableCell>${item.cost.toFixed(2)}</TableCell>
                            <TableCell>
                              <Badge className={item.status === "Completed" ? "bg-green-100 text-green-800" : "bg-blue-100 text-blue-800"}>
                                {item.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                
                <TabsContent value="completed">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Service/Product</TableHead>
                          <TableHead>Department</TableHead>
                          <TableHead>Cost</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {vendor.history.filter(item => item.status === "Completed").map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.id}</TableCell>
                            <TableCell>{item.date}</TableCell>
                            <TableCell>{item.service}</TableCell>
                            <TableCell>{item.department}</TableCell>
                            <TableCell>${item.cost.toFixed(2)}</TableCell>
                            <TableCell>
                              <Badge className="bg-green-100 text-green-800">
                                {item.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
                
                <TabsContent value="in-progress">
                  <div className="rounded-md border">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Date</TableHead>
                          <TableHead>Service/Product</TableHead>
                          <TableHead>Department</TableHead>
                          <TableHead>Cost</TableHead>
                          <TableHead>Status</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {vendor.history.filter(item => item.status === "In Progress").map((item) => (
                          <TableRow key={item.id}>
                            <TableCell className="font-medium">{item.id}</TableCell>
                            <TableCell>{item.date}</TableCell>
                            <TableCell>{item.service}</TableCell>
                            <TableCell>{item.department}</TableCell>
                            <TableCell>${item.cost.toFixed(2)}</TableCell>
                            <TableCell>
                              <Badge className="bg-blue-100 text-blue-800">
                                {item.status}
                              </Badge>
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </main>
      </div>
    </div>
  );
};

export default VendorView;
