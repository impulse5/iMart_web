export interface ProductSupplier {
  id: string,
  name: string
}

export interface ProductCategory {
  id: string;
  name: string;
}

export interface ProductAttributes {
  id: string;
  barcode: string;
  name: string;
  price: number | any;
  supplier?: ProductSupplier;
  category?: ProductCategory;
  supplier_id?: string;
  category_id?: string;
}

export type ProductResponse = {
  id: string;
  attributes: ProductAttributes;
}

export type ProductRequest = {
  product: Omit<ProductAttributes, 'supplier' | 'category'>;
}
