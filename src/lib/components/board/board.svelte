<div class="board">
  <slot />
</div>

<style lang="sass">
  .board
    display: flex
    flex-grow: 1
    gap: 1rem
    overflow-x: auto

    &::-webkit-scrollbar
      height: .5rem
      border-radius: 25px

    &::-webkit-scrollbar-track
      background: rgba(#fff, .2)
      border-radius: 25px

    &::-webkit-scrollbar-thumb
      background: rgba(#fff, .2)
      border-radius: 25px

    &::-webkit-scrollbar-thumb:hover
      background: rgba(#fff, .3)
</style>
