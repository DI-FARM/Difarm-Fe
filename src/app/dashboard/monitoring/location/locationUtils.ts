export interface LocationPoint {
  lat: number;
  lng: number;
  timestamp: string;
  cowId: string;
}

export const generateLocationData = (): LocationPoint[] => {
  const baseLocation = { lat: 40.7128, lng: -74.006 }; // Example farm location
  const data: LocationPoint[] = [];

  for (let i = 0; i < 24; i++) {
    // Simulate cow movement within a 0.01 degree radius (roughly 1km)
    const latOffset = (Math.random() - 0.5) * 0.01;
    const lngOffset = (Math.random() - 0.5) * 0.01;

    data.push({
      lat: baseLocation.lat + latOffset,
      lng: baseLocation.lng + lngOffset,
      timestamp: `${String(i).padStart(2, "0")}:00`,
      cowId: "COW-001",
    });
  }

  return data;
};

export const getLocationBounds = (data: LocationPoint[]) => {
  const lats = data.map((point) => point.lat);
  const lngs = data.map((point) => point.lng);

  return {
    minLat: Math.min(...lats),
    maxLat: Math.max(...lats),
    minLng: Math.min(...lngs),
    maxLng: Math.max(...lngs),
  };
};

export const formatCoordinate = (coord: number): string => {
  return coord.toFixed(6);
};
