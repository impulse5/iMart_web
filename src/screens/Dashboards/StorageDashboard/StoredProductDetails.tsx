import { useParams } from "react-router-dom";
import { StorageService } from "@/services/StorageService";
import { LogoBlack } from "@/assets/imart_logo_black";
import QRcode from "react-qr-code"
import ReactLoading from "react-loading";

const StoredProductDetails = () => {

    const { storageId } = useParams<{ storageId: string}>()

    const { product, isProductLoading } = StorageService(storageId);

    if (isProductLoading) {
        return (
            <main className="flex justify-center items-center h-screen">
                <ReactLoading type="bars" color="#000" height={100} width={100} />
            </main>
        )
    }
    
    return (
        <main className="p-1">
            <div className="flex items-center border-black w-[442px] border-2 px-4 pb-4 gap-3">
                <div className="flex flex-col items-center">
                  <LogoBlack height={60} width={80}/>
                  <QRcode className="size-40" value={`storage###${product?.id}` as string} />
                </div>
                <div className="flex flex-col justify-center mt-5">
                    <p><strong className="font-bold">Lote:</strong> {product?.attributes?.batch}</p>
                    <p><strong className="font-bold">Produto:</strong> {product?.attributes?.product?.name}</p>
                    <p><strong className="font-bold">Fornecedor:</strong> {product?.attributes?.product?.supplier?.name}</p>
                </div>
            </div>
        </main>
    );
}

export default StoredProductDetails;