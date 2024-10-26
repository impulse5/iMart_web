import { useState, useEffect } from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";
import cable from "@/cable";
import { useAuthentication } from "@/contexts/AuthenticationContext";

const paymentMethodConfig = {
    sells: {
        label: "Vendas",
    },
    debit: {
        label: "Débito",
    },
    money: {
        label: "Dinheiro",
    },
    pix: {
        label: "Pix",
    },
} satisfies ChartConfig;

export const SalesChartPaymentMethod = () => {   
    const { marketId } = useAuthentication();
    const [paymentMethodData, setPaymentMethodData] = useState([]);
    
    useEffect(() => {
        
        const subscription = cable.subscriptions.create(
            { channel: "MarketChannel", market_id: marketId },
            {
                received(data: any) {
                    const paymentMethods = data.sells_by_payment_method;

                    const updatedPaymentMethodData = Object.keys(paymentMethods).map((method) => ({
                        paymentMethod: method.charAt(0).toUpperCase() + method.slice(1),
                        sells: paymentMethods[method],
                        fill: method === "debit" ? "#d20707" : method === "money" ? "#2563eb" : "#ffbb00",
                    }));

                    setPaymentMethodData(updatedPaymentMethodData as never);
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
                <CardTitle className="text-white">Métodos de Pagamento</CardTitle>
                <CardDescription>Janeiro - Junho 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={paymentMethodConfig}>
                    <BarChart accessibilityLayer data={paymentMethodData}>
                        <CartesianGrid vertical={false} />
                        <XAxis
                            dataKey="paymentMethod" 
                            tickLine={false}
                            tickMargin={10}
                            axisLine={false}
                        />
                        <ChartTooltip
                            cursor={false}
                            content={<ChartTooltipContent hideLabel />}
                        />
                        <Bar
                            dataKey="sells" 
                            strokeWidth={2}
                            radius={8}
                            activeIndex={2}
                            activeBar={({ ...props }) => {
                                return (
                                    <Rectangle
                                        {...props}
                                        strokeDasharray={4}
                                        strokeDashoffset={4}
                                    />
                                );
                            }}
                        />
                    </BarChart>
                </ChartContainer>
            </CardContent>
        </Card>
    );
};
