import AddPurchase from "./components/home/addPurchase";
import useSimulator from "./customHooks/useSimulator";
import { countriesEmissionsPp, offsetSimulator } from "./lib/simulator";
import { Card, CardContent, CardHeader, CardTitle } from "./components/ui/card";
import SelectOptions from "./components/home/selectOptions";
import Purchases from "./components/home/purchases";
import Graph from "./components/home/graph";

export default function Home() {
  const {
    data,
    country,
    mode,
    addPurchase,
    deletePurchase,
    changeCountry,
    changeMode,
  } = useSimulator();

  const lastDate = data.length > 0 ? data[data.length - 1].date : new Date();
  console.log(offsetSimulator(data, 1500, mode));
  return (
    <>
      <div className="flex justify-between">
        <Card className="w-[500px] flex flex-col m-4">
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
        <Card className="w-[500px] flex flex-col justify-between m-4">
          <CardHeader>
            <CardTitle>
              Average CO2 consumption per person {countriesEmissionsPp[country]}{" "}
              tons
            </CardTitle>
          </CardHeader>
        </Card>
      </div>
      <Card>
        <CardContent>
          <Purchases data={data} deletePurchase={deletePurchase} />
        </CardContent>
      </Card>
      <Graph />
    </>
  );
}
