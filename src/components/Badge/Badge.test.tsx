import { render, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { Badge } from './Badge';

describe('Badge', () => {
  it('renders label', () => {
    render(withTheme(<Badge label="New" variant="brand" />));
    expect(screen.getByText('New')).toBeTruthy();
  });

  it('renders children when label is empty', () => {
    render(withTheme(<Badge variant="success">Active</Badge>));
    expect(screen.getByText('Active')).toBeTruthy();
  });

  it('supports solid and pill appearance', () => {
    render(withTheme(<Badge label="Pro" soft={false} pill size="sm" />));
    expect(screen.getByText('Pro')).toBeTruthy();
  });
});
