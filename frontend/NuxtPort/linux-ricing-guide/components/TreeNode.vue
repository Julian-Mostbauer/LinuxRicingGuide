<template>
  <ul v-if="!isRoot || node.Children.length > 0" :class="isRoot ? 'menu rounded-r-[1.5rem] mt-2 mb-2 bg-base-200 text-base-content min-h-[98%] w-80 border-r-2 border-t-2 border-b-2 border-gray-800' : ''" >
    <li v-if="node.HasIndex">
      <a :href="node.Value?.path || '/'">
        <Icon :name="'fa6-solid:' + (isRoot ? 'house' : routeIcon(node.Value))" :size="iconSize" class="min-w-6"/>
        {{ routeName(node.Value?.path, isRoot ? "Home" : "Unknown Location") }}
      </a>
    </li>

    <!-- Folders -->
    <li v-for="child in node.Children" :key="child.Value?.path">
      <details v-if="child.Children.length > 0" open>
        <summary>
          <Icon name="fa6-solid:folder" :size="iconSize" class="min-w-6"/>
          {{ routeName(child.Value?.path) }}
        </summary>
        <TreeNode :node="child" />
      </details>

      <a v-else :href="child.Value?.path || '/'">
        <Icon :name="'fa6-solid:' + routeIcon(child.Value)" :size="iconSize" class="min-w-6"/>
        {{ routeName(child.Value?.path) }}
      </a>
    </li>
  </ul>
</template>



<script lang="ts" setup>
import type { PropType } from 'vue';
import { Node, routeName, routeIcon } from 'assets/utils/routeTree'

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