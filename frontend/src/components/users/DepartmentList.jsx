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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { 
  Plus,
  MoreHorizontal, 
  Edit, 
  Trash2,
  Eye,
  BookOpen,
  X,
  RefreshCw
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";

const DepartmentForm = ({ department, isEditing, onCancel, onSave }) => {
  const [formData, setFormData] = useState(department || {
    department_name: "",
    college_name: ""
  });
  
  const colleges = [
    { college_name: "Engineering College" },
    { college_name: "Science College" },
    { college_name: "Arts College" },
    { college_name: "Commerce College" }
  ];
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSelectChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="department_name" className="text-sm font-medium">Department Name</label>
          <input
            id="department_name"
            name="department_name"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.department_name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="college_name" className="text-sm font-medium">College Name</label>
          <Select 
            onValueChange={(value) => handleSelectChange("college_name", value)}
            value={formData.college_name}
          >
            <SelectTrigger id="college_name">
              <SelectValue placeholder="Select College" />
            </SelectTrigger>
            <SelectContent>
              {colleges.map(college => (
                <SelectItem key={college.college_name} value={college.college_name}>
                  {college.college_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {isEditing ? "Update Department" : "Save Department"}
        </Button>
      </div>
    </form>
  );
};

const ViewDepartmentDetails = ({ department, isOpen, onClose }) => {
  if (!department) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold">Department Details</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Department ID</p>
                <p className="mt-1">{department.department_id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Department Name</p>
                <p className="mt-1">{department.department_name}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">College Name</p>
                <p className="mt-1">{department.college_name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Created At</p>
                <p className="mt-1">{new Date(department.created_at).toLocaleString()}</p>
              </div>
            </div>
            
            <div>
              <p className="text-sm font-medium text-gray-500">Updated At</p>
              <p className="mt-1">{new Date(department.updated_at).toLocaleString()}</p>
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

const DepartmentList = () => {
  const navigate = useNavigate();
  const [isCreatingDepartment, setIsCreatingDepartment] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [departmentToEdit, setDepartmentToEdit] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedDepartment, setSelectedDepartment] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [departmentToDelete, setDepartmentToDelete] = useState(null);
  const [collegeFilter, setCollegeFilter] = useState("all");
  
  // Sample data
  const [departments, setDepartments] = useState([
    { 
      department_id: 1, 
      department_name: "Computer Science", 
      college_name: "Engineering College",
      created_at: "2023-08-15 10:30:45",
      updated_at: "2024-01-20 14:25:12"
    },
    { 
      department_id: 2, 
      department_name: "Electrical Engineering", 
      college_name: "Engineering College",
      created_at: "2023-09-10 11:45:30",
      updated_at: "2024-02-05 09:15:40"
    },
    { 
      department_id: 3, 
      department_name: "Mechanical Engineering", 
      college_name: "Engineering College",
      created_at: "2023-10-20 13:25:10",
      updated_at: "2024-01-15 16:35:22"
    },
    { 
      department_id: 4, 
      department_name: "Physics", 
      college_name: "Science College",
      created_at: "2023-08-25 09:20:35",
      updated_at: "2023-12-12 11:40:15"
    },
    { 
      department_id: 5, 
      department_name: "Chemistry", 
      college_name: "Science College",
      created_at: "2023-09-05 14:50:20",
      updated_at: "2024-02-10 10:30:45"
    },
    { 
      department_id: 6, 
      department_name: "English Literature", 
      college_name: "Arts College",
      created_at: "2023-10-15 11:15:30",
      updated_at: "2024-03-01 13:25:05"
    }
  ]);

  // Get unique colleges for filter options
  const uniqueColleges = [...new Set(departments.map(dept => dept.college_name))];

  // Filter departments based on college selection
  const filteredDepartments = departments.filter(department => {
    return collegeFilter === "all" || department.college_name === collegeFilter;
  });

  // Reset college filter
  const resetFilter = () => {
    setCollegeFilter("all");
  };

  const handleViewDetails = (department) => {
    setSelectedDepartment(department);
    setIsViewDialogOpen(true);
  };

  const handleEdit = (department) => {
    setDepartmentToEdit(department);
    setIsEditing(true);
  };

  const handleDelete = (department) => {
    setDepartmentToDelete(department);
    setIsDeleteDialogOpen(true);
  };

  const confirmDelete = () => {
    setDepartments(prev => prev.filter(d => d.department_id !== departmentToDelete.department_id));
    toast({
      title: "Department Deleted",
      description: `${departmentToDelete.department_name} has been removed.`,
    });
    setIsDeleteDialogOpen(false);
  };

  const handleSaveEdit = (updatedDepartment) => {
    setDepartments(prev => prev.map(d => 
      d.department_id === updatedDepartment.department_id ? updatedDepartment : d
    ));
    toast({
      title: "Department Updated",
      description: "Department details have been updated.",
    });
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setDepartmentToEdit(null);
  };

  const handleAddDepartment = (newDepartment) => {
    setDepartments(prev => [...prev, {
      ...newDepartment,
      department_id: Math.max(...prev.map(d => d.department_id)) + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }]);
    toast({
      title: "Department Added",
      description: `${newDepartment.department_name} has been added.`,
    });
    setIsCreatingDepartment(false);
  };

  return (
    <div className="space-y-4">
      {isEditing ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Edit Department</h2>
          <DepartmentForm 
            department={departmentToEdit}
            isEditing={true}
            onCancel={handleCancelEdit}
            onSave={handleSaveEdit}
          />
        </div>
      ) : isCreatingDepartment ? (
        <div className="bg-white rounded-lg shadow p-6">
          <h2 className="text-xl font-semibold mb-4">Add New Department</h2>
          <DepartmentForm 
            onCancel={() => setIsCreatingDepartment(false)}
            onSave={handleAddDepartment}
          />
        </div>
      ) : (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Department List</h2>
            <div className="flex items-center space-x-4">
              <Select 
                value={collegeFilter} 
                onValueChange={setCollegeFilter}
                className="w-[200px]"
              >
                <SelectTrigger id="college-filter">
                  <SelectValue placeholder="Filter by college" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Colleges</SelectItem>
                  {uniqueColleges.map(college => (
                    <SelectItem key={college} value={college}>
                      {college}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              
              {collegeFilter !== "all" && (
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetFilter}
                  className="flex items-center"
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Reset
                </Button>
              )}
              
              <Button onClick={() => setIsCreatingDepartment(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Department
              </Button>
            </div>
          </div>
          
          <div className="bg-white rounded-lg shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Department ID</TableHead>
                  <TableHead>Department Name</TableHead>
                  <TableHead>College Name</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredDepartments.length > 0 ? (
                  filteredDepartments.map((department) => (
                    <TableRow key={department.department_id}>
                      <TableCell>{department.department_id}</TableCell>
                      <TableCell className="font-medium">
                        <div className="flex items-center">
                          <BookOpen className="h-4 w-4 mr-2 text-green-600" />
                          {department.department_name}
                        </div>
                      </TableCell>
                      <TableCell>{department.college_name}</TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon">
                              <MoreHorizontal className="h-4 w-4" />
                              <span className="sr-only">Open menu</span>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => handleViewDetails(department)}>
                              <Eye className="mr-2 h-4 w-4" />
                              View Details
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => handleEdit(department)}>
                              <Edit className="mr-2 h-4 w-4" />
                              Edit
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem 
                              className="text-red-600"
                              onClick={() => handleDelete(department)}
                            >
                              <Trash2 className="mr-2 h-4 w-4" />
                              Delete
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-6">
                      <div className="text-muted-foreground">
                        No departments found matching the selected college
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                        onClick={resetFilter}
                      >
                        Reset Filter
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </>
      )}

      {isViewDialogOpen && (
        <ViewDepartmentDetails 
          department={selectedDepartment}
          isOpen={isViewDialogOpen}
          onClose={() => setIsViewDialogOpen(false)}
        />
      )}

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the department "{departmentToDelete?.department_name}" 
              and remove its data from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDelete}
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

export default DepartmentList;