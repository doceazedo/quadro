<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = ({ session }) => {
    return {
      props: session,
    };
  };
</script>

<script lang="ts">
  import '$lib/sass/minireset.sass';
  import '$lib/sass/global.sass';
  import { USER } from '$lib/modules/auth';
  import type { User } from '@prisma/client';

  export let user: User | null;

  $USER = user;
</script>

<slot />
