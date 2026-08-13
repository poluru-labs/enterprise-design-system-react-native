import { Text, View } from 'react-native';
import { useOptionalTheme } from '../../theme';

export type DescriptionListItem = {
  term: string;
  description: string;
};

export type DescriptionListProps = {
  items: DescriptionListItem[];
  style?: object;
};

export function DescriptionList({ items, style }: DescriptionListProps) {
  const { colors, spacing, typography } = useOptionalTheme();

  return (
    <View style={[{ gap: spacing[3] }, style]}>
      {items.map((item) => (
        <View key={item.term} style={{ gap: spacing[1] }}>
          <Text
            style={{
              color: colors.textMuted,
              fontSize: typography.fontSize.sm,
              fontWeight: typography.fontWeight.semibold,
            }}
          >
            {item.term}
          </Text>
          <Text style={{ color: colors.text, fontSize: typography.fontSize.md }}>
            {item.description}
          </Text>
        </View>
      ))}
    </View>
  );
}

export type EdsDescriptionList = typeof DescriptionList;
export const EdsDescriptionList = DescriptionList;
