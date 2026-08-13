import { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { useOptionalTheme } from '../../theme';
import { Icon } from '../Icon';

export type TreeNode = {
  id: string;
  label: string;
  children?: TreeNode[];
};

export type TreeViewProps = {
  nodes: TreeNode[];
  expandedIds?: string[];
  onToggle?: (id: string, expanded: boolean) => void;
  style?: object;
};

function TreeNodeRow({
  node,
  depth,
  expandedIds,
  onToggle,
}: {
  node: TreeNode;
  depth: number;
  expandedIds: string[];
  onToggle?: (id: string, expanded: boolean) => void;
}) {
  const { colors, spacing, typography } = useOptionalTheme();
  const hasChildren = Boolean(node.children?.length);
  const expanded = expandedIds.includes(node.id);

  return (
    <View>
      <Pressable
        accessibilityRole="button"
        accessibilityState={{ expanded: hasChildren ? expanded : undefined }}
        onPress={() => {
          if (hasChildren) onToggle?.(node.id, !expanded);
        }}
        style={[
          styles.row,
          {
            paddingVertical: spacing[2],
            paddingLeft: spacing[2] + depth * spacing[4],
            gap: spacing[2],
          },
        ]}
      >
        {hasChildren ? (
          <Icon
            name={expanded ? 'chevron-down' : 'chevron-right'}
            size="sm"
            color={colors.textMuted}
          />
        ) : (
          <View style={{ width: 16 }} />
        )}
        <Text style={{ color: colors.text, fontSize: typography.fontSize.sm }}>{node.label}</Text>
      </Pressable>
      {hasChildren && expanded
        ? node.children!.map((child) => (
            <TreeNodeRow
              key={child.id}
              node={child}
              depth={depth + 1}
              expandedIds={expandedIds}
              onToggle={onToggle}
            />
          ))
        : null}
    </View>
  );
}

export function TreeView({ nodes, expandedIds, onToggle, style }: TreeViewProps) {
  const [internalExpanded, setInternalExpanded] = useState<string[]>([]);
  const openIds = expandedIds ?? internalExpanded;

  const handleToggle = (id: string, expanded: boolean) => {
    if (expandedIds == null) {
      setInternalExpanded((prev) =>
        expanded ? [...prev, id] : prev.filter((x) => x !== id),
      );
    }
    onToggle?.(id, expanded);
  };

  return (
    <View style={style} accessibilityLabel="Tree">
      {nodes.map((node) => (
        <TreeNodeRow
          key={node.id}
          node={node}
          depth={0}
          expandedIds={openIds}
          onToggle={handleToggle}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  row: { flexDirection: 'row', alignItems: 'center' },
});

export type EdsTreeView = typeof TreeView;
export const EdsTreeView = TreeView;
