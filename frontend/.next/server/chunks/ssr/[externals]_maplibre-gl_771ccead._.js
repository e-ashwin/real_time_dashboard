module.exports = {

"[externals]/maplibre-gl [external] (maplibre-gl, cjs, async loader)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.v((parentImport) => {
    return Promise.all([
  "server/chunks/ssr/[externals]_maplibre-gl_aaf45e5e._.js"
].map((chunk) => __turbopack_context__.l(chunk))).then(() => {
        return parentImport("[externals]/maplibre-gl [external] (maplibre-gl, cjs)");
    });
});
}}),

};