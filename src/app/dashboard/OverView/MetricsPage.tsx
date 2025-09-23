import { DataTotals, farmApi, GenderData } from "@/lib/api";
import { useEffect, useState } from "react";
import MetricsSection from "./components/MetricsSection";
import { MetricCardsShimmer } from "@/components/custom/loaders/cards-shimmer";

export interface MetricsData {
  cattleGenders: GenderData;
  totalVaccinations: DataTotals;
  totalInseminations: DataTotals;
}
export interface MetricsData {}
export default function MetricsPage() {
  const farmId = localStorage.getItem("FarmId");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<MetricsData | null>(null);

  async function getFarmMetrics() {
    setLoading(true);
    setError(null);
    try {
      const [cattleGenders, totalVaccinations, totalInseminations] =
        await Promise.all([
          farmApi.getCattlesByGender(farmId || ""),
          farmApi.getVaccinationsTotal(farmId || ""),
          farmApi.getInseminationsTotal(farmId || ""),
        ]);

      setMetrics({
        cattleGenders: cattleGenders.data,
        totalVaccinations: totalVaccinations.data,
        totalInseminations: totalInseminations.data,
      });
    } catch (err: any) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getFarmMetrics();
  }, []);
  if (loading) return <MetricCardsShimmer />;
  if (error) return <p style={{ color: "red" }}>Error: {error}</p>;
  return <MetricsSection metrics={metrics} />;
}
