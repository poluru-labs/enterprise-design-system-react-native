import { render, fireEvent, screen } from '@testing-library/react-native';
import { ThemeProvider } from '../../theme';
import { Switch } from './Switch';

describe('Switch', () => {
  it('renders label', () => {
    render(
      <ThemeProvider>
        <Switch label="Notifications" />
      </ThemeProvider>,
    );
    expect(screen.getByText('Notifications')).toBeTruthy();
  });

  it('calls onCheckedChange when toggled', () => {
    const onCheckedChange = jest.fn();
    render(
      <ThemeProvider>
        <Switch label="Dark mode" checked={false} onCheckedChange={onCheckedChange} />
      </ThemeProvider>,
    );
    fireEvent(screen.getByRole('switch'), 'valueChange', true);
    expect(onCheckedChange).toHaveBeenCalledWith(true);
  });

  it('reflects checked state', () => {
    render(
      <ThemeProvider>
        <Switch label="On" checked />
      </ThemeProvider>,
    );
    expect(screen.getByRole('switch').props.accessibilityState?.checked).toBe(true);
  });
});
