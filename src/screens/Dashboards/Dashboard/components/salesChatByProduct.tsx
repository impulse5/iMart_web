import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { RadialBarChart, RadialBar } from "recharts";
import cable from "@/cable";
import { useAuthentication } from "@/contexts/AuthenticationContext";

const sellByProductConfig = {
    sells: {
        label: "Vendas",
    },
} satisfies ChartConfig;

export const SalesChartByProduct = () => {
    const { marketId } = useAuthentication();
    const [sellByProductData, setSellByProductData] = useState([]);
    
    useEffect(() => {

        const subscription = cable.subscriptions.create(
            { channel: "MarketChannel", market_id: marketId }, 
            {
                received(data: any) {
                    const sellsByProduct = data.sells_by_product;

                    const updatedSellByProductData = Object.keys(sellsByProduct).map((product) => ({
                        product,
                        sells: sellsByProduct[product],
                        fill: getRandomColor(),
                    }));

                    setSellByProductData(updatedSellByProductData as never);
                },
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []);

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
                <CardTitle className="text-white">Vendas por produto</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0">
                <ChartContainer
                    config={sellByProductConfig}
                    className="mx-auto aspect-square max-h-[250px]"
                >
                    <RadialBarChart
                        data={sellByProductData}
                        startAngle={-90}
                        endAngle={380}
                        innerRadius={20}
                        outerRadius={130}
                    >
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel nameKey="sells" />}
                        />
                        <RadialBar dataKey="sells" fill="fill" />
                    </RadialBarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};
