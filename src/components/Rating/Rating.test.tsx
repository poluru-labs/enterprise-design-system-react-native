import { fireEvent, render, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { Rating } from './Rating';

describe('Rating', () => {
  it('renders max stars', () => {
    render(withTheme(<Rating value={3} max={5} />));
    expect(screen.getByLabelText('Rate 5 of 5')).toBeTruthy();
  });

  it('calls onValueChange', () => {
    const onValueChange = jest.fn();
    render(withTheme(<Rating value={2} onValueChange={onValueChange} />));
    fireEvent.press(screen.getByLabelText('Rate 4 of 5'));
    expect(onValueChange).toHaveBeenCalledWith(4);
  });
});
