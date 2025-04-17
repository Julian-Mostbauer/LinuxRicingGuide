<template>
  <div class="container mx-auto p-4">
    <Motion as="div" :variants="container" initial="hidden" animate="visible"
            class="grid grid-cols-1 md:grid-cols-1 gap-6 mb-10">

      <!-- Displays all elements is section -->
      <Motion v-for="(section, index) in sections" :key="index" :variants="items" class="w-full">
        <GradientOutline circle-width="200px">
          <div class="card bg-base-200 text-base-content p-6 h-full">
            <section class="mb-6 h-full flex flex-col">
              <h2 class="mb-4 text-xl font-bold flex flex-row items-center">
                <DynamicIcon :names="{ default: section.icon }" class="mr-2"/>
                {{ section.title }}
              </h2>
              <p class="text-md flex-grow" v-html="section.content"></p>

              <!-- Display the command block if available -->
              <CommandBlock v-if="section.command" :command="section.command"/>

            </section>
          </div>
        </GradientOutline>
      </Motion>

    </Motion>
  </div>
</template>

<script lang="ts" setup>
import {Motion} from 'motion-v';
import CommandBlock from '../../components/CodeBlock.vue';

definePageMeta({
  icons: {default: 'database'},
});

const container = {
  hidden: {opacity: 0, scale: 0.95}, // Adjusted to avoid layout shift
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      delayChildren: 0.3, // Slightly reduced delay for smoother animation
      staggerChildren: 0.2,
    },
  },
}

const items = {
  hidden: {y: 20, opacity: 0, scale: 0.85},
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
}

const sections = [
  {
    icon: 'laptop',
    title: 'What is a Desktop Environment?',
    content: `
        A desktop environment is a complete suite of tools and components that together create the graphical user interface (GUI) of a Linux system. It transforms a barebones operating system into a user-friendly, visually interactive workspace—allowing users to interact with their system without relying solely on the command line.
        <br><br>
        Each DE has its own design philosophy. Some aim for minimalism and performance, while others focus on a rich feature set and visual polish. This diversity allows Linux users to pick an environment that aligns with their personal workflow and aesthetic taste.
    `,
  },
  {
    icon: 'window-maximize',
    title: 'Core Components',
    content: `
        <strong>Window Manager:</strong> Manages the placement and appearance of windows. It handles things like window borders, resizing, minimizing/maximizing, and virtual desktops.
        <br>
        <strong>Panel or Taskbar:</strong> A bar that displays open applications, system indicators (like volume, battery, and network), and often a launcher or menu for accessing apps.
        <br>
        <strong>File Manager:</strong> Provides a GUI for browsing, copying, moving, and organizing files and folders.
        <br>
        <strong>System Settings:</strong> Centralized tools for configuring system preferences—display resolution, keyboard shortcuts, themes, user accounts, and more.
        <br>
        <strong>Default Applications:</strong> A set of utilities and programs such as terminals, text editors, screenshot tools, media players, and system monitors.
    `,
  },
  {
    icon: 'star',
    title: 'Popular Desktop Environments',
    content: `
        There are several popular desktop environments in the Linux world, each with its own style and strengths:
        <br><br>
        <strong>• GNOME:</strong> Offers a modern, clean, and distraction-free interface with a focus on productivity.
        <br>
        <strong>• KDE Plasma:</strong> Highly customizable and feature-rich, ideal for users who want full control over their desktop experience.
        <br>
        <strong>• XFCE / LXQt:</strong> Lightweight and resource-efficient, perfect for older hardware or minimal setups.
        <br>
        <strong>• Cinnamon / MATE:</strong> Designed with a traditional desktop layout, similar to classic Windows environments, and easy to use.
        <br><br>
        These DEs offer a wide range of experiences—from sleek minimalism to powerful customization.
        `
  },
  {
    icon: 'cogs',
    title: 'Using a Window Manager Instead',
    content: `
        Advanced users may skip a full DE and use a standalone window manager (e.g., i3, bspwm) for full control and minimal setups.
        <br><br>
        You can check out <strong>our guide</strong> to this topic as well.
        `,
  },
  {
    icon: 'terminal',
    title: 'Install Example - KDE Plasma',
    content: 'To install KDE Plasma on Debian/Ubuntu-based systems:',
    command: 'sudo apt install kde-plasma-desktop'
  },
  {
    icon: 'terminal',
    title: 'Install Example - XFCE',
    content: 'To install XFCE on Debian/Ubuntu-based systems:',
    command: 'sudo apt install xfce4'
  }
];

</script>