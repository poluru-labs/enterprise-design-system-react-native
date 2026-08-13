import type { Meta, StoryObj } from '@storybook/react';
import { View, Text, StyleSheet } from 'react-native';
import { EDS_ICON_NAMES } from '../icons/names';
import { Icon } from '../components/Icon';

const meta: Meta = {
  title: 'Foundations/Icons',
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const AllIcons: Story = {
  render: () => (
    <View style={styles.grid}>
      {EDS_ICON_NAMES.map((name) => (
        <View key={name} style={styles.cell}>
          <Icon name={name} size="lg" />
          <Text style={styles.label}>{name}</Text>
        </View>
      ))}
    </View>
  ),
};

const styles = StyleSheet.create({
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
    maxWidth: 720,
  },
  cell: {
    width: 96,
    alignItems: 'center',
    gap: 8,
    padding: 12,
    borderWidth: 1,
    borderColor: '#d7dee7',
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  label: {
    fontSize: 10,
    textAlign: 'center',
    color: '#1a2430',
  },
});
