import {
  LayoutDashboard,
  PackageOpen,
  Box,
  Truck,
  ShoppingCart,
  FileText,
  Users,
  DollarSign,
  History,
  ArrowDown,
  ArrowUp,
  List
} from "lucide-react";

export const menuByRole = {
  management_people: [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard
    },
    {
      title: "Requirement",
      path: "/requirement/current",
      icon: PackageOpen,
      submenu: [
        {
          title: "Current Requirement",
          path: "/requirement/current"
        },
        {
          title: "Requirement History",
          path: "/requirement/history"
        }
      ]
    },
    {
      title: "Stock Management",
      path: "/stock",
      icon: Box,
      submenu: [
        {
          title: "Current Stock",
          path: "/stock"
        },
        {
          title: "Allocated Stock",
          path: "/stock/allocated"
        },
        {
          title: "Stock in Service",
          path: "/stock/in-service"
        }
      ]
    },
    {
      title: "Vendor Management",
      path: "/vendor/service",
      icon: Truck,
      submenu: [
        {
          title: "Service Vendor",
          path: "/vendor/service"
        },
        {
          title: "Product Vendor",
          path: "/vendor/product"
        }
      ]
    },
    {
      title: "Purchase",
      path: "/purchase/approve",
      icon: ShoppingCart,
      submenu: [
        {
          title: "Approve Purchase",
          path: "/purchase/approve"
        },
        {
          title: "Approved Purchase",
          path: "/purchase/approved"
        },
        {
          title: "Purchased List",
          path: "/purchase/list"
        }
      ]
    },
    {
      title: "User Management",
      path: "/users/list",
      icon: Users,
      submenu: [
        {
          title: "User List",
          path: "/users/list"
        }
      ]
    },
    {
      title: "Expenditure",
      path: "/expenditure/purchase",
      icon: DollarSign,
      submenu: [
        {
          title: "Purchase Expenditure",
          path: "/expenditure/purchase"
        },
        {
          title: "Service Expenditure",
          path: "/expenditure/service"
        }
      ]
    },
    {
      title: "Reports",
      path: "/reports",
      icon: FileText
    }
  ],

  management_admin: [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard
    },
    {
      title: "Requirement",
      path: "/requirement/current",
      icon: PackageOpen
    },
    {
      title: "Stock Management",
      path: "/stock",
      icon: Box
    },
    {
      title: "Stock Movement",
      path: "/movement/request-status",
      icon: ArrowDown,
    },
    {
      title: "Vendor Management",
      path: "/vendor/service",
      icon: Truck
    },
    {
      title: "Purchase",
      path: "/purchase/create-request",
      icon: ShoppingCart
    },
    {
      title: "User Management",
      path: "/users/list",
      icon: Users
    },
    {
      title: "Expenditure",
      path: "/expenditure/add",
      icon: DollarSign
    },
    {
      title: "Request & Approval",
      path: "/request/history",
      icon: History
    },
    {
      title: "Reports",
      path: "/reports",
      icon: FileText
    }
  ],
  
  principal: [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard
    },
    {
      title: "Requirement",
      path: "/requirement/create",
      icon: PackageOpen
    },
    {
      title: "Stock Management",
      path: "/stock/allocated",
      icon: Box
    },
    {
      title: "Stock Movement",
      path: "/movement/request-status",
      icon: ArrowDown,
    },
    {
      title: "User Management",
      path: "/users/list",
      icon: Users
    },
    {
      title: "Request & Approval",
      path: "/request/create",
      icon: History
    },
    {
      title: "Reports",
      path: "/reports",
      icon: FileText
    }
  ],
  
  hod: [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard
    },
    {
      title: "Requirement",
      path: "/requirement/create",
      icon: PackageOpen
    },
    {
      title: "Stock Management",
      path: "/stock/allocated",
      icon: Box
    },
    {
      title: "Stock Movement",
      path: "/movement/request-status",
      icon: ArrowDown,
    },
    {
      title: "User Management",
      path: "/users/list",
      icon: Users
    },
    {
      title: "Request & Approval",
      path: "/request/create",
      icon: History
    },
    {
      title: "Reports",
      path: "/reports",
      icon: FileText
    }
  ],
  
  department_admin: [
    {
      title: "Dashboard",
      path: "/dashboard",
      icon: LayoutDashboard
    },
    {
      title: "Requirement",
      path: "/requirement/create",
      icon: PackageOpen
    },
    {
      title: "Stock Management",
      path: "/stock/allocated",
      icon: Box
    },
    {
      title: "Stock Movement",
      path: "/movement/request-status",
      icon: ArrowDown,
    },
    {
      title: "User Management",
      path: "/users/list",
      icon: Users
    },
    {
      title: "Request",
      path: "/request/create",
      icon: History
    },
    {
      title: "Reports",
      path: "/reports",
      icon: FileText
    }
  ]
};
