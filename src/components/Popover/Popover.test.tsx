import { Text, Pressable } from 'react-native';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { Popover } from './Popover';

describe('Popover', () => {
  it('shows children when open', () => {
    render(
      withTheme(
        <Popover open trigger={<Pressable><Text>Open</Text></Pressable>} onOpenChange={() => undefined}>
          <Text>Popover body</Text>
        </Popover>,
      ),
    );
    expect(screen.getByText('Popover body')).toBeTruthy();
  });

  it('toggles via trigger press', () => {
    const onOpenChange = jest.fn();
    render(
      withTheme(
        <Popover
          open={false}
          placement="top"
          heading="Details"
          trigger={<Pressable accessibilityLabel="Toggle"><Text>Open</Text></Pressable>}
          onOpenChange={onOpenChange}
        >
          <Text>Body</Text>
        </Popover>,
      ),
    );
    fireEvent.press(screen.getByLabelText('Toggle'));
    expect(onOpenChange).toHaveBeenCalledWith(true);
  });
});
