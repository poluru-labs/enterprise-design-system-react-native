import { render } from '@testing-library/react-native';
import { ThemeProvider } from '../../theme';
import { Icon } from './Icon';

describe('Icon', () => {
  it('renders a known icon', () => {
    const { toJSON } = render(
      <ThemeProvider>
        <Icon name="plus" size="md" />
      </ThemeProvider>,
    );
    expect(toJSON()).toBeTruthy();
  });

  it('returns null for invalid name cast', () => {
    const { toJSON } = render(
      <ThemeProvider>
        {/* @ts-expect-error intentional */}
        <Icon name="not-an-icon" />
      </ThemeProvider>,
    );
    expect(toJSON()).toBeNull();
  });
});
