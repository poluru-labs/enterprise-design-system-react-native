import { render, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { Stat } from './Stat';

describe('Stat', () => {
  it('renders label and value', () => {
    render(withTheme(<Stat label="Users" value={1280} />));
    expect(screen.getByText('Users')).toBeTruthy();
    expect(screen.getByText('1280')).toBeTruthy();
  });

  it('renders optional hint', () => {
    render(withTheme(<Stat label="MRR" value="$12k" hint="+4% MoM" />));
    expect(screen.getByText('+4% MoM')).toBeTruthy();
  });
});
