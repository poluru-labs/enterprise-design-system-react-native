import { Text } from 'react-native';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { Drawer } from './Drawer';

describe('Drawer', () => {
  it('renders heading and children when open', () => {
    render(
      withTheme(
        <Drawer open side="left" size="sm" heading="Settings" onOpenChange={() => undefined}>
          <Text>Drawer body</Text>
        </Drawer>,
      ),
    );
    expect(screen.getByText('Settings')).toBeTruthy();
    expect(screen.getByText('Drawer body')).toBeTruthy();
  });

  it('calls onOpenChange when close is pressed', () => {
    const onOpenChange = jest.fn();
    render(
      withTheme(
        <Drawer open heading="Panel" onOpenChange={onOpenChange}>
          <Text>Content</Text>
        </Drawer>,
      ),
    );
    fireEvent.press(screen.getByLabelText('Close panel'));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('closes on backdrop press', () => {
    const onOpenChange = jest.fn();
    render(
      withTheme(
        <Drawer open onOpenChange={onOpenChange}>
          <Text>Content</Text>
        </Drawer>,
      ),
    );
    fireEvent.press(screen.getByLabelText('Close drawer backdrop'));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
