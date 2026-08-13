import { fireEvent, render, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { List } from './List';

describe('List', () => {
  it('renders labels and descriptions', () => {
    render(
      withTheme(
        <List
          items={[
            { id: '1', label: 'Inbox', description: '3 unread', icon: 'mail' },
          ]}
        />,
      ),
    );
    expect(screen.getByText('Inbox')).toBeTruthy();
    expect(screen.getByText('3 unread')).toBeTruthy();
  });

  it('handles item press', () => {
    const onPress = jest.fn();
    render(withTheme(<List items={[{ id: '1', label: 'Settings', onPress }]} />));
    fireEvent.press(screen.getByText('Settings'));
    expect(onPress).toHaveBeenCalled();
  });
});
