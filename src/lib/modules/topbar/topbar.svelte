<script lang="ts">
  import md5 from 'crypto-js/md5';
  import { Topbar } from '$lib/components/topbar';
  import { USER } from '$lib/modules/auth';

  const avatar = `https://gravatar.com/avatar/${md5($USER!.email)}?d=mp`;
</script>

<Topbar boardName="Board name here" {avatar} />
