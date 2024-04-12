import { CircleUserRound, Search } from "lucide-react";
import { TableCell } from "@/components/Table/tableCell";
import { TableHeader } from "@/components/Table/tableHeader";
import { CustomModal } from "@/components/CustomModal";
import { useState, useEffect } from 'react';
import { EditIcon, RemoveIcon } from "@/components/Icons/";
import { SupplierService } from "@/services/supplier_service";
import { UserDropdown } from "@/components/UserDropdown/Dropdown";
import { Toaster } from "@/components/ui/Toast/toaster";
import { useToast } from "@/components/ui/Toast/use-toast";
import { SupplierInfo } from "@/types/SupplierInfo";
import { Badge } from "@/components/ui/Badge/badge";
import { ActivateIcon, DeactivateIcon } from "@/components/Icons";

export function SupplierDashboard() {

  const { getSuppliers, suppliers, postSupplier, switchSupplierStatus } = SupplierService();
  const { toast } = useToast();
  const [newSupplier, setNewSupplier] = useState<SupplierInfo>({
    name: '',
    email: '',
    cnpj: '',
    cellphone: ''
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

  const [search, setSearch] = useState<string>('');
  const filteredSupplier = suppliers.filter((supplier) =>
    supplier.attributes.name.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    getSuppliers();
  }, [suppliers]);

  return (
    <main className="px-10 pt-2 w-full h-screen bg-[#010101] rounded-dashboard overflow-auto">
      <Toaster position="top-center" />
      <header className="flex justify-between items-center mt-6">
        <div>
          <h1 className="text-3xl text-neutral-400 font-bold">FORNECEDORES</h1>
        </div>
        <div>
            <UserDropdown 
              title="Minha conta" 
              trigger={<CircleUserRound 
              className="text-neutral-400 size-12 cursor-pointer" 
            />
            }/>
        </div>  
      </header>
      <article className="my-4 bg-tertiary rounded-lg">
        <div className="flex rounded-lg py-2 px-10 justify-between bg-primary w-full items-center">
          <div className="flex items-center w-96 py-1.5 px-3 outline-none bg-tertiary rounded-md">
            <input
              type="text"
              placeholder="Pesquisar"
              className="flex p-0 bg-transparent border-none outline-none text-sm w-full focus:ring-0"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            <Search size={20} />
          </div>
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
            {filteredSupplier.map((supplier) => (
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
                        { id: 'name', label: 'Nome', type: 'text', placeholder: 'Ambev' },
                        { id: 'cnpj', label: 'CNPJ', type: 'text', placeholder: '00.000.000/0000-00' },
                        { id: 'tel', label: 'Telefone', type: 'tel', placeholder: '99 99999-9999' },
                        { id: 'email', label: 'Email', type: 'email', placeholder: 'seu@email.com' }
                    ]}
                    trigger={<EditIcon />}
                  />
                  <CustomModal
                    trigger={<RemoveIcon />}
                    type="delete"
                    title="Excluir fornecedor"
                    description="Deseja realmente excluir o fornecedor?"
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
      </article>
    </main>
  );
}

