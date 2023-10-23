import { useEffect, useReducer, useState } from "react";
import {
  countryCodeType,
  simulationModeType,
  simulatorDataType,
  simulatorActionType,
  formInputs,
  simulationResponseType,
  simulationType,
} from "@/types";
import API from "@/lib/api";

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
    const id = `${state.data.length}.${action.payload.date}.${action.payload.trees}`;

    const dateExists = state.data.filter(
      (purchase) => purchase.date === action.payload.date
    );

    let data = [
      ...state.data,
      { id, date: action.payload.date, trees: action.payload.trees },
    ];

    if (dateExists.length !== 0) {
      data = state.data.map((purchase) => {
        if (purchase.date !== action.payload.date) return purchase;
        return {
          id: purchase.id,
          date: purchase.date,
          trees: Math.min(
            parseInt(purchase.trees.toString()) +
              parseInt(action.payload.trees),
            55
          ),
        };
      });
    }

    return {
      ...state,
      data,
    };
  }

  return state;
};

const useSimulator = () => {
  const [{ data, country, mode }, dispatch] = useReducer(reducer, initialData);
  const [simulation, setSimulation] = useState<simulationType | undefined>();

  useEffect(() => {
    calculateSimulation();
  }, [data, country, mode]);

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

  const calculateSimulation = async () => {
    const simulation: simulationResponseType = await API.saveSimulation(
      data,
      mode,
      country
    );
    setSimulation(simulation.simulation);
  };

  return {
    data,
    country,
    mode,
    addPurchase,
    deletePurchase,
    changeCountry,
    changeMode,
    simulation,
  };
};

export default useSimulator;
