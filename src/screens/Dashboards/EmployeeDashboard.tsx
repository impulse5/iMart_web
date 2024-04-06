import { CircleUserRound, Pencil, Trash2 } from "lucide-react";

export function EmployeeDashboard() {
    return(
        <main className="px-10 pt-4 w-full h-screen bg-primary rounded-dashboard ">
        <header className="flex justify-between items-center mt-6">
          <div>
            <h1 className="text-3xl text-neutral-400 font-bold">FUNCIONÁRIOS</h1>
          </div>
          <div>
            <CircleUserRound className="text-neutral-400 size-12"/>
          </div>
        </header>
  
        <article className="mt-10 bg-tertiary rounded-lg px-5 overflow-auto max-h-[28rem]">
        <table className="w-full">
          <thead>
            <tr>
              <th className="pb-6 pt-3 text-center text-secondary text-2xl font-semibold ">ID</th>
              <th className="pb-6 pt-3 text-center text-secondary text-2xl font-semibold ">Nome</th>
              <th className="pb-6 pt-3 text-center text-secondary text-2xl font-semibold ">Cargo</th>
              <th className="pb-6 pt-3 text-center text-secondary text-2xl font-semibold ">Admissão</th>
              <th className="pb-6 pt-3 text-center text-secondary text-2xl font-semibold ">Demissão</th>
              <th className="pb-6 pt-3 text-center text-secondary text-2xl font-semibold ">Salário</th>
              <th className="pb-6 pt-3 text-center text-secondary text-2xl font-semibold ">Status</th>
              <th className="pb-6 pt-3 text-center text-secondary text-2xl font-semibold ">Ações</th>
            </tr>
          </thead>
          <tbody>
                {Array.from({ length: 50 }).map((_, index) => (
                    <tr key={index}>
                        <td className="py-3 text-center font-light text-xl">{index + 1}</td>
                        <td className="py-3 text-center font-light text-xl">Arthur. W</td>
                        <td className="py-3 text-center font-light text-xl">Estoquista</td>
                        <td className="py-3 text-center font-light text-xl">05/04/23</td>
                        <td className="py-3 text-center font-light text-xl">N/A</td>
                        <td className="py-3 text-center font-light text-xl">R$1000</td>
                        <td className="py-3 text-center font-light text-xl">Lic. Médica</td>
                        <td className="py-3 text-center font-light text-xl flex justify-around">
                            <Pencil className="cursor-pointer text-secondary"/>
                            <Trash2 className="cursor-pointer text-secondary"/>
                        </td>
                    </tr>
                ))}
          </tbody>
        </table>
        </article>
      </main>
    )
}