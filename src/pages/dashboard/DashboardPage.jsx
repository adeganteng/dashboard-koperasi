import Category from "@/components/pages/dashboard/main/Category";
import Products from "@/components/pages/dashboard/main/Products";
import ReportChart from "@/components/pages/dashboard/main/ReportChart";
import Reports from "@/components/pages/dashboard/main/Reports";
import { useAuthStore } from "@/store/auth";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const DashboardPage = () => {
  const { user } = useAuthStore();

  const navigate = useNavigate();
  if (!user) {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useEffect(() => {
      navigate("login");
    }, [navigate]);
  } else {
    return (
      <div>
        <Products />

        <div className="grid grid-cols-2 gap-6 max-md:grid-cols-1 mt-6">
          <Category />
          <Reports />
        </div>

        <ReportChart />
      </div>
    );
  }
};

export default DashboardPage;
