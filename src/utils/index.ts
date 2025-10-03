import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export  { storage } from "./storage";
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
