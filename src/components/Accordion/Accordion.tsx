import { type ReactNode } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useOptionalTheme } from '../../theme';
import { Icon } from '../Icon';

export type AccordionItemData = {
  id: string;
  title: string;
  content: ReactNode;
  disabled?: boolean;
};

export type AccordionProps = {
  items: AccordionItemData[];
  type?: 'single' | 'multiple';
  value?: string | string[];
  onValueChange?: (value: string | string[]) => void;
  style?: object;
};

function asArray(value: string | string[] | undefined): string[] {
  if (value == null) return [];
  return Array.isArray(value) ? value : [value];
}

export function Accordion({
  items,
  type = 'single',
  value,
  onValueChange,
  style,
}: AccordionProps) {
  const { colors, spacing, radius, typography } = useOptionalTheme();
  const openIds = asArray(value);

  const toggle = (id: string) => {
    if (type === 'single') {
      const next = openIds.includes(id) ? '' : id;
      onValueChange?.(next);
      return;
    }
    const next = openIds.includes(id)
      ? openIds.filter((x) => x !== id)
      : [...openIds, id];
    onValueChange?.(next);
  };

  return (
    <View style={[styles.root, { borderColor: colors.border, borderRadius: radius.md }, style]}>
      {items.map((item, index) => {
        const open = openIds.includes(item.id);
        return (
          <View
            key={item.id}
            style={[
              index > 0 && { borderTopWidth: StyleSheet.hairlineWidth, borderTopColor: colors.border },
            ]}
          >
            <Pressable
              accessibilityRole="button"
              accessibilityState={{ expanded: open, disabled: !!item.disabled }}
              disabled={item.disabled}
              onPress={() => toggle(item.id)}
              style={[
                styles.trigger,
                {
                  paddingHorizontal: spacing[4],
                  paddingVertical: spacing[3],
                  opacity: item.disabled ? 0.45 : 1,
                },
              ]}
            >
              <Text
                style={{
                  flex: 1,
                  color: colors.text,
                  fontSize: typography.fontSize.md,
                  fontWeight: typography.fontWeight.semibold,
                }}
              >
                {item.title}
              </Text>
              <Icon
                name={open ? 'chevron-up' : 'chevron-down'}
                size="sm"
                color={colors.textMuted}
              />
            </Pressable>
            {open ? (
              <View
                style={{
                  paddingHorizontal: spacing[4],
                  paddingBottom: spacing[3],
                }}
              >
                {typeof item.content === 'string' ? (
                  <Text style={{ color: colors.textMuted, fontSize: typography.fontSize.sm }}>
                    {item.content}
                  </Text>
                ) : (
                  item.content
                )}
              </View>
            ) : null}
          </View>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    borderWidth: StyleSheet.hairlineWidth,
    overflow: 'hidden',
  },
  trigger: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
});

export type EdsAccordion = typeof Accordion;
export const EdsAccordion = Accordion;
