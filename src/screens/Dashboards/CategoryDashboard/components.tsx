import { CustomModal } from "@/components/CustomModal"
import { CategoryRequest, CategoryResponse } from "@/types/category"
import { EditIcon } from "@/components/Icons"

type CreateModalProps = {
  newCategory: CategoryRequest;
  setNewCategory: (category: CategoryRequest) => void;
  handleCreate: () => void;
}

export const CreateModal = ({newCategory, setNewCategory, handleCreate}: CreateModalProps) => {
  return (
    <CustomModal
      title="Cadastrar categoria"
      trigger={
        <button className="bg-[#010101] py-1.5 px-10 rounded-lg">Cadastrar</button>
      }
      type="create"
      fields={[
        { id: 'name', label: 'Nome', type: 'text', placeholder: 'Frutas', value: newCategory?.category?.name, onChange: (e) => setNewCategory({ category: { ...newCategory.category, name: e.target.value }})},
      ]}
      onSubmit={handleCreate}
    />
  )
}

type UpdateModalProps = {
  category: CategoryResponse;
  editedCategory: CategoryRequest;
  setEditedCategory: (category: CategoryRequest) => void;
  onSubmit: (id: string) => void;
}

export const UpdateModal = ({editedCategory, setEditedCategory, onSubmit, category}: UpdateModalProps) => {
  return (
    <CustomModal
      type="edit"
      title="Editar categoria"
      fields={[
        { id: 'name', label: 'Nome', type: 'text', placeholder: 'Cereais', value: editedCategory?.category?.name, onChange: (e) => setEditedCategory({ category: {...editedCategory.category, name: e.target.value} })},
      ]}
      trigger={<EditIcon />}
      onInit={() => setEditedCategory({ category: {
        id: category?.attributes?.id,
        name: category?.attributes?.name
      } })}
      onSubmit={() => onSubmit(category?.attributes?.id)}
    />
  )
}