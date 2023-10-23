import { countryCode, simulationMode } from "../lib/simulator";

export type countryCodeType = keyof typeof countryCode;
export type simulationModeType = keyof typeof simulationMode;

export type formInputs = {
  date: Date;
  trees: number;
};

export type purchaseData = {
  id: string;
  date: Date;
  trees: number;
};

export type simulatorDataType = {
  country: countryCodeType;
  mode: simulationModeType;
  data: purchaseData[];
};

export type simulatorActionType =
  | { type: "ADD PURCHASE"; payload: FormInputs }
  | { type: "DELETE PURCHASE"; payload: string }
  | { type: "CHANGE MODE"; payload: simulationModeType }
  | { type: "CHANGE COUNTRY"; payload: countryCodeType };

export type selectOptionsProps = {
  country: countryCodeType;
  changeCountry: (country: countryCodeType) => void;
  mode: simulationModeType;
  changeMode: (mode: simulationModeType) => void;
};

export type addPurchaseProps = {
  lastDate: Date;
  addPurchase: (formData: formInputs) => void;
};

export type purchasesProps = {
  data: purchaseData[];
  deletePurchase: (id: string) => void;
};

export type graphProps = {
  data: offSetSeries[] | undefined;
};

export type offSetSeries = {
  date: string;
  total: number;
};

export type simulationResponseType = {
  simulation: simulationType;
};

export type simulationType = {
  country: countryCodeType;
  mode: simulationModeType;
  offSet: offSetSeries[];
  costs: costsSeries;
};

export type costsSeries = {
  costsSeries: offSetSeries[];
  totalCost: number;
};
