import { Input } from '../components/ui/Input/input';
import { HeaderRegister } from '../components/HeaderRegister';
import { Button } from '../components/ui/Button/button';
import { useToast } from '../components/ui/Toast/use-toast';
import { Toaster } from '../components/ui/Toast/toaster';
import { Breadcrumb } from '../components/ui/Breadcrumb/breadcrumb';
import { SectionDescription } from '../components/SectionDescription';

export default function TestComponents() {
  const { toast } = useToast();

  const handleClick = () => {
    toast({
      title: 'Notificação',
      description: 'Esta é uma notificação de teste',
      duration: 1000,
    });
  };
  const breadcrumbItems = [
    { text: 'Dados empresarias', link: '/', current: false },
    { text: 'Endereço', link: '/test-components', current: false },
    { text: 'Acesso', link: '/acesso', current: true },
  ];

  return (
    <>
      <div className="bg-neutral-700">
        <Button onClick={handleClick}>Abrir notificação</Button>
        <HeaderRegister />
        <Input placeholder="teste" type="password" label="Teste Label" />
        <Breadcrumb items={breadcrumbItems} />
        <SectionDescription
          title="Dados Empresariais"
          subTitle="Que tal facilitar o seu gerenciamento de mercado e ainda alavancar suas vendas? Vem com a iMart! 🤩"
        />
      </div>
      <Toaster position="down-left" />
    </>
  );
}
