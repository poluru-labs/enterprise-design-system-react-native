import { Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useOptionalTheme } from '../../theme';

export type DataTableColumn = {
  key: string;
  header: string;
  width?: number;
};

export type DataTableProps = {
  columns: DataTableColumn[];
  rows: Record<string, string | number | null | undefined>[];
  onRowPress?: (row: Record<string, string | number | null | undefined>, index: number) => void;
  style?: object;
};

export function DataTable({ columns, rows, onRowPress, style }: DataTableProps) {
  const { colors, spacing, radius, typography } = useOptionalTheme();

  return (
    <ScrollView
      horizontal
      style={style}
      contentContainerStyle={{
        borderWidth: StyleSheet.hairlineWidth,
        borderColor: colors.border,
        borderRadius: radius.md,
        overflow: 'hidden',
        minWidth: '100%',
      }}
    >
      <View>
        <View style={[styles.row, { backgroundColor: colors.bg, borderBottomColor: colors.border }]}>
          {columns.map((column) => (
            <Text
              key={column.key}
              style={[
                styles.cell,
                {
                  width: column.width ?? 120,
                  color: colors.textMuted,
                  fontSize: typography.fontSize.sm,
                  fontWeight: typography.fontWeight.semibold,
                  padding: spacing[3],
                },
              ]}
            >
              {column.header}
            </Text>
          ))}
        </View>
        {rows.length === 0 ? (
          <Text style={{ color: colors.textSubtle, padding: spacing[4] }}>No data</Text>
        ) : (
          rows.map((row, index) => {
            const content = (
              <View
                style={[
                  styles.row,
                  {
                    borderBottomColor: colors.border,
                    backgroundColor: colors.surface,
                  },
                ]}
              >
                {columns.map((column) => (
                  <Text
                    key={column.key}
                    style={[
                      styles.cell,
                      {
                        width: column.width ?? 120,
                        color: colors.text,
                        fontSize: typography.fontSize.sm,
                        padding: spacing[3],
                      },
                    ]}
                  >
                    {row[column.key] ?? ''}
                  </Text>
                ))}
              </View>
            );

            if (!onRowPress) {
              return <View key={index}>{content}</View>;
            }

            return (
              <Pressable key={index} onPress={() => onRowPress(row, index)} accessibilityRole="button">
                {content}
              </Pressable>
            );
          })
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', borderBottomWidth: StyleSheet.hairlineWidth },
  cell: {},
});

export type EdsDataTable = typeof DataTable;
export const EdsDataTable = DataTable;
