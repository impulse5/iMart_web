import { Breadcrumb } from "@/components/ui/Breadcrumb/breadcrumb";

interface Props {
  items: Array<{ text: string; link?: string; current: boolean }>;
}

export function EnterpriseAccessBreadcrumb({ items }: Props) {
  return <Breadcrumb items={items} />;
}
