
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const ServiceExpenditure = () => {
  const expenditures = [
    {
      id: "SEXP001",
      department: "IT Services",
      description: "Annual Maintenance Contract",
      amount: 15000,
      date: "2025-04-10",
      status: "active"
    },
    {
      id: "SEXP002",
      department: "Library",
      description: "Software Subscription",
      amount: 5000,
      date: "2025-04-12",
      status: "pending"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Description</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {expenditures.map((exp) => (
            <TableRow key={exp.id}>
              <TableCell className="font-medium">{exp.id}</TableCell>
              <TableCell>{exp.department}</TableCell>
              <TableCell>{exp.description}</TableCell>
              <TableCell>${exp.amount.toLocaleString()}</TableCell>
              <TableCell>{exp.date}</TableCell>
              <TableCell>
                <Badge variant={exp.status === "active" ? "success" : "warning"}>
                  {exp.status}
                </Badge>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ServiceExpenditure;
