import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useOptionalTheme } from '../../theme';

export type BreadcrumbItemData = {
  label: string;
  onPress?: () => void;
};

export type BreadcrumbProps = {
  items: BreadcrumbItemData[];
  style?: object;
};

export function Breadcrumb({ items, style }: BreadcrumbProps) {
  const { colors, spacing, typography } = useOptionalTheme();

  return (
    <View
      style={[styles.root, { gap: spacing[1] }, style]}
      accessibilityRole="header"
      accessibilityLabel="Breadcrumb"
    >
      {items.map((item, index) => {
        const isLast = index === items.length - 1;
        return (
          <View key={`${item.label}-${index}`} style={styles.item}>
            {isLast || !item.onPress ? (
              <Text
                accessibilityState={isLast ? { selected: true } : undefined}
                style={{
                  color: isLast ? colors.text : colors.textMuted,
                  fontSize: typography.fontSize.sm,
                  fontWeight: isLast
                    ? typography.fontWeight.semibold
                    : typography.fontWeight.regular,
                }}
              >
                {item.label}
              </Text>
            ) : (
              <Pressable accessibilityRole="link" onPress={item.onPress}>
                <Text
                  style={{
                    color: colors.primary,
                    fontSize: typography.fontSize.sm,
                  }}
                >
                  {item.label}
                </Text>
              </Pressable>
            )}
            {!isLast ? (
              <Text style={{ color: colors.textSubtle, marginHorizontal: spacing[1] }}>/</Text>
            ) : null}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flexDirection: 'row', flexWrap: 'wrap', alignItems: 'center' },
  item: { flexDirection: 'row', alignItems: 'center' },
});

export type EdsBreadcrumb = typeof Breadcrumb;
export const EdsBreadcrumb = Breadcrumb;
