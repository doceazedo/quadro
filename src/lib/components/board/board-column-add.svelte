<script lang="ts">
  import { AddIcon } from '$lib/components/icons';
</script>

<div class="card-wrapper">
  <button class="column-add" on:click>
    <AddIcon /> New column
  </button>
</div>

<style lang="sass">
  .card-wrapper
    transition: all .2s ease

  .column-add
    display: flex
    justify-content: center
    align-items: center
    flex-shrink: 0
    gap: .5rem
    width: 20rem
    height: fit-content
    padding: 1rem
    color: #fff
    background-color: rgba(#fff, .1)
    border: 1px solid rgba(#fff, .2)
    border-radius: 1rem
    backdrop-filter: blur(.5rem)
    opacity: .5
    cursor: pointer
    transition: all .2s ease

    &:hover
      opacity: 1

    :global(svg)
      width: 1.5rem
      height: 1.5rem
</style>
