import { render, fireEvent, waitFor } from '@testing-library/react';
import  {EnterpriseData}  from '../../../../screens/MarketRegister/EnterpriseData'; 
import { MemoryRouter } from 'react-router-dom'
import { RegisterMarketProvider } from '../../../../contexts/RegisterMarketContext';

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
  
      fireEvent.submit(getByText('Proxíma etapa'));

      await waitFor(() => {
        expect(window.location.pathname).toBe('/');
      });
    });
  });

 