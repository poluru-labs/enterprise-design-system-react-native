import { render, fireEvent, screen } from '@testing-library/react-native';
import { ThemeProvider } from '../../theme';
import { Radio } from './Radio';
import { RadioGroup } from './RadioGroup';

describe('Radio / RadioGroup', () => {
  it('renders radio label', () => {
    render(
      <ThemeProvider>
        <Radio value="a" label="Option A" />
      </ThemeProvider>,
    );
    expect(screen.getByText('Option A')).toBeTruthy();
  });

  it('calls onValueChange when selected', () => {
    const onValueChange = jest.fn();
    render(
      <ThemeProvider>
        <RadioGroup
          label="Size"
          value="sm"
          onValueChange={onValueChange}
          options={[
            { value: 'sm', label: 'Small' },
            { value: 'lg', label: 'Large' },
          ]}
        />
      </ThemeProvider>,
    );
    fireEvent.press(screen.getByText('Large'));
    expect(onValueChange).toHaveBeenCalledWith('lg');
  });

  it('marks the selected option as checked', () => {
    render(
      <ThemeProvider>
        <Radio value="a" label="Option A" checked />
      </ThemeProvider>,
    );
    expect(screen.getByRole('radio').props.accessibilityState?.checked).toBe(true);
  });
});
