import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { toast } from "sonner";
import { useState } from "react";
import { useCategoryStore } from "@/store/category";

// Zod Schema untuk validasi

const DialogDeleteCategory = ({
  open,
  setOpen,
  category,
  handleDialogClose,
}) => {
  const [loading, setLoading] = useState(false);

  const { deleteCategory, fetchCategories } = useCategoryStore();

  const handleDelete = async () => {
    if (category?.total > 0) {
      toast.error("Total produk harus 0 sebelum dihapus");
      return;
    }
    setLoading(true);
    try {
      await deleteCategory(category.id);
      fetchCategories();
      toast.success("Barang berhasil dihapus");
      handleDialogClose();
    } catch (error) {
      console.log(error);
      toast.error("Terjadi kesalahan, silahkan coba lagi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[95%] rounded-lg sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Kategori yang di Hapus: {category?.name}</DialogTitle>
          <DialogDescription>
            Tolong pastikan total produk harus 0 dulu sebelum di hapus!
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full flex-col">
          <p>
            Total produk saat ini:{" "}
            <span className="font-bold text-red-500">{category?.total}</span>
          </p>

          <div className="flex justify-end items-center gap-4">
            <Button variant="outline" onClick={handleDialogClose}>
              Tutup
            </Button>
            <Button
              variant="destructive"
              disabled={loading}
              onClick={handleDelete}
            >
              {loading ? "Loading..." : "Hapus"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default DialogDeleteCategory;
