import { fireEvent, render, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { TreeView } from './TreeView';

const nodes = [
  {
    id: 'root',
    label: 'Root',
    children: [{ id: 'child', label: 'Child' }],
  },
];

describe('TreeView', () => {
  it('renders root nodes', () => {
    render(withTheme(<TreeView nodes={nodes} />));
    expect(screen.getByText('Root')).toBeTruthy();
  });

  it('notifies onToggle when expanding', () => {
    const onToggle = jest.fn();
    render(withTheme(<TreeView nodes={nodes} expandedIds={[]} onToggle={onToggle} />));
    fireEvent.press(screen.getByText('Root'));
    expect(onToggle).toHaveBeenCalledWith('root', true);
  });
});
