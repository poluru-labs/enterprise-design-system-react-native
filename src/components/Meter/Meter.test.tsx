import { render, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { Meter } from './Meter';

describe('Meter', () => {
  it('renders label and value', () => {
    render(withTheme(<Meter value={40} min={0} max={100} label="Storage" />));
    expect(screen.getByText('Storage')).toBeTruthy();
    expect(screen.getByText('40 / 100')).toBeTruthy();
  });

  it('exposes accessibility values', () => {
    render(withTheme(<Meter value={25} min={0} max={50} label="Quota" />));
    expect(screen.getByLabelText('Quota')).toBeTruthy();
  });
});
