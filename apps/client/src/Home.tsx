import AddPurchase from "./components/home/addPurchase";
import useSimulator from "./customHooks/useSimulator";
import { countriesEmissionsPp } from "./lib/simulator";
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
    simulationState,
  } = useSimulator();

  const lastDate = data.length > 0 ? data[data.length - 1].date : new Date();

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
        <Card className="w-[500px] flex flex-col justify-around p-8 m-4">
          <CardTitle>
            Average CO2 consumption per person {countriesEmissionsPp[country]}{" "}
            tons
          </CardTitle>
          {simulationState?.costs.totalCost && (
            <CardTitle>
              Total cost for neutral Carbon ${simulationState?.costs.totalCost}
            </CardTitle>
          )}
          {simulationState && simulationState.offSet.length > 0 && (
            <CardTitle>
              Date to achieve neutrality{" "}
              {simulationState.offSet[simulationState.offSet.length - 1].date}
            </CardTitle>
          )}
        </Card>
      </div>
      <Card>
        <CardContent>
          <Purchases data={data} deletePurchase={deletePurchase} />
        </CardContent>
      </Card>
      {simulationState && <Graph data={simulationState.offSet} />}
      {simulationState && <Graph data={simulationState.costs.costsSeries} />}
    </>
  );
}
