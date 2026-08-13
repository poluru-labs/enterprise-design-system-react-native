import { StyleSheet, Text, View } from 'react-native';
import { useOptionalTheme } from '../../theme';

export type TimelineItemData = {
  id: string;
  title: string;
  description?: string;
  timestamp?: string;
};

export type TimelineProps = {
  items: TimelineItemData[];
  style?: object;
};

export function Timeline({ items, style }: TimelineProps) {
  const { colors, spacing, radius, typography } = useOptionalTheme();

  return (
    <View style={[{ gap: spacing[2] }, style]} accessibilityLabel="Timeline">
      {items.map((item, index) => (
        <View key={item.id} style={[styles.row, { gap: spacing[3] }]}>
          <View style={styles.rail}>
            <View
              style={{
                width: 12,
                height: 12,
                borderRadius: radius.full,
                backgroundColor: colors.primary,
                marginTop: 4,
              }}
            />
            {index < items.length - 1 ? (
              <View
                style={{
                  width: 2,
                  flex: 1,
                  minHeight: 24,
                  backgroundColor: colors.border,
                  marginTop: spacing[1],
                }}
              />
            ) : null}
          </View>
          <View style={{ flex: 1, paddingBottom: spacing[4], gap: spacing[1] }}>
            <Text
              style={{
                color: colors.text,
                fontSize: typography.fontSize.md,
                fontWeight: typography.fontWeight.semibold,
              }}
            >
              {item.title}
            </Text>
            {item.description ? (
              <Text style={{ color: colors.textMuted, fontSize: typography.fontSize.sm }}>
                {item.description}
              </Text>
            ) : null}
            {item.timestamp ? (
              <Text style={{ color: colors.textSubtle, fontSize: typography.fontSize.xs }}>
                {item.timestamp}
              </Text>
            ) : null}
          </View>
        </View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'stretch' },
  rail: { alignItems: 'center', width: 12 },
});

export type EdsTimeline = typeof Timeline;
export const EdsTimeline = Timeline;
