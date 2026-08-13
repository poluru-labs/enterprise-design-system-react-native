import { render, fireEvent, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { MenuItem } from './MenuItem';

describe('MenuItem', () => {
  it('renders label and calls onPress', () => {
    const onPress = jest.fn();
    render(withTheme(<MenuItem label="Edit" icon="edit" onPress={onPress} />));
    fireEvent.press(screen.getByLabelText('Edit'));
    expect(onPress).toHaveBeenCalled();
  });

  it('does not call onPress when disabled', () => {
    const onPress = jest.fn();
    render(withTheme(<MenuItem label="Delete" destructive disabled onPress={onPress} />));
    fireEvent.press(screen.getByLabelText('Delete'));
    expect(onPress).not.toHaveBeenCalled();
  });
});
