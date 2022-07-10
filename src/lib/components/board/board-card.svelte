<script lang="ts">
  export let title = '',
    body = '';
</script>

<div class="card">
  <h1>{title}</h1>
  {#if body}
    <p>{body}</p>
  {/if}
</div>

<style lang="sass">
  .card
    display: flex
    flex-direction: column
    gap: .25rem
    padding: 0.5rem
    background-color: rgba(#fff, .1)
    border: 1px solid rgba(#fff, .2)
    border-radius: .5rem
    color: #fff

    p
      font-size: .8rem
      opacity: .75
</style>
