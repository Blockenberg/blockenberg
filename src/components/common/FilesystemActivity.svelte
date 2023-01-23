<script lang="ts">
	export let activity: "Initializing" | "Loading";
</script>

<div class="p-6 min-h-[calc(100vh-128px)]">
	<div class="flex items-center justify-center space-x-2">
		<div class="w-4 h-4 rounded-full animate-pulse dark:bg-violet-400" />
		<div class="w-4 h-4 rounded-full animate-pulse dark:bg-violet-400" />
		<div class="w-4 h-4 rounded-full animate-pulse dark:bg-violet-400" />
	</div>
	<div class="flex items-center justify-center space-x-2">
		{activity} file system...
	</div>
</div>
