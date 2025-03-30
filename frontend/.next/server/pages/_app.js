const CHUNK_PUBLIC_PATH = "server/pages/_app.js";
const runtime = require("../chunks/ssr/[turbopack]_runtime.js");
runtime.loadChunk("server/chunks/ssr/node_modules_@mui_system_esm_1203ec0c._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_@mui_material_979b394a._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_@popperjs_core_lib_62fd8b49._.js");
runtime.loadChunk("server/chunks/ssr/node_modules_b9bc6983._.js");
runtime.loadChunk("server/chunks/ssr/[root of the server]__28333a71._.js");
runtime.getOrInstantiateRuntimeModule("[project]/pages/_app.js [ssr] (ecmascript)", CHUNK_PUBLIC_PATH);
module.exports = runtime.getOrInstantiateRuntimeModule("[project]/pages/_app.js [ssr] (ecmascript)", CHUNK_PUBLIC_PATH).exports;
