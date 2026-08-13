import { Pressable, View } from 'react-native';
import { Icon } from '../Icon';

export function CloseIcon({
  size = 16,
  color,
  onPress,
  label = 'Close',
}: {
  size?: number;
  color?: string;
  onPress?: () => void;
  label?: string;
}) {
  const iconSize = size <= 16 ? 'sm' : size <= 20 ? 'md' : 'lg';
  const content = <Icon name="x" size={iconSize} color={color} decorative />;
  if (!onPress) {
    return (
      <View accessible accessibilityRole="image" accessibilityLabel={label}>
        {content}
      </View>
    );
  }
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      {content}
    </Pressable>
  );
}
