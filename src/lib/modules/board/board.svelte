<script lang="ts">
  import { BOARD } from './board.store';
  import {
    BoardCardAdd,
    BoardCard,
    BoardColumnAdd,
    BoardColumn,
    Board,
  } from '$lib/components/board';
</script>

{#if $BOARD}
  <Board>
    {#each $BOARD.columns as column}
      <BoardColumn>
        {#each column.cards as card}
          <BoardCard title={card.title} body={card.body} />
        {/each}
        <BoardCardAdd />
      </BoardColumn>
      <BoardColumnAdd />
    {/each}
  </Board>
{/if}
