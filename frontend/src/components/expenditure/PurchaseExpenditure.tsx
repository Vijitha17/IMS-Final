
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const PurchaseExpenditure = () => {
  const expenditures = [
    {
      id: "EXP001",
      department: "Computer Science",
      description: "Lab Equipment Purchase",
      amount: 25000,
      date: "2025-04-15",
      status: "completed"
    },
    {
      id: "EXP002",
      department: "Physics",
      description: "Office Supplies",
      amount: 3500,
      date: "2025-04-16",
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
                <Badge variant={exp.status === "completed" ? "success" : "warning"}>
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

export default PurchaseExpenditure;
