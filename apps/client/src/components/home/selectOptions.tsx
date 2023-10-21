import { countryCode, simulationMode } from "@/lib/simulator";
import {
  countryCodeType,
  simulationModeType,
  selectOptionsProps,
} from "@/types";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectOptions = ({
  country,
  changeCountry,
  mode,
  changeMode,
}: selectOptionsProps) => {
  return (
    <div className="flex gap-3">
      <Select
        onValueChange={(value) => changeCountry(value as countryCodeType)}
        defaultValue={country}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Country" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(countryCode).map((country) => {
            return (
              <SelectItem key={`${country}`} value={`${country}`}>
                {countryCode[country as countryCodeType]}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
      <Select
        onValueChange={(value) => changeMode(value as simulationModeType)}
        defaultValue={mode}
      >
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Simulation Mode" />
        </SelectTrigger>
        <SelectContent>
          {Object.keys(simulationMode).map((mode) => {
            return (
              <SelectItem key={`${mode}`} value={`${mode}`}>
                {simulationMode[mode as simulationModeType]}
              </SelectItem>
            );
          })}
        </SelectContent>
      </Select>
    </div>
  );
};

export default SelectOptions;
