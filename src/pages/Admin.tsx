import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { getAllCookies, addCookie, updateCookie, deleteCookie, Cookie } from "@/data/mock-cookies";
import AdminCookieTable from "@/components/admin/AdminCookieTable";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import CookieForm from "@/components/admin/CookieForm";
import { toast } from "sonner";

const Admin = () => {
  const [cookies, setCookies] = useState<Cookie[]>([]);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingCookie, setEditingCookie] = useState<Cookie | null>(null);

  useEffect(() => {
    setCookies(getAllCookies());
  }, []);

  const handleAddCookie = (newCookieData: Omit<Cookie, 'id'>) => {
    const newCookie = addCookie(newCookieData);
    setCookies(getAllCookies()); // Re-fetch to ensure state is updated
    toast.success(`${newCookie.name} added successfully!`);
    setIsFormOpen(false);
  };

  const handleUpdateCookie = (updatedCookieData: Cookie) => {
    const updated = updateCookie(updatedCookieData);
    if (updated) {
      setCookies(getAllCookies()); // Re-fetch to ensure state is updated
      toast.success(`${updated.name} updated successfully!`);
      setIsFormOpen(false);
      setEditingCookie(null);
    } else {
      toast.error("Failed to update cookie.");
    }
  };

  const handleDeleteCookie = (id: string) => {
    if (confirm("Are you sure you want to delete this cookie?")) {
      const success = deleteCookie(id);
      if (success) {
        setCookies(getAllCookies()); // Re-fetch to ensure state is updated
        toast.info("Cookie deleted.");
      } else {
        toast.error("Failed to delete cookie.");
      }
    }
  };

  const handleEditClick = (cookie: Cookie) => {
    setEditingCookie(cookie);
    setIsFormOpen(true);
  };

  const handleFormClose = () => {
    setIsFormOpen(false);
    setEditingCookie(null);
  };

  return (
    <div className="py-8 max-w-6xl mx-auto">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-4xl font-extrabold text-primary">Admin Dashboard</h1>
        <Dialog open={isFormOpen} onOpenChange={setIsFormOpen}>
          <DialogTrigger asChild>
            <Button onClick={() => { setEditingCookie(null); setIsFormOpen(true); }}>
              <PlusCircle className="mr-2 h-4 w-4" /> Add New Cookie
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>{editingCookie ? "Edit Cookie" : "Add New Cookie"}</DialogTitle>
            </DialogHeader>
            <CookieForm
              initialData={editingCookie}
              onSubmit={editingCookie ? handleUpdateCookie : handleAddCookie}
              onCancel={handleFormClose}
            />
          </DialogContent>
        </Dialog>
      </div>

      <AdminCookieTable
        cookies={cookies}
        onEdit={handleEditClick}
        onDelete={handleDeleteCookie}
      />

      <p className="text-md text-gray-500 mt-8 text-center">
        Note: Changes made here are currently in-memory only and will reset on page refresh.
        To persist data, you would need to integrate a database like Supabase.
      </p>
    </div>
  );
};

export default Admin;