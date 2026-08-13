import { fireEvent, render, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { SegmentedControl } from './SegmentedControl';

const options = [
  { value: 'day', label: 'Day' },
  { value: 'week', label: 'Week' },
];

describe('SegmentedControl', () => {
  it('renders options', () => {
    render(
      withTheme(
        <SegmentedControl options={options} value="day" onValueChange={() => undefined} />,
      ),
    );
    expect(screen.getByText('Day')).toBeTruthy();
    expect(screen.getByText('Week')).toBeTruthy();
  });

  it('notifies onValueChange', () => {
    const onValueChange = jest.fn();
    render(
      withTheme(
        <SegmentedControl options={options} value="day" onValueChange={onValueChange} />,
      ),
    );
    fireEvent.press(screen.getByText('Week'));
    expect(onValueChange).toHaveBeenCalledWith('week');
  });
});
