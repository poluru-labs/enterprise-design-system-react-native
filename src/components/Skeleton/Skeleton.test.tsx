import { render } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { Skeleton } from './Skeleton';

describe('Skeleton', () => {
  it('renders a rectangular placeholder', () => {
    const { toJSON } = render(withTheme(<Skeleton width={120} height={20} />));
    expect(toJSON()).toBeTruthy();
  });

  it('renders a circle placeholder', () => {
    const { toJSON } = render(withTheme(<Skeleton circle width={40} />));
    expect(toJSON()).toBeTruthy();
  });
});
