import { render, fireEvent, screen } from '@testing-library/react-native';
import { ThemeProvider } from '../../theme';
import { Select } from './Select';

const options = [
  { value: 'a', label: 'Alpha' },
  { value: 'b', label: 'Beta' },
];

describe('Select', () => {
  it('renders label and placeholder', () => {
    render(
      <ThemeProvider>
        <Select label="Fruit" options={options} placeholder="Pick one" />
      </ThemeProvider>,
    );
    expect(screen.getByText('Fruit')).toBeTruthy();
    expect(screen.getByText('Pick one')).toBeTruthy();
  });

  it('opens options and calls onValueChange', () => {
    const onValueChange = jest.fn();
    render(
      <ThemeProvider>
        <Select label="Fruit" options={options} onValueChange={onValueChange} />
      </ThemeProvider>,
    );
    fireEvent.press(screen.getByRole('button', { name: 'Fruit' }));
    fireEvent.press(screen.getByText('Beta'));
    expect(onValueChange).toHaveBeenCalledWith('b');
  });

  it('shows selected option label', () => {
    render(
      <ThemeProvider>
        <Select label="Fruit" options={options} value="a" />
      </ThemeProvider>,
    );
    expect(screen.getByText('Alpha')).toBeTruthy();
  });
});
