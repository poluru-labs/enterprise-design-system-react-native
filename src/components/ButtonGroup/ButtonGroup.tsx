import { Children, cloneElement, isValidElement, type ReactElement, type ReactNode } from 'react';
import { StyleSheet, View } from 'react-native';
import { useOptionalTheme } from '../../theme';

export type ButtonGroupProps = {
  children: ReactNode;
  attached?: boolean;
  style?: object;
};

export function ButtonGroup({ children, attached = false, style }: ButtonGroupProps) {
  const { spacing, radius } = useOptionalTheme();
  const items = Children.toArray(children).filter(isValidElement) as ReactElement[];

  return (
    <View
      style={[
        styles.root,
        {
          gap: attached ? 0 : spacing[2],
          borderRadius: radius.md,
          overflow: attached ? 'hidden' : undefined,
        },
        style,
      ]}
      accessibilityRole="toolbar"
    >
      {items.map((child, index) =>
        cloneElement(child, {
          key: child.key ?? index,
          style: [
            (child.props as { style?: object }).style,
            attached && index > 0 ? { marginLeft: -StyleSheet.hairlineWidth } : null,
            attached
              ? {
                  borderRadius: 0,
                  ...(index === 0 ? { borderTopLeftRadius: radius.md, borderBottomLeftRadius: radius.md } : null),
                  ...(index === items.length - 1
                    ? { borderTopRightRadius: radius.md, borderBottomRightRadius: radius.md }
                    : null),
                }
              : null,
          ],
        }),
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' },
});

export type EdsButtonGroup = typeof ButtonGroup;
export const EdsButtonGroup = ButtonGroup;
