import { render, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { ProgressBar } from './ProgressBar';

describe('ProgressBar', () => {
  it('renders a label', () => {
    render(withTheme(<ProgressBar value={40} label="Upload" />));
    expect(screen.getByText('Upload')).toBeTruthy();
  });

  it('exposes progress accessibility value', () => {
    render(withTheme(<ProgressBar value={55} label="Done" />));
    expect(screen.getByLabelText('Done')).toBeTruthy();
  });
});
