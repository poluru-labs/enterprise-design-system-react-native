import { fireEvent, render, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { Accordion } from './Accordion';

const items = [
  { id: '1', title: 'One', content: 'First body' },
  { id: '2', title: 'Two', content: 'Second body' },
];

describe('Accordion', () => {
  it('renders item titles', () => {
    render(withTheme(<Accordion items={items} value="" />));
    expect(screen.getByText('One')).toBeTruthy();
    expect(screen.getByText('Two')).toBeTruthy();
  });

  it('opens a single item and notifies onValueChange', () => {
    const onValueChange = jest.fn();
    render(
      withTheme(
        <Accordion items={items} type="single" value="" onValueChange={onValueChange} />,
      ),
    );
    fireEvent.press(screen.getByText('One'));
    expect(onValueChange).toHaveBeenCalledWith('1');
  });

  it('shows content when open', () => {
    render(withTheme(<Accordion items={items} type="single" value="1" />));
    expect(screen.getByText('First body')).toBeTruthy();
  });
});
