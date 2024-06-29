import { TableCell } from "@/components/Table/tableCell";
import { TableHeader } from "@/components/Table/tableHeader";
import { CustomModal } from "@/components/CustomModal";
import { useState, useEffect } from 'react';
import { EditIcon, RemoveIcon } from "@/components/Icons/";
import { SupplierService } from "@/services/supplier_service";
import { Toaster } from "@/components/ui/Toast/toaster";
import { useToast } from "@/components/ui/Toast/use-toast";
import { SupplierInfo, dataSupplierInfo } from "@/types/SupplierInfo";
import { Badge } from "@/components/ui/Badge/badge";
import { ActivateIcon, DeactivateIcon } from "@/components/Icons";
import ReactLoading from 'react-loading';
import { DashboardHeader } from "@/components/DashboardHeader";
import { SearchInput } from "@/components/SearchInput";

export function SupplierDashboard() {

  const { getSuppliers, suppliers, postSupplier, switchSupplierStatus, deleteSupplier, editSupplier, loading } = SupplierService();
  const { toast } = useToast();
  const [newSupplier, setNewSupplier] = useState<SupplierInfo>({
    name: '',
    email: '',
    cnpj: '',
    cellphone: ''
  });
  const [editedSupplier, setEditedSupplier] = useState<dataSupplierInfo>({
    supplier: {
      name: '',
      email: '',
      cnpj: '',
      cellphone: ''
    }
  });

  const handlePostSupplier = async (supplier: any) => {
    try {
      let newSupplier = {
        supplier: {
          name: supplier.name,
          email: supplier.email,
          cnpj: supplier.cnpj,
          cellphone: supplier.cellphone
        }
      }
      const success = await postSupplier(newSupplier);
      setNewSupplier({ name: '', email: '', cnpj: '', cellphone: '' });
      if (success) {
        toast({
          title: 'Fornecedor cadastrado com sucesso!',
          description: 'O fornecedor foi cadastrado com sucesso.',
          variant: 'success',
          duration: 3000,
        })
      }
    } catch (error) {
      console.log(error);
      toast({
        title: 'Erro ao cadastrar fornecedor!',
        description: 'Ocorreu um erro ao cadastrar o fornecedor.',
        variant: 'error',
        duration: 3000,
      })
    }
  }

  const handleStatusSupplier = async (supplier_id: string) => {
    try {
      const success = await switchSupplierStatus(supplier_id);
      if (success) {
        toast({
          title: 'Status alterado com sucesso!',
          description: 'O status do fornecedor foi alterado com sucesso.',
          variant: 'success',
          duration: 3000,
        })
      }
    } catch (error) {
      console.log(error);
      toast({
        title: 'Erro ao alterar status!',
        description: 'Ocorreu um erro ao alterar o status do fornecedor.',
        variant: 'error',
        duration: 3000,
      })
    }
  }

  const handleEditSupplier = async (supplier_id: string) => {
    try {
      const success = await editSupplier(supplier_id, editedSupplier);
      if (success) {
        toast({
          title: 'Fornecedor editado com sucesso!',
          description: 'O fornecedor foi editado com sucesso.',
          variant: 'success',
          duration: 3000,
        })
      }
    } catch (error) {
      console.log(error);
      toast({
        title: 'Erro ao editar fornecedor!',
        description: 'Ocorreu um erro ao editar o fornecedor.',
        variant: 'error',
        duration: 3000,
      })
    }
  }

  const [search, setSearch] = useState<string>('');
  const filteredSupplier = suppliers.filter((supplier) =>
    supplier.attributes.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleDeleteSupplier = async (supplierId: string) => {
    try {
      const success = await deleteSupplier(supplierId);
      if (success) {
        toast({
          variant: 'success',
          title: 'Fornecedor excluído',
          description: 'O fornecedor foi excluído com sucesso!',
          duration: 3000,
        });
      }
    } catch (error) {
      console.log(error);
      toast({
        variant: 'error',
        title: 'Erro ao excluir fornecedor',
        description: 'Ocorreu um erro ao tentar excluir o fornecedor. Por favor, tente novamente mais tarde.',
        duration: 3000,
      });
    }}

  useEffect(() => {
    getSuppliers();
  }, []);

  return (
    <main className="px-10 pt-2 w-full h-screen bg-[#010101] rounded-dashboard overflow-auto">
      <Toaster position="top-center" />
      <DashboardHeader title="Fornecedores" />
      <article className="my-4 bg-tertiary rounded-lg">
        <div className="flex rounded-lg py-2 px-10 justify-between bg-primary w-full items-center">
          <SearchInput search={search} setSearch={setSearch} />
          <div>
            <CustomModal
              title="Cadastrar fornecedor"
              trigger={
                <button className="bg-[#010101] py-1.5 px-10 rounded-lg">Cadastrar</button>
              }
              type="create"
              fields={[
                { id: 'name', label: 'Nome', type: 'text', placeholder: 'Ambev', value: newSupplier.name, onChange: (e) => setNewSupplier({ ...newSupplier, name: e.target.value })},
                { id: 'cnpj', label: 'CNPJ', type: 'text', placeholder: '00.000.000/0000-00', value: newSupplier.cnpj, onChange: (e) => setNewSupplier({ ...newSupplier, cnpj: e.target.value })},
                { id: 'tel', label: 'Telefone', type: 'tel', placeholder: '99 99999-9999', value: newSupplier.cellphone, onChange: (e) => setNewSupplier({ ...newSupplier, cellphone: e.target.value })},
                { id: 'email', label: 'Email', type: 'email', placeholder: 'seu@email.com', value: newSupplier.email, onChange: (e) => setNewSupplier({ ...newSupplier, email: e.target.value })},
              ]}
              onSubmit={() => handlePostSupplier(newSupplier)}
            />
          </div>
        </div>
        <table className="w-full">
          <thead>
            <tr className="border-b border-neutral-400/70">
              <TableHeader>Nome</TableHeader>
              <TableHeader>CNPJ</TableHeader>
              <TableHeader>Telefone</TableHeader>
              <TableHeader>Email</TableHeader>
              <TableHeader>Status</TableHeader>
              <th className="pb-3 pt-3 pl-5 text-center text-secondary text-xl font-semibold">Ações</th>
            </tr>
          </thead>
          <tbody>
            {!loading && filteredSupplier.map((supplier) => (
              <tr className="border-b border-white/20" key={supplier.id}>
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
                  <CustomModal
                    type="edit"
                    title="Editar fornecedor"
                    fields={[
                        { id: 'name', label: 'Nome', type: 'text', placeholder: 'Ambev', value: editedSupplier.supplier.name, onChange: (e) => setEditedSupplier({ supplier: { ...editedSupplier.supplier, name: e.target.value }})},
                        { id: 'cnpj', label: 'CNPJ', type: 'text', placeholder: '00.000.000/0000-00', value: editedSupplier.supplier.cnpj, onChange: (e) => setEditedSupplier({ supplier: { ...editedSupplier.supplier, cnpj: e.target.value }})},
                        { id: 'tel', label: 'Telefone', type: 'tel', placeholder: '99 99999-9999', value: editedSupplier.supplier.cellphone, onChange: (e) => setEditedSupplier({ supplier: { ...editedSupplier.supplier, cellphone: e.target.value }})},
                        { id: 'email', label: 'Email', type: 'email', placeholder: 'seu@email.com', value: editedSupplier.supplier.email, onChange: (e) => setEditedSupplier({ supplier: { ...editedSupplier.supplier, email: e.target.value }})}
                    ]}
                    trigger={<EditIcon />}
                    onInit={() => setEditedSupplier({ supplier: { name: supplier?.attributes?.name, email: supplier?.attributes?.email, cnpj: supplier?.attributes?.cnpj, cellphone: supplier?.attributes?.cellphone }})}
                    onSubmit={() => handleEditSupplier(supplier?.attributes?.id)}
                  />
                  <CustomModal
                    trigger={<RemoveIcon />}
                    type="delete"
                    title="Excluir fornecedor"
                    description="Deseja realmente excluir o fornecedor?"
                    onSubmit={() => handleDeleteSupplier(supplier?.attributes?.id)}
                  />
                  <div onClick={() => handleStatusSupplier(supplier?.attributes?.id)}>
                    {
                      supplier?.attributes?.active ? <DeactivateIcon /> : <ActivateIcon />
                    }
                  </div>
                </td>
              </tr>
            ))}
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

