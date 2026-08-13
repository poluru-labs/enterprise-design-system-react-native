import { type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useOptionalTheme } from '../../theme';

export type ToolbarProps = {
  children: ReactNode;
  style?: object;
};

export function Toolbar({ children, style }: ToolbarProps) {
  const { colors, spacing, radius } = useOptionalTheme();

  return (
    <View
      accessibilityRole="toolbar"
      style={[
        styles.root,
        {
          gap: spacing[2],
          padding: spacing[2],
          backgroundColor: colors.surface,
          borderColor: colors.border,
          borderRadius: radius.lg,
          borderWidth: StyleSheet.hairlineWidth,
        },
        style,
      ]}
    >
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
});

export type EdsToolbar = typeof Toolbar;
export const EdsToolbar = Toolbar;
