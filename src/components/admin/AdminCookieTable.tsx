import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Cookie } from "@/data/mock-cookies";
import { Pencil, Trash2 } from "lucide-react";

interface AdminCookieTableProps {
  cookies: Cookie[];
  onEdit: (cookie: Cookie) => void;
  onDelete: (id: string) => void;
}

const AdminCookieTable: React.FC<AdminCookieTableProps> = ({ cookies, onEdit, onDelete }) => {
  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Image</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Price</TableHead>
            <TableHead>Featured</TableHead>
            <TableHead>Available</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cookies.map((cookie) => (
            <TableRow key={cookie.id}>
              <TableCell>
                <img src={cookie.imageUrl} alt={cookie.name} className="w-12 h-12 object-cover rounded-md" />
              </TableCell>
              <TableCell className="font-medium">{cookie.name}</TableCell>
              <TableCell>${cookie.price.toFixed(2)}</TableCell>
              <TableCell>{cookie.isFeatured ? "Yes" : "No"}</TableCell>
              <TableCell>{cookie.isAvailable ? "Yes" : "No"}</TableCell>
              <TableCell className="text-right">
                <Button variant="outline" size="icon" className="mr-2" onClick={() => onEdit(cookie)}>
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button variant="destructive" size="icon" onClick={() => onDelete(cookie.id)}>
                  <Trash2 className="h-4 w-4" />
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AdminCookieTable;