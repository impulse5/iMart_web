import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/Toast/toast"
import { useToast } from "@/components/ui/Toast/use-toast"
import { positionTranslate } from "./positionTranslate"

type ValidPositions = keyof typeof positionTranslate

export function Toaster({position = "down-right"}) {
  const { toasts } = useToast()

  return (
    (<ToastProvider>
      {toasts.map(function ({ id, title, description, action, ...props }) {
        return (
          (<Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>)
        )
      })}
      <ToastViewport className={`${positionTranslate[position as ValidPositions]}`} data-testid="toast-viewport" />
    </ToastProvider>)
  )
}