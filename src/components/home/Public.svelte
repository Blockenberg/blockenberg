<script lang="ts">
  import { sessionStore } from '$src/stores';
</script>

<div class="md:p-6">
  <main>
    <div class="container mx-auto flex flex-col space-y-20 lg:space-y-32 ">
      <section class="text-stone-100 ">
        <div
          class="container mx-auto flex max-w-7xl flex-col items-center justify-center md:px-5 "
        >
          <div
            class="h-80 w-full bg-stone-50 bg-fixed dark:bg-stone-500 md:h-[500px] rounded"
            style="background-image: url(https://images.unsplash.com/photo-1569263975210-c4290a88eab0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80);background-size: cover"
          />
          <div
            class="relative w-full rounded-2xl bg-stone-50 px-1 py-12 text-center text-stone-900 dark:bg-stone-900 dark:text-stone-50 md:-top-24 md:px-8 lg:w-2/3"
          >
            <div class="my-6 text-xs font-bold uppercase">
              Blockenberg Content Management System
            </div>
            <h1 class="mb-4 text-4xl font-bold md:text-6xl">
              Publish with Blockenberg
            </h1>
            <p class="mb-8 text-lg leading-relaxed">
              Headless and decentralized. The unstoppable CMS for censorship
              resistant, decentralized world.
            </p>
            <div
              class="flex flex-col items-center justify-center space-y-4 md:flex-row md:space-x-4 md:space-y-0"
            >
              <a
                href="/register"
                class="w-full justify-center rounded-2xl border-2 border-violet-600  bg-violet-600 px-4 py-2 text-xl font-semibold text-white transition-all delay-150 duration-1000 hover:bg-violet-700 focus:outline-none dark:bg-violet-600  dark:text-violet-50 dark:hover:bg-violet-800  md:w-40"
              >
                Register
              </a>
              <a
                href="/recover"
                class="w-full justify-center rounded-2xl border-2 border-violet-600 px-4 py-2 text-xl font-semibold text-violet-600 transition-all delay-150 duration-1000 hover:border-violet-600 hover:bg-violet-100 focus:outline-none  dark:bg-stone-900  dark:text-violet-50 dark:hover:bg-violet-900  md:w-40"
              >
                Recover
              </a>
            </div>
          </div>
        </div>
      </section>
      <section class=" dark:text-stone-100 rounded-2xl">
        <div
          class="container grid gap-6 mx-auto text-center lg:grid-cols-2 xl:grid-cols-5 justify-center"
        >
          <div
            class="w-full px-6 py-16 sm:px-12 md:px-16 xl:col-span-2"
          >
            <h1 class="text-5xl font-extrabold dark:text-stone-50">
              Own everything you create.
            </h1>

            <div class="my-16 flex flex-col gap-6 ">
              <div class="flex flex-col items-center p-8 md:space-y-4 ">
                <div
                  class="mb-2 flex h-12 w-12 flex-shrink-0 items-center justify-center bg-violet-600 text-xl font-bold text-stone-100 dark:bg-violet-600 rounded-full"
                >
                  1
                </div>
                <p class="text-center text-xl ">
                  <b>Own your data.</b>
                  Blockenberg publishes on your decentralized account
                </p>
              </div>
              <div class="flex flex-col items-center p-8 md:space-y-4 ">
                <div
                  class="mb-2 flex h-12 w-12 flex-shrink-0 items-center justify-center bg-violet-600 text-xl font-bold text-stone-100 dark:bg-violet-600 rounded-full"
                >
                  2
                </div>
                <p class="text-center text-xl ">
                  <b>Easy to use.</b>
                  No blockchain or development knowledge required
                </p>
              </div>
              <div class="flex flex-col items-center p-8 md:space-y-4 ">
                <div
                  class="mb-2 flex h-12 w-12 flex-shrink-0 items-center justify-center bg-violet-600 text-xl font-bold text-stone-100 dark:bg-violet-600 rounded-full"
                >
                  3
                </div>
                <p class="text-center text-xl ">
                  <b>Use it anywhere.</b>
                  Build your app using your favourite tools, and deploy!
                </p>
              </div>
            </div>
          </div>
          <img
            src="kindagartner.svg"
            alt="kinda gartner chart"
            class="object-cover w-full xl:col-span-3"
          />
        </div>
      </section>
      <section>
        <div class=" bg-stone-100 sm:p-8 dark:bg-stone-800 rounded-2xl">
          <div class="flex flex-col p-8 sm:flex-row sm:space-x-8 ">
            <div class="sm:w-1/2 lg:px-4">
              <h2
                class="mb-4 mt-6 text-3xl font-bold dark:text-stone-50 sm:mt-0"
              >
                Create with us
              </h2>
              <p class="dark:text-stone-200">
                We provide the content creation interface. If you are familiar
                with WordPress, we are the "admin". In order to display your
                page, you need an application - this is the "headless"
                principle. You can bootstrap the development with sample
                application (coming soon) or build your own. In this approach,
                we are similar to Contently or Hygraph.
              </p>
            </div>
            <div class="sm:w-1/2 lg:px-4">
              <h2
                class="mb-4 mt-6 text-3xl font-bold dark:text-stone-50 sm:mt-0"
              >
                It’s all yours
              </h2>
              <p class="dark:text-stone-200">
                Another difference between Blockenberg and WordPress is that
                instead of the database we use the blockchain technology. All
                your data are bound to the account you created and published on
                the distributed network. We don't control and can't influence
                what you are publishing in any means. Birds around are symbol of
                freedom - we (and Lincoln) belive that those who deny freedom to
                others deserve it not for themselves.
              </p>
            </div>
          </div>
          <div class="mt-4 mb-12 flex justify-center">
            <a
              href="/register"
              class="w-40 justify-center rounded-2xl border-2 border-violet-600  bg-violet-600 px-4 py-2 text-center text-xl font-semibold text-white transition-all delay-150 duration-1000 hover:bg-violet-700 focus:outline-none  dark:bg-violet-600 dark:text-violet-50  dark:hover:bg-violet-800"
            >
              Register
            </a>
          </div>
        </div>
      </section>
      <section>
        <div class="grid gap-6 lg:mx-40 lg:grid-cols-3 ">
          <div class="overflow-hidden lg:col-span-3 lg:flex rounded-2xl">
            <img
              src="https://images.unsplash.com/photo-1517061391662-b09454c10462?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2133&q=80"
              alt=""
              class="h-auto max-h-96 w-full bg-stone-50 object-cover dark:bg-stone-500"
            />
            <div
              class="space-y-6 bg-stone-50 p-6 dark:bg-stone-900 md:flex md:flex-col lg:p-8"
            >
              <span
                class="self-start bg-violet-600 px-3 py-1 text-sm text-stone-100 dark:bg-violet-600 dark:text-stone-50 rounded-2xl"
              >
                How to
              </span>
              <h2 class="text-5xl font-bold md:flex-1">
                <a
                  class="hover:underline"
                  href="https://cms-blockenberg.vercel.app/posts/bafybeifmugtbgxhtnhzdtf63fh2fm5oplsf7fssvfpxdoe24s2jsrqsghu"
                >
                  How to start with Blockenberg
                </a>
              </h2>
              <div>
                <p class="dark:text-stone-200">Mar 2, 2023</p>
                <p class="dark:text-stone-200">By Adam Sobotka</p>
              </div>
            </div>
          </div>
          <div
            class="flex justify-center bg-stone-50 p-6 dark:bg-stone-900 lg:p-8 lg:py-12 rounded-2xl"
          >
            <a
              href="https://cms-blockenberg.vercel.app/"
              class="flex font-medium text-violet-600 hover:underline dark:text-stone-50"
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
            class="flex justify-center bg-stone-50 p-6 dark:bg-stone-900 lg:p-8 lg:py-12 rounded-2xl"
          >
            <a
              href="https://blockenblog.netlify.app/"
              class=" flex font-medium text-violet-600 hover:underline dark:text-stone-50"
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
            class="flex justify-center bg-stone-50 p-6 dark:bg-stone-900 lg:p-8 lg:py-12 rounded-2xl"
          >
            <a
              href="https://blockenblog.surge.sh/"
              class="flex font-medium text-violet-600 hover:underline dark:text-stone-50"
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
          class="container mx-auto p-6 py-20 text-center dark:bg-stone-900 lg:px-8 rounded-2xl"
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
          <div class="flex justify-center p-4 sm:p-8">
            <a
              rel="noopener noreferrer "
              href="mailto:adam@blockenberg.xyz"
              class="rounded-2xl border-2 border-violet-600 px-4 py-2 text-violet-600 transition-all delay-150 duration-1000 hover:border-violet-600 hover:bg-violet-600 hover:text-stone-50  dark:bg-violet-600 dark:text-violet-50  dark:hover:bg-violet-800"
            >
              Get in touch with Adam
            </a>
          </div>
          <img
            src="https://images.unsplash.com/photo-1500405079076-d1d5a841e112?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2196&q=80"
            alt=""
            class="mt-8 h-auto max-h-96 w-full rounded-2xl object-cover dark:bg-stone-500"
          />
        </div>
      </section>
    </div>
  </main>
</div>
