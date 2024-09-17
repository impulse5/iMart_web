import { CustomTHead } from "@/components/CustomTHead";
import { DashboardHeader } from "@/components/DashboardHeader";
import { SearchInput } from "@/components/SearchInput";
import { TableCell } from "@/components/Table/tableCell";
import { Toaster } from "@/components/ui/Toast/toaster";
import { StorageService } from "@/services/StorageService";
import { useState } from "react";
import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
import { StorageRequest } from "@/types/storage";
import { QrCodeIcon } from "@/components/Icons/index"

const StorageDashboard = () => {

  const [search, setSearch] = useState<string>('');

  const { storages, loading } = StorageService();

  const filterStorages = () => {
    if (!search) return storages;
    return storages?.filter((storage) => 
      storage.attributes.product.name.toLowerCase().includes(search.toLowerCase()) 
    );
  };

  return (
    <main className="px-10 pt-2 w-full h-screen bg-[#010101] rounded-dashboard overflow-auto">
      <Toaster position="top-center" />
      <DashboardHeader title="Estoque" />
      <article className="my-4 bg-tertiary rounded-lg">
        <div className="flex rounded-lg py-2 px-10 justify-between bg-primary w-full items-center">
          <SearchInput  search={search} setSearch={setSearch}/> 
        </div>
        <table className="w-full">
          <CustomTHead fields={['Produto', 'Código', 'Lote', 'Fornecedor', 'Qtd.']} />
          <tbody>
          {
              filterStorages()?.map((storage: StorageRequest) => (
                <tr key={storage.id} className="border-b border-neutral-400/70">
                    <TableCell>{storage?.attributes?.product?.name}</TableCell>
                    <TableCell>{storage?.attributes?.product?.barcode}</TableCell>
                    <TableCell>{storage?.attributes?.batch}</TableCell>
                    <TableCell>{storage?.attributes?.product?.supplier?.name}</TableCell>
                    <TableCell>{storage?.attributes?.quantity}</TableCell>
                    <Link to={`/estoques/${storage.id}`} target="_blank" className="font-light text-lg mt-3 flex justify-center gap-5">
                      <QrCodeIcon />
                    </Link>  
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
  )
    }

export default StorageDashboard;