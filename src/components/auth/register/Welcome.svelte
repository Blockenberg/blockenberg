<script lang="ts">
  import { sessionStore } from '../../../stores';
</script>

<section class="min-h-[calc(100vh-128px)] p-6 ">
  <div
    class="container mx-auto grid gap-6 text-center lg:grid-cols-2 xl:grid-cols-5"
  >
    <div
      class="w-full bg-gray-50 px-6  py-16 dark:bg-gray-900 sm:px-12 md:px-16 xl:col-span-2"
    >
      <span class="mb-2 block text-violet-600">Blockenberg</span>
      <h1 class="text-5xl font-bold text-gray-900 dark:text-gray-50">
        Welcome, {$sessionStore.username.trimmed}!
      </h1>
      <p class="my-8">
        <span class="font-bold text-gray-900 dark:text-gray-50">
          Your account is ready.
        </span>
         You don't need any password, your identity is now secured on this computer.
        In the next step, we will ask you to create a backup, so you'll never loose
        access.
      </p>
      <a
        class="mt-12 bg-violet-600 px-8  py-3 text-gray-50 hover:bg-violet-500"
        href="/delegate-account"
      >
        Next
      </a>
    </div>
    <img
      src="https://images.unsplash.com/photo-1465420513954-e331ffa275ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
      alt=""
      class="w-full bg-gray-500  object-cover xl:col-span-3"
    />
  </div>
</section>
