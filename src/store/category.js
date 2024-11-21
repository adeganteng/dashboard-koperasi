import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";

export const useCategoryStore = create((set, get) => ({
  categories: [],
  isLoading: false,

  fetchCategories: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/category");
      set({ categories: response.data.reverse(), isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      toast.error("Gagal mengambil data produk");
    }
  },

  addCategory: async (category) => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.post("/category", category);
      set((state) => ({
        categories: [...state.categories, response.data],
        isLoading: false,
      }));
      toast.success("Kategori berhasil ditambahkan");
    } catch (error) {
      set({ isLoading: false });
      toast.error("Gagal menambahkan kategori");
    }
  },
  updateCategory: async (categoryId, updatedData) => {
    set({ isLoading: true });
    try {
      // Validasi input
      if (!categoryId) throw new Error("Product ID is required");
      if (!updatedData || Object.keys(updatedData).length === 0) {
        throw new Error("Updated data is required");
      }

      // Kirim request ke JSON Server
      const response = await axiosInstance.patch(
        `/category/${categoryId}`,
        updatedData
      );

      // Perbarui state produk
      set((state) => ({
        categories: state.categories.map((category) =>
          category.id === categoryId
            ? { ...category, ...response.data }
            : category
        ),
        isLoading: false,
      }));

      toast.success("Kategori berhasil diperbarui");
    } catch (error) {
      set({ isLoading: false });
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Gagal memperbarui Kategori";
      toast.error(errorMessage);
      console.error("Error updating product:", error);
    }
  },
  deleteCategory: async (categoryId) => {
    set({ isLoading: true });
    try {
      await axiosInstance.delete(`/category/${categoryId}`);
      set((state) => ({
        categories: state.categories.filter(
          (category) => category.id !== categoryId
        ),
        isLoading: false,
      }));
      toast.success("Kategori berhasil dihapus");
    } catch (error) {
      set({ isLoading: false });
      toast.error("Gagal menghapus produk");
      console.error("Error deleting product:", error);
    }
  },
}));
