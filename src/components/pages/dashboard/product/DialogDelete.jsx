import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

import { useProductStore } from "@/store/useProductsStore";
import { toast } from "sonner";
import { useState } from "react";

// Zod Schema untuk validasi

const DialogDelete = ({ open, setOpen, product, handleDialogClose }) => {
  const [loading, setLoading] = useState(false);

  const { deleteProduct, fetchProducts } = useProductStore();

  const handleDelete = async () => {
    if (product?.qty > 0) {
      toast.error("Kuantiti barang harus 0 sebelum dihapus");
      return;
    }
    setLoading(true);
    try {
      await deleteProduct(product.id);
      fetchProducts();
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
          <DialogTitle>Barang yang di Hapus: {product?.name}</DialogTitle>
          <DialogDescription>
            Tolong pastikan kuantiti barang harus 0 dulu sebelum di hapus!
          </DialogDescription>
        </DialogHeader>
        <div className="flex w-full flex-col">
          <p>
            Kuantiti Sekarang:{" "}
            <span className="font-bold text-red-500">{product?.qty}</span>
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

export default DialogDelete;
