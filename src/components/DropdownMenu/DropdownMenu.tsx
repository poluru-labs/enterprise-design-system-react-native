import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';
import { Modal as RNModal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useOptionalTheme } from '../../theme';
import { MenuItem, type MenuItemProps } from '../MenuItem';

export type DropdownMenuPlacement = 'top' | 'bottom' | 'left' | 'right';

export type DropdownMenuProps = {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  trigger: ReactNode;
  children?: ReactNode;
  placement?: DropdownMenuPlacement;
};

export function DropdownMenu({
  open,
  onOpenChange,
  trigger,
  children,
  placement = 'bottom',
}: DropdownMenuProps) {
  const { colors, radius } = useOptionalTheme();

  const toggle = () => onOpenChange?.(!open);
  const close = () => onOpenChange?.(false);

  const triggerNode = isValidElement(trigger) ? (
    cloneElement(trigger as ReactElement<{ onPress?: () => void }>, {
      onPress: () => {
        (trigger as ReactElement<{ onPress?: () => void }>).props.onPress?.();
        toggle();
      },
    })
  ) : (
    <Pressable
      onPress={toggle}
      accessibilityRole="button"
      accessibilityState={{ expanded: open }}
      accessibilityLabel="Open menu"
    >
      {typeof trigger === 'string' ? <Text>{trigger}</Text> : trigger}
    </Pressable>
  );

  const items = Children.map(children, (child) => {
    if (!isValidElement(child)) return child;
    if (child.type !== MenuItem) return child;
    const item = child as ReactElement<MenuItemProps>;
    return cloneElement(item, {
      onPress: () => {
        item.props.onPress?.();
        close();
      },
    });
  });

  return (
    <View style={styles.root}>
      <View>{triggerNode}</View>
      <RNModal visible={open} transparent animationType="fade" onRequestClose={close}>
        <Pressable
          style={styles.overlay}
          onPress={close}
          accessibilityRole="button"
          accessibilityLabel="Dismiss menu"
        >
          <View
            style={[
              styles.menu,
              placement === 'top' && styles.top,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderRadius: radius.lg,
              },
            ]}
            accessibilityRole="menu"
          >
            {items}
          </View>
        </Pressable>
      </RNModal>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    alignSelf: 'flex-start',
  },
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  menu: {
    borderWidth: 1,
    minWidth: 180,
    overflow: 'hidden',
  },
  top: {
    marginBottom: 24,
  },
});

export const EdsDropdownMenu = DropdownMenu;
