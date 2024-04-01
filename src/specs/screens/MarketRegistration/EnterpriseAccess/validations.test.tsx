import { render, fireEvent, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom'
import { RegisterMarketProvider } from '../../../../contexts/RegisterMarketContext';
import { EnterpriseAccess } from '../../../../screens/MarketRegister/EnterpriseAccess';


describe('EnterpriseAccess form validation', () => {
    test('submits form on valid input', async () => {
      const { getByText, getByTestId } = render(
        <MemoryRouter>
          <RegisterMarketProvider>
            <EnterpriseAccess />
          </RegisterMarketProvider>
        </MemoryRouter>
      );
      fireEvent.change(getByTestId('name-input'), { target: { value: 'Jonh Doe' } });
      fireEvent.change(getByTestId('Email'), { target: { value: 'empresa@example.com' } });
      fireEvent.change(getByTestId('Password'), { target: { value: 'Senha@123' } });
      fireEvent.change(getByTestId('Password_confirmation'), { target: { value: 'Senha@123' } });
  
      fireEvent.submit(getByText('Finalizar Cadastro'));
  
      await waitFor(() => {
        expect(window.location.pathname).toBe('/');
      });
    });
  });