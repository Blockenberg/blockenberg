<script lang="ts">
  export let activity: 'Initializing' | 'Loading';
</script>

<div privateDocuments>
  <div class="flex items-center justify-center space-x-2">
    <div class="h-4 w-4 animate-pulse rounded-full dark:bg-violet-600" />
    <div class="h-4 w-4 animate-pulse rounded-full dark:bg-violet-600" />
    <div class="h-4 w-4 animate-pulse rounded-full dark:bg-violet-600" />
  </div>
  <div class="flex items-center justify-center space-x-2">
    {activity} file system...
  </div>
</div>
