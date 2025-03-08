<script setup lang="ts">
</script>

<template>
  <div class="container mx-auto p-8">
    <div class="card text-neutral-content p-6 mb-6">
      <article>
        <section class="mb-6">
          <h2 class="text-4xl font-bold flex items-center gap-2">
            <Icon name="fa6-solid:bowl-rice" size="64" />
            What is Linux <i>Ricing?</i>
          </h2>
          <p class="mt-2">
            <i>Ricing</i> is similar to the modding or tuning community, but for your computer. It involves
            customizing your desktop to make it look more visually appealing by changing themes, icons, fonts,
            and other visual elements.
          </p>
        </section>

        <section>
          <h2 class="text-2xl font-bold flex items-center gap-2 mb-4">
            <Icon name="fa6-solid:circle-info" size="32" />
            General Overview
          </h2>
          <div class="flex flex-row gap-8">
            <div>
              <ul class="list-none space-y-3">
                <li class="p-4 bg-base-200 rounded-lg">
                  <strong>Window-Manager:</strong>
                  Users may prefer lightweight options like i3 or Openbox or complex ones like GNOME or KDE Plasma.
                </li>
                <div class="divider"></div>
                <li class="p-4 bg-base-200 rounded-lg">
                  <strong>Wallpaper:</strong> Choose from various wallpapers to personalize your desktop.
                </li>
                <div class="divider"></div>
                <li class="p-4 bg-base-200 rounded-lg">
                  <strong>Icons:</strong> Replace desktop icons to match your system's aesthetic.
                </li>
                <div class="divider"></div>
                <li class="p-4 bg-base-200 rounded-lg">
                  <strong>Fonts:</strong> Select fonts like
                  <a target="_blank" href="https://github.com/ryanoasis/nerd-fonts"
                    class="link link-primary">Nerd-Fonts</a>
                  to enhance your system's look.
                </li>
              </ul>
            </div>
            <div class="divider divider-horizontal"></div>
            <div class="flex flex-grow">
              <div class="p-4 bg-base-200 rounded-lg flex-grow">
                <strong>Themes:</strong>
                <ul class="list-disc pl-6 mt-2">
                  <li>GTK or QT Themes for colors and widgets.</li>
                  <li>Icon packs for system-wide icons.</li>
                  <li>Terminal themes for colors and fonts.</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </article>
    </div>

    <div class="m-8 grid grid-cols-1 md:grid-cols-4 gap-4">
      <BigImageCard imagePath="img/card-distributions.webp" title="Distributions"
        description="List of some linux distributions you can use. These contain common but also some exotic ones."
        link="distros/"></BigImageCard>

      <BigImageCard imagePath="img/card-package-managers.webp" title="Package Managers"
        description="Selection of Package Managers you can use to install software on your linux machine."
        link="package-managers"></BigImageCard>

      <BigImageCard imagePath="img/card-setups.webp" title="Setups"
        description="Showcase of our personal setups we use on our machines. Feel free to get inspired and copy some aspects."
        link="personal-setups"></BigImageCard>

      <BigImageCard imagePath="img/card-window-manager.webp" title="Window-Managers"
        description="Controls the appearance, and behavior of application windows in a graphical interface."
        link="window-managers"></BigImageCard>

      <BigImageCard imagePath="img/card-terminals.webp" title="Terminals"
        description="List of linux terminals you can install." link="terminals"></BigImageCard>

      <BigImageCard imagePath="img/card-terminal-themes.webp" title="Terminal themes"
        description="A small selection of themes for your terminal." link="terminal-themes"></BigImageCard>

      <BigImageCard imagePath="img/card-shells.webp" title="Shells"
        description="Some shells you can use on your linux machine." link="shells"></BigImageCard>

      <BigImageCard imagePath="img/card-desktop-environments.webp" title="Desktop Environments"
        description="Desktop Environments are the graphical interfaces that you see on your screen."
        link="desktop-environments"></BigImageCard>
    </div>
  </div>

</template>
