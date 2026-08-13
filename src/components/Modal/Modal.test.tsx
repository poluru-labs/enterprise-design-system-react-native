import { Text } from 'react-native';
import { render, fireEvent, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { Modal } from './Modal';

describe('Modal', () => {
  it('renders heading and children when open', () => {
    render(
      withTheme(
        <Modal open heading="Confirm" onOpenChange={() => undefined}>
          <Text>Are you sure?</Text>
        </Modal>,
      ),
    );
    expect(screen.getByText('Confirm')).toBeTruthy();
    expect(screen.getByText('Are you sure?')).toBeTruthy();
  });

  it('calls onOpenChange when close is pressed', () => {
    const onOpenChange = jest.fn();
    render(
      withTheme(
        <Modal open heading="Dialog" onOpenChange={onOpenChange} footer={<Text>Footer</Text>}>
          <Text>Body</Text>
        </Modal>,
      ),
    );
    expect(screen.getByText('Footer')).toBeTruthy();
    fireEvent.press(screen.getByLabelText('Close dialog'));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });

  it('closes on backdrop when enabled', () => {
    const onOpenChange = jest.fn();
    render(
      withTheme(
        <Modal open closeOnBackdrop onOpenChange={onOpenChange}>
          <Text>Body</Text>
        </Modal>,
      ),
    );
    fireEvent.press(screen.getByLabelText('Close dialog backdrop'));
    expect(onOpenChange).toHaveBeenCalledWith(false);
  });
});
