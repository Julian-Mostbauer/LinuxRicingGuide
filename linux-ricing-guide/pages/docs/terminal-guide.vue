<template>
  <div class="container mx-auto p-4">
    <Motion as="div" :variants="container" initial="hidden" animate="visible"
      class="grid grid-cols-1 md:grid-cols-1 gap-6 mb-10">

      <!-- Displays all elements is section -->
      <Motion v-for="(section, index) in sections" :key="index" :variants="items" class="w-full">
        <GradientOutline circle-width="200px">
          <SectionBlock :icons="section.icon" :title="section.title">
            <span v-html="section.content"></span>
            <CodeBlock v-if="section.command" :command="section.command" />
          </SectionBlock>
        </GradientOutline>
      </Motion>
    </Motion>
  </div>
</template>

<script lang="tsx" setup>
import { Motion } from 'motion-v';
import CommandBlock from '../../components/CodeBlock.vue';
import SectionBlock from '~/components/SectionBlock.vue';

definePageMeta({
  icons: { default: 'terminal' },
});

const container = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring',
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
};

const items = {
  hidden: { y: 20, opacity: 0, scale: 0.85 },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
  },
};

const sections = [
  {
    icon: { default: 'terminal' },
    title: 'Terminal Ricing Basics',
    content: `Ricing your terminal allows you to customize its appearance and functionality.
    A well-configured terminal can make your daily work much more efficient.
    Here's how you can rice your terminal with some common tools:
    <a href="/Docs/"> Docs </a>`
    ,
  },
  {
    icon: { default: 'code' },
    title: 'Install a Terminal Emulator',
    content: `
      First, you'll need a terminal emulator that allows for customization.
      Some popular options are:
      <ul>
        <li><strong>Alacritty</strong>: A GPU-accelerated terminal</li>
        <li><strong>Kitty</strong>: A fast, feature-rich terminal</li>
        <li><strong>URxvt</strong>: A lightweight, customizable terminal</li>
      </ul>
      You can install one using your package manager.
    `,
    command: `
      # To install Alacritty on Ubuntu
      sudo apt install alacritty
    `,
  },
  {
    icon: { default: 'palette' },
    title: 'Choose a Color Scheme',
    content: `
      Pick a color scheme that suits your aesthetic. You can use tools like <strong>pywal</strong> to generate color schemes from images.
      This tool applies color schemes to your terminal, editor, and other applications.
    `,
    command: `
      # Install pywal
      sudo apt install pywal
      # Apply a color scheme using an image
      wal -i ~/Pictures/my_wallpaper.jpg
    `,
  },
  {
    icon: { default: 'settings' },
    title: 'Configure the Terminal',
    content: `
      Most terminal emulators use a configuration file that allows you to adjust settings.
      For Alacritty, the configuration file is typically located at:
      <code>~/.config/alacritty/alacritty.yml</code>
      Customize fonts, background colors, and more.
    `,
    command: `
      # Example of setting a font and background color in Alacritty
      nano ~/.config/alacritty/alacritty.yml
      # Modify the following values:
      # font:
      #   normal:
      #     family: "JetBrains Mono"
      # background_opacity: 0.9
    `,
  },
  {
    icon: { default: 'wrench' },
    title: 'Final Tweaks and Testing',
    content: `
      Once you've configured your terminal, it's time to test it. Open a terminal window and make sure all your customizations are working.
      Experiment with different configurations until you're happy with the result.
    `,
    command: `
      # Restart Alacritty to apply changes
      pkill alacritty && alacritty
    `,
  },
];
</script>
