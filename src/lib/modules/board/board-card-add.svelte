<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/env';
  import { createCard } from './board.client';
  import { BoardCardAdd } from '$lib/components/board';
  import { makeDropzone } from './board.utils';

  let title = '';
  let dropzone: HTMLFormElement;
  export let columnId: number, position: number;

  const handleAddCard = () =>
    createCard({
      title,
      columnId,
    });

  onMount(() => {
    if (!browser) return;
    makeDropzone(dropzone);
  });
</script>

<BoardCardAdd
  bind:value={title}
  on:submit={handleAddCard}
  {columnId}
  {position}
  bind:dropzone
/>
