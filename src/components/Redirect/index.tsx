import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

type Props = {
  route: string
}

export const Redirect = ({ route }: Props) => {
  const navigate = useNavigate()

  useEffect(() => {
    navigate(route, { replace: true })
  })

  return <></>
}
