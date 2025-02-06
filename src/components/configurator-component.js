import ComponentBuilder from './component-builder.js'

const cardCode = `
<div>
    <h5 class="card-title">Configure</h5>
    <form id="configurator">
        
    </form>
    <div id="download-links" style="display: flex; flex-direction: column">
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
        }
    }
}

const onSubmit = (event) => {
    event.preventDefault()

    const form = document.getElementById('configurator')
    const dropdowns = form.getElementsByTagName('select')

    const downloadLinks = document.getElementById('download-links')
    downloadLinks.innerHTML = '<h5 class="card-title mt-3">Download Links</h5>'

    for (const dropdown of dropdowns) {
        const downloadLink = ConfiguratorData.dropdowns[dropdown.previousElementSibling.innerText][dropdown.value]

        appendDownloadLink(downloadLink, `${dropdown.previousElementSibling.innerText} - ${dropdown.value}`)
    }
}

const appendDownloadLink = (link, text) => {
    const downloadLinks = document.getElementById('download-links')
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
        div.className = 'form-group'

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
cardBuilder.addOnMount(onMount)
cardBuilder.build()

