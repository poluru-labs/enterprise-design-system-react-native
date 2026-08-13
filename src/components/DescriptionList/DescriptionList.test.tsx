import { render, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { DescriptionList } from './DescriptionList';

describe('DescriptionList', () => {
  it('renders terms and descriptions', () => {
    render(
      withTheme(
        <DescriptionList
          items={[
            { term: 'Name', description: 'Ada' },
            { term: 'Role', description: 'Engineer' },
          ]}
        />,
      ),
    );
    expect(screen.getByText('Name')).toBeTruthy();
    expect(screen.getByText('Engineer')).toBeTruthy();
  });

  it('renders multiple rows', () => {
    render(
      withTheme(
        <DescriptionList items={[{ term: 'Plan', description: 'Pro' }, { term: 'Seats', description: '10' }]} />,
      ),
    );
    expect(screen.getByText('Plan')).toBeTruthy();
    expect(screen.getByText('10')).toBeTruthy();
  });
});
