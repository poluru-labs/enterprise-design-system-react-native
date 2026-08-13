import { render, fireEvent, screen } from '@testing-library/react-native';
import { ThemeProvider } from '../../theme';
import { Combobox } from './Combobox';

const options = [
  { value: 'react', label: 'React' },
  { value: 'vue', label: 'Vue' },
  { value: 'svelte', label: 'Svelte' },
];

describe('Combobox', () => {
  it('renders label', () => {
    render(
      <ThemeProvider>
        <Combobox label="Framework" options={options} />
      </ThemeProvider>,
    );
    expect(screen.getByText('Framework')).toBeTruthy();
  });

  it('filters and selects an option', () => {
    const onValueChange = jest.fn();
    render(
      <ThemeProvider>
        <Combobox label="Framework" options={options} onValueChange={onValueChange} />
      </ThemeProvider>,
    );
    fireEvent.changeText(screen.getByLabelText('Framework'), 'vu');
    fireEvent.press(screen.getByText('Vue'));
    expect(onValueChange).toHaveBeenCalledWith('vue');
  });

  it('toggles options list', () => {
    render(
      <ThemeProvider>
        <Combobox label="Framework" options={options} />
      </ThemeProvider>,
    );
    fireEvent.press(screen.getByLabelText('Toggle options'));
    expect(screen.getByText('React')).toBeTruthy();
  });
});
