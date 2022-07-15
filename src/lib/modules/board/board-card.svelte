<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/env';
  import { BoardCard } from '$lib/components/board';
  import { makeDraggable, makeDropzone } from './board.utils';

  export let title = '',
    body = '',
    position: number,
    columnId: number;

  let dropzone: HTMLDivElement;
  let draggable: HTMLDivElement;
  let x = 0;
  let y = 0;

  const move = (event: any) => {
    x += event.dx;
    y += event.dy;
  };

  const reset = () => {
    x = 0;
    y = 0;
  };

  onMount(() => {
    if (!browser) return;

    makeDraggable(draggable, move);
    makeDropzone(dropzone, reset);
  });
</script>

<BoardCard
  {title}
  {body}
  {position}
  {columnId}
  {x}
  {y}
  bind:dropzone
  bind:draggable
/>
