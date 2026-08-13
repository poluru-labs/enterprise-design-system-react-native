import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { Toolbar } from './Toolbar';

describe('Toolbar', () => {
  it('renders children', () => {
    render(
      withTheme(
        <Toolbar>
          <Text>Edit</Text>
          <Text>Share</Text>
        </Toolbar>,
      ),
    );
    expect(screen.getByText('Edit')).toBeTruthy();
    expect(screen.getByText('Share')).toBeTruthy();
  });

  it('marks the container as a toolbar', () => {
    const { UNSAFE_getByProps } = render(
      withTheme(
        <Toolbar>
          <Text>Action</Text>
        </Toolbar>,
      ),
    );
    expect(UNSAFE_getByProps({ accessibilityRole: 'toolbar' })).toBeTruthy();
  });
});
