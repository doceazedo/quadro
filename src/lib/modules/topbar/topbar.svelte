<script lang="ts">
  import md5 from 'crypto-js/md5.js';
  import { Topbar } from '$lib/components/topbar';
  import { BOARD } from '$lib/modules/board';
  import { USER } from '$lib/modules/auth';

  const avatar = `https://gravatar.com/avatar/${md5($USER!.email)}?d=mp`;
</script>

<Topbar boardName={$BOARD?.title} {avatar} />
