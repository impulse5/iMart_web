import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { CartesianGrid, XAxis, Area, AreaChart } from "recharts";

const sellsByWeekDayData = [
    { weekDay: "Segunda", sells: 33 },
    { weekDay: "Terça", sells: 67 },
    { weekDay: "Quarta", sells: 46 },
    { weekDay: "Quinta", sells: 45 },
    { weekDay: "Sexta", sells: 99 },
    { weekDay: "Sábado", sells: 108 },
    { weekDay: "Domingo", sells: 55 },
  ];

  const sellsByWeekConfig = {
    sells: {
      label: "Vendas",
    },
  } satisfies ChartConfig

export const SalesChartByWeekDay = () => {
    return (
        <Card className="bg-tertiary border-none">
        <CardHeader>
            <CardTitle className="text-white">Vendas na semana</CardTitle>
            <CardDescription>
                Showing total visitors for the last 6 months
                </CardDescription>
            </CardHeader>
        <CardContent>
        <ChartContainer config={sellsByWeekConfig}>
                <AreaChart
                    accessibilityLayer
                    data={sellsByWeekDayData}
                    margin={{
                    left: 12,
                    right: 12,
                    }}
                >
                <CartesianGrid vertical={false} />
                <XAxis
                    dataKey="weekDay"
                    tickLine={false}
                    axisLine={false}
                    tickMargin={8}
                    tickFormatter={(value) => value.slice(0, 3)}
                />
                <ChartTooltip
                    cursor={false}
                    content={<ChartTooltipContent indicator="line" />}
                />
                <Area
                    dataKey="sells"
                    type="natural"
                    fill="#2563eb"
                    fillOpacity={0.4}
                    stroke="#88aeff"
                />
            </AreaChart>
            </ChartContainer>
        </CardContent>
    </Card>
    )
}