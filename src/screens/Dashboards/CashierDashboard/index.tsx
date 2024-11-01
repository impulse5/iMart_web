import { useEffect, useState } from 'react';
import { CustomTHead } from "@/components/CustomTHead";
import { TableCell } from "@/components/Table/tableCell";
import { Button } from "@/components/ui/Button/button";
import { UserDropdown } from "@/components/UserDropdown/Dropdown";
import { RemoveIcon } from "@/components/Icons/index";
import { Calculator, CircleDollarSign, EditIcon, Search, ShoppingCart, X } from "lucide-react";
import { ProductDetails } from "./components";
import { useAuthentication } from '@/contexts/AuthenticationContext';
import { toast } from '@/components/ui/Toast/use-toast';
import { Toaster } from "@/components/ui/Toast/toaster";
import { createSale } from '@/services/CashierService';
import SearchProductModal from '@/components/SearchProductModal';
import { ConfirmSaleModal } from './components/confirmSaleModal';
import { CancelSaleModal } from './components/cancelSaleModal';
import { EditQuantityModal } from './components/editSaleModal';
import CalculatorModal from './components/calculatorModal';
import { CashWithdrawalModal } from './cashWithdrawalsModal';
import { RemoveProductModal } from './components/removeProductModal';

const CashierDashboard = () => {
  const { user } = useAuthentication();
  const [products, setProducts] = useState<any[]>([]);
  const [searchModalOpen, setSearchModalOpen] = useState(false);
  const [isCancelSaleModalOpen, setCancelSaleModalOpen] = useState(false);
  const [isConfirmSaleModalOpen, setConfirmSaleModalOpen] = useState(false);
  const [editProduct, setEditProduct] = useState<any | null>(null);
  const [isEditQuantityModalOpen, setEditQuantityModalOpen] = useState(false);
  const [isCalculatorModalOpen, setCalculatorModalOpen] = useState(false);
  const [isCashWithdrawalModalOpen, setCashWithdrawalModalOpen] = useState(false);
  const [isRemoveProductModalOpen, setRemoveProductModalOpen] = useState(false);
  const [productToRemove, setProductToRemove] = useState<any | null>(null);


  type PaymentMethod = "pix" | "credit" | "debit" | "money";

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.ctrlKey && event.key === 'k') {
        event.preventDefault();
        setCalculatorModalOpen(true);
      }
  
      if (event.key === 'F2') {
        setSearchModalOpen(true);
      } else if (event.key === 'Escape') {
        event.preventDefault()
        setCancelSaleModalOpen(true);
      } else if (event.key === 'F6') {
        if (isCancelSaleModalOpen) {
          setCancelSaleModalOpen(false);
        } else if (isConfirmSaleModalOpen) {
          setConfirmSaleModalOpen(false);
        } else if (isEditQuantityModalOpen) {
          setEditQuantityModalOpen(false);
        }
      } 
      else if(event.key === 'F10') {
        event.preventDefault();
        setCashWithdrawalModalOpen(true)
      }
      else if (event.key === 'F9') {
        if (products.length > 0 && !isConfirmSaleModalOpen) {
          setConfirmSaleModalOpen(true);
        }
      }
    };
  
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isCancelSaleModalOpen, isConfirmSaleModalOpen, isEditQuantityModalOpen, products.length]);
  

  const addProduct = (product: any) => {
    setProducts((prevProducts) => {
      const isProductExists = prevProducts.some((p) => p.code === product.code);
      if (isProductExists) {
        toast({
          title: 'Produto já registrado',
          description: 'Este produto já está na lista.',
          duration: 3000,
          variant: 'error'
        });
        return prevProducts;
      }
      return [...prevProducts, product];
    });
  };

  const handleRemoveProduct = () => {
    if (productToRemove) {
      removeProduct(productToRemove.code);
      setRemoveProductModalOpen(false);
    }
  };
  
  const openRemoveProductModal = (product: any) => {
    setProductToRemove(product);
    setRemoveProductModalOpen(true);
  };

  const removeProduct = (code: string) => {
    setProducts((prevProducts) => prevProducts.filter(product => product.code !== code));
    toast({
      title: 'Produto Removido',
      description: 'O produto foi removido da lista!',
      duration: 3000,
      variant: 'success'
    });
  };

  const updateProductQuantity = (barcode: string, quantity: number) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.code === barcode
          ? { ...product, quantity, total: product.price * quantity }
          : product
      )
    );
    toast({
      title: 'Produto Atualizado',
      description: 'A quantidade foi atualizada com sucesso!',
      duration: 3000,
      variant: 'success',
    });
  };

  const calculateTotal = () => {
    return products.reduce((total, product) => total + product.total, 0).toFixed(2);
  };

  const handleCancelSale = () => {
    setProducts([]);
    setCancelSaleModalOpen(false);
  };

  const handleCompleteSale = async (cpf: string, paymentMethod: PaymentMethod) => {
    if (products.length === 0) {
      toast({
        title: 'Nenhum produto',
        description: 'Adicione produtos antes de finalizar a venda.',
        duration: 3000,
        variant: 'error'
      });
      return;
    }

    const saleData = {
      package_sell: {
        client_cpf: cpf,
        payment_method: paymentMethod,
        sells_attributes: products.map(product => ({
          product_id: product.code,
          amount: product.quantity
        }))
      }
    };

    try {
      await createSale(saleData);
      setProducts([]);
      setConfirmSaleModalOpen(false);
      toast({
        title: 'Venda realizada',
        description: 'A venda foi registrada com sucesso.',
        duration: 3000,
        variant: 'success'
      });
    } catch (error) {
      toast({
        title: 'Erro ao finalizar venda',
        description: 'Não foi possível registrar a venda.',
        duration: 3000,
        variant: 'error'
      });
    }
  };

  const openEditQuantityModal = (product: any) => {
    setEditProduct(product);
    setEditQuantityModalOpen(true);
  };

  return (
    <main className="w-full h-screen bg-[#010101] text-white overflow-hidden flex">
      <div className="flex-1 px-10">
        <Toaster position="top-center" />
        <div className="flex items-center gap-2 pt-6">
          <UserDropdown />
          <h1 className="text-3xl text-neutral-400 font-bold">{user?.name || 'Nome do Caixa'}</h1>
        </div>
        <div className="grid grid-cols-3 gap-4 mt-4 mb-6 text-neutral-400">
        {products.length > 0 && 
          <Button variant="ghost" className="flex items-center gap-3 text-lg" onClick={() => setCancelSaleModalOpen(true)}>
            <X className="size-5" />
            Cancelar Venda - ESC
          </Button>}
          <Button variant="ghost" className="flex items-center gap-3 text-lg" onClick={() => setSearchModalOpen(true)}>
            <Search className="size-5" />
            Buscar produtos - F2
          </Button>
          {products.length > 0 && 
          <Button variant="ghost" className="flex items-center gap-3 text-lg" onClick={() => setConfirmSaleModalOpen(true)}>
            <ShoppingCart className="size-5" />
            Finalizar Venda - F9
          </Button>
          }
          <Button variant="ghost" className="flex items-center gap-3 text-lg" onClick={() => setCalculatorModalOpen(true)}>
            <Calculator className="size-5" />
            Calculadora - CTRL + K
          </Button>
          <Button variant="ghost" className="flex items-center gap-3 text-lg" onClick={() => setCashWithdrawalModalOpen(true)}>
            <CircleDollarSign className="size-5" />
            Sangria do Caixa - F10
          </Button>
        </div>
        <div className="h-[344px] overflow-auto bg-tertiary">
            <table className="w-full mt-4 table-auto rounded-sm">
              <CustomTHead fields={['Código', 'Produto', 'Qtd.', 'Valor Und/kg', 'Total']} />
              <tbody>
                {products.map(product => (
                  <tr key={product.code} className="">
                    <TableCell className="w-1/6">{product.code}</TableCell>
                    <TableCell className="w-2/6">{product.name}</TableCell>
                    <TableCell className="w-1/6">{product.quantity}</TableCell>
                    <TableCell className="w-1/6">{product.price}</TableCell>
                    <TableCell className="w-1/6">{product.total}</TableCell>
                    <td className="font-light text-lg mt-3 flex justify-center gap-5">
                      <EditIcon className="cursor-pointer" onClick={() => openEditQuantityModal(product)} />
                      <RemoveIcon onClick={() => openRemoveProductModal(product)} className="cursor-pointer" />
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        <div className="flex justify-between bg-primary py-4 items-center px-10 min-w-full">
          <h1 className="text-2xl text-neutral-100 font-semibold uppercase">Total:</h1>
          <h1 className="text-2xl text-neutral-100 font-semibold">R$ {calculateTotal()}</h1>
        </div>
        <h1 className="text-3xl font-bold uppercase py-6 px-8">{user?.market?.name || 'Nome do Mercado'}</h1>
      </div>
      <div className="w-1/5 h-full bg-tertiary flex flex-col px-8 rounded-lg">
        <ProductDetails addProduct={addProduct} />
      </div>
      <SearchProductModal 
        isOpen={searchModalOpen}
        setOpen={setSearchModalOpen}
        onSelectProduct={addProduct}
      />
      <CancelSaleModal 
        isOpen={isCancelSaleModalOpen}
        setOpen={setCancelSaleModalOpen}
        onConfirm={handleCancelSale}
      />
      <RemoveProductModal
        isOpen={isRemoveProductModalOpen}
        setOpen={setRemoveProductModalOpen}
        onConfirm={handleRemoveProduct}
      />
      <ConfirmSaleModal 
        isOpen={isConfirmSaleModalOpen}
        setOpen={setConfirmSaleModalOpen}
        onConfirm={handleCompleteSale}
      />

      {editProduct && (
        <EditQuantityModal 
          isOpen={isEditQuantityModalOpen}
          setOpen={setEditQuantityModalOpen}
          product={editProduct}
          updateProductQuantity={updateProductQuantity}
        />
      )}
      <CalculatorModal 
        isOpen={isCalculatorModalOpen} 
        setOpen={setCalculatorModalOpen} 
      />
      <CashWithdrawalModal 
        isOpen={isCashWithdrawalModalOpen}
        setOpen={setCashWithdrawalModalOpen}
      />
    </main>
  );
};

export default CashierDashboard;
