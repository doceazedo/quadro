<script lang="ts">
  import { BOARD } from './board.store';
  import { BoardColumn, Board } from '$lib/components/board';
  import { BoardCardAdd, BoardCard, BoardColumnAdd, BoardColumnTitle } from '.';
</script>

{#if $BOARD}
  <Board>
    {#each $BOARD.columns as column}
      <BoardColumn>
        <BoardColumnTitle title={column.title} columnId={column.id} />
        {#each column.cards as card, i}
          {#key card.id}
            <BoardCard
              columnId={column.id}
              position={i}
              title={card.title}
              body={card.body}
            />
          {/key}
        {/each}
        {#key column.cards.length}
          <BoardCardAdd columnId={column.id} position={column.cards.length} />
        {/key}
      </BoardColumn>
    {/each}
    <BoardColumnAdd />
  </Board>
{/if}
