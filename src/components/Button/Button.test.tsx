import { render, fireEvent, screen } from '@testing-library/react-native';
import { ThemeProvider } from '../../theme';
import { Button } from './Button';

describe('Button', () => {
  it('renders label content', () => {
    render(
      <ThemeProvider>
        <Button>Continue</Button>
      </ThemeProvider>,
    );
    expect(screen.getByRole('button', { name: 'Continue' })).toBeTruthy();
  });

  it('calls onPress when pressed', () => {
    const onPress = jest.fn();
    render(
      <ThemeProvider>
        <Button onPress={onPress}>Click me</Button>
      </ThemeProvider>,
    );
    fireEvent.press(screen.getByRole('button'));
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    render(
      <ThemeProvider>
        <Button disabled onPress={onPress}>
          Disabled
        </Button>
      </ThemeProvider>,
    );
    fireEvent.press(screen.getByRole('button'));
    expect(onPress).not.toHaveBeenCalled();
  });

  it('uses accessible label for icon-only buttons', () => {
    render(
      <ThemeProvider>
        <Button iconOnly icon="settings" accessibleLabel="Settings">
          Hidden
        </Button>
      </ThemeProvider>,
    );
    expect(screen.getByRole('button', { name: 'Settings' })).toBeTruthy();
  });

  it('sets busy state when loading', () => {
    render(
      <ThemeProvider>
        <Button loading>Loading</Button>
      </ThemeProvider>,
    );
    expect(screen.getByRole('button').props.accessibilityState?.busy).toBe(true);
  });
});
