const distroData = {
    'arch-linux': {
        nutshell:
            'Arch Linux is a lightweight, rolling-release distribution that follows the KISS (Keep It Simple, Stupid) philosophy, giving users complete control over their system. It provides a minimal base installation, requiring manual setup and configuration, making it ideal for advanced users. Arch uses the Pacman package manager and offers access to the AUR (Arch User Repository) for a vast range of software. Known for its excellent documentation via the Arch Wiki, it delivers a constantly updated system with the latest software while prioritizing simplicity and customization.',
        logo: 'https://wiki.installgentoo.com/images/f/f9/Arch-linux-logo.png',
        features: [
            {
                year: '2002',
                title: 'Founding of Arch Linux',
                description:
                    'Arch Linux was founded by Judd Vinet, a Canadian programmer, who was inspired by the simplicity of CRUX, another minimalist Linux distribution. He aimed to create a lightweight and flexible system that adhered to the KISS (Keep It Simple, Stupid) philosophy. The first version, Arch Linux 0.1 (Homer), was released on March 11, 2002, marking the beginning of what would become one of the most influential Linux distributions.',
            },
            {
                year: '2003',
                title: 'Pacman and First Full Release',
                description:
                    "In 2003, Arch Linux gained its first major full release with version 0.5 (Nova). This year was significant because Pacman, Arch’s powerful package manager, was further improved to handle automatic dependency resolution, making software management more efficient. Pacman became one of Arch Linux's defining features, distinguishing it from many other distributions",
            },
            {
                year: '2007',
                title: 'Community-Driven Development',
                description:
                    'Judd Vinet stepped down as the lead developer in 2007, passing the project to Aaron Griffin. This marked the transition of Arch Linux from a personal project to a community-driven distribution. Under Griffin’s leadership, the Arch Linux community flourished, and the Arch User Repository (AUR) grew into a vital part of the ecosystem, enabling users to easily share and install packages.',
            },
            {
                year: '2012',
                title: 'Systemd Adoption',
                description:
                    'In 2012, Arch Linux made a controversial but forward-thinking decision to adopt systemd as its default init system, replacing the traditional SysVinit. This move aligned Arch with modern Linux development trends, improving boot speed and system management. Though divisive at the time, it helped solidify Arch as a cutting-edge distribution that prioritizes modern technology.',
            },
            {
                year: '2020',
                title: 'Arch Linux Installer and ISO Changes',
                description:
                    'A major change came in 2020 with the introduction of an official guided installer (archinstall), making the installation process more accessible to newcomers while still allowing manual setup. Additionally, Arch Linux ISOs began shipping with zstd compression, significantly speeding up package installation. These improvements reflected Arch’s balance between minimalism and usability.',
            },
            {
                year: '2023',
                title: '21 Years of Rolling Releases',
                description:
                    'By 2023, Arch Linux celebrated over two decades of continuous development, maintaining its position as a leading rolling-release distribution. It remained popular among Linux power users and developers, thanks to its customizability, cutting-edge software, and strong community support.',
            },
        ],
        founderImage: '/frontend/assets/img-distros-history/judd-vinet.webp',
    },
    debian: {
        nutshell:
            'Debian is one of the most influential Linux distributions in the open-source community. Known for its stability, security, and dedication to free software principles, it has served as the foundation for numerous other distributions, including Ubuntu, Linux Mint, and Kali Linux. Debian’s commitment to collaboration, its robust package management system (APT), and its community-driven development model have set high standards for the Linux ecosystem. As one of the oldest Linux distributions, Debian remains a cornerstone of open-source software development.',
        logo: 'https://logodix.com/logo/1171807.png',
        founderImage: '/frontend/assets/img-distros-history/ian-murdock.webp',
        features: [
            {
                year: '1993',
                title: 'The Beginning',
                description:
                    'Debian was founded by Ian Murdock, who announced the project on August 16, 1993, as "the Debian Linux Release." Unlike other distributions at the time, Debian was envisioned as a collaborative effort guided by the open-source community rather than a single individual or company. The project’s name combined his name (Ian) and that of his then-girlfriend, Debra.',
            },
            {
                year: '1994',
                title: 'The First Release',
                description:
                    'Debian 0.91 was released, featuring a simple package system and 474 software packages. The project began attracting developers and users who appreciated its community-centric philosophy.',
            },
            {
                year: '1996',
                title: 'The Debian Social Contract',
                description:
                    'Debian introduced the Debian Social Contract and the Free Software Guidelines (DFSG), formalizing its commitment to free software and community-driven development. These documents became foundational for the open-source community and inspired other projects like the Open Source Definition.',
            },
            {
                year: '1999',
                title: 'Debian 2.1 "Slink"',
                description:
                    'Debian 2.1, code-named "Slink," was released, marking a significant milestone as it introduced the Advanced Package Tool (APT). APT simplified software installation and updates, becoming a defining feature of Debian and its derivatives.',
            },
            {
                year: '2002',
                title: 'The Birth of Debian Derivatives',
                description:
                    'Ubuntu’s founder, Mark Shuttleworth, announced his intention to create a user-friendly Linux distribution based on Debian, leading to Ubuntu’s first release in 2004. This marked the beginning of Debian’s role as a base for countless derivatives.',
            },
            {
                year: '2005',
                title: 'The Rise of Debian on Servers',
                description:
                    'Debian solidified its reputation as a stable and reliable operating system, becoming a popular choice for servers worldwide. Its stability and vast package repository made it ideal for enterprises and web hosting services.',
            },
            {
                year: '2009',
                title: 'Debian 5.0 "Lenny"',
                description:
                    'Debian 5.0 introduced several modern features, including support for the NTFS file system, the ability to run on ARM architecture, and compatibility with newer hardware. It also included over 23,000 software packages.',
            },
            {
                year: '2013',
                title: 'Debian Turns 20',
                description:
                    'Debian celebrated its 20th anniversary, marking two decades of contributions to the open-source community. The project had grown significantly, with hundreds of developers and millions of users worldwide.',
            },
            {
                year: '2015',
                title: 'Systemd Adoption',
                description:
                    'Debian 8.0 "Jessie" adopted systemd as the default init system, sparking debates in the community but aligning with broader trends in the Linux world.',
            },
            {
                year: '2021',
                title: 'Debian 11 "Bullseye"',
                description:
                    'Debian 11 was released with updated software, improved security features, and expanded hardware support. It showcased the project’s ongoing commitment to providing a stable, reliable, and modern operating system.',
            },
            {
                year: '2023',
                title: '30 Years of Debian',
                description:
                    'Debian celebrated its 30th anniversary, reflecting on its impact on the Linux community and its enduring role in shaping open-source software development.',
            },
        ],
    },
}


const getDistroData = (distroName) => {
    return distroData[distroName]
}

export default getDistroData
