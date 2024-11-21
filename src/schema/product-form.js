import * as z from "zod";

export const productSchema = z.object({
  name: z.string().min(1, "Nama produk harus diisi"),
  price: z.number().min(1, "Harga harus lebih dari 0"),
  qty: z.number().min(1, "Kuantiti harus lebih dari 0"),
  category: z.string().min(1, "Kategori harus dipilih"),
  description: z.string().min(1, "Deskripsi harus diisi"),
  image: z.any(), // Gambar tidak divalidasi di Zod, bisa divalidasi manual
});
