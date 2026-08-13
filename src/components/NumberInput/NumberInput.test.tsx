import { render, fireEvent, screen } from '@testing-library/react-native';
import { ThemeProvider } from '../../theme';
import { NumberInput } from './NumberInput';

describe('NumberInput', () => {
  it('renders label and value', () => {
    render(
      <ThemeProvider>
        <NumberInput label="Quantity" value={3} />
      </ThemeProvider>,
    );
    expect(screen.getByText('Quantity')).toBeTruthy();
    expect(screen.getByDisplayValue('3')).toBeTruthy();
  });

  it('increments value', () => {
    const onValueChange = jest.fn();
    render(
      <ThemeProvider>
        <NumberInput label="Qty" value={2} step={1} onValueChange={onValueChange} />
      </ThemeProvider>,
    );
    fireEvent.press(screen.getByLabelText('Increase value'));
    expect(onValueChange).toHaveBeenCalledWith(3);
  });

  it('decrements value', () => {
    const onValueChange = jest.fn();
    render(
      <ThemeProvider>
        <NumberInput label="Qty" value={2} step={1} min={0} onValueChange={onValueChange} />
      </ThemeProvider>,
    );
    fireEvent.press(screen.getByLabelText('Decrease value'));
    expect(onValueChange).toHaveBeenCalledWith(1);
  });
});
