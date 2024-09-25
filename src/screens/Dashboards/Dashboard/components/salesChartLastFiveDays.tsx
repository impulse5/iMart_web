import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { RadarChart, PolarAngleAxis, PolarGrid, Radar } from "recharts";

const sellsLastFiveDaysData = [
    { day: "Segunda", sells: 53 },
    { day: "Terça", sells: 67 },
    { day: "Quarta", sells: 51 },
    { day: "Quinta", sells: 61 },
    { day: "Sexta", sells: 99 },
  ]

  const sellsLastFiveDaysConfig = {
    day: {
        label: "Dia",
        color: "#2563eb",
    },
    sells: {
        label: "Vendas",
    },
  } satisfies ChartConfig;
export const SalesChartLastFiveDays = () => {
    return (
        <Card className="bg-tertiary border-none">
                <CardHeader className="items-center pb-4">
                    <CardTitle className="text-white">Vendas nos últimos 5 dias </CardTitle>
                    <CardDescription>
                     Total de vendas nos últimos 5 dias
                    </CardDescription>
                </CardHeader>
                <CardContent className="pb-0">
                    <ChartContainer
                        config={sellsLastFiveDaysConfig}
                        className="mx-auto aspect-square max-h-[288px]"
                    >
                    <RadarChart data={sellsLastFiveDaysData}>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
                        <PolarAngleAxis dataKey="day" />
                        <PolarGrid />
                        <Radar
                            dataKey="sells"
                            fill="#2563eb"
                            fillOpacity={0.8}
                        />
                    </RadarChart>
                    </ChartContainer>
                </CardContent>
            </Card>
    )
}