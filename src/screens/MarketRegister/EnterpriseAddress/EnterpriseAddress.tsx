import { useEffect } from 'react';
import { SectionDescription } from '@/components/SectionDescription';
import { EnterpriseAddressHeader } from './components/EnterpriseAddressHeader';
import { EnterpriseAddressForm } from './components/EnterpriseAddressForm';
import { EnterpriseAddressBreadcrumb } from './components/EnterpriseAddressBreadcrumb';
import { EnterpriseAddressFooter } from './components/EnterpriseAddressFooter';
import { useNavigate } from 'react-router-dom';
import { useRegisterMarket } from '@/contexts/RegisterMarketContext';
import { useEnterpriseAddressValidation } from './useEnterpriseAddressValidation';
import { Toaster } from '@/components/ui/Toast/toaster';
import { Button } from '@/components/ui/Button/button';

export function EnterpriseAddress() {
  const navigate = useNavigate();
  const { successEnterpriseData, setSuccessEnterpriseAddress } = useRegisterMarket();

  useEffect(() => {
    if (!successEnterpriseData) {
      navigate('/cadastre-se/dados-empresariais');
    }
  }, [successEnterpriseData, navigate]);

  const handleNextStep = () => {
    setSuccessEnterpriseAddress(true);
    navigate('/cadastre-se/acesso');
  };

  const breadcrumbItems = [
    { text: 'Dados empresariais', link: '/cadastre-se/dados-empresariais', current: false },
    { text: 'Endereço', current: true },
    { text: 'Acesso', current: false },
  ];

  const validateAddress = useEnterpriseAddressValidation({}, handleNextStep);

  return (
    <main className="bg-primary grid grid-cols-custom w-full h-screen overflow-hidden">
      <div className="flex justify-center items-center">
        <div className="w-[26rem]">
          <SectionDescription
            title="Onde vocês se situam? 🤔"
            subTitle="Precisamos saber a localização da empresa para atender melhor as necessidades dos nossos clientes"
          />
        </div>
      </div>
      <div>
        <form className="h-full bg-secondary rounded-form" onSubmit={validateAddress}>
          <div className="flex items-center flex-col">
            <EnterpriseAddressHeader />
          </div>
          <div className="flex flex-col mt-8 mx-16 gap-4">
            <EnterpriseAddressForm />
          </div>
          <div className="my-10 mx-16 flex flex-col items-center">
            <div className="mt-4 mb-1 text-nowrap">
              <EnterpriseAddressBreadcrumb items={breadcrumbItems} />
            </div>
            <Button type="submit" className="w-full">
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
        <EnterpriseAddressFooter />
      </div>
    </main>
  );
}
