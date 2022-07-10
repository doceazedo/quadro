<script lang="ts">
  import { BOARD } from './board.store';
  import { BoardCard, BoardColumn, Board } from '$lib/components/board';
  import { BoardCardAdd, BoardColumnAdd } from '.';
</script>

{#if $BOARD}
  <Board>
    {#each $BOARD.columns as column}
      <BoardColumn title={column.title}>
        {#each column.cards as card}
          <BoardCard title={card.title} body={card.body} />
        {/each}
        <BoardCardAdd columnId={column.id} />
      </BoardColumn>
    {/each}
    <BoardColumnAdd />
  </Board>
{/if}
