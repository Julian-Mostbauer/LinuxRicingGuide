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
    icon: 'window',
    title: 'Pick a DE or WM',
    content: `
      Honestly, <strong>anything can be riced</strong>. You can use a full-featured DE like <strong>GNOME</strong> or go minimal with <strong>i3</strong>, <strong>Sway</strong>, or even just a terminal with <strong>tmux + powerline</strong>.
      Starting with a DE can help you ease in, since many visual settings (like icons and GTK themes) carry over into WMs too.
    `
  },
  {
    icon: 'palette',
    title: 'Figure Out Colors',
    content: `
      Ricing is all about <strong>cohesive visual identity</strong>. You'll want to theme your <em>window borders, menus, icons, and GTK apps</em>.
      To find themes you can check out our Theme Page, and apply them with <strong>GNOME Tweaks</strong>.
      You can also edit <code>~/.config/gtk-3.0/settings.ini</code> directly for more control.
    `
  },
  {
    icon: 'droplet',
    title: 'Use pywal for Theming',
    content: `
      <strong>pywal</strong> is a great tool to generate color schemes from an image. It applies your palette to terminals, bars, and more.
      You can even extend it to work with other apps like <strong>Firefox, dunst, mako</strong>, and more using templates.
    `
  },
  {
    icon: 'book-open',
    title: 'Read the Man Pages',
    content: `
      Most tools you'll use in ricing (like <code>i3</code>, <code>picom</code>, <code>dunst</code>) have <strong>man pages</strong> that are goldmines of info.
      They contain <em>configuration values, usage examples, and hidden flags</em> that tutorials often skip.
    `
  },
  {
    icon: 'help-circle',
    title: 'Ask Specific Questions',
    content: `
      Avoid vague questions like “<em>How do I rice?</em>”. Instead, ask focused things like:<br>
      - How to make terminals transparent?<br>
      - How to style rofi menus?<br>
      - How to center notifications in dunst?<br>
      This gets you better answers, faster.
    `
  },
  {
    icon: 'image',
    title: 'Browse r/unixporn',
    content: `
      The best source of inspiration is <a href="https://reddit.com/r/unixporn" target="_blank">r/unixporn</a>.
      See what other people are doing, figure out <strong>which tools and themes</strong> they use, and build your setup based on what you love.
      Just remember: many setups are screenshot-perfect, but the real fun is in building one that fits <em>your workflow</em>.
    `
  }
];

</script>