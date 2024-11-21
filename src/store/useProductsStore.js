import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";

export const useProductStore = create((set, get) => ({
  products: [],
  isLoading: false,

  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/products");
      set({ products: response.data.reverse(), isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      toast.error("Gagal mengambil data produk");
      console.error("Error fetching products:", error);
    }
  },

  addProduct: async (product) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post("/products", product);
      set((state) => ({
        products: [response.data, ...state.products],
        isLoading: false,
      }));
      toast.success("Produk berhasil ditambahkan");
    } catch (error) {
      set({ isLoading: false });
      toast.error("Gagal menambahkan produk");
      console.error("Error adding product:", error);
    }
  },

  updateProduct: async (productId, updatedData) => {
    set({ isLoading: true });
    try {
      // Validasi input
      if (!productId) throw new Error("Product ID is required");
      if (!updatedData || Object.keys(updatedData).length === 0) {
        throw new Error("Updated data is required");
      }

      // Kirim request ke JSON Server
      const response = await axiosInstance.patch(
        `/products/${productId}`,
        updatedData
      );

      // Perbarui state produk
      set((state) => ({
        products: state.products.map((product) =>
          product.id === productId ? { ...product, ...response.data } : product
        ),
        isLoading: false,
      }));

      toast.success("Produk berhasil diperbarui");
    } catch (error) {
      set({ isLoading: false });
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Gagal memperbarui produk";
      toast.error(errorMessage);
      console.error("Error updating product:", error);
    }
  },

  deleteProduct: async (productId) => {
    set({ isLoading: true });
    try {
      await axiosInstance.delete(`/products/${productId}`);
      set((state) => ({
        products: state.products.filter((product) => product.id !== productId),
        isLoading: false,
      }));
      toast.success("Produk berhasil dihapus");
    } catch (error) {
      set({ isLoading: false });
      toast.error("Gagal menghapus produk");
      console.error("Error deleting product:", error);
    }
  },
  updateCategoryBatch: async (updates) => {
    set({ isLoading: true });
    try {
      // Validasi input
      if (!Array.isArray(updates)) {
        throw new Error("Updates harus berupa array");
      }

      // Promise.all untuk menjalankan banyak request secara paralel
      const updatePromises = updates.map(({ id, newCategory }) =>
        axiosInstance.patch(`/products/${id}`, { category: newCategory })
      );

      const responses = await Promise.all(updatePromises);

      // Update state setelah semua berhasil
      set((state) => ({
        products: state.products.map((product) => {
          const updatedProduct = responses.find(
            (res) => res.data.id === product.id
          );
          return updatedProduct
            ? { ...product, ...updatedProduct.data }
            : product;
        }),
        isLoading: false,
      }));

      toast.success("Semua kategori produk berhasil diperbarui");
    } catch (error) {
      set({ isLoading: false });
      toast.error("Gagal memperbarui kategori produk");
      console.error("Error updating categories:", error);
    }
  },
}));
