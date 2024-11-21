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
  SheetHeader,
  SheetTitle,
  SheetDescription,
} from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { productSchema } from "@/schema/product-form";
import { useCategoryStore } from "@/store/category";
import { useProductStore } from "@/store/useProductsStore";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";

const SheetEditProduct = ({ product, sheetOpen, setSheetOpen }) => {
  const [previewImage, setPreviewImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const { categories, fetchCategories } = useCategoryStore();
  const { fetchProducts, updateProduct } = useProductStore();

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
      name: product?.name,
      price: product?.price,
      qty: product?.qty,
      category: product?.category,
      description: product?.description,
      image: product?.image,
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
      if (formData.get("image") !== "h") {
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${
            import.meta.env.VITE_API_IMAGE_KEY
          }`,
          formData
        );

        data.image = response.data.data.url;
      }

      const updateProductByID = {
        ...data,
        id: product.id,
        createdAt: product.createdAt,
        updatedAt: new Date().toISOString(),
      };

      await updateProduct(updateProductByID.id, updateProductByID);

      fetchProducts();
      setSheetOpen(false);
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
    <Sheet open={sheetOpen} onOpenChange={setSheetOpen}>
      <SheetContent className="w-full sm:w-[700px] overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Form untuk Edit Product {product?.name}</SheetTitle>
          <SheetDescription>
            Silahkan lengkapi form di bawah ini!
          </SheetDescription>
        </SheetHeader>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="grid grid-cols-2 gap-5  "
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
              disabled
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
                  value={product?.category} // Sambungkan value ke form state
                  id="category"
                  disabled
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Pilih Kategori" />
                  </SelectTrigger>
                  <SelectContent>
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

          {previewImage ? (
            <img
              src={previewImage}
              alt="Image Preview"
              className="w-30 h-30 object-cover max-sm:w-20 max-sm:h-20"
            />
          ) : (
            <img
              src={product?.image}
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

export default SheetEditProduct;
