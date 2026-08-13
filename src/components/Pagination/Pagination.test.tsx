import { fireEvent, render, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('renders current page', () => {
    render(withTheme(<Pagination page={2} pageCount={5} onPageChange={() => undefined} />));
    expect(screen.getByLabelText('Page 2')).toBeTruthy();
  });

  it('navigates to next page', () => {
    const onPageChange = jest.fn();
    render(withTheme(<Pagination page={2} pageCount={5} onPageChange={onPageChange} />));
    fireEvent.press(screen.getByLabelText('Next page'));
    expect(onPageChange).toHaveBeenCalledWith(3);
  });
});
