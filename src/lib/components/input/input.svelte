<script lang="ts">
  export let type = '',
    placeholder = '',
    value = '';

  const typeAction = (node: HTMLInputElement) => {
    node.type = type;
  };
</script>

<input class="input" use:typeAction {placeholder} bind:value />

<style lang="sass">
  @import '../../sass/vars'

  .input
    padding: .75rem
    background-color: transparent
    color: #fff
    border: 1px solid rgb(#fff, .2)
    border-radius: .5rem
    outline: none
    transition: all .2s ease

    &::placeholder
      color: rgba(#fff, .5)

    &:focus
      border-color: $primary
</style>
