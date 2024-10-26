import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { CartesianGrid, XAxis, Area, AreaChart } from "recharts";
import cable from "@/cable";
import { useAuthentication } from "@/contexts/AuthenticationContext";

const sellsByWeekConfig = {
    sells: {
        label: "Vendas",
    },
} satisfies ChartConfig;

export const SalesChartByWeekDay = () => {
    const { marketId } = useAuthentication();
    const [sellsByWeekDayData, setSellsByWeekDayData] = useState([]);

    useEffect(() => {

        const subscription = cable.subscriptions.create(
            { channel: "MarketChannel", market_id: marketId },
            {
                received(data: any) {
                    const sellsByWeekDay = data.sells_by_week_day; 

                    const updatedSellsByWeekDayData = Object.keys(sellsByWeekDay).map((weekDay) => ({
                        weekDay,
                        sells: sellsByWeekDay[weekDay],
                    }));

                    setSellsByWeekDayData(updatedSellsByWeekDayData as never);
                },
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []);

    return (
        <Card className="bg-tertiary border-none">
            <CardHeader>
                <CardTitle className="text-white">Vendas na semana</CardTitle>
                <CardDescription>
                    Exibindo as vendas totais para a última semana
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
    );
};
