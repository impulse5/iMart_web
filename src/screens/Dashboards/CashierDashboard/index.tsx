import { useState } from 'react';
import { CustomTHead } from "@/components/CustomTHead";
import { TableCell } from "@/components/Table/tableCell";
import { Button } from "@/components/ui/Button/button";
import { UserDropdown } from "@/components/UserDropdown/Dropdown";
import { EditIcon, RemoveIcon } from "@/components/Icons/index";
import { X, Search, ShoppingCart } from "lucide-react";
import { ProductDetails } from "./components";

const CashierDashboard = () => {
  const [products, setProducts] = useState<any[]>([]);

  const addProduct = (product: any) => {
    setProducts((prevProducts) => [...prevProducts, product]);
  };
  
const removeProduct = (code: string) => {
  setProducts((prevProducts) => prevProducts.filter(product => product.code !== code));
};

  return (
    <main className="w-full h-screen bg-[#010101] text-white overflow-hidden flex">
      <div className="flex-1 px-10">
        <div className="flex items-center gap-2 pt-6">
          <UserDropdown />
          <h1 className="text-3xl text-neutral-400 font-bold">iStriker</h1>
        </div>
        <div className="flex items-center justify-center gap-28 mt-4 mb-6 text-neutral-400">
          <Button variant="ghost" className="flex items-center gap-3 text-lg">
            <X className="size-5" />
            Cancelar Venda - Esc
          </Button>
          <Button variant="ghost" className="flex items-center gap-3 text-lg">
            <Search className="size-5" />
            Buscar produtos - F2
          </Button>
          <Button variant="ghost" className="flex items-center gap-3 text-lg">
            <ShoppingCart className="size-5" />
            Finalizar Venda - F12
          </Button>
        </div>
        <div className="h-[344px] overflow-auto bg-tertiary">
          <table className="table-fixed w-full mt-4 rounded-sm">
            <CustomTHead fields={['Código', 'Produto', 'Qtd.', 'Valor Und/kg', 'Total']} />
            <tbody>
              {products.map(product => (
                <tr key={product.code} className="min-w-full">
                  <TableCell>{product.code}</TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.total}</TableCell>
                  <td className="font-light text-lg mt-3 flex justify-center gap-5">
                    <EditIcon />
                    <RemoveIcon onClick={() => removeProduct(product.code)} className="cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between bg-primary py-4 items-center px-10 min-w-full">
          <h1 className="text-2xl text-neutral-100 font-semibold uppercase">Total:</h1>
          <h1 className="text-2xl text-neutral-100 font-semibold">R$ 100,00</h1>
        </div>
        <h1 className="text-3xl font-bold uppercase py-6 px-8">Mãe Rainha - Supermercado</h1>
      </div>
      <div className="w-1/5 h-full bg-tertiary flex flex-col px-8 rounded-lg">
        <ProductDetails addProduct={addProduct} />
      </div>
    </main>
  );
};

export default CashierDashboard;
