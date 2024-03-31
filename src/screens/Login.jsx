import { SectionDescription } from '../components/SectionDescription';
import { HeaderRegister } from '../components/HeaderRegister';
import { Input } from '../components/ui/Input/input';
import { Button } from '../components/ui/Button/button';
import { Toaster } from '../components/ui/Toast/toaster';

export function Login() {
  return (
    <main className="bg-primary grid grid-cols-login w-full h-screen overflow-hidden">
      <div>
        <form className="h-full bg-secondary rounded-login">
          <div className="flex items-center flex-col">
            <HeaderRegister subTitle="Gerencie de forma inteligente o seu mercado com a gente!" />
          </div>
          <div className="flex flex-col mt-20 mx-16 gap-4">
            <div>
              <Input id="Email" name="seu@email.com" type="email" placeholder="seu@email.com" label="Email" />
            </div>
            <div>
              <Input id="Senha" name="cnpj" placeholder="********" type="password" label="Senha" />
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
