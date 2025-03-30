(globalThis.TURBOPACK = globalThis.TURBOPACK || []).push(["static/chunks/components_WindHumidityMap_3c708b32.js", {

"[project]/components/WindHumidityMap.js [client] (ecmascript)": ((__turbopack_context__) => {
"use strict";

var { g: global, __dirname, k: __turbopack_refresh__, m: module } = __turbopack_context__;
{
__turbopack_context__.s({
    "default": (()=>__TURBOPACK__default__export__)
});
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/jsx-dev-runtime.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react/index.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$MapContainer$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/MapContainer.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$TileLayer$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/TileLayer.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$CircleMarker$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/CircleMarker.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Popup$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/Popup.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/react-leaflet/lib/hooks.js [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$ease$2f$src$2f$cubic$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__cubicInOut__as__easeCubic$3e$__ = __turbopack_context__.i("[project]/node_modules/d3-ease/src/cubic.js [client] (ecmascript) <export cubicInOut as easeCubic>");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature();
;
;
;
;
;
// Animate map movements
const MapAutoZoom = ({ data })=>{
    _s();
    const map = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMap"])();
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "MapAutoZoom.useEffect": ()=>{
            if (data.length > 0) {
                const bounds = data.map({
                    "MapAutoZoom.useEffect.bounds": (d)=>[
                            d.lat,
                            d.lon
                        ]
                }["MapAutoZoom.useEffect.bounds"]);
                map.fitBounds(bounds, {
                    padding: [
                        50,
                        50
                    ],
                    maxZoom: 8
                });
            }
        }
    }["MapAutoZoom.useEffect"], [
        data,
        map
    ]);
    return null;
};
_s(MapAutoZoom, "IoceErwr5KVGS9kN4RQ1bOkYMAg=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$hooks$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useMap"]
    ];
});
_c = MapAutoZoom;
const WindHumidityMap = ()=>{
    _s1();
    const [sensorData, setSensorData] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useState"])([]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$index$2e$js__$5b$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "WindHumidityMap.useEffect": ()=>{
            const ws = new WebSocket("ws://localhost:8000");
            ws.onmessage = ({
                "WindHumidityMap.useEffect": (event)=>{
                    try {
                        const newData = JSON.parse(event.data);
                        const lat = parseFloat(newData.lat);
                        const lon = parseFloat(newData.lon);
                        const humidity = parseFloat(newData.humidity);
                        const wind = parseFloat(newData.wind);
                        const pm25 = parseFloat(newData.pm25);
                        const temp = parseFloat(newData.temp);
                        if (isNaN(lat) || isNaN(lon)) return;
                        setSensorData({
                            "WindHumidityMap.useEffect": (prev)=>[
                                    ...prev.slice(-100),
                                    {
                                        lat,
                                        lon,
                                        humidity,
                                        wind,
                                        pm25,
                                        temp
                                    }
                                ]
                        }["WindHumidityMap.useEffect"]);
                    } catch (error) {
                        console.error("Error parsing WebSocket data:", error);
                    }
                }
            })["WindHumidityMap.useEffect"];
            return ({
                "WindHumidityMap.useEffect": ()=>ws.close()
            })["WindHumidityMap.useEffect"];
        }
    }["WindHumidityMap.useEffect"], []);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$MapContainer$2e$js__$5b$client$5d$__$28$ecmascript$29$__["MapContainer"], {
        center: [
            20.5937,
            78.9629
        ],
        zoom: 5,
        style: {
            height: "100vh",
            width: "100%"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$TileLayer$2e$js__$5b$client$5d$__$28$ecmascript$29$__["TileLayer"], {
                url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
            }, void 0, false, {
                fileName: "[project]/components/WindHumidityMap.js",
                lineNumber: 58,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(MapAutoZoom, {
                data: sensorData
            }, void 0, false, {
                fileName: "[project]/components/WindHumidityMap.js",
                lineNumber: 60,
                columnNumber: 7
            }, this),
            sensorData.map((data, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$client$5d$__$28$ecmascript$29$__["motion"].div, {
                    animate: {
                        scale: [
                            0.5,
                            1,
                            0.5
                        ],
                        opacity: [
                            0.8,
                            1,
                            0.8
                        ]
                    },
                    transition: {
                        duration: 2,
                        ease: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$d3$2d$ease$2f$src$2f$cubic$2e$js__$5b$client$5d$__$28$ecmascript$29$__$3c$export__cubicInOut__as__easeCubic$3e$__["easeCubic"],
                        repeat: Infinity
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$CircleMarker$2e$js__$5b$client$5d$__$28$ecmascript$29$__["CircleMarker"], {
                            center: [
                                data.lat,
                                data.lon
                            ],
                            radius: data.wind * 0.4,
                            color: "blue",
                            fillOpacity: 0.6,
                            weight: 1,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Popup$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Popup"], {
                                children: [
                                    "💨 Wind: ",
                                    data.wind,
                                    " km/h"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/WindHumidityMap.js",
                                lineNumber: 76,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/WindHumidityMap.js",
                            lineNumber: 69,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$CircleMarker$2e$js__$5b$client$5d$__$28$ecmascript$29$__["CircleMarker"], {
                            center: [
                                data.lat,
                                data.lon
                            ],
                            radius: data.humidity * 0.3,
                            color: "green",
                            fillOpacity: 0.5,
                            weight: 1,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Popup$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Popup"], {
                                children: [
                                    "💧 Humidity: ",
                                    data.humidity,
                                    "%"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/WindHumidityMap.js",
                                lineNumber: 87,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/WindHumidityMap.js",
                            lineNumber: 80,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$CircleMarker$2e$js__$5b$client$5d$__$28$ecmascript$29$__["CircleMarker"], {
                            center: [
                                data.lat,
                                data.lon
                            ],
                            radius: data.pm25 * 0.2,
                            color: "red",
                            fillOpacity: 0.4,
                            weight: 1,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Popup$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Popup"], {
                                children: [
                                    "🌫️ PM 2.5: ",
                                    data.pm25
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/WindHumidityMap.js",
                                lineNumber: 98,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/WindHumidityMap.js",
                            lineNumber: 91,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$CircleMarker$2e$js__$5b$client$5d$__$28$ecmascript$29$__["CircleMarker"], {
                            center: [
                                data.lat,
                                data.lon
                            ],
                            radius: data.temp * 0.3,
                            color: "orange",
                            fillOpacity: 0.5,
                            weight: 1,
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$react$2d$leaflet$2f$lib$2f$Popup$2e$js__$5b$client$5d$__$28$ecmascript$29$__["Popup"], {
                                children: [
                                    "🌡️ Temp: ",
                                    data.temp,
                                    "°C"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/WindHumidityMap.js",
                                lineNumber: 109,
                                columnNumber: 13
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/WindHumidityMap.js",
                            lineNumber: 102,
                            columnNumber: 11
                        }, this)
                    ]
                }, index, true, {
                    fileName: "[project]/components/WindHumidityMap.js",
                    lineNumber: 63,
                    columnNumber: 9
                }, this))
        ]
    }, void 0, true, {
        fileName: "[project]/components/WindHumidityMap.js",
        lineNumber: 53,
        columnNumber: 5
    }, this);
};
_s1(WindHumidityMap, "1nhtCuo77g5P4S+mPowAJ6vh298=");
_c1 = WindHumidityMap;
const __TURBOPACK__default__export__ = WindHumidityMap;
var _c, _c1;
__turbopack_context__.k.register(_c, "MapAutoZoom");
__turbopack_context__.k.register(_c1, "WindHumidityMap");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(module, globalThis.$RefreshHelpers$);
}
}}),
"[project]/components/WindHumidityMap.js [client] (ecmascript, next/dynamic entry)": ((__turbopack_context__) => {

var { g: global, __dirname } = __turbopack_context__;
{
__turbopack_context__.n(__turbopack_context__.i("[project]/components/WindHumidityMap.js [client] (ecmascript)"));
}}),
}]);

//# sourceMappingURL=components_WindHumidityMap_3c708b32.js.map