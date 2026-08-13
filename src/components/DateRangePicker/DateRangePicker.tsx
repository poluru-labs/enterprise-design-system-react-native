import { useMemo, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useOptionalTheme } from '../../theme';
import {
  compareISODates,
  formatMonthYear,
  getCalendarDays,
  getWeekdayLabels,
  parseISODate,
} from '../../utils/date-utils';
import { Icon } from '../Icon';

export type DateRangeValue = {
  start: string;
  end: string;
};

export type DateRangePickerProps = {
  start: string;
  end: string;
  onChange: (range: DateRangeValue) => void;
  label?: string;
  style?: object;
};

export function DateRangePicker({ start, end, onChange, label, style }: DateRangePickerProps) {
  const { colors, spacing, radius, typography } = useOptionalTheme();
  const parsed = parseISODate(start) ?? new Date();
  const [viewYear, setViewYear] = useState(parsed.getFullYear());
  const [viewMonth, setViewMonth] = useState(parsed.getMonth());
  const [draftStart, setDraftStart] = useState(start);

  const days = useMemo(() => getCalendarDays(viewYear, viewMonth), [viewYear, viewMonth]);
  const weekdays = useMemo(() => getWeekdayLabels(), []);

  const shiftMonth = (delta: number) => {
    const next = new Date(viewYear, viewMonth + delta, 1);
    setViewYear(next.getFullYear());
    setViewMonth(next.getMonth());
  };

  const selectDay = (iso: string) => {
    if (!draftStart || (start && end && draftStart === start)) {
      setDraftStart(iso);
      onChange({ start: iso, end: '' });
      return;
    }
    if (compareISODates(iso, draftStart) < 0) {
      setDraftStart(iso);
      onChange({ start: iso, end: draftStart });
      return;
    }
    onChange({ start: draftStart, end: iso });
  };

  const inRange = (iso: string) => {
    if (!start || !end) return false;
    return compareISODates(iso, start) >= 0 && compareISODates(iso, end) <= 0;
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
      <Text style={{ color: colors.textMuted, fontSize: typography.fontSize.sm }}>
        {start || '…'} → {end || '…'}
      </Text>
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
          {weekdays.map((day) => (
            <Text
              key={day}
              style={[styles.cellText, { color: colors.textSubtle, fontSize: typography.fontSize.xs }]}
            >
              {day}
            </Text>
          ))}
        </View>
        <View style={styles.grid}>
          {days.map((day) => {
            const selected = day.iso === start || day.iso === end;
            const ranged = inRange(day.iso);
            return (
              <Pressable
                key={day.iso}
                accessibilityLabel={day.iso}
                accessibilityState={{ selected }}
                onPress={() => selectDay(day.iso)}
                style={[
                  styles.day,
                  {
                    borderRadius: radius.md,
                    backgroundColor: selected
                      ? colors.primary
                      : ranged
                        ? colors.brandSoft
                        : 'transparent',
                    opacity: day.inMonth ? 1 : 0.35,
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
  cellText: { width: '14.2857%', textAlign: 'center' },
});

export type EdsDateRangePicker = typeof DateRangePicker;
export const EdsDateRangePicker = DateRangePicker;
