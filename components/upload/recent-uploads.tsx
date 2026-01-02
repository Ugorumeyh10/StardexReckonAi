"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { formatDateTime } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Eye, Download } from "lucide-react"

const recentUploads = [
  {
    id: "1",
    name: "POS_Settlement_Dec_2025.xlsx",
    type: "settlement",
    size: "2.4 MB",
    status: "processed",
    uploadedAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: "2",
    name: "Bank_Ledger_Nov_2025.csv",
    type: "bank",
    size: "5.1 MB",
    status: "mapped",
    uploadedAt: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: "3",
    name: "ATM_Transactions_Dec_2025.txt",
    type: "switch",
    size: "1.8 MB",
    status: "uploaded",
    uploadedAt: new Date(Date.now() - 8 * 60 * 60 * 1000),
  },
]

const statusColors = {
  uploaded: "secondary",
  mapped: "default",
  processed: "success",
  error: "destructive",
} as const

export function RecentUploads() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Recent Uploads</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>File Name</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Size</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Uploaded</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {recentUploads.map((upload) => (
              <TableRow key={upload.id}>
                <TableCell className="font-medium">{upload.name}</TableCell>
                <TableCell>
                  <Badge variant="outline">{upload.type}</Badge>
                </TableCell>
                <TableCell>{upload.size}</TableCell>
                <TableCell>
                  <Badge variant={statusColors[upload.status as keyof typeof statusColors]}>
                    {upload.status}
                  </Badge>
                </TableCell>
                <TableCell>{formatDateTime(upload.uploadedAt)}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <Eye className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  )
}

