import { DashboardHeader } from "@/components/DashboardHeader";
import { SalesChartByCategory } from "./components/salesChartByCategory";
import { SalesChartByProduct } from "./components/salesChatByProduct";
import { SalesChartPaymentMethod } from "./components/salesChartPaymentMethod";
import { SalesChartByWeekDay } from "./components/salesChartByWeekDay";
import { SalesChartLastFiveDays } from "./components/salesChartLastFiveDays";
import { SalesChartByUser } from "./components/salesChartByUser";

export function Dashboard() {
  return (
        <main className="px-10 py-6 w-full h-screen bg-primary rounded-dashboard overflow-y-auto">
            <DashboardHeader title="Dashboard"/>
            <section className="grid grid-cols-3 gap-4 mt-10">
               <SalesChartByCategory />
               <SalesChartByProduct />
               <SalesChartPaymentMethod />
               <SalesChartByWeekDay />
               <SalesChartByUser />
               <SalesChartLastFiveDays />
            </section>
        </main>
  );
}