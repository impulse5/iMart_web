import { Camera } from "lucide-react"

export const ProductDetails = () => {
    return (
        <>
            <div className="flex items-center justify-center my-4">
                <div className="flex items-center justify-center size-56 bg-slate-100">
                    <Camera className="size-40 text-slate-400"/>
                </div>
            </div>
                <div className="pl-6 space-y-2">
                    <h2 className="text-xl font-bold mb-4 -tracking-tight">Último produto escaneado</h2>
                    <div>
                        <p className="font-semibold text-lg">Código:</p> 
                        <span className="text-neutral-400">12345</span>
                    </div>
                    <div>
                        <p className="font-semibold text-lg">Produto:</p> 
                        <span className="text-neutral-400">little chicken</span>
                    </div>
                    <div>
                        <p className="font-semibold text-lg">Valor peso:</p> 
                        <span className="text-neutral-400">R$ 20,00</span>
                    </div>
                    <div>
                        <p className="font-semibold text-lg">Peso:</p> 
                        <span className="text-neutral-400">1 kg</span>
                    </div>
                    <div>
                        <p className="font-semibold text-lg">Total:</p> 
                        <span className="text-neutral-400">R$ 20,00</span>
                    </div>
            </div>
        </>
    )
}