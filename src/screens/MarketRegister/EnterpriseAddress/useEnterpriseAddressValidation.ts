import { useToast } from '@/components/ui/Toast/use-toast';
import { EnterpriseAddressSchema } from './EnterpriseAddressSchema';

export function useEnterpriseAddressValidation(enterpriseAddress: any, handleNextStep: () => void) {
  const { toast } = useToast();

  const validate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const requiredFields = ['street', 'neighborhood', 'number', 'zipcode'];

    Object.keys(enterpriseAddress).forEach((key) => {
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
      const fieldErrors = (error as any).formErrors.fieldErrors;
      Object.entries(fieldErrors).forEach(([errorMessage]) => {
        toast({
          variant: 'error',
          title: 'Erro no formulário',
          description:errorMessage,
          duration: 5000,
        });
      });
    }
  };

  return validate;
}
