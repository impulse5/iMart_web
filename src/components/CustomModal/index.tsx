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
  }[]
  selectOptions?: {
    label: string,
    value: string,
  }[]
}

export const CustomModal = ({type, trigger, title, description, fields, selectOptions}: CustomModalProps) => {
  return (
    <Dialog>
      <DialogTrigger>
        {trigger}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-primary text-secondary border-none">
        <DialogHeader className="pt-1 pb-3 px-3 rounded-lg">
          {
            title && <DialogTitle className="text-neutral-400">{title}</DialogTitle>
          }
          {
            description && <DialogDescription className="text-secondary">{description}</DialogDescription>
          }
        </DialogHeader>
          {
          fields && (
            <div className="flex flex-col gap-5 items-center">
              {
                fields.map((field, index) => (
                  field.type !== "select" ? (
                    <div key={index} className="flex flex-col">
                      <label htmlFor={field.id}>{field.label}</label>
                      <input type={field.type} id={field.id} placeholder={field.placeholder} className="py-1.5 px-3 w-80 outline-none bg-tertiary rounded-md" />
                    </div>
                  ) : (
                    <div className="mt-3 mb-2">
                      <select className="py-1.5 px-3 outline-none bg-tertiary rounded-md w-80">
                        <option disabled selected>{field.placeholder}</option>
                        {
                          selectOptions && selectOptions.map(option => (
                            <option key={option.value}>{option.label}</option>
                          ))
                        }
                      </select>
                    </div>
                  )
                ))
              }
            </div>
          )
        }
          <DialogFooter>
            <DialogClose>
              <button className="bg-[#010101] py-1.5 px-10 rounded-lg">Cancelar</button>
            </DialogClose>
            {
              type === "create" ? (
                <button className="bg-[#010101] py-1.5 px-10 rounded-lg">Cadastrar</button>
              ) : type === "edit" ? (
                <button className="bg-[#010101] py-1.5 px-10 rounded-lg">Editar</button>
              ) : type === "delete" ? (
                <button className="bg-error py-1.5 px-10 rounded-lg">Deletar</button>
              ) : null
            }
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
