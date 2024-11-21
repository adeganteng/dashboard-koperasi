// src/stores/authStore.js

import axiosInstance from "@/lib/axios";
import React from "react";
import { toast } from "sonner";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      users: [],
      isLoggingIn: false,

      getAllUser: async () => {
        try {
          const response = await axiosInstance.get("/users");
          set({ users: response.data });
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      },

      login: async (credentials) => {
        set({ isLoggingIn: true });
        try {
          // Karena JSON Server tidak memiliki endpoint autentikasi,
          // kita perlu menggunakan GET untuk mencari user yang cocok
          const response = await axiosInstance.get("/users", {
            params: {
              username: credentials.username,
              // Dalam real app, password seharusnya di-hash
            },
          });

          const user = response.data.find(
            (user) => user.password === credentials.password
          );

          if (!user) {
            throw new Error("Invalid username or password");
          }

          // Generate dummy token (in real app, this should come from backend)
          const token = btoa(JSON.stringify({ id: user.id, role: user.role }));

          // Set authorization header for future requests
          axiosInstance.defaults.headers.common[
            "Authorization"
          ] = `Bearer ${token}`;

          // Remove sensitive data before storing
          const safeUserData = {
            id: user.id,
            username: user.username,
            nama: user.nama,
            role: user.role,
            email: user.email,
            token,
          };

          set({
            user: safeUserData,
            isLoggingIn: false,
          });

          toast.success("Login berhasil");
          return true;
        } catch (error) {
          set({ isLoggingIn: false });

          const errorMessage =
            error.response?.data?.message || error.message || "Login gagal";
          toast.error(errorMessage);

          return false;
        }
      },

      logout: () => {
        // Clear auth header
        delete axiosInstance.defaults.headers.common["Authorization"];

        // Clear state
        set({ user: null });

        toast.success("Logout berhasil");
      },

      // Fungsi untuk mengecek apakah token masih valid
      checkAuth: async () => {
        try {
          const response = await axiosInstance.get("/users/me");
          set({ user: response.data });
          return true;
          // eslint-disable-next-line no-unused-vars
        } catch (error) {
          set({ user: null });
          return false;
        }
      },

      // Fungsi untuk memperbarui data user
      updateUser: (userData) => {
        set({ user: { ...userData } });
      },
    }),
    {
      name: "auth-storage", // nama untuk local storage
      getStorage: () => localStorage, // gunakan localStorage sebagai storage
      partialize: (state) => ({ user: state.user }), // hanya simpan data user ke storage
    }
  )
);

// Helper hook untuk protected routes
export const useRequireAuth = () => {
  const { user, checkAuth } = useAuthStore();

  React.useEffect(() => {
    if (!user) {
      checkAuth();
    }
  }, [user, checkAuth]);

  return user;
};
