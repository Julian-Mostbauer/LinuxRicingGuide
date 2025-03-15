<template>
  <div>
    <div class="dropdown">
      <div tabindex="0" role="button" class="btn m-1">
        Theme
      </div>
      <ul tabindex="0" class="dropdown-content bg-base-300 rounded-box z-1 p-2 shadow-2xl w-min"
        style="transform: translateX(-10%);">
        <li>
          <input type="radio" name="theme-dropdown"
            class="theme-controller  btn btn-sm btn-block btn-ghost justify-start" aria-label="Default"
            value="default" />
        </li>
        <li>
          <input type="radio" name="theme-dropdown"
            class="theme-controller  btn btn-sm btn-block btn-ghost justify-start" aria-label="Retro"
            value="retro" />
        </li>
        <li>
          <input type="radio" name="theme-dropdown"
            class="theme-controller  btn btn-sm btn-block btn-ghost justify-start" aria-label="Cyberpunk"
            value="cyberpunk" />
        </li>
        <li>
          <input type="radio" name="theme-dropdown"
            class="theme-controller  btn btn-sm btn-block btn-ghost justify-start" aria-label="Valentine"
            value="valentine" />
        </li>
        <li>
          <input type="radio" name="theme-dropdown"
            class="theme-controller  btn btn-sm btn-block btn-ghost justify-start" aria-label="Aqua"
            value="aqua" />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>