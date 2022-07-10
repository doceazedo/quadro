<script lang="ts">
  import {
    BoardCardAdd,
    BoardCard,
    BoardColumnAdd,
    BoardColumn,
    Board,
  } from '$lib/components/board';
</script>

<Board>
  <BoardColumn>
    <BoardCard />
    <BoardCardAdd />
  </BoardColumn>

  <BoardColumnAdd />
</Board>
