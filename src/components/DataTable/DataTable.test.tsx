import { fireEvent, render, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { DataTable } from './DataTable';

const columns = [
  { key: 'name', header: 'Name' },
  { key: 'role', header: 'Role' },
];
const rows = [{ name: 'Ada', role: 'Engineer' }];

describe('DataTable', () => {
  it('renders headers and cells', () => {
    render(withTheme(<DataTable columns={columns} rows={rows} />));
    expect(screen.getByText('Name')).toBeTruthy();
    expect(screen.getByText('Ada')).toBeTruthy();
  });

  it('invokes onRowPress', () => {
    const onRowPress = jest.fn();
    render(withTheme(<DataTable columns={columns} rows={rows} onRowPress={onRowPress} />));
    fireEvent.press(screen.getByText('Ada'));
    expect(onRowPress).toHaveBeenCalledWith(rows[0], 0);
  });
});
