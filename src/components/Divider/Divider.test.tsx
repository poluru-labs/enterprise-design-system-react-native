import { render, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { Divider } from './Divider';

describe('Divider', () => {
  it('renders a labeled divider', () => {
    render(withTheme(<Divider label="or" />));
    expect(screen.getByText('or')).toBeTruthy();
  });

  it('renders vertical orientation', () => {
    const { toJSON } = render(withTheme(<Divider orientation="vertical" />));
    expect(toJSON()).toBeTruthy();
  });
});
