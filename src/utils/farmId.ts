export const FARM_ID_KEY = 'FarmId';

/** Returns a valid farm id from localStorage, or null if missing/invalid. */
export function getFarmId(): string | null {
  const id = localStorage.getItem(FARM_ID_KEY);
  if (!id || id === 'null' || id === 'undefined') {
    return null;
  }
  return id;
}

export function setFarmId(farmId: string): void {
  localStorage.setItem(FARM_ID_KEY, farmId);
}

export function clearFarmId(): void {
  localStorage.removeItem(FARM_ID_KEY);
}
