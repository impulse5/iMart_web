import { useState, useEffect } from "react";
import { Dialog, DialogContent } from "@/components/ui/Dialog/dialog";
import { Input } from "@/components/ui/Input/input";
import { Button } from "@/components/ui/Button/button";
import { productBarcodeService } from "@/services/CashierService";
interface EditQuantityModalProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  product: any;
  updateProductQuantity: (code: string, quantity: number) => void; 
}

export const EditQuantityModal = ({ isOpen, setOpen, product, updateProductQuantity }: EditQuantityModalProps) => {
  const [quantity, setQuantity] = useState<number>(product.quantity);
  const [maxQuantity, setMaxQuantity] = useState<number>(0);

 

  const fetchMaxQuantity = async (barcode: string) => {
    try {
      const data = await productBarcodeService(barcode);
      console.log(data)
      const stockQuantity = data.storage.total_quantity;
      setMaxQuantity(stockQuantity);
      console.log("Updated maxQuantity:", stockQuantity);        
    } catch (error) {
      console.error("Erro ao buscar a quantidade do produto:", error);
    }
  };

  useEffect(() => {
    if (isOpen) {
      fetchMaxQuantity(product.code);
    }
  }, [isOpen, product.barcode]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value, 10);
    setQuantity(isNaN(value) ? 1 : Math.min(Math.max(value, 1), maxQuantity));
  };

  const handleSave = () => {
    updateProductQuantity(product.code, quantity);
    setOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="bg-neutral-900 text-white p-6">
        <h2 className="text-lg font-semibold mb-4">Editar Quantidade</h2>
        <Input
          type="number"
          value={quantity}
          onChange={handleChange}
          placeholder="Quantidade"
          min="1"
          max={maxQuantity}
          className="mb-4"
        />
        <p className="text-sm text-gray-400 mb-4">Máximo disponível: {maxQuantity}</p>
        <div className="flex justify-end gap-4">
          <Button variant="secondary" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={handleSave}>Salvar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
