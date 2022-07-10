<script lang="ts">
  export let handleTitleUpdate: (columnId: number, title: string) => void,
    columnId: number,
    value = '';

  let cooldown: ReturnType<typeof setTimeout>;

  const handleKeyUp = () => {
    clearTimeout(cooldown);
    cooldown = setTimeout(() => handleTitleUpdate(columnId, value), 800);
  };
</script>

<input class="title" type="text" bind:value on:keyup={handleKeyUp} />

<style lang="sass">
  .title
    margin-bottom: .5rem
    color: #fff
    font-weight: 700
    font-size: 1.25rem
    padding: 0
    background-color: transparent
    border: none
    outline: none
</style>
