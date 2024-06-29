import { Search } from "lucide-react"

type Props = {
  search: string;
  setSearch: (search: string) => void;
}

export const SearchInput = ({search, setSearch}: Props) => {
  return (
    <div className="flex items-center w-96 py-1.5 px-3 outline-none bg-tertiary rounded-md">
      <input
        type="text"
        placeholder="Pesquisar"
        className="flex p-0 bg-transparent border-none outline-none text-sm w-full focus:ring-0"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Search size={20} />
    </div>
  )
}
