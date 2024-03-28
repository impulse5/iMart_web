import { LogoBlack } from '../../assets/imart_logo_black';

export const HeaderRegister = ({ height, width }) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <LogoBlack height={height} width={width} />
      <h3 className="text-center font-medium text-tertiary">
        Gerencie de forma inteligente o seu <br /> mercado com a gente!
      </h3>
    </div>
  );
};
