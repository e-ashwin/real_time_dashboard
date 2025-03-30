module.exports = {

"[externals]/@deck.gl/react [external] (@deck.gl/react, esm_import)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
const mod = await __turbopack_context__.y("@deck.gl/react");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/@deck.gl/carto [external] (@deck.gl/carto, esm_import)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
const mod = await __turbopack_context__.y("@deck.gl/carto");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/@deck.gl/layers [external] (@deck.gl/layers, esm_import)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
const mod = await __turbopack_context__.y("@deck.gl/layers");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[project]/components/WindHumidityMap.js [ssr] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react/jsx-dev-runtime [external] (react/jsx-dev-runtime, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__ = __turbopack_context__.i("[externals]/react [external] (react, cjs)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$deck$2e$gl$2f$react__$5b$external$5d$__$2840$deck$2e$gl$2f$react$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@deck.gl/react [external] (@deck.gl/react, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$deck$2e$gl$2f$carto__$5b$external$5d$__$2840$deck$2e$gl$2f$carto$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@deck.gl/carto [external] (@deck.gl/carto, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$deck$2e$gl$2f$layers__$5b$external$5d$__$2840$deck$2e$gl$2f$layers$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@deck.gl/layers [external] (@deck.gl/layers, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$deck$2e$gl$2f$react__$5b$external$5d$__$2840$deck$2e$gl$2f$react$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f40$deck$2e$gl$2f$carto__$5b$external$5d$__$2840$deck$2e$gl$2f$carto$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f40$deck$2e$gl$2f$layers__$5b$external$5d$__$2840$deck$2e$gl$2f$layers$2c$__esm_import$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f40$deck$2e$gl$2f$react__$5b$external$5d$__$2840$deck$2e$gl$2f$react$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f40$deck$2e$gl$2f$carto__$5b$external$5d$__$2840$deck$2e$gl$2f$carto$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f40$deck$2e$gl$2f$layers__$5b$external$5d$__$2840$deck$2e$gl$2f$layers$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
;
;
;
// Set CARTO Credentials (No API Key Required for Public Basemap)
(0, __TURBOPACK__imported__module__$5b$externals$5d2f40$deck$2e$gl$2f$carto__$5b$external$5d$__$2840$deck$2e$gl$2f$carto$2c$__esm_import$29$__["setDefaultCredentials"])({
    username: "public",
    apiKey: "default_public"
});
const INITIAL_VIEW_STATE = {
    longitude: 78.9629,
    latitude: 20.5937,
    zoom: 5,
    pitch: 40,
    bearing: 0
};
const WindHumidityMap = ()=>{
    const [data, setData] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])([]);
    // Fetch real-time data from WebSocket server
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const ws = new WebSocket("ws://localhost:8000");
        ws.onmessage = (event)=>{
            const newData = JSON.parse(event.data);
            setData((prevData)=>[
                    ...prevData,
                    newData
                ]);
        };
        return ()=>ws.close();
    }, []);
    // Wind Layer (Lines Representing Wind)
    const windLayer = new __TURBOPACK__imported__module__$5b$externals$5d2f40$deck$2e$gl$2f$layers__$5b$external$5d$__$2840$deck$2e$gl$2f$layers$2c$__esm_import$29$__["ScatterplotLayer"]({
        id: "wind-layer",
        data,
        getPosition: (d)=>[
                parseFloat(d.lon),
                parseFloat(d.lat)
            ],
        getRadius: 5000,
        getColor: [
            0,
            150,
            255
        ],
        opacity: 0.7
    });
    // Humidity Layer (Droplet-Like Points)
    const humidityLayer = new __TURBOPACK__imported__module__$5b$externals$5d2f40$deck$2e$gl$2f$layers__$5b$external$5d$__$2840$deck$2e$gl$2f$layers$2c$__esm_import$29$__["ScatterplotLayer"]({
        id: "humidity-layer",
        data,
        getPosition: (d)=>[
                parseFloat(d.lon),
                parseFloat(d.lat)
            ],
        getRadius: (d)=>d.humidity * 100,
        getColor: [
            0,
            255,
            150
        ],
        opacity: 0.5
    });
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$deck$2e$gl$2f$react__$5b$external$5d$__$2840$deck$2e$gl$2f$react$2c$__esm_import$29$__["default"], {
        initialViewState: INITIAL_VIEW_STATE,
        controller: true,
        layers: [
            new __TURBOPACK__imported__module__$5b$externals$5d2f40$deck$2e$gl$2f$carto__$5b$external$5d$__$2840$deck$2e$gl$2f$carto$2c$__esm_import$29$__["CartoLayer"]({
                id: "base-map",
                connection: "bigquery",
                type: "tileset"
            }),
            windLayer,
            humidityLayer
        ]
    }, void 0, false, {
        fileName: "[project]/components/WindHumidityMap.js",
        lineNumber: 56,
        columnNumber: 5
    }, this);
};
const __TURBOPACK__default__export__ = WindHumidityMap;
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, false);}),
"[project]/components/WindHumidityMap.js [ssr] (ecmascript, next/dynamic entry)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/components/WindHumidityMap.js [ssr] (ecmascript)"));
}}),

};

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__16a6899e._.js.map