import { useState } from "react";
import { Dialog, DialogContent } from "@/components/ui/Dialog/dialog";
import { Input } from "@/components/ui/Input/input";
import { Button } from "@/components/ui/Button/button";

interface ConfirmSaleModalProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: (cpf: string) => void;
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

export const ConfirmSaleModal = ({ isOpen, setOpen, onConfirm }: ConfirmSaleModalProps) => {
  const [cpf, setCpf] = useState<string>("");
  const [error, setError] = useState<string | null>(null);

  const handleConfirm = () => {
    if (validateCPF(cpf)) {
      onConfirm(cpf);
      setOpen(false);
    } else {
      setError("CPF inválido. Por favor, insira um CPF válido no formato XXX.XXX.XXX-XX.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const formattedCpf = formatCPF(e.target.value);
    setCpf(formattedCpf);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="bg-neutral-900 text-white p-6">
        <h2 className="text-lg font-semibold mb-4">Confirmar Venda</h2>
        <p className="mb-4">Por favor, insira o CPF do cliente para finalizar a venda.</p>
        <Input
          type="text"
          value={cpf}
          onChange={handleChange}
          placeholder="CPF do Cliente"
          className="mb-4"
        />
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-end gap-4">
          <Button variant="secondary" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleConfirm}>Confirmar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
