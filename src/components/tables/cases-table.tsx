"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye } from "lucide-react"

const dummyData = [
  { 
    id: 1, 
    caseNumber: "2024-CR-001",
    clientName: "John Doe",
    assignedLawyer: "Adv. Sarah Wilson",
    district: "Central District",
    status: "Active",
    lastUpdated: "2024-01-20" 
  },
  { 
    id: 2, 
    caseNumber: "2024-CR-002",
    clientName: "Jane Smith",
    assignedLawyer: "Adv. Michael Brown",
    district: "Eastern District",
    status: "Pending",
    lastUpdated: "2024-01-19" 
  },
]

export function CasesDataTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Case Number</TableHead>
            <TableHead>Client Name</TableHead>
            <TableHead>Assigned Lawyer</TableHead>
            <TableHead>District</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Updated</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dummyData.map((caseItem) => (
            <TableRow key={caseItem.id}>
              <TableCell className="font-medium">{caseItem.caseNumber}</TableCell>
              <TableCell>{caseItem.clientName}</TableCell>
              <TableCell>{caseItem.assignedLawyer}</TableCell>
              <TableCell>{caseItem.district}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  caseItem.status === "Active" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {caseItem.status}
                </span>
              </TableCell>
              <TableCell>{caseItem.lastUpdated}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Eye className="h-4 w-4" />
                  Preview
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
