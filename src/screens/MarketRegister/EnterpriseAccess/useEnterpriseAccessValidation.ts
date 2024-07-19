import { EnterpriseAccessSchema } from './EnterpriseAccessSchema';
import { useToast } from '@/components/ui/Toast/use-toast';

export function useEnterpriseAccessValidation(enterpriseAccess: any, registerMarket: () => void) {
  const { toast } = useToast();

  const validate = (e: React.FormEvent<HTMLFormElement>) => {
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
      const zodError = error as any;
      const fieldErrors = zodError.formErrors?.fieldErrors || {};
      Object.entries(fieldErrors).forEach(([errorMessages]: any) => {
        const errorMessage = errorMessages[0];
        toast({
          variant: 'error',
          title: 'Erro no formulário',
          description: errorMessage,
          duration: 5000,
        });
      });
    }
  };

  return validate;
}
