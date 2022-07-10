<script lang="ts">
  import interact from 'interactjs';
  import { onMount } from 'svelte';
  import { browser } from '$app/env';
  import { BoardCard } from '$lib/components/board';
  import { reorderCard } from './board.client';
  import { BOARD } from './board.store';

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

  const updateCardPosition = async (
    fromColumnId: number,
    fromPosition: number,
    toColumnId: number,
    toPosition: number,
  ) => {
    const columnIndex = $BOARD!.columns.findIndex((x) => x.id == fromColumnId);
    const movingCard = $BOARD!.columns[columnIndex]!.cards.splice(
      fromPosition,
      1,
    )[0];

    const toColumnIndex = $BOARD!.columns.findIndex((x) => x.id == toColumnId);
    $BOARD!.columns[toColumnIndex].cards.splice(toPosition, 0, {
      ...movingCard,
      columnId: toColumnId,
    });
    $BOARD = $BOARD;

    const cards = [
      ...$BOARD!.columns[columnIndex].cards.map((x, i) => ({
        ...x,
        position: i,
      })),
      ...$BOARD!.columns[toColumnIndex].cards.map((x, i) => ({
        ...x,
        position: i,
      })),
    ];
    const cardChanges = {
      boardId: $BOARD!.id,
      cards: cards.map((x) => ({
        id: x.id,
        position: x.position,
        columnId: x.columnId,
      })),
    };

    await reorderCard(cardChanges);
  };

  onMount(() => {
    if (!browser) return;

    interact(draggable).draggable({
      autoScroll: true,
      listeners: { move },
    });

    interact(dropzone).dropzone({
      accept: '.draggable',
      overlap: 0.5,
      ondragenter: (event) => {
        const isSameDragzone = event.target.classList.contains('dragging');
        if (isSameDragzone) return;
        const box = event.relatedTarget.getBoundingClientRect();
        event.target.style.paddingTop = `${box.height}px`;
      },
      ondragleave: (event) => (event.target.style.paddingTop = null),
      ondrop: (event) => {
        event.target.style.paddingTop = null;

        const fromColumnId = parseInt(event.relatedTarget.dataset.columnId);
        const fromPosition = parseInt(event.relatedTarget.dataset.position);

        const toColumnId = parseInt(event.target.dataset.columnId);
        const toPosition = parseInt(event.target.dataset.position);

        updateCardPosition(fromColumnId, fromPosition, toColumnId, toPosition);
      },
      ondropdeactivate: reset,
    });
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
