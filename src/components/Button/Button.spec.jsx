import { render, screen } from "@testing-library/react"
import { ButtonComponent } from "."

describe("ButtonComponent", () => {
  it('renders the button component correctly', () => {
    render(<ButtonComponent title="Button-Test"/>);
    const buttonElement = screen.getByText("Button-Test");
    expect(buttonElement).toBeInTheDocument();
  })
})