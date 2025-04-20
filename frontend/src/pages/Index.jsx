
import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Box, BookOpenCheck, BarChart3 } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-college-50 to-college-100">
      <header className="container mx-auto px-4 py-6 flex justify-between items-center">
        <div className="flex items-center">
          <span className="text-2xl font-bold text-college-800">CollegeIMS</span>
        </div>
        
        <Link to="/login">
          <Button variant="outline" className="text-college-700 border-college-300 hover:bg-college-100 hover:text-college-800">
            Login
          </Button>
        </Link>
      </header>
      
      <main className="flex-1 container mx-auto px-4 py-12 flex flex-col md:flex-row items-center justify-center gap-12">
        <div className="flex-1 max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold text-college-900 mb-6">
            Welcome to the College Inventory Management System
          </h1>
          
          <p className="text-lg text-college-700 mb-8">
            A comprehensive solution for managing your college's inventory, from requisition to allocation and reporting.
          </p>
          
          <Link to="/login">
            <Button size="lg" className="bg-college-700 hover:bg-college-800 text-white">
              Login
            </Button>
          </Link>
        </div>
        
        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-lg">
          <div className="bg-white p-6 rounded-lg shadow-md border border-college-200">
            <Box className="h-12 w-12 text-college-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-college-800">Inventory Management</h3>
            <p className="text-college-600">Track all college assets across departments with ease.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-college-200">
            <BookOpenCheck className="h-12 w-12 text-college-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-college-800">Request & Approval</h3>
            <p className="text-college-600">Streamlined workflows for requisition and approval.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-md border border-college-200 md:col-span-2">
            <BarChart3 className="h-12 w-12 text-college-600 mb-4" />
            <h3 className="text-xl font-semibold mb-2 text-college-800">Comprehensive Reporting</h3>
            <p className="text-college-600">Generate detailed reports for better decision making.</p>
          </div>
        </div>
      </main>
      
      <footer className="bg-college-800 text-white py-8">
        <div className="container mx-auto px-4 text-center">
          <p>© 2025 College Inventory Management System. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
