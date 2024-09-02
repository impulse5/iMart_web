import { ProductService } from "@/services/ProductService";
import { ProductResponse } from "@/types/products";
import { useState, useEffect, useRef } from "react";
import { Dialog, DialogContent } from "../ui/Dialog/dialog";
import { Input } from "../ui/Input/input";
import { TableCell } from "../Table/tableCell";

interface SearchProductModalProps {
  isOpen: boolean;
  setOpen: (open: boolean) => void;
  onSelectProduct: (product: any) => void;
}

const SearchProductModal = ({ setOpen, onSelectProduct, isOpen }: SearchProductModalProps) => {
  const { products } = ProductService();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const tableRef = useRef<HTMLTableElement>(null);

  const filteredProducts = () => {
    if (!searchTerm) return products?.data;
    return products.data.filter((product: ProductResponse) =>
      product?.attributes?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  };

  const handleSelectProduct = (product: any) => {
    onSelectProduct({
      code: product.id,
      name: product.attributes.name,
      quantity: 1,
      price: product.attributes.price,
      total: product.attributes.price,
    });
    setOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTableElement>) => {
    const productsList = filteredProducts();
    if (!productsList) return;

    if (event.key === "ArrowDown") {
      setSelectedIndex((prevIndex) => (prevIndex + 1) % productsList.length);
    } else if (event.key === "ArrowUp") {
      setSelectedIndex((prevIndex) => (prevIndex - 1 + productsList.length) % productsList.length);
    } else if (event.key === "Enter") {
      handleSelectProduct(productsList[selectedIndex]);
    }
  };

  useEffect(() => {
    if (isOpen && tableRef.current) {
      tableRef.current.focus(); 
      setSelectedIndex(0); 
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      <DialogContent className="bg-neutral-900 text-white border-none">
        <Input
          className="w-[400px]"
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Pesquisar produto..."
          tabIndex={-1}
        />
        <table
          className="w-full"
          onKeyDown={handleKeyDown}
          tabIndex={0} 
          ref={tableRef} 
        >
          <thead>
            <tr className="border-b border-neutral-400/70">
              <th className="pb-3 pt-3 pl-5 text-center text-secondary text-xl font-semibold">Código</th>
              <th className="pb-3 pt-3 pl-5 text-center text-secondary text-xl font-semibold">Nome</th>
              <th className="pb-3 pt-3 pl-5 text-center text-secondary text-xl font-semibold">Preço</th>
            </tr>
          </thead>
          <tbody>
            {filteredProducts()?.map((product: ProductResponse, index: number) => (
              <tr
                key={product.id}
                onClick={() => handleSelectProduct(product)}
                className={`cursor-pointer ${selectedIndex === index ? 'bg-neutral-800' : ''}`}
              >
                <TableCell>{product.attributes.barcode}</TableCell>
                <TableCell>{product.attributes.name}</TableCell>
                <TableCell>R$ {product.attributes.price}</TableCell>
              </tr>
            ))}
          </tbody>
        </table>
      </DialogContent>
    </Dialog>
  );
};

export default SearchProductModal;
