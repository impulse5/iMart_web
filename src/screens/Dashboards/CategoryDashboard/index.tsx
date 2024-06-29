import { Toaster } from "@/components/ui/Toast/toaster";
import { DashboardHeader } from "@/components/DashboardHeader";
import ReactLoading from 'react-loading';
import { useState } from "react";
import { SearchInput } from "@/components/SearchInput";
import { CustomTHead } from "@/components/CustomTHead";
import { CategoryService } from "@/services/CategoryService";
import { useEffect } from "react";
const CategoryDashboard = () => {

  const { categories, loading } = CategoryService();

  useEffect(() => {
    console.log(categories?.data)
  }, [categories])

  const [search, setSearch] = useState<string>('');

  return (
    <main className="px-10 pt-2 w-full h-screen bg-[#010101] rounded-dashboard overflow-auto">
      <Toaster position="top-center" />
      <DashboardHeader title="Categorias" />
      <article className="my-4 bg-tertiary rounded-lg">
        <div className="flex rounded-lg py-2 px-10 justify-between bg-primary w-full items-center">
        <SearchInput search={search} setSearch={setSearch} />
        </div>
        <table className="w-full">
          <CustomTHead fields={['Nome']} />
          <tbody>
            {
              categories?.data?.map((category: any) => (
                <tr key={category.id} className="border-b border-neutral-400/70">
                  <td className="pl-5 py-3 text-secondary text-lg font-semibold">{category.attributes.name}</td>
                  <td className="text-center">
                    <button className="bg-primary text-secondary font-semibold text-lg px-3 py-1 rounded-lg">Editar</button>
                    <button className="bg-primary text-secondary font-semibold text-lg px-3 py-1 rounded-lg">Excluir</button>
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
  )
}

export default CategoryDashboard;