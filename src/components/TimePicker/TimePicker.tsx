import { useMemo, useState } from 'react';
import {
  Pressable,
  Text,
  TextInput,
  View,
  type StyleProp,
  type ViewStyle,
} from 'react-native';
import { clamp } from '../../utils/format';
import { useOptionalTheme } from '../../theme';
import { Icon } from '../Icon';
import {
  fieldControlStyle,
  fieldLabelStyle,
  fieldRootStyle,
} from '../_shared/field';

export type TimePickerProps = {
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  disabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

function parseTime(value: string | undefined): { hours: number; minutes: number } {
  const match = /^(\d{1,2}):(\d{2})$/.exec(value ?? '');
  if (!match) return { hours: 0, minutes: 0 };
  return {
    hours: clamp(Number(match[1]), 0, 23),
    minutes: clamp(Number(match[2]), 0, 59),
  };
}

function formatTime(hours: number, minutes: number): string {
  return `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}`;
}

export function TimePicker({
  value,
  onChange,
  label,
  disabled = false,
  style,
  testID,
}: TimePickerProps) {
  const theme = useOptionalTheme();
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState('00:00');
  const current = isControlled ? value : internal;
  const { hours, minutes } = useMemo(() => parseTime(current), [current]);

  const emit = (nextHours: number, nextMinutes: number) => {
    const next = formatTime(clamp(nextHours, 0, 23), clamp(nextMinutes, 0, 59));
    if (!isControlled) setInternal(next);
    onChange?.(next);
  };

  const step = (
    part: 'hours' | 'minutes',
    delta: number,
  ) => {
    if (disabled) return;
    if (part === 'hours') emit((hours + delta + 24) % 24, minutes);
    else emit(hours, (minutes + delta + 60) % 60);
  };

  return (
    <View style={[fieldRootStyle(theme), style]} testID={testID}>
      {label ? <Text style={fieldLabelStyle(theme)}>{label}</Text> : null}
      <View style={[fieldControlStyle(theme, { size: 'md', disabled }), { gap: theme.spacing[2] }]}>
        <View style={{ alignItems: 'center', gap: 2 }}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Increase hours"
            disabled={disabled}
            onPress={() => step('hours', 1)}
          >
            <Icon name="chevron-up" size="sm" color={theme.colors.textMuted} />
          </Pressable>
          <TextInput
            style={{
              width: 40,
              textAlign: 'center',
              fontFamily: theme.typography.fontFamily.mono,
              fontSize: theme.typography.fontSize.md,
              color: theme.colors.text,
              paddingVertical: 0,
            }}
            value={String(hours).padStart(2, '0')}
            editable={!disabled}
            keyboardType="number-pad"
            accessibilityLabel="Hours"
            maxLength={2}
            onChangeText={(text) => {
              const parsed = Number(text);
              if (Number.isNaN(parsed)) return;
              emit(parsed, minutes);
            }}
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Decrease hours"
            disabled={disabled}
            onPress={() => step('hours', -1)}
          >
            <Icon name="chevron-down" size="sm" color={theme.colors.textMuted} />
          </Pressable>
        </View>

        <Text
          style={{
            fontFamily: theme.typography.fontFamily.mono,
            fontSize: theme.typography.fontSize.lg,
            color: theme.colors.textMuted,
          }}
        >
          :
        </Text>

        <View style={{ alignItems: 'center', gap: 2 }}>
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Increase minutes"
            disabled={disabled}
            onPress={() => step('minutes', 1)}
          >
            <Icon name="chevron-up" size="sm" color={theme.colors.textMuted} />
          </Pressable>
          <TextInput
            style={{
              width: 40,
              textAlign: 'center',
              fontFamily: theme.typography.fontFamily.mono,
              fontSize: theme.typography.fontSize.md,
              color: theme.colors.text,
              paddingVertical: 0,
            }}
            value={String(minutes).padStart(2, '0')}
            editable={!disabled}
            keyboardType="number-pad"
            accessibilityLabel="Minutes"
            maxLength={2}
            onChangeText={(text) => {
              const parsed = Number(text);
              if (Number.isNaN(parsed)) return;
              emit(hours, parsed);
            }}
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Decrease minutes"
            disabled={disabled}
            onPress={() => step('minutes', -1)}
          >
            <Icon name="chevron-down" size="sm" color={theme.colors.textMuted} />
          </Pressable>
        </View>

        <Icon name="clock" size="md" color={theme.colors.textMuted} />
      </View>
    </View>
  );
}

export type EdsTimePicker = typeof TimePicker;
export const EdsTimePicker = TimePicker;
