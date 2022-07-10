<script lang="ts">
  export let dropzone: HTMLDivElement | null = null,
    draggable: HTMLDivElement | null = null,
    x = 0,
    y = 0,
    columnId: number,
    position: number,
    title = '',
    body = '';

  $: dragging = x != 0 || y != 0;
</script>

<div
  class="card-wrapper"
  class:dragging
  bind:this={dropzone}
  data-position={position}
  data-column-id={columnId}
>
  <div
    class="card draggable"
    bind:this={draggable}
    style="transform:translate({x}px, {y}px)"
    data-position={position}
    data-column-id={columnId}
  >
    <h1>{title}</h1>
    {#if body}
      <p>{body}</p>
    {/if}
  </div>
</div>

<style lang="sass">
  .card-wrapper
    transition: all .2s ease

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
