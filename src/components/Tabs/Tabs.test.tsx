import { Text } from 'react-native';
import { fireEvent, render, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { Tabs } from './Tabs';

const items = [
  { id: 'a', label: 'Alpha' },
  { id: 'b', label: 'Beta' },
  { id: 'c', label: 'Gamma', disabled: true },
];

describe('Tabs', () => {
  it('renders tab labels', () => {
    render(withTheme(<Tabs items={items} value="a" onValueChange={() => undefined} />));
    expect(screen.getByText('Alpha')).toBeTruthy();
    expect(screen.getByText('Beta')).toBeTruthy();
  });

  it('calls onValueChange when a tab is pressed', () => {
    const onValueChange = jest.fn();
    render(withTheme(<Tabs items={items} value="a" onValueChange={onValueChange} />));
    fireEvent.press(screen.getByText('Beta'));
    expect(onValueChange).toHaveBeenCalledWith('b');
  });

  it('renders panel via children render prop', () => {
    render(
      withTheme(
        <Tabs items={items} value="a" onValueChange={() => undefined}>
          {(id) => <Text>Panel {id}</Text>}
        </Tabs>,
      ),
    );
    expect(screen.getByText('Panel a')).toBeTruthy();
  });
});
