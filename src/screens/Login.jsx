import { SectionDescription } from '../components/SectionDescription';
import { HeaderRegister } from '../components/HeaderRegister';
import { Input } from '../components/ui/Input/input';
import { Button } from '../components/ui/Button/button';
import { Toaster } from '../components/ui/Toast/toaster';
import { useToast } from '../components/ui/Toast/use-toast';
import { useState } from 'react';
import { z } from 'zod';

const EnterpriseLoginSchema = z.object({
  email: z
    .string()
    .regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: ' verifique se o email está correto.' }),
  password: z.string().regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, {
    message: 'A senha está incorreta!',
  }),
});
export function Login() {
  const { toast } = useToast();
  const [enterpriseLogin, setEnterpriseLogin] = useState({ email: '', password: '' });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEnterpriseLogin({ ...enterpriseLogin, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const requiredFields = ['email', 'password'];
    const emptyFields = requiredFields.filter((field) => !enterpriseLogin[field]);

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
    EnterpriseLoginSchema.parse(enterpriseLogin);
  } catch (error) {
    const fieldErrors = error.errors.reduce((acc, err) => {
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
          title: 'Erro no email',
          description: fieldErrors.emailError,
          duration: 5000,
        });
      }
      if (fieldErrors.passwordError) {
        toast({
          variant: 'error',
          title: 'Erro na senha',
          description: fieldErrors.passwordError,
          duration: 5000,
        });
      }
    } else {
      const allFieldErrors = error.errors.map((err) => err.message).join(', ');
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

  return (
    <main className="bg-primary grid grid-cols-login w-full h-screen overflow-hidden">
      <div>
        <form className="h-full bg-secondary rounded-login" onSubmit={handleSubmit} novalidate>
          <div className="flex items-center flex-col">
            <HeaderRegister subTitle="Gerencie de forma inteligente o seu mercado com a gente!" />
          </div>
          <div className="flex flex-col mt-20 mx-16 gap-4">
            <div>
              <Input
                id="Email"
                name="email"
                for="email"
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
            <Button type="submit" className="w-full">
              Entrar
            </Button>
            <Toaster position="top-center" />
            <p className="mt-2 text-nowrap text-sm text-center">
              Sua empresa ainda não possui cadastro?{' '}
              <span className="font-bold cursor-pointer hover:text-tertiary text-sm underline">
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
