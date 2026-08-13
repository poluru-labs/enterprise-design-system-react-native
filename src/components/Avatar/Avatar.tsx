import { useMemo, useState } from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import { useOptionalTheme } from '../../theme';

export type AvatarSize = 'sm' | 'md' | 'lg' | 'xl';

export type AvatarProps = {
  name?: string;
  initials?: string;
  src?: string;
  size?: AvatarSize;
  alt?: string;
};

const SIZE_PX: Record<AvatarSize, number> = {
  sm: 28,
  md: 36,
  lg: 48,
  xl: 64,
};

function getInitials(name: string): string {
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return '?';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase();
}

export function Avatar({ name = '', initials = '', src = '', size = 'md', alt = '' }: AvatarProps) {
  const { colors, typography } = useOptionalTheme();
  const [imageError, setImageError] = useState(false);
  const px = SIZE_PX[size];
  const resolvedInitials = useMemo(() => (initials ? initials.slice(0, 2).toUpperCase() : getInitials(name)), [
    initials,
    name,
  ]);
  const accessibleLabel = alt || name || 'Avatar';
  const showImage = Boolean(src) && !imageError;

  return (
    <View
      style={[
        styles.avatar,
        {
          width: px,
          height: px,
          borderRadius: px / 2,
          backgroundColor: colors.brandSoft,
        },
      ]}
      accessibilityRole="image"
      accessibilityLabel={accessibleLabel}
    >
      {showImage ? (
        <Image
          source={{ uri: src }}
          style={{ width: px, height: px, borderRadius: px / 2 }}
          onError={() => setImageError(true)}
          accessibilityIgnoresInvertColors
        />
      ) : (
        <Text
          style={{
            color: colors.primary,
            fontSize: px * 0.35,
            fontWeight: typography.fontWeight.semibold,
          }}
        >
          {resolvedInitials}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
});

export const EdsAvatar = Avatar;
