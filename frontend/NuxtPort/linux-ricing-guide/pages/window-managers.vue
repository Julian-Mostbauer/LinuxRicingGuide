<template>
    <div class="flex flex-col items-center">
        <SmallImageCard title="Hyprland"
            description="Hyprland is a lightweight, highly configurable window manager for X11. It is designed to be fast and efficient, while still providing a high degree of customization. Hyprland is written in C and uses the Xlib library for communication with the X server."
            link="https://hyprland.org"
            image-path="https://th.bing.com/th/id/OIP.C5AN8XiYqirdqGfnqpMlnAHaEK?w=299&h=180&c=7&r=0&o=5&pid=1.7">
        </SmallImageCard>
        <SmallImageCard title="i3"
            description="i3 is a tiling window manager designed for X11. It is primarily targeted at advanced users and developers. i3 is written in C and uses the Xlib library for communication with the X server."
            link="https://i3wm.org" image-path="https://kifarunix.com/wp-content/uploads/2021/11/i3-wm.png">
        </SmallImageCard>
        <SmallImageCard title="Openbox"
            description="Openbox is a lightweight, highly configurable window manager for X11. It is designed to be fast and efficient, while still providing a high degree of customization. Openbox is written in C and uses the Xlib library for communication with the X server."
            link="http://openbox.org"
            image-path="https://th.bing.com/th/id/OIP.ZzXPMkiO4Y2-WxDP9yluQQHaG5?w=191&h=180&c=7&r=0&o=5&pid=1.7">
        </SmallImageCard>
        <SmallImageCard title="Awesome"
            description="Awesome is a highly configurable, tiling window manager for X11. It is designed to be fast and efficient, while still providing a high degree of customization. Awesome is written in C and uses the Xlib library for communication with the X server."
            link="https://awesomewm.org/"
            image-path="https://styles.redditmedia.com/t5_2s8kq/styles/communityIcon_rw4y5eb9poxa1.png">
        </SmallImageCard>
        <SmallImageCard title="bspwm"
            description="bspwm is a tiling window manager that represents windows as the leaves of a full binary tree. It is designed to be fast and efficient, while still providing a high degree of customization. bspwm is written in C and uses the Xlib library for communication with the X server."
            link="https://wiki.archlinux.org/title/Bspwm" image-path="https://media.jvt.me/8370d97494.png">
        </SmallImageCard>
    </div>
</template>

<script setup lang="ts">
definePageMeta({
  icon: 'computer',
});
</script>
