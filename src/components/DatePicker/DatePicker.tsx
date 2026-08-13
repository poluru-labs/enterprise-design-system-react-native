import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useOptionalTheme } from '../../theme';
import {
  formatMonthYear,
  getCalendarDays,
  getWeekdayLabels,
  isISODateInRange,
  parseISODate,
} from '../../utils/date-utils';
import { Icon } from '../Icon';

export type DatePickerProps = {
  value: string;
  onChange: (value: string) => void;
  label?: string;
  min?: string;
  max?: string;
  style?: object;
};

export function DatePicker({ value, onChange, label, min, max, style }: DatePickerProps) {
  const { colors, spacing, radius, typography } = useOptionalTheme();
  const parsed = parseISODate(value);
  const initial = parsed ?? new Date();
  const [viewYear, setViewYear] = useState(initial.getFullYear());
  const [viewMonth, setViewMonth] = useState(initial.getMonth());

  const days = useMemo(() => getCalendarDays(viewYear, viewMonth), [viewYear, viewMonth]);
  const weekdays = useMemo(() => getWeekdayLabels(), []);

  const shiftMonth = (delta: number) => {
    const next = new Date(viewYear, viewMonth + delta, 1);
    setViewYear(next.getFullYear());
    setViewMonth(next.getMonth());
  };

  return (
    <View style={[{ gap: spacing[2] }, style]}>
      {label ? (
        <Text
          style={{
            color: colors.text,
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.semibold,
          }}
        >
          {label}
        </Text>
      ) : null}
      <View
        style={[
          styles.calendar,
          {
            borderColor: colors.border,
            borderRadius: radius.lg,
            backgroundColor: colors.surface,
            padding: spacing[3],
            gap: spacing[2],
          },
        ]}
      >
        <View style={styles.header}>
          <Pressable accessibilityLabel="Previous month" onPress={() => shiftMonth(-1)}>
            <Icon name="chevron-left" size="sm" color={colors.text} />
          </Pressable>
          <Text
            style={{
              color: colors.text,
              fontSize: typography.fontSize.md,
              fontWeight: typography.fontWeight.semibold,
            }}
          >
            {formatMonthYear(viewYear, viewMonth)}
          </Text>
          <Pressable accessibilityLabel="Next month" onPress={() => shiftMonth(1)}>
            <Icon name="chevron-right" size="sm" color={colors.text} />
          </Pressable>
        </View>
        <View style={styles.weekRow}>
          {weekdays.map((day, index) => (
            <Text
              key={`${day}-${index}`}
              style={[styles.cellText, { color: colors.textSubtle, fontSize: typography.fontSize.xs }]}
            >
              {day}
            </Text>
          ))}
        </View>
        <View style={styles.grid}>
          {days.map((day) => {
            const selected = day.iso === value;
            const disabled = !isISODateInRange(day.iso, min, max);
            return (
              <Pressable
                key={day.iso}
                accessibilityLabel={day.iso}
                accessibilityState={{ selected, disabled }}
                disabled={disabled}
                onPress={() => onChange(day.iso)}
                style={[
                  styles.day,
                  {
                    borderRadius: radius.md,
                    backgroundColor: selected ? colors.primary : 'transparent',
                    opacity: !day.inMonth || disabled ? 0.35 : 1,
                  },
                ]}
              >
                <Text
                  style={{
                    color: selected ? colors.textInverse : colors.text,
                    fontSize: typography.fontSize.sm,
                  }}
                >
                  {day.day}
                </Text>
              </Pressable>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  calendar: { borderWidth: StyleSheet.hairlineWidth },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  weekRow: { flexDirection: 'row' },
  grid: { flexDirection: 'row', flexWrap: 'wrap' },
  day: {
    width: '14.2857%',
    aspectRatio: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cellText: {
    width: '14.2857%',
    textAlign: 'center',
  },
});

export type EdsDatePicker = typeof DatePicker;
export const EdsDatePicker = DatePicker;
