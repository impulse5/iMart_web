import { render, screen } from '@testing-library/react';
import { Input } from '../../components/ui/Input/input';

describe('Input', () => {
  test('should render correctly', () => {
    render(<Input type="text" placeholder="Digite algo" />);
    const inputElement = screen.getByPlaceholderText('Digite algo');
    expect(inputElement).toBeInTheDocument();
    expect(inputElement).toHaveAttribute('type', 'text');
  });
  test('must accept additional classes', () => {
    render(<Input className="test-class" />);
    const inputElement = screen.getByRole('textbox');
    expect(inputElement).toHaveClass('test-class');
  });
});
