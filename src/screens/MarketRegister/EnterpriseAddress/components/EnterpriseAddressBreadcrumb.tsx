import { Breadcrumb } from '@/components/ui/Breadcrumb/breadcrumb';

interface BreadcrumbItem {
  text: string;
  link?: string;
  current: boolean;
}

interface EnterpriseAddressBreadcrumbProps {
  items: BreadcrumbItem[];
}

export function EnterpriseAddressBreadcrumb({ items }: EnterpriseAddressBreadcrumbProps) {
  return (
    <Breadcrumb items={items} />
  );
}
