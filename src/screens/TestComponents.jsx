import { Input } from '../components/ui/Input/input';
import { HeaderRegister } from '../components/HeaderRegister';
import { Button } from '../components/ui/Button/button';
import { useToast } from '../components/ui/Toast/use-toast';
import { Toaster } from '../components/ui/Toast/toaster';
import { Link } from 'react-router-dom';

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '../components/ui/Breadcrumb/breadcrumb';

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
        <Input placeholder="teste" type="password" label="Teste Label" />
        
          <Breadcrumb>
            <BreadcrumbList>
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link to="/">Dados empresarias</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link to="/Endereço">Endereço</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
              <BreadcrumbSeparator />
              <BreadcrumbItem>
                <BreadcrumbLink>
                  <Link to="/Endereço">Endereço</Link>
                </BreadcrumbLink>
              </BreadcrumbItem>
            </BreadcrumbList>
          </Breadcrumb>       
      </div>
      <Toaster position="down-left" />
    </>
  );
}
