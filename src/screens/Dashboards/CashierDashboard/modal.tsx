import { CustomModal } from "@/components/CustomModal";
import { useState } from "react";
import { EditIcon } from "@/components/Icons";
import { Button } from "@/components/ui/Button/button";
import { X, ShoppingCart} from "lucide-react";

interface ConfirmSaleModalProps {
  onConfirm: (cpf: string) => void;
  onCancel: () => void;
}

const validateCPF = (cpf: string): boolean => {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11) return false;
  if (/^(\d)\1{10}$/.test(cpf)) return false;
  const digits = cpf.split('').map(Number);
  let sum = 0;
  for (let i = 0; i < 9; i++) {
    sum += digits[i] * (10 - i);
  }
  let remainder = sum % 11;
  const firstDigit = remainder < 2 ? 0 : 11 - remainder;
  if (digits[9] !== firstDigit) return false;

  sum = 0;
  for (let i = 0; i < 10; i++) {
    sum += digits[i] * (11 - i);
  }
  remainder = sum % 11;
  const secondDigit = remainder < 2 ? 0 : 11 - remainder;
  if (digits[10] !== secondDigit) return false;

  return true;
};

const formatCPF = (value: string): string => {
  value = value.replace(/\D/g, '');

  if (value.length <= 3) return value;
  if (value.length <= 6) return `${value.slice(0, 3)}.${value.slice(3)}`;
  if (value.length <= 9) return `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6)}`;
  return `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(6, 9)}-${value.slice(9, 11)}`;
};


export const ConfirmSaleModal = ({ onConfirm, onCancel }: ConfirmSaleModalProps) => {
  const [cpf, setCpf] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = () => {
    if (validateCPF(cpf)) {
      onConfirm(cpf);
    } else {
      setError("CPF inválido. Por favor, insira um CPF válido no formato XXX.XXX.XXX-XX.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCpf = formatCPF(e.target.value);
    setCpf(formattedCpf);
  };

  return (
    <CustomModal
      trigger={
        <Button variant="ghost" className="flex items-center gap-3 text-lg">
          <ShoppingCart className="size-5" />
          Finalizar Venda - F12
        </Button>
      }
      type="create"
      title="Confirmar Venda"
      description="Por favor, insira o CPF do cliente para finalizar a venda."
      onSubmit={handleConfirm}
      onCancel={onCancel}
      fields={[
        {
          id: "cpf",
          label: "CPF",
          type: "text",
          placeholder: "CPF do Cliente",
          value: cpf,
          // @ts-ignore
          onChange: handleChange,
        }
      ]}
      error={error}
    />
  );
};

interface EditQuantityModalProps {
  product: any;
  updateProductQuantity: (code: string, quantity: number) => void;
}

export const EditQuantityModal: React.FC<EditQuantityModalProps> = ({ product, updateProductQuantity }) => {
  const [quantity, setQuantity] = useState<number>(product.quantity);
  const maxQuantity = product.maxQuantity;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(isNaN(value) ? 1 : Math.min(Math.max(value, 1), maxQuantity));
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

interface CancelSaleModalProps {
  onConfirm: () => void;
}

export const CancelSaleModal = ({ onConfirm }: CancelSaleModalProps) => {
  return (
    <CustomModal
      trigger={
        <Button variant="ghost" className="flex items-center gap-3 text-lg">
          <X className="size-5" />
          Cancelar Venda - Esc
        </Button>
      }
      type="delete"
      title="Cancelar Venda"
      description="Deseja realmente cancelar a venda? Todos os produtos adicionados serão removidos."
      onSubmit={onConfirm}
    />
  );
};
