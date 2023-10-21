import { countryCode, simulationMode } from "../lib/simulator";

export type countryCodeType = keyof typeof countryCode;
export type simulationModeType = keyof typeof simulationMode;

export type FormInputs = {
  date: Date;
  trees: number;
};
