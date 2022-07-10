<script lang="ts">
  export let value = '';
</script>

<form on:submit|preventDefault>
  <input type="text" class="card-add" placeholder="New card..." bind:value />
</form>

<style lang="sass">
  @import '../../sass/vars'

  .card-add
    width: 100%
    padding: 0.5rem
    background-color: rgba(#fff, .1)
    border: 1px solid rgba(#fff, .2)
    border-radius: .5rem
    color: #fff
    outline: none
    transition: all .2s ease
    opacity: .25

    &::placeholder
      color: rgba(#fff, .5)

    &:focus
      border-color: $primary
      opacity: 1
</style>
