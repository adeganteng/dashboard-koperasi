import ReportChart from "@/components/pages/dashboard/main/ReportChart";

const AnalysisPage = () => {
  return (
    <div>
      <div className="w-full flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Analisis Laporan</h1>
      </div>

      <ReportChart />
    </div>
  );
};

export default AnalysisPage;
