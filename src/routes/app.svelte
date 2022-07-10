<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = ({ session }) =>
    !session.user ? { status: 302, redirect: '/auth/login' } : {};
</script>

<script lang="ts">
  import { Topbar } from '$lib/modules/topbar';
  import { Board } from '$lib/modules/board';
</script>

<main class="main">
  <Topbar />
  <Board />
</main>

<style lang="sass">
  .main
    display: flex
    flex-direction: column
    gap: 1rem
    width: 100%
    height: 100%
    padding: 1rem
</style>
