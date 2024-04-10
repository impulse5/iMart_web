import { 
  CircleUserRound,
  Pencil, 
  Trash2,
  Search 
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip/tooltip"
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/Dialog/dialog"
import {
  Badge
} from "@/components/ui/Badge/badge"

import { TableCell } from "@/components/Table/tableCell";
import { TableHeader } from "@/components/Table/tableHeader";

export function EmployeeDashboard() {
    return(
        <main className="px-10 pt-2 w-full h-screen bg-[#010101] rounded-dashboard overflow-auto">
          <header className="flex justify-between items-center mt-6 ">
              <div>
                <h1 className="text-3xl text-neutral-400 font-bold">FUNCIONÁRIOS</h1>
              </div>
            <div>
              <CircleUserRound className="text-neutral-400 size-12 cursor-pointer"/>
            </div>
          </header>
        <article className="my-4 bg-tertiary rounded-lg">
          <div className="flex rounded-lg py-2 px-10 justify-between bg-primary w-full items-center">
            <div className="flex items-center w-96 py-1.5 px-3 outline-none bg-tertiary rounded-md">
              <input type="text" placeholder="Pesquisar" className="flex p-0 bg-transparent border-none outline-none text-sm w-full focus:ring-0"/>
              <Search size={20}/>
            </div>
          <div>
            <Dialog>
              <DialogTrigger>              
                  <button className="bg-[#010101] py-1.5 px-10 rounded-lg">Cadastrar</button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] bg-primary text-secondary border-none">
                <DialogHeader className="pt-1 pb-3 px-3 rounded-lg">
                  <DialogTitle className="text-neutral-400">Cadastrar funcionário</DialogTitle>
                </DialogHeader>
                  <div className="flex flex-col gap-5 items-center">
                    <div className="flex flex-col">
                        <label htmlFor="name">Nome</label>
                        <input type="text" id="name" placeholder="Willam" className="py-1.5 px-3 w-80 outline-none bg-tertiary rounded-md" />
                    </div>
                    <div>
                        <label className="flex flex-col" htmlFor="email">Email</label>
                        <input type="email" id="email" placeholder="seu@email.com" className="py-1.5 px-3 w-80 outline-none bg-tertiary rounded-md"/>
                    </div>
                    <div>
                        <label className="flex flex-col" htmlFor="password">Senha</label>
                        <input type="password" id="password" placeholder="*******" className="py-1.5 px-3 w-80 outline-none bg-tertiary rounded-md"/>
                    </div>
                    <div className="mt-3 mb-2">
                        <select  className="py-1.5 px-3 outline-none bg-tertiary rounded-md w-80">
                        <option disabled selected>       
                            Selecione o cargo
                        </option>
                        <option >
                          Gerente
                        </option>
                        <option>
                          Caixa 
                        </option>
                        <option>
                          Estoquista
                        </option>
                      </select>
                    </div>
                  </div>
              <DialogFooter>
                <DialogClose>
                  <button className="bg-[#010101] py-1.5 px-10 rounded-lg text-white">Salvar</button>
                </DialogClose>
              </DialogFooter>
          </DialogContent>
            </Dialog>
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-400/70">
              <th className="pb-3 pt-3 px-5 text-center text-secondary text-xl font-semibold">ID</th>
                <TableHeader>Nome</TableHeader>
                <TableHeader>Cargo</TableHeader>
                <TableHeader>Email</TableHeader>
                <TableHeader>Status</TableHeader>
                <th className="pb-3 pt-3 pl-5 text-center text-secondary text-xl font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
                 {Array.from({ length: 20 }).map((_, index) => (
                      <tr className="border-b border-white/20" key={index + 1}>
                        <TableCell>{index + 1}</TableCell>
                        <TableCell>Arthur</TableCell>
                        <TableCell>Gerente</TableCell>
                        <TableCell>seu@gmail.com</TableCell>
                        <TableCell>
                          <Badge>Ativo</Badge>
                        </TableCell>
                        <td className="font-light  text-lg mt-3 flex justify-center gap-5">
                            <Dialog>
                                <TooltipProvider>
                                    <Tooltip>
                                        <TooltipTrigger asChild>                                 
                                            <DialogTrigger>
                                                  <Pencil className="cursor-pointer text-secondary"/>
                                            </DialogTrigger>
                                        </TooltipTrigger>
                                        <TooltipContent>
                                            <p className="font-medium">Editar</p>
                                        </TooltipContent>
                                    </Tooltip>
                                </TooltipProvider>
                                <DialogContent className="sm:max-w-[425px] bg-primary text-secondary border-none">
                                    <DialogHeader className="pt-1 pb-3 px-3 rounded-lg">
                                        <DialogTitle className="text-neutral-400">
                                            Editar funcionário
                                        </DialogTitle>
                                    </DialogHeader>
                                    <div className="flex flex-col gap-5 items-center">
                                        <div className="flex flex-col">
                                            <label htmlFor="name">Nome</label>
                                            <input type="text" id="name" placeholder="Willam" className="py-1.5 px-3 w-80 outline-none bg-tertiary rounded-md" />
                                        </div>
                                        <div>
                                            <label className="flex flex-col" htmlFor="email">Email</label>
                                            <input type="email" id="email" placeholder="seu@email.com" className="py-1.5 px-3 w-80 outline-none bg-tertiary rounded-md"/>
                                        </div>
                                        <div>
                                            <label className="flex flex-col" htmlFor="password">Senha</label>
                                            <input type="password" id="password" placeholder="*******" className="py-1.5 px-3 w-80 outline-none bg-tertiary rounded-md"/>
                                        </div>
                                        <div className="mt-3 mb-2">
                                            <select className="py-1.5 px-3 outline-none bg-tertiary rounded-md w-80">
                                                <option disabled selected>       
                                                    Selecione o cargo
                                                </option>
                                                <option>
                                                    Gerente
                                                </option>
                                                <option>
                                                    Caixa 
                                                </option>
                                                <option>
                                                    Estoquista
                                                </option>
                                            </select>
                                        </div>
                                    </div>
                                    <DialogFooter>
                                      <DialogClose>
                                        <button className="bg-[#010101] py-1.5 px-10 rounded-lg text-white">Salvar</button>
                                      </DialogClose>
                                    </DialogFooter>
                                </DialogContent>
                            </Dialog>
                          <Dialog>
                            <TooltipProvider>
                                <Tooltip>
                                    <TooltipTrigger asChild>
                                      <DialogTrigger>
                                          <Trash2 className="cursor-pointer text-error"/>
                                      </DialogTrigger>
                                    </TooltipTrigger>
                                    <TooltipContent>
                                        <p className="font-medium">Excluir</p>
                                    </TooltipContent>
                                </Tooltip>
                            </TooltipProvider>
                            <DialogContent className="sm:max-w-[425px] bg-primary text-secondary border-none gap-10">
                              <DialogHeader className="pt-1 pb-3 px-3 rounded-lg">
                                <DialogTitle className="text-neutral-400">Excluir funcionário</DialogTitle>
                                <DialogDescription className="text-secondary">Deseja realmente excluir o funcionário?</DialogDescription>
                              </DialogHeader>
                              <DialogFooter>
                                <DialogClose>
                                  <button className="bg-[#010101] mx-2 py-1.5 px-10 rounded-lg text-white">Cancelar</button>
                                </DialogClose>
                                <DialogClose>
                                  <button className="bg-error py-1.5 px-10 rounded-lg text-white">Excluir</button>
                                </DialogClose>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>

                        </td>
                    </tr>
                ))}
          </tbody>
        </table>
        </article>
      </main>
    )
}