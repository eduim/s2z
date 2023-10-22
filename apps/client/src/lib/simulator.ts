import { purchaseData, simulationModeType } from "@/types";
import { addDateInterval, parseDateStringToDate } from "./utils";

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
  let prevDate = data[0].date;
  const offsetDataTimeSeries = [];

  while (offSetCarbonTotal < consumption) {
    // offSetCarbonTotal += 50;
    const currentDate = addDateInterval(prevDate, mode);

    // calculate for each purchase offset compensation
    const offSetCarbonCurrentDateBatches = data.map((purchase) => {
      const age =
        currentDate.getFullYear() -
        parseDateStringToDate(purchase.date.toString()).getFullYear();

      let offsetBatch;
      if (age >= 6) {
        offsetBatch = unitaryCompensation;
      } else {
        offsetBatch = unitaryCompensation * (age / 6);
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
    offsetDataTimeSeries.push({
      date: currentDate,
      offsetAccumulated: offSetCarbonTotal,
    });
    prevDate = currentDate;
  }

  return offsetDataTimeSeries;
};

// export const costsSimulator = (data: purchaseData[]) => {
//   const costTree = 120;
//   const maintenanceTree = 12;

//   let totalCost = 0;
//   let totalMaintenance = 0;

//   const costDataTimeSeries = data.map((purchase: purchaseData) => {
//     totalCost = costTree * purchase.trees;

//     return {};
//   });
//   console.log(data);
// };
