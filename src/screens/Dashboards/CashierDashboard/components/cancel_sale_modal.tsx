import { Button } from "@/components/ui/Button/button";
import { Dialog, DialogContent } from "@/components/ui/Dialog/dialog";


interface CancelSaleModalProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: () => void;
}

export const CancelSaleModal = ({ isOpen, setOpen, onConfirm }: CancelSaleModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="bg-neutral-900 text-white p-6">
        <h2 className="text-lg font-semibold mb-4">Cancelar Venda</h2>
        <p className="mb-4">Deseja realmente cancelar a venda? Todos os produtos adicionados serão removidos.</p>
        <div className="flex justify-end gap-4">
          <Button variant="secondary" onClick={() => setOpen(false)}>Cancelar</Button>
          <Button onClick={onConfirm} color="red">Confirmar</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
