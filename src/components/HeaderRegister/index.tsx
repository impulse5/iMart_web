import { LogoBlack } from '../../assets/imart_logo_black'

type Props = {
  height?: number
  width?: number
}

export const HeaderRegister = ({ height = 55, width = 150 }: Props) => {
  return (
    <div className="flex flex-col justify-center items-center mt-12">
      <LogoBlack height={height} width={width} />
      <h3 className="text-center font-medium text-tertiary">
        Gerencie de forma inteligente o seu <br /> mercado com a gente!
      </h3>
    </div>
  )
}
