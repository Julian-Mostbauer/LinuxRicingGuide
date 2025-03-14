<template>
  <div>
    <div class="flex flex-col items-center">
      <SmallImageCard title="Snap"
        description="Snap is a software packaging and deployment system developed by Canonical for operating systems that use the Linux kernel. The packages, called snaps, and the tool for using them, snapd, work across a range of Linux distributions and allow upstream software developers to distribute their applications directly to users."
        link="https://snapcraft.io/"
        image-path="https://dashboard.snapcraft.io/site_media/appmedia/2018/07/io.snapcraft.Store.png"></SmallImageCard>

      <SmallImageCard title="Flatpak"
        description="Flatpak is a software utility for software deployment, package management, and application virtualization for Linux desktop computers. It provides a sandbox environment in which users can run applications in isolation from the rest of the system."
        link="https://flatpak.org/"
        image-path="https://fedoraproject.org/w/uploads/thumb/8/8a/Flatpak_Logo.svg/2048px-Flatpak_Logo.svg.png">
      </SmallImageCard>

      <SmallImageCard title="APT"
        description="Advanced Package Tool, or APT, is a free-software user interface that works with core libraries to handle the installation and removal of software on Debian, Ubuntu, and related Linux distributions. APT simplifies the process of managing software on Unix-like computer systems by automating the retrieval, configuration, and installation of software packages, either from precompiled files or by compiling source code."
        link="https://wiki.debian.org/Apt" image-path="https://logodix.com/logo/1171807.png"></SmallImageCard>

      <SmallImageCard title="YUM"
        description="Yellowdog Updater, Modified (YUM) is a free and open-source command-line package-management utility for computers running the Linux operating system using the RPM Package Manager. Though YUM has a command-line interface, several other tools provide graphical user interfaces to YUM functionality."
        link="http://yum.baseurl.org/gitweb/"
        image-path="https://upload.wikimedia.org/wikipedia/commons/thumb/6/67/YUM_logo.svg/1920px-YUM_logo.svg.png">
      </SmallImageCard>

      <SmallImageCard title="Pacman"
        description="Pacman is a package manager utility that tracks installed packages on a Linux system. It features dependency support, package groups, install and uninstall scripts, and the ability to sync your local machine with a remote repository to automatically upgrade packages."
        link="https://wiki.archlinux.org/index.php/Pacman"
        image-path="https://wiki.installgentoo.com/images/f/f9/Arch-linux-logo.png"></SmallImageCard>

      <SmallImageCard title="Zypper"
        description="Zypper is a command-line package manager for installing, updating, and removing packages on the openSUSE and SUSE Linux Enterprise distributions. It is similar to apt or yum, but with some differences in the way it works."
        link="https://en.opensuse.org/Portal:Zypper"
        image-path="https://cdn0.iconfinder.com/data/icons/flat-round-system/512/opensuse-512.png"></SmallImageCard>

      <SmallImageCard title="DNF"
        description="DNF is a software package manager for RPM-based Linux distributions such as Fedora, RHEL, CentOS, and others. It is the next-generation version of the Yellowdog Updater, Modified (YUM) package manager."
        link="https://dnf.readthedocs.io/en/latest/"
        image-path="https://upload.wikimedia.org/wikipedia/commons/9/95/DNF_logo.png"></SmallImageCard>

      <SmallImageCard title="Portage"
        description="Portage is a package management system originally created for and used by Gentoo Linux and also by Chrome OS, Sabayon, and Funtoo Linux among others. Portage is based on the concept of ports collections. Gentoo is sometimes referred to as a meta-distribution due to the extreme flexibility of Portage, which makes it operating-system-independent."
        link="https://wiki.gentoo.org/wiki/Portage"
        image-path="https://freepngimg.com/thumb/ubuntu/62619-vector-gentoo-icons-graphics-scalable-computer-linux.png">
      </SmallImageCard>
    </div>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  icon: 'cube',
});
</script>
