<template>
  <ul v-if="!isRoot || node.Children.length > 0">
    <li v-if="node.HasIndex">
      <a :href="node.Value?.path || '/'">
        <Icon :name="'fa6-solid:' + (isRoot ? 'house' : 'file-lines')" size="16" />
        {{ routeName(node.Value?.path, "Home") }}
      </a>
    </li>

    <!-- Folders -->
    <li v-for="child in node.Children" :key="child.Value?.path">
      <details v-if="child.Children.length > 0" open>
        <summary>
          <Icon name="fa6-solid:folder" size="16" />
          {{ routeName(child.Value?.path) }}
        </summary>
        <TreeNode :node="child" />
      </details>

      <a v-else :href="child.Value?.path || '/'">
        <Icon name="fa6-solid:file-lines" size="16" />
        {{ routeName(child.Value?.path) }}
      </a>
    </li>
  </ul>
</template>



<script lang="ts" setup>
import type { PropType } from 'vue';
import { Tree, Node, routeName } from 'assets/utils/routeTree'

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