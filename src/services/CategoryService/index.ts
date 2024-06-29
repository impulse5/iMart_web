import { useQuery } from "@tanstack/react-query"
import { utils } from "./utils"

export const CategoryService = () => {

  const { getCategories } = utils()

  const { data, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
  })

  return { categories: data, loading: isLoading }
}