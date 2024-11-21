// /* eslint-disable no-unused-vars */
// import axiosInstance from "@/lib/axios";
// import { toast } from "sonner";
// import { create } from "zustand";

// export const useReportStore = create((set, get) => ({
//   reports: [],
//   isLoading: false,

//   fetchReports: async () => {
//     set({ isLoading: true });
//     try {
//       const response = await axiosInstance.get("/report");
//       set({ reports: response.data || [], isLoading: false });
//     } catch (error) {
//       set({ isLoading: false });
//       toast.error("Gagal mengambil data produk");
//     }
//   },

//   addReport: async (data) => {
//     try {
//       const response = await axiosInstance.post("/report", data);
//       set((prevState) => ({
//         reports: [...prevState.reports, response.data],
//       }));
//       toast.success("Laporan berhasil ditambahkan");
//     } catch (error) {
//       toast.error(error.message || "Gagal menambahkan laporan");
//     }
//   },
// }));

import axiosInstance from "@/lib/axios";
import { toast } from "sonner";
import { create } from "zustand";

export const useReportStore = create((set, get) => ({
  reports: [],
  isLoading: false,
  selectedItems: [],

  setSelectedItems: (items) => set({ selectedItems: items }),

  fetchReports: async () => {
    set({ isLoading: true });
    try {
      const response = await axiosInstance.get("/report");
      set({ reports: response.data.reverse() || [], isLoading: false });
    } catch (error) {
      set({ isLoading: false });
      toast.error(error.message || "Gagal mengambil data laporan");
    }
  },

  addReport: async (data) => {
    try {
      const response = await axiosInstance.post("/report", data);
      set((state) => ({
        reports: [...state.reports, response.data],
      }));
      toast.success("Laporan berhasil ditambahkan");
    } catch (error) {
      toast.error(error.message || "Gagal menambahkan laporan");
    }
  },

  deleteReport: async (id) => {
    try {
      await axiosInstance.delete(`/report/${id}`);
      set((state) => ({
        reports: state.reports.filter((report) => report.id !== id),
        selectedItems: state.selectedItems.filter((item) => item !== id),
      }));
      toast.success("Laporan berhasil dihapus");
    } catch (error) {
      toast.error(error.message || "Gagal menghapus laporan");
    }
  },

  deleteManyReports: async (ids) => {
    set({ isLoading: true });
    try {
      await Promise.all(ids.map((id) => axiosInstance.delete(`/report/${id}`)));
      set((state) => ({
        reports: state.reports.filter((report) => !ids.includes(report.id)),
        selectedItems: state.selectedItems.filter(
          (item) => !ids.includes(item)
        ),
        isLoading: false,
      }));
      toast.success("Laporan berhasil dihapus");
    } catch (error) {
      set({ isLoading: false });
      toast.error(error.message || "Gagal menghapus laporan");
    }
  },
}));
