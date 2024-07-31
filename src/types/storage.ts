interface Supplier {
    id: string;
    name: string;
}

interface Product {
    barcode: string;
    name: string;
    supplier: Supplier;
}

interface StorageAttributes {
    batch: string;
    quantity: number;
    product: Product;
}

export interface StorageRequest {
    id: string;
    type: string;
    attributes: StorageAttributes;
}
