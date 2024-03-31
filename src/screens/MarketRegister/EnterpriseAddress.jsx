import { SectionDescription } from '../../components/SectionDescription/index';
import { HeaderRegister } from '../../components/HeaderRegister';
import { Input } from '../../components/ui/Input/input';
import { Button } from '../../components/ui/Button/button';
import { Breadcrumb } from '../../components/ui/Breadcrumb/breadcrumb';
import { useNavigate } from 'react-router-dom';
import { useRegisterMarket } from '../../contexts/RegisterMarketContext';
import { useToast } from '../../components/ui/Toast/use-toast';
import { Toaster } from '../../components/ui/Toast/toaster';
import { useEffect } from 'react';
import { z } from 'zod';

const EnterpriseAddressSchema = z.object({
  street: z.string().min(3, { message: 'O nome da rua deve ter no mínimo 3 caracteres.' }),
  neighborhood: z.string().min(3, { message: 'O nome do bairro deve ter no mínimo 3 caracteres.' }),
  number: z.string().min(1, { message: 'O número do endereço deve ser preenchido.' }),
  zipcode: z.string().min(8, { message: 'Não encontramos o CEP informado. 🥺' }),
});

export function EnterpriseAddress() {
  const navigate = useNavigate();

  const { toast } = useToast();

  const { successEnterpriseData, enterpriseAddress, setEnterpriseAddress, setSuccessEnterpriseAddress } =
    useRegisterMarket();

  useEffect(() => {
    if (!successEnterpriseData) {
      navigate('/cadastre-se/dados-empresariais');
    }
  }, [successEnterpriseData]);

  const handleNextStep = () => {
    setSuccessEnterpriseAddress(true);
    navigate('/cadastre-se/acesso');
  };

  const breadcrumbItems = [
    { text: 'Dados empresariais', link: '/cadastre-se/dados-empresariais', current: false },
    { text: 'Endereço', current: true },
    { text: 'Acesso', current: false },
  ];

  const handleValidation = (e) => {
    e.preventDefault();
    const requiredFields = ['street', 'neighborhood', 'number', 'zipcode'];

    Object.keys(enterpriseAddress).forEach(key => {
      if (typeof enterpriseAddress[key] === 'string') {
        enterpriseAddress[key] = enterpriseAddress[key].trim();
      }
    });
    
    const emptyFields = requiredFields.filter((field) => !enterpriseAddress[field]);

    if (emptyFields.length > 0) {
      toast({
        variant: 'error',
        title: 'Erro no formulário',
        description: 'Preencha todos os campos obrigatórios!',
        duration: 5000,
      });
      return;
    }
    try {
      EnterpriseAddressSchema.parse(enterpriseAddress);
      handleNextStep();
    } catch (error) {
      const fieldErrors = error.formErrors.fieldErrors;
      if (fieldErrors.hasOwnProperty('street')) {
        toast({
          variant: 'error',
          title: 'Erro no formulário',
          description: <p>{fieldErrors.street}</p>,
          duration: 5000,
        });
        return;
      } else if (fieldErrors.hasOwnProperty('neighborhood')) {
        toast({
          variant: 'error',
          title: 'Erro no formulário',
          description: <p>{fieldErrors.neighborhood}</p>,
          duration: 5000,
        });
        return;
      } else if (fieldErrors.hasOwnProperty('number')) {
        toast({
          variant: 'error',
          title: 'Erro no formulário',
          description: <p>{fieldErrors.number}</p>,
          duration: 5000,
        });
        return;
      } else if (fieldErrors.hasOwnProperty('zipcode')) {
        toast({
          variant: 'error',
          title: 'Erro no formulário',
          description: <p>{fieldErrors.zipcode}</p>,
          duration: 5000,
        });
        return;
      }
      Object.entries(fieldErrors).forEach(([field, errorMessage]) => {
        toast({
          variant: 'error',
          title: 'Erro no formulário',
          description: <p>{errorMessage}</p>,
          duration: 5000,
        });
      });
    }
  };
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
        <form className="h-full bg-secondary rounded-form" onSubmit={handleValidation}>
          <div className="flex items-center flex-col">
            <HeaderRegister subTitle="Gerencie de forma inteligente o seu mercado com a gente!" />
          </div>
          <div className="flex flex-col mt-8 mx-16 gap-4">
            <div>
              <Input
                name="street"
                id="Rua"
                type="text"
                value={enterpriseAddress.street}
                onChange={(e) => setEnterpriseAddress({ ...enterpriseAddress, street: e.target.value })}
                placeholder="12 de fevereiro"
                label="Rua"
              />
            </div>
            <div>
              <Input
                name="neighborhood"
                id="Bairro"
                placeholder="Passaré"
                value={enterpriseAddress.neighborhood}
                onChange={(e) => setEnterpriseAddress({ ...enterpriseAddress, neighborhood: e.target.value })}
                type="text"
                label="Bairro"
              />
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <div className="grid grid-cols-2 gap-16 w-screen mx-16">
              <div className="flex flex-col">
                <Input
                  type="number"
                  name="number"
                  id="Número"
                  placeholder="1547"
                  value={enterpriseAddress.number}
                  onChange={(e) => setEnterpriseAddress({ ...enterpriseAddress, number: e.target.value })}
                  label="Número"
                />
              </div>
              <div className="flex flex-col">
                <Input
                  id="CEP"
                  name="zipcode"
                  type="number"
                  placeholder="00000-000"
                  value={enterpriseAddress.zipcode}
                  onChange={(e) => setEnterpriseAddress({ ...enterpriseAddress, zipcode: e.target.value })}
                  label="CEP"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col mt-6 mx-16 gap-4 ">
            <div>
              <Input placeholder="Preencha o CEP para exibir a cidade" value={enterpriseAddress.city} disabled />
            </div>
            <div>
              <Input placeholder="Preencha o CEP para exibir o estado" value={enterpriseAddress.state} disabled />
            </div>
          </div>
          <div className="my-10 mx-16 flex flex-col items-center">
            <div className="mt-4 mb-1 text-nowrap">
              <Breadcrumb items={breadcrumbItems} />
            </div>
            <Button type="submit" className="w-full">
              Próxima etapa
            </Button>
            <Toaster position="top-center" />
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
