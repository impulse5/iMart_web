import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import {EnterpriseData} from '../../screens/MarketRegister/EnterpriseData'; 
import { RegisterMarketProvider } from '../../contexts/RegisterMarketContext';// Substitua pelo caminho correto do seu componente
import { MemoryRouter } from 'react-router-dom';
describe('Teste do Toast', () => {
    test('Exibição do Toast de erro ao enviar formulário com campos vazios', async () => {
      const { getByTestId, getByText } = render(
        <MemoryRouter>
            <RegisterMarketProvider>
          <EnterpriseData />
          </RegisterMarketProvider>
        </MemoryRouter>
      );
      
      // Simula o envio do formulário com campos vazios
      fireEvent.submit(getByTestId('button'));
  
      // Aguarda a exibição do toast de erro
      await waitFor(() => {
        expect(getByText('Erro no formulário')).toBeInTheDocument();
        expect(getByText('Preencha todos os campos obrigatórios!')).toBeInTheDocument();
      });
    });
  
    // Você pode adicionar mais testes para outros cenários, se necessário
  });