import { CustomModal } from "@/components/CustomModal";
import { useState } from "react";
import { EditIcon } from "@/components/Icons";

interface EditQuantityModalProps {
  product: any;
  updateProductQuantity: (code: string, quantity: number) => void;
}

export const EditQuantityModal: React.FC<EditQuantityModalProps> = ({ product, updateProductQuantity }) => {
  const [quantity, setQuantity] = useState<number>(product.quantity);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(isNaN(value) ? 1 : Math.max(value, 1));
  };

  return (
    <CustomModal
      title="Editar Quantidade"
      trigger={<EditIcon />}
      type="edit"
      fields={[
        {
          id: "quantity",
          label: "Quantidade",
          type: "number",
          placeholder: "Nova quantidade",
          value: quantity,
          // @ts-ignore
          onChange: handleChange,
        },
      ]}
      onSubmit={() => updateProductQuantity(product.code, quantity)}
    />
  );
};
