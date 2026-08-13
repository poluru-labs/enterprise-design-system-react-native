import { render, fireEvent, screen } from '@testing-library/react-native';
import { ThemeProvider } from '../../theme';
import { Autocomplete } from './Autocomplete';

describe('Autocomplete', () => {
  it('renders label', () => {
    render(
      <ThemeProvider>
        <Autocomplete label="City" suggestions={['Austin', 'Dallas']} />
      </ThemeProvider>,
    );
    expect(screen.getByText('City')).toBeTruthy();
  });

  it('shows matching suggestions while typing', () => {
    const onChangeText = jest.fn();
    render(
      <ThemeProvider>
        <Autocomplete
          label="City"
          suggestions={['Austin', 'Dallas', 'Houston']}
          onChangeText={onChangeText}
        />
      </ThemeProvider>,
    );
    fireEvent.changeText(screen.getByLabelText('City'), 'au');
    expect(onChangeText).toHaveBeenCalledWith('au');
    expect(screen.getByText('Austin')).toBeTruthy();
  });

  it('calls onSelect when a suggestion is pressed', () => {
    const onSelect = jest.fn();
    render(
      <ThemeProvider>
        <Autocomplete
          label="City"
          value="au"
          suggestions={['Austin', 'Dallas']}
          onSelect={onSelect}
        />
      </ThemeProvider>,
    );
    fireEvent(screen.getByLabelText('City'), 'focus');
    fireEvent.press(screen.getByText('Austin'));
    expect(onSelect).toHaveBeenCalledWith('Austin');
  });
});
