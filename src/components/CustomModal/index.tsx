import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/Dialog/dialog";

type CustomModalProps = {
  type: "create" | "edit" | "delete",
  trigger: React.ReactElement,
  title?: string,
  description?: string,
  fields?: {
    label?: string,
    type: string,
    placeholder: string,
    id?: string,
    value?: string | any,
    onChange?: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void,
    onSelect?: (e: React.ChangeEvent<HTMLSelectElement>) => void,
  }[],
  selectOptions?: {
    [key: string]: { value: string; label: string }[];
  },
  onSubmit?: () => void,
  onInit?: () => void
}

export const CustomModal = ({ type, trigger, title, description, fields, selectOptions, onSubmit, onInit }: CustomModalProps) => {

  return (
    <Dialog onOpenChange={onInit}>
      <DialogTrigger>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-primary text-secondary border-none">
        <DialogHeader className="pt-1 pb-3 px-3 rounded-lg">
          {title && <DialogTitle className="text-neutral-400">{title}</DialogTitle>}
          {description && <DialogDescription className="text-secondary">{description}</DialogDescription>}
        </DialogHeader>
        {fields && (
          <div className="flex flex-col gap-5 items-center">
            {fields.map((field, index) => (
              field.type !== "select" ? (
                <div key={index} className="flex flex-col">
                  <label htmlFor={field.id}>{field.label}</label>
                  <input
                    type={field.type}
                    id={field.id}
                    placeholder={field.placeholder}
                    value={field.value}
                    onChange={field.onChange}
                    className="py-1.5 px-3 w-80 outline-none bg-tertiary rounded-md"
                  />
                </div>
              ) : (
                <div key={index} className="mt-3 mb-2">
                  {/* <label htmlFor={field.id}>{field.label}</label> */}
                  <select
                    id={field.id}
                    value={field.value}
                    onChange={field.onChange}
                    className="py-1.5 px-3 outline-none bg-tertiary rounded-md w-80"
                  >
                    <option value="" disabled>{field.placeholder}</option>
                    {field.id && selectOptions?.[field.id]?.map(option => (
                      <option key={option.value} value={option.value}>{option.label}</option>
                    ))}
                  </select>
                </div>
              )
            ))}
          </div>
        )}
        <DialogFooter>
          <DialogClose>
            <button className="bg-[#010101] py-1.5 px-10 rounded-lg">Cancelar</button>
          </DialogClose>
          <DialogClose>
            {type === "create" ? (
              <button onClick={onSubmit} className="bg-[#010101] py-1.5 px-10 rounded-lg">Cadastrar</button>
            ) : type === "edit" ? (
              <button onClick={onSubmit} className="bg-[#010101] py-1.5 px-10 rounded-lg">Editar</button>
            ) : type === "delete" ? (
              <button onClick={onSubmit} className="bg-error py-1.5 px-10 rounded-lg">Deletar</button>
            ) : null}
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
