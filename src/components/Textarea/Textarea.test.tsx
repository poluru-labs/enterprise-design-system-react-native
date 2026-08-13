import { render, fireEvent, screen } from '@testing-library/react-native';
import { ThemeProvider } from '../../theme';
import { Textarea } from './Textarea';

describe('Textarea', () => {
  it('renders label', () => {
    render(
      <ThemeProvider>
        <Textarea label="Notes" />
      </ThemeProvider>,
    );
    expect(screen.getByText('Notes')).toBeTruthy();
  });

  it('calls onChangeText when typing', () => {
    const onChangeText = jest.fn();
    render(
      <ThemeProvider>
        <Textarea label="Bio" onChangeText={onChangeText} />
      </ThemeProvider>,
    );
    fireEvent.changeText(screen.getByLabelText('Bio'), 'Hello');
    expect(onChangeText).toHaveBeenCalledWith('Hello');
  });

  it('shows error message when invalid', () => {
    render(
      <ThemeProvider>
        <Textarea label="Bio" invalid errorMessage="Too short" />
      </ThemeProvider>,
    );
    expect(screen.getByText('Too short')).toBeTruthy();
  });
});
