

export const index = 2;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/pages/_page.svelte.js')).default;
export const imports = ["_app/immutable/nodes/2.DJSrn87r.js","_app/immutable/chunks/scheduler.CnTyGv2p.js","_app/immutable/chunks/index.qBv-zQI8.js","_app/immutable/chunks/Icon.DelqvlXK.js"];
export const stylesheets = [];
export const fonts = [];
