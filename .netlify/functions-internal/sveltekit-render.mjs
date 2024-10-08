import { init } from '../serverless.js';

export const handler = init((() => {
function __memo(fn) {
	let value;
	return () => value ??= (value = fn());
}

return {
	appDir: "_app",
	appPath: "_app",
	assets: new Set(["favicon.png"]),
	mimeTypes: {".png":"image/png"},
	_: {
		client: {"start":"_app/immutable/entry/start.Cyz2LW7F.js","app":"_app/immutable/entry/app.DABlS6EM.js","imports":["_app/immutable/entry/start.Cyz2LW7F.js","_app/immutable/chunks/entry._rTOVOH0.js","_app/immutable/chunks/scheduler.CnTyGv2p.js","_app/immutable/chunks/index.CG9LOOoG.js","_app/immutable/entry/app.DABlS6EM.js","_app/immutable/chunks/scheduler.CnTyGv2p.js","_app/immutable/chunks/index.qBv-zQI8.js"],"stylesheets":[],"fonts":[],"uses_env_dynamic_public":false},
		nodes: [
			__memo(() => import('../server/nodes/0.js')),
			__memo(() => import('../server/nodes/1.js')),
			__memo(() => import('../server/nodes/2.js'))
		],
		routes: [
			{
				id: "/",
				pattern: /^\/$/,
				params: [],
				page: { layouts: [0,], errors: [1,], leaf: 2 },
				endpoint: null
			}
		],
		matchers: async () => {
			
			return {  };
		},
		server_assets: {}
	}
}
})());
