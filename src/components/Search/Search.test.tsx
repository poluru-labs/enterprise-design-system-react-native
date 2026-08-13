import { render, fireEvent, screen } from '@testing-library/react-native';
import { ThemeProvider } from '../../theme';
import { Search } from './Search';

describe('Search', () => {
  it('renders placeholder', () => {
    render(
      <ThemeProvider>
        <Search placeholder="Find…" />
      </ThemeProvider>,
    );
    expect(screen.getByPlaceholderText('Find…')).toBeTruthy();
  });

  it('calls onChangeText when typing', () => {
    const onChangeText = jest.fn();
    render(
      <ThemeProvider>
        <Search value="" onChangeText={onChangeText} placeholder="Search…" />
      </ThemeProvider>,
    );
    fireEvent.changeText(screen.getByPlaceholderText('Search…'), 'docs');
    expect(onChangeText).toHaveBeenCalledWith('docs');
  });

  it('clears value when clear is pressed', () => {
    const onClear = jest.fn();
    const onChangeText = jest.fn();
    render(
      <ThemeProvider>
        <Search value="hello" onClear={onClear} onChangeText={onChangeText} />
      </ThemeProvider>,
    );
    fireEvent.press(screen.getByLabelText('Clear search'));
    expect(onClear).toHaveBeenCalled();
    expect(onChangeText).toHaveBeenCalledWith('');
  });
});
