export interface FieldOption {
  value: string;
  label: string;
}

export interface FieldType {
  id?: string;
  label?: string;
  type: 'text' | 'number' | 'select';
  placeholder: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  options?: FieldOption[];
}
