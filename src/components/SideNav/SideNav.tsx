import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { EdsIconName } from '../../icons/names';
import { useOptionalTheme } from '../../theme';
import { Icon } from '../Icon';

export type SideNavItem = {
  id: string;
  label: string;
  icon?: EdsIconName;
  active?: boolean;
  onPress?: () => void;
};

export type SideNavProps = {
  items: SideNavItem[];
  collapsed?: boolean;
  style?: object;
};

export function SideNav({ items, collapsed = false, style }: SideNavProps) {
  const { colors, spacing, radius, typography } = useOptionalTheme();

  return (
    <View
      style={[
        {
          width: collapsed ? 64 : 220,
          gap: spacing[1],
          padding: spacing[2],
          backgroundColor: colors.surface,
          borderRightWidth: StyleSheet.hairlineWidth,
          borderRightColor: colors.border,
        },
        style,
      ]}
      accessibilityLabel="Side navigation"
    >
      {items.map((item) => (
        <Pressable
          key={item.id}
          accessibilityRole="button"
          accessibilityState={{ selected: !!item.active }}
          accessibilityLabel={item.label}
          onPress={item.onPress}
          style={[
            styles.item,
            {
              paddingVertical: spacing[2],
              paddingHorizontal: spacing[3],
              borderRadius: radius.md,
              gap: spacing[2],
              backgroundColor: item.active ? colors.brandSoft : 'transparent',
              justifyContent: collapsed ? 'center' : 'flex-start',
            },
          ]}
        >
          {item.icon ? (
            <Icon
              name={item.icon}
              size="md"
              color={item.active ? colors.primary : colors.textMuted}
            />
          ) : null}
          {!collapsed ? (
            <Text
              style={{
                color: item.active ? colors.primary : colors.text,
                fontSize: typography.fontSize.sm,
                fontWeight: item.active
                  ? typography.fontWeight.semibold
                  : typography.fontWeight.medium,
              }}
            >
              {item.label}
            </Text>
          ) : null}
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  item: { flexDirection: 'row', alignItems: 'center' },
});

export type EdsSideNav = typeof SideNav;
export const EdsSideNav = SideNav;
