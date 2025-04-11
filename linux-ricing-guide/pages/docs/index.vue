<template>
  <div class="container mx-auto p-4">
    <Motion as="div" :variants="container" initial="hidden" animate="visible"
            class="grid grid-cols-1 md:grid-cols-1 gap-6 mb-10">
      <Motion v-for="(section, index) in sections" :key="index" :variants="items" class="w-full">
        <GradientOutline circle-width="200px">
          <div class="card bg-base-200 text-base-content p-6 h-full">
            <section class="mb-6 h-full flex flex-col">
              <h2 class="mb-4 text-xl font-bold flex flex-row items-center">
                <DynamicIcon :names="{ default: section.icon }" class="mr-2"/>
                {{ section.title }}
              </h2>
              <p class="text-md flex-grow" v-html="section.content"></p>
            </section>
          </div>
        </GradientOutline>
      </Motion>
    </Motion>
  </div>
</template>

<script lang="ts" setup>
import {Motion} from 'motion-v'

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
    icon: 'user',
    title: 'Welcome to the Docs',
    content: `
      This is a guide to help you get started with <strong>ricing</strong> your Linux desktop.
      <br>
      <br>
      <strong>Ricing</strong> is the art of customizing your Linux desktop environment to make it look and feel unique.
      It can be overwhelming at first, but with the right tools and resources, you can create a beautiful and functional setup.
      Here you will find a collection of tips, tricks, and resources to help you get started. So get to ricing and have fun!
    `
  },
  {
    content: `
      We have prepared a small <strong>5 step guide</strong> to help you get started with ricing your Linux desktop:
    `
  },
  {
    icon: 'window-maximize',
    title: 'Pick a DE or WM',
    content: `
      Start by choosing your base environment. Use a <strong>Desktop Environment (DE)</strong> like <em>GNOME, KDE, or XFCE</em> for a full-featured experience,
      or go minimal and flexible with a <strong>Window Manager (WM)</strong> like <em>i3, Sway, or bspwm</em>.
      <br><br>
      DEs are easier to start with, while WMs give you total control over layout and appearance.
    `
  },
  {
    icon: 'palette',
    title: 'Choose a Color Scheme & Fonts',
    content: `
      Pick a consistent and visually appealing <strong>color palette</strong> and <strong>font</strong> to set the vibe of your desktop.
      Tools like <a href="https://github.com/dylanaraps/pywal" target="_blank">pywal</a> can generate themes from any image and apply them system-wide.
      <br><br>
      Popular fonts include <em>JetBrains Mono, Fira Code, and Iosevka</em>.
    `
  },
  {
    icon: 'sliders',
    title: 'Customize Your Apps',
    content: `
      Tweak your terminal, launcher, bar, and notifications:
      <ul>
        <li><strong>Terminal:</strong> Alacritty, Kitty, URxvt</li>
        <li><strong>Launcher:</strong> Rofi, dmenu</li>
        <li><strong>Status Bar:</strong> Polybar, Waybar</li>
        <li><strong>Notifications:</strong> Dunst, Mako</li>
      </ul>
      Each of these tools can be customized via dotfiles inside <code>~/.config/</code>.
    `
  },
  {
    icon: 'layer-group',
    title: 'Add a Compositor (for Effects)',
    content: `
      To add transparency, blur, and shadows to your setup, use a <strong>compositor</strong>.
      <br><br>
      For X11, try <strong>picom</strong>. On Wayland, compositing is often built-in (e.g., in <em>Sway</em>).
      <br><br>
      Effects make your desktop feel more polished and modern.
    `
  },
  {
    icon: 'rotate-right',
    title: 'Tweak, Test, Repeat',
    content: `
      Ricing is an iterative process. Don’t try to customize everything at once — start small.
      <br><br>
      Ask yourself specific questions like “How do I make my terminal transparent?” or “How do I theme Rofi?”
      <br><br>
      Explore <a href="https://reddit.com/r/unixporn" target="_blank">r/unixporn</a>, read <code>man</code> pages, and keep experimenting.
    `
  },
  {
    content: `
      When you familiarized yourself with <strong>ricing</strong> a little you can always come back here and search for new tools and software to use.
    `
  }
];

</script>