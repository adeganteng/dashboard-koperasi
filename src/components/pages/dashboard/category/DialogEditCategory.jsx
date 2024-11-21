import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCategoryStore } from "@/store/category";
import { useProductStore } from "@/store/useProductsStore";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const categorySchema = z.object({
  name: z.string().min(1, "Nama kategori harus diisi"),
});

const DialogEditCategory = ({ category, open, setOpen, handleCloseDialog }) => {
  const { updateCategory, fetchCategories, isLoading, categories } =
    useCategoryStore();

  const { updateProduct, fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: category.name,
    },
    resolver: zodResolver(categorySchema),
  });

  const onSubmit = (data) => {
    if (category.total > 0) {
      toast.error("Total produk harus 0 sebelum diedit");
      return;
    }
    const findCategory = categories.find((cat) => cat.id === category.id);
    const findProductByCategory = products.find(
      (product) => product.category === category.name
    );

    const dataUpdateProduct = {
      ...findProductByCategory,
      category: data.name,
      updatedAt: new Date().toISOString(),
    };
    const dataUpdateCategory = {
      id: category.id,
      name: data.name,
      createdAt: findCategory.createdAt,
      updatedAt: new Date().toISOString(),
    };
    try {
      updateCategory(category.id, dataUpdateCategory);
      if (findProductByCategory)
        updateProduct(findProductByCategory.id, dataUpdateProduct);
      fetchCategories();
      handleCloseDialog();
    } catch (error) {
      toast.error(error.message || "Gagal memperbarui kategori");
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="w-[95%] rounded-lg sm:w-[600px]">
        <DialogHeader>
          <DialogTitle>Form untuk Edit Kategori</DialogTitle>
          <DialogDescription>
            Pastikan masukan nama kategori yang sesuai karena jika kategori
            sudah ada produknya, maka tidak bisa dihapus?
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="flex items-start gap-4 flex-col">
            <p>
              Total produk saat ini:{" "}
              <span className="font-bold text-red-500">{category?.total}</span>
            </p>
            <Label htmlFor="name" className="text-right">
              Nama Kategory
            </Label>
            <Input
              id="name"
              type="text"
              {...register("name")}
              className={` ${errors.name ? "border-red-500" : ""}`}
            />
            {errors.name && (
              <p className=" text-red-500 text-sm">{errors.name.message}</p>
            )}
          </div>
          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Batal
            </Button>
            <Button disabled={isLoading} type="submit">
              {isLoading ? "Loading..." : "Simpan"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default DialogEditCategory;
