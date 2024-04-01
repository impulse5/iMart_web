import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Breadcrumb } from '../../components/ui/Breadcrumb/breadcrumb';

describe('Breadcrumb Component', () => {
  test('renders breadcrumb items correctly', () => {
    const breadcrumbItems = [
      { text: 'Dados empresariais', current: true },
      { text: 'Endereço', current: false },
      { text: 'Acesso', current: false },
    ];

    const { getByText } = render(
      <MemoryRouter>
        <Breadcrumb items={breadcrumbItems} />
      </MemoryRouter>
    );

    breadcrumbItems.forEach((item) => {
      const breadcrumbItem = getByText(item.text);
      expect(breadcrumbItem).toBeInTheDocument();
      if (item.current) {
        expect(breadcrumbItem).toHaveClass('transition-colors hover:text-foreground font-bold '); 
      } else {
        expect(breadcrumbItem).not.toHaveClass('transition-colors hover:text-foreground font-bold ');
      }
    });
  });
});