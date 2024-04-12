import { useEffect, useState } from "react";
import { CircleUserRound, Search } from "lucide-react";
import { Badge } from "@/components/ui/Badge/badge";
import { TableCell } from "@/components/Table/tableCell";
import { TableHeader } from "@/components/Table/tableHeader";
import { EmployeeService } from "@/services/employee_service";
import { roles, ownerRoles, useRoleTranslate } from "@/hooks/useRole";
import { CustomModal } from "@/components/CustomModal";
import { EditIcon, RemoveIcon } from "@/components/Icons";
import { EmployeeInfo } from "@/types/EmployeeInfo";
import { Toaster } from "@/components/ui/Toast/toaster";
import { useToast } from "@/components/ui/Toast/use-toast";
import { useAuthentication } from "@/contexts/AuthenticationContext";

export function EmployeeDashboard() {
  const { toast } = useToast();
  const { getEmployees, employees, postEmployee, deleteEmployee } = EmployeeService();
  const { user } = useAuthentication();
  const [search, setSearch] = useState<string>("");
  const [newEmployee, setNewEmployee] = useState<EmployeeInfo>({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    role: '',
  });


  const handleCreateEmployee = async () => {
    if (newEmployee.name === '' || newEmployee.email === '' || newEmployee.password === '' || newEmployee.confirmPassword === '' || newEmployee.role === '') {
      toast({
        variant: 'error',
        title: 'Erro ao criar funcionário',
        description: 'Preencha todos os campos!',
        duration: 3000,
      });
      return;
    }

    if (!/^[a-zA-Z]+$/.test(newEmployee.name)) {
      toast({
        variant: 'error',
        title: 'Erro ao criar funcionário',
        description: 'Nome do funcionário inválido! O nome deve conter apenas letras.',
        duration: 3000,
      });
      return;
    }

    if (newEmployee.password.length < 8) {
      toast({
        variant: 'error',
        title: 'Erro ao criar funcionário',
        description: 'A senha deve ter pelo menos 8 caracteres!',
        duration: 3000,
      });
      return;
    }
  
    if (!/\d/.test(newEmployee.password)) {
      toast({
        variant: 'error',
        title: 'Erro ao criar funcionário',
        description: 'A senha deve conter pelo menos um número!',
        duration: 3000,
      });
      return;
    }

    if (!/[A-Z]/.test(newEmployee.password)) {
      toast({
        variant: 'error',
        title: 'Erro ao criar funcionário',
        description: 'A senha deve conter pelo menos uma letra maiúscula!',
        duration: 3000,
      });
      return;
    }

    if (!/[a-z]/.test(newEmployee.password)) {
      toast({
        variant: 'error',
        title: 'Erro ao criar funcionário',
        description: 'A senha deve conter pelo menos uma letra minúscula!',
        duration: 3000,
      });
      return;
    }

    if (!/[$&+,:;=?@#|'<>.^*()%!-]/.test(newEmployee.password)) {
      toast({
        variant: 'error',
        title: 'Erro ao criar funcionário',
        description: 'A senha deve conter pelo menos um caractere especial!',
        duration: 3000,
      });
      return;
    }
  
    if (newEmployee.password !== newEmployee.confirmPassword) {
      toast({
        variant: 'error',
        title: 'Erro ao criar funcionário',
        description: 'As senhas não coincidem!',
        duration: 3000,
      });
      return;
    }
  
    try {
      await getEmployees();

      const isEmailRegistered = employees.some((employee) => employee.attributes.email === newEmployee.email);
      if (isEmailRegistered) {
        toast({
          variant: 'error',
          title: 'Erro ao criar funcionário',
          description: 'Já existe um funcionário cadastrado com esse email!',
          duration: 3000,
        });
        return;
      }

      let employee = {
        user: {
          name: newEmployee.name,
          email: newEmployee.email,
          password: newEmployee.password,
          role: newEmployee.role,
        }
      };
  
      const success = await postEmployee(employee);
  
      if (success) {
        toast({
          variant: 'success',
          title: 'Funcionário criado',
          description: 'O funcionário foi criado com sucesso!',
          duration: 3000,
        });
        setNewEmployee({
          name: '',
          email: '',
          password: '',
          role: '',
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: 'error',
        title: 'Erro ao criar funcionário',
        description: 'Ocorreu um erro ao tentar criar o funcionário. Por favor, tente novamente mais tarde.',
        duration: 3000,
      });
    }
  };

  const handleDeleteEmployee = async (employeeId: string) => {
    try {
      const success = await deleteEmployee(employeeId);
      if (success) {
        toast({
          variant: 'success',
          title: 'Funcionário excluído',
          description: 'O funcionário foi excluído com sucesso!',
          duration: 3000,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: 'error',
        title: 'Erro ao excluir funcionário',
        description: 'Ocorreu um erro ao tentar excluir o funcionário. Por favor, tente novamente mais tarde.',
        duration: 3000,
      });
    }
  }

  useEffect(() => {
    getEmployees();
  }, []);

  useEffect(() => {
    console.log(user)
    console.log(employees)
  }, [user])

  const filteredEmployees = employees.filter((employee) =>
    employee.attributes.name.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <main className="px-10 pt-2 w-full h-screen bg-[#010101] rounded-dashboard overflow-auto">
      <Toaster position="top-center" />
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
              onChange={(e) => setSearch(e.target.value)}
              value={search}
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
                { id: 'name', label: 'Nome', type: 'text', placeholder: 'Willam', value: newEmployee.name, onChange: (e) => setNewEmployee({ ...newEmployee, name: e.target.value })},
                { id: 'email', label: 'Email', type: 'email', placeholder: 'seu@email.com', value: newEmployee.email, onChange: (e) => setNewEmployee({ ...newEmployee, email: e.target.value })},
                { id: 'password', label: 'Senha', type: 'password', placeholder: '*******', value: newEmployee.password, onChange: (e) => setNewEmployee({ ...newEmployee, password: e.target.value })},
                { id: 'confirmPassword', label: 'Confirme sua senha', type: 'password', placeholder: '*******', value: newEmployee.confirmPassword, onChange: (e) => setNewEmployee({ ...newEmployee, confirmPassword: e.target.value })},
                { type: 'select', placeholder: 'Selecione o cargo', value: newEmployee.role, onSelect: (e) => setNewEmployee({ ...newEmployee, role: e.target.value })},
              ]}
              selectOptions={user.role === 'owner' ? ownerRoles : roles}
              onSubmit={handleCreateEmployee}
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
            {filteredEmployees.map((employee) => (
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
                    selectOptions={user.role === 'owner' ? ownerRoles : roles}
                    trigger={<EditIcon />}
                  />
                  {
                    employee?.attributes?.role === 'owner' ? null : (
                      <CustomModal
                      trigger={<RemoveIcon />}
                      type="delete"
                      title="Excluir funcionário"
                      description="Deseja realmente excluir o funcionário?"
                      onSubmit={() => handleDeleteEmployee(employee?.attributes?.id)}
                    />
                    )
                  }
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </article>
    </main>
  );
}

