export const useRoleTranslate = (role: string) => {
  const roles: { [key: string]: string } = {
    owner: 'Dono',
    manager: "Gerente",
    stockist: "Estoquista",
    seller: "Caixa",
  };
  return roles[role];
};