import { render, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { VisuallyHidden } from './VisuallyHidden';

describe('VisuallyHidden', () => {
  it('keeps children accessible to the tree', () => {
    render(withTheme(<VisuallyHidden>Screen reader only</VisuallyHidden>));
    expect(screen.getByText('Screen reader only')).toBeTruthy();
  });

  it('renders nested text content', () => {
    render(
      withTheme(
        <VisuallyHidden>
          <Text>Hidden label</Text>
        </VisuallyHidden>,
      ),
    );
    expect(screen.getByText('Hidden label')).toBeTruthy();
  });
});

import { Text } from 'react-native';
