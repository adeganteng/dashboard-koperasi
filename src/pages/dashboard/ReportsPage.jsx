import { useEffect, useMemo, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Trash2 } from "lucide-react";
import { useReportStore } from "@/store/report";
import { useCategoryStore } from "@/store/category";
import { useProductStore } from "@/store/useProductsStore";

// Date utility functions
const isDateWithinRange = (date, startDate) => {
  const dateObj = new Date(date);
  return dateObj >= startDate && dateObj <= new Date();
};

const getStartDate = (filterType) => {
  const now = new Date();
  const today = new Date();
  switch (filterType) {
    case "today":
      today.setHours(0, 0, 0, 0);
      return today;
    case "threeDays":
      return new Date(now.setDate(now.getDate() - 3));
    case "week":
      return new Date(now.setDate(now.getDate() - 7));
    case "month":
      return new Date(now.setMonth(now.getMonth() - 1));
    case "year":
      return new Date(now.setFullYear(now.getFullYear() - 1));
    default:
      return new Date(0);
  }
};

const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleString("id-ID", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

const ReportPage = () => {
  const { products, fetchProducts } = useProductStore();
  const { categories, fetchCategories } = useCategoryStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const {
    reports,
    isLoading,
    selectedItems,
    fetchReports,
    deleteReport,
    deleteManyReports,
    setSelectedItems,
  } = useReportStore();
  const [dateFilter, setDateFilter] = useState("all");

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  const filteredReports = useMemo(() => {
    if (dateFilter === "all") return reports;
    const startDate = getStartDate(dateFilter);
    return reports.filter((report) =>
      isDateWithinRange(report.createdAt, startDate)
    );
  }, [reports, dateFilter]);

  const handleSelectAll = (e) => {
    if (e.target.checked) {
      setSelectedItems(filteredReports.map((report) => report.id));
    } else {
      setSelectedItems([]);
    }
  };

  const handleSelectItem = (id) => {
    setSelectedItems(
      selectedItems.includes(id)
        ? selectedItems.filter((item) => item !== id)
        : [...selectedItems, id]
    );
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  return (
    <div className="">
      <div className="flex max-md:flex-col gap-4 max-md:justify-start max-md:items-start justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Daftar Laporan</h1>
        <Select value={dateFilter} onValueChange={setDateFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Pilih rentang waktu" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Semua Waktu</SelectItem>
            <SelectItem value="today">Hari Ini</SelectItem>
            <SelectItem value="threeDays">3 Hari Terakhir</SelectItem>
            <SelectItem value="week">Minggu Ini</SelectItem>
            <SelectItem value="month">Bulan Ini</SelectItem>
            <SelectItem value="year">Tahun Ini</SelectItem>
          </SelectContent>
        </Select>

        {selectedItems.length > 0 && (
          <Button
            variant="destructive"
            onClick={() => deleteManyReports(selectedItems)}
            className="flex items-center gap-2"
          >
            <Trash2 className="h-4 w-4" />
            Hapus Terpilih ({selectedItems.length})
          </Button>
        )}
      </div>

      <div className="border rounded-lg overflow-x-auto">
        <table className="w-full">
          <thead className="bg-secondary dark:bg-secondary-foreground">
            <tr>
              <th className="p-4 text-left">
                <input
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300"
                  checked={
                    selectedItems.length === filteredReports.length &&
                    filteredReports.length > 0
                  }
                  onChange={handleSelectAll}
                />
              </th>
              <th className="p-4 text-left font-medium text-gray-600">ID</th>
              <th className="p-4 text-left font-medium text-gray-600">
                Nama Produk
              </th>
              <th className="p-4 text-left font-medium text-gray-600">
                Nama Kategori
              </th>
              <th className="p-4 text-left font-medium text-gray-600">
                Jumlah
              </th>
              <th className="p-4 text-left font-medium text-gray-600">
                Total Harga
              </th>
              <th className="p-4 text-left font-medium text-gray-600">Tipe</th>
              <th className="p-4 text-left font-medium text-gray-600">
                Tanggal Dibuat
              </th>
              <th className="p-4 text-left font-medium text-gray-600">Aksi</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {filteredReports.reverse().map((report, index) => {
              const nameProduct = products.find(
                (product) => product.id === report.productId
              )?.name;

              const categoryName = categories.find(
                (category) => category.id === report.categoryId
              )?.name;
              return (
                <tr key={index} className="hover:bg-secondary">
                  <td className="p-4">
                    <input
                      type="checkbox"
                      className="h-4 w-4 rounded border-gray-300"
                      checked={selectedItems.includes(report.id)}
                      onChange={() => handleSelectItem(report.id)}
                    />
                  </td>
                  <td className="p-4">{report.id}</td>
                  <td className="p-4">{nameProduct || "-"}</td>
                  <td className="p-4">{categoryName || "-"}</td>
                  <td className="p-4">{report.qty}</td>
                  <td className="p-4">
                    {report.total_price
                      ? new Intl.NumberFormat("id-ID", {
                          style: "currency",
                          currency: "IDR",
                        }).format(report.total_price)
                      : "-"}
                  </td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs ${
                        report.type === "in"
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {report.type === "in" ? "Masuk" : "Keluar"}
                    </span>
                  </td>
                  <td className="p-4">{formatDate(report.createdAt)}</td>
                  <td className="p-4">
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteReport(report.id)}
                      className="h-8 w-8 p-0"
                    >
                      <Trash2 className="h-4 w-4 text-white" />
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportPage;
