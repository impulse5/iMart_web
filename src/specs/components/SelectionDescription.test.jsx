import React from 'react';
import { render, screen } from '@testing-library/react';
import { SectionDescription } from '../../components/SectionDescription/index';

test('renders correctly with the given data', () => {
  const dados = {
    title: "Dados Empresariais",
    subTitle: "Que tal facilitar o seu gerenciamento de mercado e ainda alavancar suas vendas? Vem com a iMart! 🤩"
  };
  render(<SectionDescription title={dados.title} subTitle={dados.subTitle} />);
  const titleElement = screen.getByText(dados.title);
  const subTitleElement = screen.getByText(dados.subTitle);

  expect(titleElement).toBeInTheDocument();
  expect(subTitleElement).toBeInTheDocument();
});