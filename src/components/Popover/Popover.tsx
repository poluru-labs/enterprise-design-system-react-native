import {
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from 'react';
import { Modal as RNModal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useOptionalTheme } from '../../theme';

export type PopoverPlacement = 'top' | 'bottom' | 'left' | 'right';

export type PopoverProps = {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  placement?: PopoverPlacement;
  trigger: ReactNode;
  children?: ReactNode;
  heading?: string;
};

export function Popover({
  open,
  onOpenChange,
  placement = 'bottom',
  trigger,
  children,
  heading = '',
}: PopoverProps) {
  const { colors, spacing, radius, typography } = useOptionalTheme();

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
    <Pressable onPress={toggle} accessibilityRole="button" accessibilityState={{ expanded: open }}>
      {typeof trigger === 'string' ? <Text>{trigger}</Text> : trigger}
    </Pressable>
  );

  return (
    <View style={styles.root}>
      <View>{triggerNode}</View>
      <RNModal visible={open} transparent animationType="fade" onRequestClose={close}>
        <Pressable
          style={styles.overlay}
          onPress={close}
          accessibilityRole="button"
          accessibilityLabel="Dismiss popover"
        >
          <View
            style={[
              styles.panel,
              placement === 'top' && styles.placementTop,
              placement === 'bottom' && styles.placementBottom,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
                borderRadius: radius.lg,
                padding: spacing[3],
                gap: spacing[2],
              },
            ]}
            accessibilityRole="none"
          >
            {heading ? (
              <Text
                style={{
                  color: colors.text,
                  fontSize: typography.fontSize.sm,
                  fontWeight: typography.fontWeight.semibold,
                }}
              >
                {heading}
              </Text>
            ) : null}
            {children}
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
    backgroundColor: 'transparent',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 24,
  },
  panel: {
    borderWidth: 1,
    minWidth: 200,
    maxWidth: 320,
  },
  placementTop: {
    marginBottom: 40,
  },
  placementBottom: {
    marginTop: 40,
  },
});

export const EdsPopover = Popover;
