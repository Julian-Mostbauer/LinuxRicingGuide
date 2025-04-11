<template>

  <div class="container mx-auto p-4">
    <Motion as="div" :variants="container" initial="hidden" animate="visible"
            class="grid grid-cols-1 md:grid-cols-1 gap-6 mb-10">
      <DistroChooser
          :questions="questions"
          :results="results"
          :onResultSelected="handleResultSelected"></DistroChooser>
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
<script setup lang="ts">
import DistroChooser from "~/components/DistroChooser.vue";
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
    icon: 'laptop',
    title: 'Overview of Linux Distributions',
    content: `
      <h3><i class="fas fa-laptop"></i> What is a Linux Distribution?</h3>
      A <strong>Linux distribution</strong> (distro) is a variation or flavor of the Linux operating system, consisting of the <strong>Linux kernel</strong> and a selection of software packages, tools, and utilities.
      Distros are designed for different purposes, such as general desktop use, servers, or specialized environments.
      <br><br>
      <h3><i class="fas fa-laptop"></i> How to Choose a Distro?</h3>
      You can also take our <strong>Quiz</strong> (above) to find the best distro for you!
    `,
  },
  {
    icon: 'hammer',
    title: 'Common Types of Linux Distros',
    content: `
      <h3><i class="fas fa-hammer"></i> Debian-based Distros</h3>
      1. <strong>Debian-based</strong>: Distros like Ubuntu, Linux Mint, and Pop!_OS are user-friendly and stable.
      These distros are great for beginners and those seeking reliability.
      <br><br>

      <h3><i class="fas fa-hammer"></i> Red Hat-based Distros</h3>
      2. <strong>Red Hat-based</strong>: Includes Fedora and CentOS, known for enterprise-level reliability. These distros are often used in professional environments.
      <br><br>

      <h3><i class="fas fa-hammer"></i> Arch-based Distros</h3>
      3. <strong>Arch-based</strong>: Arch Linux and Manjaro offer rolling releases and advanced customization. Perfect for users who want full control over their system.
      <br><br>

      <h3><i class="fas fa-hammer"></i> SUSE-based Distros</h3>
      4. <strong>SUSE-based</strong>: openSUSE is widely used in enterprise environments for its strong administration tools.
      <br><br>

      <h3><i class="fas fa-hammer"></i> Specialized Distros</h3>
      5. <strong>Specialized Distros</strong>: Such as Kali Linux for penetration testing, Raspberry Pi OS for the Raspberry Pi hardware, and Tails for privacy and anonymity.
    `,
  },
  {
    icon: 'gears',
    title: 'Tips and Tricks for Using Linux Distros',
    content: `
      <strong>Learn Package Management</strong>
      Use tools like <code>apt</code>, <code>dnf</code>, and <code>pacman</code> depending on your distro. This is essential for installing, updating, and managing software packages.
      <br><br>

      <strong>Customize Your Desktop Environment</strong>
      Change themes, install new desktop environments, and personalize your workflow. Options like GNOME, KDE, and XFCE provide flexibility and a range of user experiences.
      <br><br>

      <strong>Use the Terminal</strong>
      Mastering basic terminal commands will greatly enhance your productivity and control over your system.
      <br><br>

      <strong>Get Familiar with the Linux File System</strong>
      Understand key directories like <code>/home</code>, <code>/etc</code>, and <code>/usr</code> for smoother navigation and system management.
      <br><br>

      <strong>Use Virtual Desktops</strong>
      Organize workspaces to improve your workflow, especially when multitasking.
      <br><br>

      <strong>Backup Your System</strong>
      Use tools like <code>rsync</code>, <code>Deja Dup</code>, and <code>Timeshift</code> to ensure your system and data are safe from unexpected failures.
      <br><br>

      <strong>Security</strong>
      Regularly update your system, use firewalls, and consider security tools like AppArmor and SELinux for additional protection.
      <br><br>

      <strong>Explore Software Repositories</strong>
      Install software via your package manager or add third-party repositories for specialized software.
      <br><br>

      <strong>Try a Live USB</strong>
      Boot and test distros from a USB drive without installing them on your system, making it easy to experiment without commitment.
      <br><br>

      <strong>Learn About Systemd</strong>
      Systemd is the default init system for many distros. Understanding how it works will help you manage system services and boot processes.
    `,
  },
];


</script>