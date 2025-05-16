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
                                <DynamicIcon :names="{ default: section.icon }" class="mr-2" />
                                {{ section.title }}
                            </h2>
                            <span class="text-md flex-grow" v-html="section.content"></span>

                            <CodeBlock v-if="section.command" :command="section.command" />
                        </section>
                    </div>
                </GradientOutline>

            </Motion>
        </Motion>
    </div>
</template>

<script lang="ts" setup>
import { Motion } from 'motion-v'

definePageMeta({
    icons: { default: 'window-maximize' },
})

const container = {
    hidden: { opacity: 0, scale: 0.95 }, // Adjusted to avoid layout shift
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
    hidden: { y: 20, opacity: 0, scale: 0.85 },
    visible: {
        y: 0,
        opacity: 1,
        scale: 1,
    },
}

const sections = [
    {
        title: 'What is a Window Manager?',
        icon: 'window-maximize',
        content: `
            <p>A window manager is a system software that controls the placement and appearance of windows within a graphical user interface (GUI). It manages the layout, size, and behavior of application windows, allowing users to interact with multiple applications simultaneously.</p>
            <p>Window managers can be standalone or part of a desktop environment. They provide features like window decoration, resizing, moving, and minimizing/maximizing windows. Some popular window managers include i3, Openbox, and Xmonad.</p>

            <DevOnly>They add a certain ammount of swag.</DevOnly>
        `,
    },
    {
        title: 'Types of Window Managers',
        icon: 'layer-group',
        content: `
            <p>There are several types of window managers, each with its own approach to managing windows:</p>
            <ul>
                <li><strong>Tiling Window Managers</strong>: Automatically arrange windows in a non-overlapping manner, maximizing screen space. Examples include i3.</li>
                <li><strong>Stacking Window Managers</strong>: Allow windows to overlap, similar to traditional desktop environments. Examples include Openbox.</li>
                <li><strong>Compositing Window Managers</strong>: Provide advanced visual effects like transparency and shadows. Examples include Compiz.</li>
            </ul>
        `,
    },
    {
        content: 'Tiling Manager: i3',
        command: 'sudo apt install i3',
    },
    {
        content: 'Stacking Manager: Openbox',
        command: 'sudo apt install openbox',
    },
    {
        content: 'Compositing Manager: Compiz',
        command: 'sudo apt install compiz',
    },
]

</script>