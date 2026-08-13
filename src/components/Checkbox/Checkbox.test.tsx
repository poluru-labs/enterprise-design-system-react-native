import { render, fireEvent, screen } from '@testing-library/react-native';
import { ThemeProvider } from '../../theme';
import { Checkbox } from './Checkbox';

describe('Checkbox', () => {
  it('renders label', () => {
    render(
      <ThemeProvider>
        <Checkbox label="Accept terms" />
      </ThemeProvider>,
    );
    expect(screen.getByText('Accept terms')).toBeTruthy();
  });

  it('calls onCheckedChange when pressed', () => {
    const onCheckedChange = jest.fn();
    render(
      <ThemeProvider>
        <Checkbox label="Accept" checked={false} onCheckedChange={onCheckedChange} />
      </ThemeProvider>,
    );
    fireEvent.press(screen.getByRole('checkbox'));
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('does not call onCheckedChange when disabled', () => {
    const onCheckedChange = jest.fn();
    render(
      <ThemeProvider>
        <Checkbox label="Accept" disabled onCheckedChange={onCheckedChange} />
      </ThemeProvider>,
    );
    fireEvent.press(screen.getByRole('checkbox'));
    expect(onCheckedChange).not.toHaveBeenCalled();
  });
});
