import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useOptionalTheme, type EdsSemanticColors } from '../../theme';
import { CloseIcon } from '../_shared/CloseIcon';

export type TagVariant = 'neutral' | 'brand' | 'success' | 'warning' | 'danger' | 'info';

export type TagProps = {
  label?: string;
  variant?: TagVariant;
  onRemove?: () => void;
  children?: ReactNode;
};

function softPair(variant: TagVariant, colors: EdsSemanticColors) {
  return {
    neutral: { bg: colors.bg, fg: colors.textMuted },
    brand: { bg: colors.brandSoft, fg: colors.primary },
    success: { bg: colors.successSoft, fg: colors.success },
    warning: { bg: colors.warningSoft, fg: colors.warning },
    danger: { bg: colors.dangerSoft, fg: colors.danger },
    info: { bg: colors.infoSoft, fg: colors.info },
  }[variant];
}

export function Tag({ label = '', variant = 'neutral', onRemove, children }: TagProps) {
  const { colors, spacing, radius, typography } = useOptionalTheme();
  const pair = softPair(variant, colors);
  const content = label || children;

  return (
    <View
      style={[
        styles.tag,
        {
          backgroundColor: pair.bg,
          borderRadius: radius.full,
          paddingLeft: spacing[3],
          paddingRight: onRemove ? spacing[1] : spacing[3],
          paddingVertical: spacing[1],
          gap: spacing[1],
        },
      ]}
    >
      {typeof content === 'string' || typeof content === 'number' ? (
        <Text style={{ color: pair.fg, fontSize: typography.fontSize.sm }}>{content}</Text>
      ) : (
        content
      )}
      {onRemove ? <CloseIcon size={12} color={pair.fg} onPress={onRemove} label="Remove tag" /> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
});

export const EdsTag = Tag;
