import { Pressable, StyleSheet, Text, View } from 'react-native';
import type { EdsIconName } from '../../icons/names';
import { useOptionalTheme } from '../../theme';
import { Icon } from '../Icon';

export type ListItemData = {
  id: string;
  label: string;
  description?: string;
  icon?: EdsIconName;
  onPress?: () => void;
};

export type ListProps = {
  items: ListItemData[];
  style?: object;
};

export function List({ items, style }: ListProps) {
  const { colors, spacing, radius, typography } = useOptionalTheme();

  return (
    <View
      style={[
        {
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: colors.border,
          borderRadius: radius.lg,
          overflow: 'hidden',
        },
        style,
      ]}
    >
      {items.map((item, index) => {
        const content = (
          <View
            style={[
              styles.row,
              {
                padding: spacing[3],
                gap: spacing[3],
                borderTopWidth: index === 0 ? 0 : StyleSheet.hairlineWidth,
                borderTopColor: colors.border,
                backgroundColor: colors.surface,
              },
            ]}
          >
            {item.icon ? <Icon name={item.icon} size="md" color={colors.textMuted} /> : null}
            <View style={{ flex: 1, gap: 2 }}>
              <Text
                style={{
                  color: colors.text,
                  fontSize: typography.fontSize.md,
                  fontWeight: typography.fontWeight.medium,
                }}
              >
                {item.label}
              </Text>
              {item.description ? (
                <Text style={{ color: colors.textMuted, fontSize: typography.fontSize.sm }}>
                  {item.description}
                </Text>
              ) : null}
            </View>
          </View>
        );

        if (!item.onPress) {
          return <View key={item.id}>{content}</View>;
        }

        return (
          <Pressable key={item.id} accessibilityRole="button" onPress={item.onPress}>
            {content}
          </Pressable>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
});

export type EdsList = typeof List;
export const EdsList = List;
