import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useOptionalTheme, type EdsSemanticColors } from '../../theme';

export type BadgeVariant = 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info';
export type BadgeSize = 'sm' | 'md';

export type BadgeProps = {
  label?: string;
  variant?: BadgeVariant;
  size?: BadgeSize;
  pill?: boolean;
  soft?: boolean;
  children?: ReactNode;
};

function variantColors(variant: BadgeVariant, soft: boolean, colors: EdsSemanticColors) {
  const map = {
    neutral: { softBg: colors.bg, softFg: colors.textMuted, solidBg: colors.textMuted, solidFg: colors.textInverse },
    brand: { softBg: colors.brandSoft, softFg: colors.primary, solidBg: colors.primary, solidFg: colors.textInverse },
    success: { softBg: colors.successSoft, softFg: colors.success, solidBg: colors.success, solidFg: colors.textInverse },
    warning: { softBg: colors.warningSoft, softFg: colors.warning, solidBg: colors.warning, solidFg: colors.textInverse },
    danger: { softBg: colors.dangerSoft, softFg: colors.danger, solidBg: colors.danger, solidFg: colors.textInverse },
    info: { softBg: colors.infoSoft, softFg: colors.info, solidBg: colors.info, solidFg: colors.textInverse },
  }[variant];
  return soft
    ? { backgroundColor: map.softBg, color: map.softFg }
    : { backgroundColor: map.solidBg, color: map.solidFg };
}

export function Badge({
  label = '',
  variant = 'neutral',
  size = 'md',
  pill = false,
  soft = true,
  children,
}: BadgeProps) {
  const { colors, radius, typography, spacing } = useOptionalTheme();
  const palette = variantColors(variant, soft, colors);
  const content = label || children;

  return (
    <View
      style={[
        styles.badge,
        {
          backgroundColor: palette.backgroundColor,
          borderRadius: pill ? radius.full : radius.md,
          paddingHorizontal: size === 'sm' ? spacing[2] : spacing[3],
          paddingVertical: size === 'sm' ? 2 : spacing[1],
        },
      ]}
    >
      {typeof content === 'string' || typeof content === 'number' ? (
        <Text
          style={{
            color: palette.color,
            fontSize: size === 'sm' ? typography.fontSize.xs : typography.fontSize.sm,
            fontWeight: typography.fontWeight.medium,
          }}
        >
          {content}
        </Text>
      ) : (
        content
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    alignSelf: 'flex-start',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export const EdsBadge = Badge;
