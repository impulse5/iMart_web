import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { RadialBarChart, RadialBar, LabelList } from "recharts";


const SellByProductData = [
    { product: "Alface Americana", sells: 20, fill: "#d20707" },
    { product: "Carne Bovina Moída 500g", sells: 12, fill: "#AF57DB" },
    { product: "Coca-Cola 350ml", sells: 33, fill: "#2563eb" },
    { product: "Danone Yogurt Morango", sells: 24, fill: "#ffbb00" },
    { product: "Pão Francês 100g", sells: 17, fill: "#04ea1b" },
    { product: "Sabonete Dove 90g", sells: 10, fill: "#2EB88A" },
];

const sellByProductConfig = {
    sells: {
      label: "Vendas",
    },
    alface: {
      label: "Alface Americana",
      color: "#d20707",
    },
    carne: {
      label: "Carne Bovina Moída 500g",
      color: "#AF57DB",
    },
    cocaCola: {
      label: "Coca-Cola 350ml",
      color: "#2563eb",
    },
    danone: {
      label: "Danone Yogurt Morango",
      color: "#ffbb00",
    },
    pao: {
      label: "Pão Francês 100g",
      color: "#04ea1b",
    },
    sabonete: {
      label: "Sabonete Dove 90g",
      color: "#2EB88A",
    },
  } satisfies ChartConfig;

export const SalesChartByProduct = () => {
    return (
        <Card className="flex flex-col bg-tertiary border-none">
                <CardHeader className="items-center pb-0">
                    <CardTitle className="text-white">Vendas por produto</CardTitle>
                    <CardDescription>January - June 2024</CardDescription>
                </CardHeader>
                <CardContent className="flex-1 pb-0">
                    <ChartContainer
                    config={sellByProductConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                    >
                    <RadialBarChart
                        data={SellByProductData}
                        startAngle={-90}
                        endAngle={380}
                        innerRadius={20}
                        outerRadius={130}
                    >
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel nameKey="sells" />}
                        />
                        <RadialBar dataKey="sells" >
                        <LabelList
                            position="insideStart"
                            dataKey="product"
                            className="fill-black font-semibold capitalize mix-blend-luminosity"
                            fontSize={11}
                        />
                        </RadialBar>
                        </RadialBarChart>
                    </ChartContainer>
                 </CardContent>
                </Card>
    )
}