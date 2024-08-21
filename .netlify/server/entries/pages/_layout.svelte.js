import { g as get_store_value, c as create_ssr_component, v as validate_component } from "../../chunks/ssr.js";
/* empty css               */
import { computePosition, autoUpdate, flip, shift, offset, arrow } from "@floating-ui/dom";
import { I as Icon } from "../../chunks/Icon.js";
import { w as writable, r as readable } from "../../chunks/index.js";
const storePopup = writable(void 0);
const stores = {};
function localStorageStore(key, initialValue, options) {
  if (!stores[key]) {
    const store = writable(initialValue, (set2) => {
    });
    const { subscribe, set } = store;
    stores[key] = {
      set(value) {
        set(value);
      },
      update(updater) {
        const value = updater(get_store_value(store));
        set(value);
      },
      subscribe
    };
  }
  return stores[key];
}
localStorageStore("modeOsPrefers", false);
localStorageStore("modeUserPrefers", void 0);
localStorageStore("modeCurrent", false);
function prefersReducedMotion() {
  return false;
}
readable(prefersReducedMotion(), (set) => {
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  storePopup.set({
    computePosition,
    autoUpdate,
    flip,
    shift,
    offset,
    arrow
  });
  return `<div class="h-lvh w-lvh flex flex-col card justify-center align-middle items-center"><p class="h1 m-5 font-bold font-serif" data-svelte-h="svelte-vekd1m">Voice Enabled ATM</p> <div class="h-3/4 w-3/4 outline-primary-500 outline-8 outline">${slots.default ? slots.default({}) : ``}</div> <div class="m-5 flex flex-row py-5 w-3/4 gap-5 justify-center items-center" data-svelte-h="svelte-mijg63"><div class="rounded-full variant-filled-primary h-4 w-4"></div> <div class="h-3 w-96 rounded-sm variant-filled-primary"></div> <div class="rounded-full variant-filled-primary h-4 w-4"></div></div> ${validate_component(Icon, "Icon").$$render(
    $$result,
    {
      icon: "ic:twotone-atm",
      width: "1.2em",
      height: "1.2em"
    },
    {},
    {}
  )}</div>`;
});
export {
  Layout as default
};
