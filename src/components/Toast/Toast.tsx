import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useOptionalTheme } from '../../theme';
import { CloseIcon } from '../_shared/CloseIcon';
import { StatusIcon } from '../_shared/StatusIcon';

export type ToastVariant = 'success' | 'info' | 'warning' | 'danger';

export type ToastOptions = {
  title: string;
  description?: string;
  variant?: ToastVariant;
  duration?: number;
};

export type ToastRecord = Required<Pick<ToastOptions, 'title'>> & {
  id: string;
  description?: string;
  variant: ToastVariant;
  duration: number;
};

type ToastContextValue = {
  show: (options: ToastOptions) => string;
  dismiss: (id: string) => void;
};

const ToastContext = createContext<ToastContextValue | null>(null);

let externalShow: ((options: ToastOptions) => string) | null = null;

export function showToast(options: ToastOptions): string {
  if (!externalShow) {
    console.warn('ToastProvider is not mounted. Wrap your app with <ToastProvider>.');
    return '';
  }
  return externalShow(options);
}

export function useToast(): ToastContextValue {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
}

function softFor(variant: ToastVariant, colors: ReturnType<typeof useOptionalTheme>['colors']) {
  return variant === 'success'
    ? colors.successSoft
    : variant === 'warning'
      ? colors.warningSoft
      : variant === 'danger'
        ? colors.dangerSoft
        : colors.infoSoft;
}

function accentFor(variant: ToastVariant, colors: ReturnType<typeof useOptionalTheme>['colors']) {
  return variant === 'success'
    ? colors.success
    : variant === 'warning'
      ? colors.warning
      : variant === 'danger'
        ? colors.danger
        : colors.info;
}

function ToastItem({
  toast,
  onDismiss,
}: {
  toast: ToastRecord;
  onDismiss: (id: string) => void;
}) {
  const { colors, spacing, radius, typography } = useOptionalTheme();

  useEffect(() => {
    if (toast.duration <= 0) return;
    const timer = setTimeout(() => onDismiss(toast.id), toast.duration);
    return () => clearTimeout(timer);
  }, [toast.duration, toast.id, onDismiss]);

  return (
    <View
      style={[
        styles.toast,
        {
          backgroundColor: softFor(toast.variant, colors),
          borderColor: accentFor(toast.variant, colors),
          borderRadius: radius.lg,
          padding: spacing[3],
          gap: spacing[2],
        },
      ]}
      accessibilityRole="text"
      accessibilityLiveRegion="polite"
    >
      <StatusIcon variant={toast.variant} size={18} color={accentFor(toast.variant, colors)} />
      <View style={styles.content}>
        <Text
          style={{
            color: colors.text,
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.semibold,
          }}
        >
          {toast.title}
        </Text>
        {toast.description ? (
          <Text style={{ color: colors.textMuted, fontSize: typography.fontSize.xs }}>
            {toast.description}
          </Text>
        ) : null}
      </View>
      <CloseIcon
        size={14}
        color={colors.textMuted}
        onPress={() => onDismiss(toast.id)}
        label="Dismiss notification"
      />
    </View>
  );
}

export type ToastProviderProps = {
  children: ReactNode;
};

export function ToastProvider({ children }: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastRecord[]>([]);
  const { spacing } = useOptionalTheme();

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const show = useCallback((options: ToastOptions) => {
    const id = `toast-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
    const record: ToastRecord = {
      id,
      title: options.title,
      description: options.description,
      variant: options.variant ?? 'info',
      duration: options.duration ?? 5000,
    };
    setToasts((prev) => [...prev, record]);
    return id;
  }, []);

  const value = useMemo(() => ({ show, dismiss }), [show, dismiss]);

  useEffect(() => {
    externalShow = show;
    return () => {
      if (externalShow === show) externalShow = null;
    };
  }, [show]);

  return (
    <ToastContext.Provider value={value}>
      <View style={styles.providerRoot}>
        {children}
        <View
          pointerEvents="box-none"
          style={[styles.host, { gap: spacing[2], padding: spacing[4] }]}
          accessibilityLiveRegion="polite"
        >
          {toasts.map((toast) => (
            <ToastItem key={toast.id} toast={toast} onDismiss={dismiss} />
          ))}
        </View>
      </View>
    </ToastContext.Provider>
  );
}

export type ToastProps = ToastOptions & {
  open?: boolean;
  onClose?: () => void;
};

/** Declarative toast for Storybook and controlled usage. */
export function Toast({
  title,
  description,
  variant = 'info',
  open = true,
  onClose,
}: ToastProps) {
  const { colors, spacing, radius, typography } = useOptionalTheme();

  if (!open) return null;

  return (
    <View
      style={[
        styles.toast,
        {
          backgroundColor: softFor(variant, colors),
          borderColor: accentFor(variant, colors),
          borderRadius: radius.lg,
          padding: spacing[3],
          gap: spacing[2],
        },
      ]}
      accessibilityRole="text"
      accessibilityLiveRegion="polite"
    >
      <StatusIcon variant={variant} size={18} color={accentFor(variant, colors)} />
      <View style={styles.content}>
        <Text
          style={{
            color: colors.text,
            fontSize: typography.fontSize.sm,
            fontWeight: typography.fontWeight.semibold,
          }}
        >
          {title}
        </Text>
        {description ? (
          <Text style={{ color: colors.textMuted, fontSize: typography.fontSize.xs }}>
            {description}
          </Text>
        ) : null}
      </View>
      {onClose ? (
        <CloseIcon size={14} color={colors.textMuted} onPress={onClose} label="Dismiss notification" />
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  providerRoot: {
    flex: 1,
  },
  host: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    zIndex: 1000,
    alignItems: 'center',
  },
  toast: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    borderWidth: 1,
    width: '100%',
    maxWidth: 420,
  },
  content: {
    flex: 1,
    gap: 2,
  },
});

export const EdsToast = Toast;
export const EdsToastProvider = ToastProvider;
