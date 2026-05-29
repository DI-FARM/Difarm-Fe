import { DataTotals, farmApi, GenderData } from "@/lib/api";
import { useEffect, useState } from "react";
import MetricsSection from "./components/MetricsSection";
import { MetricCardsShimmer } from "@/components/custom/loaders/cards-shimmer";
import { getFarmId } from "@/utils/farmId";

export interface MetricsData {
  cattleGenders: GenderData;
  totalVaccinations: DataTotals;
  totalInseminations: DataTotals;
}

export default function MetricsPage() {
  const farmId = getFarmId();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [metrics, setMetrics] = useState<MetricsData | null>(null);

  useEffect(() => {
    if (!farmId) {
      setError("No farm selected. Choose a farm from the menu.");
      return;
    }

    let cancelled = false;

    async function getFarmMetrics() {
      setLoading(true);
      setError(null);
      try {
        const [cattleGenders, totalVaccinations, totalInseminations] =
          await Promise.all([
            farmApi.getCattlesByGender(farmId),
            farmApi.getVaccinationsTotal(farmId),
            farmApi.getInseminationsTotal(farmId),
          ]);

        if (cancelled) return;
        setMetrics({
          cattleGenders: cattleGenders.data,
          totalVaccinations: totalVaccinations.data,
          totalInseminations: totalInseminations.data,
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
  }, [farmId]);

  if (!farmId) {
    return (
      <p className="text-gray-600 dark:text-gray-400">
        No farm selected. Choose a farm to view dashboard metrics.
      </p>
    );
  }
  if (loading) return <MetricCardsShimmer />;
  if (error) return <p className="text-red-600">Error: {error}</p>;
  return <MetricsSection metrics={metrics} />;
}
