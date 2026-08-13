import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useOptionalTheme } from '../../theme';
import { Icon } from '../Icon';

export type PaginationProps = {
  page: number;
  pageCount: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
  style?: object;
};

function pageWindow(page: number, pageCount: number): (number | 'ellipsis')[] {
  if (pageCount <= 7) {
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }
  const pages = new Set<number>([1, pageCount, page, page - 1, page + 1].filter(
    (p) => p >= 1 && p <= pageCount,
  ));
  const sorted = [...pages].sort((a, b) => a - b);
  const result: (number | 'ellipsis')[] = [];
  let prev = 0;
  for (const p of sorted) {
    if (prev && p - prev > 1) result.push('ellipsis');
    result.push(p);
    prev = p;
  }
  return result;
}

export function Pagination({
  page,
  pageCount,
  onPageChange,
  disabled = false,
  style,
}: PaginationProps) {
  const { colors, spacing, radius, typography } = useOptionalTheme();
  const items = pageWindow(page, pageCount);

  const go = (next: number) => {
    if (disabled) return;
    const clamped = Math.min(Math.max(next, 1), Math.max(pageCount, 1));
    if (clamped !== page) onPageChange(clamped);
  };

  const btn = (extra?: object) => ({
    minWidth: 36,
    height: 36,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
    borderRadius: radius.md,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: colors.border,
    backgroundColor: colors.surface,
    paddingHorizontal: spacing[2],
    ...extra,
  });

  return (
    <View
      style={[styles.root, { gap: spacing[1] }, style]}
      accessibilityRole="adjustable"
      accessibilityLabel="Pagination"
    >
      <Pressable
        accessibilityLabel="Previous page"
        disabled={disabled || page <= 1}
        onPress={() => go(page - 1)}
        style={[btn(), (disabled || page <= 1) && { opacity: 0.4 }]}
      >
        <Icon name="chevron-left" size="sm" color={colors.text} />
      </Pressable>
      {items.map((item, index) =>
        item === 'ellipsis' ? (
          <Text key={`e-${index}`} style={{ color: colors.textMuted, paddingHorizontal: 4 }}>
            …
          </Text>
        ) : (
          <Pressable
            key={item}
            accessibilityLabel={`Page ${item}`}
            accessibilityState={{ selected: item === page }}
            disabled={disabled}
            onPress={() => go(item)}
            style={[
              btn(
                item === page
                  ? { backgroundColor: colors.primary, borderColor: colors.primary }
                  : undefined,
              ),
              disabled && { opacity: 0.4 },
            ]}
          >
            <Text
              style={{
                color: item === page ? colors.textInverse : colors.text,
                fontSize: typography.fontSize.sm,
                fontWeight: typography.fontWeight.medium,
              }}
            >
              {item}
            </Text>
          </Pressable>
        ),
      )}
      <Pressable
        accessibilityLabel="Next page"
        disabled={disabled || page >= pageCount}
        onPress={() => go(page + 1)}
        style={[btn(), (disabled || page >= pageCount) && { opacity: 0.4 }]}
      >
        <Icon name="chevron-right" size="sm" color={colors.text} />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
});

export type EdsPagination = typeof Pagination;
export const EdsPagination = Pagination;
