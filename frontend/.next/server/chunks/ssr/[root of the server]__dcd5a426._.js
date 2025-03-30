module.exports = {

"[externals]/@deck.gl/react [external] (@deck.gl/react, esm_import)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
const mod = await __turbopack_context__.y("@deck.gl/react");

__turbopack_context__.n(mod);
__turbopack_async_result__();
} catch(e) { __turbopack_async_result__(e); } }, true);}),
"[externals]/@deck.gl/geo-layers [external] (@deck.gl/geo-layers, esm_import)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, a: __turbopack_async_module__ } = __turbopack_context__;
__turbopack_async_module__(async (__turbopack_handle_async_dependencies__, __turbopack_async_result__) => { try {
const mod = await __turbopack_context__.y("@deck.gl/geo-layers");

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
var __TURBOPACK__imported__module__$5b$externals$5d2f40$deck$2e$gl$2f$geo$2d$layers__$5b$external$5d$__$2840$deck$2e$gl$2f$geo$2d$layers$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@deck.gl/geo-layers [external] (@deck.gl/geo-layers, esm_import)");
var __TURBOPACK__imported__module__$5b$externals$5d2f40$deck$2e$gl$2f$layers__$5b$external$5d$__$2840$deck$2e$gl$2f$layers$2c$__esm_import$29$__ = __turbopack_context__.i("[externals]/@deck.gl/layers [external] (@deck.gl/layers, esm_import)");
var __turbopack_async_dependencies__ = __turbopack_handle_async_dependencies__([
    __TURBOPACK__imported__module__$5b$externals$5d2f40$deck$2e$gl$2f$react__$5b$external$5d$__$2840$deck$2e$gl$2f$react$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f40$deck$2e$gl$2f$geo$2d$layers__$5b$external$5d$__$2840$deck$2e$gl$2f$geo$2d$layers$2c$__esm_import$29$__,
    __TURBOPACK__imported__module__$5b$externals$5d2f40$deck$2e$gl$2f$layers__$5b$external$5d$__$2840$deck$2e$gl$2f$layers$2c$__esm_import$29$__
]);
([__TURBOPACK__imported__module__$5b$externals$5d2f40$deck$2e$gl$2f$react__$5b$external$5d$__$2840$deck$2e$gl$2f$react$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f40$deck$2e$gl$2f$geo$2d$layers__$5b$external$5d$__$2840$deck$2e$gl$2f$geo$2d$layers$2c$__esm_import$29$__, __TURBOPACK__imported__module__$5b$externals$5d2f40$deck$2e$gl$2f$layers__$5b$external$5d$__$2840$deck$2e$gl$2f$layers$2c$__esm_import$29$__] = __turbopack_async_dependencies__.then ? (await __turbopack_async_dependencies__)() : __turbopack_async_dependencies__);
;
;
;
;
;
const INITIAL_VIEW_STATE = {
    longitude: 78.9629,
    latitude: 20.5937,
    zoom: 5,
    pitch: 40,
    bearing: 0
};
const WindHumidityMap = ()=>{
    const [geojsonData, setGeojsonData] = (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useState"])({
        type: "FeatureCollection",
        features: []
    });
    (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react__$5b$external$5d$__$28$react$2c$__cjs$29$__["useEffect"])(()=>{
        const ws = new WebSocket("ws://localhost:8000");
        ws.onmessage = (event)=>{
            try {
                console.log("Raw WebSocket Data:", event.data);
                const newData = JSON.parse(event.data);
                // Trim unwanted characters (like \r)
                Object.keys(newData).forEach((key)=>{
                    if (typeof newData[key] === "string") {
                        newData[key] = newData[key].trim();
                    }
                });
                const lat = parseFloat(newData.lat);
                const lon = parseFloat(newData.lon);
                const humidity = parseFloat(newData.humidity);
                const wind = parseFloat(newData.wind);
                if (isNaN(lat) || isNaN(lon)) {
                    console.warn("❌ Invalid lat/lon:", newData.lat, newData.lon);
                    return;
                }
                const newFeature = {
                    type: "Feature",
                    geometry: {
                        type: "Point",
                        coordinates: [
                            lon,
                            lat
                        ]
                    },
                    properties: {
                        humidity: isNaN(humidity) ? 0 : humidity,
                        wind: isNaN(wind) ? 0 : wind
                    }
                };
                setGeojsonData((prev)=>({
                        type: "FeatureCollection",
                        features: [
                            ...prev.features,
                            newFeature
                        ].slice(-100)
                    }));
            } catch (error) {
                console.error("❌ Error parsing WebSocket data:", error);
            }
        };
        return ()=>ws.close();
    }, []);
    // ✅ Ensure we don't pass an empty array (avoids "GeoJSON does not have type" error)
    const layers = [];
    if (geojsonData.features.length > 0) {
        layers.push(new __TURBOPACK__imported__module__$5b$externals$5d2f40$deck$2e$gl$2f$layers__$5b$external$5d$__$2840$deck$2e$gl$2f$layers$2c$__esm_import$29$__["ScatterplotLayer"]({
            id: "wind-layer",
            data: geojsonData.features,
            getPosition: (d)=>d.geometry.coordinates,
            getRadius: 5000,
            getColor: [
                0,
                150,
                255
            ],
            opacity: 0.7,
            pickable: true
        }));
        layers.push(new __TURBOPACK__imported__module__$5b$externals$5d2f40$deck$2e$gl$2f$layers__$5b$external$5d$__$2840$deck$2e$gl$2f$layers$2c$__esm_import$29$__["ScatterplotLayer"]({
            id: "humidity-layer",
            data: geojsonData.features,
            getPosition: (d)=>d.geometry.coordinates,
            getRadius: (d)=>(d.properties.humidity || 1) * 100,
            getColor: [
                0,
                255,
                150
            ],
            opacity: 0.5,
            pickable: true
        }));
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$externals$5d2f$react$2f$jsx$2d$dev$2d$runtime__$5b$external$5d$__$28$react$2f$jsx$2d$dev$2d$runtime$2c$__cjs$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$externals$5d2f40$deck$2e$gl$2f$react__$5b$external$5d$__$2840$deck$2e$gl$2f$react$2c$__esm_import$29$__["default"], {
        initialViewState: INITIAL_VIEW_STATE,
        controller: true,
        layers: [
            new __TURBOPACK__imported__module__$5b$externals$5d2f40$deck$2e$gl$2f$geo$2d$layers__$5b$external$5d$__$2840$deck$2e$gl$2f$geo$2d$layers$2c$__esm_import$29$__["TileLayer"]({
                id: "base-map",
                data: "https://a.tile.openstreetmap.org/{z}/{x}/{y}.png",
                minZoom: 0,
                maxZoom: 19
            }),
            ...layers
        ]
    }, void 0, false, {
        fileName: "[project]/components/WindHumidityMap.js",
        lineNumber: 98,
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

//# sourceMappingURL=%5Broot%20of%20the%20server%5D__dcd5a426._.js.map