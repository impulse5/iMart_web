import { ComponentProps } from "react";

interface TableCellProps extends ComponentProps<"td"> {}

export function TableCell(props: TableCellProps) {
  return (
    <td
      {...props}
      className="py-3 text-center font-light text-lg "
    ></td>
  );
}