import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";

export default function StudentFormModal({
  isOpen,
  onClose,
  onSubmit,
  editForm,
  setEditForm,
  loading,
}) {
  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-md bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 shadow-xl rounded-lg text-zinc-900 dark:text-zinc-50">
        <DialogHeader>
          <DialogTitle className="text-lg font-bold tracking-tight">
            Modify Student Profile Parameters
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={onSubmit} className="space-y-4 pt-2">
          <div className="space-y-1">
            <Label htmlFor="edit-name">Full Student Name</Label>
            <Input
              id="edit-name"
              required
              value={editForm.name}
              onChange={(e) =>
                setEditForm({ ...editForm, name: e.target.value })
              }
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="edit-dept">Department Designation</Label>
            <Input
              id="edit-dept"
              required
              value={editForm.department}
              onChange={(e) =>
                setEditForm({ ...editForm, department: e.target.value })
              }
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="edit-year">Academic Batch Year</Label>
            <Select
              value={editForm.year}
              onValueChange={(v) => setEditForm({ ...editForm, year: v })}
            >
              <SelectTrigger id="edit-year">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-white dark:bg-zinc-800 border">
                {["1", "2", "3", "4"].map((yr) => (
                  <SelectItem key={yr} value={yr}>
                    Year {yr}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-1">
            <Label htmlFor="edit-phone">Contact Phone Number</Label>
            <Input
              id="edit-phone"
              required
              value={editForm.phone}
              onChange={(e) =>
                setEditForm({ ...editForm, phone: e.target.value })
              }
            />
          </div>

          <div className="space-y-1">
            <Label htmlFor="edit-address">Residential Location Address</Label>
            <Input
              id="edit-address"
              required
              value={editForm.address}
              onChange={(e) =>
                setEditForm({ ...editForm, address: e.target.value })
              }
            />
          </div>

          <DialogFooter className="pt-2 gap-2 md:gap-0">
            <Button
              type="button"
              variant="outline"
              onClick={onClose}
              disabled={loading}
            >
              Cancel Action
            </Button>
            <Button
              type="submit"
              className="bg-blue-600 text-white hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Committing Updates..." : "Save Profile Modifications"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
