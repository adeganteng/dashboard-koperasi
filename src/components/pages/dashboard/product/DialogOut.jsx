import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { useCategoryStore } from "@/store/category";
import { useReportStore } from "@/store/report";
import { useProductStore } from "@/store/useProductsStore";
import { toast } from "sonner";
import { useState } from "react";

// Zod Schema untuk validasi
const qtySchema = z.object({
  qty: z
    .number()
    .min(1, "Kuantiti harus lebih besar dari 0")
    .max(1000, "Kuantiti tidak boleh lebih dari 1000"),
});

const DialogOut = ({ open, setOpen, product, handleDialogClose }) => {
  const [loading, setLoading] = useState(false);
  const { categories, fetchCategories } = useCategoryStore();
  const { addReport, fetchReports } = useReportStore();
  const { updateProduct, fetchProducts } = useProductStore();
  // React Hook Form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      qty: 0,
    },
    resolver: zodResolver(qtySchema),
  });

  // Handle Submit Form
  const onSubmit = (data) => {
    if (data.qty > product.qty) {
      toast.info("Kuantiti tidak boleh lebih dari sebelumnya");
      return;
    }
    setLoading(true);
    try {
      const categoryId = categories.find(
        (category) => category.name === product.category
      ).id;

      const dataUpdateProduct = {
        ...product,
        qty: product.qty - data.qty,
        updatedAt: new Date().toISOString(),
      };
      const dataReport = {
        id: `${new Date().getTime()}`,
        productId: product.id,
        categoryId: categoryId,
        qty: data.qty,
        total_price: data.qty * product.price,
        type: "out",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      addReport(dataReport);
      updateProduct(product.id, dataUpdateProduct);

      fetchCategories();
      fetchProducts();
      fetchReports();

      handleDialogClose();
    } catch (error) {
      toast.error(error.message || "Gagal menambahkan laporan masuk");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[95%] rounded-lg sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Barang Keluar: {product?.name}</DialogTitle>
          <DialogDescription>
            Tolong diisi dengan benar, jangan sampai ada kesalahan, dan juga
            angka harus lebih kecil dari sebelumnya
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="flex items-start gap-4 flex-col">
            <p className="text-right">
              Kuantiti saat ini:{" "}
              <span className="text-primary text-lg font-semibold">
                {product?.qty}
              </span>
            </p>
            <Label htmlFor="qty" className="text-right">
              Update Kuantiti
            </Label>
            <Input
              id="qty"
              type="number"
              {...register("qty", { valueAsNumber: true })}
              className={` ${errors.qty ? "border-red-500" : ""}`}
            />
            {errors.qty && (
              <p className=" text-red-500 text-sm">{errors.qty.message}</p>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={handleDialogClose}>
              Batal
            </Button>
            <Button disabled={loading} type="submit">
              {loading ? "Loading..." : "Simpan"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogOut;
