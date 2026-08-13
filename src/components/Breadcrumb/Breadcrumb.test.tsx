import { fireEvent, render, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { Breadcrumb } from './Breadcrumb';

describe('Breadcrumb', () => {
  it('renders all labels', () => {
    render(
      withTheme(
        <Breadcrumb
          items={[{ label: 'Home', onPress: () => undefined }, { label: 'Docs' }]}
        />,
      ),
    );
    expect(screen.getByText('Home')).toBeTruthy();
    expect(screen.getByText('Docs')).toBeTruthy();
  });

  it('invokes onPress for navigable crumbs', () => {
    const onPress = jest.fn();
    render(withTheme(<Breadcrumb items={[{ label: 'Home', onPress }, { label: 'Docs' }]} />));
    fireEvent.press(screen.getByText('Home'));
    expect(onPress).toHaveBeenCalled();
  });
});
