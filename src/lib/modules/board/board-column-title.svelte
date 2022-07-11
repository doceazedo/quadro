<script lang="ts">
  import { BoardColumnTitle } from '$lib/components/board';
  import { updateColumn } from './board.client';

  export let title: string, columnId: number;

  const handleTitleUpdate = async (columnId: number, title: string) => {
    updateColumn(columnId, title);
  };
</script>

<BoardColumnTitle {handleTitleUpdate} {columnId} bind:value={title} />
