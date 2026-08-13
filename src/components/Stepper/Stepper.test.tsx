import { render, screen } from '@testing-library/react-native';
import { withTheme } from '../../test/render';
import { Stepper } from './Stepper';

const steps = [
  { id: 'a', label: 'Account', description: 'Create profile' },
  { id: 'b', label: 'Billing' },
];

describe('Stepper', () => {
  it('renders step labels', () => {
    render(withTheme(<Stepper steps={steps} activeIndex={0} />));
    expect(screen.getByText('Account')).toBeTruthy();
    expect(screen.getByText('Billing')).toBeTruthy();
  });

  it('renders step descriptions', () => {
    render(withTheme(<Stepper steps={steps} activeIndex={1} />));
    expect(screen.getByText('Create profile')).toBeTruthy();
  });
});
