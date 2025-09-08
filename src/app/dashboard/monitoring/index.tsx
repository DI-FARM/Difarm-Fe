import BatteryLevelCard from "./battery/batteryLevel";
import CowInfoCards from "./cowInfoCards";
import HeartRateChart from "./heartRateChart";
import { LocationTrackingCard } from "./location/locationTrackingCard";
import { TemperatureChart } from "./temperature-chart";

export default function Monitoring() {
  return (
    <div className="min-h-screen bg-background px-8 py-2">
      <div className="mx-auto space-y-6">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold tracking-tight text-balance">
            Cow Health Monitoring Dashboard
          </h1>
          <p className="text-muted-foreground text-pretty">
            Real-time health metrics and location tracking for livestock
            management
          </p>
        </div>
        <BatteryLevelCard />
        <CowInfoCards />
        <div className="grid gap-6 grid-flow-cols-1 grid-cols-1 lg:grid-cols-2">
          <TemperatureChart />
          <HeartRateChart />
        </div>
        <LocationTrackingCard />
      </div>
    </div>
  );
}
