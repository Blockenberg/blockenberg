<script lang="ts">
  import { sessionStore } from '../../../stores';
</script>

<section
  class="container mx-auto my-4 grid gap-6 text-center lg:grid-cols-2 xl:grid-cols-5"
>
  <div
    class="w-full rounded bg-stone-50 px-6 py-16 dark:bg-stone-900 sm:px-12 md:px-16 xl:col-span-2"
  >
    <h1 class="text-5xl font-bold text-stone-900 dark:text-stone-50">
      Welcome, {$sessionStore.username.trimmed}!
    </h1>
    <p class="mt-4">
      <span class="font-bold text-stone-900 dark:text-stone-50">
        Your account is ready.
      </span>
      You don't need any password, your identity is now secured on this computer.
    </p>
    {#if $sessionStore.organization}
      <p class="my-6">
        In the next step of the process, you will have the ability to invite
        your teammates to collaborate on your project. If you prefer, this can
        also be done at a later time through the settings.
      </p>
      <p class="my-6">
        To support the project, send any amount of cryptocurrency to
        <b>adamsobotka.eth</b>. Your contribution will help us continue developing and
        improving Blockenberg. Thank you for your support!
      </p>
    {:else}
      <p class="my-6">
        In the next step, we will guide you through creating a backup to ensure
        that you always have access to your account. As you're creating a
        personal account, we recommend using your mobile phone to create a
        recovery account via QR code. This will ensure that you can easily
        recover your account if needed. If you have any questions or need
        assistance, don't hesitate to reach out to us.
      </p>
    {/if}
    <a
      class="mt-4 w-full justify-center rounded border-2 border-violet-600  bg-violet-600 px-4 py-2 text-lg font-semibold text-white transition-all delay-150 duration-1000 hover:bg-violet-700 focus:outline-none disabled:opacity-5  dark:bg-violet-600 dark:text-violet-50 dark:hover:bg-violet-800  md:w-40"
      href="/delegate-account"
    >
      Next
    </a>
  </div>
  <img
    src="https://images.unsplash.com/photo-1465420513954-e331ffa275ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
    alt=""
    class="w-full rounded  bg-stone-500 object-cover xl:col-span-3"
  />
</section>
