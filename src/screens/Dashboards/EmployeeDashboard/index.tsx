import { useEffect } from "react";
import { CircleUserRound, Trash2, Search } from "lucide-react";
import { Badge } from "@/components/ui/Badge/badge";
import { TableCell } from "@/components/Table/tableCell";
import { TableHeader } from "@/components/Table/tableHeader";
import { EmployeeService } from "@/services/employee_service";
import { useRoleTranslate } from "@/hooks/useRole";
import { roles } from "@/hooks/useRole";
import { CustomModal } from "@/components/CustomModal";
import { EditIcon } from "@/components/EditIcon";
import { RemoveIcon } from "@/components/RemoveIcon";

export function EmployeeDashboard() {
  const { getEmployees, employees } = EmployeeService();

  useEffect(() => {
    getEmployees();
  }, []);
  
  return (
    <main className="px-10 pt-2 w-full h-screen bg-[#010101] rounded-dashboard overflow-auto">
      <header className="flex justify-between items-center mt-6">
        <div>
          <h1 className="text-3xl text-neutral-400 font-bold">FUNCIONÁRIOS</h1>
        </div>
        <div>
          <CircleUserRound className="text-neutral-400 size-12 cursor-pointer" />
        </div>
      </header>
      <article className="my-4 bg-tertiary rounded-lg">
        <div className="flex rounded-lg py-2 px-10 justify-between bg-primary w-full items-center">
          <div className="flex items-center w-96 py-1.5 px-3 outline-none bg-tertiary rounded-md">
            <input
              type="text"
              placeholder="Pesquisar"
              className="flex p-0 bg-transparent border-none outline-none text-sm w-full focus:ring-0"
            />
            <Search size={20} />
          </div>
          <div>
            <CustomModal
              title="Cadastrar funcionário"
              trigger={
                <button className="bg-[#010101] py-1.5 px-10 rounded-lg">Cadastrar</button>
              }
              type="create"
              fields={[
                { id: 'name', label: 'Nome', type: 'text', placeholder: 'Willam' },
                { id: 'email', label: 'Email', type: 'email', placeholder: 'seu@email.com' },
                { id: 'password', label: 'Senha', type: 'password', placeholder: '*******' },
                { type: 'select', placeholder: 'Selecione o cargo'}
              ]}
              selectOptions={roles}
            />
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-400/70">
              <TableHeader>Nome</TableHeader>
              <TableHeader>Cargo</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Status</TableHeader>
              <th className="pb-3 pt-3 pl-5 text-center text-secondary text-xl font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr className="border-b border-white/20" key={employee?.attributes?.id}>
                <TableCell>{employee?.attributes?.name}</TableCell>
                <TableCell>{useRoleTranslate(employee?.attributes?.role)}</TableCell>
                <TableCell>{employee?.attributes?.email}</TableCell>
                <TableCell>
                  {employee?.attributes?.status ? (
                    <Badge>Ativo</Badge>
                  ) : (
                    <Badge variant="error">Inativo</Badge>
                  )}
                </TableCell>
                <td className="font-light text-lg mt-3 flex justify-center gap-5">
                  <CustomModal
                    type="edit"
                    title="Editar funcionário"
                    fields={[
                      { id: 'name', label: 'Nome', type: 'text', placeholder: 'Willam' },
                      { id: 'email', label: 'Email', type: 'email', placeholder: 'seu@email.com' },
                      { id: 'password', label: 'Senha', type: 'password', placeholder: '*******' },
                      { type: 'select', placeholder: 'Selecione o cargo'}
                    ]}
                    selectOptions={roles}
                    trigger={<EditIcon />}
                  />
                  <CustomModal
                    trigger={<RemoveIcon />}
                    type="delete"
                    title="Excluir funcionário"
                    description="Deseja realmente excluir o funcionário?"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </main>
  );
}

