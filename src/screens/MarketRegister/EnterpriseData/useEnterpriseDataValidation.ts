import { EnterpriseDataSchema } from './EnterpriseDataSchema';
import { useToast } from '@/components/ui/Toast/use-toast';

export function useEnterpriseDataValidation(
  enterpriseData: any,
  handleNextStep: () => void
) {
  const { toast } = useToast();

  const validate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const requiredFields = ['cellphone', 'cnpj', 'name'];

    Object.keys(enterpriseData).forEach((key) => {
      if (typeof enterpriseData[key] === 'string') {
        enterpriseData[key] = enterpriseData[key].trim();
      }
    });

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
      const zodError = error as any;
      const fieldErrors = zodError.formErrors?.fieldErrors || {};

      let errorMessage = '';
      Object.entries(fieldErrors).forEach(([messages]) => {
        if (messages.length > 0) {
          errorMessage += `${messages[0]}\n`;
        }
      });

      toast({
        variant: 'error',
        title: 'Erro no formulário',
        description: errorMessage.trim(),
        duration: 5000,
      });
    }
  };

  return validate;
}
