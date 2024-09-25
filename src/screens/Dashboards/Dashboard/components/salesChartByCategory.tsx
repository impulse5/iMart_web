import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Label, Pie, PieChart } from "recharts";

const sellByCategoryData = [
    { category: "Bebidas", sells: 10, fill: "#2563eb" },
    { category: "Carnes", sells: 3, fill: "#AF57DB" },
    { category: "Higiene Pessoal", sells: 5, fill: "#2EB88A" },
    { category: "Laticínios", sells: 7, fill: "#ffbb00" },
    { category: "Padaria", sells: 9, fill: "#E88C30" },
    { category: "Verduras", sells: 6, fill: "#d20707" },
];

const chartConfigCategory = {
    sells: {
      label: "Vendas",
    },
    bebidas: {
      label: "Bebidas",
    },
    carnes: {
      label: "Carnes",
    },
    higiene: {
      label: "Higiene Pessoal",
    },
    laticinios: {
      label: "Laticínios",
    },
    padaria: {
      label: "Padaria",
    },
    verduras: {
      label: "Verduras",
    },
  } satisfies ChartConfig;

export const SalesChartByCategory = () => {
    return (
            <Card className="flex flex-col bg-tertiary border-none">
                <CardHeader className="items-center pb-0">
                    <CardTitle className="text-white">Vendas pro categoria</CardTitle>
                    <CardDescription>Janeiro - Junho 2024</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                    <ChartContainer
                        config={chartConfigCategory}
                        className="mx-auto aspect-square max-h-[250px] "
                        >
                        <PieChart>
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                            />
                        <Pie
                            data={sellByCategoryData}
                            dataKey="sells" 
                            nameKey="category" 
                            innerRadius={60}
                            strokeWidth={5}
                        >
                        <Label
                        content={({ viewBox }) => {
                        if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                        const totalSells = sellByCategoryData.reduce((acc, item) => acc + item.sells, 0);
                        return (
                            <text
                                x={viewBox.cx}
                                y={viewBox.cy}
                                textAnchor="middle"
                                dominantBaseline="middle"
                                >
                            <tspan
                                x={viewBox.cx}
                                y={viewBox.cy}
                                className="fill-white text-3xl font-bold"
                            >
                            {totalSells.toLocaleString()}
                            </tspan>
                            <tspan
                                x={viewBox.cx}
                                y={(viewBox.cy || 0) + 24}
                                className="fill-muted-foreground"
                            >
                            Vendas
                           </tspan>
                            </text>
                            );
                        }
                    }}
                    />
                    </Pie>
                    </PieChart>
                </ChartContainer>
            </CardContent>
        </Card>
    )
}