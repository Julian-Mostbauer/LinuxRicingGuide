import ComponentBuilder from './component-builder.js'

const cardCode = `
<div>
    <h5 class="card-title">Configure</h5>
    <form id="configurator">
        
    </form>
    <div id="links" style="display: flex; flex-direction: column">
    </div>
</div>
`

const ConfiguratorData = {
    dropdowns: {
        'Distros': {
            'Ubuntu': 'https://ubuntu.com/download', // Works
            'Debian': 'https://www.debian.org/distrib/', // Works
            'Arch Linux': 'https://www.archlinux.de/download/', // Works
            'Manjaro': 'https://manjaro.org/products', // Works
            'Pop!_OS': 'https://pop.system76.com/', // Works
            'Linux Mint': 'https://linuxmint.com/download.php', // Works
            'Elementary OS': 'https://elementary.io/', // Works
            'CentOS': 'https://www.centos.org/download/', // Works
            'Fedora': 'https://fedoraproject.org/workstation/download', // Works
            'Void Linux': 'https://voidlinux.org/download/', // Works
            'openSUSE': 'https://get.opensuse.org/leap/15.6/#download', // Works
            'Qubes OS': 'https://www.qubes-os.org/downloads/', // Works
            'Slackware': 'https://mirrors.slackware.com/slackware/slackware-iso/', // Works
            'Gentoo': 'https://www.gentoo.org/downloads/', // Works
            'Alpine Linux': 'https://alpinelinux.org/downloads/', // Works
            'MX Linux': 'https://mxlinux.org/download-links/', // Works
            'Ubuntu Studio': 'https://ubuntustudio.org/download/', // Works
            'Parrot Security OS': 'https://parrotsec.org/download/', // Works
            'Kali Linux': 'https://www.kali.org/get-kali/#kali-platforms', // Works
            'BlackArch Linux': 'https://blackarch.org/downloads.html', // Works
            'Artix Linux': 'https://artixlinux.org/download.php', // Works
            'EndeavourOS': 'https://endeavouros.com/', // Works
            'Garuda Linux': 'https://garudalinux.org/downloads', // Works
        },
        'Desktop Environments': {
            'GNOME': 'https://www.gnome.org/getting-gnome/', // Works
            'KDE': 'https://kde.org/distributions/', // Works
            'Xfce': 'https://xfce.org/download', // Works
        },
        'Package Managers': {
            'Snap': 'https://snapcraft.io/docs/installing-snapd', // Works
            'Flatpak': 'https://flatpak.org/setup/', // Works
            'APT': 'https://packages.debian.org/bookworm/apt', // Works
            'YUM': 'http://yum.baseurl.org/', // Works
            'Pacman': 'https://wiki.archlinux.org/index.php/Pacman', // Works
            'Zypper': 'https://en.opensuse.org/Portal:Zypper', // Works
            'DNF': 'https://dnf.readthedocs.io/en/latest/index.html', // Works
            'Portage': 'https://wiki.gentoo.org/wiki/Portage#Installation', // Works
        },
        'Shells': {
            'Bash': 'https://www.gnu.org/software/bash/', // Works
            'Zsh': 'https://ohmyz.sh/#install', // Works
            'Fish': 'https://fishshell.com/', // Works
        },
        'Terminals': {
            'GNOME Terminal': 'https://help.gnome.org/users/gnome-terminal/stable/', // Works
            'Konsole': 'https://konsole.kde.org/download.html', // Works
            'xfce4-terminal': 'https://docs.xfce.org/apps/xfce4-terminal/start', // Works
        },
        'Terminal Themes': {
            'Nord': 'https://github.com/nordtheme/nord', // Works
            'Dracula': 'https://github.com/dracula/dracula-theme', // Works
            'Solarized': 'https://github.com/altercation/solarized', // Works
        },
        'Window Managers': {
            'Hyprland': 'https://wiki.hyprland.org/Getting-Started/Installation/', // Works
            'i3': 'https://i3wm.org/downloads/', // Works
            'Openbox': 'http://openbox.org', // Works
            'Awesome': 'https://awesomewm.org/download/', // Works
            'bspwm': 'https://wiki.archlinux.org/title/Bspwm', // Works
        }
    }
}

const onSubmit = (event) => {
    event.preventDefault()

    const form = document.getElementById('configurator')
    const dropdowns = form.getElementsByTagName('select')

    const downloadLinks = document.getElementById('links')
    downloadLinks.innerHTML = '<h5 class="card-title mt-3">Links</h5>'

    for (const dropdown of dropdowns) {
        const downloadLink = ConfiguratorData.dropdowns[dropdown.previousElementSibling.innerText][dropdown.value]

        appendDownloadLink(downloadLink, `${dropdown.previousElementSibling.innerText} - ${dropdown.value}`)
    }
}

const appendDownloadLink = (link, text) => {
    const downloadLinks = document.getElementById('links')
    const a = document.createElement('a')
    a.className = 'btn btn-primary mt-3'
    a.target = '_blank'
    a.href = link
    a.innerHTML = `<i class="fa-solid fa-link" style="margin-right: 3px"></i>${text}`

    downloadLinks.appendChild(a)
}

const onMount = () => {
    const form = document.getElementById('configurator')
    for (const key in ConfiguratorData.dropdowns) {
        const div = document.createElement('div')
        div.className = 'form-group mt-2'

        const label = document.createElement('label')
        label.for = `${key}-select`
        label.innerText = key

        div.appendChild(label)

        const select = document.createElement('select')
        select.className = 'form-control'
        select.id = `${key}-select`


        for(const key2 in ConfiguratorData.dropdowns[key]) {
            const opt = document.createElement('option')
            opt.innerText = key2
            select.appendChild(opt)
        }

        div.appendChild(select)
        form.appendChild(div)
    }

    const button = document.createElement('button')
    button.className = 'btn btn-primary mt-3'
    button.type = 'submit'
    button.innerText = 'Submit'
    button.onclick = (event) => onSubmit(event)
    form.appendChild(button)
}

const cardBuilder = new ComponentBuilder('configurator-component', cardCode)
cardBuilder.setOnMount(onMount)
cardBuilder.build()

