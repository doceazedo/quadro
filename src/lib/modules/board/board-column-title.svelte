<script lang="ts">
  import { BoardColumnTitle } from '$lib/components/board';

  export let title: string, columnId: number;

  const handleTitleUpdate = async (columnId: number, title: string) => {
    console.log(columnId, title);
  };
</script>

<BoardColumnTitle {handleTitleUpdate} {columnId} bind:value={title} />
