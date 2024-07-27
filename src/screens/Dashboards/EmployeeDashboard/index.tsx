import { Toaster } from "@/components/ui/Toast/toaster";
import { DashboardHeader } from "@/components/DashboardHeader";
import { useState } from "react";
import { SearchInput } from "@/components/SearchInput";
import { CustomTHead } from "@/components/CustomTHead";
import { EmployeeService } from "@/services/EmployeeService";
import { UserRequest, UserResponse } from "@/types/employee";
import { TableCell } from "@/components/Table/tableCell";
import { useRoleTranslate } from "@/hooks/useRole";
import { Badge } from "@/components/ui/Badge/badge";
import ReactLoading from 'react-loading';
import { DeactivateIcon, ActivateIcon } from "@/components/Icons";
import { DeleteModal } from "@/components/DeleteModal";
import { CreateModal, UpdateModal } from "./components";

const EmployeeDashboard = () => {

  const [search, setSearch] = useState<string>('');
  const { employees, loading, turnStatus, destroy, create, update } = EmployeeService();

  const [newEmployee, setNewEmployee] = useState<UserRequest>({
    user: {
      id: '',
      name: '',
      role: '',
      email: '',
      password: '',
    }
  })

  const [editEmployee, setEditEmployee] = useState<UserRequest>({
    user: {
      id: '',
      name: '',
      role: '',
      email: '',
      password: '',
    }
  })

  const handleCreate = async () => {
    await create(newEmployee);
    setNewEmployee({
      user: {
        id: '',
        name: '',
        role: '',
        email: '',
        password: '',
      }
    });
  }

  const handleUpdate = async () => {
    await update(editEmployee);
    setEditEmployee({
      user: {
        id: '',
        name: '',
        role: '',
        email: '',
        password: '',
      }
    });
  }


  const handleDelete = async (id: string) => {
    await destroy(id);
  }

  const filterEmployees = () => {
    if (!search) return employees?.data;
    return employees?.data?.filter((employee: UserResponse) => {
      return employee?.attributes?.name.toLowerCase().includes(search.toLowerCase());
    });
  }

  return (
    <main className="px-10 pt-2 w-full h-screen bg-[#010101] rounded-dashboard overflow-auto">
      <Toaster position="top-center" />
      <DashboardHeader title="Funcionários" />
      <article className="my-4 bg-tertiary rounded-lg">
        <div className="flex rounded-lg py-2 px-10 justify-between bg-primary w-full items-center">
          <SearchInput search={search} setSearch={setSearch} />
          <CreateModal newEmployee={newEmployee} setNewEmployee={setNewEmployee} onSubmit={handleCreate}/>
        </div>
        <table className="w-full">
          <CustomTHead fields={['Nome', 'Cargo', 'Email', 'Status']} />
          <tbody>
            {
              filterEmployees()?.map((employee: UserResponse) => (
                <tr key={employee.id} className="border-b border-neutral-400/70">
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
                    {employee.attributes.role !== 'owner' && (
                      <UpdateModal editedEmployee={editEmployee} employee={employee} onSubmit={handleUpdate} setEditedEmployee={setEditEmployee}/>
                    )}                    
                    {
                      employee?.attributes?.role !== 'owner' && (
                        <DeleteModal prefix="o" entity="funcionário" handleDelete={() => handleDelete(employee.id)} />
                      )
                    }
                    {employee?.attributes?.role !==  'owner' && (
                       <div onClick={() => turnStatus(employee.id)}>
                       {
                         employee?.attributes?.status ? <DeactivateIcon /> : <ActivateIcon />
                       }
                     </div>
                    )}
                   
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        {
          loading && (
            <div className="flex justify-center items-center h-52">
              <ReactLoading type="bars" color="#fff" height={100} width={100} />
            </div>
          )
        }
      </article>
    </main>
  );
}

export default EmployeeDashboard;