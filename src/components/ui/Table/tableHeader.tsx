import { ComponentProps } from "react";

interface TableHeaderProps extends ComponentProps<'th'> {}

export function TableHeader(props: TableHeaderProps) {
    return(
        <th  {...props} className="pb-6 pt-3 text-center text-secondary text-xl font-semibold"></th>
    )
}