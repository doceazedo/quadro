<script lang="ts">
  import { createCard } from './board.client';
  import { BOARD } from './board.store';
  import { BoardCardAdd } from '$lib/components/board';

  let title = '';
  export let columnId: number;

  const handleAddCard = () =>
    createCard({
      title,
      columnId,
    });
</script>

<BoardCardAdd bind:value={title} on:submit={handleAddCard} />
