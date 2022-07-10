<script lang="ts">
  import { BOARD } from './board.store';
  import { BoardCard, BoardColumn, Board } from '$lib/components/board';
  import { BoardCardAdd, BoardColumnAdd, BoardColumnTitle } from '.';
</script>

{#if $BOARD}
  <Board>
    {#each $BOARD.columns as column}
      <BoardColumn>
        <BoardColumnTitle title={column.title} columnId={column.id} />
        {#each column.cards as card}
          <BoardCard title={card.title} body={card.body} />
        {/each}
        <BoardCardAdd columnId={column.id} />
      </BoardColumn>
    {/each}
    <BoardColumnAdd />
  </Board>
{/if}
