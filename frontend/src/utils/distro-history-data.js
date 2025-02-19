const distroData = {
  'arch-linux': {
    'nutshell':'Arch Linux is a lightweight, rolling-release distribution that follows the KISS (Keep It Simple, Stupid) philosophy, giving users complete control over their system. It provides a minimal base installation, requiring manual setup and configuration, making it ideal for advanced users. Arch uses the Pacman package manager and offers access to the AUR (Arch User Repository) for a vast range of software. Known for its excellent documentation via the Arch Wiki, it delivers a constantly updated system with the latest software while prioritizing simplicity and customization.',
    'logo':'https://wiki.installgentoo.com/images/f/f9/Arch-linux-logo.png',
    'features':[
      {
        'year':'2002',
        'title':'Founding of Arch Linux',
        'description':'Arch Linux was founded by Judd Vinet, a Canadian programmer, who was inspired by the simplicity of CRUX, another minimalist Linux distribution. He aimed to create a lightweight and flexible system that adhered to the KISS (Keep It Simple, Stupid) philosophy. The first version, Arch Linux 0.1 (Homer), was released on March 11, 2002, marking the beginning of what would become one of the most influential Linux distributions.'
      },
      {
        'year':'2003',
        'title':'Pacman and First Full Release',
        'description':'In 2003, Arch Linux gained its first major full release with version 0.5 (Nova). This year was significant because Pacman, Arch’s powerful package manager, was further improved to handle automatic dependency resolution, making software management more efficient. Pacman became one of Arch Linux\'s defining features, distinguishing it from many other distributions'
      },
      {
        'year':'2007',
        'title':'Community-Driven Development',
        'description':'Judd Vinet stepped down as the lead developer in 2007, passing the project to Aaron Griffin. This marked the transition of Arch Linux from a personal project to a community-driven distribution. Under Griffin’s leadership, the Arch Linux community flourished, and the Arch User Repository (AUR) grew into a vital part of the ecosystem, enabling users to easily share and install packages.'
      },
      {
        'year':'2012',
        'title':'Systemd Adoption',
        'description':'In 2012, Arch Linux made a controversial but forward-thinking decision to adopt systemd as its default init system, replacing the traditional SysVinit. This move aligned Arch with modern Linux development trends, improving boot speed and system management. Though divisive at the time, it helped solidify Arch as a cutting-edge distribution that prioritizes modern technology.'
      },
      {
        'year':'2020',
        'title':'Arch Linux Installer and ISO Changes',
        'description':'A major change came in 2020 with the introduction of an official guided installer (archinstall), making the installation process more accessible to newcomers while still allowing manual setup. Additionally, Arch Linux ISOs began shipping with zstd compression, significantly speeding up package installation. These improvements reflected Arch’s balance between minimalism and usability.'
      },
      {
        'year':'2023',
        'title':'21 Years of Rolling Releases',
        'description':'By 2023, Arch Linux celebrated over two decades of continuous development, maintaining its position as a leading rolling-release distribution. It remained popular among Linux power users and developers, thanks to its customizability, cutting-edge software, and strong community support.'
      }
    ],
    'founderImage':'/frontend/assets/img-distros-history/judd-vinet.webp',
  },
}


const getDistroData = (distroName) => {
  return distroData[distroName];
}

export default getDistroData;