import type { ReactNode } from 'react';
import { Modal as RNModal, Pressable, StyleSheet, Text, View } from 'react-native';
import { useOptionalTheme } from '../../theme';
import { CloseIcon } from '../_shared/CloseIcon';

export type DrawerSide = 'left' | 'right';
export type DrawerSize = 'sm' | 'md' | 'lg';

export type DrawerProps = {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  side?: DrawerSide;
  size?: DrawerSize;
  heading?: string;
  children?: ReactNode;
};

const WIDTH: Record<DrawerSize, number | `${number}%`> = {
  sm: 280,
  md: 360,
  lg: '85%',
};

export function Drawer({
  open,
  onOpenChange,
  side = 'right',
  size = 'md',
  heading = 'Panel',
  children,
}: DrawerProps) {
  const { colors, spacing, typography } = useOptionalTheme();
  const close = () => onOpenChange?.(false);

  return (
    <RNModal visible={open} transparent animationType="fade" onRequestClose={close} accessibilityViewIsModal>
      <View style={styles.backdrop}>
        <Pressable
          style={[StyleSheet.absoluteFillObject, { backgroundColor: colors.overlay }]}
          onPress={close}
          accessibilityRole="button"
          accessibilityLabel="Close drawer backdrop"
        />
        <View
          style={[
            styles.panel,
            {
              backgroundColor: colors.surface,
              width: WIDTH[size],
              [side === 'left' ? 'left' : 'right']: 0,
              padding: spacing[4],
              gap: spacing[3],
            },
          ]}
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
            <CloseIcon size={16} color={colors.textMuted} onPress={close} label="Close panel" />
          </View>
          <View style={styles.body}>{children}</View>
        </View>
      </View>
    </RNModal>
  );
}

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
  },
  panel: {
    position: 'absolute',
    top: 0,
    bottom: 0,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  body: {
    flex: 1,
  },
});

export const EdsDrawer = Drawer;
