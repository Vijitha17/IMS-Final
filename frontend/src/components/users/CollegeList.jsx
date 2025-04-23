import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Plus, Building } from "lucide-react";

const CollegeForm = ({ onCancel }) => {
  const [formData, setFormData] = useState({ name: "", address: "", principal: "" });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("College data submitted:", formData);
    // Here you would typically save the data to a database
    // Then call onSave or similar function to update the UI
    onCancel(); // Close the form after saving
  };
  
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <label htmlFor="name" className="text-sm font-medium">College Name</label>
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
        <label htmlFor="principal" className="text-sm font-medium">Principal</label>
        <input
          id="principal"
          name="principal"
          type="text"
          className="w-full px-3 py-2 border rounded-md"
          value={formData.principal}
          onChange={handleChange}
        />
      </div>
      
      <div className="flex justify-end space-x-2">
        <Button variant="outline" type="button" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Save College</Button>
      </div>
    </form>
  );
};

const CollegeList = () => {
  const navigate = useNavigate();
  const [isCreatingCollege, setIsCreatingCollege] = useState(false);
  
  const colleges = [
    { id: 1, name: "Engineering College", address: "123 College Road", principal: "Dr. John Smith" }
  ];

  return (
    <div className="bg-white rounded-lg shadow p-6">
      {!isCreatingCollege ? (
        <>
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold">Colleges</h1>
            <Button onClick={() => setIsCreatingCollege(true)}>
              <Plus className="h-4 w-4 mr-2" />
              Add College
            </Button>
          </div>
          
          <div className="bg-white rounded-lg shadow">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>College Name</TableHead>
                  <TableHead>Address</TableHead>
                  <TableHead>Principal</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {colleges.map((college) => (
                  <TableRow key={college.id}>
                    <TableCell className="flex items-center">
                      <Building className="h-4 w-4 mr-2 text-blue-600" />
                      {college.name}
                    </TableCell>
                    <TableCell>{college.address}</TableCell>
                    <TableCell>{college.principal}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </>
      ) : (
        <div>
          <div className="flex items-center mb-6">
            <h2 className="text-xl font-semibold">Add New College</h2>
          </div>
          <CollegeForm onCancel={() => setIsCreatingCollege(false)} />
        </div>
      )}
    </div>
  );
};

export default CollegeList;