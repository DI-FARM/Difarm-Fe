import { useEffect, useState } from "react";
import { DatePicker } from "antd";
import { farmApi, InseminationData, VaccinationData } from "@/lib/api";
import LineChart from "@/components/custom/LineChart";
import ChartWrapperShimmerCard from "@/components/custom/loaders/chart-wrapper-shimmer";
import dayjs from "dayjs";
interface SeasonalData {
  insemination: InseminationData;
  vaccination: VaccinationData;
}
export default function OverTime() {
  const farmId = localStorage.getItem("FarmId");
  const [value, setValue] = useState<number | null>(2025);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [seasonalData, setSeasonalData] = useState<SeasonalData | null>(null);
  const handleDateChange = (year: number) => {
    setValue(year);
  };

  async function getFarmMetrics() {
    setLoading(true);
    setError(null);
    try {
      const [insemination, vaccination] = await Promise.all([
        farmApi.getInseminationsByYear(farmId || "", value?.toString() || ""),
        farmApi.getVaccinationsByYear(farmId || "", value?.toString() || ""),
      ]);

      setSeasonalData({
        insemination: insemination.data,
        vaccination: vaccination.data,
      });
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }
  useEffect(() => {
    getFarmMetrics();
  }, [value, farmId]);

  return (
    <div className="mt-5 p-2">
      <div className="flex justify-between items-center">
        <h1 className="text-lg dark:text-white font-medium">
          Health & Breeding Records
        </h1>
        <DatePicker
          defaultValue={dayjs("2025", "YYYY")}
          onChange={(date) => handleDateChange(date?.year())}
          picker="year"
          className="dark:bg-transparent dark:text-white dark:border-gray-700"
        />
      </div>

      <div className="mt-5">
        {loading && (
          <div className="flex flex-col gap-5">
            <ChartWrapperShimmerCard />
            <ChartWrapperShimmerCard />
          </div>
        )}
        {error && <div>{error}</div>}
        {seasonalData && !loading && !error && (
          <div className="flex flex-col gap-5">
            <LineChart
              data={seasonalData?.insemination.monthlyData || []}
              title="Insemination Records"
              dataKey="count"
              lineColor="#3b82f6"
              height={400}
              showGrid={true}
              showTooltip={true}
              className="w-full"
            />
            <LineChart
              data={seasonalData?.vaccination.monthlyData || []}
              title="Vaccination Records"
              dataKey="count"
              lineColor="#3b82f6"
              height={400}
              showGrid={true}
              showTooltip={true}
              className="w-full"
            />
          </div>
        )}
      </div>
    </div>
  );
}
