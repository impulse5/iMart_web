import { LogoWhite } from '../../assets/imart_logo_white';

export function EnterpriseSubmission() {
  return (
    <div className="flex justify-center items-center flex-col bg-primary w-full h-screen text-secondary text-center gap-4 ">
      <LogoWhite height={100} width={200} />
      <div>
        <h1 className="font-bold text-2xl">Sua solicitação de cadastro foi submetida com sucesso!</h1>
      </div>
      <div>
        <p className="text-xl">
          Estamos preparando o ambiente para a chegada de vocês! <br /> Fique de olho no seu email, avisaremos quando
          tudo estiver <br /> pronto! 😉
        </p>
      </div>
    </div>
  );
}
