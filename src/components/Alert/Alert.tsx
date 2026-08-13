import { useState, type ReactNode } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useOptionalTheme } from '../../theme';
import { CloseIcon } from '../_shared/CloseIcon';
import { StatusIcon } from '../_shared/StatusIcon';

export type AlertVariant = 'success' | 'info' | 'warning' | 'danger';

export type AlertProps = {
  variant?: AlertVariant;
  title?: string;
  message?: string;
  dismissible?: boolean;
  hideIcon?: boolean;
  onDismiss?: () => void;
  children?: ReactNode;
};

export function Alert({
  variant = 'info',
  title = '',
  message = '',
  dismissible = false,
  hideIcon = false,
  onDismiss,
  children,
}: AlertProps) {
  const { colors, spacing, radius, typography } = useOptionalTheme();
  const [dismissed, setDismissed] = useState(false);

  if (dismissed) return null;

  const soft =
    variant === 'success'
      ? colors.successSoft
      : variant === 'warning'
        ? colors.warningSoft
        : variant === 'danger'
          ? colors.dangerSoft
          : colors.infoSoft;

  const accent =
    variant === 'success'
      ? colors.success
      : variant === 'warning'
        ? colors.warning
        : variant === 'danger'
          ? colors.danger
          : colors.info;

  const handleDismiss = () => {
    setDismissed(true);
    onDismiss?.();
  };

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: soft,
          borderColor: accent,
          borderRadius: radius.lg,
          padding: spacing[3],
          gap: spacing[2],
        },
      ]}
      accessibilityRole="alert"
      accessibilityLiveRegion="polite"
    >
      {!hideIcon ? <StatusIcon variant={variant} size={18} color={accent} /> : null}
      <View style={styles.content}>
        {title ? (
          <Text
            style={[
              styles.title,
              {
                color: colors.text,
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.semibold,
              },
            ]}
          >
            {title}
          </Text>
        ) : null}
        {message ? (
          <Text style={[styles.message, { color: colors.textMuted, fontSize: typography.fontSize.sm }]}>
            {message}
          </Text>
        ) : children ? (
          <View>{typeof children === 'string' ? <Text style={{ color: colors.textMuted }}>{children}</Text> : children}</View>
        ) : null}
      </View>
      {dismissible ? (
        <CloseIcon size={14} color={colors.textMuted} onPress={handleDismiss} label="Dismiss alert" />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
  },
  content: {
    flex: 1,
    gap: 2,
  },
  title: {},
  message: {},
});

export const EdsAlert = Alert;
