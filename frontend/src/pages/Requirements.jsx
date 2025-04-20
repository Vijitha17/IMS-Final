
import React, { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Sidebar from "@/components/Sidebar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { 
  Search, 
  Plus, 
  Filter, 
  PlusCircle,
  User,
  Users,
  Microscope
} from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import RequirementForm from "@/components/requirements/RequirementForm";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const Requirements = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [college, setCollege] = useState("");
  const [department, setDepartment] = useState("");
  const [academicYear, setAcademicYear] = useState("2024-2025");
  const [selectedTab, setSelectedTab] = useState("students");
  
  // Sample data for the dashboard
  const stats = {
    students: 5200,
    staff: 320,
    classrooms: 125,
    labs: 42
  };
  
  // Sample data for the tables
  const studentData = [
    { department: "Computer Science", college: "Engineering", year: "First Year", count: 120, infraReq: "Desks, Chairs", electronicsReq: "Projectors, Speakers", stationaryReq: "Notebooks, Pens" },
    { department: "Electrical Engineering", college: "Engineering", year: "Second Year", count: 90, infraReq: "Lab Tables", electronicsReq: "Oscilloscopes", stationaryReq: "Graph Papers" },
    { department: "Physics", college: "Science", year: "Third Year", count: 65, infraReq: "Lab Benches", electronicsReq: "Computers", stationaryReq: "Lab Manuals" },
    { department: "Chemistry", college: "Science", year: "First Year", count: 85, infraReq: "Lab Tables", electronicsReq: "Digital Scales", stationaryReq: "Lab Coats" },
  ];
  
  const facultyData = [
    { department: "Computer Science", college: "Engineering", count: 18, infraReq: "Cabins, Chairs", electronicsReq: "Laptops, Projectors", stationaryReq: "Markers, Paper" },
    { department: "Electrical Engineering", college: "Engineering", count: 15, infraReq: "Faculty Room", electronicsReq: "Desktop Computers", stationaryReq: "Notebooks" },
    { department: "Physics", college: "Science", count: 12, infraReq: "Office Space", electronicsReq: "Laptops", stationaryReq: "Research Papers" },
    { department: "Chemistry", college: "Science", count: 14, infraReq: "Cabins", electronicsReq: "Printers", stationaryReq: "Pens, Markers" },
  ];
  
  const labData = [
    { department: "Computer Science", college: "Engineering", name: "Programming Lab", capacity: 60, infraReq: "Tables, Chairs", systemReq: "Core i5, 8GB RAM", electronicsReq: "Projector, Screens", equipmentReq: "Network Switches", stationaryReq: "Manuals" },
    { department: "Electrical Engineering", college: "Engineering", name: "Circuit Lab", capacity: 40, infraReq: "Workbenches", systemReq: "Simulation PCs", electronicsReq: "Oscilloscopes", equipmentReq: "Circuit Boards", stationaryReq: "Circuit Diagrams" },
    { department: "Physics", college: "Science", name: "Optics Lab", capacity: 30, infraReq: "Dark Room", systemReq: "Data Logging PCs", electronicsReq: "Laser Equipment", equipmentReq: "Optical Benches", stationaryReq: "Graph Papers" },
    { department: "Chemistry", college: "Science", name: "Organic Chemistry Lab", capacity: 35, infraReq: "Fume Hoods", systemReq: "Analysis Systems", electronicsReq: "Digital Scales", equipmentReq: "Glass Apparatus", stationaryReq: "Lab Notebooks" },
  ];
  
  // Sample colleges and departments for the filters
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
  
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };
  
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Navbar toggleSidebar={toggleSidebar} sidebarOpen={sidebarOpen} />
      
      <div className="flex flex-1">
        <Sidebar isOpen={sidebarOpen} />
        
        <main className={`flex-1 p-6 md:p-8 transition-all duration-300 ${sidebarOpen ? "md:ml-64" : "md:ml-20"}`}>
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
            <h1 className="text-2xl font-bold mb-4 md:mb-0">Requirements</h1>
            
            <div className="flex flex-col md:flex-row w-full md:w-auto space-y-2 md:space-y-0 md:space-x-2">
              <div className="relative w-full md:w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <input 
                  type="text" 
                  placeholder="Search requirements..." 
                  className="pl-8 pr-4 py-2 w-full rounded-md border border-input bg-background"
                />
              </div>
              
              {!isCreating && (
                <Button onClick={() => setIsCreating(true)}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Create Requirement
                </Button>
              )}
              
              {isCreating && (
                <Button variant="outline" onClick={() => setIsCreating(false)}>
                  Cancel
                </Button>
              )}
            </div>
          </div>
          
          {isCreating ? (
            <div className="bg-white rounded-lg shadow p-6">
              <h2 className="text-xl font-semibold mb-4">Create New Requirement</h2>
              <RequirementForm onCancel={() => setIsCreating(false)} />
            </div>
          ) : (
            <Tabs defaultValue="current" className="space-y-4">
              <TabsList>
                <TabsTrigger value="current">
                  Current Requirements
                </TabsTrigger>
                <TabsTrigger value="history">
                  Requirement History
                </TabsTrigger>
              </TabsList>
              
              <TabsContent value="current" className="space-y-6">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <h2 className="text-xl font-semibold">Academic Year: {academicYear}</h2>
                    
                    <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                      <Select onValueChange={setCollege} value={college}>
                        <SelectTrigger className="w-full md:w-44">
                          <SelectValue placeholder="Select College" />
                        </SelectTrigger>
                        <SelectContent>
                          {colleges.map(college => (
                            <SelectItem key={college.value} value={college.value}>
                              {college.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      <Select onValueChange={setDepartment} value={department}>
                        <SelectTrigger className="w-full md:w-44">
                          <SelectValue placeholder="Select Department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map(dept => (
                            <SelectItem key={dept.value} value={dept.value}>
                              {dept.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      <Button variant="outline" className="flex gap-2">
                        <Filter className="h-4 w-4" />
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Students</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stats.students}</div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Total Staff</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stats.staff}</div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Classrooms</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stats.classrooms}</div>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader className="pb-2">
                        <CardTitle className="text-sm font-medium">Labs</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="text-2xl font-bold">{stats.labs}</div>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <div className="mb-4">
                    <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                      <TabsList>
                        <TabsTrigger value="students" className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          Students
                        </TabsTrigger>
                        <TabsTrigger value="faculty" className="flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          Faculty
                        </TabsTrigger>
                        <TabsTrigger value="lab" className="flex items-center">
                          <Microscope className="h-4 w-4 mr-2" />
                          Labs
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  
                  {selectedTab === "students" && (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Department</TableHead>
                            <TableHead>College</TableHead>
                            <TableHead>Year of Students</TableHead>
                            <TableHead>Student Count</TableHead>
                            <TableHead>Infrastructure Requirements</TableHead>
                            <TableHead>Electronics Requirements</TableHead>
                            <TableHead>Stationary Requirements</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {studentData.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell>{row.department}</TableCell>
                              <TableCell>{row.college}</TableCell>
                              <TableCell>{row.year}</TableCell>
                              <TableCell>{row.count}</TableCell>
                              <TableCell>{row.infraReq}</TableCell>
                              <TableCell>{row.electronicsReq}</TableCell>
                              <TableCell>{row.stationaryReq}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                  
                  {selectedTab === "faculty" && (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Department</TableHead>
                            <TableHead>College</TableHead>
                            <TableHead>Faculty Count</TableHead>
                            <TableHead>Infrastructure Requirements</TableHead>
                            <TableHead>Electronics Requirements</TableHead>
                            <TableHead>Stationary Requirements</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {facultyData.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell>{row.department}</TableCell>
                              <TableCell>{row.college}</TableCell>
                              <TableCell>{row.count}</TableCell>
                              <TableCell>{row.infraReq}</TableCell>
                              <TableCell>{row.electronicsReq}</TableCell>
                              <TableCell>{row.stationaryReq}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                  
                  {selectedTab === "lab" && (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Department</TableHead>
                            <TableHead>College</TableHead>
                            <TableHead>Lab Name</TableHead>
                            <TableHead>Students Capacity</TableHead>
                            <TableHead>Infrastructure Requirements</TableHead>
                            <TableHead>System Requirements</TableHead>
                            <TableHead>Electronics Requirements</TableHead>
                            <TableHead>Equipment Requirements</TableHead>
                            <TableHead>Stationary Requirements</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {labData.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell>{row.department}</TableCell>
                              <TableCell>{row.college}</TableCell>
                              <TableCell>{row.name}</TableCell>
                              <TableCell>{row.capacity}</TableCell>
                              <TableCell>{row.infraReq}</TableCell>
                              <TableCell>{row.systemReq}</TableCell>
                              <TableCell>{row.electronicsReq}</TableCell>
                              <TableCell>{row.equipmentReq}</TableCell>
                              <TableCell>{row.stationaryReq}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                </div>
              </TabsContent>
              
              <TabsContent value="history" className="space-y-4">
                <div className="bg-white rounded-lg shadow p-6">
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
                    <h2 className="text-xl font-semibold">Requirement History</h2>
                    
                    <div className="flex flex-col md:flex-row gap-3 w-full md:w-auto">
                      <Select onValueChange={setAcademicYear} value={academicYear}>
                        <SelectTrigger className="w-full md:w-44">
                          <SelectValue placeholder="Select Academic Year" />
                        </SelectTrigger>
                        <SelectContent>
                          {academicYears.map(year => (
                            <SelectItem key={year.value} value={year.value}>
                              {year.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      <Select onValueChange={setCollege} value={college}>
                        <SelectTrigger className="w-full md:w-44">
                          <SelectValue placeholder="Select College" />
                        </SelectTrigger>
                        <SelectContent>
                          {colleges.map(college => (
                            <SelectItem key={college.value} value={college.value}>
                              {college.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      <Select onValueChange={setDepartment} value={department}>
                        <SelectTrigger className="w-full md:w-44">
                          <SelectValue placeholder="Select Department" />
                        </SelectTrigger>
                        <SelectContent>
                          {departments.map(dept => (
                            <SelectItem key={dept.value} value={dept.value}>
                              {dept.label}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      
                      <Button variant="outline" className="flex gap-2">
                        <Filter className="h-4 w-4" />
                        Apply Filters
                      </Button>
                    </div>
                  </div>
                  
                  <div className="mb-4">
                    <Tabs value={selectedTab} onValueChange={setSelectedTab}>
                      <TabsList>
                        <TabsTrigger value="students" className="flex items-center">
                          <Users className="h-4 w-4 mr-2" />
                          Students
                        </TabsTrigger>
                        <TabsTrigger value="faculty" className="flex items-center">
                          <User className="h-4 w-4 mr-2" />
                          Faculty
                        </TabsTrigger>
                        <TabsTrigger value="lab" className="flex items-center">
                          <Microscope className="h-4 w-4 mr-2" />
                          Labs
                        </TabsTrigger>
                      </TabsList>
                    </Tabs>
                  </div>
                  
                  {/* Tables for history data - similar structure to the current requirement tables */}
                  {selectedTab === "students" && (
                    <div className="rounded-md border">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Department</TableHead>
                            <TableHead>College</TableHead>
                            <TableHead>Year of Students</TableHead>
                            <TableHead>Student Count</TableHead>
                            <TableHead>Infrastructure Requirements</TableHead>
                            <TableHead>Electronics Requirements</TableHead>
                            <TableHead>Stationary Requirements</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {studentData.map((row, index) => (
                            <TableRow key={index}>
                              <TableCell>{row.department}</TableCell>
                              <TableCell>{row.college}</TableCell>
                              <TableCell>{row.year}</TableCell>
                              <TableCell>{row.count}</TableCell>
                              <TableCell>{row.infraReq}</TableCell>
                              <TableCell>{row.electronicsReq}</TableCell>
                              <TableCell>{row.stationaryReq}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                  
                  {/* Similar tables for faculty and lab history data */}
                  {/* The structure is nearly identical to the current requirement tables */}
                </div>
              </TabsContent>
            </Tabs>
          )}
        </main>
      </div>
    </div>
  );
};

export default Requirements;
