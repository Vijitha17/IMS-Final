import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { 
  Table, 
  TableHeader, 
  TableBody, 
  TableRow, 
  TableHead, 
  TableCell 
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Building, MoreHorizontal, Edit, Trash2, Eye, X } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator
} from "@/components/ui/dropdown-menu";
import { 
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { toast } from "@/components/ui/use-toast";

const CollegeForm = ({ college, isEditing, onCancel, onSave }) => {
  const [formData, setFormData] = useState(college || {
    college_name: "",
    address: "",
    phone: "",
    email: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="college_name" className="text-sm font-medium">College Name</label>
          <input
            id="college_name"
            name="college_name"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.college_name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="address" className="text-sm font-medium">Address</label>
          <input
            id="address"
            name="address"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.address}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">Phone</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {isEditing ? "Update College" : "Save College"}
        </Button>
      </div>
    </form>
  );
};

const ViewCollegeDetails = ({ college, isOpen, onClose }) => {
  if (!college) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold">College Details</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">College ID</p>
                <p className="mt-1">{college.college_id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">College Name</p>
                <p className="mt-1">{college.college_name}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Address</p>
                <p className="mt-1">{college.address}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Contact</p>
                <p className="mt-1">{college.phone}</p>
                <p className="mt-1 text-sm text-gray-500">{college.email}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Created At</p>
                <p className="mt-1">{new Date(college.created_at).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Updated At</p>
                <p className="mt-1">{new Date(college.updated_at).toLocaleString()}</p>
              </div>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <Button onClick={onClose}>Close</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

const CollegeList = () => {
  const navigate = useNavigate();
  const [isCreatingCollege, setIsCreatingCollege] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [collegeToEdit, setCollegeToEdit] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [collegeToDelete, setCollegeToDelete] = useState(null);
  
  // Sample data
  const [colleges, setColleges] = useState([
    { 
      college_id: 1, 
      college_name: "Engineering College", 
      address: "123 Engineering St",
      phone: "555-123-4567",
      email: "engineering@college.edu",
      created_at: "2023-08-15 10:30:45", 
      updated_at: "2024-01-20 14:25:12" 
    },
    { 
      college_id: 2, 
      college_name: "Science College", 
      address: "456 Science Ave",
      phone: "555-234-5678",
      email: "science@college.edu",
      created_at: "2023-09-10 11:45:30", 
      updated_at: "2024-02-05 09:15:40" 
    },
    { 
      college_id: 3, 
      college_name: "Arts College", 
      address: "789 Arts Blvd",
      phone: "555-345-6789",
      email: "arts@college.edu",
      created_at: "2023-10-20 13:25:10", 
      updated_at: "2024-01-15 16:35:22" 
    }
  ]);

  // College Actions
  const handleViewCollegeDetails = (college) => {
    setSelectedCollege(college);
    setIsViewDialogOpen(true);
  };

  const handleEditCollege = (college) => {
    setCollegeToEdit(college);
    setIsEditing(true);
  };

  const handleDeleteCollege = (college) => {
    setCollegeToDelete(college);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteCollege = () => {
    setColleges(prev => prev.filter(c => c.college_id !== collegeToDelete.college_id));
    toast({
      title: "College Deleted",
      description: `${collegeToDelete.college_name} has been removed.`,
    });
    setIsDeleteDialogOpen(false);
  };

  const handleSaveCollegeEdit = (updatedCollege) => {
    setColleges(prev => prev.map(c => 
      c.college_id === updatedCollege.college_id ? updatedCollege : c
    ));
    toast({
      title: "College Updated",
      description: "College details have been updated.",
    });
    setIsEditing(false);
  };

  const handleAddCollege = (newCollege) => {
    setColleges(prev => [...prev, {
      ...newCollege,
      college_id: Math.max(...prev.map(c => c.college_id)) + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }]);
    toast({
      title: "College Added",
      description: `${newCollege.college_name} has been added.`,
    });
    setIsCreatingCollege(false);
  };

  return (
    <div className="space-y-4">
      {isEditing ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Edit College</h2>
          <CollegeForm 
            college={collegeToEdit}
            isEditing={true}
            onCancel={() => setIsEditing(false)}
            onSave={handleSaveCollegeEdit}
          />
        </div>
      ) : isCreatingCollege ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Add New College</h2>
          <CollegeForm 
            onCancel={() => setIsCreatingCollege(false)}
            onSave={handleAddCollege}
          />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">College List</h2>
            <Button onClick={() => setIsCreatingCollege(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add College
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>College ID</TableHead>
                  <TableHead>College Name</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {colleges.map((college) => (
                  <TableRow key={college.college_id}>
                    <TableCell>{college.college_id}</TableCell>
                    <TableCell className="flex items-center">
                      <Building className="h-4 w-4 mr-2 text-blue-600" />
                      {college.college_name}
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewCollegeDetails(college)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditCollege(college)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeleteCollege(college)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      )}

      {isViewDialogOpen && (
        <ViewCollegeDetails 
          college={selectedCollege}
          isOpen={isViewDialogOpen}
          onClose={() => setIsViewDialogOpen(false)}
        />
      )}

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the college "{collegeToDelete?.college_name}" 
              and all its associated departments.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteCollege}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default CollegeList;