import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useNotify } from "@/hooks/useNotify";
import { utils } from "./utilts";

export const EmployeeService = () => {
  const { getEmployees, deleteEmployee, turnEmployeeStatus, createEmployee, updateEmployee } = utils();
  const { notifySuccess, notifyError } = useNotify();
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["employees"],
    queryFn: getEmployees,
  });

  const { mutateAsync: create } = useMutation({
    mutationFn: createEmployee,
    onSuccess: () => {
      notifySuccess('Funcionário criado', 'Funcionário criado com sucesso!')
      queryClient.invalidateQueries({queryKey: ["employees"]});
    },
    onError: () => {
      notifyError('Erro ao criar funcionário', 'Ocorreu um erro ao criar o funcionário. Tente novamente')
    }
  })

  const { mutateAsync: update } = useMutation({
    mutationFn: updateEmployee,
    onSuccess: () => {
      notifySuccess('Funcionário atualizado', 'Funcionário atualizado com sucesso!')
      queryClient.invalidateQueries({queryKey: ["employees"]});
    },
    onError: () => {
      notifyError('Erro ao atualizar funcionário', 'Ocorreu um erro ao atualizar o funcionário. Tente novamente')
    }
  })

  const { mutateAsync: destroy } = useMutation({
    mutationFn: deleteEmployee,
    onSuccess: () => {
      notifySuccess('Funcionário deletado', 'Funcionário deletado com sucesso!')
      queryClient.invalidateQueries({queryKey: ["employees"]});
    },
    onError: () => {
      notifyError('Erro ao deletar funcionário', 'Ocorreu um erro ao deletar o funcionário. Tente novamente')
    }
  })

  const { mutateAsync: turnStatus } = useMutation({
    mutationFn: turnEmployeeStatus,
    onSuccess: () => {
      notifySuccess('Status do funcionário alterado', 'Status do funcionário alterado com sucesso!')
      queryClient.invalidateQueries({queryKey: ["employees"]});
    },
    onError: () => {
      notifyError('Erro ao alterar status do funcionário', 'Ocorreu um erro ao alterar o status do funcionário. Tente novamente')
    }
  })

  return { 
    employees: data, 
    loading: isLoading, 
    destroy, 
    turnStatus, 
    create,
    update 
  };
}