import React from 'react';
import { render } from '@testing-library/react';
import {Breadcrumb} from '../../components/ui/Breadcrumb/breadcrumb';

const breadcrumbItems = [
    { text: 'Dados empresarias', link: '/', current: 'false' },
    { text: 'Endereço', link: '/endereco', current: 'false' },
    { text: 'Acesso', link: '/acesso', current: 'true' },
  ];
  
  test('renders Breadcrumb component with correct items', () => {
    const { getByText } = render(<Breadcrumb items={breadcrumbItems} />);

    breadcrumbItems.forEach(item => {
      const linkElement = getByText(item.text);
      expect(linkElement).toBeInTheDocument();
      expect(linkElement.getAttribute('href')).toBe(item.link);
    });
  
    const currentBreadcrumbItem = breadcrumbItems.find(item => item.current === 'true');
    const activeItem = getByText(currentBreadcrumbItem.text);
    expect(activeItem).toBeInTheDocument();
  });