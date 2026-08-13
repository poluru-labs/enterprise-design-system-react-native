import { Pressable, Text } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { ButtonGroup } from './ButtonGroup';

describe('ButtonGroup', () => {
  it('renders children', () => {
    render(
      withTheme(
        <ButtonGroup>
          <Pressable>
            <Text>One</Text>
          </Pressable>
          <Pressable>
            <Text>Two</Text>
          </Pressable>
        </ButtonGroup>,
      ),
    );
    expect(screen.getByText('One')).toBeTruthy();
    expect(screen.getByText('Two')).toBeTruthy();
  });

  it('keeps child presses working when attached', () => {
    const onPress = jest.fn();
    render(
      withTheme(
        <ButtonGroup attached>
          <Pressable onPress={onPress}>
            <Text>Save</Text>
          </Pressable>
        </ButtonGroup>,
      ),
    );
    fireEvent.press(screen.getByText('Save'));
    expect(onPress).toHaveBeenCalled();
  });
});
