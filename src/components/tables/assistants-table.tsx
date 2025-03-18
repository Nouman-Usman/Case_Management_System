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
import { Pencil, Trash } from "lucide-react"

const dummyData = [
  { id: 1, email: "assistant1@example.com", status: "Active", lastLogin: "2024-01-20" },
  { id: 2, email: "assistant2@example.com", status: "Inactive", lastLogin: "2024-01-19" },
]

export function AssistantsDataTable() {
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
          {dummyData.map((assistant) => (
            <TableRow key={assistant.id}>
              <TableCell>{assistant.email}</TableCell>
              <TableCell>
                <span className={`px-2 py-1 rounded-full text-xs ${
                  assistant.status === "Active" ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                }`}>
                  {assistant.status}
                </span>
              </TableCell>
              <TableCell>{assistant.lastLogin}</TableCell>
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
