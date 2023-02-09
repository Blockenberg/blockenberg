<script lang="ts">
	import { getDocFromWNFS } from "$routes/cms/lib/cms";

	import type { PageData } from "./$types";
	import Create from "$components/editor/Create.svelte";
	export let data: PageData;
	let doc;
	const result = new Promise(async (resolve, reject) => {
		// We call resolve(...) when what we were doing asynchronously was successful, and reject(...) when it failed.
		// In this example, we use setTimeout(...) to simulate async code.
		// In reality, you will probably be using something like XHR or an HTML API.
		doc = await getDocFromWNFS(data.article.name);
		resolve(doc);
	});

	//console.log(result);
</script>

{#await result then}
	<Create
		imageContent={{ name: doc.imgname, src: doc.imgsrc }}
		contentHeader={doc.name}
		contentText={doc.content}
	/>
{/await}
