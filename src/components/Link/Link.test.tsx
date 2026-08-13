import { fireEvent, render, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { Link } from './Link';

describe('Link', () => {
  it('renders children', () => {
    render(withTheme(<Link onPress={() => undefined}>Docs</Link>));
    expect(screen.getByText('Docs')).toBeTruthy();
  });

  it('calls onPress', () => {
    const onPress = jest.fn();
    render(withTheme(<Link onPress={onPress}>Open</Link>));
    fireEvent.press(screen.getByText('Open'));
    expect(onPress).toHaveBeenCalled();
  });
});
