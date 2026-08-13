import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useOptionalTheme } from '../../theme';
import { Icon } from '../Icon';
import { MenuItem } from '../MenuItem';

export type SplitButtonVariant = 'primary' | 'secondary' | 'danger';
export type SplitButtonSize = 'sm' | 'md';

export type SplitButtonMenuItem = {
  label: string;
  onPress?: () => void;
  disabled?: boolean;
  destructive?: boolean;
};

export type SplitButtonProps = {
  label?: string;
  onPress?: () => void;
  onMenuPress?: () => void;
  variant?: SplitButtonVariant;
  size?: SplitButtonSize;
  disabled?: boolean;
  menuItems?: SplitButtonMenuItem[];
};

export function SplitButton({
  label = '',
  onPress,
  onMenuPress,
  variant = 'primary',
  size = 'md',
  disabled = false,
  menuItems = [],
}: SplitButtonProps) {
  const { colors, spacing, radius, typography } = useOptionalTheme();
  const [menuOpen, setMenuOpen] = useState(false);

  const bg =
    variant === 'danger' ? colors.danger : variant === 'secondary' ? colors.surface : colors.primary;
  const fg = variant === 'secondary' ? colors.text : colors.textInverse;
  const borderColor = variant === 'secondary' ? colors.borderStrong : bg;
  const padY = size === 'sm' ? spacing[2] : spacing[3];
  const padX = size === 'sm' ? spacing[3] : spacing[4];
  const fontSize = size === 'sm' ? typography.fontSize.sm : typography.fontSize.md;

  const openMenu = () => {
    if (disabled) return;
    const next = !menuOpen;
    setMenuOpen(next);
    onMenuPress?.();
  };

  return (
    <View style={styles.wrap} accessibilityRole="none">
      <View
        style={[
          styles.split,
          {
            borderRadius: radius.lg,
            borderColor,
            opacity: disabled ? 0.5 : 1,
          },
        ]}
        accessibilityRole="toolbar"
        accessibilityLabel={label ? `${label} split button` : 'Split button'}
      >
        <Pressable
          onPress={onPress}
          disabled={disabled}
          accessibilityRole="button"
          accessibilityLabel={label || 'Primary action'}
          style={[
            styles.primary,
            {
              backgroundColor: bg,
              paddingVertical: padY,
              paddingHorizontal: padX,
              borderTopLeftRadius: radius.lg,
              borderBottomLeftRadius: radius.lg,
            },
          ]}
        >
          <Text style={{ color: fg, fontSize, fontWeight: typography.fontWeight.semibold }}>{label}</Text>
        </Pressable>
        <Pressable
          onPress={openMenu}
          disabled={disabled}
          accessibilityRole="button"
          accessibilityLabel="More options"
          accessibilityState={{ expanded: menuOpen }}
          style={[
            styles.menuTrigger,
            {
              backgroundColor: bg,
              borderLeftColor: variant === 'secondary' ? colors.border : 'rgba(255,255,255,0.25)',
              paddingHorizontal: spacing[2],
              borderTopRightRadius: radius.lg,
              borderBottomRightRadius: radius.lg,
            },
          ]}
        >
          <Icon name="chevron-down" size="sm" color={fg} decorative />
        </Pressable>
      </View>
      {menuOpen && menuItems.length ? (
        <View
          style={[
            styles.menu,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
              borderRadius: radius.lg,
              marginTop: spacing[1],
            },
          ]}
          accessibilityRole="menu"
        >
          {menuItems.map((item) => (
            <MenuItem
              key={item.label}
              label={item.label}
              disabled={item.disabled}
              destructive={item.destructive}
              onPress={() => {
                item.onPress?.();
                setMenuOpen(false);
              }}
            />
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  wrap: {
    alignSelf: 'flex-start',
  },
  split: {
    flexDirection: 'row',
    overflow: 'hidden',
    borderWidth: 1,
  },
  primary: {
    justifyContent: 'center',
  },
  menuTrigger: {
    justifyContent: 'center',
    alignItems: 'center',
    borderLeftWidth: StyleSheet.hairlineWidth,
  },
  menu: {
    borderWidth: 1,
    minWidth: 160,
    overflow: 'hidden',
  },
});

export const EdsSplitButton = SplitButton;
