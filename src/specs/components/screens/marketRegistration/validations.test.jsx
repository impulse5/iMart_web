
import { render, fireEvent, waitFor } from '@testing-library/react';
import  {EnterpriseData}  from '../../../../screens/MarketRegister/EnterpriseData'; 
import { MemoryRouter } from 'react-router-dom'
import { RegisterMarketProvider } from '../../../../contexts/RegisterMarketContext';
import { EnterpriseAddress } from '../../../../screens/MarketRegister/EnterpriseAddress';

describe('EnterpriseData form validation', () => {
    test('navigates to the next step on valid input', async () => {
      const { getByLabelText, getByText } = render(
        <MemoryRouter>
          <RegisterMarketProvider> 
            <EnterpriseData />
          </RegisterMarketProvider>
        </MemoryRouter>
      );

      fireEvent.change(getByLabelText('Nome da empresa'), { target: { value: 'Supermercado iMart LTDA' } });
      fireEvent.change(getByLabelText('CNPJ'), { target: { value: '12.345.678/0001-90' } });
      fireEvent.change(getByLabelText('Telefone'), { target: { value: '+55 11 12345-6789' } });
  
      fireEvent.submit(getByText('Próxima etapa'));

      await waitFor(() => {
        expect(window.location.pathname).toBe('/');
      });
    });
  });

  describe('EnterpriseAddress form validation', () => {
    test('navigates to the next step on valid input', async () => {
      const { getByLabelText, getByText } = render(
        <MemoryRouter>
          <RegisterMarketProvider> 
            <EnterpriseAddress />
          </RegisterMarketProvider>
        </MemoryRouter>
      );
  
      fireEvent.change(getByLabelText('Rua'), { target: { value: 'Av. Principal' } });
      fireEvent.change(getByLabelText('Bairro'), { target: { value: 'Centro' } });
      fireEvent.change(getByLabelText('Número'), { target: { value: '123' } });
      fireEvent.change(getByLabelText('CEP'), { target: { value: '12345678' } });
  
      fireEvent.submit(getByText('Próxima etapa'));
  
      await waitFor(() => {
        expect(window.location.pathname).toBe('/');
      });
    });
  });