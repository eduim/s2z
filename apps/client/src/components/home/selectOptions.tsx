import { countryCode, simulationMode } from "@/lib/simulator";
import { countryCodeType, simulationModeType } from "@/types";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const SelectOptions = () => {
  return (
    <div className="flex gap-3">
      <Select>
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
      <Select>
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
