import { BarChartBig } from "lucide-react";
import { DashboardHeader } from "@/components/DashboardHeader";
import { Label, Pie, PieChart } from "recharts"
import {
    ChartConfig,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent,
  } from "@/components/ui/chart"
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";

  const sellByProducts = [
    { category: "Bebidas", sells: 10, fill: "#2563eb" },
    { category: "Carnes", sells: 3, fill: "#AF57DB" },
    { category: "Higiene Pessoal", sells: 5, fill: "#2EB88A" },
    { category: "Laticínios", sells: 7, fill: "#ffbb00" },
    { category: "Padaria", sells: 9, fill: "#E88C30" },
    { category: "Verduras", sells: 6, fill: "#b20505" },
];

    const chartData = [
        { product: "Alface Americana", sells: 20, fill: "#b20505" },
        { product: "Carne Bovina Moída 500g", sells: 12, fill: "#AF57DB" },
        { product: "Coca-Cola 350ml", sells: 33, fill: "#2563eb" },
        { product: "Danone Yogurt Morango", sells: 24, fill: "#ffbb00" },
        { product: "Pão Francês 100g", sells: 17, fill: "#04ea1b" },
        { product: "Sabonete Dove 90g", sells: 10, fill: "#2EB88A" },
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

  const chartConfig = {
    sells: {
      label: "Vendas",
    },
    alface: {
      label: "Alface Americana",
    },
    carne: {
      label: "Carne Bovina Moída 500g",
    },
    cocaCola: {
      label: "Coca-Cola 350ml",
    },
    danone: {
      label: "Danone Yogurt Morango",
    },
    pao: {
      label: "Pão Francês 100g",
    },
    sabonete: {
      label: "Sabonete Dove 90g",
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
                            config={chartConfigCategory}
                            className="mx-auto aspect-square max-h-[250px] "
                        >
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                    data={sellByProducts}
                                    dataKey="sells" 
                                    nameKey="category" 
                                    innerRadius={60}
                                    strokeWidth={5}
                                >
                                    <Label
                                        content={({ viewBox }) => {
                                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                const totalSells = sellByProducts.reduce((acc, item) => acc + item.sells, 0);
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
                <Card className="flex flex-col bg-tertiary border-none">
                    <CardHeader className="items-center pb-0">
                        <CardTitle className="text-white">Vendas por produtos</CardTitle>
                        <CardDescription>Janeiro - Junho 2024</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 pb-0">
                        <ChartContainer
                            config={chartConfig}
                            className="mx-auto aspect-square max-h-[250px]"
                        >
                            <PieChart>
                                <ChartTooltip
                                    cursor={false}
                                    content={<ChartTooltipContent hideLabel />}
                                />
                                <Pie
                                    data={chartData}
                                    dataKey="sells" 
                                    nameKey="product" 
                                    innerRadius={60}
                                    strokeWidth={5}
                                >
                                    <Label
                                        content={({ viewBox }) => {
                                            if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                                const totalSells = chartData.reduce((acc, item) => acc + item.sells, 0); // Cálculo do total de vendas
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
            </section>
        </main>
  );
}
