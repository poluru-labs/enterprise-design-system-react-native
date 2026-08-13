import { useMemo } from 'react';
import { View, type StyleProp, type ViewStyle } from 'react-native';
import { SvgXml } from 'react-native-svg';
import { isEdsIconName, type EdsIconName } from '../../icons/names';
import { iconPaths } from '../../icons/paths';
import { useOptionalTheme } from '../../theme';

export type EdsIconSize = 'sm' | 'md' | 'lg';

export type IconProps = {
  name: EdsIconName;
  size?: EdsIconSize;
  decorative?: boolean;
  label?: string;
  color?: string;
  style?: StyleProp<ViewStyle>;
};

const SIZE_PX: Record<EdsIconSize, number> = {
  sm: 16,
  md: 20,
  lg: 24,
};

export function Icon({
  name,
  size = 'md',
  decorative = true,
  label,
  color,
  style,
}: IconProps) {
  const { colors } = useOptionalTheme();
  const px = SIZE_PX[size];
  const stroke = color ?? colors.text;

  const xml = useMemo(() => {
    if (!isEdsIconName(name)) return null;
    const paths = iconPaths[name].replace(/currentColor/g, stroke);
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="${px}" height="${px}" fill="none">${paths}</svg>`;
  }, [name, px, stroke]);

  if (!xml) return null;

  return (
    <View
      style={style}
      accessible={!decorative}
      accessibilityRole={decorative ? undefined : 'image'}
      accessibilityLabel={decorative ? undefined : label || name}
      importantForAccessibility={decorative ? 'no-hide-descendants' : 'yes'}
    >
      <SvgXml xml={xml} width={px} height={px} />
    </View>
  );
}

export type EdsIcon = typeof Icon;
export const EdsIcon = Icon;
