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
    const [loading, setLoading] = useState(false);

    const handleSubmitValue = () => {
        setOpen(false); 
        setLoginModalOpen(true); 
    };

    const handleLoginAndSubmit = async () => {
        setLoading(true);
        try {
            const userId = await getUserId(email, password);
            await cashWithdrawal({ value, authorized_by: userId }); 
            setLoginModalOpen(false);
        } catch (error) {
            console.error("Erro ao fazer a retirada de dinheiro:", error);
        }
        finally {
            setLoading(false)
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
                        <Button onClick={handleLoginAndSubmit} variant="default" disabled={loading}>
                            {loading ? (
                                <div className="flex items-center">
                                    <svg className="animate-spin h-5 w-5 mr-3 text-white" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12a8 8 0 018-8v0a8 8 0 010 16v0a8 8 0 01-8-8z" />
                                    </svg>
                                    Autenticando...
                                </div>
                            ) : (
                                'Autenticar e Confirmar'
                            )}
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
}
