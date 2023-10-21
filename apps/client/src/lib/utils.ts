import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getDateString = (date: Date | string) => {
  if (typeof date === "string") return date;
  const month = (date.getMonth() + 1).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return `${date.getFullYear()}-${month}-${day}`;
};

export const errorMatch = (error: string) => {
  if (error === "max") return "Max number input exceeded";
  if (error === "required") return "Required number as input";
  if (error === "min") return "Min number required input 1";
  return "Error";
};
