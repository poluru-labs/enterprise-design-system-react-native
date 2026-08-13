import { fireEvent, render, screen } from '@testing-library/react-native';
import { ThemeProvider, useTheme } from './ThemeProvider';
import { Text, Pressable } from 'react-native';

function Probe() {
  const { theme, toggleTheme, colors } = useTheme();
  return (
    <Pressable onPress={toggleTheme} accessibilityRole="button" accessibilityLabel="toggle">
      <Text>{theme}</Text>
      <Text>{colors.primary}</Text>
    </Pressable>
  );
}

describe('ThemeProvider', () => {
  it('provides light theme by default', () => {
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    );
    expect(screen.getByText('light')).toBeTruthy();
  });

  it('toggles to dark', () => {
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    );
    fireEvent.press(screen.getByLabelText('toggle'));
    expect(screen.getByText('dark')).toBeTruthy();
  });
});
