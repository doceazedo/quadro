<script lang="ts" context="module">
  import type { Load } from '@sveltejs/kit';

  export const load: Load = ({ session }) => {
    return {
      props: session,
    };
  };
</script>

<script lang="ts">
  import type { User } from '@prisma/client';

  export let user: User | null;
</script>

<pre>{JSON.stringify(user, null, 2)}</pre>
