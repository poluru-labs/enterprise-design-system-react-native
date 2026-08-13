import { render, fireEvent, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { CodeSnippet } from './CodeSnippet';

describe('CodeSnippet', () => {
  it('renders code and language', () => {
    render(withTheme(<CodeSnippet code="const x = 1;" language="ts" />));
    expect(screen.getByText('const x = 1;')).toBeTruthy();
    expect(screen.getByText('ts')).toBeTruthy();
  });

  it('copies when copyable', () => {
    const onCopy = jest.fn();
    render(withTheme(<CodeSnippet code="hello" copyable onCopy={onCopy} />));
    fireEvent.press(screen.getByLabelText('Copy code'));
    expect(onCopy).toHaveBeenCalledWith('hello');
    expect(screen.getByLabelText('Copied')).toBeTruthy();
  });

  it('hides copy button when copyable is false', () => {
    render(withTheme(<CodeSnippet code="secret" copyable={false} />));
    expect(screen.queryByLabelText('Copy code')).toBeNull();
  });
});
