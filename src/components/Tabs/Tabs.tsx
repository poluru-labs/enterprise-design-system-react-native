import { type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useOptionalTheme } from '../../theme';

export type TabsItem = {
  id: string;
  label: string;
  disabled?: boolean;
};

export type TabsProps = {
  items: TabsItem[];
  value: string;
  onValueChange: (value: string) => void;
  children?: ReactNode | ((activeId: string) => ReactNode);
  style?: object;
};

export function Tabs({ items, value, onValueChange, children, style }: TabsProps) {
  const { colors, spacing, radius, typography } = useOptionalTheme();
  const panel =
    typeof children === 'function' ? children(value) : children;

  return (
    <View style={style}>
      <View
        style={[styles.list, { borderBottomColor: colors.border }]}
        accessibilityRole="tablist"
      >
        {items.map((item) => {
          const active = item.id === value;
          return (
            <Pressable
              key={item.id}
              accessibilityRole="tab"
              accessibilityState={{ selected: active, disabled: !!item.disabled }}
              disabled={item.disabled}
              onPress={() => onValueChange(item.id)}
              style={[
                styles.tab,
                {
                  paddingHorizontal: spacing[3],
                  paddingVertical: spacing[2],
                  borderBottomColor: active ? colors.primary : 'transparent',
                  opacity: item.disabled ? 0.45 : 1,
                },
              ]}
            >
              <Text
                style={{
                  color: active ? colors.primary : colors.textMuted,
                  fontSize: typography.fontSize.sm,
                  fontWeight: active
                    ? typography.fontWeight.semibold
                    : typography.fontWeight.medium,
                }}
              >
                {item.label}
              </Text>
            </Pressable>
          );
        })}
      </View>
      {panel != null ? (
        <View style={{ paddingTop: spacing[3], borderRadius: radius.md }}>{panel}</View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  list: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  tab: {
    borderBottomWidth: 2,
    marginBottom: -1,
  },
});

export type EdsTabs = typeof Tabs;
export const EdsTabs = Tabs;
