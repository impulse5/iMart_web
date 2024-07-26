
import { useEffect } from 'react';
import { LogoWhite } from '@/assets/imart_logo_white';
import { useRegisterMarket } from '@/contexts/RegisterMarketContext';
import { useToast } from '@/components/ui/Toast/use-toast';
import { Toaster } from '@/components/ui/Toast/toaster';
import { useNavigate } from 'react-router-dom';

export function EnterpriseSubmission() {
  const { registerSuccess, setRegisterSuccess } = useRegisterMarket();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    if (registerSuccess) {
      toast({
        title: 'Cadastro realizado com sucesso!',
        description: 'Sua submissão foi realizada! 🥳',
        variant: 'success',
        duration: 5000,
      });
      setRegisterSuccess(false);
    } else {
      navigate('/cadastre-se/dados-empresariais');
    }
  }, []);

  return (
    <>
      <div className="flex justify-center items-center flex-col bg-primary w-full h-screen text-secondary text-center gap-4 ">
        <LogoWhite height={100} width={200} />
        <div>
          <h1 className="font-bold text-2xl">Sua solicitação de cadastro foi submetida com sucesso!</h1>
        </div>
        <div>
          <p className="text-xl">
            Estamos preparando o ambiente para a chegada de vocês! <br /> Fique de olho no seu email, avisaremos quando
            tudo estiver <br /> pronto! 😉
          </p>
        </div>
      </div>
      <Toaster position="top-center" />
    </>
  );
}
