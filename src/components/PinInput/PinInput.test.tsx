import { render, fireEvent, screen } from '@testing-library/react-native';
import { ThemeProvider } from '../../theme';
import { PinInput } from './PinInput';

describe('PinInput', () => {
  it('renders label and cells', () => {
    render(
      <ThemeProvider>
        <PinInput label="OTP" length={4} />
      </ThemeProvider>,
    );
    expect(screen.getByText('OTP')).toBeTruthy();
    expect(screen.getByLabelText('Digit 1 of 4')).toBeTruthy();
    expect(screen.getByLabelText('Digit 4 of 4')).toBeTruthy();
  });

  it('calls onChange when typing a digit', () => {
    const onChange = jest.fn();
    render(
      <ThemeProvider>
        <PinInput length={4} onChange={onChange} />
      </ThemeProvider>,
    );
    fireEvent.changeText(screen.getByLabelText('Digit 1 of 4'), '1');
    expect(onChange).toHaveBeenCalledWith('1');
  });

  it('calls onComplete when all digits filled', () => {
    const onComplete = jest.fn();
    render(
      <ThemeProvider>
        <PinInput length={2} value="1" onChange={() => undefined} onComplete={onComplete} />
      </ThemeProvider>,
    );
    fireEvent.changeText(screen.getByLabelText('Digit 2 of 2'), '2');
    expect(onComplete).toHaveBeenCalledWith('12');
  });
});
