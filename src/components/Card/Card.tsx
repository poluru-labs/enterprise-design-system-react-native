import type { ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useOptionalTheme } from '../../theme';

export type CardProps = {
  elevated?: boolean;
  header?: ReactNode;
  footer?: ReactNode;
  children?: ReactNode;
};

export function Card({ elevated = false, header, footer, children }: CardProps) {
  const { colors, spacing, radius } = useOptionalTheme();

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderRadius: radius.xl,
          padding: spacing[4],
          gap: spacing[3],
          ...(elevated
            ? {
                shadowColor: '#0f1720',
                shadowOpacity: 0.12,
                shadowRadius: 12,
                shadowOffset: { width: 0, height: 4 },
                elevation: 4,
                borderWidth: 0,
              }
            : { borderWidth: 1 }),
        },
      ]}
      accessibilityRole="summary"
    >
      {header ? <View style={styles.section}>{header}</View> : null}
      <View style={styles.body}>{children}</View>
      {footer ? <View style={styles.section}>{footer}</View> : null}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    width: '100%',
  },
  section: {},
  body: {
    flexGrow: 1,
  },
});

export const EdsCard = Card;
