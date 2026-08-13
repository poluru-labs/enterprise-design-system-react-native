import type { ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import type { EdsIconName } from '../../icons/names';
import { useOptionalTheme } from '../../theme';
import { Icon } from '../Icon';

export type EmptyStateProps = {
  title?: string;
  description?: string;
  action?: ReactNode;
  icon?: EdsIconName;
};

export function EmptyState({
  title = '',
  description = '',
  action,
  icon = 'folder',
}: EmptyStateProps) {
  const { colors, spacing, typography } = useOptionalTheme();

  return (
    <View style={[styles.root, { gap: spacing[4], padding: spacing[6] }]} accessibilityRole="summary">
      {icon ? (
        <View
          style={[
            styles.iconWrap,
            {
              backgroundColor: colors.bg,
              borderRadius: 999,
              padding: spacing[3],
            },
          ]}
        >
          <Icon name={icon} size="lg" color={colors.textMuted} decorative />
        </View>
      ) : null}
      <View style={{ gap: spacing[2], alignItems: 'center' }}>
        {title ? (
          <Text
            style={{
              color: colors.text,
              fontSize: typography.fontSize.lg,
              fontWeight: typography.fontWeight.semibold,
              textAlign: 'center',
            }}
          >
            {title}
          </Text>
        ) : null}
        {description ? (
          <Text
            style={{
              color: colors.textMuted,
              fontSize: typography.fontSize.sm,
              textAlign: 'center',
            }}
          >
            {description}
          </Text>
        ) : null}
      </View>
      {action ? <View style={styles.action}>{action}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  iconWrap: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  action: {
    alignItems: 'center',
  },
});

export const EdsEmptyState = EmptyState;
