
import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Edit, Share2, Wrench } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const StockView = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  // In a real app, you'd fetch this from an API
  const stockItem = {
    id: id || "STK001",
    name: "Desktop Computer",
    category: "electronics",
    description: "High-performance desktop computer for office use with Intel Core i5 processor, 16GB RAM, and 512GB SSD.",
    quantity: 25,
    supplier: "TechSupplies Ltd.",
    condition: "good",
    purchaseDate: "2024-10-15",
    warrantyEnd: "2026-10-15",
    warrantyDetails: "2-year standard manufacturer warranty covering hardware defects and malfunctions.",
    purchasePrice: 799.99,
    location: "Computer Science Department",
    serialNumber: "TCS-PC-2024-001",
    manufacturer: "Dell Technologies",
    model: "OptiPlex 5090",
    maintenanceHistory: [
      { date: "2025-01-15", type: "Preventive Maintenance", description: "Cleaned dust, updated drivers, performed system optimization" },
      { date: "2025-03-20", type: "Repair", description: "Replaced faulty RAM module" }
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
            <Button variant="ghost" onClick={() => navigate("/stock")} className="mr-4">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Stock
            </Button>
            <h1 className="text-2xl font-bold flex-1">Stock Item Details</h1>
            
            <div className="flex space-x-2">
              <Button onClick={() => navigate(`/stock/edit/${id}`)}>
                <Edit className="h-4 w-4 mr-2" />
                Edit
              </Button>
              <Button variant="outline" onClick={() => navigate(`/stock/allocate/${id}`)}>
                <Share2 className="h-4 w-4 mr-2" />
                Allocate
              </Button>
              <Button variant="outline" onClick={() => navigate(`/stock/service/${id}`)}>
                <Wrench className="h-4 w-4 mr-2" />
                Service
              </Button>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="md:col-span-2">
              <CardHeader>
                <CardTitle className="text-xl">Basic Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex justify-between items-start">
                  <div>
                    <h2 className="text-2xl font-bold">{stockItem.name}</h2>
                    <p className="text-muted-foreground">ID: {stockItem.id}</p>
                  </div>
                  <Badge className={stockItem.category === "electronics" ? "bg-blue-100 text-blue-800" : "bg-purple-100 text-purple-800"}>
                    {stockItem.category.charAt(0).toUpperCase() + stockItem.category.slice(1)}
                  </Badge>
                </div>
                
                <div className="pt-4 border-t">
                  <h3 className="font-semibold mb-2">Description</h3>
                  <p className="text-muted-foreground">{stockItem.description}</p>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-4 border-t">
                  <div>
                    <h3 className="font-semibold mb-2">Quantity</h3>
                    <p>{stockItem.quantity} units</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Condition</h3>
                    <p className="capitalize">{stockItem.condition}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Location</h3>
                    <p>{stockItem.location}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Purchase Price</h3>
                    <p>${stockItem.purchasePrice.toFixed(2)}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Serial Number</h3>
                    <p>{stockItem.serialNumber}</p>
                  </div>
                  <div>
                    <h3 className="font-semibold mb-2">Supplier</h3>
                    <p>{stockItem.supplier}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">Warranty Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="font-semibold mb-1">Purchase Date</h3>
                  <p>{stockItem.purchaseDate}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Warranty Until</h3>
                  <p>{stockItem.warrantyEnd}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Warranty Details</h3>
                  <p className="text-sm text-muted-foreground">{stockItem.warrantyDetails}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Manufacturer</h3>
                  <p>{stockItem.manufacturer}</p>
                </div>
                <div>
                  <h3 className="font-semibold mb-1">Model</h3>
                  <p>{stockItem.model}</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="md:col-span-3">
              <CardHeader>
                <CardTitle className="text-xl">Maintenance History</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="rounded-md border">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b bg-muted/50">
                        <th className="p-2 text-left font-semibold">Date</th>
                        <th className="p-2 text-left font-semibold">Type</th>
                        <th className="p-2 text-left font-semibold">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {stockItem.maintenanceHistory.map((record, index) => (
                        <tr key={index} className="border-b">
                          <td className="p-2">{record.date}</td>
                          <td className="p-2">{record.type}</td>
                          <td className="p-2">{record.description}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
};

export default StockView;
