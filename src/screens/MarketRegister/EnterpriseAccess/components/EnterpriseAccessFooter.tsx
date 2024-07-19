import { Button } from '@/components/ui/Button/button';
import { Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface Props {
  registerMarketLoading: boolean;
}

export function EnterpriseAccessFooter({ registerMarketLoading }: Props) {
  const navigate = useNavigate();
  
  return (
    <>
      <Button type="submit" className="w-full" disabled={registerMarketLoading}>
        {registerMarketLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
        Finalizar Cadastro
      </Button>
      <p className="mt-2 text-nowrap text-sm">
        Sua empresa já foi cadastrada?{' '}
        <span
          className="font-bold cursor-pointer hover:text-tertiary text-sm underline"
          onClick={() => navigate('/login')}
        >
          Faça login aqui!
        </span>
      </p>
    </>
  );
}
