<script setup lang="ts">
definePageMeta({
    icons: {
        default: 'gears',
    }
});

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

let downloadLinks =  ref<Record<string, string>>({})

function submitForm(event: Event) {
    event.preventDefault();

    const form = document.getElementById('configurator')
    const dropdowns = form.getElementsByTagName('select')

    const linksWrapper = document.getElementById('links-wrapper')
    linksWrapper.classList.remove('hidden')

    for (const dropdown of dropdowns) {
        const downloadLink = ConfiguratorData.dropdowns[dropdown.id][dropdown.value];

        if (downloadLink) {
            downloadLinks.value[downloadLink] = `${dropdown.previousElementSibling.innerText} - ${dropdown.value}`;
        } else {
            console.warn(`No link found for ${dropdown.value}`);
        }
    }
}
</script>

<template>
    <Motion :initial="{ scale: 0 }" :while-in-view="{ scale: 1 }" :in-view-options="{ once: true }" :transition="{ type: 'spring', stiffness: 250, damping: 20, delay: 0.25 }">
        <GradientOutline circle-width="300px" class-name="w-96 mr-10">
            <div class="card h-full w-full bg-base-200 shadow-lg">
                <div class="card-body w-full">
                    <h2 class="card-title">Configurator</h2>
                    <form id="configurator" @submit="submitForm">
                        <div v-for="(dropdown, dropdownName) in ConfiguratorData.dropdowns" class="mt-2 w-full" :key="dropdownName">
                            <label :for="dropdownName" class="label">{{dropdownName}}</label>
                            <select :id="dropdownName" class="select">
                                <option v-for="(link, name) in dropdown" :key="name" :value="name">
                                    {{ name }}
                                </option>
                            </select>
                        </div>
                        <button @click="" class="btn btn-primary text-base-200 mt-4">
                            <DynamicIcon :names="{default: 'paper-plane'}" />
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </GradientOutline>
    </Motion>

    <Motion :initial="{ scale: 0 }" :while-in-view="{ scale: 1 }" :in-view-options="{ once: true }" :transition="{ type: 'spring', stiffness: 250, damping: 20, delay: 0.25 }" class="hidden" id="links-wrapper">
        <GradientOutline circle-width="300px" class-name="w-170 ml-10">
            <div class="card h-full w-full bg-base-200 shadow-lg">
                <div class="card-body w-full">
                    <h2 class="card-title">Download Links</h2>
                    <div id="links" style="display: flex; flex-direction: column">
                        <a v-for="(text, link) in downloadLinks" :key="link" class="btn btn-soft mt-3" target="_blank" :href="link">
                            <DynamicIcon :names="{default: 'arrow-up-right-from-square'}" />
                            {{ text }}
                        </a>
                    </div>
                </div>
            </div>
        </GradientOutline>
    </Motion>

</template>

<style scoped>

</style>