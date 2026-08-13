import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useOptionalTheme } from '../../theme';
import { Icon } from '../Icon';

export type FileUploadProps = {
  label?: string;
  onFilesSelected?: (names: string[]) => void;
  multiple?: boolean;
  accept?: string;
  disabled?: boolean;
  /** Called when the dropzone is pressed (mockable in tests). */
  onPress?: () => void;
  /**
   * Optional picker hook. Return selected file names to update local state
   * and emit `onFilesSelected`. Useful for tests / platform pickers.
   */
  onPick?: () => string[] | void | Promise<string[] | void>;
  /** Controlled selected file names. */
  selectedFiles?: string[];
};

export function FileUpload({
  label = '',
  onFilesSelected,
  multiple = false,
  accept = '',
  disabled = false,
  onPress,
  onPick,
  selectedFiles,
}: FileUploadProps) {
  const { colors, spacing, radius, typography } = useOptionalTheme();
  const [internalNames, setInternalNames] = useState<string[]>([]);
  const names = selectedFiles ?? internalNames;

  const applyNames = (next: string[]) => {
    const resolved = multiple ? next : next.slice(0, 1);
    if (selectedFiles === undefined) setInternalNames(resolved);
    onFilesSelected?.(resolved);
  };

  const handlePress = async () => {
    if (disabled) return;
    onPress?.();
    if (!onPick) return;
    const result = await onPick();
    if (Array.isArray(result)) applyNames(result);
  };

  return (
    <View style={[styles.field, { gap: spacing[2] }]}>
      {label ? (
        <Text style={{ color: colors.text, fontSize: typography.fontSize.sm, fontWeight: typography.fontWeight.medium }}>
          {label}
        </Text>
      ) : null}
      <Pressable
        onPress={handlePress}
        disabled={disabled}
        accessibilityRole="button"
        accessibilityState={{ disabled }}
        accessibilityLabel={label || 'Upload files'}
        accessibilityHint={accept ? `Accepted types: ${accept}` : undefined}
        style={[
          styles.dropzone,
          {
            borderColor: colors.borderStrong,
            backgroundColor: colors.bg,
            borderRadius: radius.lg,
            padding: spacing[5],
            opacity: disabled ? 0.5 : 1,
            gap: spacing[2],
          },
        ]}
      >
        <Icon name="upload" size="lg" color={colors.textMuted} decorative />
        <Text style={{ color: colors.text, fontSize: typography.fontSize.sm, textAlign: 'center' }}>
          Tap to upload
        </Text>
        <Text style={{ color: colors.textSubtle, fontSize: typography.fontSize.xs, textAlign: 'center' }}>
          {multiple ? 'Multiple files supported' : 'Single file only'}
        </Text>
      </Pressable>
      {names.length ? (
        <View style={{ gap: spacing[1] }} accessibilityLiveRegion="polite">
          {names.map((name) => (
            <View key={name} style={[styles.fileRow, { gap: spacing[2] }]}>
              <Icon name="file" size="sm" color={colors.textMuted} decorative />
              <Text style={{ color: colors.textMuted, fontSize: typography.fontSize.sm }}>{name}</Text>
            </View>
          ))}
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  field: {
    width: '100%',
  },
  dropzone: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderStyle: 'dashed',
  },
  fileRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

export const EdsFileUpload = FileUpload;
