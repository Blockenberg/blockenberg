<script lang="ts">
  import { sessionStore } from '$src/stores';
</script>

<div class="space-y-8 p-6">
  <main>
    <div class="container mx-auto space-y-16">
      <section class="grid gap-6 text-center lg:grid-cols-2 xl:grid-cols-5">
        <div
          class="w-full bg-gray-50 p-6 dark:bg-gray-900 sm:p-16 xl:col-span-2"
        >
          <span class="mb-2 block dark:text-violet-600">
            Blockenberg content management system
          </span>
          <h1 class="text-5xl font-bold dark:text-gray-50">
            Publish with Blockenberg
          </h1>
          <p class="my-8">
            <span class="font-medium dark:text-gray-50">
              Headless and decentralized.
            </span>
            The unstoppable CMS for censorship resistant, decentralized world.
          </p>
          <form
            class="ng-untouched ng-pristine ng-valid space-y-3 self-stretch"
          >
            {#if $sessionStore.error === 'Unsupported Browser'}
              <div class="bg-base-content p-4 text-gray-50">
                <p class="flex items-center gap-2 text-base">
                  Unsupported device
                </p>
                <p>
                  It appears this device isn’t supported. Webnative requires
                  IndexedDB in order to function. This browser doesn’t appear to
                  implement this API. Are you in a Firefox private window?
                </p>
              </div>
            {:else}
              <div class="flex flex-wrap justify-center font-bold">
                <a
                  href="/register"
                  class="m-2 border-b-4 border-gray-50 px-8 py-3 text-lg text-violet-600 transition-all delay-150 duration-1000 hover:border-violet-600 dark:border-gray-900 dark:bg-violet-600 dark:text-gray-50 hover:dark:border-gray-900 dark:hover:bg-violet-800 "
                >
                  Register
                </a>
                <a
                  href="/recover"
                  class="m-2 border-b-4 border-gray-50 px-8 py-3 text-lg text-gray-800 transition-all delay-150 duration-1000 hover:border-violet-600 dark:border-gray-900 dark:text-gray-50 hover:dark:border-gray-900 dark:hover:bg-violet-800 "
                >
                  Recover
                </a>
              </div>
            {/if}
          </form>
        </div>
        <img
          src="https://images.unsplash.com/photo-1523115191856-c203e76215a5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=480&q=80"
          alt="freedom"
          class="h-40 w-full bg-gray-50 object-cover dark:bg-gray-500 md:h-[500px] xl:col-span-3"
        />
      </section>
      <section>
        <span
          class="mb-2 block text-xs font-medium uppercase tracking-widest dark:text-violet-600 lg:text-center"
        >
          How it works
        </span>
        <h2 class="text-5xl font-bold dark:text-gray-50 lg:text-center">
          Building with Blockenberg is simple
        </h2>
        <div class="my-16 grid gap-6 lg:grid-cols-3">
          <div class="flex flex-col space-y-4 bg-gray-50 p-8 dark:bg-gray-900">
            <div
              class="flex h-12 w-12 flex-shrink-0 items-center justify-center bg-violet-600 text-xl font-bold text-gray-100 dark:bg-violet-600 dark:text-gray-900"
            >
              1
            </div>
            <p class="text-2xl ">
              <b>Your data.</b>
              Blockenberg publish your data to your decentralized account.
            </p>
          </div>
          <div class="flex flex-col space-y-4 bg-gray-50 p-8 dark:bg-gray-900">
            <div
              class="flex h-12 w-12 flex-shrink-0 items-center justify-center bg-violet-600 text-xl font-bold text-gray-100 dark:bg-violet-600 dark:text-gray-900"
            >
              2
            </div>
            <p class="text-2xl ">
              <b>Easy to use.</b>
              Your content creators don't need to understand blockchain, nor the
              world of development.
            </p>
          </div>
          <div class="flex flex-col space-y-4 bg-gray-50 p-8 dark:bg-gray-900">
            <div
              class="flex h-12 w-12 flex-shrink-0 items-center justify-center bg-violet-600 text-xl font-bold text-gray-100 dark:bg-violet-600 dark:text-gray-900"
            >
              3
            </div>
            <p class="text-2xl ">
              <b>Deploy anywhere.</b>
              Build your app, use your favorite framework, deploy on your favorite
              service.
            </p>
          </div>
        </div>
      </section>
      <section class="grid gap-6 lg:grid-cols-2">
        <img
          src="https://images.unsplash.com/reserve/rV1ymXsoQRCKUBVL2fGK_forsplash.jpg?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80"
          alt=""
          class="max-h-96 w-full bg-gray-50 object-cover dark:bg-gray-500"
        />
        <div
          class="flex w-full flex-col items-center space-y-8 p-6 dark:bg-gray-900 lg:h-full lg:p-8 "
        >
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6c/Remise_du_Prix_Sakharov_%C3%A0_Aung_San_Suu_Kyi_Strasbourg_22_octobre_2013-18.jpg/320px-Remise_du_Prix_Sakharov_%C3%A0_Aung_San_Suu_Kyi_Strasbourg_22_octobre_2013-18.jpg"
            alt=""
            class="h-20 w-20 bg-violet-600 object-cover text-gray-100 dark:bg-gray-500"
          />
          <blockquote class="max-w-lg text-center text-lg font-medium italic">
            “To view the opposition as dangerous is to misunderstand the basic
            concepts of democracy. To oppress the opposition is to assault the
            very foundation of democracy.”
          </blockquote>
          <div class="text-center dark:text-gray-400">
            <p>Aung San Suu Kyi</p>
            <p>Burmese Disident</p>
          </div>
        </div>
        <div class="space-y-8 p-8 dark:bg-gray-900 lg:col-span-full lg:py-12">
          <h2 class="text-5xl font-bold dark:text-gray-50">Create with us</h2>
          <p class="dark:text-gray-400">
            We provide the content creation interface. If you are familiar with
            WordPress, we are the "admin". In order to display your page, you
            need an application - this is the "headless" principle. You can
            bootstrap the development with sample application (coming soon) or
            build your own. In this approach, we are similar to Contently or
            Hygraph.
          </p>
          <p>
            Another difference between Blockenberg and WordPress is that instead
            of the database we use the blockchain technology. All your data are
            bound to the account you created and published on the distributed
            network. We don't control and can't influence what you are
            publishing in any means. Birds around are symbol of freedom - we
            (and Lincoln) belive that those who deny freedom to others deserve
            it not for themselves.
          </p>
          <br />
          <a class="hover:underline" href="/about">Read more &gt;</a>
        </div>
      </section>
      <section>
        <div class="grid gap-6 lg:grid-cols-3">
          <div class="overflow-hidden lg:col-span-3 lg:flex">
            <img
              src="https://images.unsplash.com/photo-1517061391662-b09454c10462?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2133&q=80"
              alt=""
              class="h-auto max-h-96 w-full bg-gray-50 object-cover dark:bg-gray-500"
            />
            <div
              class="space-y-6 bg-gray-50 p-6 dark:bg-gray-900 md:flex md:flex-col lg:p-8"
            >
              <span
                class="self-start bg-violet-600 px-3 py-1 text-sm text-gray-100 dark:bg-violet-600 dark:text-gray-50"
              >
                Technology
              </span>
              <h2 class="text-5xl font-bold md:flex-1">
                <a
                  class="hover:underline"
                  href="https://cms-blockenberg.vercel.app/"
                >
                  Next.js ISR sample blog template is live!
                </a>
              </h2>
              <div>
                <p class="dark:text-gray-400">Feb 22, 2023</p>
                <p class="dark:text-gray-400">By Adam Sobotka</p>
              </div>
            </div>
          </div>
          <div
            class="flex justify-center bg-gray-50 p-6 dark:bg-gray-900 lg:p-8 lg:py-12 "
          >
            <a
              href="https://cms-blockenberg.vercel.app/"
              class="flex font-medium text-violet-600 dark:text-gray-50 hover:underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mr-2 h-5 w-5"
                viewBox="0 0 24 24"
              >
                <rect
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="none"
                />
                <g fill="none">
                  <g clip-path="url(#akarIconsNextjsFill0)">
                    <path
                      fill="currentColor"
                      d="M11.214.006c-.052.005-.216.022-.364.033c-3.408.308-6.6 2.147-8.624 4.974a11.88 11.88 0 0 0-2.118 5.243c-.096.66-.108.854-.108 1.748s.012 1.089.108 1.748c.652 4.507 3.86 8.293 8.209 9.696c.779.251 1.6.422 2.533.526c.364.04 1.936.04 2.3 0c1.611-.179 2.977-.578 4.323-1.265c.207-.105.247-.134.219-.157a211.64 211.64 0 0 1-1.955-2.62l-1.919-2.593l-2.404-3.559a342.499 342.499 0 0 0-2.422-3.556c-.009-.003-.018 1.578-.023 3.51c-.007 3.38-.01 3.516-.052 3.596a.426.426 0 0 1-.206.213c-.075.038-.14.045-.495.045H7.81l-.108-.068a.44.44 0 0 1-.157-.172l-.05-.105l.005-4.704l.007-4.706l.073-.092a.644.644 0 0 1 .174-.143c.096-.047.133-.051.54-.051c.478 0 .558.018.682.154c.035.038 1.337 2 2.895 4.362l4.734 7.172l1.9 2.878l.097-.063a12.318 12.318 0 0 0 2.465-2.163a11.947 11.947 0 0 0 2.825-6.135c.096-.66.108-.854.108-1.748s-.012-1.088-.108-1.748C23.24 5.75 20.032 1.963 15.683.56a12.6 12.6 0 0 0-2.498-.523c-.226-.024-1.776-.05-1.97-.03Zm4.913 7.26a.473.473 0 0 1 .237.276c.018.06.023 1.365.018 4.305l-.007 4.218l-.743-1.14l-.746-1.14v-3.066c0-1.983.009-3.097.023-3.151a.478.478 0 0 1 .232-.296c.097-.05.132-.054.5-.054c.347 0 .408.005.486.047Z"
                    />
                  </g>
                  <defs>
                    <clipPath id="akarIconsNextjsFill0">
                      <path fill="#fff" d="M0 0h24v24H0z" />
                    </clipPath>
                  </defs>
                </g>
              </svg>

              <p class="inline">Next.js sample client.</p>
            </a>
          </div>
          <div
            class="flex justify-center bg-gray-50 p-6 dark:bg-gray-900 lg:p-8 lg:py-12"
          >
            <a
              href="https://blockenblog.netlify.app/"
              class=" flex font-medium text-violet-600 dark:text-gray-50 hover:underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mr-2 h-5 w-5"
                viewBox="0 0 24 24"
              >
                <rect
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="none"
                />
                <path
                  fill="currentColor"
                  d="M16.074 16.86c-.72.616-2.157 1.035-3.812 1.035c-2.032 0-3.735-.632-4.187-1.483c-.161.488-.198 1.046-.198 1.402c0 0-.106 1.75 1.111 2.968c0-.632.513-1.145 1.145-1.145c1.083 0 1.082.945 1.081 1.712v.069c0 1.164.711 2.161 1.723 2.582a2.347 2.347 0 0 1-.236-1.029c0-1.11.652-1.523 1.41-2.003c.602-.383 1.272-.807 1.733-1.66a3.129 3.129 0 0 0 .378-1.494a3.14 3.14 0 0 0-.148-.954zM15.551.6c.196.244.296.572.496 1.229l4.368 14.347a18.18 18.18 0 0 0-5.222-1.768L12.35 4.8a.37.37 0 0 0-.71.002l-2.81 9.603a18.175 18.175 0 0 0-5.245 1.771L7.974 1.827c.2-.656.3-.984.497-1.227a1.613 1.613 0 0 1 .654-.484C9.415 0 9.757 0 10.443 0h3.135c.686 0 1.03 0 1.32.117A1.614 1.614 0 0 1 15.55.6z"
                />
              </svg>

              <p class="inline">Astro SSR sample client.</p>
            </a>
          </div>
          <div
            class="flex justify-center bg-gray-50 p-6 dark:bg-gray-900 lg:p-8 lg:py-12"
          >
            <a
              href="https://blockenblog.surge.sh/"
              class="flex font-medium text-violet-600 dark:text-gray-50 hover:underline"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="mr-2 h-5 w-5"
                viewBox="0 0 24 24"
              >
                <rect
                  x="0"
                  y="0"
                  width="24"
                  height="24"
                  fill="none"
                  stroke="none"
                />
                <path
                  fill="currentColor"
                  d="m8.286 10.578l.512-8.657a.306.306 0 0 1 .247-.282L17.377.006a.306.306 0 0 1 .353.385l-1.558 5.403a.306.306 0 0 0 .352.385l2.388-.46a.306.306 0 0 1 .332.438l-6.79 13.55l-.123.19a.294.294 0 0 1-.252.14c-.177 0-.35-.152-.305-.369l1.095-5.301a.306.306 0 0 0-.388-.355l-1.433.435a.306.306 0 0 1-.389-.354l.69-3.375a.306.306 0 0 0-.37-.36l-2.32.536a.306.306 0 0 1-.374-.316zm14.976-7.926L17.284 3.74l-.544 1.887l2.077-.4a.8.8 0 0 1 .84.369a.8.8 0 0 1 .034.783L12.9 19.93l-.013.025l-.015.023l-.122.19a.801.801 0 0 1-.672.37a.826.826 0 0 1-.634-.302a.8.8 0 0 1-.16-.67l1.029-4.981l-1.12.34a.81.81 0 0 1-.86-.262a.802.802 0 0 1-.165-.67l.63-3.08l-2.027.468a.808.808 0 0 1-.768-.233a.81.81 0 0 1-.217-.6l.389-6.57l-7.44-1.33a.612.612 0 0 0-.64.906L11.58 23.691a.612.612 0 0 0 1.066-.004l11.26-20.135a.612.612 0 0 0-.644-.9z"
                />
              </svg>

              <p class="inline">Vite React.js sample client.</p>
            </a>
          </div>
        </div>
      </section>
      <section>
        <div
          class="container mx-auto p-6 py-20 text-center dark:bg-gray-900 lg:px-8"
        >
          <h2 class=" text-5xl font-bold">Our team is here to help you.</h2>
          <p class="mt-6">
            Looking to build a website but not sure where to start? Look no
            further. With Blockenberg, we're here to help. Our Content
            Management System (CMS) is a powerful text editor that allows you to
            create and customize your website to your exact specifications.
            Whether you're looking to build a sleek portfolio, an online store,
            or a video tutorial site, Blockenberg has got you covered.
          </p>
          <div class="flex justify-center p-4">
            <a rel="noopener noreferrer " href="mailto:adamsobotka@duck.com">
              Get in touch with Adam &gt;
            </a>
          </div>
          <img
            src="https://images.unsplash.com/photo-1500405079076-d1d5a841e112?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2196&q=80"
            alt=""
            class="mt-8 h-auto max-h-96 w-full rounded object-cover dark:bg-gray-500"
          />
        </div>
      </section>
    </div>
  </main>
</div>
