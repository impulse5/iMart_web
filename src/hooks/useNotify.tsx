import { useToast } from "@/components/ui/Toast/use-toast"

export const useNotify = () => {
  const { toast } = useToast()

  const notifySuccess = (title: string, description: string, duration = 3000) => {
    return toast({
      title,
      description,
      variant: 'success',
      duration
    })
  }

  const notifyError = (title: string, description: string, duration = 3000) => {
    return toast({
      title,
      description,
      variant: 'error',
      duration
    })
  }

  return { notifySuccess, notifyError }
}
