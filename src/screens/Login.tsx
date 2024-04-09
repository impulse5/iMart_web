import { SectionDescription } from '../components/SectionDescription';
import { HeaderRegister } from '../components/HeaderRegister';
import { Input } from '../components/ui/Input/input';
import { Button } from '../components/ui/Button/button';
import { Toaster } from '../components/ui/Toast/toaster';
import { useToast } from '../components/ui/Toast/use-toast';
import { useState, useEffect, useContext } from 'react';
import { z } from 'zod';
import { useNavigate } from 'react-router-dom';
import { AuthenticationContext, useAuthentication } from '@/contexts/AuthenticationContext';
import { Loader2 } from 'lucide-react';

const EnterpriseLoginSchema = z.object({
  email: z
    .string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: 'O email inserido está incorreto!' }),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'A senha inserida está incorreta!',
  }),
});

interface EnterpriseLoginType {
  email: string;
  password: string;
}

export function Login() {
  const { Login, loginLoading, loginError, loginSuccess, setLoginSuccess } = useAuthentication();
  const { toast } = useToast();
  const [enterpriseLogin, setEnterpriseLogin] = useState<EnterpriseLoginType>({ email: '', password: '' });
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setEnterpriseLogin({ ...enterpriseLogin, [name]: value });
  };

  const navigate = useNavigate();

  const handleSubmit = (e: any) => {
    e.preventDefault();

    const requiredFields = ['email', 'password'];
    const emptyFields = requiredFields.filter((field) => !enterpriseLogin[field as keyof EnterpriseLoginType]);

    if (emptyFields.length > 0) {
      toast({
        variant: 'error',
        title: 'Erro no formulário',
        duration: 5000,
      });
      return;
    }
    try {
      EnterpriseLoginSchema.parse(enterpriseLogin);
      Login(enterpriseLogin.email, enterpriseLogin.password);
    } catch (error) {
      const fieldErrors = (error as any).errors.reduce((acc: any, err: any) => {
        if (err.path[0] === 'email') {
          acc.emailError = err.message;
        } else if (err.path[0] === 'password') {
          acc.passwordError = err.message;
        }
        return acc;
      }, {});

      if (fieldErrors.emailError || fieldErrors.passwordError) {
        if (fieldErrors.emailError) {
          toast({
            variant: 'error',
            title: 'Erro no login',
            description: fieldErrors.emailError,
            duration: 5000,
          });
        }
        if (fieldErrors.passwordError) {
          toast({
            variant: 'error',
            title: 'Erro no login',
            description: fieldErrors.passwordError,
            duration: 5000,
          });
        }
      } else {
        const allFieldErrors = (error as any).errors.map((err: any) => err.message).join(', ');
        toast({
          variant: 'error',
          title: 'Erro no formulário',
          description: allFieldErrors,
          duration: 5000,
        });
      }
      return;
    }
  };

  useEffect(() => {
    if (loginError) {
      toast({
        variant: 'error',
        title: 'Erro no login',
        description: 'Email ou senha incorretos!',
        duration: 5000,
      });
    }
  }, [loginError]);

  useEffect(() => {
    if (loginSuccess) {
      toast({
        variant: 'success',
        title: 'Login realizado com sucesso!',
        description: 'Seja bem vindo!',
        duration: 3000,
      });
      setTimeout(() => {
        navigate('/dashboard')
      }, 1000)
      setLoginSuccess(false);
    }
  }, [loginSuccess]);

  return (
    <main className="bg-primary grid grid-cols-login w-full h-screen overflow-hidden">
      <div>
        <form className="h-full bg-secondary rounded-login" onSubmit={handleSubmit} noValidate>
          <div className="flex items-center flex-col">
            <HeaderRegister />
          </div>
          <div className="flex flex-col mt-20 mx-16 gap-4">
            <div>
              <Input
                id="Email"
                name="email"
                placeholder="seu@email.com"
                label="Email"
                value={enterpriseLogin.email}
                onChange={handleChange}
              />
            </div>
            <div>
              <Input
                id="Senha"
                name="password"
                placeholder="********"
                type="password"
                label="Senha"
                value={enterpriseLogin.password}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="my-24 mx-16 flex flex-col items-center">
            <div className="mt-4 mb-1 text-nowrap"></div>
            <Button type="submit" className="w-full" disabled={loginLoading}>
              {loginLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Entrar
            </Button>
            <Toaster position="top-center" />
            <p className="mt-2 text-nowrap text-sm text-center">
              Sua empresa ainda não possui cadastro?{' '}
              <span
                className="font-bold cursor-pointer hover:text-tertiary text-sm underline"
                onClick={() => navigate('/cadastre-se/dados-empresariais')}
              >
                Cadastre-se <br /> aqui!
              </span>
            </p>
          </div>
        </form>
      </div>
      <div className="flex justify-center items-center ">
        <div className="w-[23rem]">
          <SectionDescription
            title="Bem vindo de volta!"
            subTitle="Estamos felizes em lhe receber novamente! Preencha seus dados para acessar a plataforma. 🥳"
          />
        </div>
      </div>
    </main>
  );
}
