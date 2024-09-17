import { DashboardHeader } from "@/components/DashboardHeader";
import ReactLoading from 'react-loading';
import { useState } from "react";
import { SearchInput } from "@/components/SearchInput";
import { CustomTHead } from "@/components/CustomTHead";
import { CategoryService } from "@/services/CategoryService";
import { Toaster } from "@/components/ui/Toast/toaster";
import { TableCell } from "@/components/Table/tableCell";
import { CategoryRequest, CategoryResponse } from "@/types/category";
import { DeleteModal } from "@/components/DeleteModal";
import { CreateModal, UpdateModal } from "./components";

const CategoryDashboard = () => {

  const { categories, loading, create, remove, update } = CategoryService();

  const [search, setSearch] = useState<string>('');
  const [newCategory, setNewCategory] = useState<CategoryRequest>({
    category: {
      id: "",
      name: ""
    }
  });
  const [editedCategory, setEditedCategory] = useState<CategoryRequest>({
    category: {
      id: "",
      name: ""
    }
  });

  const handleCreate = async () => {
    await create(newCategory);
    setNewCategory({category: { id: '', name: '' }});
  }

  const handleDelete = async (category_id: string) => {
    await remove(category_id);
  }

  const handleEdit = async (categoryId: string) => {
    if (editedCategory.category.id !== categoryId) return
    await update(editedCategory);
    setEditedCategory({ category: { id: '', name: '' }});
  }

  const filterCategories = () => {
    if (!search) return categories
    return categories.filter((category: any) => category?.attributes?.name.toLowerCase().includes(search.toLowerCase()))
  } 
  
  return (
    <main className="px-10 pt-2 w-full h-screen bg-[#010101] rounded-dashboard overflow-auto">
      <Toaster position="top-center" />
      <DashboardHeader title="Categorias" />
      <article className="my-4 bg-tertiary rounded-lg">
        <div className="flex rounded-lg py-2 px-10 justify-between bg-primary w-full items-center">
          <SearchInput search={search} setSearch={setSearch} />
          <CreateModal newCategory={newCategory} setNewCategory={setNewCategory} handleCreate={handleCreate} />
        </div>
        <table className="w-full">
          <CustomTHead fields={['Nome']} />
          <tbody>
            {
              filterCategories()?.data?.map((category: CategoryResponse) => (
                <tr key={category.id} className="border-b border-neutral-400/70">
                  <TableCell>{category?.attributes?.name}</TableCell>
                  <td className="font-light text-lg mt-3 flex justify-center gap-5">
                    <UpdateModal editedCategory={editedCategory} setEditedCategory={setEditedCategory} category={category} onSubmit={handleEdit} />
                    <DeleteModal entity="categoria" prefix="a" handleDelete={() => handleDelete(category.id)} />
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