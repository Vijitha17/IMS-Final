
export type UserRole = 
  | 'management_admin' 
  | 'management_people' 
  | 'principal' 
  | 'hod' 
  | 'department_admin';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  college?: string;
  department?: string;
}

export interface MenuItem {
  title: string;
  path?: string;
  icon?: string;
  submenu?: MenuItem[];
}

export interface MenuByRole {
  [key: string]: MenuItem[];
}

export interface RequestItem {
  id: string;
  requestedBy: string;
  department: string;
  college: string;
  items: {
    name: string;
    category: string;
    quantity: number;
  }[];
  status: 'pending' | 'approved' | 'rejected';
  date: string;
}

export interface StockItem {
  id: string;
  name: string;
  category: 'electronics' | 'furniture' | 'stationary' | 'equipment';
  quantity: number;
  supplier: string;
  condition: string;
  allocatedTo?: string;
  location?: string;
  purchaseDate?: string;
  warrantyEnd?: string;
}

export interface Vendor {
  id: string;
  name: string;
  type: 'service' | 'product';
  contact: string;
  email: string;
  address: string;
  products?: string[];
}

export interface College {
  id: string;
  name: string;
  address: string;
  principal: string;
}

export interface Department {
  id: string;
  name: string;
  collegeId: string;
  hod: string;
}
