import { simulationModeType } from "@/types";
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

export const parseDateStringToDate = (dateString: string): Date => {
  const [year, month, day] = dateString.split("-").map(Number);
  return new Date(year, month - 1, day);
};

export const addDateInterval = (
  originalDate: Date,
  interval: simulationModeType,
  amount = 1
) => {
  const date = new Date(originalDate);

  if (interval === "M") {
    date.setMonth(date.getMonth() + amount);
  } else if (interval === "Q") {
    date.setMonth(date.getMonth() + amount * 3);
  } else if (interval === "Y") {
    date.setFullYear(date.getFullYear() + amount);
  }
  return date;
};

export const unitPonderatedMode = (
  interval: simulationModeType,
  unit: number
) => {
  if (interval === "M") {
    return unit / 12;
  } else if (interval === "Q") {
    return unit / 4;
  }
  return unit;
};

export const truncateDate = (date: Date, interval: simulationModeType) => {
  const truncatedDate = new Date(date);

  if (interval === "M") {
    truncatedDate.setDate(1);
  } else if (interval === "Q") {
    const quarterMonth = Math.floor(truncatedDate.getMonth() / 3) * 3;
    truncatedDate.setMonth(quarterMonth);
    truncatedDate.setDate(1);
  } else if (interval === "Y") {
    truncatedDate.setMonth(0);
    truncatedDate.setDate(1);
  }

  truncatedDate.setHours(0, 0, 0, 0);
  return truncatedDate;
};
