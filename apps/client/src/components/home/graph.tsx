import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import { graphProps } from "@/types";
import { Card, CardContent } from "../ui/card";
<Card>
  <CardContent></CardContent>
</Card>;
const Graph = ({ data }: graphProps) => {
  return (
    <Card className="my-4">
      <CardContent>
        <ResponsiveContainer className="my-5" width="100%" height={350}>
          <BarChart data={data}>
            <XAxis
              dataKey="date"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
            />
            <YAxis
              dataKey="total"
              stroke="#888888"
              fontSize={12}
              tickLine={false}
              axisLine={false}
              tickFormatter={(value) => `${value}`}
            />
            <Bar dataKey="total" fill="#adfa1d" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};
export default Graph;
