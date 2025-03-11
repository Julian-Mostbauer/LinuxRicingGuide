<template>
  <div>
    <AppNavbar />
    <NuxtLoadingIndicator color="var(--color-primary)" :height="3" :throttle="0"/>
    <div>
      <slot />
    </div>
  </div>
</template>