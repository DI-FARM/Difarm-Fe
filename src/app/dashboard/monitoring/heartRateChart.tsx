import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { heartRateData } from "./data";

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div
        style={{
          backgroundColor: "white",
          padding: "12px",
          border: "1px solid #ccc",
          borderRadius: "8px",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
        }}
      >
        <p
          style={{ margin: "0 0 4px 0", fontWeight: "bold" }}
        >{`Time: ${label}`}</p>
        <p
          style={{ margin: "0", color: "#e74c3c" }}
        >{`Heart Rate: ${payload[0].value} BPM`}</p>
        <p
          style={{ margin: "0", color: "#95a5a6" }}
        >{`Average: ${payload[1].value} BPM`}</p>
      </div>
    );
  }
  return null;
};

export default function HeartRateChart() {
  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "12px",
        padding: "24px",
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        border: "1px solid #e5e7eb",
      }}
    >
      <div style={{ marginBottom: "20px" }}>
        <h3
          style={{
            margin: "0 0 8px 0",
            fontSize: "20px",
            fontWeight: "600",
            color: "#1f2937",
          }}
        >
          Heart Rate Monitor
        </h3>
        <p
          style={{
            margin: "0",
            fontSize: "14px",
            color: "#6b7280",
          }}
        >
          BPM readings over 24 hours with average baseline
        </p>
      </div>

      <div style={{ width: "100%", height: "300px" }}>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={heartRateData}
            margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#f3f4f6" />
            <XAxis dataKey="time" stroke="#6b7280" fontSize={12} />
            <YAxis
              stroke="#6b7280"
              fontSize={12}
              domain={["dataMin - 5", "dataMax + 5"]}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              type="monotone"
              dataKey="bpm"
              stroke="#e74c3c"
              strokeWidth={3}
              dot={{ fill: "#e74c3c", strokeWidth: 2, r: 4 }}
              activeDot={{ r: 6, stroke: "#e74c3c", strokeWidth: 2 }}
            />
            <Line
              type="monotone"
              dataKey="average"
              stroke="#95a5a6"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={false}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
