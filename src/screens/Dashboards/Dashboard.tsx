import { BarChartBig, TicketCheck, TrendingUp } from "lucide-react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Label, Pie, PieChart } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

  const chartData = [
    { category: "Bebidas", sells: 10, fill: "var(--color-bebidas)" },
    { category: "Carnes", sells: 3, fill: "var(--color-carnes)" },
    { category: "Higiene Pessoal", sells: 5, fill: "var(--color-higiene)" },
    { category: "Laticínios", sells: 7, fill: "var(--color-laticinios)" },
    { category: "Padaria", sells: 9, fill: "var(--color-padaria)" },
    { category: "Verduras", sells: 6, fill: "var(--color-verduras)" },
];

const chartConfig = {
    sells: {
      label: "Vendas",
        color: "#FFFFF",
    },
    bebidas: {
      label: "Bebidas",
      color: "#2563eb",
    },
    carnes: {
      label: "Carnes",
      color: "#AF57DB",
    },
    higiene: {
      label: "Higiene Pessoal",
      color: "#2EB88A",
    },
    laticinios: {
      label: "Laticínios",
      color: "#ffbb00",
    },
    padaria: {
      label: "Padaria",
      color: "#E88C30",
    },
    verduras: {
      label: "Verduras",
      color: "#b20505",
    },
  } satisfies ChartConfig;

export function Dashboard() {
   
  return (

        <main className="px-10 pt-4 w-full h-screen bg-primary rounded-dashboard">
            <DashboardHeader title="Dashboard"/>
            <section className="grid grid-cols-3 gap-4 mt-10">
                <div className="bg-tertiary rounded-xl p-10 ">
                    <div className="flex gap-3 my-2 ">
                        <BarChartBig className="text-neutral-400" />
                        <h1 className="text-base font-semibold text-neutral-400">Renda</h1>
                    </div>
                    <p className="text-4xl text-secondary">R$ 900.00</p>
                </div>
                <div className="bg-tertiary rounded-xl p-10">
                    <div className="flex gap-3 my-2">
                        <BarChartBig className="text-neutral-400" />
                        <h1 className="text-base font-semibold text-neutral-400">Saldo</h1>
                    </div>
                    <p className="text-4xl text-secondary">R$ 81.954.800</p>
                </div>
                <div className="bg-tertiary rounded-xl p-10">
                    <div className="flex gap-3 my-2">
                        <BarChartBig className="text-neutral-400" />
                        <h1 className="text-base font-semibold text-neutral-400">Despesas</h1>
                    </div>
                    <p className="text-4xl text-secondary">R$ 900.00</p>
                </div>
                <Card className="flex flex-col bg-tertiary border-none">
                    <CardHeader className="items-center pb-0">
                        <CardTitle className="text-white">Vendas pro categoria</CardTitle>
                        <CardDescription>Janeiro - Junho 2024</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        <ChartContainer
                            config={chartConfig}
                            className="mx-auto aspect-square max-h-[250px] "
                        >
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                    data={chartData}
                                    dataKey="sells" 
                                    nameKey="category" 
                                    innerRadius={60}
                                    strokeWidth={5}
                                >
                                    <Label
                                        content={({ viewBox }) => {
                                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                const totalSells = chartData.reduce((acc, item) => acc + item.sells, 0);
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
                <aside className="col-span-1 bg-tertiary rounded-lg px-8 py-4 overflow-auto max-h-[300px]">
                    <h1 className="text-xl font-semibold text-neutral-400">Transações</h1>
                    <div className="flex flex-col mt-6 gap-3 text-left items-left ">
                    {Array.from({ length: 10}).map((_, index) => (
                        <div key={index} className="flex gap-5 ml-2 items-center">
                        <TicketCheck className="text-neutral-400"/>
                        <div>
                            <h1 className="text-base font-semibold">Macaco de pelúcia</h1>
                            <span className="font-normal text-sm text-neutral-400">Pagamento via pix</span>
                        </div>
                    </div>
                    ))}
                    </div>
                </aside>
            </section>
        </main>
  );
}
