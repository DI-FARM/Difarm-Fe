interface BatteryStatusProps {
  lastUpdated: string;
  batteryLevel: number;
}

const BatteryStatus = ({ lastUpdated, batteryLevel }: BatteryStatusProps) => {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        paddingTop: "16px",
        borderTop: "1px solid #f3f4f6",
      }}
    >
      <span
        style={{
          fontSize: "14px",
          color: "#6b7280",
        }}
      >
        Last updated: {lastUpdated}
      </span>
      <div
        style={{
          width: "8px",
          height: "8px",
          borderRadius: "50%",
          backgroundColor: batteryLevel > 20 ? "#22c55e" : "#ef4444",
        }}
      />
    </div>
  );
};

export default BatteryStatus;
