
import React from "react";
import { Link } from "react-router-dom";
import { useIsMobile } from "@/hooks/use-mobile";
import { 
  Bell, 
  Menu, 
  X, 
  User,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = ({ toggleSidebar, sidebarOpen }) => {
  const isMobile = useIsMobile();
  
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between bg-white shadow-sm px-4 h-16">
      <div className="flex items-center">
        <Button 
          variant="ghost" 
          size="icon" 
          onClick={toggleSidebar}
          className="mr-2"
        >
          {sidebarOpen ? <X size={20} /> : <Menu size={20} />}
        </Button>
        <Link to="/dashboard" className="flex items-center">
          <span className="text-xl font-bold text-college-800">CollegeIMS</span>
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size="icon" className="relative">
              <Bell size={18} />
              <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-72">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="max-h-96 overflow-auto">
              <div className="py-2 px-3 hover:bg-slate-100 cursor-pointer">
                <p className="text-sm font-medium">New request from Computer Science</p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
              <div className="py-2 px-3 hover:bg-slate-100 cursor-pointer">
                <p className="text-sm font-medium">Purchase order approved</p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
              <div className="py-2 px-3 hover:bg-slate-100 cursor-pointer">
                <p className="text-sm font-medium">Stock allocation completed</p>
                <p className="text-xs text-muted-foreground">3 hours ago</p>
              </div>
            </div>
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="relative flex items-center gap-2">
              <div className="h-8 w-8 rounded-full bg-college-600 flex items-center justify-center text-white">
                <User size={16} />
              </div>
              {!isMobile && <span className="font-medium">Admin User</span>}
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <User className="mr-2 h-4 w-4" />
              <span>Profile</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <LogOut className="mr-2 h-4 w-4" />
              <span>Logout</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
};

export default Navbar;
