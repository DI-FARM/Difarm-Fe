import type React from "react"
import InfoCard from "./infoCard"

const CowInfoCards: React.FC = () => {
  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
        gap: "16px",
        marginBottom: "24px",
      }}
    >
      <InfoCard title="Cow ID">
        <p
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            color: "#111827",
            margin: "0",
          }}
        >
          Bella (A102)
        </p>
      </InfoCard>

      <InfoCard title="Weight">
        <p
          style={{
            fontSize: "24px",
            fontWeight: "600",
            color: "#111827",
            margin: "0",
          }}
        >
          450 kg
        </p>
      </InfoCard>

      <InfoCard title="Health Status">
        <span
          style={{
            display: "inline-block",
            backgroundColor: "#10b981",
            color: "white",
            padding: "6px 12px",
            borderRadius: "20px",
            fontSize: "14px",
            fontWeight: "500",
          }}
        >
          Healthy
        </span>
      </InfoCard>

      <InfoCard title="Age & Breed">
        <p
          style={{
            fontSize: "18px",
            fontWeight: "500",
            color: "#111827",
            margin: "0",
          }}
        >
          3 years, Friesian
        </p>
      </InfoCard>
            <InfoCard title="Last Vaccination">
        <div>
          <p
            style={{
              fontSize: "16px",
              fontWeight: "600",
              color: "#111827",
              margin: "0 0 4px 0",
            }}
          >
            Dec 15, 2024
          </p>
          <p
            style={{
              fontSize: "14px",
              color: "#6b7280",
              margin: "0",
            }}
          >
            FMD & Anthrax
          </p>
        </div>
      </InfoCard>
    </div>
  )
}

export default CowInfoCards
