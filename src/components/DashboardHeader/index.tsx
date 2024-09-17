import { UserDropdown } from "../UserDropdown/Dropdown"

type Props = {
  title: string;
}

export const DashboardHeader = ({title}: Props) => {
  return (
    <header className="flex justify-between items-center mt-6">
        <div>
            <h1 className="text-3xl text-neutral-400 font-bold uppercase">{title}</h1>
        </div>
        <div>
            <UserDropdown />
        </div>
    </header>
  )
}
