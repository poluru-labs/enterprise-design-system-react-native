import { Text } from 'react-native';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { Tooltip } from './Tooltip';

describe('Tooltip', () => {
  it('shows content on press', () => {
    render(
      withTheme(
        <Tooltip content="More info">
          <Text>Hover me</Text>
        </Tooltip>,
      ),
    );
    fireEvent.press(screen.getByLabelText('Show tooltip'));
    expect(screen.getByText('More info')).toBeTruthy();
  });

  it('shows content on long press', () => {
    render(
      withTheme(
        <Tooltip content="Long press tip" placement="bottom">
          <Text>Target</Text>
        </Tooltip>,
      ),
    );
    fireEvent(screen.getByLabelText('Show tooltip'), 'longPress');
    expect(screen.getByText('Long press tip')).toBeTruthy();
  });
});
