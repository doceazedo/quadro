<script lang="ts">
  import { createColumn } from './board.client';
  import { BOARD } from './board.store';
  import { BoardColumnAdd } from '$lib/components/board';

  const handleAddColumn = () => createColumn($BOARD!.id);
</script>

<BoardColumnAdd on:click={handleAddColumn} />
