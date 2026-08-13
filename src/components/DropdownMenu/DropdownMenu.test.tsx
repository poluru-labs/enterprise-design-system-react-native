import { Text, Pressable } from 'react-native';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { MenuItem } from '../MenuItem';
import { DropdownMenu } from './DropdownMenu';

describe('DropdownMenu', () => {
  it('renders menu items when open', () => {
    render(
      withTheme(
        <DropdownMenu
          open
          trigger={<Pressable accessibilityLabel="Menu"><Text>Menu</Text></Pressable>}
          onOpenChange={() => undefined}
        >
          <MenuItem label="Profile" />
          <MenuItem label="Logout" />
        </DropdownMenu>,
      ),
    );
    expect(screen.getByText('Profile')).toBeTruthy();
    expect(screen.getByText('Logout')).toBeTruthy();
  });

  it('toggles open via trigger and closes on item press', () => {
    const onOpenChange = jest.fn();
    const onItem = jest.fn();
    render(
      withTheme(
        <DropdownMenu
          open
          trigger={<Pressable accessibilityLabel="Menu"><Text>Menu</Text></Pressable>}
          onOpenChange={onOpenChange}
        >
          <MenuItem label="Settings" onPress={onItem} />
        </DropdownMenu>,
      ),
    );
    fireEvent.press(screen.getByLabelText('Settings'));
    expect(onItem).toHaveBeenCalled();
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
