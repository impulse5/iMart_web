import { CustomTHead } from "@/components/CustomTHead";
import { DashboardHeader } from "@/components/DashboardHeader";
import { ActivateIcon, RemoveIcon } from "@/components/Icons";
import { SearchInput } from "@/components/SearchInput";
import { TableCell } from "@/components/Table/tableCell";
import { Badge } from "@/components/ui/Badge/badge";
import { AdminService } from "@/services/AdminService";
import ReactLoading from 'react-loading';

import { useState } from "react";
import { DeleteModal } from "@/components/DeleteModal";



const AdminDashboard = () => {

    const {markets, isLoading, destroy} = AdminService() 

    const [search, setSearch] = useState<string>('');


    const handleDelete = async (id: string) => {
      await destroy(id)
    }

    const filterMarkets = () => {
        if (!search) return markets
        return markets.filter((market: any) => market?.attributes?.name.toLowerCase().includes(search.toLowerCase()))
    }

    return ( 
        <main className="px-10 pt-2 w-full h-screen bg-[#010101] rounded-dashboard overflow-auto">
        <DashboardHeader title="Empresas" />
        <article className="my-4 bg-tertiary rounded-lg">
          <div className="flex rounded-lg py-2 px-10 justify-between bg-primary w-full items-center">
            <SearchInput search={search} setSearch={setSearch} />
            {/* <CreateModal newCategory={newCategory} setNewCategory={setNewCategory} handleCreate={handleCreate} /> */}
          </div>
          <table className="w-full">
            <CustomTHead fields={['Empresas', 'Status']} />
            <tbody>
              {
                filterMarkets()?.data?.map((market: any) => (
                  <tr key={market.attributes.id } className="border-b border-neutral-400/70">
                    <TableCell>{market.attributes.name}</TableCell>
                    <TableCell className="font-light text-lg mt-3 flex justify-center gap-5">
                      <Badge>Ativo</Badge>
                    </TableCell>
                    <td className="font-light text-lg mt-3 flex justify-center gap-5">
                      <DeleteModal entity="Mercado" prefix="o" handleDelete={() => handleDelete(market.attributes.id)}/>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          {
            isLoading && (
              <div className="flex justify-center items-center h-52">
                <ReactLoading type="bars" color="#fff" height={100} width={100} />
              </div>
          )
        }
        </article>
      </main>
     );
}
 
export default AdminDashboard;