import { fireEvent, render, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { DatePicker } from './DatePicker';

describe('DatePicker', () => {
  it('renders label and month header', () => {
    render(
      withTheme(
        <DatePicker value="2026-07-15" onChange={() => undefined} label="Start date" />,
      ),
    );
    expect(screen.getByText('Start date')).toBeTruthy();
    expect(screen.getByText(/July 2026/)).toBeTruthy();
  });

  it('calls onChange when a day is pressed', () => {
    const onChange = jest.fn();
    render(withTheme(<DatePicker value="2026-07-15" onChange={onChange} />));
    fireEvent.press(screen.getByLabelText('2026-07-20'));
    expect(onChange).toHaveBeenCalledWith('2026-07-20');
  });
});
