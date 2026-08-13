import { Pressable, Text } from 'react-native';
import { act, render, fireEvent, screen, waitFor } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { Toast, ToastProvider, showToast, useToast } from './Toast';

function ToastTrigger() {
  const { show } = useToast();
  return (
    <Pressable accessibilityLabel="Show toast" onPress={() => show({ title: 'Saved', variant: 'success', duration: 0 })}>
      <Text>Show toast</Text>
    </Pressable>
  );
}

describe('Toast', () => {
  it('renders declarative toast with title and description', () => {
    render(
      withTheme(
        <Toast title="Update complete" description="Your changes were saved." variant="success" />,
      ),
    );
    expect(screen.getByText('Update complete')).toBeTruthy();
    expect(screen.getByText('Your changes were saved.')).toBeTruthy();
  });

  it('shows toast via useToast inside provider', async () => {
    render(
      withTheme(
        <ToastProvider>
          <ToastTrigger />
        </ToastProvider>,
      ),
    );
    fireEvent.press(screen.getByLabelText('Show toast'));
    await waitFor(() => {
      expect(screen.getByText('Saved')).toBeTruthy();
    });
  });

  it('shows toast via imperative showToast API', async () => {
    render(
      withTheme(
        <ToastProvider>
          <Text>App</Text>
        </ToastProvider>,
      ),
    );
    act(() => {
      showToast({ title: 'Hello', description: 'World', variant: 'info', duration: 0 });
    });
    await waitFor(() => {
      expect(screen.getByText('Hello')).toBeTruthy();
      expect(screen.getByText('World')).toBeTruthy();
    });
  });

  it('dismisses declarative toast when close is pressed', () => {
    const onClose = jest.fn();
    render(withTheme(<Toast title="Dismiss me" onClose={onClose} />));
    fireEvent.press(screen.getByLabelText('Dismiss notification'));
    expect(onClose).toHaveBeenCalled();
  });
});
