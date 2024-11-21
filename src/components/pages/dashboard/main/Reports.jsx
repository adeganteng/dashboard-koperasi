import { useCategoryStore } from "@/store/category";
import { useReportStore } from "@/store/report";
import { useProductStore } from "@/store/useProductsStore";
import { useEffect } from "react";
import { Link } from "react-router-dom";

const Reports = () => {
  const { fetchReports, reports } = useReportStore();
  const { categories, fetchCategories } = useCategoryStore();
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <div className="bg-secondary p-4 rounded-xl w-full flex flex-col">
      <h1 className="text-xl font-semibold">Laporan</h1>

      {reports.slice(0, 2).map((item, index) => {
        const produkName = products.find(
          (product) => product.id === item.productId
        );
        const categoryName = categories.find(
          (category) => category.id === item.categoryId
        );

        return (
          <div
            key={index}
            className="relative flex items-center justify-between gap-5 mt-6 p-3 bg-primary-foreground rounded-lg overflow-hidden"
          >
            <div className="flex flex-col gap-2">
              <p className="text-2xl font-bold">{produkName?.name}</p>
              <p className="text-sm font-normal">{categoryName?.name}</p>
            </div>

            <hr className="border-none w-1 h-full bg-secondary rounded-full" />

            <p>Qty: {item.qty}</p>

            <hr className="border-none w-1 h-full bg-secondary rounded-full" />
            <p>
              Total:{" "}
              {item.total_price.toLocaleString("id-ID", {
                style: "currency",
                currency: "IDR",
                minimumFractionDigits: 0, // Opsional, untuk menghilangkan angka desimal
              })}
            </p>

            <p
              className={`absolute right-0 top-0 px-2 py-[1px] rounded-bl-lg ${
                item.type === "in" ? "bg-green-500" : "bg-red-500"
              } text-white`}
            >
              {item.type}
            </p>
          </div>
        );
      })}
      <Link
        className="text-center text-sm underline text-primary mt-2"
        to={"/dashboard/reports"}
      >
        Show All Reports
      </Link>
    </div>
  );
};

export default Reports;
