import { Input } from '../../components/ui/Input/input';
import { HeaderRegister } from '../../components/HeaderRegister';
import { Button } from '../../components/ui/Button/button';
import { SectionDescription } from '../../components/SectionDescription';
import { Breadcrumb } from '../../components/ui/Breadcrumb/breadcrumb';
import { useNavigate } from 'react-router-dom';
import { useRegisterMarket } from '../../contexts/RegisterMarketContext';
import { useToast } from '../../components/ui/Toast/use-toast';
import { Toaster } from '../../components/ui/Toast/toaster';
import { z } from 'zod';

const EnterpriseDataSchema = z.object({
  name: z
    .string()
    .min(3, { message: ' O nome da empresa deve ter no mínimo 3 caracteres, podendo ter números e letras.' }),
  cnpj: z.string().regex(/^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/, {
    message: ' O CNPJ cadastrado é invalido!',
  }),
  cellphone: z.string().regex(/^\+\d{2} \d{2} \d{5}(?:-?\d{4})?$/, { message: ' O telefone é inválido.' }),
});

export function EnterpriseData() {
  const navigate = useNavigate();

  const { toast } = useToast();

  const { enterpriseData, setEnterpriseData, setSuccessEnterpriseData } = useRegisterMarket();

  const breadcrumbItems = [
    { text: 'Dados empresariais', current: true },
    { text: 'Endereço', current: false },
    { text: 'Acesso', current: false },
  ];

  const handleNextStep = () => {
    setSuccessEnterpriseData(true);
    navigate('/cadastre-se/endereco');
  };

  const handleValidation = (e) => {
    e.preventDefault();
    const requiredFields = ['cellphone', 'cnpj', 'name'];
    const emptyFields = requiredFields.filter((field) => !enterpriseData[field]);

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
      EnterpriseDataSchema.parse(enterpriseData);
      handleNextStep();
    } catch (error) {
      const fieldErrors = error.formErrors.fieldErrors;
      if (fieldErrors.hasOwnProperty('name')) {
        toast({
          variant: 'error',
          title: 'Erro no formulário',
          description: <p>{fieldErrors.name}</p>,
          duration: 5000,
        });
        return;
      } else if (fieldErrors.hasOwnProperty('cnpj')) {
        toast({
          variant: 'error',
          title: 'Erro no formulário',
          description: <p>{fieldErrors.cnpj}</p>,
          duration: 5000,
        });
        return;
      } else if (fieldErrors.hasOwnProperty('telefone')) {
        toast({
          variant: 'error',
          title: 'Erro no formulário',
          description: <p>{fieldErrors.telefone}</p>,
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
            <HeaderRegister subTitle="Gerencie de forma inteligente o seu mercado com a gente!" />
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
                placeholder="+55 99 99999-9999"
                type="tel"
                label="Telefone"
              />
            </div>
          </div>
          <div className="my-16 mx-16 flex flex-col items-center">
            <div className="mt-4 mb-1 text-nowrap">
              <Breadcrumb items={breadcrumbItems} />
            </div>
            <Button type="submit" className="w-full">
              Proxíma etapa
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
