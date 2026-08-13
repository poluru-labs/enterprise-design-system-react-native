import { fireEvent, render, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { DateRangePicker } from './DateRangePicker';

describe('DateRangePicker', () => {
  it('renders label and current range', () => {
    render(
      withTheme(
        <DateRangePicker
          start="2026-07-01"
          end="2026-07-10"
          onChange={() => undefined}
          label="Trip"
        />,
      ),
    );
    expect(screen.getByText('Trip')).toBeTruthy();
    expect(screen.getByText('2026-07-01 → 2026-07-10')).toBeTruthy();
  });

  it('starts a new range on first press', () => {
    const onChange = jest.fn();
    render(
      withTheme(
        <DateRangePicker start="2026-07-01" end="2026-07-10" onChange={onChange} />,
      ),
    );
    fireEvent.press(screen.getByLabelText('2026-07-05'));
    expect(onChange).toHaveBeenCalledWith({ start: '2026-07-05', end: '' });
  });
});
