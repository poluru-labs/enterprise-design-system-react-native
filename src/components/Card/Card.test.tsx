import { Text } from 'react-native';
import { render, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { Card } from './Card';

describe('Card', () => {
  it('renders children', () => {
    render(
      withTheme(
        <Card>
          <Text>Card body</Text>
        </Card>,
      ),
    );
    expect(screen.getByText('Card body')).toBeTruthy();
  });

  it('renders header and footer', () => {
    render(
      withTheme(
        <Card header={<Text>Header</Text>} footer={<Text>Footer</Text>} elevated>
          <Text>Body</Text>
        </Card>,
      ),
    );
    expect(screen.getByText('Header')).toBeTruthy();
    expect(screen.getByText('Body')).toBeTruthy();
    expect(screen.getByText('Footer')).toBeTruthy();
  });
});
