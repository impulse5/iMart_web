import { CustomModal } from "@/components/CustomModal"
import { EditIcon } from "@/components/Icons"
import { UserRequest, UserResponse } from "@/types/employee";

type CreateModalProps = {
  newEmployee: UserRequest;
  setNewEmployee: (employee: UserRequest) => void;
  onSubmit: () => void;
}

const selectOptions = {
  role: [
    { label: 'Gerente', value: 'gerente' },
    { label: 'Caixa', value: 'caixa' },
    { label: 'Estoquista', value: 'estoquista' },
  ]
};

export const CreateModal = ({newEmployee, onSubmit, setNewEmployee }: CreateModalProps) => {

  return (
    <CustomModal
      title="Cadastrar funcionário"
      trigger={
        <button className="bg-[#010101] py-1.5 px-10 rounded-lg">Cadastrar</button>
      }
      type="create"
      fields={[
        { id: 'name', label: 'Nome', type: 'text', placeholder: 'John Doe', value: newEmployee?.user?.name, onChange: (e) => setNewEmployee({ user: { ...newEmployee.user, name: e.target.value }})},
        { id: 'role', label: 'Cargo', type: 'select', placeholder: 'Selecione o cargo', value: newEmployee?.user?.role, onChange: (e) => setNewEmployee({ user: { ...newEmployee.user, role: e.target.value }})},
        { id: 'email', label: 'Email', type: 'email', placeholder: 'johndoe@gmail.com', value: newEmployee?.user?.email, onChange: (e) => setNewEmployee({ user: { ...newEmployee.user, email: e.target.value }})},
        { id: 'password', label: 'Senha', type: 'password', placeholder: '******', value: newEmployee?.user?.password, onChange: (e) => setNewEmployee({ user: { ...newEmployee.user, password: e.target.value }})},

      ]}
      selectOptions={selectOptions}
      onSubmit={onSubmit}
    />
  )
}

type UpdateModalProps = {
  employee: UserResponse;
  editedEmployee: UserRequest;
  setEditedEmployee: (employee: UserRequest) => void;
  onSubmit: (id: string) => void;
}

export const UpdateModal = ({editedEmployee, employee , onSubmit, setEditedEmployee}: UpdateModalProps) => {
  return (
    <CustomModal
      type="edit"
      title="Editar funcionário"
      fields={[
        { id: 'name', label: 'Nome', type: 'text', placeholder: 'John Doe', value: editedEmployee?.user?.name, onChange: (e) => setEditedEmployee({ user: { ...editedEmployee.user, name: e.target.value }})},
        { id: 'role', label: 'Cargo', type: 'select', placeholder: 'Selecione o cargo', value: editedEmployee?.user?.role, onChange: (e) => setEditedEmployee({ user: { ...editedEmployee.user, role: e.target.value }})},
        { id: 'email', label: 'Email', type: 'email', placeholder: 'johndoe@gmail.com', value: editedEmployee?.user?.email, onChange: (e) => setEditedEmployee({ user: { ...editedEmployee.user, email: e.target.value }})},
        { id: 'password', label: 'Senha', type: 'password', placeholder: '******', value: editedEmployee?.user?.password, onChange: (e) => setEditedEmployee({ user: { ...editedEmployee.user, password: e.target.value }})},

      ]}
      trigger={<EditIcon />}
      selectOptions={selectOptions}
      onInit={() => setEditedEmployee({ user: { id: employee?.id, name: employee?.attributes?.name, role: "", email: employee?.attributes?.email, password: employee?.attributes?.password }})}
      onSubmit={() => onSubmit(employee?.id)}
    />
  )
}