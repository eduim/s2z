import AddPurchase from "./components/home/addPurchase";
import useSimulator from "./customHooks/useSimulator";
import {
  countriesEmissionsPp,
  offsetSimulator,
  costsSimulator,
} from "./lib/simulator";
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
  const offSetSeries = offsetSimulator(
    data,
    countriesEmissionsPp[country] * 1000,
    mode
  );

  let seriesLenght = 0;

  if (offSetSeries) seriesLenght = offSetSeries.length;
  console.log(offSetSeries);
  const { costsSeries, totalCost } = costsSimulator(data, seriesLenght, mode);

  console.log(totalCost);

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
      {offSetSeries && <Graph data={offSetSeries} />}
      {costsSeries.length > 0 && <Graph data={costsSeries} />}
    </>
  );
}
