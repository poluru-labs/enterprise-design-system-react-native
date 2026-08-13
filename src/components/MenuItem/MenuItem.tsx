import type { ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { EdsIconName } from '../../icons/names';
import { useOptionalTheme } from '../../theme';
import { Icon } from '../Icon';

export type MenuItemProps = {
  label?: string;
  onPress?: () => void;
  disabled?: boolean;
  icon?: EdsIconName;
  destructive?: boolean;
  children?: ReactNode;
};

export function MenuItem({
  label = '',
  onPress,
  disabled = false,
  icon,
  destructive = false,
  children,
}: MenuItemProps) {
  const { colors, spacing, typography } = useOptionalTheme();
  const content = label || children;
  const color = destructive ? colors.danger : colors.text;

  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      accessibilityRole="menuitem"
      accessibilityState={{ disabled }}
      accessibilityLabel={typeof content === 'string' ? content : label || 'Menu item'}
      style={({ pressed }) => [
        styles.item,
        {
          paddingVertical: spacing[3],
          paddingHorizontal: spacing[3],
          gap: spacing[2],
          opacity: disabled ? 0.45 : 1,
          backgroundColor: pressed ? colors.bg : 'transparent',
        },
      ]}
    >
      {icon ? <Icon name={icon} size="sm" color={color} decorative /> : null}
      {typeof content === 'string' || typeof content === 'number' ? (
        <Text
          style={{
            color,
            fontSize: typography.fontSize.sm,
            flex: 1,
          }}
        >
          {content}
        </Text>
      ) : (
        content
      )}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
  },
});

export const EdsMenuItem = MenuItem;
