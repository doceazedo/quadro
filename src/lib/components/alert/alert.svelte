<script lang="ts">
  import { slide } from 'svelte/transition';
  import { quintOut } from 'svelte/easing';

  export let error = false;
</script>

<div
  class="alert"
  transition:slide={{ duration: 200, easing: quintOut }}
  class:error
>
  <slot />
</div>

<style lang="sass">
  .alert
    padding: .75rem
    border: 1px solid
    border-radius: .5rem

    &.error
      background-color: rgba(#f14668, .2)
      border-color: #f14668
</style>
