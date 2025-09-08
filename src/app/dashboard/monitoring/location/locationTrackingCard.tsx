import type React from "react";
import { generateLocationData, getLocationBounds } from "./locationUtils";
import { LocationScatter } from "./locationScatter";

export const LocationTrackingCard: React.FC = () => {
  const locationData = generateLocationData();
  const bounds = getLocationBounds(locationData);

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "8px",
        padding: "24px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        border: "1px solid #e5e7eb",
      }}
    >
      <div style={{ marginBottom: "16px" }}>
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "600",
            margin: "0 0 4px 0",
            color: "#111827",
          }}
        >
          Cow Location Tracking
        </h3>
        <p
          style={{
            fontSize: "14px",
            color: "#6b7280",
            margin: "0",
          }}
        >
          GPS coordinates showing movement patterns over 24 hours
        </p>
      </div>

      <LocationScatter data={locationData} />

      <div
        style={{
          marginTop: "16px",
          padding: "12px",
          backgroundColor: "#f9fafb",
          borderRadius: "6px",
          display: "flex",
          justifyContent: "space-between",
          fontSize: "12px",
          color: "#374151",
        }}
      >
        <div>
          <strong>Range:</strong>{" "}
          {((bounds.maxLat - bounds.minLat) * 111000).toFixed(0)}m ×{" "}
          {((bounds.maxLng - bounds.minLng) * 111000).toFixed(0)}m
        </div>
        <div>
          <strong>Points:</strong> {locationData.length}
        </div>
      </div>
    </div>
  );
};
