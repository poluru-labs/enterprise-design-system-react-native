import { fireEvent, render, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { SideNav } from './SideNav';

describe('SideNav', () => {
  it('renders item labels', () => {
    render(
      withTheme(
        <SideNav items={[{ id: 'home', label: 'Home', icon: 'home', active: true }]} />,
      ),
    );
    expect(screen.getByText('Home')).toBeTruthy();
  });

  it('invokes onPress', () => {
    const onPress = jest.fn();
    render(withTheme(<SideNav items={[{ id: 'docs', label: 'Docs', onPress }]} />));
    fireEvent.press(screen.getByText('Docs'));
    expect(onPress).toHaveBeenCalled();
  });
});
