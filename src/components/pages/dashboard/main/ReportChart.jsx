"use client";

import { useEffect, useMemo } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useReportStore } from "@/store/report";
import { Link, useLocation } from "react-router-dom";

function ReportChart() {
  const { fetchReports, reports } = useReportStore();
  const { pathname } = useLocation();

  // Ambil data saat komponen di-mount
  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  // Proses data untuk chart
  const chartData = useMemo(() => {
    if (!Array.isArray(reports) || reports.length === 0) {
      return [];
    }

    const groupedData = reports.reduce((acc, curr) => {
      // Validasi dan parsing tanggal
      const date = curr?.createdAt?.split("T")[0]; // Ambil hanya tanggal
      if (!date || !curr.type || typeof curr.qty !== "number") return acc;

      if (!acc[date]) {
        acc[date] = { day: date, in: 0, out: 0 }; // Inisialisasi
      }

      // Tambahkan qty berdasarkan tipe
      if (curr.type === "in") {
        acc[date].in += curr.qty;
      } else if (curr.type === "out") {
        acc[date].out += curr.qty;
      }

      return acc;
    }, {});

    return Object.values(groupedData); // Ubah dari object ke array
  }, [reports]);

  const chartConfig = {
    desktop: {
      label: "in",
      color: "hsl(var(--chart-2))",
    },
    mobile: {
      label: "out",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Analisis</CardTitle>
        <CardDescription>
          Laporan Analisis Data Barang Masuk dan Keluar per-hari
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer config={chartConfig}>
          <BarChart accessibilityLayer data={chartData.reverse()}>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="day"
              tickLine={false}
              tickMargin={10}
              axisLine={false}
            />
            <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
            <Bar dataKey="in" fill="hsl(var(--chart-2))" radius={4} />
            <Bar dataKey="out" fill="hsl(var(--chart-1))" radius={4} />
          </BarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="w-full items-center justify-center">
        <Link
          to={"/dashboard/analysis"}
          className={`text-sm text-primary underline text-center ${
            pathname === "/dashboard/analysis" ? "hidden" : ""
          }`}
        >
          Show All Analysis
        </Link>
      </CardFooter>
    </Card>
  );
}

export default ReportChart;
