import { render, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { Spinner } from './Spinner';

describe('Spinner', () => {
  it('exposes loading accessibility label', () => {
    render(withTheme(<Spinner />));
    expect(screen.getByLabelText('Loading')).toBeTruthy();
  });

  it('shows visible label when requested', () => {
    render(withTheme(<Spinner showLabel label="Please wait" />));
    expect(screen.getByText('Please wait')).toBeTruthy();
  });
});
