import { DashboardHeader } from "@/components/DashboardHeader";
import { Area, AreaChart, Bar, BarChart, CartesianGrid, Label, LabelList, Pie, PieChart, PolarAngleAxis, PolarGrid, Radar, RadarChart, Rectangle, XAxis, YAxis } from "recharts"
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
        { category: "Verduras", sells: 6, fill: "#d20707" },
    ];

    const paymentMethodData = [
        { paymentMethod: "Débito", sells: 25, fill: "#d20707" },
        { paymentMethod: "Dinheiro", sells: 56, fill: "#2563eb" },
        { paymentMethod: "Pix", sells: 44, fill: "#ffbb00" },
    ];
    const sellsByWeekDayData = [
        { weekDay: "Segunda", sells: 33 },
        { weekDay: "Terça", sells: 67 },
        { weekDay: "Quarta", sells: 46 },
        { weekDay: "Quinta", sells: 45 },
        { weekDay: "Sexta", sells: 99 },
        { weekDay: "Sábado", sells: 108 },
        { weekDay: "Domingo", sells: 55 },
      ];
      const sellsLastFiveDaysData = [
        { day: "Segunda", sells: 53 },
        { day: "Terça", sells: 67 },
        { day: "Quarta", sells: 51 },
        { day: "Quinta", sells: 61 },
        { day: "Sexta", sells: 99 },
      ]

      const sellsByUserData = [
        {user: "Beatriz Santos", sells: 20},
        {user: "Carlos Silva", sells: 12},
        {user: "João Souza", sells: 33},
        {user: "Maria Oliveira", sells: 24},
        {user: "Pedro Alves", sells: 17},
        {user: "Rafaela Lima", sells: 10},
      ]

    const chartData = [
        { product: "Alface Americana", sells: 20, fill: "#d20707" },
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

  const sellsLastFiveDaysConfig = {
    day: {
        label: "Dia",
        color: "#2563eb",
    },
    sells: {
        label: "Vendas",
    },
  } satisfies ChartConfig

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

  const sellsByUserConfig = {
    sells: {
      label: "Vendas",
    },
  } satisfies ChartConfig;

  const sellsByWeekConfig = {
    sells: {
      label: "Vendas",
    },
  } satisfies ChartConfig

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
        <main className="px-10 py-6 w-full h-screen bg-primary rounded-dashboard overflow-y-auto">
            <DashboardHeader title="Dashboard"/>
            <section className="grid grid-cols-3 gap-4 mt-10">
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
                <Card className="bg-tertiary border-none">
                    <CardHeader>
                        <CardTitle className="text-white">Vendas na semana</CardTitle>
                        <CardDescription>
                            Showing total visitors for the last 6 months
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
            <Card className="bg-tertiary border-none">
            <CardHeader>
                <CardTitle className="text-white">Vendas por usuário</CardTitle>
                <CardDescription>January - June 2024</CardDescription>
            </CardHeader>
            <CardContent>
                <ChartContainer config={sellsByUserConfig}>
                <BarChart
                    accessibilityLayer
                    data={sellsByUserData}
                    layout="vertical"
                    margin={{
                    right: 16,
                    }}
                >
                    <CartesianGrid horizontal={false} />
                    <YAxis
                        dataKey="user"
                        type="category"
                        tickLine={false}
                        tickMargin={10}
                        axisLine={false}
                        tickFormatter={(value) => value.slice(0, 3)}
                        hide
                    />
                    <XAxis dataKey="sells" type="number" hide />
                    <ChartTooltip
                        cursor={false}
                        content={<ChartTooltipContent indicator="line" />}
                    />
                    <Bar
                        dataKey="sells"
                        layout="vertical"
                        fill="#2563eb"
                        radius={4}
                    >
                    <LabelList
                        dataKey="user"
                        position="insideLeft"
                        offset={8}
                        className="fill-tertiary font-semibold"
                        fontSize={12}
                    />
                    <LabelList
                        dataKey="sells"
                        position="right"
                        offset={8}
                        className="fill-white"
                        fontSize={12}
                    />
                    </Bar>
                </BarChart>
                </ChartContainer>
            </CardContent>
            </Card>
            <Card className="bg-tertiary border-none">
                <CardHeader className="items-center pb-4">
                    <CardTitle className="text-white">Vendas nos últimos 5 dias </CardTitle>
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
            </section>
        </main>
  );
}
