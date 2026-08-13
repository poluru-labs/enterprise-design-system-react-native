import { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useOptionalTheme } from '../../theme';

export type CodeSnippetProps = {
  code: string;
  language?: string;
  copyable?: boolean;
  onCopy?: (code: string) => void;
};

export function CodeSnippet({
  code,
  language = 'ts',
  copyable = true,
  onCopy,
}: CodeSnippetProps) {
  const { colors, spacing, radius, typography } = useOptionalTheme();
  const [copied, setCopied] = useState(false);
  const trimmed = code.trim();

  useEffect(() => {
    if (!copied) return;
    const timer = setTimeout(() => setCopied(false), 1600);
    return () => clearTimeout(timer);
  }, [copied]);

  if (!trimmed) return null;

  const handleCopy = () => {
    onCopy?.(trimmed);
    setCopied(true);
  };

  return (
    <View
      style={[
        styles.root,
        {
          backgroundColor: colors.bg,
          borderColor: colors.border,
          borderRadius: radius.lg,
          borderWidth: 1,
        },
      ]}
      accessibilityLabel={`Code snippet ${language}`}
    >
      <View
        style={[
          styles.header,
          {
            borderBottomColor: colors.border,
            paddingHorizontal: spacing[3],
            paddingVertical: spacing[2],
          },
        ]}
      >
        <Text style={{ color: colors.textMuted, fontSize: typography.fontSize.xs }}>{language}</Text>
        {copyable ? (
          <Pressable
            onPress={handleCopy}
            accessibilityRole="button"
            accessibilityLabel={copied ? 'Copied' : 'Copy code'}
          >
            <Text style={{ color: colors.primary, fontSize: typography.fontSize.xs }}>
              {copied ? 'Copied' : 'Copy'}
            </Text>
          </Pressable>
        ) : null}
      </View>
      <Text
        style={[
          styles.code,
          {
            color: colors.text,
            fontFamily: typography.fontFamily.mono,
            fontSize: typography.fontSize.sm,
            padding: spacing[3],
          },
        ]}
        selectable
      >
        {trimmed}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    width: '100%',
    overflow: 'hidden',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  code: {},
});

export const EdsCodeSnippet = CodeSnippet;
