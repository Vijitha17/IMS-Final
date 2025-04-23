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
  Trash,
  Eye,
  BookOpen
} from "lucide-react";

const DepartmentForm = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    name: "",
    code: "",
    college: "",
    hod: "",
    phone: "",
    email: "",
    establishedYear: "",
    description: ""
  });
  
  const colleges = [
    { id: "1", name: "Engineering College" },
    { id: "2", name: "Science College" },
    { id: "3", name: "Arts College" },
    { id: "4", name: "Commerce College" }
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
    console.log("Department data submitted:", formData);
    // Here you would typically save the data to a database
    onCancel(); // Close the form after saving
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">Department Name</label>
          <input
            id="name"
            name="name"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="code" className="text-sm font-medium">Department Code</label>
          <input
            id="code"
            name="code"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.code}
            onChange={handleChange}
            required
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="college" className="text-sm font-medium">College</label>
          <Select 
            onValueChange={(value) => handleSelectChange("college", value)}
            value={formData.college}
          >
            <SelectTrigger id="college">
              <SelectValue placeholder="Select College" />
            </SelectTrigger>
            <SelectContent>
              {colleges.map(college => (
                <SelectItem key={college.id} value={college.id}>{college.name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <label htmlFor="hod" className="text-sm font-medium">Head of Department</label>
          <input
            id="hod"
            name="hod"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.hod}
            onChange={handleChange}
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">Contact Number</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.phone}
            onChange={handleChange}
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
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="establishedYear" className="text-sm font-medium">Established Year</label>
          <input
            id="establishedYear"
            name="establishedYear"
            type="number"
            className="w-full px-3 py-2 border rounded-md"
            value={formData.establishedYear}
            onChange={handleChange}
          />
        </div>
      </div>
      
      <div className="space-y-2">
        <label htmlFor="description" className="text-sm font-medium">Description</label>
        <textarea
          id="description"
          name="description"
          rows="3"
          className="w-full px-3 py-2 border rounded-md"
          value={formData.description}
          onChange={handleChange}
        ></textarea>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save Department</Button>
      </div>
    </form>
  );
};

const DepartmentList = () => {
  const navigate = useNavigate();
  const [isCreatingDepartment, setIsCreatingDepartment] = useState(false);
  
  // Sample data
  const departments = [
    { id: 1, name: "Computer Science", college: "Engineering College", hod: "Prof. Sarah Johnson" },
    { id: 2, name: "Electrical Engineering", college: "Engineering College", hod: "Dr. Michael Lee" },
    { id: 3, name: "Mechanical Engineering", college: "Engineering College", hod: "Prof. David Miller" },
    { id: 4, name: "Physics", college: "Science College", hod: "Dr. Robert Brown" },
    { id: 5, name: "Chemistry", college: "Science College", hod: "Dr. Jennifer Williams" },
    { id: 6, name: "English Literature", college: "Arts College", hod: "Prof. Elizabeth Davis" }
  ];
  
  return (
    <div className="space-y-4">
      {!isCreatingDepartment ? (
        <>
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-lg font-medium">Department List</h2>
            <Button onClick={() => setIsCreatingDepartment(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add Department
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-[250px]">Department Name</TableHead>
                  <TableHead>College</TableHead>
                  <TableHead>Head of Department</TableHead>
                  <TableHead className="text-right">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {departments.map((department) => (
                  <TableRow key={department.id}>
                    <TableCell className="font-medium">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 mr-2 text-green-600" />
                        {department.name}
                      </div>
                    </TableCell>
                    <TableCell>{department.college}</TableCell>
                    <TableCell>{department.hod}</TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-4 w-4" />
                            <span className="sr-only">Open menu</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>
                            <Eye className="mr-2 h-4 w-4" />
                            <span>View Details</span>
                          </DropdownMenuItem>
                          <DropdownMenuItem>
                            <Edit className="mr-2 h-4 w-4" />
                            <span>Edit Department</span>
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem className="text-red-600">
                            <Trash className="mr-2 h-4 w-4" />
                            <span>Delete Department</span>
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
      ) : (
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex items-center mb-6">
            <h2 className="text-xl font-semibold">Add New Department</h2>
          </div>
          <DepartmentForm onCancel={() => setIsCreatingDepartment(false)} />
        </div>
      )}
    </div>
  );
};

export default DepartmentList;