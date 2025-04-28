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
import { Plus, MapPin, MoreHorizontal, Edit, Trash2, Eye, X, ArrowLeft, Filter, RefreshCw } from "lucide-react";
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
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "@/components/ui/use-toast";

const LocationForm = ({ location, isEditing, onCancel, onSave }) => {
  const [formData, setFormData] = useState(location || {
    location: "",
    location_name: "",
    college_name: "",
    department_name: "",
    description: ""
  });

  const colleges = [
    { college_id: 1, college_name: "Engineering College" },
    { college_id: 2, college_name: "Science College" },
    { college_id: 3, college_name: "Arts College" }
  ];
  
  const departments = [
    { department_id: 1, department_name: "Computer Science", college_name: "Engineering College" },
    { department_id: 2, department_name: "Electrical Engineering", college_name: "Engineering College" },
    { department_id: 3, department_name: "Physics", college_name: "Science College" },
    { department_id: 4, department_name: "Chemistry", college_name: "Science College" },
    { department_id: 5, department_name: "English Literature", college_name: "Arts College" }
  ];

  const filteredDepartments = departments.filter(
    dept => dept.college_name === formData.college_name
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (field, value) => {
    if (field === "department_name" && value === "none") {
      setFormData(prev => ({ ...prev, [field]: "" }));
    } else {
      setFormData(prev => {
        if (field === "college_name") {
          return { ...prev, college_name: value, department_name: "" };
        }
        return { ...prev, [field]: value };
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="location" className="text-sm font-medium">Location</label>
          <input
            id="location"
            name="location"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.location}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="location_name" className="text-sm font-medium">Location Name</label>
          <input
            id="location_name"
            name="location_name"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.location_name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="college_name" className="text-sm font-medium">College Name</label>
          <Select 
            onValueChange={(value) => handleSelectChange("college_name", value)}
            value={formData.college_name}
            required
          >
            <SelectTrigger id="college_name">
              <SelectValue placeholder="Select College" />
            </SelectTrigger>
            <SelectContent>
              {colleges.map(college => (
                <SelectItem key={college.college_id} value={college.college_name}>
                  {college.college_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="department_name" className="text-sm font-medium">Department Name (Optional)</label>
          <Select 
            onValueChange={(value) => handleSelectChange("department_name", value)}
            value={formData.department_name || "none"}
            disabled={!formData.college_name}
          >
            <SelectTrigger id="department_name">
              <SelectValue placeholder={formData.college_name ? "Select Department" : "First select a college"} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="none">None</SelectItem>
              {filteredDepartments.map(department => (
                <SelectItem key={department.department_id} value={department.department_name}>
                  {department.department_name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="md:col-span-2 space-y-2">
          <label htmlFor="description" className="text-sm font-medium">Description</label>
          <textarea
            id="description"
            name="description"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.description}
            onChange={handleChange}
            rows={3}
          />
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          {isEditing ? "Update Location" : "Save Location"}
        </Button>
      </div>
    </form>
  );
};

const ViewLocationDetails = ({ location, isOpen, onClose }) => {
  if (!location) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-2xl">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h2 className="text-xl font-semibold">Location Details</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
              <X className="h-5 w-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Location ID</p>
                <p className="mt-1">{location.location_id}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Location</p>
                <p className="mt-1">{location.location}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Location Name</p>
                <p className="mt-1">{location.location_name}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">College</p>
                <p className="mt-1">{location.college_name || "-"}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Department</p>
                <p className="mt-1">{location.department_name || "-"}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Created At</p>
                <p className="mt-1">{new Date(location.created_at).toLocaleString()}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm font-medium text-gray-500">Updated At</p>
                <p className="mt-1">{new Date(location.updated_at).toLocaleString()}</p>
              </div>
              <div>
                <p className="text-sm font-medium text-gray-500">Description</p>
                <p className="mt-1">{location.description || "-"}</p>
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

const LocationList = () => {
  const navigate = useNavigate();
  const [isCreating, setIsCreating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [locationToEdit, setLocationToEdit] = useState(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [locationToDelete, setLocationToDelete] = useState(null);
  
  // Filter state
  const [collegeFilter, setCollegeFilter] = useState("all");
  const [departmentFilter, setDepartmentFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Sample data
  const [locations, setLocations] = useState([
    { 
      location_id: 1,
      location: "LOC-101",
      location_name: "Main Library", 
      college_name: "Engineering College",
      department_name: "Computer Science",
      description: "Central library with computer science resources",
      created_at: "2023-08-15 10:30:45",
      updated_at: "2024-01-20 14:25:12"
    },
    { 
      location_id: 2,
      location: "LOC-102",
      location_name: "Physics Lab", 
      college_name: "Science College",
      department_name: "Physics",
      description: "Advanced physics laboratory",
      created_at: "2023-09-10 11:45:30",
      updated_at: "2024-02-05 09:15:40"
    },
    { 
      location_id: 3,
      location: "LOC-103",
      location_name: "Lecture Hall A", 
      college_name: "Arts College",
      department_name: null,
      description: "Main lecture hall for arts students",
      created_at: "2023-10-20 13:25:10",
      updated_at: "2024-01-15 16:35:22"
    }
  ]);

  // Get unique colleges and departments for filters
  const uniqueColleges = [...new Set(locations.map(location => location.college_name))];
  const uniqueDepartments = [...new Set(locations.filter(location => location.department_name).map(location => location.department_name))];

  // Filtered locations based on selected filters
  const filteredLocations = locations.filter(location => {
    const collegeMatch = collegeFilter === "all" || location.college_name === collegeFilter;
    const departmentMatch = departmentFilter === "all" || location.department_name === departmentFilter;
    return collegeMatch && departmentMatch;
  });

  const resetFilters = () => {
    setCollegeFilter("all");
    setDepartmentFilter("all");
  };

  // Location Actions
  const handleViewLocationDetails = (location) => {
    setSelectedLocation(location);
    setIsViewDialogOpen(true);
  };

  const handleEditLocation = (location) => {
    setLocationToEdit(location);
    setIsEditing(true);
  };

  const handleDeleteLocation = (location) => {
    setLocationToDelete(location);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteLocation = () => {
    setLocations(prev => prev.filter(l => l.location_id !== locationToDelete.location_id));
    toast({
      title: "Location Deleted",
      description: `${locationToDelete.location_name} has been removed.`,
    });
    setIsDeleteDialogOpen(false);
  };

  const handleSaveLocationEdit = (updatedLocation) => {
    setLocations(prev => prev.map(l => 
      l.location_id === updatedLocation.location_id ? updatedLocation : l
    ));
    toast({
      title: "Location Updated",
      description: "Location details have been updated.",
    });
    setIsEditing(false);
  };

  const handleAddLocation = (newLocation) => {
    setLocations(prev => [...prev, {
      ...newLocation,
      location_id: Math.max(...prev.map(l => l.location_id)) + 1,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }]);
    toast({
      title: "Location Added",
      description: `${newLocation.location_name} has been added.`,
    });
    setIsCreating(false);
  };

  return (
    <div>
      {isEditing ? (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-6">
            <Button variant="ghost" onClick={() => setIsEditing(false)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Locations
            </Button>
            <h1 className="text-2xl font-bold ml-2">Edit Location</h1>
          </div>
          <LocationForm 
            location={locationToEdit}
            isEditing={true}
            onCancel={() => setIsEditing(false)}
            onSave={handleSaveLocationEdit}
          />
        </div>
      ) : isCreating ? (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-6">
            <Button variant="ghost" onClick={() => setIsCreating(false)}>
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Locations
            </Button>
            <h1 className="text-2xl font-bold ml-2">Add New Location</h1>
          </div>
          <LocationForm 
            onCancel={() => setIsCreating(false)}
            onSave={handleAddLocation}
          />
        </div>
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Location List</h2>
            <div className="flex space-x-2">
              <Button 
                variant="outline" 
                onClick={() => setShowFilters(!showFilters)}
              >
                <Filter className="h-4 w-4 mr-2" />
                {showFilters ? "Hide Filters" : "Show Filters"}
              </Button>
              <Button onClick={() => setIsCreating(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Add Location
              </Button>
            </div>
          </div>
          
          {/* Filter section */}
          {showFilters && (
            <div className="mb-4 p-4 border rounded-lg">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="college-filter" className="text-sm font-medium mb-1 block">College</label>
                  <Select 
                    value={collegeFilter} 
                    onValueChange={setCollegeFilter}
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
                </div>
                <div>
                  <label htmlFor="department-filter" className="text-sm font-medium mb-1 block">Department</label>
                  <Select 
                    value={departmentFilter} 
                    onValueChange={setDepartmentFilter}
                  >
                    <SelectTrigger id="department-filter">
                      <SelectValue placeholder="Filter by department" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Departments</SelectItem>
                      {uniqueDepartments.map(department => (
                        <SelectItem key={department} value={department}>
                          {department}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex justify-end mt-2">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={resetFilters}
                >
                  <RefreshCw className="h-3 w-3 mr-1" />
                  Reset Filters
                </Button>
              </div>
            </div>
          )}
          
          <div className="bg-white rounded-lg shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Location ID</TableHead>
                  <TableHead>Location</TableHead>
                  <TableHead>Location Name</TableHead>
                  <TableHead>College</TableHead>
                  <TableHead>Department</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredLocations.map((location) => (
                  <TableRow key={location.location_id}>
                    <TableCell>{location.location_id}</TableCell>
                    <TableCell>{location.location}</TableCell>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <MapPin className="h-4 w-4 mr-2 text-red-600" />
                        {location.location_name}
                      </div>
                    </TableCell>
                    <TableCell>{location.college_name}</TableCell>
                    <TableCell>{location.department_name || "-"}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem onClick={() => handleViewLocationDetails(location)}>
                            <Eye className="mr-2 h-4 w-4" />
                            View Details
                          </DropdownMenuItem>
                          <DropdownMenuItem onClick={() => handleEditLocation(location)}>
                            <Edit className="mr-2 h-4 w-4" />
                            Edit
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem 
                            className="text-red-600"
                            onClick={() => handleDeleteLocation(location)}
                          >
                            <Trash2 className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
                {filteredLocations.length === 0 && (
                  <TableRow>
                    <TableCell colSpan={6} className="text-center py-6">
                      <div className="text-muted-foreground">
                        No locations found matching the selected filters
                      </div>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="mt-2"
                        onClick={resetFilters}
                      >
                        Reset Filters
                      </Button>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      )}

      {isViewDialogOpen && (
        <ViewLocationDetails 
          location={selectedLocation}
          isOpen={isViewDialogOpen}
          onClose={() => setIsViewDialogOpen(false)}
        />
      )}

      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This will permanently delete the location "{locationToDelete?.location_name}" 
              and remove its data from the system.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction 
              onClick={confirmDeleteLocation}
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

export default LocationList;