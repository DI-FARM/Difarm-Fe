export const getBatteryColor = (level: number): string => {
  if (level > 50) return "#22c55e"; // green
  if (level > 20) return "#f59e0b"; // yellow
  return "#ef4444"; // red
};

export const getBatteryStatus = (level: number): "good" | "medium" | "low" => {
  if (level > 50) return "good";
  if (level > 20) return "medium";
  return "low";
};
