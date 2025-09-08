import BatteryIcon from "./batteryIcon";
import BatteryStatus from "./batteryStatus";
import { getBatteryColor } from "./batteryUtils";

const BatteryLevelCard = () => {
  const batteryLevel = 78; // this will be in percentage
  const isCharging = false;
  const lastUpdated = "2 minutes ago";

  const batteryColor = getBatteryColor(batteryLevel);

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "8px",
        padding: "24px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
        border: "1px solid #e5e7eb",
        width: "100%",
        maxWidth: "400px",
      }}
      // className="w-full max-w-md bg-white dark:bg-black-dark-light rounded-lg shadow-md p-4"
    >
      {/* Header */}
      <div style={{ marginBottom: "20px" }}>
        <h3
          style={{
            fontSize: "18px",
            fontWeight: "600",
            color: "#111827",
            margin: "0 0 4px 0",
          }}
        >
          Device Battery
        </h3>
        <p
          style={{
            fontSize: "14px",
            color: "#6b7280",
            margin: 0,
          }}
        >
          Cow monitoring device status
        </p>
      </div>

      {/* Battery Visual */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "16px",
          marginBottom: "16px",
        }}
      >
        <BatteryIcon level={batteryLevel} color={batteryColor} />

        {/* Battery Percentage */}
        <div >
          <div
            style={{
              fontSize: "32px",
              fontWeight: "700",
              color: batteryColor,
              lineHeight: "1",
            }}
          >
            {batteryLevel}%
          </div>
          {isCharging && (
            <div
              style={{
                fontSize: "12px",
                color: "#059669",
                fontWeight: "500",
              }}
            >
              Charging
            </div>
          )}
        </div>
      </div>

      <BatteryStatus lastUpdated={lastUpdated} batteryLevel={batteryLevel} />
    </div>
  );
};

export default BatteryLevelCard;
