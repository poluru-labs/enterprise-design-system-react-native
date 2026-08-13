import { render, fireEvent, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { Tag } from './Tag';

describe('Tag', () => {
  it('renders label', () => {
    render(withTheme(<Tag label="Design" variant="brand" />));
    expect(screen.getByText('Design')).toBeTruthy();
  });

  it('calls onRemove when remove is pressed', () => {
    const onRemove = jest.fn();
    render(withTheme(<Tag label="Removable" onRemove={onRemove} />));
    fireEvent.press(screen.getByLabelText('Remove tag'));
    expect(onRemove).toHaveBeenCalled();
  });

  it('renders children when label is empty', () => {
    render(withTheme(<Tag>Custom</Tag>));
    expect(screen.getByText('Custom')).toBeTruthy();
  });
});
