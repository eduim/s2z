const BASE_URL = import.meta.env.VITE_BASE_URL;

import { purchaseData, simulationModeType, countryCodeType } from "@/types";

const API = {
  async saveSimulation(
    data: purchaseData[],
    mode: simulationModeType,
    country: countryCodeType
  ) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data, mode, country }),
    };
    const response = await fetch(`${BASE_URL}/simulation`, options);
    return await response.json();
  },
  async getSimulation(id: number) {
    const response = await fetch(`${BASE_URL}/simulation/${id}`);
    return await response.json();
  },
  async updateSimulation(
    id: number,
    data: purchaseData[],
    mode: simulationModeType,
    country: countryCodeType
  ) {
    const options = {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data, mode, country }),
    };
    const response = await fetch(`${BASE_URL}/simulation/${id}`, options);
    return await response.json();
  },
  async calculateSimulation(
    data: purchaseData[],
    mode: simulationModeType,
    country: countryCodeType
  ) {
    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ data, mode, country }),
    };
    const response = await fetch(`${BASE_URL}/simulation/calculate`, options);
    return await response.json();
  },
};

export default API;
