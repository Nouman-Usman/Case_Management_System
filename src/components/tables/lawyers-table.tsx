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
import { MoreHorizontal, Pencil, Trash } from "lucide-react"

const dummyData = [
  { id: 1, email: "lawyer1@example.com", status: "Active", lastLogin: "2024-01-20" },
  { id: 2, email: "lawyer2@example.com", status: "Inactive", lastLogin: "2024-01-19" },
]

export function LawyersDataTable() {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Email</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Last Login</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {dummyData.map((lawyer) => (
            <TableRow key={lawyer.id}>
              <TableCell>{lawyer.email}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  lawyer.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                }`}>
                  {lawyer.status}
                </span>
              </TableCell>
              <TableCell>{lawyer.lastLogin}</TableCell>
              <TableCell className="text-right">
                <div className="flex justify-end gap-2">
                  <Button variant="ghost" size="icon">
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button variant="ghost" size="icon">
                    <Trash className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
}
