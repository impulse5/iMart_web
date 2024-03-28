import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "../Toast/toast"
import { useToast } from "../Toast/use-toast"
import { positionTranslate } from "./positionTranslate";

export function Toaster({ position = "down-left"}) {
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
        );
      })}
      <ToastViewport className={`${positionTranslate[position]}`}  data-testid="toast-viewport" />
    </ToastProvider>)
  );
}
