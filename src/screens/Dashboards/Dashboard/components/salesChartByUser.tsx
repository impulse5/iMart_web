import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts";

const sellsByUserData = [
    {user: "Beatriz Santos", sells: 20},
    {user: "Carlos Silva", sells: 12},
    {user: "João Souza", sells: 33},
    {user: "Maria Oliveira", sells: 24},
    {user: "Pedro Alves", sells: 17},
    {user: "Rafaela Lima", sells: 10},
  ]  

  const sellsByUserConfig = {
    sells: {
      label: "Vendas",
    },
  } satisfies ChartConfig;


export const SalesChartByUser = () => {
    return (
        <Card className="bg-tertiary border-none">
            <CardHeader>
                <CardTitle className="text-white">Vendas por usuário</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={sellsByUserConfig}>
                <BarChart
                    accessibilityLayer
                    data={sellsByUserData}
                    layout="vertical"
                    margin={{
                    right: 16,
                    }}
                >
                    <CartesianGrid horizontal={false} />
                    <YAxis
                        dataKey="user"
                        type="category"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                        hide
                    />
                    <XAxis dataKey="sells" type="number" hide />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                    />
                    <Bar
                        dataKey="sells"
                        layout="vertical"
                        fill="#2563eb"
                        radius={4}
                    >
                    <LabelList
                        dataKey="user"
                        position="insideLeft"
                        offset={8}
                        className="fill-tertiary font-semibold"
                        fontSize={12}
                    />
                    <LabelList
                        dataKey="sells"
                        position="right"
                        offset={8}
                        className="fill-white"
                        fontSize={12}
                    />
                    </Bar>
                </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}