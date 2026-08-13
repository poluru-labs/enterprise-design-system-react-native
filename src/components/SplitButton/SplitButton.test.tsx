import { render, fireEvent, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { SplitButton } from './SplitButton';

describe('SplitButton', () => {
  it('calls onPress for primary action', () => {
    const onPress = jest.fn();
    render(withTheme(<SplitButton label="Save" onPress={onPress} />));
    fireEvent.press(screen.getByRole('button', { name: 'Save' }));
    expect(onPress).toHaveBeenCalled();
  });

  it('opens menu and calls onMenuPress', () => {
    const onMenuPress = jest.fn();
    const itemPress = jest.fn();
    render(
      withTheme(
        <SplitButton
          label="Save"
          onMenuPress={onMenuPress}
          menuItems={[{ label: 'Save as draft', onPress: itemPress }]}
        />,
      ),
    );
    fireEvent.press(screen.getByLabelText('More options'));
    expect(onMenuPress).toHaveBeenCalled();
    expect(screen.getByText('Save as draft')).toBeTruthy();
    fireEvent.press(screen.getByText('Save as draft'));
    expect(itemPress).toHaveBeenCalled();
  });
});
