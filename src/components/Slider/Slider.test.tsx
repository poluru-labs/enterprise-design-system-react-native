import { render, fireEvent, screen } from '@testing-library/react-native';
import { ThemeProvider } from '../../theme';
import { Slider } from './Slider';

describe('Slider', () => {
  it('renders label and value', () => {
    render(
      <ThemeProvider>
        <Slider label="Volume" value={40} showValue />
      </ThemeProvider>,
    );
    expect(screen.getByText('Volume')).toBeTruthy();
    expect(screen.getByText('40')).toBeTruthy();
  });

  it('calls onValueChange when pressed on track', () => {
    const onValueChange = jest.fn();
    render(
      <ThemeProvider>
        <Slider label="Volume" value={0} min={0} max={100} step={1} onValueChange={onValueChange} />
      </ThemeProvider>,
    );
    const slider = screen.getByRole('adjustable');
    fireEvent(slider, 'layout', { nativeEvent: { layout: { width: 100, height: 28, x: 0, y: 0 } } });
    fireEvent.press(slider, { nativeEvent: { locationX: 50 } });
    expect(onValueChange).toHaveBeenCalled();
    expect(onValueChange.mock.calls[0][0]).toBeGreaterThanOrEqual(0);
  });

  it('exposes accessibility value', () => {
    render(
      <ThemeProvider>
        <Slider label="Volume" value={25} min={0} max={100} />
      </ThemeProvider>,
    );
    expect(screen.getByRole('adjustable').props.accessibilityValue).toEqual({
      min: 0,
      max: 100,
      now: 25,
    });
  });
});
