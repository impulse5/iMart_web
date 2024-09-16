import { useState } from "react";
import { Button } from "@/components/ui/Button/button";
import { Dialog, DialogContent } from "@/components/ui/Dialog/dialog";
import { Input } from "@/components/ui/Input/input";
import { getUserId } from "@/services/CashierService";
import { CashierService } from "@/services/CashierService/utils";

interface CashWithdrawalModalProps {
    isOpen: boolean;
    setOpen: (open: boolean) => void;
}

export function CashWithdrawalModal({ isOpen, setOpen }: CashWithdrawalModalProps) {
    const { cashWithdrawal } = CashierService()
    const [value, setValue] = useState(0); 
    const [isLoginModalOpen, setLoginModalOpen] = useState(false); 
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");

    const handleSubmitValue = () => {
        setOpen(false); 
        setLoginModalOpen(true); 
    };

    const handleLoginAndSubmit = async () => {
        try {
            const userId = await getUserId(email, password);
            await cashWithdrawal({ value, authorized_by: userId }); 
            setLoginModalOpen(false);
        } catch (error) {
            console.error("Erro ao fazer a retirada de dinheiro:", error);
        }
    };

    return (
        <>
            <Dialog open={isOpen} onOpenChange={setOpen}>
                <DialogContent className="bg-neutral-900 text-white p-6 w-96">
                    <h2 className="text-lg font-semibold mb-4">Editar Quantidade</h2>
                    <Input
                        label="Valor da sangria"
                        placeholder="Quantidade"
                        value={value}
                        onChange={(e) => setValue(Number(e.target.value))} 
                        className="mb-4"
                    />
                    <div className="flex justify-end gap-4 mt-2">
                        <Button variant="secondary" onClick={() => setOpen(false)}>
                            Cancelar
                        </Button>
                        <Button onClick={handleSubmitValue}>
                            Salvar e Autenticar
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>

            <Dialog open={isLoginModalOpen} onOpenChange={setLoginModalOpen}>
                <DialogContent className="bg-neutral-900 text-white p-6 w-96">
                    <h2 className="text-lg font-semibold mb-4">Autenticação</h2>
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
                    <div className="flex justify-end gap-4 mt-2">
                        <Button variant="secondary" onClick={() => setLoginModalOpen(false)}>
                            Cancelar
                        </Button>
                        <Button onClick={handleLoginAndSubmit}>
                            Autenticar e Confirmar
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
