import { render, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { Status } from './Status';

describe('Status', () => {
  it('renders the label', () => {
    render(withTheme(<Status variant="success" label="Online" />));
    expect(screen.getByText('Online')).toBeTruthy();
  });

  it('exposes accessibility label', () => {
    render(withTheme(<Status variant="danger" label="Offline" />));
    expect(screen.getByLabelText('Offline')).toBeTruthy();
  });
});
