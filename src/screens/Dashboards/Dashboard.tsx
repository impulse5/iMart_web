import { BarChartBig, CircleUserRound, TicketCheck } from "lucide-react";

export function Dashboard() {

  return (
<main className="p-6 w-full h-screen bg-primary rounded-dashboard">
    <header className="flex justify-between">
        <div>
            <h1 className="text-3xl text-neutral-400 px-10 pt-4 font-bold">DASHBOARD</h1>
        </div>
        <nav>
            <CircleUserRound className="text-neutral-400 size-12"/>
        </nav>
    </header>
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
        <section className="col-span-2 bg-tertiary rounded-lg p-6">
            <h1 className="font-semibold text-neutral-400 text-xl">Gráfico de Despesas</h1>
        </section>
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
