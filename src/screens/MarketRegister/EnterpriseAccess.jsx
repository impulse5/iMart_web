import { Input } from '../../components/ui/Input/input';
import { HeaderRegister } from '../../components/HeaderRegister';
import { Button } from '../../components/ui/Button/button';
import { SectionDescription } from '../../components/SectionDescription';
import { Breadcrumb } from '../../components/ui/Breadcrumb/breadcrumb';
import { useRegisterMarket } from '@/contexts/RegisterMarketContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export function EnterpriseAccess() {
  const { successEnterpriseData, successEnterpriseAddress, enterpriseAccess, setEnterpriseAccess } =
    useRegisterMarket();
  const navigate = useNavigate();

  useEffect(() => {
    if (!successEnterpriseData || !successEnterpriseAddress) {
      navigate('/cadastre-se/dados-empresariais');
    }
  }, [successEnterpriseData, successEnterpriseAddress]);

  const breadcrumbItems = [
    { text: 'Dados empresariais', link: '/cadastre-se/dados-empresariais', current: false },
    { text: 'Endereço', link: '/cadastre-se/endereco', current: false },
    { text: 'Acesso', current: true },
  ];
  return (
    <main className="bg-primary grid grid-cols-custom w-full h-screen overflow-hidden">
      <div className="flex justify-center items-center ">
        <div className="w-[27rem]">
          <SectionDescription
            title="Estamos quase finalizando!"
            subTitle="Precisamos de uma conta para você acessar a plataforma da sua empresa!"
          />
        </div>
      </div>
      <div>
        <form className="h-full bg-secondary rounded-form">
          <div className="flex items-center flex-col">
            <HeaderRegister subTitle="Gerencie de forma inteligente o seu mercado com a gente!" />
          </div>
          <div className="flex flex-col mt-10 mx-16 gap-4">
            <div>
              <Input
                type="text"
                placeholder="Jonh Doe"
                value={enterpriseAccess.name}
                onChange={(e) => setEnterpriseAccess({ ...enterpriseAccess, name: e.target.value })}
                label="Nome"
              />
            </div>
            <div>
              <Input
                placeholder="seu@email.com"
                type="email"
                value={enterpriseAccess.email}
                onChange={(e) => setEnterpriseAccess({ ...enterpriseAccess, email: e.target.value })}
                label="Email"
              />
            </div>
            <div>
              <Input
                placeholder="*********"
                type="password"
                value={enterpriseAccess.password}
                onChange={(e) => setEnterpriseAccess({ ...enterpriseAccess, password: e.target.value })}
                label="Senha"
              />
            </div>
            <div>
              <Input
                placeholder="*********"
                type="password"
                value={enterpriseAccess.password_confirmation}
                onChange={(e) => setEnterpriseAccess({ ...enterpriseAccess, password_confirmation: e.target.value })}
                label="Confirme sua senha"
              />
            </div>
          </div>
          <div className="my-10 mx-16 flex flex-col items-center">
            <div className="mt-4 mb-1 text-nowrap">
              <Breadcrumb items={breadcrumbItems} />
            </div>
            <Button className="w-full">Proxíma etapa</Button>
            <p className="mt-2 text-nowrap text-sm">
              Sua empresa já foi cadastrada?{' '}
              <span className="font-bold cursor-pointer hover:text-tertiary text-sm underline">Faça login aqui!</span>
            </p>
          </div>
        </form>
      </div>
    </main>
  );
}
