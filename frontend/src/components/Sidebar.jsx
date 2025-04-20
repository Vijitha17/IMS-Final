
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { menuByRole } from "@/data/menuData";
import { cn } from "@/lib/utils";

const Sidebar = ({ isOpen }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState("management_admin");
  
  useEffect(() => {
    const userRole = localStorage.getItem("userRole");
    if (userRole) {
      setRole(userRole);
    }
  }, []);
  
  const menuItems = menuByRole[role] || [];
  
  const isActive = (path) => {
    return location.pathname === path;
  };
  
  const handleMenuClick = (item) => {
    if (item.path) {
      navigate(item.path);
    }
  };
  
  const renderMenuItem = (item) => {
    return (
      <div key={item.title} className="py-1">
        <button
          onClick={() => handleMenuClick(item)}
          className={cn(
            "group flex w-full items-center rounded-md px-3 py-2 text-sm font-medium transition-colors",
            isActive(item.path)
              ? "bg-sidebar-primary text-sidebar-primary-foreground"
              : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
          )}
        >
          {item.icon && (
            <item.icon className={cn(
              "mr-3 h-5 w-5 flex-shrink-0",
              isOpen ? "" : "mx-auto"
            )} />
          )}
          {isOpen && (
            <span className="flex-1 truncate">{item.title}</span>
          )}
        </button>
      </div>
    );
  };
  
  return (
    <aside
      className={cn(
        "bg-sidebar fixed inset-y-0 left-0 z-20 flex w-64 flex-col border-r border-sidebar-border transition-transform duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-20"
      )}
    >
      <div className="flex h-16 items-center justify-center border-b border-sidebar-border">
        <h2 className={cn(
          "text-lg font-bold text-sidebar-foreground transition-all",
          isOpen ? "block" : "hidden md:block"
        )}>
          {isOpen ? "College IMS" : "IMS"}
        </h2>
      </div>
      
      <div className="flex-1 overflow-y-auto py-4">
        <nav className="px-2 space-y-1">
          {menuItems.map(renderMenuItem)}
        </nav>
      </div>
    </aside>
  );
};

export default Sidebar;
