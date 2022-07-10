<script lang="ts">
  import { BOARD } from './board.store';
  import {
    BoardCardAdd,
    BoardCard,
    BoardColumn,
    Board,
  } from '$lib/components/board';
  import { BoardColumnAdd } from '.';
</script>

{#if $BOARD}
  <Board>
    {#each $BOARD.columns as column}
      <BoardColumn title={column.title}>
        {#each column.cards as card}
          <BoardCard title={card.title} body={card.body} />
        {/each}
        <BoardCardAdd />
      </BoardColumn>
    {/each}
    <BoardColumnAdd />
  </Board>
{/if}
