import { useState } from "react";
import { Toaster } from "@/components/ui/Toast/toaster";
import { DashboardHeader } from "@/components/DashboardHeader";
import { SearchInput } from "@/components/SearchInput";
import { CustomTHead } from "@/components/CustomTHead";
import { ProductService } from "@/services/ProductService";
import { TableCell } from "@/components/Table/tableCell";
import ReactLoading from 'react-loading';
import { ProductRequest, ProductResponse } from "@/types/products";
import { CreateProductModal, EditModal } from "./components";
import { DeleteModal } from "@/components/DeleteModal";

const ProductDashboard = () => {
  const { products, loading, update, destroy, create } = ProductService();
  const [search, setSearch] = useState<string>('');

  const [newProduct, setNewProduct] = useState<ProductRequest>({
    product: {
      id: "",
      barcode: '',
      name: '',
      price: 0,
      supplier_id: "",
      category_id: ""
    }
  });

  const [editProduct, setEditProduct] = useState<ProductRequest>({
    product: {
      id: "",
      barcode: '',
      name: '',
      price: 0,
      supplier_id: "",
      category_id: ""
    }
  });

  const handleCreate = async () => {
    await create(newProduct);
    setNewProduct({
      product: {
        id: '',
        barcode: '',
        name: '',
        price: 0,
        supplier_id: "",
        category_id: ""
      }
    });
  };

  const handleEdit = async () => {
    await update(editProduct);
    setEditProduct({
      product: {
        id: '',
        barcode: '',
        name: '',
        price: 0,
        supplier_id: "",
        category_id: ""
      }
    });
  };

  const filteredProducts = () => {
    if (!search) return products?.data;
    return products.data.filter((product: ProductResponse) =>
      product?.attributes?.name.toLowerCase().includes(search.toLowerCase())
    );
  };

  return (
    <main className="px-10 pt-2 w-full h-screen bg-[#010101] rounded-dashboard overflow-auto">
      <Toaster position="top-center" />
      <DashboardHeader title="Produtos" />
      <article className="my-4 bg-tertiary rounded-lg">
        <div className="flex rounded-lg py-2 px-10 justify-between bg-primary w-full items-center">
          <SearchInput search={search} setSearch={setSearch} />
          <CreateProductModal newProduct={newProduct} setNewProduct={setNewProduct} onSubmit={handleCreate} />
        </div>
        <table className="w-full">
          <CustomTHead fields={['Código de Barras', 'Nome', 'Preço', 'Fornecedor', 'Categoria']} />
          <tbody>
            {
              filteredProducts()?.map((product: ProductResponse) => (
                <tr key={product.id} className="border-b border-neutral-400/70">
                  <TableCell>{product?.attributes?.barcode}</TableCell>
                  <TableCell>{product?.attributes?.name}</TableCell>
                  <TableCell>{product?.attributes?.price}</TableCell>
                  <TableCell>{product?.attributes?.supplier?.name}</TableCell>
                  <TableCell>{product?.attributes?.category?.name}</TableCell>
                  <td className="font-light text-lg mt-3 flex justify-center gap-5">
                    <EditModal 
                      product={product} 
                      setEditedProduct={setEditProduct} 
                      editedProduct={editProduct} 
                      onSubmit={handleEdit} 
                    />
                    <DeleteModal prefix="o" entity="produto" handleDelete={() => destroy(product.id)} />
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
        {
          loading && (
            <div className="flex justify-center items-center h-52">
              <ReactLoading type="bars" color="#fff" height={100} width={100} />
            </div>
          )
        }
      </article>
    </main>
  );
};

export default ProductDashboard;
