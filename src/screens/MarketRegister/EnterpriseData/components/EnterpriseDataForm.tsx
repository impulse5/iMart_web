import { Input } from '@/components/ui/Input/input';
import { HeaderRegister } from '@/components/HeaderRegister';
import { Button } from '@/components/ui/Button/button';
import { SectionDescription } from '@/components/SectionDescription';
import { Breadcrumb } from '@/components/ui/Breadcrumb/breadcrumb';
import { Toaster } from '@/components/ui/Toast/toaster';

interface EnterpriseDataFormProps {
  enterpriseData: {
    name: string;
    cnpj: string;
    cellphone: string;
  };
  setEnterpriseData: (data: any) => void;
  handleValidation: (e: React.FormEvent<HTMLFormElement>) => void;
  breadcrumbItems: { text: string; current: boolean }[];
  navigate: (path: string) => void;
}

export function EnterpriseDataForm({
  enterpriseData,
  setEnterpriseData,
  handleValidation,
  breadcrumbItems,
  navigate
}: EnterpriseDataFormProps) {
  return (
    <main className="bg-primary grid grid-cols-custom w-full h-screen overflow-hidden">
      <div className="flex justify-center items-center ">
        <div className="w-[23rem]">
          <SectionDescription
            title="Dados Empresariais"
            subTitle="Que tal facilitar o seu gerenciamento de mercado e ainda alavancar suas vendas? Vem com a iMart! 🤩"
          />
        </div>
      </div>
      <div>
        <form className="h-full bg-secondary rounded-form" onSubmit={handleValidation}>
          <div className="flex items-center flex-col">
            <HeaderRegister />
          </div>
          <div className="flex flex-col mt-20 mx-16 gap-4">
            <div>
              <Input
                id="Nome da empresa"
                name="name"
                value={enterpriseData.name}
                onChange={(e) => setEnterpriseData({ ...enterpriseData, name: e.target.value })}
                type="text"
                placeholder="Supermercado iMart LTDA"
                label="Nome da empresa"
              />
            </div>
            <div>
              <Input
                id="CNPJ"
                name="cnpj"
                value={enterpriseData.cnpj}
                onChange={(e) => setEnterpriseData({ ...enterpriseData, cnpj: e.target.value })}
                placeholder="00.000.000/0000-00"
                type="text"
                label="CNPJ"
              />
            </div>
            <div>
              <Input
                id="Telefone"
                name="cellphone"
                value={enterpriseData.cellphone}
                onChange={(e) => setEnterpriseData({ ...enterpriseData, cellphone: e.target.value })}
                placeholder="99 99999-9999"
                type="tel"
                label="Telefone"
              />
            </div>
          </div>
          <div className="my-16 mx-16 flex flex-col items-center">
            <div className="mt-4 mb-1 text-nowrap">
              <Breadcrumb items={breadcrumbItems} />
            </div>
            <Button data-testid="button" type="submit" className="w-full">
              Próxima etapa
            </Button>
            <Toaster position="top-center" />
            <p className="mt-2 text-nowrap text-sm">
              Sua empresa já foi cadastrada?{' '}
              <span
                className="font-bold cursor-pointer hover:text-tertiary text-sm underline"
                onClick={() => navigate('/login')}
              >
                Faça login aqui!
              </span>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
