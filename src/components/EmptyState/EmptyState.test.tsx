import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { EmptyState } from './EmptyState';

describe('EmptyState', () => {
  it('renders title and description', () => {
    render(
      withTheme(
        <EmptyState title="No results" description="Try a different search." icon="search" />,
      ),
    );
    expect(screen.getByText('No results')).toBeTruthy();
    expect(screen.getByText('Try a different search.')).toBeTruthy();
  });

  it('renders action slot', () => {
    render(
      withTheme(
        <EmptyState title="Empty" action={<Text>Create item</Text>} />,
      ),
    );
    expect(screen.getByText('Create item')).toBeTruthy();
  });
});
