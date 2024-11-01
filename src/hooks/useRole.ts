export const useRoleTranslate = (role: string) => {
  const roles: { [key: string]: string } = {
    owner: 'Dono',
    manager: "Gerente",
    stockist: "Estoquista",
    seller: "Caixa",
  };
  return roles[role];
};

export const ownerRoles = [
  { value: 'gerente', label: 'Gerente' },
  { value: 'estoquista', label: 'Estoquista' },
  { value: 'caixa', label: 'Caixa' },
]

export const roles = [
  { value: 'estoquista', label: 'Estoquista' },
  { value: 'caixa', label: 'Caixa' },
]