import { CustomModal } from "@/components/CustomModal"
import { SupplierRequest, SupplierResponse } from "@/types/supplier";
import { EditIcon } from "@/components/Icons"

type CreateModalProps = {
  newSupplier: SupplierRequest;
  setNewSupplier: (supplier: SupplierRequest) => void;
  onSubmit: () => void;
}

type EditModalProps = {
  supplier: SupplierResponse;
  setEditedSupplier: (supplier: SupplierRequest) => void;
  editedSupplier: SupplierRequest;
  onSubmit: (id: string) => void;
}

export const CreateModal = ({newSupplier, setNewSupplier, onSubmit}: CreateModalProps) => {
  return (
    <div>
      <CustomModal
        title="Cadastrar fornecedor"
        trigger={
          <button className="bg-[#010101] py-1.5 px-10 rounded-lg">Cadastrar</button>
        }
        type="create"
        fields={[
          { id: 'name', label: 'Nome', type: 'text', placeholder: 'Ambev', value: newSupplier?.supplier?.name, onChange: (e) => setNewSupplier({ supplier: { ...newSupplier.supplier, name: e.target.value }})},
          { id: 'cnpj', label: 'CNPJ', type: 'text', placeholder: '00.000.000/0000-00', value: newSupplier?.supplier?.cnpj, onChange: (e) => setNewSupplier({ supplier: { ...newSupplier.supplier, cnpj: e.target.value }})},
          { id: 'tel', label: 'Telefone', type: 'tel', placeholder: '99 99999-9999', value: newSupplier?.supplier?.cellphone, onChange: (e) => setNewSupplier({ supplier: { ...newSupplier.supplier, cellphone: e.target.value }})},
          { id: 'email', label: 'Email', type: 'email', placeholder: 'seu@email.com', value: newSupplier?.supplier?.email, onChange: (e) => setNewSupplier({ supplier: { ...newSupplier.supplier, email: e.target.value }})},
        ]}
        onSubmit={onSubmit}
      />
    </div>
  )
}

export const EditModal = ({ onSubmit, setEditedSupplier, editedSupplier, supplier }: EditModalProps) => {
  return (
    <CustomModal
      type="edit"
      title="Editar fornecedor"
      fields={[
          { id: 'name', label: 'Nome', type: 'text', placeholder: 'Ambev', value: editedSupplier.supplier.name, onChange: (e) => setEditedSupplier({ supplier: { ...editedSupplier.supplier, name: e.target.value }})},
          { id: 'cnpj', label: 'CNPJ', type: 'text', placeholder: '00.000.000/0000-00', value: editedSupplier.supplier.cnpj, onChange: (e) => setEditedSupplier({ supplier: { ...editedSupplier.supplier, cnpj: e.target.value }})},
          { id: 'tel', label: 'Telefone', type: 'tel', placeholder: '99 99999-9999', value: editedSupplier.supplier.cellphone, onChange: (e) => setEditedSupplier({ supplier: { ...editedSupplier.supplier, cellphone: e.target.value }})},
          { id: 'email', label: 'Email', type: 'email', placeholder: 'seu@email.com', value: editedSupplier.supplier.email, onChange: (e) => setEditedSupplier({ supplier: { ...editedSupplier.supplier, email: e.target.value }})}
      ]}
      trigger={<EditIcon />}
      onInit={() => setEditedSupplier({ supplier: { id: supplier?.id, name: supplier?.attributes?.name, email: supplier?.attributes?.email, cnpj: supplier?.attributes?.cnpj, cellphone: supplier?.attributes?.cellphone }})}
      onSubmit={() => onSubmit(supplier?.id)}
    />
  )
}