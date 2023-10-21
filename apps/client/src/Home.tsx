import AddPurchase from "./components/home/addPurchase";
import useSimulator from "./customHooks/useSimulator";

import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import SelectOptions from "./components/home/selectOptions";
export default function Home() {
  const {
    data,
    country,
    mode,
    addPurchase,
    // deletePurchase,
    changeCountry,
    changeMode,
  } = useSimulator();

  const lastDate = data.length > 0 ? data[data.length - 1].date : new Date();

  return (
    <>
      <Card className="w-[500px] flex flex-col pt-4">
        <CardHeader>
          <CardTitle>New purchase</CardTitle>
        </CardHeader>
        <CardContent>
          <SelectOptions
            country={country}
            changeCountry={changeCountry}
            mode={mode}
            changeMode={changeMode}
          />
          <AddPurchase lastDate={lastDate} addPurchase={addPurchase} />
        </CardContent>
      </Card>
    </>
  );
}
