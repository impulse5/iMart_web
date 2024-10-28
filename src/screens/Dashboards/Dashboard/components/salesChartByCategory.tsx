import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Label, Pie, PieChart } from "recharts";
import cable from "@/cable"; 
import { useAuthentication } from "@/contexts/AuthenticationContext";

const chartConfigCategory = {
    sells: { label: "Vendas" },
    bebidas: { label: "Bebidas" },
    carnes: { label: "Carnes" },
    higiene: { label: "Higiene Pessoal" },
    laticinios: { label: "Laticínios" },
    padaria: { label: "Padaria" },
    verduras: { label: "Verduras" },
} satisfies ChartConfig;

export const SalesChartByCategory = () => {
    const { marketId } = useAuthentication();
    const [sellByCategoryData, setSellByCategoryData] = useState([]);
  
    useEffect(() => {
      if (!marketId) return;
  
      const subscription = cable.subscriptions.create(
        { channel: "MarketChannel", market_id: marketId },
        {
          received(data: any) {
            const sellsByCategory = data.sells_by_category;
            const updatedSellByCategoryData = Object.keys(sellsByCategory).map((category) => ({
              category,
              sells: sellsByCategory[category],
              fill: getRandomColor(),
            }));
            setSellByCategoryData(updatedSellByCategoryData as never);
          },
        }
      );
  
      return () => {
        subscription.unsubscribe();
      };
    }, [marketId]);
  

    const getRandomColor = () => {
        const letters = "0123456789ABCDEF";
        let color = "#";
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    };

    return (
        <Card className="flex flex-col bg-tertiary border-none">
            <CardHeader className="items-center pb-0">
                <CardTitle className="text-white">Vendas por categoria</CardTitle>
                <CardDescription>Janeiro - Junho 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer config={chartConfigCategory} className="mx-auto aspect-square max-h-[250px]">
                    <PieChart>
                        <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
                        <Pie data={sellByCategoryData} dataKey="sells" nameKey="category" innerRadius={60} strokeWidth={5}>
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        const totalSells = sellByCategoryData.reduce((acc, item: any) => acc + item.sells, 0);
                                        return (
                                            <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle" dominantBaseline="middle">
                                                <tspan x={viewBox.cx} y={viewBox.cy} className="fill-white text-3xl font-bold">
                                                    {totalSells.toLocaleString()}
                                                </tspan>
                                                <tspan x={viewBox.cx} y={(viewBox.cy || 0) + 24} className="fill-muted-foreground">
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
    );
};
