import { StyleSheet, Text, View } from 'react-native';
import { useOptionalTheme } from '../../theme';

export type StepperStep = {
  id: string;
  label: string;
  description?: string;
};

export type StepperProps = {
  steps: StepperStep[];
  activeIndex: number;
  style?: object;
};

export function Stepper({ steps, activeIndex, style }: StepperProps) {
  const { colors, spacing, radius, typography } = useOptionalTheme();

  return (
    <View style={[{ gap: spacing[3] }, style]} accessibilityLabel="Stepper">
      {steps.map((step, index) => {
        const complete = index < activeIndex;
        const active = index === activeIndex;
        const tone = complete || active ? colors.primary : colors.borderStrong;
        return (
          <View key={step.id} style={[styles.row, { gap: spacing[3] }]}>
            <View style={styles.rail}>
              <View
                style={{
                  width: 28,
                  height: 28,
                  borderRadius: radius.full,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: complete || active ? colors.primary : colors.bg,
                  borderWidth: 2,
                  borderColor: tone,
                }}
              >
                <Text
                  style={{
                    color: complete || active ? colors.textInverse : colors.textMuted,
                    fontSize: typography.fontSize.sm,
                    fontWeight: typography.fontWeight.semibold,
                  }}
                >
                  {index + 1}
                </Text>
              </View>
              {index < steps.length - 1 ? (
                <View
                  style={{
                    width: 2,
                    flex: 1,
                    minHeight: 20,
                    backgroundColor: complete ? colors.primary : colors.border,
                    marginTop: spacing[1],
                  }}
                />
              ) : null}
            </View>
            <View style={{ flex: 1, paddingBottom: spacing[3], gap: 2 }}>
              <Text
                style={{
                  color: active ? colors.text : colors.textMuted,
                  fontSize: typography.fontSize.md,
                  fontWeight: active
                    ? typography.fontWeight.semibold
                    : typography.fontWeight.medium,
                }}
              >
                {step.label}
              </Text>
              {step.description ? (
                <Text style={{ color: colors.textSubtle, fontSize: typography.fontSize.sm }}>
                  {step.description}
                </Text>
              ) : null}
            </View>
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'stretch' },
  rail: { alignItems: 'center' },
});

export type EdsStepper = typeof Stepper;
export const EdsStepper = Stepper;
