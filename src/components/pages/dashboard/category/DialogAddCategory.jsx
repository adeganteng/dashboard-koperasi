import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCategoryStore } from "@/store/category";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusCircle } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const categorySchema = z.object({
  name: z.string().min(1, "Nama kategori harus diisi"),
});

const DialogAddCategory = ({ fetchCategories }) => {
  const [open, setOpen] = useState(false);

  const { addCategory, isLoading } = useCategoryStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
    },
    resolver: zodResolver(categorySchema),
  });

  const onSubmit = (data) => {
    const dataCategory = {
      id: `${new Date().getTime()}`,
      name: data.name,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    try {
      addCategory(dataCategory);
      fetchCategories();
      setOpen(false);
    } catch (error) {
      toast.error(error.message || "Gagal menambahkan kategori");
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="flex items-center gap-2 py-2 px-3 rounded-lg bg-primary text-white">
        <span className="max-sm:hidden">Tambah Kategori</span>{" "}
        <PlusCircle size={24} />
      </DialogTrigger>
      <DialogContent className="w-[95%] rounded-lg sm:w-[600px]">
        <DialogHeader>
          <DialogTitle>Form untuk Menambahkan Kategori</DialogTitle>
          <DialogDescription>
            Pastikan masukan nama kategori yang sesuai karena jika kategori
            sudah ada produknya, maka tidak bisa dihapus?
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit(onSubmit)} className="grid gap-4 py-4">
          <div className="flex items-start gap-4 flex-col">
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

export default DialogAddCategory;
