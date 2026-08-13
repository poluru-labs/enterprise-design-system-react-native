import { render, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { Kbd } from './Kbd';

describe('Kbd', () => {
  it('renders shortcut text', () => {
    render(withTheme(<Kbd>⌘K</Kbd>));
    expect(screen.getByText('⌘K')).toBeTruthy();
  });

  it('exposes keyboard accessibility label', () => {
    render(withTheme(<Kbd>Esc</Kbd>));
    expect(screen.getByLabelText('Keyboard Esc')).toBeTruthy();
  });
});
