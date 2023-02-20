<script lang="ts">
  import { sessionStore } from '$src/stores';

  $: usernameParts = $sessionStore?.username?.full?.split('#');
</script>

{usernameParts[0]}
