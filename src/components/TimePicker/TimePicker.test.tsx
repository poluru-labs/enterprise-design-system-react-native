import { render, fireEvent, screen } from '@testing-library/react-native';
import { ThemeProvider } from '../../theme';
import { TimePicker } from './TimePicker';

describe('TimePicker', () => {
  it('renders label and time parts', () => {
    render(
      <ThemeProvider>
        <TimePicker label="Start time" value="09:30" />
      </ThemeProvider>,
    );
    expect(screen.getByText('Start time')).toBeTruthy();
    expect(screen.getByDisplayValue('09')).toBeTruthy();
    expect(screen.getByDisplayValue('30')).toBeTruthy();
  });

  it('increments hours', () => {
    const onChange = jest.fn();
    render(
      <ThemeProvider>
        <TimePicker label="Start" value="09:00" onChange={onChange} />
      </ThemeProvider>,
    );
    fireEvent.press(screen.getByLabelText('Increase hours'));
    expect(onChange).toHaveBeenCalledWith('10:00');
  });

  it('increments minutes', () => {
    const onChange = jest.fn();
    render(
      <ThemeProvider>
        <TimePicker label="Start" value="09:59" onChange={onChange} />
      </ThemeProvider>,
    );
    fireEvent.press(screen.getByLabelText('Increase minutes'));
    expect(onChange).toHaveBeenCalledWith('09:00');
  });
});
