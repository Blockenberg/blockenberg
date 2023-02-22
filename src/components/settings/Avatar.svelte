<script lang="ts">
  import { accountSettingsStore, sessionStore } from '$src/stores';
  import { getAvatarFromWNFS } from '$lib/account-settings';

  export let size = 'large';

  const sizeClasses =
    size === 'large'
      ? 'w-[88px] h-[88px] text-[40px]'
      : 'w-[40px] h-[40px] text-sm';

  const loaderSizeClasses =
    size === 'large' ? 'w-[28px] h-[28px]' : 'w-[16px] h-[16px]';

  getAvatarFromWNFS();
</script>

{#if $accountSettingsStore.avatar}
  {#if $accountSettingsStore.loading}
    <div
      class="border-base-content flex items-center justify-center border-2 object-cover {sizeClasses}"
    >
      <span
        class="border-base-content animate-spin border-2 border-t-2 border-t-orange-500 ease-linear {loaderSizeClasses}"
      />
    </div>
  {:else}
    <img
      class="object-cover bg-violet-600 {sizeClasses}"
      src={$accountSettingsStore.avatar.src}
      alt="User Avatar"
    />
  {/if}
{:else}
  <div
    class="flex items-center justify-center bg-violet-600 font-bold uppercase text-gray-50 {sizeClasses}"
  >
    {$sessionStore.username.trimmed[0]}
  </div>
{/if}
