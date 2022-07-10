<script lang="ts">
  export let href = '',
    type = 'button',
    primary = false;
</script>

{#if !!href}
  <a {href} class="button" {type} class:primary on:click>
    <slot />
  </a>
{:else}
  <button class="button" {type} class:primary on:click>
    <slot />
  </button>
{/if}

<style lang="sass">
  @import '../../sass/vars'

  .button
    display: flex
    justify-content: center
    padding: .75rem
    border: none
    border-radius: .5rem
    cursor: pointer
    background-color: #fff
    color: #000
    text-decoration: none

    &.primary
      background-color: $primary
      color: #fff
</style>
