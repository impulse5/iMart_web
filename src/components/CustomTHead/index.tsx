import { TableHeader } from "../Table/tableHeader"

type Props = {
  fields: string[]
}

export const CustomTHead = ({fields}: Props) => {
  return (
    <thead>
      <tr className="border-b border-neutral-400/70">
        {fields.map((field) => (
          <TableHeader key={field}>{field}</TableHeader>
        ))}
        <th className="pb-3 pt-3 pl-5 text-center text-secondary text-xl font-semibold">Ações</th>
      </tr>
    </thead>
  )
}
