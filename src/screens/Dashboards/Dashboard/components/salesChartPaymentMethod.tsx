import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, Rectangle, XAxis } from "recharts";


const paymentMethodData = [
    { paymentMethod: "Débito", sells: 25, fill: "#d20707" },
    { paymentMethod: "Dinheiro", sells: 56, fill: "#2563eb" },
    { paymentMethod: "Pix", sells: 44, fill: "#ffbb00" },
];

const paymentMethodConfig = {
    sells: {
      label: "Vendas",
    },
    debito: {
      label: "Débito",
    },
    dinheiro: {
      label: "Dinheiro",
    },
    pix: {
      label: "Pix",
    },
  } satisfies ChartConfig;

export const SalesChartPaymentMethod = () => {   
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
    )
}