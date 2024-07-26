import { Input } from "@/components/ui/Input/input";

interface Props {
  enterpriseAccess: {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
  };
  setEnterpriseAccess: React.Dispatch<React.SetStateAction<any>>;
}

export function EnterpriseAccessFormFields({ enterpriseAccess, setEnterpriseAccess }: Props) {
  return (
    <>
      <div>
        <Input
          type="text"
          id="name"
          name="name"
          placeholder="Jonh Doe"
          value={enterpriseAccess.name}
          onChange={(e) => setEnterpriseAccess({ ...enterpriseAccess, name: e.target.value })}
          label="Nome"
          data-testid="name-input"
        />
      </div>
      <div>
        <Input
          id="email"
          name="email"
          placeholder="seu@email.com"
          value={enterpriseAccess.email}
          onChange={(e) => setEnterpriseAccess({ ...enterpriseAccess, email: e.target.value })}
          label="Email"
          data-testid="Email"
        />
      </div>
      <div>
        <Input
          id="Senha"
          name="password"
          placeholder="*********"
          type="password"
          value={enterpriseAccess.password}
          onChange={(e) => setEnterpriseAccess({ ...enterpriseAccess, password: e.target.value })}
          label="Senha"
          data-testid="Password"
        />
      </div>
      <div>
        <Input
          id="Confirme sua senha"
          name="password_confirmation"
          placeholder="*********"
          type="password"
          value={enterpriseAccess.password_confirmation}
          onChange={(e) => setEnterpriseAccess({ ...enterpriseAccess, password_confirmation: e.target.value })}
          label="Confirme sua senha"
          data-testid="Password_confirmation"
        />
      </div>
    </>
  );
}
