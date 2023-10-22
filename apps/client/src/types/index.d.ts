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
