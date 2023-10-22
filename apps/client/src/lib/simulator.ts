import { purchaseData, simulationModeType } from "@/types";
import {
  addDateInterval,
  parseDateStringToDate,
  getDateString,
  unitPonderatedMode,
  truncateDate,
} from "./utils";

export const countriesEmissionsPp = {
  US: 15.52,
  UK: 5.55,
  DE: 9.44,
  ZA: 6.95,
  IN: 1.91,
  CN: 7.38,
  SG: 8.56,
  AU: 17.1,
};

export const countryCode = {
  US: "United States",
  UK: "United Kindgom",
  DE: "Germany",
  ZA: "South Africa",
  IN: "India",
  CN: "China",
  SG: "Singapore",
  AU: "Australia",
};

export const simulationMode = {
  M: "Month",
  Q: "Quarter",
  Y: "Year",
};

export const offsetSimulator = (
  data: purchaseData[],
  consumption: number,
  mode: simulationModeType
) => {
  if (data.length === 0) return;

  const unitaryCompensation = 28.5;
  let offSetCarbonTotal = 0;
  let currentDate = parseDateStringToDate(data[0].date.toString());
  const offSetSeries = [];

  while (offSetCarbonTotal < consumption) {
    // calculate for each purchase offset compensation
    const offSetCarbonCurrentDateBatches = data.map((purchase) => {
      const age =
        currentDate.getFullYear() -
        parseDateStringToDate(purchase.date.toString()).getFullYear();

      if (age < 0) return 0;

      let offsetBatch;
      if (age >= 6) {
        offsetBatch = unitPonderatedMode(mode, unitaryCompensation);
      } else {
        offsetBatch = unitPonderatedMode(mode, unitaryCompensation * (age / 6));
      }

      return offsetBatch * purchase.trees;
    });

    // calculate the total of the date with all the batches of purchases
    const offSetCarbonCurrentDate = offSetCarbonCurrentDateBatches.reduce(
      (acc, current) => {
        return acc + current;
      },
      0
    );

    offSetCarbonTotal += offSetCarbonCurrentDate;
    // add to time series
    offSetSeries.push({
      date: getDateString(currentDate),
      total: offSetCarbonTotal,
    });
    currentDate = addDateInterval(currentDate, mode);
  }

  return offSetSeries;
};

export const costsSimulator = (
  data: purchaseData[],
  lengthSeries: number,
  mode: simulationModeType
) => {
  if (lengthSeries === 0) return { costsSeries: [], totalCost: 0 };

  let currentDate = parseDateStringToDate(data[0].date.toString());
  const costsSeries = [];

  const costTree = 120;
  const maintenanceTree = 12;
  let totalCost = 0;

  for (let i = 0; i < lengthSeries; i++) {
    const costsCurrentDateBatches = data.map((purchase) => {
      const isAquistionDate =
        getDateString(currentDate) === getDateString(purchase.date);
      const age =
        currentDate.getFullYear() -
        parseDateStringToDate(purchase.date.toString()).getFullYear();
      let cost = 0;
      if (age === 0 && isAquistionDate) cost = costTree * purchase.trees;
      if (age > 0) cost = maintenanceTree * purchase.trees;
      return {
        date: purchase.date,
        cost,
        truncated: getDateString(truncateDate(purchase.date, mode)),
      };
    });

    const costsCurrentDate = costsCurrentDateBatches.reduce((acc, current) => {
      return acc + current.cost;
    }, 0);

    totalCost += costsCurrentDate;

    costsSeries.push({
      date: getDateString(currentDate),
      total: totalCost,
    });
    currentDate = addDateInterval(currentDate, mode);
  }

  return { costsSeries, totalCost };
};
