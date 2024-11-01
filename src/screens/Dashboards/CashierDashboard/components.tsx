// @ts-ignore
import Quagga from 'quagga';
import { useEffect, useRef, useState } from 'react';
import { productBarcodeService } from '@/services/CashierService';
import { toast } from '@/components/ui/Toast/use-toast';

interface ProductDetailsProps {
  addProduct: (product: any) => void;
}

export const ProductDetails: React.FC<ProductDetailsProps> = ({ addProduct }) => {
  const scannerRef = useRef<HTMLDivElement>(null);
  const [scannedData, setScannedData] = useState<string>("");
  const [productInfo, setProductInfo] = useState<any>(null);
  const [isScanning, setIsScanning] = useState<boolean>(false);
  const SCAN_DELAY = 2000;

  useEffect(() => {
    if (scannerRef.current) {
      Quagga.init(
        {
          inputStream: {
            name: 'Live',
            type: 'LiveStream',
            target: scannerRef.current,
            constraints: {
              facingMode: 'environment',
            }
          },
          area: {
            top: '0%',
            right: '0%',
            bottom: '0%',
            left: '0%'
          },
          decoder: {
            readers: [
              'ean_reader',
            ],
            multiple: false
          },
        },
        (err: any) => {
          if (err) {
            console.error(err);
            return;
          }
          Quagga.start();
        }
      );

      Quagga.onDetected(handleDetected);
    }

    return () => {
      Quagga.offDetected(handleDetected);
      Quagga.stop();
    };
  }, []);

  const handleDetected = async (result: any) => {
    if (isScanning) return;
  
    setIsScanning(true);
  
    const code = result.codeResult.code;
    setScannedData(code);
  
    Quagga.offDetected(handleDetected);
  
    try {
      const data = await productBarcodeService(code);
      const storageData = data.storage.product.data.attributes;
      const product = storageData

      
      if (product) {
        const maxQuantity = storageData.quantity;
        setProductInfo({
          ...product,
          maxQuantity: storageData.quantity,
        });
        
        addProduct({ 
          code: product.barcode, 
          name: product.name, 
          quantity: 1, 
          price: product.price,
          total: product.price,
          maxQuantity
        });
      } else {
        toast({
          title: 'Produto não encontrado',
          description: 'O produto escaneado não foi encontrado no sistema.',
          duration: 3000,
          variant: 'error'
        });
      }
    } catch (error) {
      console.error('Erro ao buscar informações do produto:', error);
      toast({
        title: 'Erro de busca',
        description: 'Não foi possível buscar informações do produto.',
        duration: 3000,
        variant: 'error'
      });
    } finally {
      setTimeout(() => {
        setIsScanning(false);
        Quagga.onDetected(handleDetected);
      }, SCAN_DELAY);
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center my-12 -mb-8">
        <div ref={scannerRef} id='camera' className="size-56 bg-transparent" />
      </div>
      <div className="pl-6 space-y-2">
        <h2 className="text-xl font-bold mb-4 -tracking-tight">Último produto escaneado</h2>
        <div>
          <p className="font-semibold text-lg">Código:</p>
          <span className="text-neutral-400">{scannedData || 'Nenhum código escaneado'}</span>
        </div>
        {productInfo && (
          <>
            <div>
              <p className="font-semibold text-lg">Produto:</p>
              <span className="text-neutral-400">{productInfo.name || 'Desconhecido'}</span>
            </div>
            <div>
              <p className="font-semibold text-lg">Valor peso:</p>
              <span className="text-neutral-400">R$ {productInfo.price || 'Desconhecido'}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
