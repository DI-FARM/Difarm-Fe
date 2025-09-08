import {
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  Area,
  AreaChart,
} from "recharts";
import { temperatureData } from "./data";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "white",
          border: "1px solid #ccc",
          borderRadius: "4px",
          padding: "8px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <p style={{ margin: 0, fontSize: "14px", fontWeight: "bold" }}>{`Time: ${label}`}</p>
        <p style={{ margin: 0, fontSize: "14px", color: "#2563eb" }}>{`Temperature: ${payload[0].value}°C`}</p>
      </div>
    )
  }
  return null
}

export function TemperatureChart() {
  return (
    <div
      style={{
        backgroundColor: "white",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "24px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "bold",
            margin: "0 0 4px 0",
            color: "#111827",
          }}
        >
          Body Temperature
        </h3>
        <p
          style={{
            fontSize: "14px",
            color: "#6b7280",
            margin: 0,
          }}
        >
          Temperature readings over 24 hours
        </p>
      </div>

      <div style={{ height: "300px", width: "100%" }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={temperatureData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis
              dataKey="time"
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={{ stroke: "#d1d5db" }}
              tickLine={{ stroke: "#d1d5db" }}
            />
            <YAxis
              domain={["dataMin - 0.5", "dataMax + 0.5"]}
              tick={{ fontSize: 12, fill: "#6b7280" }}
              axisLine={{ stroke: "#d1d5db" }}
              tickLine={{ stroke: "#d1d5db" }}
              label={{ value: "°C", angle: -90, position: "insideLeft", style: { textAnchor: "middle" } }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="temperature"
              stroke="#2563eb"
              strokeWidth={2}
              fill="#3b82f6"
              fillOpacity={0.3}
              dot={{ fill: "#2563eb", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "#2563eb", strokeWidth: 2, fill: "#2563eb" }}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}