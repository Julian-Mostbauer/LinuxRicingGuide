<template>
  <div>
    <div class="card text-neutral-content mb-6">
      <div class="hero bg-base-200 min-h-screen border-b-2 border-base-300">
        <div class="hero-content flex-col lg:flex-row">
          <Motion :initial="{ scale: 0, rotate: 180 }" :while-in-view="{ rotate: 0, scale: 1 }" :in-view-options="{
            once: true,
          }" :transition="{
            type: 'spring',
            stiffness: 250,
            damping: 20,
            delay: 0,
          }">
            <div class="lg:mr-20 text-center lg:text-left">
              <h1 class="text-5xl font-bold text-primary">
                <DynamicIcon :names="{default: 'bowl-rice', mdi: 'rice'}" :size="40" /> Linux Ricing
              </h1>
              <p class="py-6 max-w-128 text-base-content">
                Linux Ricing is the process of customizing your desktop to make it look more visually appealing by
                changing themes, icons, fonts, and other visual elements.
              </p>
            </div>
          </Motion>

          <Motion :initial="{ scale: 0, rotate: -180 }" :while-in-view="{ rotate: 0, scale: 1 }" :in-view-options="{
            once: true,
          }" :transition="{
            type: 'spring',
            stiffness: 250,
            damping: 20,
            delay: 0,
          }">
            <div class="card bg-base-100 w-full max-w-md shrink-0 shadow-2xl border-primary border-2">
              <div class="card-body text-base-content">
                <h2 class="text-2xl font-bold mb-4 text-primary">Why Customize Your Linux Desktop?</h2>
                <ul class="list-disc list-inside">
                  <li>Improve productivity with a personalized workflow</li>
                  <li>Enhance the visual appeal of your desktop</li>
                  <li>Learn more about Linux and its customization options</li>
                  <li>Show off your unique setup to the community</li>
                </ul>
                <p class="mt-4">Start your ricing journey today and transform your Linux desktop into a work of art!</p>
              </div>
            </div>
          </Motion>

        </div>
      </div>
    </div>
    <div class="m-8 grid grid-cols-1 md:grid-cols-4 gap-4">
      <BigImageCardFancy imagePath="img/mini2/card-distributions.webp" title="Distributions"
        description="List of some linux distributions you can use. These contain common but also some exotic ones."
        link="distros" />

      <BigImageCardFancy imagePath="img/mini2/card-package-managers.webp" title="Package Managers"
        description="Selection of Package Managers you can use to install software on your linux machine."
        link="package-managers" />

      <BigImageCardFancy imagePath="img/mini2/card-setups.webp" title="Setups"
        description="Showcase of our personal setups we use on our machines. Feel free to get inspired and copy some aspects."
        link="our-setups" />

      <BigImageCardFancy imagePath="img/mini2/card-window-manager.webp" title="Window-Managers"
        description="Controls the appearance, and behavior of application windows in a graphical interface."
        link="window-managers" />

      <BigImageCardFancy imagePath="img/mini5/card-terminals.webp" title="Terminals"
        description="List of linux terminals you can install." link="terminals" />

      <BigImageCardFancy imagePath="img/mini5/card-terminal-themes.webp" title="Terminal themes"
        description="A small selection of themes for your terminal." link="terminal-themes" />

      <BigImageCardFancy imagePath="img/mini5/card-shells.webp" title="Shells"
        description="Some shells you can use on your linux machine." link="shells" />

      <BigImageCardFancy imagePath="img/mini2/card-desktop-environments.webp" title="Desktop Environments"
        description="Desktop Environments are the graphical interfaces that you see on your screen."
        link="desktop-environments" />
    </div>
  </div>
</template>
