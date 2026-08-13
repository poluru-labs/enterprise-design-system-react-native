import { type ReactNode } from 'react';
import { Linking, Pressable, StyleSheet, Text } from 'react-native';
import { useOptionalTheme } from '../../theme';

export type LinkProps = {
  children: ReactNode;
  onPress?: () => void;
  href?: string;
  disabled?: boolean;
  style?: object;
};

export function Link({ children, onPress, href, disabled = false, style }: LinkProps) {
  const { colors, typography } = useOptionalTheme();

  const handlePress = async () => {
    if (disabled) return;
    onPress?.();
    if (href) {
      try {
        const can = await Linking.canOpenURL(href);
        if (can) await Linking.openURL(href);
      } catch {
        // ignore linking failures in constrained environments
      }
    }
  };

  return (
    <Pressable
      accessibilityRole="link"
      accessibilityState={{ disabled }}
      disabled={disabled}
      onPress={handlePress}
      style={style}
    >
      {typeof children === 'string' ? (
        <Text
          style={[
            styles.text,
            {
              color: disabled ? colors.textSubtle : colors.primary,
              fontSize: typography.fontSize.md,
              textDecorationLine: 'underline',
            },
          ]}
        >
          {children}
        </Text>
      ) : (
        children
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  text: {},
});

export type EdsLink = typeof Link;
export const EdsLink = Link;
