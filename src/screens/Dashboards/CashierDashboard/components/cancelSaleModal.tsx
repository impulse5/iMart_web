import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/Button/button";
import { Dialog, DialogContent } from "@/components/ui/Dialog/dialog";
import { Input } from "@/components/ui/Input/input";
import { getUserId } from "@/services/CashierService";
import { toast } from '@/components/ui/Toast/use-toast';

interface CancelSaleModalProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  onConfirm: () => void;
}

export const CancelSaleModal = ({ isOpen, setOpen, onConfirm }: CancelSaleModalProps) => {
  const [isAuthRequired, setIsAuthRequired] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Enter' && isOpen) {
        if (isAuthRequired) {
          handleLoginAndCancel();
        } else {
          setIsAuthRequired(true);
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, isAuthRequired]);

  const handleLoginAndCancel = async () => {
    setLoading(true);
    try {
      const userId = await getUserId(email, password);
      if (userId) {
        toast({
          title: 'Autenticação bem-sucedida',
          description: 'Venda cancelada!',
          duration: 3000,
          variant: 'success',
        });
        setOpen(false);
        onConfirm(); 
      }
    } catch (error) {
      toast({
        title: 'Erro na autenticação',
        description: 'Email ou senha incorretos.',
        duration: 3000,
        variant: 'error',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="bg-neutral-900 text-white p-6 w-96">
        <h2 className="text-lg font-semibold mb-4">Cancelar Venda</h2>
        {!isAuthRequired ? (
          <>
            <p className="mb-4">Deseja realmente cancelar a venda? Todos os produtos adicionados serão removidos.</p>
            <div className="flex justify-end gap-4">
              <Button variant="secondary" onClick={() => setOpen(false)}>Voltar</Button>
              <Button onClick={() => setIsAuthRequired(true)} color="red">Confirmar</Button>
            </div>
          </>
        ) : (
          <>
            <h3 className="mb-4">Autenticação necessária</h3>
            <Input
              label="Email"
              placeholder="Digite o email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mb-4"
            />
            <Input
              label="Senha"
              placeholder="Digite a senha"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mb-4"
            />
            <div className="flex justify-end gap-4">
              <Button variant="secondary" onClick={() => setIsAuthRequired(false)}>
                Voltar
              </Button>
              <Button onClick={handleLoginAndCancel} variant="default" disabled={loading}>
                {loading ? (
                  <div className="flex items-center">
                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12a8 8 0 018-8v0a8 8 0 010 16v0a8 8 0 01-8-8z" />
                    </svg>
                    Autenticando...
                  </div>
                ) : (
                  'Autenticar e Cancelar Venda'
                )}
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
