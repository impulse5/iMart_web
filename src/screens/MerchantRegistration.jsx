import { Input } from '../components/ui/Input/input';
import { HeaderRegister } from '../components/HeaderRegister';
import { Button } from '../components/ui/Button/button';
import { SectionDescription } from '../components/SectionDescription';
export function MerchantRegistration() {
  return (
    <main className="bg-primary grid grid-cols-custom w-full h-screen overflow-hidden">
      <div className="flex justify-center items-center ">
        <div className="w-[26rem]">
          <SectionDescription
            title="Dados Empresariais"
            subTitle="Que tal facilitar o seu gerenciamento de mercado e ainda alavancar suas vendas? Vem com a iMart! 🤩"
          />
        </div>
      </div>
      <div>
        <form className="h-full bg-secondary rounded-form">
          <div className="flex items-center flex-col">
            <HeaderRegister subTitle="Gerencie de forma inteligente o seu mercado com a gente!" />
          </div>
          <div className="flex flex-col mt-20 mx-16 gap-4">
            <div>
              <Input type="text" placeholder="Supermercado iMart LTDA" label="Nome da empresa" />
            </div>
            <div>
              <Input placeholder="00.000.000/0000-00" type="text" label="CNPJ" />
            </div>
            <div>
              <Input placeholder="+55 99 99999-9999" type="tel" label="Telefone" />
            </div>
          </div>
          <div className="my-16 mx-16 flex flex-col items-center">
            {/* Component Breadcrumb */}
            <div className="mt-4 mb-1 text-nowrap">
              <span className="font-bold">Dados Empresariais</span>
              {' > '}
              <span className="font-semibold">Endereço</span> {' > '}
              <span className="font-semibold">Acesso</span>
            </div>
            <Button className="w-full">Proxíma etapa</Button>

            <p className="mt-2 text-nowrap text-sm">
              Sua empresa já foi cadastrada?{' '}
              <span className="font-bold cursor-pointer hover:text-tertiary text-sm">Faça login aqui!</span>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
