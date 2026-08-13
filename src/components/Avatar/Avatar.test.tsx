import { render, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { Avatar } from './Avatar';

describe('Avatar', () => {
  it('renders initials from name', () => {
    render(withTheme(<Avatar name="Ada Lovelace" />));
    expect(screen.getByText('AL')).toBeTruthy();
    expect(screen.getByLabelText('Ada Lovelace')).toBeTruthy();
  });

  it('uses explicit initials when provided', () => {
    render(withTheme(<Avatar initials="JP" alt="Jane" />));
    expect(screen.getByText('JP')).toBeTruthy();
    expect(screen.getByLabelText('Jane')).toBeTruthy();
  });

  it('renders image when src is provided', () => {
    const { getByLabelText } = render(
      withTheme(<Avatar name="Sam" src="https://example.com/avatar.png" alt="Sam avatar" />),
    );
    expect(getByLabelText('Sam avatar')).toBeTruthy();
  });
});
