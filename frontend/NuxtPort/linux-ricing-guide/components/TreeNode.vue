<template>
  <ul v-if="!isRoot || node.Children.length > 0">
    <li v-if="node.HasIndex">
      <a :href="node.Value?.path || '/'">
        <Icon :name="'fa6-solid:' + (isRoot ? 'house' : 'file-lines')" :size="iconSize" />
        {{ routeName(node.Value?.path, isRoot ? "Home" : "Unknown Location") }}
      </a>
    </li>

    <!-- Folders -->
    <li v-for="child in node.Children" :key="child.Value?.path">
      <details v-if="child.Children.length > 0" open>
        <summary>
          <Icon name="fa6-solid:folder" :size="iconSize" />
          {{ routeName(child.Value?.path) }}
        </summary>
        <TreeNode :node="child" />
      </details>

      <a v-else :href="child.Value?.path || '/'">
        <Icon name="fa6-solid:file-lines" :size="iconSize" />
        {{ routeName(child.Value?.path) }}
      </a>
    </li>
  </ul>
</template>



<script lang="ts" setup>
import type { PropType } from 'vue';
import { Node, routeName } from 'assets/utils/routeTree'

const iconSize: number = 20;

const props = defineProps({
  node: {
    type: Object as PropType<Node>,
    required: true,
  },
  isRoot: {
    type: Boolean,
    default: false,
  },
});
</script>