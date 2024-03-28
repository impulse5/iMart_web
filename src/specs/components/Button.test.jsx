import { fireEvent, getByText, render } from "@testing-library/react";
import { Button } from "../../components/ui/button";

test('render button correctly', () => {
    const { getByText } = render(<Button>Button</Button>)
    const button = getByText('Button')
    expect(button).toBeInTheDocument()
})

test('calls the onclick property', () => {
    const onClickMock = jest.fn()
    const { getByText } = render(<Button onClick={onClickMock}>Button</Button>)
    const button = getByText('Button')
    fireEvent.click(button)
    expect(onClickMock).toHaveBeenCalled()
})

test('applies correct styles', () => {
    const { getByText } = render(<Button className="custom-test">Button</Button>)
    const button = getByText('Button')
    expect(button).toHaveClass('custom-test')
})