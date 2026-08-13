import { render, fireEvent, screen } from '@testing-library/react-native';
import { ThemeProvider } from '../../theme';
import { Input } from './Input';

describe('Input', () => {
  it('renders label and placeholder', () => {
    render(
      <ThemeProvider>
        <Input label="Email" placeholder="you@example.com" />
      </ThemeProvider>,
    );
    expect(screen.getByText('Email')).toBeTruthy();
    expect(screen.getByPlaceholderText('you@example.com')).toBeTruthy();
  });

  it('calls onChangeText when typing', () => {
    const onChangeText = jest.fn();
    render(
      <ThemeProvider>
        <Input label="Name" onChangeText={onChangeText} />
      </ThemeProvider>,
    );
    fireEvent.changeText(screen.getByLabelText('Name'), 'Ada');
    expect(onChangeText).toHaveBeenCalledWith('Ada');
  });

  it('shows error message when invalid', () => {
    render(
      <ThemeProvider>
        <Input label="Email" invalid errorMessage="Required" />
      </ThemeProvider>,
    );
    expect(screen.getByText('Required')).toBeTruthy();
  });
});
