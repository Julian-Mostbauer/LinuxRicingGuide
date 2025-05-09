<template>
  <svg :width="width" :height="height" class="radial-tree" @mousedown="startPan" @mousemove="handlePan"
    @mouseup="endPan" @mouseleave="endPan" @wheel.prevent="handleZoom">
    <defs>
      <clipPath id="circle-clip">
        <circle r="50" />
      </clipPath>
    </defs>
    <g :transform="`translate(${view.x} ${view.y}) scale(${view.k})`">
      <g transform="translate(0 0)">
        <!-- Connections -->
        <path v-for="(connection, index) in connections" :key="'conn-' + index" :d="connection.path"
          class="connection" />

        <!-- Nodes -->
        <g v-for="(node, index) in allNodes" :key="'node-' + index" :transform="`translate(${node.x},${node.y})`">
          <NuxtLink :to="node.link" class="node-link">
            <rect :x="!node.parent ? -60 : node.children.length == 0 ? -45 : -50"
              :y="!node.parent ? -60 : node.children.length == 0 ? -45 : -50"
              :width="!node.parent ? 120 : node.children.length == 0 ? 90 : 100"
              :height="!node.parent ? 120 : node.children.length == 0 ? 90 : 100" class="node-circle mask mask-squircle"
              @click="() => { toggleNode(node); closeNav(); }" />
          </NuxtLink>
          <text class="node-text"
            :style="{ fontSize: !node.parent ? '28px' : node.children.length == 0 ? '14px' : '20px' }">
            <tspan v-for="(line, lineIndex) in wrapText(node.name, 10)" :key="lineIndex" x="0"
              :dy="lineIndex === 0 ? `-${(wrapText(node.name, 10).length - 1) * 0.6}em` : '1.2em'">
              {{ line }}
            </tspan>
          </text>
        </g>
      </g>
    </g>
  </svg>
</template>

<script lang="ts">
import { defineComponent, type PropType } from 'vue'
import type { Node } from 'assets/utils/routeTree'
import { toHeaderCase } from '~/assets/utils/caseUtils'

interface TreeNode {
  x: number
  y: number
  name: string
  link: string
  children: TreeNode[]
  parent?: TreeNode
  expanded: boolean
}

interface ViewState {
  k: number
  x: number
  y: number
}

export default defineComponent({
  props: {
    rootNode: {
      type: Object as PropType<Node>,
      required: true
    },
    width: {
      type: Number,
      default: 500
    },
    height: {
      type: Number,
      default: 780
    }
  },

  data() {
    return {
      allNodes: [] as TreeNode[],
      connections: [] as Array<{ path: string }>,
      radius: 15,
      angleStep: 45,
      isPanning: false,
      startPanPosition: { x: 0, y: 0 },
      view: {
        k: 1,
        x: this.width / 2,
        y: this.height / 2
      } as ViewState
    }
  },

  mounted() {
    this.layoutTree()
  },

  methods: {
    layoutTree() {
      this.allNodes = []
      this.connections = []
      this.calculatePositions(this.rootNode, 0, 0)
    },

    calculatePositions(node: Node, depth: number, angle: number, parentNode?: TreeNode): TreeNode {
      const baseClusterRadius = 200;
      const extraRadiusIfHasChildren = Math.max(node.Children.length - 1, 0) * 20;
      const clusterRadius = baseClusterRadius + extraRadiusIfHasChildren;

      let nodeX = parentNode ? parentNode.x + Math.cos(angle * Math.PI / 180) * clusterRadius : 0;
      let nodeY = parentNode ? parentNode.y + Math.sin(angle * Math.PI / 180) * clusterRadius : 0;

      const radialPosition: TreeNode = {
        x: nodeX,
        y: nodeY,
        name: toHeaderCase(node.Value?.path ? this.routeName(node.Value.path) : 'Root'),
        link: node.Value?.path || '/',
        children: [],
        parent: parentNode,
        expanded: true,
      };

      // Resolve collisions
      const pushRadius = this.radius * 11;
      for (const existingNode of this.allNodes) {
        const dx = radialPosition.x - existingNode.x;
        const dy = radialPosition.y - existingNode.y;
        const distance = Math.sqrt(dx * dx + dy * dy);

        if (distance < pushRadius) {
          const overlap = pushRadius - distance;
          const angleToExistingNode = Math.atan2(dy, dx);

          // Push the node away
          radialPosition.x += Math.cos(angleToExistingNode) * overlap;
          radialPosition.y += Math.sin(angleToExistingNode) * overlap;
        }
      }

      this.allNodes.push(radialPosition);

      if (parentNode) {
        this.connections.push({
          path: this.createConnectionPath(parentNode, radialPosition),
        });
      }

      const childCount = node.Children.length;
      if (childCount > 0) {
        const totalArc = childCount <= 3 ? 120 : childCount <= 6 ? 180 : 330;
        const spreadAngle = totalArc / (childCount || 1);

        let baseAngleOffset =
          parentNode?.x === undefined || parentNode?.y === undefined
            ? 0
            : (Math.atan2(parentNode.y - nodeY, parentNode.x - nodeX) * 180) / Math.PI;

        baseAngleOffset = (baseAngleOffset + 360) % 360; // Normalize angle to [0, 360)

        let childAngle = baseAngleOffset + angle - totalArc / 2;

        for (const child of node.Children) {
          const childNode = this.calculatePositions(child, depth + 1, childAngle, radialPosition);
          radialPosition.children.push(childNode);
          childAngle += spreadAngle;
        }
      }

      return radialPosition;
    },

    createConnectionPath(start: TreeNode, end: TreeNode): string {
      return `M ${start.x} ${start.y} Q ${(start.x + end.x) / 2} ${(start.y + end.y) / 2} ${end.x} ${end.y}`
    },

    startPan(event: MouseEvent) {
      this.isPanning = true
      this.startPanPosition = {
        x: event.clientX - this.view.x,
        y: event.clientY - this.view.y
      }
    },

    handlePan(event: MouseEvent) {
      if (!this.isPanning) return
      this.view.x = event.clientX - this.startPanPosition.x
      this.view.y = event.clientY - this.startPanPosition.y
    },

    endPan() {
      this.isPanning = false
    },

    handleZoom(event: WheelEvent) {
      const scaleFactor = 0.95
      const newScale = -event.deltaY < 0
        ? this.view.k * scaleFactor
        : this.view.k / scaleFactor

      // Limit zoom range
      this.view.k = Math.min(Math.max(0.5, newScale), 3)

      // Adjust position to zoom under cursor
      const rect = (event.target as SVGSVGElement).getBoundingClientRect()
      const mouseX = event.clientX - rect.left
      const mouseY = event.clientY - rect.top

      this.view.x = mouseX - (mouseX - this.view.x) * (this.view.k / newScale)
      this.view.y = mouseY - (mouseY - this.view.y) * (this.view.k / newScale)
    },

    toggleNode(node: TreeNode) {
      node.expanded = !node.expanded
      this.layoutTree()
    },

    routeName(path: string) {
      return path.split('/').pop() || 'Home' // Fallback to 'Home' if path is empty
    },

    wrapText(text: string, maxChars: number): string[] {
      const words = text.split(' ')
      const lines: string[] = []
      let currentLine = ''

      for (const word of words) {
        if ((currentLine + word).length > maxChars) {
          lines.push(currentLine.trim())
          currentLine = word + ' '
        } else {
          currentLine += word + ' '
        }
      }

      if (currentLine.trim()) {
        lines.push(currentLine.trim())
      }

      return lines
    },

    closeNav() {
      const navCheckbox = document.getElementById('nav-drawer') as HTMLInputElement | null;
      if (navCheckbox) {
        navCheckbox.checked = false;
      }
    }
  }
})



</script>

<style>
.radial-tree {
  cursor: grab;
  user-select: none;
  border-radius: 2rem;
}

.radial-tree:active {
  cursor: grabbing;
}

.node-circle {
  fill: var(--color-base-300);
  stroke: none;
  stroke-width: 2;
  cursor: pointer;
  transition: all 0.1s ease-in-out;
}

.node-circle:hover {
  fill: var(--color-primary);
  scale: 1.2;
}

g:hover>.node-text {
  fill: var(--color-base-100);
}


.node-text {
  fill: var(--color-base-content);
  text-anchor: middle;
  dominant-baseline: central;
  font-size: 2px;
  pointer-events: none;
}

.connection {
  stroke: var(--color-gray-300);
  stroke-width: 2;
  fill: none;
}
</style>