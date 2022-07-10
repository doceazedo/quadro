<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = ({ session }) =>
    !!session.user ? { status: 302, redirect: '/app' } : {};
</script>

<script lang="ts">
  import { page } from '$app/stores';

  const loginMsg = 'Welcome again!';
  const registerMsg = 'Register you account:';

  const message = $page.url.pathname == '/auth/login' ? loginMsg : registerMsg;
</script>

<main class="main">
  <div class="card">
    <header class="header">
      <div class="logo">Quadro<span>.</span></div>
      <h1 class="title">{message}</h1>
    </header>
    <slot />
  </div>
</main>

<style lang="sass">
  @import '../../lib/sass/vars'

  .main
    display: flex
    justify-content: center
    align-items: center
    width: 100%
    height: 100%
    color: #fff
    background-position: center
    background-repeat: no-repeat
    background-size: cover

  .card
    display: flex
    flex-direction: column
    gap: 3rem
    width: 100%
    max-width: 25rem
    padding: 3rem 1.5rem
    background-color: rgba(#fff, .1)
    border: 1px solid rgba(#fff, .2)
    border-radius: 1rem
    backdrop-filter: blur(.5rem)

    .header
      display: flex
      flex-direction: column
      align-items: center
      gap: .5rem

      .logo
        font-size: 3rem
        font-weight: 700
        line-height: 1

        span
          color: $primary

      .title
        font-size: 1.25rem
        font-weight: 300

</style>
