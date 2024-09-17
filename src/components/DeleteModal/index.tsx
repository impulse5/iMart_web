import { CustomModal } from "../CustomModal"
import { RemoveIcon } from "../Icons"

type DeleteModalProps = {
  handleDelete: (id: string) => void;
  prefix: string;
  entity: string;
}

export const DeleteModal = ({handleDelete, prefix, entity}: DeleteModalProps) => {
  return (
    <CustomModal
      trigger={<RemoveIcon />}
      type="delete"
      title={`Excluir ${entity}`}
      description={`Deseja realmente excluir ${prefix} ${entity}?`}
      onSubmit={handleDelete}
    />
  )
}