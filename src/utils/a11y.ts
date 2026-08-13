import type { ViewStyle } from 'react-native';

/** Visually hidden styles for RN (off-screen clip). */
export function visuallyHiddenStyle(): ViewStyle {
  return {
    position: 'absolute',
    width: 1,
    height: 1,
    margin: -1,
    overflow: 'hidden',
    opacity: 0,
  };
}

export { clamp } from './format';
