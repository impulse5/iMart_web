import { SectionDescription } from '../../components/SectionDescription/index';
import { HeaderRegister } from '../../components/HeaderRegister';
import { Input } from '../../components/ui/Input/input';
import { Button } from '../../components/ui/Button/button';
import { Breadcrumb } from '../../components/ui/Breadcrumb/breadcrumb';
export function EnterpriseAddress() {
  const breadcrumbItems = [
    { text: 'Dados empresariais', link: '/cadastre-se/dados-empresariais', current: false },
    { text: 'Endereço', current: true },
    { text: 'Acesso', current: false },
  ];
  return (
    <main className="bg-primary grid grid-cols-custom w-full h-screen overflow-hidden">
      <div className="flex justify-center items-center ">
        <div className="w-[26rem]">
          <SectionDescription
            title="Onde vocês se situam? 🤔"
            subTitle="Precisamos saber a localização da empresa para atender melhor as necessidades dos  nossos clientes"
          />
        </div>
      </div>
      <div>
        <form className="h-full bg-secondary rounded-form">
          <div className="flex items-center flex-col">
            <HeaderRegister subTitle="Gerencie de forma inteligente o seu mercado com a gente!" />
          </div>
          <div className="flex flex-col mt-8 mx-16 gap-4">
            <div>
              <Input type="text" placeholder="12 de fevereiro" label="Rua" />
            </div>
            <div>
              <Input placeholder="Passaré" type="text" label="Bairro" />
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <div className="grid grid-cols-2 gap-16 w-screen mx-16">
              <div className="flex flex-col">
                <Input type="number" placeholder="1547" label="Número" />
              </div>
              <div className="flex flex-col">
                <Input type="number" placeholder="00000-000" label="CEP" />
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-6 mx-16 gap-4 ">
            <div>
              <Input placeholder="Preencha o CEP para exibir a cidade" disabled />
            </div>
            <div>
              <Input placeholder="Preencha o CEP para exibir o estado" disabled />
            </div>
          </div>
          <div className="my-10 mx-16 flex flex-col items-center">
            <div className="mt-4 mb-1 text-nowrap">
              <Breadcrumb items={breadcrumbItems} />
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
