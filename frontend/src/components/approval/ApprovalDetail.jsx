
import React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle, ArrowLeft } from "lucide-react";

const ApprovalDetail = ({ approval, onBack, onApprove, onReject }) => {
  if (!approval) return null;

  const renderDetailRow = (label, value) => (
    <div className="grid grid-cols-3 py-2 border-b">
      <div className="font-medium">{label}</div>
      <div className="col-span-2">{value}</div>
    </div>
  );

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center">
          <Button variant="ghost" size="icon" onClick={onBack} className="mr-2">
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <h2 className="text-xl font-semibold">Approval Details</h2>
        </div>
        <Badge 
          variant={approval.status === "approved" ? "success" : 
                 approval.status === "rejected" ? "destructive" : "warning"}
        >
          {approval.status.charAt(0).toUpperCase() + approval.status.slice(1)}
        </Badge>
      </div>

      <div className="space-y-4">
        <div className="border rounded-md p-4 bg-gray-50">
          {renderDetailRow("Approval ID", approval.id)}
          {renderDetailRow("Type", approval.type)}
          {renderDetailRow("Department", approval.department)}
          {renderDetailRow("Requested By", approval.requestedBy)}
          {renderDetailRow("Date", approval.date)}
          {renderDetailRow("Status", approval.status)}
          
          {approval.type === "Purchase" && (
            <>
              {renderDetailRow("Items", approval.items || "N/A")}
              {renderDetailRow("Total Amount", `$${approval.amount?.toLocaleString() || "N/A"}`)}
              {renderDetailRow("Vendor", approval.vendor || "N/A")}
            </>
          )}
          
          {approval.type === "Service" && (
            <>
              {renderDetailRow("Service Type", approval.serviceType || "N/A")}
              {renderDetailRow("Equipment", approval.equipment || "N/A")}
              {renderDetailRow("Service Provider", approval.serviceProvider || "N/A")}
              {renderDetailRow("Estimated Cost", `$${approval.estimatedCost?.toLocaleString() || "N/A"}`)}
            </>
          )}
          
          <div className="grid grid-cols-3 py-2">
            <div className="font-medium">Description</div>
            <div className="col-span-2 whitespace-pre-line">
              {approval.description || "No description provided."}
            </div>
          </div>
        </div>
        
        {approval.status === "pending" && (
          <div className="flex justify-end space-x-3 mt-6">
            <Button variant="outline" className="border-red-500 text-red-500 hover:bg-red-50" onClick={onReject}>
              <XCircle className="h-4 w-4 mr-2" />
              Reject
            </Button>
            <Button className="bg-green-600 hover:bg-green-700" onClick={onApprove}>
              <CheckCircle className="h-4 w-4 mr-2" />
              Approve
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApprovalDetail;
