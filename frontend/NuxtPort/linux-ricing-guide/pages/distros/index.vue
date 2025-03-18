<template>
  <div class="container mx-auto p-4">
    <Motion as="div" :variants="container" initial="hidden" animate="visible"
      class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
      <Motion v-for="(section, index) in sections" :key="index" :variants="items" class="w-full">
        <GradientOutline circle-width="200px">
          <div class="card bg-base-200 text-base-content p-6 h-full">
            <section class="mb-6 h-full flex flex-col">
              <h2 class="mb-4 text-xl font-bold">
                <DynamicIcon :names="{ default: section.icon }" /> {{ section.title }}
              </h2>
              <p class="text-md flex-grow" v-html="section.content"></p>
            </section>
          </div>
        </GradientOutline>
      </Motion>
    </Motion>

    <div>
      <ImageGrid :entries="entries" :dimensions="{ width: 8, height: 3 }" :mobileDimensions="{ width: 2, height: 12 }"
        linkPrefix='distros/history/' />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Motion } from 'motion-v'

definePageMeta({
  icons: { default: 'database' },
});

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

type entry = {
  imagePath: string,
  link: string
}

const entries: entry[] = [{
  imagePath: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogos-marcas.com%2Fwp-content%2Fuploads%2F2020%2F11%2FUbuntu-Emblema.png&f=1&nofb=1&ipt=9131eaa826134a968cf6350785fe0819a49120ed17985e272f01b0b51452798a&ipo=images',
  link: 'ubuntu-history'
},
{
  imagePath: 'https://logodix.com/logo/1171807.png',
  link: 'debian-history'
},
{
  imagePath: 'https://wiki.installgentoo.com/images/f/f9/Arch-linux-logo.png',
  link: 'arch-history'
},
{
  imagePath: 'https://logodix.com/logo/675587.png',
  link: 'manjaro-history'
},
{
  imagePath: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.lffl.org%2Fwp-content%2Fuploads%2F2020%2F05%2FPop_OS-20.04-1.png&f=1&nofb=1&ipt=b9813ad2b5d562eee2fa401a5fa3a2fba04b11fa74b48a883bc0148c854b6a6a&ipo=images',
  link: 'pop!-os-history'
},
{
  imagePath: 'https://2.bp.blogspot.com/-oLPLjT8GMG0/WjKrRPTm2CI/AAAAAAAADRA/evQEjsmF_nMtCJp5xaAKWJqHsjYOxL0bgCLcBGAs/s1600/Linux_Mint_logo_without_wordmark.svg.png',
  link: 'mint-history'
},
{
  imagePath: 'https://s3.amazonaws.com/media-p.slid.es/uploads/183933/images/1332684/elementary_logo.png',
  link: 'elementary-os-history'
},
{
  imagePath: 'https://logospng.org/download/centos/centos-logo-1024.png',
  link: 'cent-os-history'
},
{
  imagePath: 'https://juststickers.in/wp-content/uploads/2019/07/fedora.png',
  link: 'fedora-history'
},
{
  imagePath: 'https://www.kindpng.com/picc/m/97-975947_void-linux-logo-png-transparent-png.png',
  link: 'void-linux-history'
},
{
  imagePath: 'https://cdn0.iconfinder.com/data/icons/flat-round-system/512/opensuse-512.png',
  link: 'openSUSE-history'
},
{
  imagePath: 'https://www.qubes-os.org/attachment/icons/512x512/apps/qubes-logo-icon.png',
  link: 'qubes-os-history'
},
{
  imagePath: 'https://freesvg.org/img/1634281368Slackware_logo.png',
  link: 'slackware-history'
},
{
  imagePath: 'https://freepngimg.com/thumb/ubuntu/62619-vector-gentoo-icons-graphics-scalable-computer-linux.png',
  link: 'gentoo-history'
},
{
  imagePath: 'https://pingvinus.ru/cr_images/modelImage/application/3384-logo-n9h2eb9.png',
  link: 'alpine-linux-history'
},
{
  imagePath: 'https://freesvg.org/img/1634268452MX_Linux_logo.png',
  link: 'mx-linux-history'
},
{
  imagePath: 'https://cdn.pixabay.com/photo/2013/03/30/00/09/operating-system-97851_1280.png',
  link: 'ubuntu-studio-history'
},
{
  imagePath: 'https://www.edureka.co/blog/wp-content/uploads/2019/02/parrot-logo-kali-vs-parrot-edureka.png',
  link: 'parrot-security-os-history'
},
{
  imagePath: 'https://www.freelogovectors.net/wp-content/uploads/2021/12/kali-logo-freelogovectors.net_.png',
  link: 'kali-linux-history'
},
{
  imagePath: 'https://seekicon.com/free-icon-download/arch-linux_1.png',
  link: 'black-arch-linux-history'
},
{
  imagePath: 'https://images.seeklogo.com/logo-png/44/1/artix-linux-logo-png_seeklogo-448539.png',
  link: 'artix-linux-history'
},
{
  imagePath: 'https://endeavouros.com/wp-content/uploads/2019/08/EndeavourOS-logo.png',
  link: 'endeavour-os-history'
},
{
  imagePath: 'https://www.nesabamedia.com/wp-content/uploads/2022/11/Garuda-Linux-Logo-1.png',
  link: 'garuda-linux-history'
},
{
  imagePath: 'https://lignux.com/wp-content/uploads/2013/08/trisquel.jpg',
  link: 'trisquel-history'
}
];

const sections = [
  {
    icon: 'seedling',
    title: 'Origins of Linux',
    content: `
      The story of <strong>Linux OS</strong> began in 1991 when <strong>Linus Torvalds</strong>, a student at
      the University of Helsinki in Finland, developed the <strong>Linux kernel</strong>. Initially, the project
      was a hobby for Torvalds, who wanted to create an alternative to the <strong>MINIX</strong> operating
      system. The Linux kernel became publicly available and quickly attracted a community of developers eager
      to contribute to its growth.
    `,
  },
  {
    icon: 'box-open',
    title: 'The First Distributions',
    content: `
      By 1993, <strong>Slackware</strong> became the first commercially available Linux distribution, marking a
      significant step in the widespread adoption of Linux. This was followed by the emergence of other
      distributions such as <strong>Debian</strong>, <strong>Red Hat</strong>, <strong>SUSE</strong>, and
      <strong>Ubuntu</strong>. Each of these distributions catered to different user needs and played a role in
      the growing popularity of Linux.
    `,
  },
  {
    icon: 'network-wired',
    title: 'Rise of the Internet',
    content: `
      The development of the <strong>internet</strong> played a crucial role in Linux's evolution. Developers
      from around the world collaborated to improve the system, creating a vibrant and thriving
      <strong>open-source community</strong>. This model of collaboration allowed Linux to evolve rapidly and
      become a powerful and versatile operating system.
    `,
  },
  {
    icon: 'industry',
    title: 'Enterprise Adoption',
    content: `
      In the late 1990s and early 2000s, Linux gained popularity among businesses and government organizations
      due to its stability, security, and cost-effectiveness. The development of <strong>server-oriented
      distributions</strong> made Linux a preferred choice for <strong>web hosting</strong> and enterprise
      applications.
    `,
  },
  {
    icon: 'mobile',
    title: 'Expansion into Mobile Devices',
    content: `
      As technology advanced, Linux expanded beyond traditional computing environments. One of the most
      significant milestones was the emergence of <strong>Android</strong>, a Linux-based operating system for
      smartphones and tablets. Android has since become the dominant mobile platform worldwide, showcasing the
      adaptability of the Linux kernel.
    `,
  },
  {
    icon: 'trophy',
    title: 'Linux Today',
    content: `
      Today, <strong>Linux</strong> continues to thrive as a cornerstone of modern computing, powering
      everything from personal desktops to <strong>cloud servers</strong> and <strong>embedded systems</strong>.
      Its historical journey is a testament to the power of open-source collaboration and innovation.
    `,
  },
]
</script>