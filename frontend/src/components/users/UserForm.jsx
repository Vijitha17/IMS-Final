
import React, { useState } from "react";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const UserForm = ({ onCancel }) => {
  const [selectedRole, setSelectedRole] = useState("");
  const [showCollegeField, setShowCollegeField] = useState(false);
  const [showDepartmentField, setShowDepartmentField] = useState(false);
  const [selectedCollege, setSelectedCollege] = useState("");
  
  const handleRoleChange = (value) => {
    setSelectedRole(value);
    
    // Management roles don't need college or department
    if (value === "management_admin" || value === "management_people") {
      setShowCollegeField(false);
      setShowDepartmentField(false);
    } 
    // Principal needs only college
    else if (value === "principal") {
      setShowCollegeField(true);
      setShowDepartmentField(false);
    } 
    // HOD and department_admin need both college and department
    else {
      setShowCollegeField(true);
      setShowDepartmentField(true);
    }
  };

  // Sample college data
  const colleges = [
    { id: "engineering", name: "Engineering College" },
    { id: "arts", name: "Arts College" },
    { id: "science", name: "Science College" },
    { id: "commerce", name: "Commerce College" }
  ];

  // Department data by college
  const departmentsByCollege = {
    engineering: [
      { id: "cs", name: "Computer Science" },
      { id: "it", name: "Information Technology" },
      { id: "eee", name: "Electrical Engineering" },
      { id: "mech", name: "Mechanical Engineering" },
      { id: "civil", name: "Civil Engineering" }
    ],
    arts: [
      { id: "english", name: "English" },
      { id: "history", name: "History" },
      { id: "philosophy", name: "Philosophy" }
    ],
    science: [
      { id: "physics", name: "Physics" },
      { id: "chemistry", name: "Chemistry" },
      { id: "biology", name: "Biology" },
      { id: "mathematics", name: "Mathematics" }
    ],
    commerce: [
      { id: "accounting", name: "Accounting" },
      { id: "economics", name: "Economics" },
      { id: "business", name: "Business Administration" }
    ]
  };
  
  return (
    <form className="space-y-6">
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <label htmlFor="name" className="text-sm font-medium">
            Full Name
          </label>
          <input
            id="name"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter full name"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="email" className="text-sm font-medium">
            Email
          </label>
          <input
            id="email"
            type="email"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter email address"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium">
            Password
          </label>
          <input
            id="password"
            type="password"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter password"
          />
        </div>
        
        <div className="space-y-2">
          <label htmlFor="role" className="text-sm font-medium">
            Role
          </label>
          <Select onValueChange={handleRoleChange}>
            <SelectTrigger id="role">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="management_admin">Management Admin</SelectItem>
              <SelectItem value="management_people">Management Staff</SelectItem>
              <SelectItem value="principal">Principal</SelectItem>
              <SelectItem value="hod">Head of Department</SelectItem>
              <SelectItem value="department_admin">Department Admin</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        {showCollegeField && (
          <div className="space-y-2">
            <label htmlFor="college" className="text-sm font-medium">
              College
            </label>
            <Select onValueChange={setSelectedCollege}>
              <SelectTrigger id="college">
                <SelectValue placeholder="Select college" />
              </SelectTrigger>
              <SelectContent>
                {colleges.map(college => (
                  <SelectItem key={college.id} value={college.id}>{college.name}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
        
        {showDepartmentField && (
          <div className="space-y-2">
            <label htmlFor="department" className="text-sm font-medium">
              Department
            </label>
            <Select>
              <SelectTrigger id="department">
                <SelectValue placeholder="Select department" />
              </SelectTrigger>
              <SelectContent>
                {selectedCollege && departmentsByCollege[selectedCollege] ? 
                  departmentsByCollege[selectedCollege].map(dept => (
                    <SelectItem key={dept.id} value={dept.id}>{dept.name}</SelectItem>
                  )) : 
                  <SelectItem value="none">Select a college first</SelectItem>
                }
              </SelectContent>
            </Select>
          </div>
        )}

        <div className="space-y-2">
          <label htmlFor="phone" className="text-sm font-medium">
            Phone Number
          </label>
          <input
            id="phone"
            type="tel"
            className="w-full px-3 py-2 border rounded-md"
            placeholder="Enter phone number"
          />
        </div>

        <div className="space-y-2">
          <label htmlFor="status" className="text-sm font-medium">
            Status
          </label>
          <Select>
            <SelectTrigger id="status">
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save User</Button>
      </div>
    </form>
  );
};

export default UserForm;
