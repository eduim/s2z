import { useReducer } from "react";
import {
  countryCodeType,
  simulationModeType,
  simulatorDataType,
  simulatorActionType,
  formInputs,
} from "@/types";

const initialData: simulatorDataType = {
  country: "UK",
  mode: "M",
  data: [],
};

const reducer = (state: simulatorDataType, action: simulatorActionType) => {
  const { type } = action;
  if (type === "CHANGE MODE") {
    return {
      ...state,
      mode: action.payload,
    };
  }

  if (type === "CHANGE COUNTRY") {
    return {
      ...state,
      country: action.payload,
    };
  }

  if (type === "DELETE PURCHASE") {
    return {
      ...state,
      data: state.data.filter((purchase) => action.payload !== purchase.id),
    };
  }

  if (type === "ADD PURCHASE") {
    const id = state.data.length.toString();
    return {
      ...state,
      data: [
        ...state.data,
        { id, date: action.payload.date, trees: action.payload.trees },
      ],
    };
  }

  return state;
};

const useSimulator = () => {
  const [{ data, country, mode }, dispatch] = useReducer(reducer, initialData);

  const addPurchase = (formData: formInputs) => {
    dispatch({ type: "ADD PURCHASE", payload: formData });
  };
  const deletePurchase = (id: string) => {
    dispatch({ type: "DELETE PURCHASE", payload: id });
  };

  const changeMode = (mode: simulationModeType) => {
    dispatch({ type: "CHANGE MODE", payload: mode });
  };

  const changeCountry = (country: countryCodeType) => {
    dispatch({ type: "CHANGE COUNTRY", payload: country });
  };

  return {
    data,
    country,
    mode,
    addPurchase,
    deletePurchase,
    changeCountry,
    changeMode,
  };
};

export default useSimulator;
