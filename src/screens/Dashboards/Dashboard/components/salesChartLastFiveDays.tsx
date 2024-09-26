import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { RadarChart, PolarAngleAxis, PolarGrid, Radar } from "recharts";
import cable from "@/cable";

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
    const [sellsLastFiveDaysData, setSellsLastFiveDaysData] = useState([]);

    useEffect(() => {
        const marketId = "a9f67a09-29eb-491d-8d9a-e4a1ad584b50";

        const subscription = cable.subscriptions.create(
            { channel: "MarketChannel", market_id: marketId },
            {
                received(data: any) {
                    const sellsLastFiveDays = data.sells_last_five_days;

                    const updatedSellsLastFiveDaysData = Object.keys(sellsLastFiveDays).map((day) => ({
                        day,
                        sells: sellsLastFiveDays[day],
                    }));

                    setSellsLastFiveDaysData(updatedSellsLastFiveDaysData as never);
                },
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <Card className="bg-tertiary border-none">
            <CardHeader className="items-center pb-4">
                <CardTitle className="text-white">Vendas nos últimos 5 dias</CardTitle>
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
    );
};
