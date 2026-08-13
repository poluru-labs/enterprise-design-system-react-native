import { type ReactNode } from 'react';
import { Text, View } from 'react-native';
import { visuallyHiddenStyle } from '../../utils/a11y';

export type VisuallyHiddenProps = {
  children: ReactNode;
};

export function VisuallyHidden({ children }: VisuallyHiddenProps) {
  return (
    <View
      accessibilityElementsHidden={false}
      importantForAccessibility="yes"
      style={visuallyHiddenStyle()}
    >
      {typeof children === 'string' ? <Text>{children}</Text> : children}
    </View>
  );
}

export type EdsVisuallyHidden = typeof VisuallyHidden;
export const EdsVisuallyHidden = VisuallyHidden;
