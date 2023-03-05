<script lang="ts">
  import { browser } from '$app/environment';

  let darkMode;

  if (browser) {
    darkMode = window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function handleSwitchDarkMode() {
    darkMode = !darkMode;
    localStorage.theme = darkMode ? 'dark' : 'light';
    darkMode
      ? document.documentElement.classList.add('dark')
      : document.documentElement.classList.remove('dark');
  }
</script>

<label
  for="Toggle4"
  class="inline-flex cursor-pointer items-center justify-center  border-b-4 border-transparent text-violet-600 dark:text-stone-50"
>
  <input
    id="Toggle4"
    type="checkbox"
    class="peer hidden"
    checked={darkMode}
    on:click={handleSwitchDarkMode}
  />
  <span class=" peer-checked:hidden">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      class="h-4 w-4"
    >
      <path
        fill-rule="evenodd"
        d="M7.455 2.004a.75.75 0 01.26.77 7 7 0 009.958 7.967.75.75 0 011.067.853A8.5 8.5 0 116.647 1.921a.75.75 0 01.808.083z"
        clip-rule="evenodd"
      />
    </svg>
  </span>
  <span class="hidden peer-checked:flex">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 20 20"
      fill="currentColor"
      class="h-4 w-4"
    >
      <path
        d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM10 15a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 15zM10 7a3 3 0 100 6 3 3 0 000-6zM15.657 5.404a.75.75 0 10-1.06-1.06l-1.061 1.06a.75.75 0 001.06 1.06l1.06-1.06zM6.464 14.596a.75.75 0 10-1.06-1.06l-1.06 1.06a.75.75 0 001.06 1.06l1.06-1.06zM18 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 0118 10zM5 10a.75.75 0 01-.75.75h-1.5a.75.75 0 010-1.5h1.5A.75.75 0 015 10zM14.596 15.657a.75.75 0 001.06-1.06l-1.06-1.061a.75.75 0 10-1.06 1.06l1.06 1.06zM5.404 6.464a.75.75 0 001.06-1.06l-1.06-1.06a.75.75 0 10-1.061 1.06l1.06 1.06z"
      />
    </svg>
  </span>
</label>
