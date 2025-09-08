interface BatteryIconProps {
  level: number;
  color: string;
}

const BatteryIcon = ({ level, color }: BatteryIconProps) => {
  return (
    <div
      style={{
        position: "relative",
        width: "60px",
        height: "30px",
        border: `2px solid ${color}`,
        borderRadius: "4px",
        backgroundColor: "#f9fafb",
      }}
    >
      {/* Battery Fill */}
      <div
        style={{
          position: "absolute",
          left: "2px",
          top: "2px",
          bottom: "2px",
          width: `${Math.max(0, (level / 100) * (60 - 8))}px`,
          backgroundColor: color,
          borderRadius: "2px",
          transition: "width 0.3s ease",
        }}
      />
      {/* Battery Terminal */}
      <div
        style={{
          position: "absolute",
          right: "-6px",
          top: "8px",
          bottom: "8px",
          width: "4px",
          backgroundColor: color,
          borderRadius: "0 2px 2px 0",
        }}
      />
    </div>
  );
};

export default BatteryIcon;
