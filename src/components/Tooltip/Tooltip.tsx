import { useState, type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useOptionalTheme } from '../../theme';

export type TooltipPlacement = 'top' | 'bottom' | 'left' | 'right';

export type TooltipProps = {
  content: string;
  children: ReactNode;
  placement?: TooltipPlacement;
};

export function Tooltip({ content, children, placement = 'top' }: TooltipProps) {
  const { colors, spacing, radius, typography } = useOptionalTheme();
  const [visible, setVisible] = useState(false);

  if (!content) {
    return <View>{children}</View>;
  }

  return (
    <View style={styles.root}>
      <Pressable
        onPress={() => setVisible((v) => !v)}
        onLongPress={() => setVisible(true)}
        accessibilityRole="button"
        accessibilityHint={content}
        accessibilityLabel="Show tooltip"
      >
        {children}
      </Pressable>
      {visible ? (
        <View
          style={[
            styles.tooltip,
            placement === 'top' && styles.top,
            placement === 'bottom' && styles.bottom,
            {
              backgroundColor: colors.text,
              borderRadius: radius.md,
              paddingHorizontal: spacing[2],
              paddingVertical: spacing[1],
            },
          ]}
          accessibilityRole="text"
          accessibilityLabel={content}
        >
          <Text style={{ color: colors.textInverse, fontSize: typography.fontSize.xs }}>{content}</Text>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignSelf: 'flex-start',
    position: 'relative',
  },
  tooltip: {
    position: 'absolute',
    zIndex: 10,
    maxWidth: 220,
  },
  top: {
    bottom: '100%',
    marginBottom: 6,
    left: 0,
  },
  bottom: {
    top: '100%',
    marginTop: 6,
    left: 0,
  },
});

export const EdsTooltip = Tooltip;
