import type React from "react";
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { LocationPoint } from "./locationUtils";

interface LocationScatterProps {
  data: LocationPoint[];
}

const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    const data = payload[0].payload;
    return (
      <div
        style={{
          backgroundColor: "white",
          padding: "8px 12px",
          border: "1px solid #ccc",
          borderRadius: "4px",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <p style={{ margin: "0 0 4px 0", fontWeight: "bold" }}>{data.cowId}</p>
        <p style={{ margin: "0 0 2px 0", fontSize: "12px" }}>
          Lat: {data.lat.toFixed(6)}
        </p>
        <p style={{ margin: "0 0 2px 0", fontSize: "12px" }}>
          Lng: {data.lng.toFixed(6)}
        </p>
        <p style={{ margin: "0", fontSize: "12px", color: "#666" }}>
          Time: {data.timestamp}
        </p>
      </div>
    );
  }
  return null;
};

export const LocationScatter: React.FC<LocationScatterProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <ScatterChart
        data={data}
        margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="#e0e0e0" />
        <XAxis
          type="number"
          dataKey="lng"
          name="Longitude"
          domain={["dataMin - 0.001", "dataMax + 0.001"]}
          tickFormatter={(value) => value.toFixed(4)}
          fontSize={12}
        />
        <YAxis
          type="number"
          dataKey="lat"
          name="Latitude"
          domain={["dataMin - 0.001", "dataMax + 0.001"]}
          tickFormatter={(value) => value.toFixed(4)}
          fontSize={12}
        />
        <Tooltip content={<CustomTooltip />} />
        <Scatter
          name="Cow Location"
          data={data}
          fill="#2563eb"
          stroke="#1d4ed8"
          strokeWidth={1}
          r={6}
        />
      </ScatterChart>
    </ResponsiveContainer>
  );
};
