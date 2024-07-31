import { useState, useEffect } from "react";
import { CustomModal } from "@/components/CustomModal";
import { ProductRequest, ProductResponse } from "@/types/products";
import { EditIcon } from "@/components/Icons";
import { SupplierService } from "@/services/SupplierService";
import { CategoryService } from "@/services/CategoryService";

type CreateProductModalProps = {
  newProduct: ProductRequest;
  setNewProduct: (product: ProductRequest) => void;
  onSubmit: () => void;
};

const formatPrice = (value: string) => {
  if (!value) return '';
  const cleanValue = value.replace(/\D/g, '');
  const numberValue = (parseInt(cleanValue, 10) / 100).toFixed(2).replace('.', ',');
  return `R$ ${numberValue}`;
};

export const CreateProductModal = ({ newProduct, setNewProduct, onSubmit }: CreateProductModalProps) => {
  const [supplierOptions, setSupplierOptions] = useState<{ value: string; label: string }[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<{ value: string; label: string }[]>([]);
  
  const { suppliers, loading: suppliersLoading } = SupplierService();
  const { categories, loading: categoriesLoading } = CategoryService();

  useEffect(() => {
    if (!suppliersLoading && suppliers) {
      setSupplierOptions(suppliers.data.map((supplier: any) => ({
        value: supplier.id,
        label: supplier.attributes.name || 'N/A'
      })));
    }
  }, [suppliers, suppliersLoading]);

  useEffect(() => {
    if (!categoriesLoading && categories) {
      setCategoryOptions(categories.data.map((category: any) => ({
        value: category.id,
        label: category.attributes.name || 'N/A'
      })));
    }
  }, [categories, categoriesLoading]);

  if (categoriesLoading || suppliersLoading) {
    return <div>...</div>;
  }

  return (
    <CustomModal
      title="Cadastrar produto"
      trigger={
        <button className="bg-[#010101] py-1.5 px-10 rounded-lg">Cadastrar Produto</button>
      }
      type="create"
      fields={[
        { 
          id: 'barcode', 
          label: 'Código de Barras', 
          type: 'text', 
          placeholder: '1234567890123', 
          value: newProduct.product.barcode, 
          onChange: (e) => setNewProduct({ product: { ...newProduct.product, barcode: e.target.value }})
        },
        { 
          id: 'name', 
          label: 'Nome', 
          type: 'text', 
          placeholder: 'Produto Exemplo', 
          value: newProduct.product.name, 
          onChange: (e) => setNewProduct({ product: { ...newProduct.product, name: e.target.value }})
        },
        { 
          id: 'price', 
          label: 'Preço', 
          type: 'text', 
          placeholder: 'R$ 0,00', 
          value: newProduct.product.price ? formatPrice(newProduct.product.price.toString()) : '', 
          onChange: (e) => {
            const inputValue = e.target.value.replace(/\D/g, '');
            const formattedValue = (parseInt(inputValue, 10) / 100).toFixed(2);
            setNewProduct({ product: { ...newProduct.product, price: formattedValue }});
          }
        },
        { 
          id: 'supplier_id', 
          label: 'Fornecedor', 
          type: 'select', 
          placeholder: 'Fornecedor', 
          value: newProduct.product.supplier_id || '', 
          onChange: (e) => setNewProduct({ product: { ...newProduct.product, supplier_id: e.target.value }})
        },
        { 
          id: 'category_id', 
          label: 'Categoria', 
          type: 'select', 
          placeholder: 'Categoria', 
          value: newProduct.product.category_id || '', 
          onChange: (e) => setNewProduct({ product: { ...newProduct.product, category_id: e.target.value }})
        },
      ]}
      selectOptions={{
        supplier_id: supplierOptions,
        category_id: categoryOptions
      }}
      onSubmit={onSubmit}
    />
  );
};

type EditModalProps = {
  product: ProductResponse;
  setEditedProduct: (product: ProductRequest) => void;
  editedProduct: ProductRequest;
  onSubmit: (id: string) => void;
};

export const EditModal = ({ onSubmit, setEditedProduct, editedProduct, product }: EditModalProps) => {
  const [supplierOptions, setSupplierOptions] = useState<{ value: string; label: string }[]>([]);
  const [categoryOptions, setCategoryOptions] = useState<{ value: string; label: string }[]>([]);
  
  const { suppliers, loading: suppliersLoading } = SupplierService();
  const { categories, loading: categoriesLoading } = CategoryService();

  useEffect(() => {
    if (!suppliersLoading && suppliers) {
      if (Array.isArray(suppliers.data)) {
        setSupplierOptions(suppliers.data.map((supplier: any) => ({
          value: supplier.id,
          label: supplier.attributes.name || 'N/A'
        })));
      } else {
        throw new Error("Erro ao carregar fornecedores");
      }
    }
  }, [suppliers, suppliersLoading]);
  
  useEffect(() => {
    if (!categoriesLoading && categories) {
      if (Array.isArray(categories.data)) {
        setCategoryOptions(categories.data.map((category: any) => ({
          value: category.id,
          label: category.attributes.name || 'N/A'
        })));
      } else {
        throw new Error("Erro ao carregar categorias");
      }
    }
  }, [categories, categoriesLoading]);

  useEffect(() => {
    if (product) {
      setEditedProduct({
        product: {
          id: product.id,
          barcode: product.attributes.barcode,
          name: product.attributes.name,
          price: product.attributes.price,
          supplier_id: product.attributes.supplier_id,
          category_id: product.attributes.category_id
        }
      });
    }
  }, [product, setEditedProduct]);

  if (categoriesLoading || suppliersLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <CustomModal
      type="edit"
      title="Editar produto"
      fields={[
        { 
          id: 'barcode', 
          label: 'Código de Barras', 
          type: 'text', 
          placeholder: '1234567890123', 
          value: editedProduct.product.barcode, 
          onChange: (e) => setEditedProduct({ product: { ...editedProduct.product, barcode: e.target.value }})
        },
        { 
          id: 'name', 
          label: 'Nome', 
          type: 'text', 
          placeholder: 'Produto Exemplo', 
          value: editedProduct.product.name, 
          onChange: (e) => setEditedProduct({ product: { ...editedProduct.product, name: e.target.value }})
        },
        { 
          id: 'price', 
          label: 'Preço', 
          type: 'text', 
          placeholder: 'R$ 0,00', 
          value: editedProduct.product.price ? `R$ ${parseFloat(editedProduct.product.price).toFixed(2).replace('.', ',')}` : '', 
          onChange: (e) => {
            const inputValue = e.target.value.replace(/\D/g, '');
            const formattedValue = (parseInt(inputValue, 10) / 100).toFixed(2);
            setEditedProduct({ product: { ...editedProduct.product, price: formattedValue }});
          }
        },
        { 
          id: 'supplier_id', 
          label: 'Fornecedor', 
          type: 'select', 
          placeholder: 'Fornecedor', 
          value: editedProduct.product.supplier_id || '', 
          onChange: (e) => setEditedProduct({ product: { ...editedProduct.product, supplier_id: e.target.value }})
        },
        { 
          id: 'category_id', 
          label: 'Categoria', 
          type: 'select', 
          placeholder: 'Categoria', 
          value: editedProduct.product.category_id || '', 
          onChange: (e) => setEditedProduct({ product: { ...editedProduct.product, category_id: e.target.value }})
        },
      ]}
      selectOptions={{
        supplier_id: supplierOptions,
        category_id: categoryOptions
      }}
      trigger={<EditIcon />}
      onSubmit={() => onSubmit(product.id)}
    />
  );
};