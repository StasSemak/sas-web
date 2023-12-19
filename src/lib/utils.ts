import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
 
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPoints(points: number) {
  const pointsStr = points.toString();

  if(pointsStr === "11" || pointsStr === "12") return "балів";
  if(pointsStr === "1" || pointsStr.endsWith("1")) return "бал";
  if(pointsStr.endsWith("2") || pointsStr.endsWith("3")) return "бали";
  
  return "балів";
}