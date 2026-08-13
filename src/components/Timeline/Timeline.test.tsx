import { render, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { Timeline } from './Timeline';

describe('Timeline', () => {
  it('renders titles', () => {
    render(
      withTheme(
        <Timeline
          items={[
            { id: '1', title: 'Created', timestamp: 'Mon' },
            { id: '2', title: 'Shipped' },
          ]}
        />,
      ),
    );
    expect(screen.getByText('Created')).toBeTruthy();
    expect(screen.getByText('Shipped')).toBeTruthy();
  });

  it('renders timestamps and descriptions', () => {
    render(
      withTheme(
        <Timeline
          items={[{ id: '1', title: 'Paid', description: 'Invoice settled', timestamp: 'Yesterday' }]}
        />,
      ),
    );
    expect(screen.getByText('Invoice settled')).toBeTruthy();
    expect(screen.getByText('Yesterday')).toBeTruthy();
  });
});
