<script lang="ts">
  import { SpinnerIcon } from '$lib/components/icons';

  export let loading = false;
</script>

<div class="form-wrapper">
  <form on:submit|preventDefault class="form" class:disabled={loading}>
    <slot />
  </form>

  {#if loading}
    <div class="loading">
      <SpinnerIcon />
    </div>
  {/if}
</div>

<style lang="sass">
  .form-wrapper
    position: relative
    display: flex
    flex-direction: column

  .form
    display: flex
    flex-direction: column
    gap: .5rem
    transition: all .2s ease

    &.disabled
      opacity: .5

  .loading
    position: absolute
    top: 0
    left: 0
    display: flex
    justify-content: center
    align-items: center
    width: 100%
    height: 100%
    cursor: not-allowed

    :global(svg)
      width: 2rem
      height: 2rem
</style>
