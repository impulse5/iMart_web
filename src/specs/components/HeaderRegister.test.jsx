import { HeaderRegister } from "../../components/HeaderRegister";
import { render } from "@testing-library/react";

test('render with correct height and width', () => {
    const { getByTestId } = render(<HeaderRegister height={360} width={270}/>)
    const logo = getByTestId('logo-black')
    expect(logo).toHaveAttribute('height', '360')
    expect(logo).toHaveAttribute('width', '270')
})

test('renders text correctly', () => {
    const { getByText } = render(<HeaderRegister />)
    const text = /Gerencie de forma inteligente o seu/;
    expect(getByText(text)).toBeInTheDocument()
})