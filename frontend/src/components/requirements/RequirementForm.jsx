
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";
import { 
  User, 
  Users, 
  Microscope,
  Plus,
  Trash2
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const RequirementForm = ({ onCancel }) => {
  const { toast } = useToast();
  const [academicYear, setAcademicYear] = useState("2024-2025");
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [category, setCategory] = useState("students");
  
  // Student specific fields
  const [studentYear, setStudentYear] = useState("");
  const [studentCount, setStudentCount] = useState("");
  const [studentInfraReq, setStudentInfraReq] = useState("");
  const [studentElectronicsReq, setStudentElectronicsReq] = useState("");
  const [studentStationaryReq, setStudentStationaryReq] = useState("");
  
  // Faculty specific fields
  const [facultyCount, setFacultyCount] = useState("");
  const [facultyInfraReq, setFacultyInfraReq] = useState("");
  const [facultyElectronicsReq, setFacultyElectronicsReq] = useState("");
  const [facultyStationaryReq, setFacultyStationaryReq] = useState("");
  
  // Lab specific fields
  const [labName, setLabName] = useState("");
  const [labCapacity, setLabCapacity] = useState("");
  const [labInfraReq, setLabInfraReq] = useState("");
  const [labSystemReq, setLabSystemReq] = useState("");
  const [labElectronicsReq, setLabElectronicsReq] = useState("");
  const [labEquipmentReq, setLabEquipmentReq] = useState("");
  const [labStationaryReq, setLabStationaryReq] = useState("");
  
  // Sample data for dropdowns
  const colleges = [
    { value: "engineering", label: "Engineering College" },
    { value: "science", label: "Science College" },
    { value: "arts", label: "Arts College" },
    { value: "commerce", label: "Commerce College" },
  ];
  
  const departments = [
    { value: "computer_science", label: "Computer Science" },
    { value: "electrical", label: "Electrical Engineering" },
    { value: "mechanical", label: "Mechanical Engineering" },
    { value: "civil", label: "Civil Engineering" },
    { value: "physics", label: "Physics" },
    { value: "chemistry", label: "Chemistry" },
    { value: "mathematics", label: "Mathematics" },
  ];
  
  const academicYears = [
    { value: "2022-2023", label: "2022-2023" },
    { value: "2023-2024", label: "2023-2024" },
    { value: "2024-2025", label: "2024-2025" },
    { value: "2025-2026", label: "2025-2026" },
  ];
  
  const studentYears = [
    { value: "first_year", label: "First Year" },
    { value: "second_year", label: "Second Year" },
    { value: "third_year", label: "Third Year" },
    { value: "fourth_year", label: "Fourth Year" },
  ];
  
  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validate common fields
    if (!academicYear || !college || !department) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }
    
    // Validate category specific fields
    if (category === "students") {
      if (!studentYear || !studentCount) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required student fields",
          variant: "destructive",
        });
        return;
      }
    } else if (category === "faculty") {
      if (!facultyCount) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required faculty fields",
          variant: "destructive",
        });
        return;
      }
    } else if (category === "lab") {
      if (!labName || !labCapacity) {
        toast({
          title: "Missing Information",
          description: "Please fill in all required lab fields",
          variant: "destructive",
        });
        return;
      }
    }
    
    // Process the form data
    toast({
      title: "Requirement Created",
      description: "The requirement has been successfully created",
    });
    
    // Reset form and/or redirect
    onCancel();
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="academicYear">Academic Year</Label>
          <Select onValueChange={setAcademicYear} value={academicYear} required>
            <SelectTrigger id="academicYear">
              <SelectValue placeholder="Select Academic Year" />
            </SelectTrigger>
            <SelectContent>
              {academicYears.map(year => (
                <SelectItem key={year.value} value={year.value}>{year.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="college">College</Label>
          <Select onValueChange={setCollege} value={college} required>
            <SelectTrigger id="college">
              <SelectValue placeholder="Select College" />
            </SelectTrigger>
            <SelectContent>
              {colleges.map(college => (
                <SelectItem key={college.value} value={college.value}>{college.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Label htmlFor="department">Department</Label>
          <Select onValueChange={setDepartment} value={department} required>
            <SelectTrigger id="department">
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              {departments.map(dept => (
                <SelectItem key={dept.value} value={dept.value}>{dept.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
      
      <div className="space-y-4">
        <Label>Requirement Category</Label>
        <Tabs value={category} onValueChange={setCategory}>
          <TabsList className="grid grid-cols-3">
            <TabsTrigger value="students" className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              Students
            </TabsTrigger>
            <TabsTrigger value="faculty" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Faculty
            </TabsTrigger>
            <TabsTrigger value="lab" className="flex items-center gap-2">
              <Microscope className="h-4 w-4" />
              Labs
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="students" className="space-y-6 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="studentYear">Year of Students</Label>
                <Select onValueChange={setStudentYear} value={studentYear} required>
                  <SelectTrigger id="studentYear">
                    <SelectValue placeholder="Select Year" />
                  </SelectTrigger>
                  <SelectContent>
                    {studentYears.map(year => (
                      <SelectItem key={year.value} value={year.value}>{year.label}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="studentCount">Number of Students</Label>
                <Input
                  id="studentCount"
                  type="number"
                  placeholder="Enter student count"
                  value={studentCount}
                  onChange={(e) => setStudentCount(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="studentInfraReq">Infrastructure Requirements</Label>
              <Textarea
                id="studentInfraReq"
                placeholder="Describe infrastructure requirements (desks, chairs, boards, etc.)"
                value={studentInfraReq}
                onChange={(e) => setStudentInfraReq(e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="studentElectronicsReq">Electronics Requirements</Label>
              <Textarea
                id="studentElectronicsReq"
                placeholder="Describe electronics requirements (computers, projectors, etc.)"
                value={studentElectronicsReq}
                onChange={(e) => setStudentElectronicsReq(e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="studentStationaryReq">Stationary Requirements</Label>
              <Textarea
                id="studentStationaryReq"
                placeholder="Describe stationary requirements (notebooks, pens, etc.)"
                value={studentStationaryReq}
                onChange={(e) => setStudentStationaryReq(e.target.value)}
                rows={3}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="faculty" className="space-y-6 pt-4">
            <div className="space-y-2">
              <Label htmlFor="facultyCount">Number of Faculty</Label>
              <Input
                id="facultyCount"
                type="number"
                placeholder="Enter faculty count"
                value={facultyCount}
                onChange={(e) => setFacultyCount(e.target.value)}
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="facultyInfraReq">Infrastructure Requirements</Label>
              <Textarea
                id="facultyInfraReq"
                placeholder="Describe infrastructure requirements (cabins, chairs, etc.)"
                value={facultyInfraReq}
                onChange={(e) => setFacultyInfraReq(e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="facultyElectronicsReq">Electronics Requirements</Label>
              <Textarea
                id="facultyElectronicsReq"
                placeholder="Describe electronics requirements (laptops, projectors, etc.)"
                value={facultyElectronicsReq}
                onChange={(e) => setFacultyElectronicsReq(e.target.value)}
                rows={3}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="facultyStationaryReq">Stationary Requirements</Label>
              <Textarea
                id="facultyStationaryReq"
                placeholder="Describe stationary requirements (notebooks, pens, etc.)"
                value={facultyStationaryReq}
                onChange={(e) => setFacultyStationaryReq(e.target.value)}
                rows={3}
              />
            </div>
          </TabsContent>
          
          <TabsContent value="lab" className="space-y-6 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="labName">Lab Name</Label>
                <Input
                  id="labName"
                  placeholder="Enter lab name"
                  value={labName}
                  onChange={(e) => setLabName(e.target.value)}
                  required
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="labCapacity">Students Capacity</Label>
                <Input
                  id="labCapacity"
                  type="number"
                  placeholder="Enter capacity"
                  value={labCapacity}
                  onChange={(e) => setLabCapacity(e.target.value)}
                  required
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="labInfraReq">Infrastructure Requirements</Label>
              <Textarea
                id="labInfraReq"
                placeholder="Describe infrastructure requirements (tables, chairs, etc.)"
                value={labInfraReq}
                onChange={(e) => setLabInfraReq(e.target.value)}
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="labSystemReq">System Requirements</Label>
              <Textarea
                id="labSystemReq"
                placeholder="Describe system requirements (computers, specifications, etc.)"
                value={labSystemReq}
                onChange={(e) => setLabSystemReq(e.target.value)}
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="labElectronicsReq">Electronics Requirements</Label>
              <Textarea
                id="labElectronicsReq"
                placeholder="Describe electronics requirements (projectors, equipment, etc.)"
                value={labElectronicsReq}
                onChange={(e) => setLabElectronicsReq(e.target.value)}
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="labEquipmentReq">Equipment Requirements</Label>
              <Textarea
                id="labEquipmentReq"
                placeholder="Describe equipment requirements (lab apparatus, tools, etc.)"
                value={labEquipmentReq}
                onChange={(e) => setLabEquipmentReq(e.target.value)}
                rows={2}
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="labStationaryReq">Stationary Requirements</Label>
              <Textarea
                id="labStationaryReq"
                placeholder="Describe stationary requirements (manuals, papers, etc.)"
                value={labStationaryReq}
                onChange={(e) => setLabStationaryReq(e.target.value)}
                rows={2}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
      
      <div className="flex justify-end space-x-4">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">
          Submit Requirement
        </Button>
      </div>
    </form>
  );
};

export default RequirementForm;
