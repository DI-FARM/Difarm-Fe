import { useEffect, useState } from "react";
import { DatePicker } from "antd";
import { farmApi, InseminationData, VaccinationData } from "@/lib/api";
import LineChart from "@/components/custom/LineChart";
import ChartWrapperShimmerCard from "@/components/custom/loaders/chart-wrapper-shimmer";
import dayjs from "dayjs";
import { getFarmId } from "@/utils/farmId";

interface SeasonalData {
  insemination: InseminationData;
  vaccination: VaccinationData;
}
export default function OverTime() {
  const farmId = getFarmId();
  const [value, setValue] = useState<number>(new Date().getFullYear());
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [seasonalData, setSeasonalData] = useState<SeasonalData | null>(null);
  const handleDateChange = (year: number) => {
    setValue(year);
  };

  useEffect(() => {
    if (!farmId) {
      setError("No farm selected.");
      setSeasonalData(null);
      return;
    }

    let cancelled = false;

    async function getFarmMetrics() {
      setLoading(true);
      setError(null);
      try {
        const year = String(value);
        const [insemination, vaccination] = await Promise.all([
          farmApi.getInseminationsByYear(farmId, year),
          farmApi.getVaccinationsByYear(farmId, year),
        ]);

        if (cancelled) return;
        setSeasonalData({
          insemination: insemination.data,
          vaccination: vaccination.data,
        });
      } catch (err: unknown) {
        if (cancelled) return;
        const message =
          err instanceof Error ? err.message : "Something went wrong";
        setError(message);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    getFarmMetrics();
    return () => {
      cancelled = true;
    };
  }, [value, farmId]);

  if (!farmId) {
    return (
      <p className="mt-5 text-gray-600 dark:text-gray-400">
        No farm selected. Choose a farm to view health and breeding charts.
      </p>
    );
  }

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
