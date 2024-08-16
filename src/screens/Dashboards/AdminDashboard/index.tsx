import { CustomTHead } from "@/components/CustomTHead";
import { DashboardHeader } from "@/components/DashboardHeader";
import { ActivateIcon, RemoveIcon } from "@/components/Icons";
import { SearchInput } from "@/components/SearchInput";
import { TableCell } from "@/components/Table/tableCell";
import { Badge } from "@/components/ui/Badge/badge";
import { useState } from "react";

const EMPRESAS = [
    {
        id: '1',
        name: 'Mãe Rainha Supermercado'
    },
    {
        id: '2',
        name: 'Supermercado São José'
    },
]

const AdminDashboard = () => {
    const [search, setSearch] = useState<string>('');

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
                EMPRESAS.map((empresa: any, index) => (
                  <tr key={index} className="border-b border-neutral-400/70">
                    <TableCell>{empresa.name}</TableCell>
                    <TableCell className="font-light text-lg mt-3 flex justify-center gap-5">
                      <Badge>Ativo</Badge>
                    </TableCell>
                    <td className="font-light text-lg mt-3 flex justify-center gap-5">
                      <RemoveIcon />
                      <ActivateIcon />
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </article>
      </main>
     );
}
 
export default AdminDashboard;