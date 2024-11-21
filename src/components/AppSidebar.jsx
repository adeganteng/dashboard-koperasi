import {
  ChartArea,
  ChartBarStacked,
  ChevronUp,
  Container,
  LayoutDashboard,
  LogOut,
  NotebookText,
  User,
  User2,
} from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "./ui/sidebar";
import { NavLink, useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { useAuthStore } from "@/store/auth";
import { useEffect } from "react";

const items = [
  {
    title: "Dashboard",
    url: "/dashboard/main",
    icon: <LayoutDashboard size={20} />,
  },
  {
    title: "Produk",
    url: "/dashboard/products",
    icon: <Container size={20} />,
  },
  {
    title: "Kategori",
    url: "/dashboard/category",
    icon: <ChartBarStacked size={20} />,
  },
  {
    title: "Laporan",
    url: "/dashboard/reports",
    icon: <NotebookText size={20} />,
  },
  {
    title: "Analisa",
    url: "/dashboard/analysis",
    icon: <ChartArea size={20} />,
  },
];

const AppSidebar = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const { user, users, getAllUser } = useAuthStore();
  useEffect(() => {
    getAllUser();
  }, [getAllUser]);

  const getUsername = users.find((usr) => usr.id === user.id)?.name;
  return (
    <Sidebar className="-z-0 ">
      <SidebarHeader />
      <SidebarContent
        aria-describedby="dialog-description"
        className="px-2 md:pt-20 bg-secondary"
      >
        <SidebarMenu>
          {items.map((item) => (
            <SidebarMenuItem key={item.title}>
              <SidebarMenuButton asChild>
                <NavLink to={item.url} className="cursor-pointer text-lg">
                  {item.icon}
                  <span>{item.title}</span>
                </NavLink>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton>
                  <User2 /> {getUsername}
                  <ChevronUp className="ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="top"
                className="w-[--radix-popper-anchor-width]"
              >
                <DropdownMenuItem
                  onClick={() => navigate("/dashboard/profile")}
                  className="cursor-pointer flex justify-between items-center hover:bg-secondary"
                >
                  <span>Account</span>
                  <User size={20} />
                </DropdownMenuItem>
                <DropdownMenuItem
                  onClick={() => {
                    logout();
                    navigate("/");
                  }}
                  className="cursor-pointer flex justify-between items-center hover:bg-secondary"
                >
                  <span>Sign out</span>
                  <LogOut size={20} />
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
};

export default AppSidebar;
