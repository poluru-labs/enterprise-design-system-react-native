import type { Meta, StoryObj } from '@storybook/react';
import { View, Text, Pressable, StyleSheet } from 'react-native';
import { useTheme } from '../theme';

function ThemeDemo() {
  const { theme, toggleTheme, colors } = useTheme();
  return (
    <View style={[styles.box, { backgroundColor: colors.surface, borderColor: colors.border }]}>
      <Text style={{ color: colors.text, fontSize: 20, fontWeight: '600', marginBottom: 8 }}>
        Enterprise Design Systems
      </Text>
      <Text style={{ color: colors.textMuted, marginBottom: 16 }}>
        Active theme: {theme}
      </Text>
      <Pressable
        onPress={toggleTheme}
        style={[styles.btn, { backgroundColor: colors.primary }]}
        accessibilityRole="button"
      >
        <Text style={{ color: colors.textInverse, fontWeight: '600' }}>Toggle light / dark</Text>
      </Pressable>
    </View>
  );
}

const meta: Meta = {
  title: 'Foundations/Themes',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const LightAndDark: Story = {
  render: () => <ThemeDemo />,
};

const styles = StyleSheet.create({
  box: {
    padding: 24,
    borderRadius: 12,
    borderWidth: 1,
    maxWidth: 420,
  },
  btn: {
    alignSelf: 'flex-start',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
  },
});
