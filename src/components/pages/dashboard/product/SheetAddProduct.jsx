import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { productSchema } from "@/schema/product-form";
import { useCategoryStore } from "@/store/category";
import { useReportStore } from "@/store/report";
import { useProductStore } from "@/store/useProductsStore";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { PlusCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const SheetAddProduct = () => {
  const [previewImage, setPreviewImage] = useState(null); // Untuk preview gambar
  const { categories, fetchCategories } = useCategoryStore();
  const { addReport } = useReportStore();
  const { addProduct, fetchProducts } = useProductStore();
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);
  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    defaultValues: {
      name: "",
      price: "",
      qty: "",
      category: "",
      description: "",
      image: "",
    },
    resolver: zodResolver(productSchema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    if (!data.image || !data.image[0]) {
      toast.error("Harap unggah gambar");
      return;
    }

    const formData = new FormData();
    formData.append("image", data.image[0]);

    try {
      const response = await axios.post(
        `https://api.imgbb.com/1/upload?key=${
          import.meta.env.VITE_API_IMAGE_KEY
        }`, // Ganti YOUR_API_KEY dengan API Key dari ImgBB
        formData
      );

      const imageUrl = response.data.data.url; // URL gambar yang berhasil diunggah
      const product = {
        id: `${new Date().getTime()}`,
        name: data.name,
        price: data.price,
        qty: data.qty,
        category: data.category,
        description: data.description,
        image: imageUrl,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const getCategoryId = categories.find(
        (category) => category.name === data.category
      )?.id;

      const report = {
        id: `${new Date().getTime()}`,
        productId: product.id,
        categoryId: getCategoryId,
        qty: product.qty,
        total_price: product.price * product.qty,
        type: "in",
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      addProduct(product);
      addReport(report);

      setTimeout(() => {
        fetchProducts(); // Pastikan fetch data lagi
      }, 500);

      setOpen(false);
    } catch (error) {
      toast.error(error.message || "Gagal mengunggah gambar");
    } finally {
      setLoading(false);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith("image/")) {
      // Pastikan hanya file gambar
      setPreviewImage(URL.createObjectURL(file));
    } else {
      toast.error("File harus berupa gambar");
    }
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger className="flex items-center gap-2 bg-primary text-primary-foreground hover:bg-primary/90 py-2 px-2 rounded-lg">
        <span className="max-sm:hidden">Tambah Produk</span>{" "}
        <PlusCircle size={24} />
      </SheetTrigger>
      <SheetContent className="w-full sm:w-[700px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Form Tambah Produk</SheetTitle>
          <SheetDescription>
            Silahkan lengkapi form di bawah ini!
          </SheetDescription>
        </SheetHeader>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-5"
        >
          <div className="space-y-2 col-span-2 mt-8">
            <Label className="block" htmlFor="name">
              Nama Produk
            </Label>
            <Input
              id="name"
              type="text"
              {...register("name")}
              className="border p-2 w-full"
            />
            {errors.name && (
              <p className="text-red-500 text-sm">{errors.name?.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="block" htmlFor="price">
              Harga
            </Label>
            <Input
              id="price"
              type="number"
              {...register("price", {
                setValueAs: (value) =>
                  value === "" ? undefined : parseFloat(value),
              })}
              className="border p-2 w-full"
            />
            {errors.price && (
              <p className="text-red-500 text-sm">{errors.price.message}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label className="block" htmlFor="qty">
              Kuantiti
            </Label>
            <Input
              id="qty"
              type="number"
              {...register("qty", {
                setValueAs: (value) =>
                  value === "" ? undefined : parseInt(value, 10),
              })}
              className="border p-2 w-full"
            />
            {errors.qty && (
              <p className="text-red-500 text-sm">{errors.qty.message}</p>
            )}
          </div>
          <div className="space-y-2 col-span-2">
            <Label className="block" htmlFor="category">
              Kategory
            </Label>
            <Controller
              name="category"
              control={control} // Tambahkan control dari useForm
              defaultValue="" // Default value
              render={({ field }) => (
                <Select
                  onValueChange={field.onChange} // Sambungkan onValueChange ke onChange react-hook-form
                  value={field.value} // Sambungkan value ke form state
                  id="category"
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                  <SelectContent className="max-h-60 overflow-y-auto">
                    {categories.map((item) => (
                      <SelectItem key={item.id} value={item.name}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              )}
            />

            {errors.category && (
              <p className="text-red-500 text-sm">{errors.category.message}</p>
            )}
          </div>
          <div className="space-y-2 col-span-2">
            <Label className="block" htmlFor="description">
              Deskripsi
            </Label>
            <Textarea
              id="description"
              className="border p-2 w-full resize-none"
              {...register("description")}
            />
            {errors.description && (
              <p className="text-red-500 text-sm">
                {errors.description.message}
              </p>
            )}
          </div>

          {previewImage && (
            <img
              src={previewImage}
              alt="Image Preview"
              className="w-30 h-30 object-cover max-sm:w-20 max-sm:h-20"
            />
          )}

          <div className="space-y-2 col-span-2">
            <Label className="block" htmlFor="image">
              Gambar
            </Label>
            <Input
              type="file"
              {...register("image")}
              onChange={handleImageChange} // Menangani perubahan gambar
              className="border p-2 w-full"
            />
            {errors.image && (
              <p className="text-red-500 text-sm">{errors.image.message}</p>
            )}
          </div>

          <Button disabled={loading} type="submit" className="col-span-2 mt-4">
            {loading ? "Loading..." : "Tambah Produk"}
          </Button>
        </form>
      </SheetContent>
    </Sheet>
  );
};

export default SheetAddProduct;
