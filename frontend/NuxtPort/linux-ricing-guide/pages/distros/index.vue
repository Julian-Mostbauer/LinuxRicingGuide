<template>
  <div class="container mx-auto p-4">
    <div class="card bg-base-200 text-base-content p-6 mb-6 mt-6 shadow-lg">
      <article>
        <section class="mb-6">
          <h2 class="mb-4 text-2xl font-bold">
            <i class="fas fa-seedling"></i> Origins of Linux
          </h2>
          <p class="text-lg">
            The story of
            <strong>
              <a target="_blank" href="https://en.wikipedia.org/wiki/Linux" class="link link-primary">Linux OS</a>
            </strong>
            began in 1991 when
            <strong>
              <a target="_blank" href="https://en.wikipedia.org/wiki/Linus_Torvalds" class="link link-primary">Linus
                Torvalds</a>
            </strong>
            , a student at the University of Helsinki in Finland, developed the
            <strong>Linux kernel</strong>. Initially, the project was a hobby for Torvalds, who wanted to
            create an alternative to the
            <strong>
              <a target="_blank" href="https://en.wikipedia.org/wiki/MINIX" class="link link-primary">MINIX</a>
            </strong>
            operating system. The Linux kernel became publicly available and quickly attracted a community of
            developers eager to contribute to its growth.
          </p>
        </section>

        <section class="mb-6">
          <h2 class="mb-4 text-2xl font-bold">
            <i class="fas fa-box-open"></i> The First Distributions
          </h2>
          <p class="text-lg">
            By 1993,
            <strong>
              <a target="_blank" href="https://en.wikipedia.org/wiki/Slackware" class="link link-primary">Slackware</a>
            </strong>
            became the first commercially available Linux distribution, marking a significant step in the
            widespread adoption of Linux. This was followed by the emergence of other distributions such as
            <strong>
              <a target="_blank" href="https://en.wikipedia.org/wiki/Debian" class="link link-primary">Debian</a>
            </strong>
            ,
            <strong>
              <a target="_blank" href="https://en.wikipedia.org/wiki/Red_Hat" class="link link-primary">Red Hat</a>
            </strong>
            ,
            <strong>
              <a target="_blank" href="https://en.wikipedia.org/wiki/SUSE" class="link link-primary">SUSE</a>
            </strong>
            , and
            <strong>
              <a target="_blank" href="https://en.wikipedia.org/wiki/Ubuntu" class="link link-primary">Ubuntu</a>
            </strong>
            . Each of these distributions catered to different user needs and played a role in the growing
            popularity of Linux.
          </p>
        </section>

        <section class="mb-6">
          <h2 class="mb-4 text-2xl font-bold">
            <i class="fas fa-network-wired"></i> Rise of the Internet
          </h2>
          <p class="text-lg">
            The development of the
            <strong>internet</strong> played a crucial role in Linux's evolution. Developers from around the world
            collaborated to improve the system, creating a vibrant and thriving
            <strong>open-source community</strong>. This model of collaboration allowed Linux to evolve rapidly and
            become a powerful and versatile operating system.
          </p>
        </section>

        <section class="mb-6">
          <h2 class="mb-4 text-2xl font-bold">
            <i class="fas fa-industry"></i> Enterprise Adoption
          </h2>
          <p class="text-lg">
            In the late 1990s and early 2000s, Linux gained popularity among businesses and government
            organizations due to its stability, security, and cost-effectiveness. The development of
            <strong>server-oriented distributions</strong> made Linux a preferred choice for
            <strong>web hosting</strong> and enterprise applications.
          </p>
        </section>

        <section class="mb-6">
          <h2 class="mb-4 text-2xl font-bold">
            <i class="fas fa-mobile-alt"></i> Expansion into Mobile Devices
          </h2>
          <p class="text-lg">
            As technology advanced, Linux expanded beyond traditional computing environments. One of the most
            significant milestones was the emergence of
            <strong>
              <a target="_blank" href="https://en.wikipedia.org/wiki/Android_(operating_system)"
                class="link link-primary">Android</a>
            </strong>
            , a Linux-based operating system for smartphones and tablets. Android has since become the dominant
            mobile platform worldwide, showcasing the adaptability of the Linux kernel.
          </p>
        </section>

        <section class="mb-6">
          <h2 class="mb-4 text-2xl font-bold">
            <i class="fas fa-trophy"></i> Linux Today
          </h2>
          <p class="text-lg">
            Today, <strong>Linux</strong> continues to thrive as a cornerstone of modern computing, powering
            everything from personal desktops to
            <strong>cloud servers</strong> and
            <strong>embedded systems</strong>. Its historical journey is a testament to the power of open-source
            collaboration and innovation.
          </p>
        </section>
      </article>
    </div>
    <div>
      <ImageGrid :entries="entries" :dimensions="dimensions" :mobile-dimensions="dimensions" />
    </div>
  </div>
</template>

<script lang="ts" setup>
type entry = { imagePath: string, link: string }

const entries: entry[] = [{ imagePath: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Flogos-marcas.com%2Fwp-content%2Fuploads%2F2020%2F11%2FUbuntu-Emblema.png&f=1&nofb=1&ipt=9131eaa826134a968cf6350785fe0819a49120ed17985e272f01b0b51452798a&ipo=images', link: 'ubuntu-history.html' }, { imagePath: 'https://logodix.com/logo/1171807.png', link: 'debian-history.html' }, { imagePath: 'https://wiki.installgentoo.com/images/f/f9/Arch-linux-logo.png', link: 'arch-history.html' }, { imagePath: 'https://logodix.com/logo/675587.png', link: 'manjaro-history.html' }, { imagePath: 'https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fwww.lffl.org%2Fwp-content%2Fuploads%2F2020%2F05%2FPop_OS-20.04-1.png&f=1&nofb=1&ipt=b9813ad2b5d562eee2fa401a5fa3a2fba04b11fa74b48a883bc0148c854b6a6a&ipo=images', link: 'pop!-os-history.html' }, { imagePath: 'https://2.bp.blogspot.com/-oLPLjT8GMG0/WjKrRPTm2CI/AAAAAAAADRA/evQEjsmF_nMtCJp5xaAKWJqHsjYOxL0bgCLcBGAs/s1600/Linux_Mint_logo_without_wordmark.svg.png', link: 'mint-history.html' }, { imagePath: 'https://s3.amazonaws.com/media-p.slid.es/uploads/183933/images/1332684/elementary_logo.png', link: 'elementary-os-history.html' }, { imagePath: 'https://logospng.org/download/centos/centos-logo-1024.png', link: 'cent-os-history.html' }, { imagePath: 'https://juststickers.in/wp-content/uploads/2019/07/fedora.png', link: 'fedora-history.html' }, { imagePath: 'https://cdn.freebiesupply.com/logos/large/2x/void-logo-png-transparent.png', link: 'void-linux-history.html' }, { imagePath: 'https://cdn0.iconfinder.com/data/icons/flat-round-system/512/opensuse-512.png', link: 'openSUSE-history.html' }, { imagePath: 'https://www.qubes-os.org/attachment/icons/512x512/apps/qubes-logo-icon.png', link: 'qubes-os-history.html' }, { imagePath: 'https://freesvg.org/img/1634281368Slackware_logo.png', link: 'slackware-history.html' }, { imagePath: 'https://freepngimg.com/thumb/ubuntu/62619-vector-gentoo-icons-graphics-scalable-computer-linux.png', link: 'gentoo-history.html' }, { imagePath: 'https://pingvinus.ru/cr_images/modelImage/application/3384-logo-n9h2eb9.png', link: 'alpine-linux-history.html' }, { imagePath: 'https://freesvg.org/img/1634268452MX_Linux_logo.png', link: 'mx-linux-history.html' }, { imagePath: 'https://cdn.pixabay.com/photo/2013/03/30/00/09/operating-system-97851_1280.png', link: 'ubuntu-studio-history.html' }, { imagePath: 'https://www.edureka.co/blog/wp-content/uploads/2019/02/parrot-logo-kali-vs-parrot-edureka.png', link: 'parrot-security-os-history.html' }, { imagePath: 'https://www.freelogovectors.net/wp-content/uploads/2021/12/kali-logo-freelogovectors.net_.png', link: 'kali-linux-history.html' }, { imagePath: 'https://seekicon.com/free-icon-download/arch-linux_1.png', link: 'black-arch-linux-history.html' }, { imagePath: 'https://images.seeklogo.com/logo-png/44/1/artix-linux-logo-png_seeklogo-448539.png', link: 'artix-linux-history.html' }, { imagePath: 'https://endeavouros.com/wp-content/uploads/2019/08/EndeavourOS-logo.png', link: 'endeavour-os-history.html' }, { imagePath: 'https://www.nesabamedia.com/wp-content/uploads/2022/11/Garuda-Linux-Logo-1.png', link: 'garuda-linux-history.html' }];

const dimensions = { width: 8, height: 3 }

</script>