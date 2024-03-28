import { HeaderRegister } from '../components/HeaderRegister';
import { Button } from '../components/ui/Button/button';
import { useToast } from '../components/ui/Toast/use-toast';
import { Toaster } from '../components/ui/Toast/toaster';

export default function TestComponents() {
  const { toast } = useToast();

  const handleClick = () => {
    toast({
      title: 'Notificação',
      description: 'Esta é uma notificação de teste',
      duration: 1000,
    });
  };

  return (
    <>
      <div>
        <Button onClick={handleClick}>Abrir notificação</Button>
        <HeaderRegister />
      </div>
      <Toaster position="down-left" />
    </>
  );
}
