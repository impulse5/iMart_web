import { render, fireEvent, waitFor } from '@testing-library/react';
import {EnterpriseData} from '../../screens/MarketRegister/EnterpriseData'; 
import { RegisterMarketProvider } from '../../contexts/RegisterMarketContext';
import { MemoryRouter } from 'react-router-dom';
import "@testing-library/jest-dom";
describe('test toast', () => {
    test('Toast displays error when submitting form with empty fields', async () => {
      const { getByTestId, getByText } = render(
        <MemoryRouter>
            <RegisterMarketProvider>
          <EnterpriseData />
          </RegisterMarketProvider>
        </MemoryRouter>
      );
      fireEvent.submit(getByTestId('button')); 
      await waitFor(() => {
        expect(getByText('Erro no formulário')).toBeInTheDocument();
        expect(getByText('Preencha todos os campos obrigatórios!')).toBeInTheDocument();
      });
    });
  });