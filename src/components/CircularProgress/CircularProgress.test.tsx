import { render, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { CircularProgress } from './CircularProgress';

describe('CircularProgress', () => {
  it('renders with accessibility label', () => {
    render(withTheme(<CircularProgress value={30} />));
    expect(screen.getByLabelText('Circular progress')).toBeTruthy();
  });

  it('shows percentage when requested', () => {
    render(withTheme(<CircularProgress value={72} showValue />));
    expect(screen.getByText('72%')).toBeTruthy();
  });
});
