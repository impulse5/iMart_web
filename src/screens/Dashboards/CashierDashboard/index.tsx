import { CustomTHead } from "@/components/CustomTHead"
import { TableCell } from "@/components/Table/tableCell"
import { Button } from "@/components/ui/Button/button"
import { UserDropdown } from "@/components/UserDropdown/Dropdown"
import { EditIcon, RemoveIcon } from "@/components/Icons/index"
import {X, Search, ShoppingCart } from "lucide-react"
import { ProductDetails } from "./components"
import { useEffect, useState } from "react"
interface CashierDashboardProps {
    code: string
    product: string
    quantity: number
    price: number
    total: number
    valueUnd: number
}

const CashierDashboard = () => {
    const [sale, setSale] = useState<CashierDashboardProps[]>([
        {
            code: '1',
            product: 'Salame',
            quantity: 1,
            price: 100,
            total: 100,
            valueUnd: 100
        },
        {
            code: '2',
            product: 'Chicken',
            quantity: 1,
            price: 100,
            total: 100,
            valueUnd: 100
        },
        {
            code: '3',
            product: 'Banana',
            quantity: 1,
            price: 100,
            total: 100,
            valueUnd: 100
        },
        {
            code: '4',
            product: 'paçoca',
            quantity: 1,
            price: 100,
            total: 100,
            valueUnd: 100
        },
        {
            code: '5',
            product: 'pé de moleque',
            quantity: 1,
            price: 100,
            total: 100,
            valueUnd: 100
        },
        {
            code: '6',
            product: 'Rapadura',
            quantity: 1,
            price: 100,
            total: 100,
            valueUnd: 100
        },
    ])

    function handleCancelSale() {
       if(window.confirm('Deseja realmente cancelar a venda?')) {
            setSale([])
       }
    }

    useEffect(() => {
        const handleKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") {  
                handleCancelSale();
            }
        };

        window.addEventListener("keydown", handleKeyDown);

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
        };
    }, []); 

    const total = sale.reduce((acc, item) => acc + item.total, 0);


    return (
        <main className="w-full h-screen bg-[#010101] text-white overflow-hidden flex">
            <div className="flex-1 px-10">
                <div className="flex items-center gap-2 pt-6">
                    <UserDropdown />
                    <h1 className="text-3xl text-neutral-400 font-bold">iStriker</h1>
                </div>
                <div className="flex items-center justify-center gap-28 mt-4 mb-6 text-neutral-400">
                    <Button onClick={handleCancelSale} variant="ghost" className="flex items-center gap-3 text-lg">
                        <X  className="size-5"/>
                        Cancelar Venda - Esc</Button>
                    <Button variant="ghost" className="flex items-center gap-3 text-lg">
                        <Search className="size-5"/>
                        Buscar produtos - F2
                    </Button>
                    <Button variant="ghost" className="flex items-center gap-3 text-lg">
                        <ShoppingCart className="size-5"/>
                        Finalizar Venda - F12
                    </Button>
                </div>
                <div className="h-[344px] overflow-auto bg-tertiary">
                    <table className="table-fixed w-full mt-4 rounded-sm">
                        <CustomTHead fields={['Código', 'Produto', 'Qtd.', 'Valor Und/kg', 'Total']} />
                        <tbody>
                            {sale.map((item, index) => (
                                <tr key={index} className="min-w-full">
                                <TableCell>{item.code}</TableCell>
                                <TableCell>{item.product}</TableCell>
                                <TableCell>{item.quantity}</TableCell>
                                <TableCell>{item.valueUnd}</TableCell>
                                <TableCell>{item.total}</TableCell>
                                <td className="font-light text-lg mt-3 flex justify-center gap-5">
                                    <EditIcon />
                                    <RemoveIcon />
                                </td>
                            </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
                <div className="flex justify-between bg-primary py-4 items-center px-10 min-w-full">
                    <h1 className="text-2xl text-neutral-100 font-semibold uppercase">Total:</h1>
                    <h1 className="text-2xl text-neutral-100 font-semibold">R$ {total.toFixed(2)}</h1>
                </div>
                <h1 className="text-3xl font-bold uppercase py-6 px-8">Mãe Rainha - Supermercado</h1>
            </div>
            <div className="w-1/5 h-full bg-tertiary flex flex-col px-8 rounded-lg">
               <ProductDetails />
            </div>
        </main>
    )
}

export default CashierDashboard