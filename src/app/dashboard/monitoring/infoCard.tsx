import type React from "react"

interface InfoCardProps {
  title: string
  children: React.ReactNode
}

const InfoCard: React.FC<InfoCardProps> = ({ title, children }) => {
  return (
    <div
      style={{
        backgroundColor: "white",
        border: "1px solid #e5e7eb",
        borderRadius: "8px",
        padding: "20px",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.1)",
      }}
    >
      <h3
        style={{
          fontSize: "14px",
          fontWeight: "500",
          color: "#6b7280",
          margin: "0 0 8px 0",
          textTransform: "uppercase",
          letterSpacing: "0.05em",
        }}
      >
        {title}
      </h3>
      <div>{children}</div>
    </div>
  )
}

export default InfoCard
