import { useState } from "react";

import { Toaster } from "@/components/ui/Toast/toaster";
import { DashboardHeader } from "@/components/DashboardHeader";
import { SearchInput } from "@/components/SearchInput";
import { CustomTHead } from "@/components/CustomTHead";
import { SupplierService } from "@/services/SupplierService";
import { TableCell } from "@/components/Table/tableCell";
import ReactLoading from 'react-loading';
import { Badge } from "@/components/ui/Badge/badge";
import { SupplierRequest, SupplierResponse } from "@/types/supplier";
import { CreateModal, EditModal } from "./components";
import { DeactivateIcon, ActivateIcon } from "@/components/Icons";
import { DeleteModal } from "@/components/DeleteModal";

const SupplierDashboard = () => {

  const { suppliers, loading, create, update, destroy, turnStatus } = SupplierService();
  const [search, setSearch] = useState<string>('');

  const [newSupplier, setNewSupplier] = useState<SupplierRequest>({
    supplier: {
      id: "",
      name: '',
      cnpj: '',
      cellphone: '',
      email: ''
    }
  });

  const [editSupplier, setEditSupplier] = useState<SupplierRequest>({
    supplier: {
      id: "",
      name: '',
      cnpj: '',
      cellphone: '',
      email: ''
    }
  });

  const handleCreate = async () => {
    await create(newSupplier);
    setNewSupplier({
      supplier: {
        id: '',
        name: '',
        cnpj: '',
        cellphone: '',
        email: ''
      }
    });
  }

  const handleEdit = async () => {
    await update(editSupplier);
    setEditSupplier({
      supplier: {
        id: '',
        name: '',
        cnpj: '',
        cellphone: '',
        email: ''
      }
    });
  }

  const filteredSuppliers = () => {
    if (!search) return suppliers?.data;
    return suppliers.filter((supplier: SupplierResponse) => supplier?.attributes?.name.toLowerCase().includes(search.toLowerCase()));
  }

  return (
    <main className="px-10 pt-2 w-full h-screen bg-[#010101] rounded-dashboard overflow-auto">
      <Toaster position="top-center" />
      <DashboardHeader title="Fornecedores" />
      <article className="my-4 bg-tertiary rounded-lg">
        <div className="flex rounded-lg py-2 px-10 justify-between bg-primary w-full items-center">
          <SearchInput search={search} setSearch={setSearch} />
          <CreateModal newSupplier={newSupplier} setNewSupplier={setNewSupplier} onSubmit={handleCreate} />
        </div>
        <table className="w-full">
          <CustomTHead fields={['Nome', 'CNPJ', 'Telefone', 'Email', 'Status']} />
          <tbody>
            {
              filteredSuppliers()?.map((supplier: SupplierResponse) => (
                <tr key={supplier.id} className="border-b border-neutral-400/70">
                  <TableCell>{supplier?.attributes?.name}</TableCell>
                  <TableCell>{supplier?.attributes?.cnpj}</TableCell>
                  <TableCell>{supplier?.attributes?.cellphone}</TableCell>
                  <TableCell>{supplier?.attributes?.email}</TableCell>
                  <TableCell>
                    {supplier?.attributes?.active ? (
                      <Badge>Ativo</Badge>
                    ) : (
                      <Badge variant="error">Inativo</Badge>
                    )}
                  </TableCell>
                  <td className="font-light text-lg mt-3 flex justify-center gap-5">
                    <EditModal supplier={supplier} setEditedSupplier={setEditSupplier} editedSupplier={editSupplier} onSubmit={handleEdit} />
                    <DeleteModal prefix="o" entity="fornecedor" handleDelete={() => destroy(supplier.id)} />
                    <div onClick={() => turnStatus(supplier.id)}>
                      {
                        supplier?.attributes?.active ? <DeactivateIcon /> : <ActivateIcon />
                      }
                    </div>
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
  );
}

export default SupplierDashboard;