import { Input } from '../../components/ui/Input/input';
import { HeaderRegister } from '../../components/HeaderRegister';
import { Button } from '../../components/ui/Button/button';
import { SectionDescription } from '../../components/SectionDescription';
import { Breadcrumb } from '../../components/ui/Breadcrumb/breadcrumb';
import { useRegisterMarket } from '../../contexts/RegisterMarketContext';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Toaster } from '../../components/ui/Toast/toaster';
import { useToast } from '../../components/ui/Toast/use-toast';
import { z } from 'zod';
import { Loader2 } from 'lucide-react';

const EnterpriseAccessSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'O nome da empresa deve ter no mínimo 3 caracteres, podendo ter números e letras.' }),
  email: z
    .string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: 'O email informado é inválido.' }),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message:
      'A senha deve ter pelo menos 8 caracteres, uma letra maiúscula, uma letra minúscula, um caractere especial, e um número.',
  }),
  password_confirmation: z.string().min(8),
});

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
  const { toast } = useToast();
  const handleValidation = (e) => {
    e.preventDefault();
    const requiredFields = ['name', 'email', 'password', 'password_confirmation'];

    const emptyFields = requiredFields.filter((field) => !enterpriseAccess[field]);

    if (emptyFields.length > 0) {
      toast({
        variant: 'error',
        title: 'Erro no formulário',
        description: 'Preencha todos os campos obrigatórios!',
        duration: 5000,
      });
      return;
    }

    if (enterpriseAccess.password !== enterpriseAccess.password_confirmation) {
      toast({
        variant: 'error',
        title: 'Erro no formulário',
        description: 'As senhas não correspondem!',
        duration: 5000,
      });
      return;
    }
    try {
      EnterpriseAccessSchema.parse(enterpriseAccess);
      registerMarket();
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
      } else if (fieldErrors.hasOwnProperty('email')) {
        toast({
          variant: 'error',
          title: 'Erro no formulário',
          description: <p>{fieldErrors.email}</p>,
          duration: 5000,
        });
        return;
      } else if (fieldErrors.hasOwnProperty('password')) {
        toast({
          variant: 'error',
          title: 'Erro no formulário',
          description: <p>{fieldErrors.password}</p>,
          duration: 5000,
        });
        return;
      } else if (fieldErrors.hasOwnProperty('password_confirmation')) {
        toast({
          variant: 'error',
          title: 'Erro no formulário',
          description: <p>{fieldErrors.password_confirmation}</p>,
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

  useEffect(() => {
    if (registerMarketError) {
      toast({
        variant: 'error',
        title: 'Erro ao cadastrar',
        description: 'Ocorreu um erro ao cadastrar a sua empresa. Tente novamente!',
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
        <form className="h-full bg-secondary rounded-form" onSubmit={handleValidation} novalidate>
          <div className="flex items-center flex-col">
            <HeaderRegister subTitle="Gerencie de forma inteligente o seu mercado com a gente!" />
          </div>
          <div className="flex flex-col mt-10 mx-16 gap-4">
            <div>
              <Input
                type="text"
                id="name"
                name="name"
                placeholder="Jonh Doe"
                value={enterpriseAccess.name}
                onChange={(e) => setEnterpriseAccess({ ...enterpriseAccess, name: e.target.value })}
                label="Nome"
                data-testid="name-input"
              />
            </div>
            <div>
              <Input
                id="email"
                name="email"
                placeholder="seu@email.com"
                for="email"
                value={enterpriseAccess.email}
                onChange={(e) => setEnterpriseAccess({ ...enterpriseAccess, email: e.target.value })}
                label="Email"
                data-testid="Email"
              />
            </div>
            <div>
              <Input
                id="Senha"
                name="password"
                placeholder="*********"
                type="password"
                value={enterpriseAccess.password}
                onChange={(e) => setEnterpriseAccess({ ...enterpriseAccess, password: e.target.value })}
                label="Senha"
                data-testid="Password"
              />
            </div>
            <div>
              <Input
                id="Confirme sua senha"
                name="password_confirmation"
                placeholder="*********"
                type="password"
                value={enterpriseAccess.password_confirmation}
                onChange={(e) => setEnterpriseAccess({ ...enterpriseAccess, password_confirmation: e.target.value })}
                label="Confirme sua senha"
                data-testid="Password_confirmation"
              />
            </div>
          </div>
          <div className="my-10 mx-16 flex flex-col items-center">
            <div className="mt-4 mb-1 text-nowrap">
              <Breadcrumb items={breadcrumbItems} />
            </div>
            <Button type="submit" className="w-full" disabled={registerMarketLoading}>
              {registerMarketLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Finalizar Cadastro
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
