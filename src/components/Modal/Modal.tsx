import type { ReactNode } from 'react';
import { Modal as RNModal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useOptionalTheme } from '../../theme';
import { CloseIcon } from '../_shared/CloseIcon';

export type ModalProps = {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  heading?: string;
  closeOnBackdrop?: boolean;
  children?: ReactNode;
  footer?: ReactNode;
};

export function Modal({
  open,
  onOpenChange,
  heading = 'Dialog',
  closeOnBackdrop = true,
  children,
  footer,
}: ModalProps) {
  const { colors, spacing, radius, typography } = useOptionalTheme();

  const close = () => onOpenChange?.(false);

  return (
    <RNModal
      visible={open}
      transparent
      animationType="fade"
      onRequestClose={close}
      accessibilityViewIsModal
    >
      <Pressable
        style={[styles.backdrop, { backgroundColor: colors.overlay }]}
        onPress={() => {
          if (closeOnBackdrop) close();
        }}
        accessibilityRole="button"
        accessibilityLabel="Close dialog backdrop"
      >
        <Pressable
          style={[
            styles.dialog,
            {
              backgroundColor: colors.surface,
              borderRadius: radius.xl,
              padding: spacing[4],
              gap: spacing[3],
            },
          ]}
          onPress={(e) => e.stopPropagation?.()}
          accessibilityRole="none"
          accessibilityLabel={heading}
        >
          <View style={[styles.header, { gap: spacing[2] }]}>
            <Text
              style={{
                color: colors.text,
                fontSize: typography.fontSize.lg,
                fontWeight: typography.fontWeight.semibold,
                flex: 1,
              }}
            >
              {heading}
            </Text>
            <CloseIcon size={16} color={colors.textMuted} onPress={close} label="Close dialog" />
          </View>
          <View style={styles.body}>{children}</View>
          {footer ? <View style={styles.footer}>{footer}</View> : null}
        </Pressable>
      </Pressable>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  dialog: {
    width: '100%',
    maxWidth: 480,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  body: {},
  footer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 8,
  },
});

export const EdsModal = Modal;
