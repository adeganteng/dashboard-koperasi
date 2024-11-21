import AppSidebar from "@/components/AppSidebar";
import Navbar from "@/components/Navbar";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    // Mengubah title halaman
    document.title = "Dashboard | Koperasiku";

    // Membersihkan efek jika diperlukan (opsional)
    return () => {
      document.title = "Koperasiku";
    };
  }, []); // Hanya berjalan saat komponen dimuat
  return (
    <div>
      <Navbar />
      <SidebarProvider>
        <AppSidebar />
        <main className="pt-20 w-full">
          <SidebarTrigger onClick={() => setOpen(!open)} />
          <div className="p-4">
            <Outlet />
          </div>
        </main>
      </SidebarProvider>
    </div>
  );
};

export default DashboardLayout;
