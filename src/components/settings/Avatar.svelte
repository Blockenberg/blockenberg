<script lang="ts">
  import { accountSettingsStore, sessionStore } from '$src/stores'
  import { getAvatarFromWNFS } from '$lib/account-settings'

  export let size = 'large'

  const sizeClasses =
    size === 'large'
      ? 'w-[88px] h-[88px] text-[40px]'
      : 'w-[40px] h-[40px] text-sm'

  const loaderSizeClasses =
    size === 'large' ? 'w-[28px] h-[28px]' : 'w-[16px] h-[16px]'

  getAvatarFromWNFS()
</script>

{#if $accountSettingsStore.avatar}
  {#if $accountSettingsStore.loading}
    <div
      class="flex items-center justify-center object-cover border-2 border-base-content {sizeClasses}"
    >
      <span
        class="animate-spin ease-linear border-2 border-t-2 border-t-orange-500 border-base-content {loaderSizeClasses}"
      />
    </div>
  {:else}
    <img
      class="object-cover border-2 border-base-content {sizeClasses}"
      src={$accountSettingsStore.avatar.src}
      alt="User Avatar"
    />
  {/if}
{:else}
  <div
    class="flex items-center justify-center bg-violet-600 text-gray-50 uppercase font-bold {sizeClasses}"
  >
    {$sessionStore.username.trimmed[0]}
  </div>
{/if}
