import { Breadcrumb } from '../components/ui/Breadcrumb/breadcrumb';

export default function Home() {
  const breadcrumbItems = [
    { text: 'Dados empresarias', link: '/', current: false },
    { text: 'Endereço', link: '/test-components', current: false },
    { text: 'Acesso', link: '/acesso', current: true },
  ];
  return (
    <div>
      <h1 className="flex justify-center font-bold text-5xl ">under construction</h1>
      <Breadcrumb items={breadcrumbItems} />
    </div>
  );
}
