import { Input } from '@/components/ui/Input/input';
import { useRegisterMarket } from '@/contexts/RegisterMarketContext';

export function EnterpriseAddressForm() {
  const { enterpriseAddress, setEnterpriseAddress } = useRegisterMarket();

  return (
    <div className="flex flex-col gap-4">
      <Input
        name="street"
        id="Rua"
        type="text"
        value={enterpriseAddress.street}
        onChange={(e) => setEnterpriseAddress({ ...enterpriseAddress, street: e.target.value })}
        placeholder="12 de fevereiro"
        label="Rua"
      />
      <Input
        name="neighborhood"
        id="Bairro"
        placeholder="Passaré"
        value={enterpriseAddress.neighborhood}
        onChange={(e) => setEnterpriseAddress({ ...enterpriseAddress, neighborhood: e.target.value })}
        type="text"
        label="Bairro"
      />
      <Input
        type="number"
        name="number"
        id="Número"
        placeholder="1547"
        value={enterpriseAddress.number}
        onChange={(e) => setEnterpriseAddress({ ...enterpriseAddress, number: e.target.value })}
        label="Número"
      />
      <Input
        id="CEP"
        name="zipcode"
        type="text"
        placeholder="00000-000"
        value={enterpriseAddress.zipcode}
        onChange={(e) => {
          let formattedCep = e.target.value.replace(/\D/g, '');
          if (formattedCep.length >= 5 && formattedCep.length <= 9) {
            formattedCep = `${formattedCep.substr(0, 5)}-${formattedCep.substr(5)}`;
          }
          setEnterpriseAddress({ ...enterpriseAddress, zipcode: formattedCep });
        }}
        label="CEP"
        maxLength={9}
      />
              <Input
                placeholder="Preencha o CEP para exibir a cidade"
                value={enterpriseAddress.city}
                className="pointer-events-none"
                disabled={enterpriseAddress.city == ''}
              />
              <Input
                placeholder="Preencha o CEP para exibir o estado"
                value={enterpriseAddress.state}
                className="pointer-events-none"
                disabled={enterpriseAddress.city == ''}
              />
    </div>
  );
}
