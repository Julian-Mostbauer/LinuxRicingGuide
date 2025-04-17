<template>
  <div>
    <h1>
      TODO
    </h1>
  </div>
</template>

<script lang="ts" setup>
import { ref, computed, onMounted } from 'vue';
import type { PropType } from 'vue';
import { Node, routeName, routeIcon } from 'assets/utils/routeTree';
import { useRoute } from 'vue-router';

const props = defineProps({
  node: { type: Object as PropType<Node>, required: true },
  isRoot: { type: Boolean, default: false }
});

const route = useRoute();

const iconSize = 20;
const isVisible = ref(false);
const treeRef = ref<HTMLElement | null>(null);

const indexIcons = computed(() => ({
  default: props.isRoot ? 'house' : 'circle-info',
  mdi: props.isRoot ? 'home' : 'information-slab-circle'
}));

const isActivePage = (r: Node) => route.fullPath === r.Value?.path;

const closeNav = () => {
  const navCheckbox = document.getElementById('nav-drawer') as HTMLInputElement | null;
  navCheckbox && (navCheckbox.checked = false);
};

</script>
