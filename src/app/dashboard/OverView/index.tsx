import MetricsPage from "./MetricsPage";
import OverTime from "./components/OverTime";

export default function Overview() {
  return (
    <div>
      <div className="mb-5">
        <h1 className="text-2xl font-semibold dark:text-white">Cattle Overview Dashboard</h1>
        {/* a short description for the overview dashboard */}
        <p>A Clear Overview of Herd Health and Farm Performance at a Glance</p>
      </div>
      <MetricsPage />
      <OverTime />
    </div>
  );
}
