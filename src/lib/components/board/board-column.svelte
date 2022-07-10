<div class="column">
  <h1 class="column-name">Column ✨</h1>
  <slot />
</div>

<style lang="sass">
  .column
    display: flex
    flex-direction: column
    flex-shrink: 0
    gap: .5rem
    width: 20rem
    height: fit-content
    padding: 1rem
    background-color: rgba(#fff, .1)
    border: 1px solid rgba(#fff, .2)
    border-radius: 1rem
    backdrop-filter: blur(.5rem)

    .column-name
      color: #fff
      font-weight: 700
      font-size: 1.25rem
      margin-bottom: .5rem
</style>
