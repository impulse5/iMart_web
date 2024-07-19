import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRegisterMarket } from '@/contexts/RegisterMarketContext';
import { EnterpriseAccessFormFields } from './components/EnterpriseAccessFormFields';
import { EnterpriseAccessHeader } from './components/EnterpriseAccessHeader';
import { EnterpriseAccessBreadcrumb } from './components/EnterpriseAccessBreadcrumb';
import { EnterpriseAccessFooter } from './components/EnterpriseAccessFooter';
import { useEnterpriseAccessValidation } from './useEnterpriseAccessValidation';
import { Toaster } from '@/components/ui/Toast/toaster';
import { SectionDescription } from '@/components/SectionDescription';
import { toast } from '@/components/ui/Toast/use-toast';

export function EnterpriseAccess() {
  const {
    successEnterpriseData,
    successEnterpriseAddress,
    enterpriseAccess,
    setEnterpriseAccess,
    registerMarket,
    registerSuccess,
    registerMarketError,
    registerMarketLoading,
  } = useRegisterMarket();
  const navigate = useNavigate();
  const validate = useEnterpriseAccessValidation(enterpriseAccess, registerMarket);

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

  useEffect(() => {
    if (registerMarketError) {
      toast({
        variant: 'error',
        title: 'Erro ao cadastrar',
        description: registerMarketError.response.data.message,
        duration: 5000,
      });
    }
  }, [registerMarketError]);

  useEffect(() => {
    if (registerSuccess) {
      navigate('/cadastre-se/submissao-enviada');
    }
  }, [registerSuccess]);

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
        <form className="h-full bg-secondary rounded-form" onSubmit={validate} noValidate>
          <div className="flex items-center flex-col">
            <EnterpriseAccessHeader />
          </div>
          <div className="flex flex-col mt-10 mx-16 gap-4">
            <EnterpriseAccessFormFields enterpriseAccess={enterpriseAccess} setEnterpriseAccess={setEnterpriseAccess} />
          </div>
          <div className="my-10 mx-16 flex flex-col items-center">
            <div className="mt-4 mb-1 text-nowrap">
              <EnterpriseAccessBreadcrumb items={breadcrumbItems} />
            </div>
            <EnterpriseAccessFooter registerMarketLoading={registerMarketLoading} />
            <Toaster position="top-center" />
          </div>
        </form>
      </div>
    </main>
  );
}
