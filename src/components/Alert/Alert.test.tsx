import { render, fireEvent, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { Alert } from './Alert';

describe('Alert', () => {
  it('renders title and message', () => {
    render(withTheme(<Alert title="Heads up" message="Something needs attention." variant="warning" />));
    expect(screen.getByText('Heads up')).toBeTruthy();
    expect(screen.getByText('Something needs attention.')).toBeTruthy();
  });

  it('renders children when message is not set', () => {
    render(withTheme(<Alert variant="info">Custom alert body</Alert>));
    expect(screen.getByText('Custom alert body')).toBeTruthy();
  });

  it('dismisses when dismissible and close is pressed', () => {
    const onDismiss = jest.fn();
    render(withTheme(<Alert title="Dismiss me" dismissible onDismiss={onDismiss} />));
    fireEvent.press(screen.getByLabelText('Dismiss alert'));
    expect(screen.queryByText('Dismiss me')).toBeNull();
    expect(onDismiss).toHaveBeenCalled();
  });
});
