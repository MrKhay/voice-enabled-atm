import { b as getContext, c as create_ssr_component, d as subscribe, e as escape } from "../../chunks/ssr.js";
/* empty css               */
import "../../chunks/exports.js";
import "devalue";
function get(key, parse = JSON.parse) {
  try {
    return parse(sessionStorage[key]);
  } catch {
  }
}
const SNAPSHOT_KEY = "sveltekit:snapshot";
const SCROLL_KEY = "sveltekit:scroll";
get(SCROLL_KEY) ?? {};
get(SNAPSHOT_KEY) ?? {};
const getStores = () => {
  const stores = getContext("__svelte__");
  return {
    /** @type {typeof page} */
    page: {
      subscribe: stores.page.subscribe
    },
    /** @type {typeof navigating} */
    navigating: {
      subscribe: stores.navigating.subscribe
    },
    /** @type {typeof updated} */
    updated: stores.updated
  };
};
const page = {
  subscribe(fn) {
    const store = getStores().page;
    return store.subscribe(fn);
  }
};
const Error$1 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<body><div class="h-full flex flex-col items-center justify-center outline"><div class="w-5/6 flex flex-col"><span class="text-lg font-thin text-error-500 mb-5">${escape($page.status)} ERROR</span> <span class="text-6xl font-bold">Oop... ${escape($page.error?.message)}</span> <a href="/" class="btn btn-sm variant-soft-primary self-end mt-3" data-svelte-h="svelte-1vndlfc">Go home</a></div></div></body>`;
});
export {
  Error$1 as default
};
