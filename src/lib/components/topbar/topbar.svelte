<script lang="ts">
  export let boardName = '',
    avatar = '';
</script>

<header class="topbar">
  <h1 class="board-name">{boardName}</h1>
  <h1 class="logo">Quadro<span>.</span></h1>
  <figure class="avatar" style="background-image:url({avatar})" />
</header>

<style lang="sass">
  @import '../../sass/vars'

  .topbar
    display: flex
    align-items: center
    justify-content: space-between
    padding: 0 .5rem
    width: 100%
    height: 3rem
    color: rgba(#fff, .75)
    background-color: rgba(#fff, .1)
    border: 1px solid rgba(#fff, .2)
    border-radius: 1rem
    backdrop-filter: blur(.5rem)

    .board-name
      margin-left: .5rem

    .logo
      font-size: 1.5rem
      font-weight: 700
      color: #fff

      span
        color: $primary

    .avatar
      height: 2rem
      width: 2rem
      background-color: rgba(#fff, .2)
      background-position: center
      background-repeat: no-repeat
      background-size: cover
      border-radius: .5rem
</style>
