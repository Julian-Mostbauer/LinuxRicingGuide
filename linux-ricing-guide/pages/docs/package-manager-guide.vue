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
                            <p class="text-md flex-grow" v-html="section.content"></p>

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
    icons: { default: 'database' },
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
        title: 'Package Manager Guide',
        icon: 'cube',
        content: `
      This guide will help you understand the different package managers available on Linux.
      <br>
      <strong>Package managers</strong> are tools that automate the process of installing, upgrading, configuring, and removing software packages.
      <br>
      They are essential for managing software on Linux systems.
    `,
    },
    {
        title: 'Popular Package Managers',
        icon: 'clock',
        content: `
      <ClientOnly>
      <ul>
        <li><strong>APT</strong> (Advanced Package Tool) - Used in Debian-based distributions like Ubuntu.</li>
        <li><strong>DNF</strong> (Dandified YUM) - Used in Fedora and Red Hat-based distributions.</li>
        <li><strong>Pacman</strong> - The package manager for Arch Linux and its derivatives.</li>
        <li><strong>Zypper</strong> - The command line package manager for openSUSE.</li>
      </ul>
      </ClientOnly>
    `,
    },
    {
        title: 'Installing Software',
        icon: 'download',
        content: `
      <ClientOnly>
      <p>To install software using a package manager, you typically use a command in the terminal. Here are some examples:</p>
      </ClientOnly>
    `,
    },
    {
        content: 'To install package-name on APT',
        command: `
        sudo apt install package-name
        `,
    },
    {
        content: 'To install package-name on DNF',
        command: `
        sudo dnf install package-name
        `,
    },
    {
        content: 'To install package-name on Pacman',
        command: `
        sudo pacman -S package-name
        `,
    },
    {
        content: 'To install package-name on Zypper',
        command: `
        sudo zypper install package-name
        `,
    },
    {
        title: 'Finding Software',
        icon: 'magnifying-glass',
        content: `
      <ClientOnly>
      <p>To find software available for installation, you can use the following commands:</p>
      </ClientOnly>
    `,
    },
    {
        content: 'To search package-name on APT',
        command: `
        apt search package-name
        `,
    },
    {
        content: 'To search package-name on DNF',
        command: `
        dnf search package-name
        `,
    },
    {
        content: 'To search package-name on Pacman',
        command: `
        pacman -Ss package-name
        `,
    },
    {
        content: 'To search package-name on Zypper',
        command: `
        zypper search package-name
        `,
    },
    {
        title: 'Updating and Maintaining Software',
        icon: 'rotate',
        content: `
        <CLientOnly>
        <p>To keep your system and software up to date, you can use the following commands:</p>
        </ClientOnly>
        `,
    },
    {
        content: 'To update package-name on APT',
        command: `
        sudo apt update
        `,
    },
    {
        content: 'or',
        command: `
        sudo apt upgrade
        `,
    },
    {
        content: 'To update package-name on DNF',
        command: `
        sudo dnf upgrad
        `,
    },
    {
        content: 'To update package-name on Pacman',
        command: `
        sudo pacman -Syu
        `,
    },
    {
        content: 'To update package-name on Zypper',
        command: `
        sudo zypper refresh
        `,
    },
    {
        content: 'or',
        command: `
        sudo zypper update
        `,
    },
]

</script>