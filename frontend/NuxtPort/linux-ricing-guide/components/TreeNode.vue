<template>
  <li v-if="node">
    <details v-if="node.Children.length > 0" open>
      <summary>
        <Icon name="fa6-solid:folder" size="16" />
        {{ node.Value?.path || 'Root' }}
      </summary>
      <ul>
        <li v-if="node.HasIndex">
          <a :href="node.Value?.path || '/'">
            <Icon name="fa6-solid:file-lines" size="16" />
            index.vue
          </a>
        </li>
        <TreeNode v-for="child in node.Children" :key="child.Value?.path" :node="child" />
      </ul>
    </details>

    <a v-else :href="node.Value?.path || '/'">
      <Icon name="fa6-solid:file-lines" size="16" />
      {{ node.Value?.path?.split('/').pop() || 'index.vue' }}
    </a>
  </li>
</template>

<script lang="ts" setup>
import type { PropType } from 'vue';
import { Tree, Node } from 'assets/utils/routeTree'

defineProps({
  node: {
    type: Object as PropType<Node>,
    required: true,
  },
});
</script>
