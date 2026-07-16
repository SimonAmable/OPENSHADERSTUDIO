(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/components/ui/badge.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "Badge",
    ()=>Badge
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
;
function Badge(param) {
    let { className = "", variant = "default", ...props } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "badge badge-".concat(variant).concat(className ? " ".concat(className) : ""),
        ...props
    }, void 0, false, {
        fileName: "[project]/components/ui/badge.tsx",
        lineNumber: 10,
        columnNumber: 10
    }, this);
}
_c = Badge;
var _c;
__turbopack_context__.k.register(_c, "Badge");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/components/shader-studio.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ShaderStudio",
    ()=>ShaderStudio,
    "StaticStylePreview",
    ()=>StaticStylePreview
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/components/AnimatePresence/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/framer-motion/dist/es/render/components/motion/proxy.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zustand/esm/react.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$color$2d$panels$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@paper-design/shaders-react/dist/shaders/color-panels.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$dithering$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@paper-design/shaders-react/dist/shaders/dithering.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$dot$2d$grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@paper-design/shaders-react/dist/shaders/dot-grid.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$dot$2d$orbit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@paper-design/shaders-react/dist/shaders/dot-orbit.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$god$2d$rays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@paper-design/shaders-react/dist/shaders/god-rays.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$grain$2d$gradient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@paper-design/shaders-react/dist/shaders/grain-gradient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$mesh$2d$gradient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@paper-design/shaders-react/dist/shaders/mesh-gradient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$metaballs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@paper-design/shaders-react/dist/shaders/metaballs.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$neuro$2d$noise$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@paper-design/shaders-react/dist/shaders/neuro-noise.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$perlin$2d$noise$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@paper-design/shaders-react/dist/shaders/perlin-noise.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$pulsing$2d$border$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@paper-design/shaders-react/dist/shaders/pulsing-border.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$simplex$2d$noise$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@paper-design/shaders-react/dist/shaders/simplex-noise.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$smoke$2d$ring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@paper-design/shaders-react/dist/shaders/smoke-ring.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$spiral$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@paper-design/shaders-react/dist/shaders/spiral.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$static$2d$mesh$2d$gradient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@paper-design/shaders-react/dist/shaders/static-mesh-gradient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$static$2d$radial$2d$gradient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@paper-design/shaders-react/dist/shaders/static-radial-gradient.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$swirl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@paper-design/shaders-react/dist/shaders/swirl.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$voronoi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@paper-design/shaders-react/dist/shaders/voronoi.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$warp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@paper-design/shaders-react/dist/shaders/warp.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$waves$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@paper-design/shaders-react/dist/shaders/waves.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/book-open.js [app-client] (ecmascript) <export default as BookOpen>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/check.js [app-client] (ecmascript) <export default as Check>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/chevron-down.js [app-client] (ecmascript) <export default as ChevronDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$help$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleHelp$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/circle-help.js [app-client] (ecmascript) <export default as CircleHelp>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2d$xml$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/code-xml.js [app-client] (ecmascript) <export default as Code2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/copy.js [app-client] (ecmascript) <export default as Copy>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/download.js [app-client] (ecmascript) <export default as Download>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$droplets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Droplets$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/droplets.js [app-client] (ecmascript) <export default as Droplets>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/eye.js [app-client] (ecmascript) <export default as Eye>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gauge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gauge$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/gauge.js [app-client] (ecmascript) <export default as Gauge>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageDown$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/image-down.js [app-client] (ecmascript) <export default as ImageDown>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers3$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/layers.js [app-client] (ecmascript) <export default as Layers3>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2d$pointer$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MousePointer2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/mouse-pointer-2.js [app-client] (ecmascript) <export default as MousePointer2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/palette.js [app-client] (ecmascript) <export default as Palette>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/pause.js [app-client] (ecmascript) <export default as Pause>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/play.js [app-client] (ecmascript) <export default as Play>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$redo$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Redo2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/redo-2.js [app-client] (ecmascript) <export default as Redo2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCcw$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/refresh-ccw.js [app-client] (ecmascript) <export default as RefreshCcw>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/minus.js [app-client] (ecmascript) <export default as Minus>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/save.js [app-client] (ecmascript) <export default as Save>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/search.js [app-client] (ecmascript) <export default as Search>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/sparkles.js [app-client] (ecmascript) <export default as Sparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$undo$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Undo2$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/undo-2.js [app-client] (ecmascript) <export default as Undo2>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/video.js [app-client] (ecmascript) <export default as Video>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wand$2d$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__WandSparkles$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/wand-sparkles.js [app-client] (ecmascript) <export default as WandSparkles>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__ = __turbopack_context__.i("[project]/node_modules/lucide-react/dist/esm/icons/x.js [app-client] (ecmascript) <export default as X>");
var __TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/components/ui/badge.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
const videoFormats = [
    {
        value: "video/webm;codecs=vp9",
        label: "WebM (VP9)"
    },
    {
        value: "video/webm;codecs=vp8",
        label: "WebM (VP8)"
    },
    {
        value: "video/mp4;codecs=avc1.42E01E",
        label: "MP4 (H.264)"
    }
];
const outputFrames = [
    {
        aspect: "16:9",
        label: "Widescreen",
        detail: "1920 Ãƒâ€” 1080"
    },
    {
        aspect: "1:1",
        label: "Square",
        detail: "1080 Ãƒâ€” 1080"
    },
    {
        aspect: "4:5",
        label: "Portrait feed",
        detail: "1080 Ãƒâ€” 1350"
    },
    {
        aspect: "9:16",
        label: "Vertical",
        detail: "1080 Ãƒâ€” 1920"
    }
];
const emptyCameraGeometry = {
    viewportWidth: 0,
    viewportHeight: 0,
    stageWidth: 0,
    stageHeight: 0,
    padWidth: 0,
    padHeight: 0
};
function getCameraFrame(camera, geometry) {
    const { viewportWidth, viewportHeight, stageWidth, stageHeight, padWidth, padHeight } = geometry;
    if (!viewportWidth || !viewportHeight || !stageWidth || !stageHeight) return {
        renderScale: camera.scale,
        panLimitX: 0,
        panLimitY: 0,
        cropWidth: 0,
        cropHeight: 0,
        cropCenterX: 0,
        cropCenterY: 0,
        previewScale: 1
    };
    // A zoom of 1 means the mockup fills the canvas. Values below 1 deliberately reveal the scene.
    const coverScale = Math.max(viewportWidth / stageWidth, viewportHeight / stageHeight);
    const renderScale = camera.scale * coverScale;
    // The output frame is a clipping mask, not a movement boundary. Let the
    // mockup travel completely beyond any edge so shots can frame only an edge
    // of the card or just the shader background.
    const panLimitX = (stageWidth * renderScale + viewportWidth) / 2;
    const panLimitY = (stageHeight * renderScale + viewportHeight) / 2;
    // The navigator is a miniature of the output viewport, not of the unzoomed card.
    const previewScale = padWidth && padHeight ? Math.min(padWidth / viewportWidth, padHeight / viewportHeight) : 1;
    return {
        renderScale,
        panLimitX,
        panLimitY,
        cropWidth: viewportWidth / renderScale * previewScale,
        cropHeight: viewportHeight / renderScale * previewScale,
        cropCenterX: padWidth / 2 + camera.cameraX / 50 * panLimitX * previewScale,
        cropCenterY: padHeight / 2 + camera.cameraY / 50 * panLimitY * previewScale,
        previewScale
    };
}
const useStudioStore = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zustand$2f$esm$2f$react$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["create"])((set)=>({
        saved: [],
        save: (recipe)=>set((state)=>({
                    saved: [
                        recipe,
                        ...state.saved.filter((item)=>item.id !== recipe.id)
                    ].slice(0, 8)
                })),
        remove: (id)=>set((state)=>({
                    saved: state.saved.filter((item)=>item.id !== id)
                }))
    }));
const fragmentShader = "precision highp float;\nuniform vec2 u_resolution;\nuniform float u_time;\nuniform vec2 u_pointer;\nuniform vec2 u_velocity;\nuniform vec3 u_colors[5];\nuniform float u_style, u_intensity, u_zoom, u_warp, u_contrast, u_speed, u_grain, u_drift, u_animate, u_reverse, u_rotate, u_seed, u_smooth_blend;\nuniform vec2 u_offset;\nuniform float u_cursor_on, u_cursor_effect, u_cursor_strength, u_cursor_radius;\n\nfloat hash(vec2 p) { return fract(sin(dot(p, vec2(127.1,311.7))) * 43758.5453123); }\nfloat noise(vec2 p) { vec2 i=floor(p), f=fract(p); f=f*f*(3.0-2.0*f); return mix(mix(hash(i),hash(i+vec2(1.,0.)),f.x),mix(hash(i+vec2(0.,1.)),hash(i+vec2(1.,1.)),f.x),f.y); }\nfloat fbm(vec2 p) { float v=0., a=.55; for(int i=0;i<5;i++){v+=a*noise(p);p=p*2.03+4.1;a*=.5;}return v; }\n// Exact Aurora reference noise: intentionally separate from the Studio-wide noise.\nfloat auroraHash(vec2 p){p=fract(p*vec2(234.34,435.345));p+=dot(p,p+34.23);return fract(p.x*p.y);}\nfloat auroraNoise(vec2 p){vec2 i=floor(p),f=fract(p),u=f*f*(3.-2.*f);return mix(mix(auroraHash(i),auroraHash(i+vec2(1.,0.)),u.x),mix(auroraHash(i+vec2(0.,1.)),auroraHash(i+vec2(1.,1.)),u.x),u.y);}\nfloat auroraFbm(vec2 p){float v=0.,a=.5;for(int i=0;i<5;i++){v+=a*auroraNoise(p);p=p*2.03+vec2(17.,9.2);a*=.5;}return v;}\nvec3 gradient(float t){ t=clamp(t,0.,.999); float x=t*4.; int i=int(floor(x)); float f=fract(x); if(u_smooth_blend>.5)f=f*f*(3.-2.*f); if(i==0)return mix(u_colors[0],u_colors[1],f); if(i==1)return mix(u_colors[1],u_colors[2],f); if(i==2)return mix(u_colors[2],u_colors[3],f); return mix(u_colors[3],u_colors[4],f); }\nvoid main(){\n  vec2 uv=(gl_FragCoord.xy-.5*u_resolution.xy)/u_resolution.y;\n  vec2 p=uv*u_zoom + u_offset;\n  float time=u_time*u_speed*.16*u_animate*(u_reverse>.5?-1.:1.);\n  p += vec2(sin(time*.7),cos(time*.53))*u_drift*.55 + u_seed*.001;\n  p = mat2(cos(u_rotate),-sin(u_rotate),sin(u_rotate),cos(u_rotate))*p;\n  p += vec2(sin(p.y*3.+time),cos(p.x*3.-time))*u_warp*.16;\n  float d=length(uv-u_pointer);\n  vec2 pBeforeCursor=p;\n  if(u_cursor_on>.5){\n    float influence=smoothstep(u_cursor_radius,0.,d)*u_cursor_strength;\n    vec2 dir=normalize(uv-u_pointer+0.0001);\n    if(u_cursor_effect<.5) p += u_velocity*influence*1.8;\n    else if(u_cursor_effect<1.5) p += dir*influence*.65;\n    else if(u_cursor_effect<2.5){ float a=influence*4.; p=mat2(cos(a),-sin(a),sin(a),cos(a))*p; }\n    else if(u_cursor_effect<3.5) p += dir*sin(d*32.-time*8.)*influence*.14;\n  }\n  float v;\n  if(u_style<.5){ // Silk: broad, glossy, marbled ribbons.\n    vec2 s=p*2.4; s.y+=fbm(s*.8+vec2(time*.16,0.))*2.1; s.x+=sin(s.y*1.8)*.45;\n    v=.5+.5*sin(s.y*2.5+fbm(s*1.7)*5.);\n  }\n  else if(u_style<1.5){ // Smoke: layered cloudy density.\n    float a=fbm(p*1.45+vec2(time*.11,-time*.06)); float b=fbm(p*3.1-vec2(time*.07,time*.12));\n    v=smoothstep(.22,.83,a*.72+b*.42);\n  }\n  else if(u_style<2.5){ // Waves: soft water horizon bands.\n    vec2 w=p*2.0; w.y+=fbm(w*1.4+time*.08)*.85; v=.5+.5*sin(w.y*4.2+sin(w.x*1.5+time)*.75);\n    v=mix(v,fbm(w*2.+time*.1),.18);\n  }\n  else if(u_style<3.5){ // Flow field: turbulent liquid plumes.\n    vec2 f=p*2.; f+=vec2(fbm(f+time*.09),fbm(f.yx-time*.08))*1.25; v=fbm(f*2.25);\n  }\n  else if(u_style<4.5){ // Aurora: direct reference animation/noise/transform port.\n    float auroraTime=u_time*1.41*(u_speed/2.07)*u_animate*(u_reverse>.5?-1.:1.);\n    vec2 a=uv*u_zoom;\n    a=mat2(cos(u_rotate),-sin(u_rotate),sin(u_rotate),cos(u_rotate))*a;\n    a+=u_offset;\n    a+=u_drift*vec2(sin(auroraTime*.31),cos(auroraTime*.23));\n    a+=u_warp*(vec2(auroraFbm(a*3.2+u_seed),auroraFbm(a*3.2+vec2(5.2,1.3)+u_seed))-.5);\n    a+=p-pBeforeCursor; // Keep the existing pointer modes in the reference field's space.\n    float curtain=auroraFbm(vec2(a.x*2.+auroraTime*.15,a.y*.6-auroraTime*.05)+u_seed);\n    float band=auroraFbm(vec2(a.x*3.5-auroraTime*.1,curtain*(2.+u_intensity*3.)));\n    v=smoothstep(.15,.85,band)*(1.-abs(a.y)*.7);\n  }\n  else if(u_style<5.5){ // Orb: a warm radial bloom with halo.\n    vec2 o=p-vec2(sin(time*.7)*.12,cos(time*.6)*.08); float r=length(o);\n    v=1.-smoothstep(.08,.47,r); v+=.16*exp(-r*5.)*sin(r*28.-time*2.);\n  }\n  else if(u_style<6.5){ // Caustics: refracted, cellular water light.\n    vec2 c=p*5.; c+=vec2(sin(c.y+time*.55),sin(c.x-time*.42))*.42;\n    v=pow(abs(sin(c.x+sin(c.y))*sin(c.y+sin(c.x))),.28);\n  }\n  else if(u_style<7.5){ // Mesh drift: muted soft-focus blobs.\n    vec2 m=p*1.25+vec2(time*.06,-time*.04); v=smoothstep(.22,.78,fbm(m*.85)); v=mix(v,fbm(m*2.),.24);\n  }\n  else if(u_style<8.5){ // Metaballs: three distinct fluid cells.\n    vec2 b=p*1.35; float d1=length(b-vec2(sin(time)*.28,cos(time*.7)*.2));\n    float d2=length(b-vec2(-.3+cos(time*.6)*.16,.19)); float d3=length(b-vec2(.18,sin(time*.8)*.3));\n    v=smoothstep(.34,.62,1./(1.5+d1*5.)+1./(1.5+d2*5.)+1./(1.5+d3*5.));\n  }\n  else if(u_style<9.5){ // Plasma: creamy psychedelic contours.\n    v=.5+.25*sin(p.x*4.+time)+.25*sin(p.y*5.-time*.7)+.2*sin((p.x+p.y)*4.+time*.4);\n  }\n  else if(u_style<10.5){ // Warp stripes: tightly bent graphic bands.\n    vec2 z=p*3.; z.x+=sin(z.y*1.65+time*.35)*1.2+fbm(z*.8)*.75; v=.5+.5*sin(z.x*5.8);\n  }\n  else if(u_style<11.5){ // Rings: concentric, slightly imperfect ripples.\n    float r=length(p+vec2(sin(time*.2)*.03,cos(time*.2)*.03)); v=.5+.5*sin(r*20.+fbm(p*4.)*1.4-time*.8);\n  }\n  else if(u_style<12.5){ // Halftone: regular print dots, softly displaced.\n    vec2 h=p*9.; vec2 cell=fract(h)-.5; float tone=.28+.58*fbm(floor(h)*.35); v=1.-step(tone*.42,length(cell));\n  }\n  else if(u_style<13.5){ // Aurora: the original soft curtain implementation.\n    vec2 a=p; a.x+=fbm(vec2(a.y*1.4,time*.09))*1.1; float curtain=sin(a.x*5.+fbm(a*2.+time*.12)*4.);\n    v=smoothstep(-.3,.85,curtain)*(.56+.44*fbm(a*3.-time*.08));\n  }\n  else if(u_style<14.5){ // Mesh gradient: moving, organic color spots.\n    vec2 m=p*1.4; float a=fbm(m+vec2(time*.10,-time*.06)); float b=fbm(m*1.8+vec2(-time*.05,time*.09)); v=mix(a,b,.42);\n  }\n  else if(u_style<15.5){ // Static mesh gradient: a calm, non-animated color field.\n    vec2 m=p*1.35; v=fbm(m*.9+u_seed*.01)*.62+fbm(m*2.1+vec2(7.3,1.8))* .38;\n  }\n  else if(u_style<16.5){ // Static radial gradient: nested soft color blooms.\n    vec2 r=p+vec2(sin(u_seed)*.08,cos(u_seed)*.08); v=.5+.34*cos(length(r-vec2(.22,-.16))*5.)+.18*cos(length(r+vec2(.28,.22))*7.);\n  }\n  else if(u_style<17.5){ // Dithering: posterized ordered screen pattern.\n    vec2 q=floor((p+1.)*18.); float tone=fbm(q*.16+u_seed); float threshold=fract(dot(mod(q,4.),vec2(.25,.125))); v=step(threshold, tone);\n  }\n  else if(u_style<18.5){ // Grain gradient: large soft gradient with tactile grain.\n    v=.5+.32*sin(p.x*2.2+p.y*.8+time*.15)+.18*fbm(p*2.3+time*.03);\n  }\n  else if(u_style<19.5){ // Dot orbit: circles travelling around a central orbit.\n    vec2 o=p*3.; float a=atan(o.y,o.x)+time*.6; float ring=abs(length(o)-1.25-.12*sin(a*5.)); float dots=step(.78,.5+.5*sin(a*9.-time*2.)); v=(1.-smoothstep(.015,.09,ring))*dots;\n  }\n  else if(u_style<20.5){ // Dot grid: evenly spaced adjustable graphic dots.\n    vec2 g=fract(p*9.)-.5; float shade=.34+.55*fbm(floor(p*9.)*.22+u_seed); v=1.-smoothstep(shade*.08,shade*.16,length(g));\n  }\n  else if(u_style<21.5){ // Warp: stretched, refracted bands.\n    vec2 w=p*3.; w+=vec2(fbm(w.yx+time*.12),fbm(w+time*.08))*1.25; v=.5+.5*sin(w.x*4.7+w.y*1.8);\n  }\n  else if(u_style<22.5){ // Spiral: graphic arms wrapped around the centre.\n    float a=atan(p.y,p.x); float r=length(p); v=.5+.5*sin(a*6.-r*16.-time*.7);\n  }\n  else if(u_style<23.5){ // Swirl: liquid vortex contours.\n    float r=length(p); float a=atan(p.y,p.x)+1.8/(r+.18)+time*.25; v=.5+.5*sin(a*4.+r*13.);\n  }\n  else if(u_style<24.5){ // Waves: layered directional wave fronts.\n    vec2 w=p*2.7; w.y+=sin(w.x*1.7+time)*.45+fbm(w+time*.05)*.55; v=.5+.5*sin(w.y*4.8-time);\n  }\n  else if(u_style<25.5){ // Neuro noise: dense neural-like pathways.\n    vec2 n=p*4.; float a=fbm(n+time*.06); float b=fbm(n.yx*1.7-time*.04); v=pow(abs(sin((a-b)*15.)),.6);\n  }\n  else if(u_style<26.5){ // Perlin noise: soft coherent clouds.\n    v=fbm(p*3.+vec2(time*.08,-time*.04));\n  }\n  else if(u_style<27.5){ // Simplex-inspired noise: sharper, directional cloud fields.\n    vec2 n=p*3.; n=mat2(.866,-.5,.5,.866)*n; v=fbm(n+vec2(time*.07,time*.03));\n  }\n  else if(u_style<28.5){ // Voronoi: cellular distance field.\n    vec2 c=p*6.; vec2 cell=floor(c), f=fract(c); float dist=2.; for(int y=-1;y<=1;y++)for(int x=-1;x<=1;x++){vec2 g=vec2(float(x),float(y));vec2 h=vec2(hash(cell+g),hash(cell+g+4.2));dist=min(dist,length(g+h-f));} v=1.-smoothstep(.08,.72,dist);\n  }\n  else if(u_style<29.5){ // Pulsing border: luminous animated edge treatment.\n    float edge=min(.5-abs(uv.x),.5-abs(uv.y)); float pulse=.55+.45*sin(time*3.+u_seed); v=smoothstep(.015,.09,edge)*.18+(1.-smoothstep(.012,.04,edge))*pulse;\n  }\n  else if(u_style<30.5){ // Metaballs: soft merging liquid forms.\n    vec2 b=p*1.7; float m=0.; for(int i=0;i<4;i++){float fi=float(i); vec2 c=vec2(sin(time*.6+fi*1.7),cos(time*.8+fi*2.1))*.38; m+=.18/(length(b-c)+.08);} v=smoothstep(.38,.78,m);\n  }\n  else if(u_style<31.5){ // Color panels: modern overlapping translucent blocks.\n    vec2 c=p*2.5; float a=smoothstep(-.45,.45,sin(c.x+time*.18)); float b=smoothstep(-.35,.35,sin(c.y*1.5-time*.13)); float d=smoothstep(-.3,.3,sin((c.x+c.y)*.8)); v=(a+b+d)/3.;\n  }\n  else if(u_style<32.5){ // Smoke ring: turbulent circular plume.\n    float r=length(p); float a=atan(p.y,p.x); float ring=abs(r-.38-.11*fbm(vec2(a*2.,time*.09)+u_seed)); v=1.-smoothstep(.015,.13,ring);\n  }\n  else { // God rays: soft beams radiating from a bright source.\n    vec2 g=p-vec2(-.12,-.38); float a=atan(g.y,g.x); float rays=pow(.5+.5*sin(a*13.+fbm(g*5.)*4.+time*.25),3.); v=rays*(1.-smoothstep(.08,1.2,length(g)))+.18*exp(-length(g)*7.);\n  }\n  if(u_style>3.5 && u_style<4.5){ // Aurora reference post-processing: no shared character remap.\n    vec3 auroraColor=gradient(clamp(v,0.,1.));\n    auroraColor=(auroraColor-.5)*1.2+.5;\n    float vd=length(gl_FragCoord.xy/u_resolution.xy-.5)*1.41421356;\n    auroraColor*=1.-.07*smoothstep(.35,1.,vd);\n    auroraColor+=(hash(gl_FragCoord.xy+u_seed)-.5)*u_grain;\n    gl_FragColor=vec4(clamp(auroraColor,0.,1.),1.);\n    return;\n  }\n  if(u_cursor_on>.5 && u_cursor_effect>3.5) v+=smoothstep(u_cursor_radius,0.,d)*u_cursor_strength*.75;\n  v=mix(.5,v,u_intensity); v=pow(max(v,0.001), 1.3-u_contrast*.65);\n  vec3 color=gradient(v);\n  color += (hash(gl_FragCoord.xy)-.5)*u_grain;\n  gl_FragColor=vec4(color,1.);\n}";
const defaultRecipe = {
    id: "silk-01",
    name: "Silk",
    style: 0,
    palette: [
        "#060914",
        "#273dff",
        "#00ddff",
        "#e8fbff"
    ],
    intensity: .76,
    zoom: 1.02,
    warp: .2,
    contrast: .56,
    speed: 1,
    drift: .5,
    blur: 0,
    animate: true,
    reverse: false,
    grain: .045,
    rotate: 0,
    offsetX: 0,
    offsetY: 0,
    seed: 1,
    smoothBlend: false,
    cursorEnabled: true,
    cursorEffect: "spotlight",
    cursorStrength: .5,
    cursorRadius: .5,
    glsl: fragmentShader
};
// App presets are part of the product, not a particular browser's library.
// Keep user-created recipes in localStorage separately so they remain personal.
const appPresets = [
    {
        id: "electric-warp-stripes",
        name: "Electric Warp stripes",
        style: 10,
        palette: [
            "#09151a",
            "#146b82",
            "#4bbad7",
            "#e6faff"
        ],
        intensity: 0.7770323292260786,
        zoom: 0.6589337896921063,
        warp: 0.6077682917880166,
        contrast: 0.6671220502700947,
        speed: 0.15200116236584896,
        drift: 0.6233140640072878,
        blur: 0,
        animate: true,
        reverse: true,
        grain: 0.023892210393196545,
        rotate: 0.36931710255198746,
        offsetX: -0.059887687089624886,
        offsetY: 0.3715470181698023,
        seed: 25330,
        smoothBlend: false,
        cursorEnabled: true,
        cursorEffect: "ripple",
        cursorStrength: 0.3266945243299727,
        cursorRadius: 0.5646328144774306,
        glsl: fragmentShader
    }
];
const SAVED_RECIPES_KEY = "shader-studio-saved-recipes";
const RESUME_RECIPE_KEY = "shader-studio-resume-recipe";
const presetGroups = [
    {
        title: "Flow",
        items: [
            [
                "Silk",
                0
            ],
            [
                "Smoke",
                1
            ],
            [
                "Flow field",
                3
            ],
            [
                "Waves",
                24
            ]
        ]
    },
    {
        title: "Light",
        items: [
            [
                "Aurora",
                13
            ],
            [
                "Shimmer",
                4
            ],
            [
                "Orb",
                5
            ],
            [
                "Caustics",
                6
            ]
        ]
    },
    {
        title: "Blobs",
        items: [
            [
                "Mesh drift",
                7
            ],
            [
                "Metaballs",
                30
            ]
        ]
    },
    {
        title: "Pattern",
        items: [
            [
                "Plasma",
                9
            ],
            [
                "Warp stripes",
                10
            ],
            [
                "Rings",
                11
            ],
            [
                "Halftone",
                12
            ]
        ]
    },
    {
        title: "Gradients",
        items: [
            [
                "Mesh gradient",
                14
            ],
            [
                "Static mesh",
                15
            ],
            [
                "Static radial",
                16
            ],
            [
                "Grain gradient",
                18
            ]
        ]
    },
    {
        title: "Graphic",
        items: [
            [
                "Dithering",
                17
            ],
            [
                "Dot orbit",
                19
            ],
            [
                "Dot grid",
                20
            ],
            [
                "Color panels",
                31
            ]
        ]
    },
    {
        title: "Motion",
        items: [
            [
                "Warp",
                21
            ],
            [
                "Spiral",
                22
            ],
            [
                "Swirl",
                23
            ],
            [
                "Pulsing border",
                29
            ]
        ]
    },
    {
        title: "Noise",
        items: [
            [
                "Neuro noise",
                25
            ],
            [
                "Perlin",
                26
            ],
            [
                "Simplex",
                27
            ],
            [
                "Voronoi",
                28
            ]
        ]
    },
    {
        title: "Atmosphere",
        items: [
            [
                "Smoke ring",
                32
            ],
            [
                "God rays",
                33
            ]
        ]
    }
];
const styleNames = {
    0: "Silk",
    1: "Smoke",
    2: "Waves",
    3: "Flow field",
    4: "Shimmer",
    5: "Orb",
    6: "Caustics",
    7: "Mesh drift",
    8: "Metaballs",
    9: "Plasma",
    10: "Warp stripes",
    11: "Rings",
    12: "Halftone",
    13: "Aurora",
    14: "Mesh gradient",
    15: "Static mesh gradient",
    16: "Static radial gradient",
    17: "Dithering",
    18: "Grain gradient",
    19: "Dot orbit",
    20: "Dot grid",
    21: "Warp",
    22: "Spiral",
    23: "Swirl",
    24: "Waves",
    25: "Neuro noise",
    26: "Perlin noise",
    27: "Simplex noise",
    28: "Voronoi",
    29: "Pulsing border",
    30: "Metaballs",
    31: "Color panels",
    32: "Smoke ring",
    33: "God rays"
};
const palettes = [
    [
        "#060914",
        "#273dff",
        "#00ddff",
        "#e8fbff"
    ],
    [
        "#180524",
        "#7f42ef",
        "#e95db2",
        "#ffd4f3"
    ],
    [
        "#051c1a",
        "#078b70",
        "#72e87b",
        "#f2ffc5"
    ],
    [
        "#260c06",
        "#cf432d",
        "#fc9f2c",
        "#ffebbd"
    ],
    [
        "#08080e",
        "#4b235e",
        "#cc51af",
        "#ffd1ed"
    ],
    [
        "#061923",
        "#137194",
        "#4cc6e7",
        "#e6fbff"
    ],
    [
        "#17120d",
        "#865633",
        "#d69a62",
        "#fff0db"
    ],
    [
        "#120b1d",
        "#5b2a93",
        "#a94fe0",
        "#edc3ff"
    ],
    [
        "#09151a",
        "#146b82",
        "#4bbad7",
        "#e6faff"
    ],
    [
        "#1a0a0d",
        "#9d254c",
        "#fa729c",
        "#ffe0e8"
    ],
    [
        "#101014",
        "#565b66",
        "#adb1b8",
        "#f5f6f7"
    ],
    [
        "#080b14",
        "#253d91",
        "#637eea",
        "#dbe4ff"
    ],
    [
        "#120806",
        "#8a3619",
        "#f47132",
        "#ffce9b"
    ],
    [
        "#07150b",
        "#2f783a",
        "#a9e84a",
        "#f2ffd0"
    ],
    [
        "#060610",
        "#1b2b82",
        "#5140af",
        "#a87bc9"
    ],
    [
        "#0c1115",
        "#2c5f88",
        "#64b7da",
        "#f0fbff"
    ]
];
const presetSettings = {
    0: {
        palette: [
            "#090b22",
            "#3135bc",
            "#b28bff",
            "#ffe0f0"
        ],
        intensity: .72,
        zoom: 1.18,
        warp: .42,
        contrast: .56,
        speed: .72,
        drift: .18,
        grain: .025
    },
    1: {
        palette: [
            "#09071e",
            "#2d1c65",
            "#6b46ae",
            "#dfc9ff"
        ],
        intensity: .68,
        zoom: .92,
        warp: .66,
        contrast: .42,
        speed: .48,
        drift: .3,
        grain: .035
    },
    2: {
        palette: [
            "#061526",
            "#0d5c8f",
            "#56cde8",
            "#e8fbff"
        ],
        intensity: .66,
        zoom: 1.15,
        warp: .28,
        contrast: .52,
        speed: 1.2,
        drift: .24,
        grain: .018
    },
    3: {
        palette: [
            "#210d07",
            "#a6361e",
            "#ef8d2e",
            "#ffe4aa"
        ],
        intensity: .8,
        zoom: 1.1,
        warp: .75,
        contrast: .7,
        speed: 1.45,
        drift: .45,
        grain: .04
    },
    4: {
        palette: [
            "#0b1026",
            "#3d46e8",
            "#b18cff",
            "#ffd6e7"
        ],
        intensity: .7,
        zoom: 1.4,
        warp: .17,
        contrast: .67,
        speed: 2.07,
        drift: .14,
        grain: .09,
        rotate: .28,
        offsetX: .05,
        offsetY: -.02,
        seed: 9947,
        cursorEnabled: true,
        cursorEffect: "swirl",
        cursorStrength: .65,
        cursorRadius: .46
    },
    5: {
        palette: [
            "#070708",
            "#64330b",
            "#ff9a00",
            "#fff5cf"
        ],
        intensity: .85,
        zoom: 1.18,
        warp: .08,
        contrast: .66,
        speed: .7,
        drift: .1,
        grain: .02
    },
    6: {
        palette: [
            "#03262e",
            "#087e87",
            "#32d8d3",
            "#f5ffd0"
        ],
        intensity: .84,
        zoom: 1.25,
        warp: .48,
        contrast: .76,
        speed: 1.18,
        drift: .2,
        grain: .025
    },
    7: {
        palette: [
            "#130f0c",
            "#584432",
            "#b49a78",
            "#f4eadb"
        ],
        intensity: .64,
        zoom: .86,
        warp: .2,
        contrast: .38,
        speed: .42,
        drift: .24,
        grain: .06
    },
    8: {
        palette: [
            "#030508",
            "#065ed1",
            "#1edbff",
            "#f4ffff"
        ],
        intensity: .9,
        zoom: 1.12,
        warp: .1,
        contrast: .78,
        speed: 1.12,
        drift: .25,
        grain: .015
    },
    9: {
        palette: [
            "#2d061b",
            "#e52e73",
            "#ff9a7d",
            "#fff1c5"
        ],
        intensity: .78,
        zoom: 1.06,
        warp: .4,
        contrast: .6,
        speed: 1.35,
        drift: .18,
        grain: .02
    },
    10: {
        palette: [
            "#0b2707",
            "#3e8a16",
            "#b9ff5e",
            "#f3ffce"
        ],
        intensity: .86,
        zoom: 1.06,
        warp: .62,
        contrast: .8,
        speed: 1.3,
        drift: .16,
        grain: .03
    },
    11: {
        palette: [
            "#19052e",
            "#5e159e",
            "#bc52ff",
            "#f0c7ff"
        ],
        intensity: .82,
        zoom: 1.04,
        warp: .16,
        contrast: .78,
        speed: .92,
        drift: .06,
        grain: .018
    },
    12: {
        palette: [
            "#090909",
            "#424242",
            "#b8b8b8",
            "#f5f5f5"
        ],
        intensity: .84,
        zoom: 1.12,
        warp: .05,
        contrast: .9,
        speed: .22,
        drift: .04,
        grain: .015
    },
    13: {
        palette: [
            "#211044",
            "#883ab7",
            "#df61ba",
            "#ffd2ee"
        ],
        intensity: .74,
        zoom: 1.08,
        warp: .36,
        contrast: .58,
        speed: 1.08,
        drift: .18,
        grain: .025
    },
    14: {
        palette: [
            "#170c3d",
            "#4d3cff",
            "#e764ff",
            "#ffd6a5"
        ],
        intensity: .82,
        zoom: 1.04,
        warp: .4,
        contrast: .62,
        speed: .8,
        drift: .22,
        grain: .025
    },
    15: {
        palette: [
            "#111827",
            "#235da8",
            "#50c7bc",
            "#f3d9a6"
        ],
        intensity: .76,
        zoom: 1.08,
        warp: .18,
        contrast: .5,
        speed: 0,
        drift: 0,
        grain: .018,
        animate: false
    },
    16: {
        palette: [
            "#120d2e",
            "#6137b8",
            "#e36fb4",
            "#fff0b8"
        ],
        intensity: .8,
        zoom: 1.05,
        warp: .1,
        contrast: .58,
        speed: 0,
        drift: 0,
        grain: .01,
        animate: false
    },
    17: {
        palette: [
            "#071127",
            "#0068b5",
            "#4fd8e8",
            "#e8ffea"
        ],
        intensity: .86,
        zoom: 1.04,
        warp: .12,
        contrast: .82,
        speed: .18,
        drift: .04,
        grain: .01
    },
    18: {
        palette: [
            "#120b2d",
            "#4b2a9d",
            "#db62c4",
            "#ffd7a0"
        ],
        intensity: .76,
        zoom: 1.06,
        warp: .2,
        contrast: .52,
        speed: .34,
        drift: .12,
        grain: .075
    },
    19: {
        palette: [
            "#07101d",
            "#1a4b9b",
            "#49c6ff",
            "#f5fdff"
        ],
        intensity: .93,
        zoom: 1.12,
        warp: .1,
        contrast: .88,
        speed: .95,
        drift: .1,
        grain: .012
    },
    20: {
        palette: [
            "#160c21",
            "#7d2c77",
            "#ed77bb",
            "#ffe5f6"
        ],
        intensity: .89,
        zoom: 1.1,
        warp: .1,
        contrast: .84,
        speed: .14,
        drift: .04,
        grain: .012
    },
    21: {
        palette: [
            "#071c20",
            "#0e677c",
            "#36cfce",
            "#e9ffe8"
        ],
        intensity: .84,
        zoom: 1.08,
        warp: .54,
        contrast: .72,
        speed: 1.05,
        drift: .3,
        grain: .02
    },
    22: {
        palette: [
            "#21062b",
            "#8d218d",
            "#f26cba",
            "#ffe6ac"
        ],
        intensity: .86,
        zoom: 1.08,
        warp: .22,
        contrast: .75,
        speed: .75,
        drift: .1,
        grain: .017
    },
    23: {
        palette: [
            "#05090f",
            "#174f91",
            "#31b8d0",
            "#e8ffd3"
        ],
        intensity: .86,
        zoom: 1.12,
        warp: .3,
        contrast: .76,
        speed: .65,
        drift: .1,
        grain: .02
    },
    24: {
        palette: [
            "#051c2b",
            "#09618d",
            "#49d3e5",
            "#efffc6"
        ],
        intensity: .8,
        zoom: 1.12,
        warp: .36,
        contrast: .65,
        speed: 1.05,
        drift: .22,
        grain: .018
    },
    25: {
        palette: [
            "#100b1d",
            "#55287f",
            "#c960d7",
            "#f6d1f0"
        ],
        intensity: .85,
        zoom: 1.08,
        warp: .56,
        contrast: .82,
        speed: .52,
        drift: .16,
        grain: .035
    },
    26: {
        palette: [
            "#061512",
            "#16674e",
            "#76d58e",
            "#e3ffe1"
        ],
        intensity: .75,
        zoom: 1.1,
        warp: .22,
        contrast: .52,
        speed: .54,
        drift: .16,
        grain: .025
    },
    27: {
        palette: [
            "#111124",
            "#3d4db3",
            "#9b7eff",
            "#eef0ff"
        ],
        intensity: .78,
        zoom: 1.08,
        warp: .28,
        contrast: .58,
        speed: .55,
        drift: .18,
        grain: .025
    },
    28: {
        palette: [
            "#18110a",
            "#84532c",
            "#df974d",
            "#fff0c2"
        ],
        intensity: .88,
        zoom: 1.08,
        warp: .2,
        contrast: .83,
        speed: .18,
        drift: .05,
        grain: .012
    },
    29: {
        palette: [
            "#050714",
            "#24328c",
            "#7478ff",
            "#eff4ff"
        ],
        intensity: .92,
        zoom: 1,
        warp: .04,
        contrast: .92,
        speed: 1.2,
        drift: .02,
        grain: .016
    },
    30: {
        palette: [
            "#050812",
            "#0b4eae",
            "#20c7ef",
            "#dfffea"
        ],
        intensity: .9,
        zoom: 1.1,
        warp: .18,
        contrast: .8,
        speed: .85,
        drift: .2,
        grain: .015
    },
    31: {
        palette: [
            "#1d0d24",
            "#7a2e72",
            "#ec6e9f",
            "#ffe5bb"
        ],
        intensity: .82,
        zoom: 1.08,
        warp: .16,
        contrast: .69,
        speed: .48,
        drift: .12,
        grain: .012
    },
    32: {
        palette: [
            "#070914",
            "#283f96",
            "#b364e6",
            "#ffe4fa"
        ],
        intensity: .86,
        zoom: 1.1,
        warp: .48,
        contrast: .77,
        speed: .62,
        drift: .18,
        grain: .04
    },
    33: {
        palette: [
            "#140c1c",
            "#7b365e",
            "#f3a56e",
            "#fff2bf"
        ],
        intensity: .9,
        zoom: 1.04,
        warp: .25,
        contrast: .78,
        speed: .38,
        drift: .08,
        grain: .02
    }
};
const companyThemes = [
    {
        name: "Modern Minimal",
        palette: [
            "#111214",
            "#626875",
            "#c9cdd3",
            "#f7f8fa"
        ]
    },
    {
        name: "Vercel",
        palette: [
            "#050505",
            "#383838",
            "#a7a7a7",
            "#f5f5f5"
        ]
    },
    {
        name: "Claude Amber",
        palette: [
            "#24150b",
            "#b55e2f",
            "#e7975c",
            "#fff0db"
        ]
    },
    {
        name: "Claude",
        palette: [
            "#201611",
            "#7c4d38",
            "#c98f6a",
            "#f8e8d5"
        ]
    },
    {
        name: "Zen Linen",
        palette: [
            "#191611",
            "#847a68",
            "#cfc3ab",
            "#fff9ee"
        ]
    },
    {
        name: "Supabase",
        palette: [
            "#07120d",
            "#3c9f66",
            "#8ee9ae",
            "#e5ffeb"
        ]
    },
    {
        name: "Lime Frost",
        palette: [
            "#11170b",
            "#6da933",
            "#c8f65e",
            "#f7ffd9"
        ]
    },
    {
        name: "Cappuccino",
        palette: [
            "#1b0e09",
            "#7c472c",
            "#bd8157",
            "#f7dac0"
        ]
    }
];
const tabs = [
    {
        id: "presets",
        label: "Presets",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$book$2d$open$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__BookOpen$3e$__["BookOpen"]
    },
    {
        id: "style",
        label: "Style",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wand$2d$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__WandSparkles$3e$__["WandSparkles"]
    },
    {
        id: "palette",
        label: "Palette",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__["Palette"]
    },
    {
        id: "surface",
        label: "Surface",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$layers$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Layers3$3e$__["Layers3"]
    },
    {
        id: "motion",
        label: "Motion",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$gauge$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Gauge$3e$__["Gauge"]
    },
    {
        id: "cursor",
        label: "Cursor",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$mouse$2d$pointer$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__MousePointer2$3e$__["MousePointer2"]
    },
    {
        id: "mockup",
        label: "Mockup",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageDown$3e$__["ImageDown"]
    },
    {
        id: "export",
        label: "Export",
        icon: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"]
    }
];
const mockupPresets = [
    {
        id: "hero",
        label: "Full view",
        settings: {
            scale: .82,
            x: 0,
            y: 0,
            cameraX: 0,
            cameraY: 0,
            tiltX: 0,
            tiltY: 0,
            rotate: 0
        }
    },
    {
        id: "float",
        label: "Soft focus",
        settings: {
            scale: 1.12,
            x: 0,
            y: 0,
            cameraX: 0,
            cameraY: -8,
            tiltX: 4,
            tiltY: -9,
            rotate: -3
        }
    },
    {
        id: "left",
        label: "Focus left",
        settings: {
            scale: 1.75,
            x: 0,
            y: 0,
            cameraX: -32,
            cameraY: 4,
            tiltX: 0,
            tiltY: 8,
            rotate: 1
        }
    },
    {
        id: "right",
        label: "Focus right",
        settings: {
            scale: 1.75,
            x: 0,
            y: 0,
            cameraX: 32,
            cameraY: 4,
            tiltX: 0,
            tiltY: -8,
            rotate: -1
        }
    },
    {
        id: "tilt",
        label: "Tilted close",
        settings: {
            scale: 1.8,
            x: 0,
            y: 0,
            cameraX: 18,
            cameraY: 10,
            tiltX: 8,
            tiltY: -11,
            rotate: -5
        }
    },
    {
        id: "drama",
        label: "Dramatic tilt",
        settings: {
            scale: 2.2,
            x: 0,
            y: 0,
            cameraX: -18,
            cameraY: 14,
            tiltX: 15,
            tiltY: 18,
            rotate: 8
        }
    },
    {
        id: "overhead",
        label: "Overhead",
        settings: {
            scale: 1.45,
            x: 0,
            y: 0,
            cameraX: 2,
            cameraY: -28,
            tiltX: 18,
            tiltY: 0,
            rotate: 0
        }
    },
    {
        id: "corner",
        label: "Corner crop",
        settings: {
            scale: 2.5,
            x: 0,
            y: 0,
            cameraX: 36,
            cameraY: -24,
            tiltX: -9,
            tiltY: -16,
            rotate: -7
        }
    },
    {
        id: "postcard",
        label: "Wide reveal",
        settings: {
            scale: .92,
            x: 0,
            y: 0,
            cameraX: 0,
            cameraY: 15,
            tiltX: -3,
            tiltY: 0,
            rotate: 0
        }
    }
];
function hexToRgb(hex) {
    const value = hex.replace("#", "");
    return [
        parseInt(value.slice(0, 2), 16) / 255,
        parseInt(value.slice(2, 4), 16) / 255,
        parseInt(value.slice(4, 6), 16) / 255
    ];
}
const paperShaders = {
    14: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$mesh$2d$gradient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MeshGradient"],
    15: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$static$2d$mesh$2d$gradient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StaticMeshGradient"],
    16: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$static$2d$radial$2d$gradient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["StaticRadialGradient"],
    17: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$dithering$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Dithering"],
    18: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$grain$2d$gradient$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GrainGradient"],
    19: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$dot$2d$orbit$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DotOrbit"],
    20: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$dot$2d$grid$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["DotGrid"],
    21: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$warp$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Warp"],
    22: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$spiral$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Spiral"],
    23: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$swirl$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Swirl"],
    24: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$waves$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Waves"],
    25: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$neuro$2d$noise$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["NeuroNoise"],
    26: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$perlin$2d$noise$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PerlinNoise"],
    27: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$simplex$2d$noise$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SimplexNoise"],
    28: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$voronoi$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Voronoi"],
    29: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$pulsing$2d$border$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PulsingBorder"],
    30: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$metaballs$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Metaballs"],
    31: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$color$2d$panels$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ColorPanels"],
    32: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$smoke$2d$ring$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["SmokeRing"],
    33: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$paper$2d$design$2f$shaders$2d$react$2f$dist$2f$shaders$2f$god$2d$rays$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["GodRays"]
};
const paperShaderNames = {
    14: "MeshGradient",
    15: "StaticMeshGradient",
    16: "StaticRadialGradient",
    17: "Dithering",
    18: "GrainGradient",
    19: "DotOrbit",
    20: "DotGrid",
    21: "Warp",
    22: "Spiral",
    23: "Swirl",
    24: "Waves",
    25: "NeuroNoise",
    26: "PerlinNoise",
    27: "SimplexNoise",
    28: "Voronoi",
    29: "PulsingBorder",
    30: "Metaballs",
    31: "ColorPanels",
    32: "SmokeRing",
    33: "GodRays"
};
const isPaperStyle = (style)=>Boolean(paperShaders[style]);
function paperProps(recipe, paused) {
    const palette = recipe.palette.length ? recipe.palette : defaultRecipe.palette;
    const effect = [
        14,
        15,
        16,
        21,
        28
    ].includes(recipe.style) ? {
        distortion: recipe.warp
    } : {};
    const grain = [
        14,
        15,
        16,
        18,
        31
    ].includes(recipe.style) ? {
        grainOverlay: recipe.grain
    } : {};
    const shared = {
        scale: recipe.zoom,
        rotation: recipe.rotate * 180 / Math.PI,
        offsetX: recipe.offsetX,
        offsetY: recipe.offsetY,
        speed: paused || !recipe.animate ? 0 : recipe.speed,
        minPixelRatio: 1,
        maxPixelCount: 1920 * 1080
    };
    if ([
        17,
        22,
        24,
        25,
        26
    ].includes(recipe.style)) return {
        ...shared,
        ...effect,
        ...grain,
        colorBack: palette[0],
        colorFront: palette.at(-1)
    };
    if (recipe.style === 20) return {
        ...shared,
        colorBack: palette[0],
        colorFill: palette[palette.length - 1],
        colorStroke: palette[Math.max(1, palette.length - 2)]
    };
    if (recipe.style === 16) return {
        ...shared,
        ...effect,
        ...grain,
        colorBack: palette[0],
        colors: palette.slice(1)
    };
    if (recipe.style === 28) return {
        ...shared,
        ...effect,
        colorGap: palette[0],
        colorGlow: palette.at(-1),
        colors: palette.slice(1)
    };
    return {
        ...shared,
        ...effect,
        ...grain,
        colorBack: palette[0],
        colors: palette
    };
}
function PaperShaderCanvas(param) {
    let { recipe, paused, onReady } = param;
    _s();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const Component = paperShaders[recipe.style];
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "PaperShaderCanvas.useEffect": ()=>{
            var _ref_current;
            if (!onReady || !((_ref_current = ref.current) === null || _ref_current === void 0 ? void 0 : _ref_current.canvasElement)) return;
            const frame = requestAnimationFrame({
                "PaperShaderCanvas.useEffect.frame": ()=>{
                    var _ref_current;
                    if ((_ref_current = ref.current) === null || _ref_current === void 0 ? void 0 : _ref_current.canvasElement) onReady(ref.current.canvasElement);
                }
            }["PaperShaderCanvas.useEffect.frame"]);
            return ({
                "PaperShaderCanvas.useEffect": ()=>cancelAnimationFrame(frame)
            })["PaperShaderCanvas.useEffect"];
        }
    }["PaperShaderCanvas.useEffect"], [
        onReady,
        recipe.style
    ]);
    if (!Component) return null;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Component, {
        ref: ref,
        className: "paper-shader-canvas",
        width: "100%",
        height: "100%",
        ...paperProps(recipe, paused),
        style: {
            opacity: .35 + recipe.intensity * .65,
            filter: "contrast(".concat(.65 + recipe.contrast * .7, ")").concat(recipe.blur ? " blur(".concat(recipe.blur, "px)") : "")
        }
    }, void 0, false, {
        fileName: "[project]/components/shader-studio.tsx",
        lineNumber: 454,
        columnNumber: 10
    }, this);
}
_s(PaperShaderCanvas, "8uVE59eA/r6b92xF80p7sH8rXLk=");
_c = PaperShaderCanvas;
function NativeShaderCanvas(param) {
    let { recipe, paused, onError } = param;
    _s1();
    const ref = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const pointer = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])({
        x: .5,
        y: .5,
        vx: 0,
        vy: 0
    });
    const frame = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const start = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const programRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [programVersion, setProgramVersion] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NativeShaderCanvas.useEffect": ()=>{
            const canvas = ref.current;
            if (!canvas) return;
            const gl = canvas.getContext("webgl", {
                preserveDrawingBuffer: true
            });
            if (!gl) {
                onError("WebGL is unavailable in this browser.");
                return;
            }
            const compile = {
                "NativeShaderCanvas.useEffect.compile": (type, source)=>{
                    const shader = gl.createShader(type);
                    gl.shaderSource(shader, source);
                    gl.compileShader(shader);
                    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) || "Shader compile failed");
                    return shader;
                }
            }["NativeShaderCanvas.useEffect.compile"];
            try {
                const vertex = compile(gl.VERTEX_SHADER, "attribute vec2 position; void main(){gl_Position=vec4(position,0.,1.);}");
                const fragment = compile(gl.FRAGMENT_SHADER, recipe.glsl);
                const program = gl.createProgram();
                gl.attachShader(program, vertex);
                gl.attachShader(program, fragment);
                gl.linkProgram(program);
                if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || "Shader link failed");
                programRef.current = program;
                setProgramVersion({
                    "NativeShaderCanvas.useEffect": (version)=>version + 1
                }["NativeShaderCanvas.useEffect"]);
                onError(null);
            } catch (error) {
                onError(error instanceof Error ? error.message.replace(/ERROR: \d+:(\d+):/, "Line $1:") : "Shader compile failed");
            }
        }
    }["NativeShaderCanvas.useEffect"], [
        recipe.glsl,
        onError
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "NativeShaderCanvas.useEffect": ()=>{
            var _s = __turbopack_context__.k.signature();
            const canvas = ref.current;
            const gl = canvas === null || canvas === void 0 ? void 0 : canvas.getContext("webgl");
            if (!canvas || !gl) return;
            const position = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, position);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                -1,
                -1,
                3,
                -1,
                -1,
                3
            ]), gl.STATIC_DRAW);
            const render = {
                "NativeShaderCanvas.useEffect.render": (timestamp)=>{
                    _s();
                    frame.current = requestAnimationFrame(render);
                    if (paused) return;
                    const program = programRef.current;
                    if (!program) return;
                    const width = canvas.clientWidth * devicePixelRatio;
                    const height = canvas.clientHeight * devicePixelRatio;
                    if (canvas.width !== width || canvas.height !== height) {
                        canvas.width = width;
                        canvas.height = height;
                    }
                    gl.viewport(0, 0, width, height);
                    gl.useProgram(program);
                    const set1 = {
                        "NativeShaderCanvas.useEffect.render.set1": (name, value)=>gl.uniform1f(gl.getUniformLocation(program, name), value)
                    }["NativeShaderCanvas.useEffect.render.set1"];
                    gl.enableVertexAttribArray(gl.getAttribLocation(program, "position"));
                    gl.vertexAttribPointer(gl.getAttribLocation(program, "position"), 2, gl.FLOAT, false, 0, 0);
                    if (!start.current) start.current = timestamp;
                    gl.uniform2f(gl.getUniformLocation(program, "u_resolution"), width, height);
                    set1("u_time", (timestamp - start.current) / 1000);
                    gl.uniform2f(gl.getUniformLocation(program, "u_pointer"), pointer.current.x, pointer.current.y);
                    gl.uniform2f(gl.getUniformLocation(program, "u_velocity"), pointer.current.vx, pointer.current.vy);
                    const colors = [
                        ...recipe.palette
                    ];
                    while(colors.length < 5)colors.push(colors.at(-1) || "#000000");
                    gl.uniform3fv(gl.getUniformLocation(program, "u_colors"), colors.slice(0, 5).map(hexToRgb).flat());
                    set1("u_style", recipe.style);
                    set1("u_intensity", recipe.intensity);
                    set1("u_zoom", recipe.zoom);
                    set1("u_warp", recipe.warp);
                    set1("u_contrast", recipe.contrast);
                    set1("u_speed", recipe.speed);
                    set1("u_drift", recipe.drift);
                    set1("u_animate", recipe.animate ? 1 : 0);
                    set1("u_reverse", recipe.reverse ? 1 : 0);
                    set1("u_rotate", recipe.rotate);
                    set1("u_seed", recipe.seed);
                    set1("u_smooth_blend", recipe.smoothBlend ? 1 : 0);
                    set1("u_grain", recipe.grain);
                    gl.uniform2f(gl.getUniformLocation(program, "u_offset"), recipe.offsetX, recipe.offsetY);
                    set1("u_cursor_on", recipe.cursorEnabled ? 1 : 0);
                    set1("u_cursor_effect", [
                        "push",
                        "repel",
                        "swirl",
                        "ripple",
                        "spotlight"
                    ].indexOf(recipe.cursorEffect));
                    set1("u_cursor_strength", recipe.cursorStrength);
                    set1("u_cursor_radius", recipe.cursorRadius);
                    gl.drawArrays(gl.TRIANGLES, 0, 3);
                    pointer.current.vx *= .92;
                    pointer.current.vy *= .92;
                }
            }["NativeShaderCanvas.useEffect.render"];
            _s(render, "ZdQBZ3rq7bWAAMQq6hlVCmYF0jM=", false, {
                "NativeShaderCanvas.useEffect": function() {
                    return [
                        gl.useProgram
                    ];
                }
            }["NativeShaderCanvas.useEffect"]);
            frame.current = requestAnimationFrame(render);
            return ({
                "NativeShaderCanvas.useEffect": ()=>cancelAnimationFrame(frame.current)
            })["NativeShaderCanvas.useEffect"];
        }
    }["NativeShaderCanvas.useEffect"], [
        recipe,
        paused,
        programVersion
    ]);
    const move = (event)=>{
        const rect = event.currentTarget.getBoundingClientRect();
        const x = (event.clientX - rect.left) / rect.width - .5;
        const y = .5 - (event.clientY - rect.top) / rect.height;
        pointer.current.vx = (x - pointer.current.x) * .8;
        pointer.current.vy = (y - pointer.current.y) * .8;
        pointer.current.x = x;
        pointer.current.y = y;
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("canvas", {
        ref: ref,
        onPointerMove: move,
        onPointerLeave: ()=>{
            pointer.current.vx = pointer.current.vy = 0;
        },
        className: "shader-canvas",
        style: {
            filter: recipe.blur ? "blur(".concat(recipe.blur, "px)") : undefined,
            transform: recipe.blur ? "scale(1.025)" : undefined
        },
        "aria-label": "Live interactive shader preview"
    }, void 0, false, {
        fileName: "[project]/components/shader-studio.tsx",
        lineNumber: 502,
        columnNumber: 10
    }, this);
}
_s1(NativeShaderCanvas, "mz1PGQkD4qK8InF4Osf4yq0BKkc=");
_c1 = NativeShaderCanvas;
function ShaderCanvas(param) {
    let { recipe, paused, onError } = param;
    if (isPaperStyle(recipe.style)) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PaperShaderCanvas, {
        recipe: recipe,
        paused: paused
    }, void 0, false, {
        fileName: "[project]/components/shader-studio.tsx",
        lineNumber: 506,
        columnNumber: 42
    }, this);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NativeShaderCanvas, {
        recipe: recipe,
        paused: paused,
        onError: onError
    }, void 0, false, {
        fileName: "[project]/components/shader-studio.tsx",
        lineNumber: 507,
        columnNumber: 10
    }, this);
}
_c2 = ShaderCanvas;
function ShaderThumbnail(param) {
    let { style } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
        className: "shader-thumbnail",
        src: "/style-previews/".concat(style, ".png"),
        alt: "",
        "aria-hidden": "true"
    }, void 0, false, {
        fileName: "[project]/components/shader-studio.tsx",
        lineNumber: 511,
        columnNumber: 10
    }, this);
}
_c3 = ShaderThumbnail;
function StaticStylePreview(param) {
    let { style } = param;
    _s2();
    const recipe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "StaticStylePreview.useMemo[recipe]": ()=>{
            var _styleNames_style;
            return {
                ...defaultRecipe,
                ...presetSettings[style],
                id: "static-preview-".concat(style),
                name: (_styleNames_style = styleNames[style]) !== null && _styleNames_style !== void 0 ? _styleNames_style : "Shader",
                style,
                glsl: fragmentShader,
                animate: false,
                cursorEnabled: false
            };
        }
    }["StaticStylePreview.useMemo[recipe]"], [
        style
    ]);
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        id: "style-preview",
        style: {
            width: 640,
            height: 400,
            overflow: "hidden",
            background: recipe.palette[0]
        },
        children: isPaperStyle(style) ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PaperShaderCanvas, {
            recipe: recipe,
            paused: true
        }, void 0, false, {
            fileName: "[project]/components/shader-studio.tsx",
            lineNumber: 530,
            columnNumber: 9
        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(NativeShaderCanvas, {
            recipe: recipe,
            paused: false,
            onError: ()=>undefined
        }, void 0, false, {
            fileName: "[project]/components/shader-studio.tsx",
            lineNumber: 531,
            columnNumber: 9
        }, this)
    }, void 0, false, {
        fileName: "[project]/components/shader-studio.tsx",
        lineNumber: 528,
        columnNumber: 10
    }, this);
}
_s2(StaticStylePreview, "BTz8sro6z6e1Hf1qZZDGR1tejT8=");
_c4 = StaticStylePreview;
function SavedRecipePreview(param) {
    let { recipe } = param;
    // Saved cards use the exact persisted recipe rather than approximating it
    // with a CSS gradient, including custom GLSL and every shader setting.
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ShaderCanvas, {
        recipe: recipe,
        paused: false,
        onError: ()=>undefined
    }, void 0, false, {
        fileName: "[project]/components/shader-studio.tsx",
        lineNumber: 538,
        columnNumber: 10
    }, this);
}
_c5 = SavedRecipePreview;
function SourceSurface(param) {
    let { title, helper, source, onChange, status, footer } = param;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "code-surface",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "source-heading",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: title
                            }, void 0, false, {
                                fileName: "[project]/components/shader-studio.tsx",
                                lineNumber: 542,
                                columnNumber: 77
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "helper",
                                children: helper
                            }, void 0, false, {
                                fileName: "[project]/components/shader-studio.tsx",
                                lineNumber: 542,
                                columnNumber: 93
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shader-studio.tsx",
                        lineNumber: 542,
                        columnNumber: 72
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$code$2d$xml$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Code2$3e$__["Code2"], {}, void 0, false, {
                        fileName: "[project]/components/shader-studio.tsx",
                        lineNumber: 542,
                        columnNumber: 133
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shader-studio.tsx",
                lineNumber: 542,
                columnNumber: 40
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                value: source,
                onChange: (event)=>onChange === null || onChange === void 0 ? void 0 : onChange(event.target.value),
                readOnly: !onChange,
                spellCheck: false,
                "aria-label": "".concat(title, " source editor")
            }, void 0, false, {
                fileName: "[project]/components/shader-studio.tsx",
                lineNumber: 542,
                columnNumber: 148
            }, this),
            status,
            footer && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "source-actions",
                children: footer
            }, void 0, false, {
                fileName: "[project]/components/shader-studio.tsx",
                lineNumber: 542,
                columnNumber: 325
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/shader-studio.tsx",
        lineNumber: 542,
        columnNumber: 10
    }, this);
}
_c6 = SourceSurface;
function hexToHsv(hex) {
    const [r, g, b] = hexToRgb(hex).map((value)=>value / 255);
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const delta = max - min;
    const hue = delta === 0 ? 0 : max === r ? 60 * ((g - b) / delta % 6) : max === g ? 60 * ((b - r) / delta + 2) : 60 * ((r - g) / delta + 4);
    return {
        h: (hue + 360) % 360,
        s: max === 0 ? 0 : delta / max,
        v: max
    };
}
function hsvToHex(h, s, v) {
    const c = v * s;
    const x = c * (1 - Math.abs(h / 60 % 2 - 1));
    const m = v - c;
    const [r, g, b] = h < 60 ? [
        c,
        x,
        0
    ] : h < 120 ? [
        x,
        c,
        0
    ] : h < 180 ? [
        0,
        c,
        x
    ] : h < 240 ? [
        0,
        x,
        c
    ] : h < 300 ? [
        x,
        0,
        c
    ] : [
        c,
        0,
        x
    ];
    return "#".concat([
        r,
        g,
        b
    ].map((value)=>Math.round((value + m) * 255).toString(16).padStart(2, "0")).join(""));
}
function ShadcnColorPicker(param) {
    let { color, onChange } = param;
    _s3();
    const [open, setOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const hsv = hexToHsv(color);
    const update = (next)=>{
        var _next_h, _next_s, _next_v;
        return onChange(hsvToHex((_next_h = next.h) !== null && _next_h !== void 0 ? _next_h : hsv.h, (_next_s = next.s) !== null && _next_s !== void 0 ? _next_s : hsv.s, (_next_v = next.v) !== null && _next_v !== void 0 ? _next_v : hsv.v));
    };
    const rgb = hexToRgb(color);
    const pick = (event)=>{
        const rect = event.currentTarget.getBoundingClientRect();
        update({
            s: Math.min(1, Math.max(0, (event.clientX - rect.left) / rect.width)),
            v: 1 - Math.min(1, Math.max(0, (event.clientY - rect.top) / rect.height))
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "shadcn-colour-picker",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                className: "colour-picker-trigger",
                onClick: ()=>setOpen((value)=>!value),
                "aria-label": "Edit ".concat(color),
                style: {
                    background: color
                }
            }, void 0, false, {
                fileName: "[project]/components/shader-studio.tsx",
                lineNumber: 550,
                columnNumber: 48
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: color.toUpperCase()
            }, void 0, false, {
                fileName: "[project]/components/shader-studio.tsx",
                lineNumber: 550,
                columnNumber: 194
            }, this),
            open && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "colour-picker-popover",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "colour-sv",
                        style: {
                            backgroundColor: "hsl(".concat(hsv.h, " 100% 50%)")
                        },
                        onPointerDown: pick,
                        onPointerMove: (event)=>event.buttons === 1 && pick(event),
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                            style: {
                                left: "".concat(hsv.s * 100, "%"),
                                top: "".concat((1 - hsv.v) * 100, "%")
                            }
                        }, void 0, false, {
                            fileName: "[project]/components/shader-studio.tsx",
                            lineNumber: 550,
                            columnNumber: 440
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/shader-studio.tsx",
                        lineNumber: 550,
                        columnNumber: 276
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "colour-hue",
                        "aria-label": "Hue",
                        type: "range",
                        min: "0",
                        max: "360",
                        value: hsv.h,
                        onChange: (event)=>update({
                                h: Number(event.target.value)
                            })
                    }, void 0, false, {
                        fileName: "[project]/components/shader-studio.tsx",
                        lineNumber: 550,
                        columnNumber: 517
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "colour-hex",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    background: color
                                }
                            }, void 0, false, {
                                fileName: "[project]/components/shader-studio.tsx",
                                lineNumber: 550,
                                columnNumber: 703
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                value: color.toUpperCase(),
                                onChange: (event)=>/^#[0-9A-Fa-f]{6}$/.test(event.target.value) && onChange(event.target.value),
                                "aria-label": "Hex colour"
                            }, void 0, false, {
                                fileName: "[project]/components/shader-studio.tsx",
                                lineNumber: 550,
                                columnNumber: 741
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shader-studio.tsx",
                        lineNumber: 550,
                        columnNumber: 675
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "colour-rgb",
                        children: [
                            "R",
                            "G",
                            "B"
                        ].map((label, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "number",
                                        min: "0",
                                        max: "255",
                                        value: rgb[index],
                                        onChange: (event)=>{
                                            const next = [
                                                ...rgb
                                            ];
                                            next[index] = Math.min(255, Math.max(0, Number(event.target.value)));
                                            onChange("#".concat(next.map((value)=>value.toString(16).padStart(2, "0")).join("")));
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 550,
                                        columnNumber: 993
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: label
                                    }, void 0, false, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 550,
                                        columnNumber: 1255
                                    }, this)
                                ]
                            }, label, true, {
                                fileName: "[project]/components/shader-studio.tsx",
                                lineNumber: 550,
                                columnNumber: 974
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/shader-studio.tsx",
                        lineNumber: 550,
                        columnNumber: 907
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shader-studio.tsx",
                lineNumber: 550,
                columnNumber: 237
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/shader-studio.tsx",
        lineNumber: 550,
        columnNumber: 10
    }, this);
}
_s3(ShadcnColorPicker, "xG1TONbKtDWtdOTrXaTAsNhPg/Q=");
_c7 = ShadcnColorPicker;
function Slider(param) {
    let { label, value, min = 0, max = 1, step = .01, unit = "%", onChange, trailing } = param;
    if (label === "Tilt") max = 45;
    if (label === "Grain") max = .2;
    if (label === "Zoom" && max === 1.2) max = 4;
    const shown = unit === "%" ? Math.round(value * 100) : unit === "Ã‚Â°" ? Math.round(value) : Number(value.toFixed(2));
    const progress = Math.max(0, Math.min(100, (value - min) / (max - min) * 100));
    const displayMin = unit === "%" ? min * 100 : min;
    const displayMax = unit === "%" ? max * 100 : max;
    const displayStep = unit === "%" ? step * 100 : step;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
        className: "slider-row",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "slider-label",
                children: label
            }, void 0, false, {
                fileName: "[project]/components/shader-studio.tsx",
                lineNumber: 562,
                columnNumber: 40
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "slider-value",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        "aria-label": "".concat(label, " value"),
                        title: "Type a precise value",
                        type: "number",
                        min: displayMin,
                        max: displayMax,
                        step: displayStep,
                        value: shown,
                        onFocus: (event)=>event.currentTarget.select(),
                        onChange: (event)=>{
                            const next = Number(event.target.value);
                            if (!Number.isFinite(next)) return;
                            onChange(Math.min(max, Math.max(min, unit === "%" ? next / 100 : next)));
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/shader-studio.tsx",
                        lineNumber: 562,
                        columnNumber: 116
                    }, this),
                    unit
                ]
            }, void 0, true, {
                fileName: "[project]/components/shader-studio.tsx",
                lineNumber: 562,
                columnNumber: 85
            }, this),
            trailing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "slider-trailing",
                children: trailing
            }, void 0, false, {
                fileName: "[project]/components/shader-studio.tsx",
                lineNumber: 562,
                columnNumber: 518
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "slider-visual",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "slider-fill",
                        style: {
                            width: "".concat(progress, "%")
                        }
                    }, void 0, false, {
                        fileName: "[project]/components/shader-studio.tsx",
                        lineNumber: 562,
                        columnNumber: 602
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "slider-ticks",
                        "aria-hidden": "true",
                        children: Array.from({
                            length: 9
                        }, (_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, index, false, {
                                fileName: "[project]/components/shader-studio.tsx",
                                lineNumber: 562,
                                columnNumber: 759
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/components/shader-studio.tsx",
                        lineNumber: 562,
                        columnNumber: 668
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                        className: "slider-control",
                        "aria-label": label,
                        type: "range",
                        min: min,
                        max: max,
                        step: step,
                        value: value,
                        onChange: (event)=>onChange(Number(event.target.value))
                    }, void 0, false, {
                        fileName: "[project]/components/shader-studio.tsx",
                        lineNumber: 562,
                        columnNumber: 785
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shader-studio.tsx",
                lineNumber: 562,
                columnNumber: 570
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/shader-studio.tsx",
        lineNumber: 562,
        columnNumber: 10
    }, this);
}
_c8 = Slider;
function CameraPadScene(param) {
    let { recipe, mockup, geometry, camera } = param;
    const frame = getCameraFrame(camera, geometry);
    const panX = -camera.cameraX / 50 * frame.panLimitX * frame.previewScale;
    const panY = -camera.cameraY / 50 * frame.panLimitY * frame.previewScale;
    const offsetX = camera.x / 100 * geometry.viewportWidth * frame.previewScale;
    const offsetY = camera.y / 100 * geometry.viewportHeight * frame.previewScale;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ShaderCanvas, {
                recipe: recipe,
                paused: false,
                onError: ()=>undefined
            }, void 0, false, {
                fileName: "[project]/components/shader-studio.tsx",
                lineNumber: 572,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "camera-preview-media",
                style: {
                    width: geometry.stageWidth * frame.previewScale,
                    height: geometry.stageHeight * frame.previewScale,
                    transform: "translate(-50%, -50%) translate(".concat(offsetX + panX, "px, ").concat(offsetY + panY, "px) scale(").concat(frame.renderScale, ") rotate(").concat(camera.rotate, "deg)")
                },
                children: mockup.media && mockup.mediaType === "video" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                    src: mockup.media,
                    autoPlay: true,
                    muted: true,
                    loop: true,
                    playsInline: true
                }, void 0, false, {
                    fileName: "[project]/components/shader-studio.tsx",
                    lineNumber: 574,
                    columnNumber: 55
                }, this) : mockup.media ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: mockup.media,
                    alt: "Current mockup media"
                }, void 0, false, {
                    fileName: "[project]/components/shader-studio.tsx",
                    lineNumber: 574,
                    columnNumber: 133
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "camera-preview-demo",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "THE NEXT RELEASE"
                        }, void 0, false, {
                            fileName: "[project]/components/shader-studio.tsx",
                            lineNumber: 574,
                            columnNumber: 226
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                            children: [
                                "Make the work",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                    fileName: "[project]/components/shader-studio.tsx",
                                    lineNumber: 574,
                                    columnNumber: 271
                                }, this),
                                "feel inevitable."
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/shader-studio.tsx",
                            lineNumber: 574,
                            columnNumber: 255
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/shader-studio.tsx",
                    lineNumber: 574,
                    columnNumber: 189
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shader-studio.tsx",
                lineNumber: 573,
                columnNumber: 5
            }, this)
        ]
    }, void 0, true);
}
_c9 = CameraPadScene;
function ShaderStudio() {
    _s4();
    var _s = __turbopack_context__.k.signature();
    const [recipe, setRecipe] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultRecipe);
    const [tab, setTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("presets");
    const [paused, setPaused] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [copied, setCopied] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [toast, setToast] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [history, setHistory] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [future, setFuture] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [saveOpen, setSaveOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [saveName, setSaveName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(defaultRecipe.name);
    const [presetSearch, setPresetSearch] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [exportOpen, setExportOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [mockupExportOpen, setMockupExportOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [exportTab, setExportTab] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("image");
    const [mockupExportMode, setMockupExportMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("image");
    const [mockupImageHeight, setMockupImageHeight] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1080);
    const [videoSettings, setVideoSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        aspect: "16:9",
        height: 720,
        fps: 30,
        duration: 3,
        loop: false,
        mimeType: "video/webm;codecs=vp9"
    });
    const [videoProgress, setVideoProgress] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [selectedTheme, setSelectedTheme] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(companyThemes[0].name);
    const [mockup, setMockup] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        media: null,
        mediaType: null,
        frame: "browser",
        radius: 20,
        shadow: 40,
        scale: .82,
        x: 0,
        y: 0,
        cameraX: 0,
        cameraY: 0,
        tiltX: 0,
        tiltY: 0,
        rotate: 0,
        visible: true
    });
    const [cameraMode, setCameraMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("zoom");
    const [mockupAspect, setMockupAspect] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("auto");
    const [outputAspect, setOutputAspect] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("16:9");
    const [editorMode, setEditorMode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("mockup");
    const [basePresetId, setBasePresetId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [focusPresetId, setFocusPresetId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("float");
    const [animationDuration, setAnimationDuration] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(3.8);
    const [animationTransition, setAnimationTransition] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1.5);
    const [animationEasing, setAnimationEasing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("spring");
    const [animationHold, setAnimationHold] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(.8);
    const [springSpeed, setSpringSpeed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1.6);
    const [focusZoom, setFocusZoom] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [focusTilt, setFocusTilt] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [precisionOpen, setPrecisionOpen] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [motionPreview, setMotionPreview] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("base");
    const [animationClips, setAnimationClips] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [activeClipId, setActiveClipId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [playhead, setPlayhead] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(0);
    const [isTimelinePlaying, setIsTimelinePlaying] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const clipGesture = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const animationTrackRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mockupViewportRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const mockupStageRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const cameraPadRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const [cameraGeometry, setCameraGeometry] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(emptyCameraGeometry);
    const playheadRef = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(0);
    const baseDuration = 8;
    const mediaInput = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(null);
    const saved = useStudioStore({
        "ShaderStudio.useStudioStore[saved]": (state)=>state.saved
    }["ShaderStudio.useStudioStore[saved]"]);
    const saveRecipe = useStudioStore({
        "ShaderStudio.useStudioStore[saveRecipe]": (state)=>state.save
    }["ShaderStudio.useStudioStore[saveRecipe]"]);
    const hasRestoredRecipe = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRef"])(false);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ShaderStudio.useEffect": ()=>{
            const root = document.documentElement;
            root.style.setProperty("--mockup-preview-media", mockup.mediaType === "image" && mockup.media ? 'url("'.concat(mockup.media, '")') : "none");
            return ({
                "ShaderStudio.useEffect": ()=>{
                    root.style.removeProperty("--mockup-preview-media");
                }
            })["ShaderStudio.useEffect"];
        }
    }["ShaderStudio.useEffect"], [
        mockup.media,
        mockup.mediaType,
        mockup.rotate,
        mockup.scale,
        mockup.tiltX,
        mockup.tiltY
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ShaderStudio.useEffect": ()=>{
            const stage = document.querySelector(".mockup-stage");
            if (stage) stage.style.aspectRatio = mockupAspect === "auto" ? "" : mockupAspect;
        }
    }["ShaderStudio.useEffect"], [
        mockupAspect
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ShaderStudio.useEffect": ()=>{
            if (tab !== "mockup") return;
            const viewport = document.querySelector(".mockup-viewport");
            if (!viewport) return;
            const syncCameraAspect = {
                "ShaderStudio.useEffect.syncCameraAspect": ()=>{
                    if (viewport.clientWidth && viewport.clientHeight) document.documentElement.style.setProperty("--camera-view-aspect", "".concat(viewport.clientWidth / viewport.clientHeight));
                }
            }["ShaderStudio.useEffect.syncCameraAspect"];
            syncCameraAspect();
            const observer = new ResizeObserver(syncCameraAspect);
            observer.observe(viewport);
            return ({
                "ShaderStudio.useEffect": ()=>observer.disconnect()
            })["ShaderStudio.useEffect"];
        }
    }["ShaderStudio.useEffect"], [
        tab,
        editorMode
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ShaderStudio.useEffect": ()=>{
            const [width, height] = outputAspect.split(":").map(Number);
            const root = document.documentElement;
            const update = {
                "ShaderStudio.useEffect.update": ()=>{
                    const availableHeight = Math.max(280, window.innerHeight - (editorMode === "animation" ? 248 : 82));
                    root.style.setProperty("--output-aspect", "".concat(width, " / ").concat(height));
                    root.style.setProperty("--output-artboard-max-width", "".concat(Math.round(availableHeight * width / height), "px"));
                }
            }["ShaderStudio.useEffect.update"];
            update();
            window.addEventListener("resize", update);
            return ({
                "ShaderStudio.useEffect": ()=>{
                    window.removeEventListener("resize", update);
                    root.style.removeProperty("--output-aspect");
                    root.style.removeProperty("--output-artboard-max-width");
                }
            })["ShaderStudio.useEffect"];
        }
    }["ShaderStudio.useEffect"], [
        editorMode,
        outputAspect
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ShaderStudio.useEffect": ()=>{
            if (!cameraGeometry.viewportWidth || !cameraGeometry.viewportHeight || !cameraGeometry.stageWidth || !cameraGeometry.stageHeight) return;
            const frame = getCameraFrame(mockup, cameraGeometry);
            const root = document.documentElement;
            const panX = -mockup.cameraX / 50 * frame.panLimitX / cameraGeometry.viewportWidth * 100;
            const panY = -mockup.cameraY / 50 * frame.panLimitY / cameraGeometry.viewportHeight * 100;
            root.style.setProperty("--export-stage-width", "".concat(cameraGeometry.stageWidth / cameraGeometry.viewportWidth * 100, "%"));
            root.style.setProperty("--export-stage-aspect", "".concat(cameraGeometry.stageWidth / cameraGeometry.stageHeight));
            root.style.setProperty("--export-layout-x", "".concat(mockup.x, "%"));
            root.style.setProperty("--export-layout-y", "".concat(mockup.y, "%"));
            root.style.setProperty("--export-pan-x", "".concat(panX, "%"));
            root.style.setProperty("--export-pan-y", "".concat(panY, "%"));
            root.style.setProperty("--export-camera-scale", String(frame.renderScale));
            root.style.setProperty("--export-camera-rotate", "".concat(mockup.rotate, "deg"));
            return ({
                "ShaderStudio.useEffect": ()=>[
                        "--export-stage-width",
                        "--export-stage-aspect",
                        "--export-layout-x",
                        "--export-layout-y",
                        "--export-pan-x",
                        "--export-pan-y",
                        "--export-camera-scale",
                        "--export-camera-rotate"
                    ].forEach({
                        "ShaderStudio.useEffect": (name)=>root.style.removeProperty(name)
                    }["ShaderStudio.useEffect"])
            })["ShaderStudio.useEffect"];
        }
    }["ShaderStudio.useEffect"], [
        cameraGeometry,
        mockup
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ShaderStudio.useEffect": ()=>{
            if (tab !== "mockup") return;
            const viewport = mockupViewportRef.current;
            const stage = mockupStageRef.current;
            const pad = cameraPadRef.current;
            if (!viewport || !stage || !pad) return;
            const update = {
                "ShaderStudio.useEffect.update": ()=>setCameraGeometry({
                        viewportWidth: viewport.clientWidth,
                        viewportHeight: viewport.clientHeight,
                        stageWidth: stage.offsetWidth,
                        stageHeight: stage.offsetHeight,
                        padWidth: pad.clientWidth,
                        padHeight: pad.clientHeight
                    })
            }["ShaderStudio.useEffect.update"];
            update();
            const observer = new ResizeObserver(update);
            observer.observe(viewport);
            observer.observe(stage);
            observer.observe(pad);
            return ({
                "ShaderStudio.useEffect": ()=>observer.disconnect()
            })["ShaderStudio.useEffect"];
        }
    }["ShaderStudio.useEffect"], [
        tab,
        editorMode,
        mockup.media,
        mockup.frame,
        mockupAspect
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ShaderStudio.useEffect": ()=>{
            if (!toast) return;
            const timeout = window.setTimeout({
                "ShaderStudio.useEffect.timeout": ()=>setToast(null)
            }["ShaderStudio.useEffect.timeout"], 2400);
            return ({
                "ShaderStudio.useEffect": ()=>window.clearTimeout(timeout)
            })["ShaderStudio.useEffect"];
        }
    }["ShaderStudio.useEffect"], [
        toast
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ShaderStudio.useEffect": ()=>{
            if (!exportOpen || editorMode !== "animation") return;
            setExportOpen(false);
            setExportTab("mockup");
            setMockupExportOpen(true);
        }
    }["ShaderStudio.useEffect"], [
        exportOpen,
        editorMode
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ShaderStudio.useEffect": ()=>{
            const hasMockupExport = mockup.visible && Boolean(mockup.media);
            if (mockupExportOpen && exportTab === "mockup" && !hasMockupExport) setExportTab("image");
            document.querySelectorAll(".export-tabs button").forEach({
                "ShaderStudio.useEffect": (button)=>{
                    if (button.textContent === "Mockup") button.disabled = !hasMockupExport;
                }
            }["ShaderStudio.useEffect"]);
        }
    }["ShaderStudio.useEffect"], [
        exportTab,
        mockup.media,
        mockup.visible,
        mockupExportOpen
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ShaderStudio.useEffect": ()=>{
            if (!isTimelinePlaying) return;
            const startedAt = performance.now() - playheadRef.current * 1000;
            let frame = 0;
            const tick = {
                "ShaderStudio.useEffect.tick": (now)=>{
                    const next = Math.min(baseDuration, (now - startedAt) / 1000);
                    playheadRef.current = next;
                    setPlayhead(next);
                    if (next >= baseDuration) {
                        setIsTimelinePlaying(false);
                        return;
                    }
                    frame = requestAnimationFrame(tick);
                }
            }["ShaderStudio.useEffect.tick"];
            frame = requestAnimationFrame(tick);
            return ({
                "ShaderStudio.useEffect": ()=>cancelAnimationFrame(frame)
            })["ShaderStudio.useEffect"];
        }
    }["ShaderStudio.useEffect"], [
        isTimelinePlaying
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ShaderStudio.useEffect": ()=>{
            let localRecipes = [];
            try {
                var _localStorage_getItem;
                const parsed = JSON.parse((_localStorage_getItem = localStorage.getItem(SAVED_RECIPES_KEY)) !== null && _localStorage_getItem !== void 0 ? _localStorage_getItem : "[]");
                if (Array.isArray(parsed)) localRecipes = parsed.filter({
                    "ShaderStudio.useEffect": (item)=>Boolean((item === null || item === void 0 ? void 0 : item.id) && (item === null || item === void 0 ? void 0 : item.name) && typeof item.style === "number")
                }["ShaderStudio.useEffect"]);
            } catch (e) {}
            localRecipes.forEach(saveRecipe);
            try {
                var _localStorage_getItem1;
                const resumeRecipe = JSON.parse((_localStorage_getItem1 = localStorage.getItem(RESUME_RECIPE_KEY)) !== null && _localStorage_getItem1 !== void 0 ? _localStorage_getItem1 : "null");
                var _appPresets_, _ref;
                if ((resumeRecipe === null || resumeRecipe === void 0 ? void 0 : resumeRecipe.id) && (resumeRecipe === null || resumeRecipe === void 0 ? void 0 : resumeRecipe.name) && typeof resumeRecipe.style === "number") setRecipe(resumeRecipe);
                else setRecipe((_ref = (_appPresets_ = appPresets[0]) !== null && _appPresets_ !== void 0 ? _appPresets_ : localRecipes[0]) !== null && _ref !== void 0 ? _ref : defaultRecipe);
            } catch (e) {
                var _appPresets_1, _ref1;
                setRecipe((_ref1 = (_appPresets_1 = appPresets[0]) !== null && _appPresets_1 !== void 0 ? _appPresets_1 : localRecipes[0]) !== null && _ref1 !== void 0 ? _ref1 : defaultRecipe);
            }
            hasRestoredRecipe.current = true;
        }
    }["ShaderStudio.useEffect"], [
        saveRecipe
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ShaderStudio.useEffect": ()=>{
            localStorage.setItem(SAVED_RECIPES_KEY, JSON.stringify(saved));
        }
    }["ShaderStudio.useEffect"], [
        saved
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "ShaderStudio.useEffect": ()=>{
            if (hasRestoredRecipe.current) localStorage.setItem(RESUME_RECIPE_KEY, JSON.stringify(recipe));
        }
    }["ShaderStudio.useEffect"], [
        recipe
    ]);
    const change = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "ShaderStudio.useCallback[change]": (update)=>{
            setHistory({
                "ShaderStudio.useCallback[change]": (items)=>[
                        ...items,
                        recipe
                    ].slice(-50)
            }["ShaderStudio.useCallback[change]"]);
            setFuture([]);
            setRecipe({
                "ShaderStudio.useCallback[change]": (current)=>({
                        ...current,
                        ...update
                    })
            }["ShaderStudio.useCallback[change]"]);
        }
    }["ShaderStudio.useCallback[change]"], [
        recipe
    ]);
    const undo = ()=>{
        const previous = history.at(-1);
        if (!previous) return;
        setFuture((items)=>[
                recipe,
                ...items
            ]);
        setHistory((items)=>items.slice(0, -1));
        setRecipe(previous);
    };
    const redo = ()=>{
        const next = future[0];
        if (!next) return;
        setHistory((items)=>[
                ...items,
                recipe
            ]);
        setFuture((items)=>items.slice(1));
        setRecipe(next);
    };
    const reset = ()=>{
        setHistory((items)=>[
                ...items,
                recipe
            ]);
        setRecipe(defaultRecipe);
        setFuture([]);
    };
    const selectPreset = (name, style)=>{
        setHistory((items)=>[
                ...items,
                recipe
            ].slice(-50));
        setFuture([]);
        // Style selection swaps the visual engine only. Your palette, surface,
        // motion, frame, and interaction choices remain part of the same look.
        setRecipe((current)=>({
                ...current,
                name,
                style,
                glsl: fragmentShader
            }));
    };
    const resetCharacter = ()=>{
        var _presetSettings_recipe_style;
        const settings = (_presetSettings_recipe_style = presetSettings[recipe.style]) !== null && _presetSettings_recipe_style !== void 0 ? _presetSettings_recipe_style : defaultRecipe;
        var _settings_intensity, _settings_zoom, _settings_warp, _settings_contrast;
        change({
            intensity: (_settings_intensity = settings.intensity) !== null && _settings_intensity !== void 0 ? _settings_intensity : defaultRecipe.intensity,
            zoom: (_settings_zoom = settings.zoom) !== null && _settings_zoom !== void 0 ? _settings_zoom : defaultRecipe.zoom,
            warp: (_settings_warp = settings.warp) !== null && _settings_warp !== void 0 ? _settings_warp : defaultRecipe.warp,
            contrast: (_settings_contrast = settings.contrast) !== null && _settings_contrast !== void 0 ? _settings_contrast : defaultRecipe.contrast,
            seed: defaultRecipe.seed
        });
    };
    const recolour = ()=>change({
            palette: palettes[Math.floor(Math.random() * palettes.length)]
        });
    const randomizePalette = ()=>{
        const palette = palettes[Math.floor(Math.random() * palettes.length)];
        change({
            palette
        });
        setToast("Palette randomized");
    };
    const applyTheme = (name)=>{
        var _companyThemes_find;
        const theme = (_companyThemes_find = companyThemes.find((item)=>item.name === name)) !== null && _companyThemes_find !== void 0 ? _companyThemes_find : companyThemes[0];
        setSelectedTheme(theme.name);
        change({
            palette: [
                ...theme.palette
            ]
        });
        setToast("".concat(theme.name, " theme applied"));
    };
    const remix = ()=>{
        const effects = [
            "push",
            "repel",
            "swirl",
            "ripple",
            "spotlight"
        ];
        change({
            intensity: .35 + Math.random() * .6,
            zoom: .65 + Math.random() * 1.15,
            warp: Math.random(),
            contrast: .2 + Math.random() * .75,
            speed: Math.random() * 2.4,
            drift: Math.random(),
            animate: Math.random() > .12,
            reverse: Math.random() > .5,
            grain: Math.random() * .1,
            rotate: -Math.PI + Math.random() * Math.PI * 2,
            offsetX: -0.5 + Math.random(),
            offsetY: -0.5 + Math.random(),
            seed: Math.floor(Math.random() * 100000),
            smoothBlend: Math.random() > .5,
            cursorEnabled: Math.random() > .35,
            cursorEffect: effects[Math.floor(Math.random() * effects.length)],
            cursorStrength: .2 + Math.random() * .75,
            cursorRadius: .2 + Math.random() * .7
        });
        setToast("Shader remixed Ã¢â‚¬â€ style and colours kept");
    };
    const restyle = ()=>{
        const choices = Object.keys(presetSettings).map(Number).filter((style)=>style !== recipe.style);
        const style = choices[Math.floor(Math.random() * choices.length)];
        var _styleNames_style;
        const name = (_styleNames_style = styleNames[style]) !== null && _styleNames_style !== void 0 ? _styleNames_style : "Restyled shader";
        var _presetSettings_style;
        const settings = (_presetSettings_style = presetSettings[style]) !== null && _presetSettings_style !== void 0 ? _presetSettings_style : defaultRecipe;
        change({
            ...settings,
            name,
            style,
            palette: recipe.palette,
            glsl: fragmentShader
        });
        setToast("Style changed Ã¢â‚¬â€ palette kept");
    };
    const inspire = ()=>{
        const effects = [
            "push",
            "repel",
            "swirl",
            "ripple",
            "spotlight"
        ];
        change({
            name: "Inspired shader",
            style: Math.floor(Math.random() * 14),
            palette: palettes[Math.floor(Math.random() * palettes.length)],
            intensity: .35 + Math.random() * .6,
            zoom: .65 + Math.random() * 1.15,
            warp: Math.random(),
            contrast: .2 + Math.random() * .75,
            speed: Math.random() * 2.4,
            drift: Math.random(),
            animate: Math.random() > .12,
            reverse: Math.random() > .5,
            grain: Math.random() * .1,
            rotate: -Math.PI + Math.random() * Math.PI * 2,
            offsetX: -0.5 + Math.random(),
            offsetY: -0.5 + Math.random(),
            seed: Math.floor(Math.random() * 100000),
            smoothBlend: Math.random() > .5,
            cursorEnabled: Math.random() > .35,
            cursorEffect: effects[Math.floor(Math.random() * effects.length)],
            cursorStrength: .2 + Math.random() * .75,
            cursorRadius: .2 + Math.random() * .7,
            glsl: fragmentShader
        });
    };
    const exportText = (content, filename, type)=>{
        const link = document.createElement("a");
        link.href = URL.createObjectURL(new Blob([
            content
        ], {
            type
        }));
        link.download = filename;
        link.click();
        URL.revokeObjectURL(link.href);
    };
    const reactCode = isPaperStyle(recipe.style) ? '"use client";\n\nimport { '.concat(paperShaderNames[recipe.style], ' } from "@paper-design/shaders-react";\n\n// Official Paper Shaders component, using its real renderer and default preset.\nexport function ').concat(paperShaderNames[recipe.style], "Background() {\n  return <").concat(paperShaderNames[recipe.style], ' width="100%" height="100%" />;\n}\n') : '"use client";\n\n// Generated by Shader Studio\nexport const fragmentShader = '.concat(JSON.stringify(recipe.glsl), ";\n\nexport const shaderRecipe = ").concat(JSON.stringify({
        ...recipe,
        glsl: undefined
    }, null, 2), ";\n");
    const buildPrompt = ()=>{
        var _styleNames_recipe_style;
        const style = (_styleNames_recipe_style = styleNames[recipe.style]) !== null && _styleNames_recipe_style !== void 0 ? _styleNames_recipe_style : recipe.name;
        const cursor = recipe.cursorEnabled ? "".concat(recipe.cursorEffect, " (strength ").concat(Math.round(recipe.cursorStrength * 100), "/100, radius ").concat(Math.round(recipe.cursorRadius * 100), "/100)") : "off";
        return 'Add an animated WebGL shader background to my app.\nStyle: "'.concat(style, '".\nColours (low Ã¢â€ â€™ high): ').concat(recipe.palette.map((color)=>color.toUpperCase()).join(", "), ".\nFeel: animate ").concat(recipe.animate ? "on" : "off", ", speed ").concat(Math.round(recipe.speed / 3 * 100), "/100, drift ").concat(Math.round(recipe.drift * 100), "/100, zoom ").concat(Math.round(recipe.zoom / 2 * 100), "/100, intensity ").concat(Math.round(recipe.intensity * 100), "/100, warp ").concat(Math.round(recipe.warp * 100), "/100, contrast ").concat(Math.round(recipe.contrast * 100), "/100, rotation ").concat(Math.round(recipe.rotate * 180 / Math.PI), "Ã‚Â°, offset (").concat(Math.round(recipe.offsetX * 100), "/100, ").concat(Math.round(recipe.offsetY * 100), "/100), grain ").concat(Math.round(recipe.grain / .12 * 100), "/100, smooth blend ").concat(recipe.smoothBlend ? "on" : "off", ".\nCursor: ").concat(cursor, ".\nImplementation notes:\nRender a fullscreen triangle in a plain WebGL1 context with no rendering library. Cap devicePixelRatio at 2, use requestAnimationFrame only while visible, and mount the canvas absolutely behind the page content.\nUse this exact fragment shader:\n").concat(recipe.glsl, "\nFeed the shader its u_resolution, u_time, u_pointer, u_velocity, u_colors, style, palette, surface, movement, frame, and cursor uniforms from the selected recipe.");
    };
    const copyText = async function(source) {
        let label = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : "Copied to clipboard";
        try {
            await navigator.clipboard.writeText(source);
            setCopied(true);
            setToast(label);
            window.setTimeout(()=>setCopied(false), 1500);
        } catch (e) {
            setToast("CouldnÃ¢â‚¬â„¢t copy Ã¢â‚¬â€ please try again");
        }
    };
    const exportPng = ()=>{
        const canvas = document.querySelector(isPaperStyle(recipe.style) ? ".canvas-area .paper-shader-canvas canvas" : ".canvas-area .shader-canvas");
        if (!canvas) return;
        const link = document.createElement("a");
        link.download = "".concat(recipe.name.toLowerCase().replaceAll(" ", "-"), ".png");
        link.href = canvas.toDataURL("image/png");
        link.click();
    };
    const exportAspect = ()=>outputAspect.split(":").map(Number);
    const mockupOutputSize = function() {
        let height = arguments.length > 0 && arguments[0] !== void 0 ? arguments[0] : videoSettings.height;
        const [ratioWidth, ratioHeight] = exportAspect();
        return {
            width: Math.round(height * ratioWidth / ratioHeight / 2) * 2,
            height
        };
    };
    const loadExportImage = (src)=>new Promise((resolve, reject)=>{
            const image = new Image();
            image.onload = ()=>resolve(image);
            image.onerror = ()=>reject(new Error("Could not load mockup media"));
            image.src = src;
        });
    const drawMockupComposition = async (canvas)=>{
        const context = canvas.getContext("2d");
        const shader = document.querySelector(".canvas-area .shader-canvas");
        if (!context || !shader) throw new Error("Live shader preview is unavailable");
        context.drawImage(shader, 0, 0, canvas.width, canvas.height);
        if (!mockup.visible) return;
        const stageWidthRatio = cameraGeometry.viewportWidth ? cameraGeometry.stageWidth / cameraGeometry.viewportWidth : .58;
        const stageHeightRatio = cameraGeometry.viewportHeight ? cameraGeometry.stageHeight / cameraGeometry.viewportHeight : .52;
        const exportGeometry = {
            viewportWidth: canvas.width,
            viewportHeight: canvas.height,
            stageWidth: canvas.width * stageWidthRatio,
            stageHeight: canvas.height * stageHeightRatio,
            padWidth: 0,
            padHeight: 0
        };
        const frame = getCameraFrame(mockup, exportGeometry);
        const width = exportGeometry.stageWidth;
        const height = exportGeometry.stageHeight;
        const framePad = mockup.frame === "inset" ? 14 : mockup.frame === "border" ? 7 : 0;
        const bar = mockup.frame === "browser" ? Math.max(22, height * .047) : 0;
        const mediaWidth = width - framePad * 2;
        const mediaHeight = height - bar - framePad * 2;
        const x = canvas.width / 2 + width * mockup.x / 100 - mockup.cameraX / 50 * frame.panLimitX;
        const y = canvas.height / 2 + height * mockup.y / 100 - mockup.cameraY / 50 * frame.panLimitY;
        context.save();
        context.translate(x, y);
        context.scale(frame.renderScale, frame.renderScale);
        context.rotate(mockup.rotate * Math.PI / 180);
        context.scale(1 - Math.abs(mockup.tiltY) / 60, 1 - Math.abs(mockup.tiltX) / 80);
        context.shadowColor = "rgba(0,0,0,".concat(.2 + mockup.shadow / 160, ")");
        context.shadowBlur = 16 + mockup.shadow;
        context.shadowOffsetY = 8 + mockup.shadow / 3;
        const radius = Math.min(mockup.radius, Math.min(width, height) / 4);
        context.fillStyle = mockup.frame === "glass" ? "rgba(255,255,255,.22)" : mockup.frame === "none" ? "transparent" : "#111216";
        if (mockup.frame !== "none") {
            context.beginPath();
            context.roundRect(-width / 2, -height / 2, width, height, radius);
            context.fill();
        }
        context.shadowColor = "transparent";
        context.save();
        context.beginPath();
        context.roundRect(-mediaWidth / 2, -height / 2 + bar + framePad, mediaWidth, mediaHeight, Math.max(0, radius - framePad));
        context.clip();
        if (mockup.media && mockup.mediaType === "image") {
            const image = await loadExportImage(mockup.media);
            context.drawImage(image, -mediaWidth / 2, -height / 2 + bar + framePad, mediaWidth, mediaHeight);
        } else {
            context.fillStyle = "#171a2c";
            context.fillRect(-mediaWidth / 2, -height / 2 + bar + framePad, mediaWidth, mediaHeight);
            context.fillStyle = "#f5f6ff";
            context.font = "600 ".concat(Math.max(18, mediaWidth / 11), "px sans-serif");
            context.textAlign = "center";
            context.fillText(mockup.mediaType === "video" ? "Video mockup" : "Your product", 0, 12);
        }
        context.restore();
        if (mockup.frame === "browser") {
            context.fillStyle = "#1b1c20";
            context.fillRect(-mediaWidth / 2, -height / 2, mediaWidth, bar);
            context.fillStyle = "#777b85";
            [
                -12,
                0,
                12
            ].forEach((offset)=>{
                context.beginPath();
                context.arc(-mediaWidth / 2 + 16 + offset, -height / 2 + bar / 2, 3, 0, Math.PI * 2);
                context.fill();
            });
        }
        context.restore();
    };
    const exportMockupImage = async ()=>{
        try {
            const { width, height } = mockupOutputSize(mockupImageHeight);
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            await drawMockupComposition(canvas);
            const link = document.createElement("a");
            link.download = "".concat(recipe.name.toLowerCase().replaceAll(" ", "-"), "-mockup.png");
            link.href = canvas.toDataURL("image/png");
            link.click();
            setToast("Mockup image exported");
        } catch (error) {
            setToast(error instanceof Error ? error.message : "Could not export mockup image");
        }
    };
    const exportMockupVideo = async ()=>{
        var _videoFormats_find, _videoFormats_find1;
        if (!("MediaRecorder" in window)) {
            setToast("Video export is not supported in this browser");
            return;
        }
        var _videoFormats_find_value;
        const mimeType = (_videoFormats_find_value = (_videoFormats_find = videoFormats.find((item)=>item.value === videoSettings.mimeType && MediaRecorder.isTypeSupported(item.value))) === null || _videoFormats_find === void 0 ? void 0 : _videoFormats_find.value) !== null && _videoFormats_find_value !== void 0 ? _videoFormats_find_value : (_videoFormats_find1 = videoFormats.find((item)=>MediaRecorder.isTypeSupported(item.value))) === null || _videoFormats_find1 === void 0 ? void 0 : _videoFormats_find1.value;
        if (!mimeType) {
            setToast("No compatible video format is available in this browser");
            return;
        }
        try {
            const { width, height } = mockupOutputSize();
            const canvas = document.createElement("canvas");
            canvas.width = width;
            canvas.height = height;
            const stream = canvas.captureStream(videoSettings.fps);
            const chunks = [];
            const recorder = new MediaRecorder(stream, {
                mimeType,
                videoBitsPerSecond: height >= 1080 ? 12_000_000 : 6_000_000
            });
            const finished = new Promise((resolve, reject)=>{
                recorder.ondataavailable = (event)=>event.data.size && chunks.push(event.data);
                recorder.onerror = ()=>reject(new Error("Video encoding failed"));
                recorder.onstop = ()=>resolve(new Blob(chunks, {
                        type: mimeType
                    }));
            });
            recorder.start();
            setVideoProgress(0);
            const frames = videoSettings.duration * videoSettings.fps;
            for(let frame = 0; frame < frames; frame += 1){
                await drawMockupComposition(canvas);
                setVideoProgress((frame + 1) / frames);
                await new Promise((resolve)=>window.setTimeout(resolve, 1000 / videoSettings.fps));
            }
            recorder.stop();
            const blob = await finished;
            stream.getTracks().forEach((track)=>track.stop());
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "".concat(recipe.name.toLowerCase().replaceAll(" ", "-"), "-mockup.").concat(mimeType.includes("mp4") ? "mp4" : "webm");
            link.click();
            window.setTimeout(()=>URL.revokeObjectURL(link.href), 1000);
            setToast("Mockup video exported");
        } catch (error) {
            setToast(error instanceof Error ? error.message : "Could not export mockup video");
        } finally{
            setVideoProgress(null);
        }
    };
    const updateVideoSettings = (update)=>setVideoSettings((current)=>({
                ...current,
                ...update
            }));
    const setOutputFrame = (aspect)=>{
        setOutputAspect(aspect);
        updateVideoSettings({
            aspect: aspect === "4:5" ? "16:9" : aspect
        });
    };
    const exportVideo = async ()=>{
        var _videoFormats_find;
        if (!("MediaRecorder" in window)) {
            setToast("Video export is not supported in this browser");
            return;
        }
        const format = videoFormats.find((item)=>item.value === videoSettings.mimeType);
        const mimeType = format && MediaRecorder.isTypeSupported(format.value) ? format.value : (_videoFormats_find = videoFormats.find((item)=>MediaRecorder.isTypeSupported(item.value))) === null || _videoFormats_find === void 0 ? void 0 : _videoFormats_find.value;
        if (!mimeType) {
            setToast("No compatible video format is available in this browser");
            return;
        }
        const [ratioWidth, ratioHeight] = outputAspect.split(":").map(Number);
        const height = videoSettings.height;
        const width = Math.round(height * ratioWidth / ratioHeight / 2) * 2;
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const gl = canvas.getContext("webgl", {
            preserveDrawingBuffer: true
        });
        if (!gl) {
            setToast("WebGL is unavailable in this browser");
            return;
        }
        const compile = (type, source)=>{
            const shader = gl.createShader(type);
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error(gl.getShaderInfoLog(shader) || "Shader compile failed");
            return shader;
        };
        try {
            var _s = __turbopack_context__.k.signature();
            const vertex = compile(gl.VERTEX_SHADER, "attribute vec2 position; void main(){gl_Position=vec4(position,0.,1.);}");
            const fragment = compile(gl.FRAGMENT_SHADER, recipe.glsl);
            const program = gl.createProgram();
            gl.attachShader(program, vertex);
            gl.attachShader(program, fragment);
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error(gl.getProgramInfoLog(program) || "Shader link failed");
            const position = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, position);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([
                -1,
                -1,
                3,
                -1,
                -1,
                3
            ]), gl.STATIC_DRAW);
            const stream = canvas.captureStream(0);
            const track = stream.getVideoTracks()[0];
            const chunks = [];
            const recorder = new MediaRecorder(stream, {
                mimeType,
                videoBitsPerSecond: height >= 1080 ? 12_000_000 : height >= 720 ? 6_000_000 : 3_000_000
            });
            const finished = new Promise((resolve, reject)=>{
                recorder.ondataavailable = (event)=>{
                    if (event.data.size) chunks.push(event.data);
                };
                recorder.onerror = ()=>reject(new Error("Video encoding failed"));
                recorder.onstop = ()=>resolve(new Blob(chunks, {
                        type: mimeType
                    }));
            });
            const renderFrame = (time)=>{
                var _track_requestFrame;
                _s();
                gl.viewport(0, 0, width, height);
                gl.useProgram(program);
                gl.enableVertexAttribArray(gl.getAttribLocation(program, "position"));
                gl.vertexAttribPointer(gl.getAttribLocation(program, "position"), 2, gl.FLOAT, false, 0, 0);
                const set1 = (name, value)=>gl.uniform1f(gl.getUniformLocation(program, name), value);
                gl.uniform2f(gl.getUniformLocation(program, "u_resolution"), width, height);
                set1("u_time", time);
                gl.uniform2f(gl.getUniformLocation(program, "u_pointer"), .5, .5);
                gl.uniform2f(gl.getUniformLocation(program, "u_velocity"), 0, 0);
                const colors = [
                    ...recipe.palette
                ];
                while(colors.length < 5)colors.push(colors.at(-1) || "#000000");
                gl.uniform3fv(gl.getUniformLocation(program, "u_colors"), colors.slice(0, 5).map(hexToRgb).flat());
                set1("u_style", recipe.style);
                set1("u_intensity", recipe.intensity);
                set1("u_zoom", recipe.zoom);
                set1("u_warp", recipe.warp);
                set1("u_contrast", recipe.contrast);
                set1("u_speed", recipe.speed);
                set1("u_drift", recipe.drift);
                set1("u_animate", recipe.animate ? 1 : 0);
                set1("u_reverse", recipe.reverse ? 1 : 0);
                set1("u_rotate", recipe.rotate);
                set1("u_seed", recipe.seed);
                set1("u_smooth_blend", recipe.smoothBlend ? 1 : 0);
                set1("u_grain", recipe.grain);
                gl.uniform2f(gl.getUniformLocation(program, "u_offset"), recipe.offsetX, recipe.offsetY);
                set1("u_cursor_on", 0);
                set1("u_cursor_effect", 0);
                set1("u_cursor_strength", 0);
                set1("u_cursor_radius", 0);
                gl.drawArrays(gl.TRIANGLES, 0, 3);
                gl.finish();
                (_track_requestFrame = track.requestFrame) === null || _track_requestFrame === void 0 ? void 0 : _track_requestFrame.call(track);
            };
            _s(renderFrame, "ZdQBZ3rq7bWAAMQq6hlVCmYF0jM=", false, function() {
                return [
                    gl.useProgram
                ];
            });
            const forwardFrames = videoSettings.duration * videoSettings.fps;
            const indexes = Array.from({
                length: forwardFrames
            }, (_, index)=>index);
            const frameIndexes = videoSettings.loop ? [
                ...indexes,
                ...indexes.slice(1, -1).reverse()
            ] : indexes;
            recorder.start();
            setVideoProgress(0);
            for(let index = 0; index < frameIndexes.length; index += 1){
                renderFrame(frameIndexes[index] / videoSettings.fps);
                setVideoProgress((index + 1) / frameIndexes.length);
                await new Promise((resolve)=>requestAnimationFrame(()=>resolve()));
            }
            recorder.stop();
            const blob = await finished;
            stream.getTracks().forEach((item)=>item.stop());
            const extension = mimeType.includes("mp4") ? "mp4" : "webm";
            const link = document.createElement("a");
            link.href = URL.createObjectURL(blob);
            link.download = "".concat(recipe.name.toLowerCase().replaceAll(" ", "-")).concat(videoSettings.loop ? "-loop" : "", ".").concat(extension);
            link.click();
            window.setTimeout(()=>URL.revokeObjectURL(link.href), 1000);
            setToast("Video exported");
        } catch (error) {
            setToast(error instanceof Error ? error.message : "Could not export video");
        } finally{
            setVideoProgress(null);
        }
    };
    const save = ()=>{
        const item = {
            ...recipe,
            id: crypto.randomUUID(),
            name: saveName.trim() || "Untitled recipe"
        };
        saveRecipe(item);
        setSaveOpen(false);
    };
    const activeLabel = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ShaderStudio.useMemo[activeLabel]": ()=>{
            var _styleNames_recipe_style;
            return (_styleNames_recipe_style = styleNames[recipe.style]) !== null && _styleNames_recipe_style !== void 0 ? _styleNames_recipe_style : recipe.name;
        }
    }["ShaderStudio.useMemo[activeLabel]"], [
        recipe.style,
        recipe.name
    ]);
    const availablePresets = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ShaderStudio.useMemo[availablePresets]": ()=>[
                ...appPresets,
                ...saved.filter({
                    "ShaderStudio.useMemo[availablePresets]": (item)=>!appPresets.some({
                            "ShaderStudio.useMemo[availablePresets]": (preset)=>preset.id === item.id
                        }["ShaderStudio.useMemo[availablePresets]"])
                }["ShaderStudio.useMemo[availablePresets]"])
            ]
    }["ShaderStudio.useMemo[availablePresets]"], [
        saved
    ]);
    const filteredSaved = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "ShaderStudio.useMemo[filteredSaved]": ()=>{
            const query = presetSearch.trim().toLowerCase();
            if (!query) return availablePresets;
            return availablePresets.filter({
                "ShaderStudio.useMemo[filteredSaved]": (item)=>{
                    var _styleNames_item_style;
                    return "".concat(item.name, " ").concat((_styleNames_item_style = styleNames[item.style]) !== null && _styleNames_item_style !== void 0 ? _styleNames_item_style : "Custom look").toLowerCase().includes(query);
                }
            }["ShaderStudio.useMemo[filteredSaved]"]);
        }
    }["ShaderStudio.useMemo[filteredSaved]"], [
        availablePresets,
        presetSearch
    ]);
    const updateMockup = (update)=>setMockup((current)=>({
                ...current,
                ...update
            }));
    const loadFile = (file)=>{
        if (!file.type.startsWith("image/") && !file.type.startsWith("video/")) {
            setToast("Choose an image or video");
            return;
        }
        const reader = new FileReader();
        reader.onload = ()=>{
            const centered = mockupPresets[0];
            updateMockup({
                media: String(reader.result),
                mediaType: file.type.startsWith("video/") ? "video" : "image",
                ...centered.settings
            });
            setBasePresetId(centered.id);
            setToast("Centered mockup preset applied");
        };
        reader.readAsDataURL(file);
    };
    const loadMockupMedia = (event)=>{
        var _event_target_files;
        const file = (_event_target_files = event.target.files) === null || _event_target_files === void 0 ? void 0 : _event_target_files[0];
        if (file) loadFile(file);
    };
    const handleDrop = (event)=>{
        var _event_dataTransfer_files;
        event.preventDefault();
        const file = (_event_dataTransfer_files = event.dataTransfer.files) === null || _event_dataTransfer_files === void 0 ? void 0 : _event_dataTransfer_files[0];
        if (file) loadFile(file);
    };
    const useMockupPreset = (preset)=>{
        updateMockup({
            ...preset.settings,
            x: mockup.x,
            y: mockup.y
        });
        setBasePresetId(preset.id);
        setToast("".concat(preset.label, " camera preset applied"));
    };
    var _mockupPresets_find;
    const focusPreset = (_mockupPresets_find = mockupPresets.find((preset)=>preset.id === focusPresetId)) !== null && _mockupPresets_find !== void 0 ? _mockupPresets_find : mockupPresets[0];
    const setTimelinePlayhead = (next)=>{
        const snapped = Math.round(Math.max(0, Math.min(baseDuration, next)) * 10) / 10;
        playheadRef.current = snapped;
        setPlayhead(snapped);
    };
    const playMotionPreview = ()=>{
        if (isTimelinePlaying) {
            setIsTimelinePlaying(false);
            return;
        }
        if (playheadRef.current >= baseDuration) setTimelinePlayhead(0);
        setIsTimelinePlaying(true);
    };
    const createAnimationClip = function(start) {
        let duration = arguments.length > 1 && arguments[1] !== void 0 ? arguments[1] : Math.min(animationDuration, baseDuration);
        return {
            id: crypto.randomUUID(),
            label: cameraMode === "tilt" ? "Tilt" : "Zoom",
            presetId: focusPresetId,
            start,
            duration,
            transition: Math.min(animationTransition, duration - .18),
            easing: animationEasing,
            zoom: focusZoom,
            tilt: focusTilt,
            hold: Math.min(animationHold, duration * .3),
            springSpeed,
            targetX: mockup.x,
            targetY: mockup.y,
            targetTiltX: focusPreset.settings.tiltX,
            targetTiltY: focusPreset.settings.tiltY,
            targetRotate: focusPreset.settings.rotate,
            cameraX: focusPreset.settings.cameraX,
            cameraY: focusPreset.settings.cameraY,
            exit: "base"
        };
    };
    const openAnimation = ()=>{
        if (!basePresetId && !mockup.media) {
            setToast("Upload media, then choose a mockup preset before animating");
            return;
        }
        if (!basePresetId) setBasePresetId("hero");
        setAnimationClips((clips)=>{
            if (clips.length) {
                setActiveClipId((id)=>id !== null && id !== void 0 ? id : clips[0].id);
                return clips;
            }
            const first = createAnimationClip(0);
            setActiveClipId(first.id);
            return [
                first
            ];
        });
        setEditorMode("animation");
        setMotionPreview("base");
    };
    const addAnimationClip = ()=>{
        const duration = Math.min(animationDuration, baseDuration);
        const ordered = [
            ...animationClips
        ].sort((a, b)=>a.start - b.start);
        let gapStart = 0;
        let start = -1;
        for (const existing of ordered){
            if (existing.start - gapStart >= duration) {
                start = gapStart;
                break;
            }
            gapStart = Math.max(gapStart, existing.start + existing.duration);
        }
        if (start < 0 && baseDuration - gapStart >= duration) start = gapStart;
        if (start < 0) {
            setToast("No room in the base duration for another animation");
            return;
        }
        const clip = createAnimationClip(Math.round(start * 10) / 10, duration);
        setAnimationClips((clips)=>[
                ...clips,
                clip
            ]);
        setActiveClipId(clip.id);
        setEditorMode("animation");
    };
    const duplicateActiveClip = ()=>{
        if (!activeClip) return;
        const others = animationClips.filter((clip)=>clip.id !== activeClip.id).sort((a, b)=>a.start - b.start);
        let gapStart = 0;
        let start = -1;
        for (const existing of others){
            if (existing.start - gapStart >= activeClip.duration) {
                start = gapStart;
                break;
            }
            gapStart = Math.max(gapStart, existing.start + existing.duration);
        }
        if (start < 0 && baseDuration - gapStart >= activeClip.duration) start = gapStart;
        if (start < 0) {
            setToast("No room in the base duration to duplicate this animation");
            return;
        }
        const duplicate = {
            ...activeClip,
            id: crypto.randomUUID(),
            start: Math.round(start * 10) / 10,
            exit: "base"
        };
        setAnimationClips((clips)=>[
                ...clips,
                duplicate
            ]);
        setActiveClipId(duplicate.id);
        setToast("Animation duplicated");
    };
    const selectBaseMedia = ()=>{
        setIsTimelinePlaying(false);
        setActiveClipId(null);
        setEditorMode("mockup");
        setMotionPreview("base");
    };
    const selectAnimationClip = (clip)=>{
        setActiveClipId(clip.id);
        setFocusPresetId(clip.presetId);
        setFocusZoom(clip.zoom);
        setFocusTilt(clip.tilt);
        setAnimationTransition(clip.transition);
        setAnimationEasing(clip.easing);
        setAnimationHold(clip.hold);
        setSpringSpeed(clip.springSpeed);
        setEditorMode("animation");
        setMotionPreview("focus");
        seekToClipTarget(clip);
    };
    const seekTimeline = (event)=>{
        const bounds = event.currentTarget.getBoundingClientRect();
        setTimelinePlayhead((event.clientX - bounds.left) / bounds.width * baseDuration);
    };
    const beginClipGesture = (event, clip, kind)=>{
        event.preventDefault();
        event.stopPropagation();
        selectAnimationClip(clip);
        clipGesture.current = {
            id: clip.id,
            kind,
            x: event.clientX,
            start: clip.start,
            duration: clip.duration
        };
        const move = (next)=>{
            var _animationTrackRef_current;
            const gesture = clipGesture.current;
            if (!gesture) return;
            var _animationTrackRef_current_getBoundingClientRect_width;
            const trackWidth = (_animationTrackRef_current_getBoundingClientRect_width = (_animationTrackRef_current = animationTrackRef.current) === null || _animationTrackRef_current === void 0 ? void 0 : _animationTrackRef_current.getBoundingClientRect().width) !== null && _animationTrackRef_current_getBoundingClientRect_width !== void 0 ? _animationTrackRef_current_getBoundingClientRect_width : 1;
            const delta = (next.clientX - gesture.x) / trackWidth * baseDuration;
            setAnimationClips((clips)=>clips.map((item)=>{
                    var _others_;
                    if (item.id !== gesture.id) return item;
                    const others = clips.filter((other)=>other.id !== item.id).sort((a, b)=>a.start - b.start);
                    if (gesture.kind === "resize") {
                        const nextClip = others.find((other)=>other.start >= item.start);
                        const maxEnd = nextClip ? nextClip.start : baseDuration;
                        const duration = Math.round(Math.max(.6, Math.min(maxEnd - item.start, gesture.duration + delta)) * 10) / 10;
                        return {
                            ...item,
                            duration,
                            transition: Math.min(item.transition, duration - .18),
                            hold: Math.min(item.hold, duration * .3)
                        };
                    }
                    const desired = Math.max(0, Math.min(baseDuration - item.duration, gesture.start + delta));
                    var _others__start;
                    const gaps = [
                        {
                            from: 0,
                            to: (_others__start = (_others_ = others[0]) === null || _others_ === void 0 ? void 0 : _others_.start) !== null && _others__start !== void 0 ? _others__start : baseDuration
                        },
                        ...others.map((other, index)=>{
                            var _others_;
                            var _others__start;
                            return {
                                from: other.start + other.duration,
                                to: (_others__start = (_others_ = others[index + 1]) === null || _others_ === void 0 ? void 0 : _others_.start) !== null && _others__start !== void 0 ? _others__start : baseDuration
                            };
                        })
                    ].filter((gap)=>gap.to - gap.from >= item.duration);
                    const start = gaps.reduce((best, gap)=>{
                        const candidate = Math.max(gap.from, Math.min(gap.to - item.duration, desired));
                        return Math.abs(candidate - desired) < Math.abs(best - desired) ? candidate : best;
                    }, gaps.length ? gaps[0].from : item.start);
                    return {
                        ...item,
                        start: Math.round(start * 10) / 10
                    };
                }));
        };
        const end = ()=>{
            clipGesture.current = null;
            setAnimationClips((clips)=>{
                const ordered = [
                    ...clips
                ].sort((a, b)=>a.start - b.start);
                return clips.map((clip)=>{
                    const next = ordered[ordered.findIndex((item)=>item.id === clip.id) + 1];
                    return clip.exit === "next" && (!next || Math.abs(clip.start + clip.duration - next.start) >= .11) ? {
                        ...clip,
                        exit: "base"
                    } : clip;
                });
            });
            window.removeEventListener("pointermove", move);
            window.removeEventListener("pointerup", end);
        };
        window.addEventListener("pointermove", move);
        window.addEventListener("pointerup", end);
    };
    const activeClip = animationClips.find((clip)=>clip.id === activeClipId);
    const orderedClips = [
        ...animationClips
    ].sort((a, b)=>a.start - b.start);
    var _mockupPresets_find1;
    const activeTargetPreset = activeClip ? (_mockupPresets_find1 = mockupPresets.find((preset)=>preset.id === activeClip.presetId)) !== null && _mockupPresets_find1 !== void 0 ? _mockupPresets_find1 : focusPreset : focusPreset;
    var _activeClip_zoom;
    const activeTargetScale = activeTargetPreset.settings.scale * ((_activeClip_zoom = activeClip === null || activeClip === void 0 ? void 0 : activeClip.zoom) !== null && _activeClip_zoom !== void 0 ? _activeClip_zoom : focusZoom);
    const nextClip = activeClip ? orderedClips.find((clip)=>clip.start > activeClip.start) : undefined;
    var _nextClip_start;
    const activeClipMaxDuration = activeClip ? Math.max(.6, ((_nextClip_start = nextClip === null || nextClip === void 0 ? void 0 : nextClip.start) !== null && _nextClip_start !== void 0 ? _nextClip_start : baseDuration) - activeClip.start) : baseDuration;
    const previousFor = (clip)=>orderedClips[orderedClips.findIndex((item)=>item.id === clip.id) - 1];
    const nextFor = (clip)=>orderedClips[orderedClips.findIndex((item)=>item.id === clip.id) + 1];
    const isLinkedFromPrevious = (clip)=>{
        const previous = previousFor(clip);
        return Boolean(previous && previous.exit === "next" && Math.abs(previous.start + previous.duration - clip.start) < .11);
    };
    const seekToClipTarget = (clip)=>{
        const hold = Math.min(clip.hold, clip.duration * .3);
        const travel = isLinkedFromPrevious(clip) ? 0 : Math.min(clip.transition, Math.max(.12, clip.duration - hold - .18));
        setIsTimelinePlaying(false);
        setTimelinePlayhead(clip.start + travel + Math.min(hold / 2, .06));
        setMotionPreview("focus");
    };
    const previewClip = animationClips.find((clip)=>playhead >= clip.start && playhead <= clip.start + clip.duration);
    const springProgress = (progress, speed)=>{
        if (progress <= 0) return 0;
        if (progress >= 1) return 1;
        const frequency = 10 + speed * 7;
        const damping = .72;
        const dampedFrequency = frequency * Math.sqrt(1 - damping * damping);
        const value = 1 - Math.exp(-damping * frequency * progress) * (Math.cos(dampedFrequency * progress) + damping / Math.sqrt(1 - damping * damping) * Math.sin(dampedFrequency * progress));
        return Math.max(-.06, Math.min(1.08, value));
    };
    const motionProgress = function(progress, clip) {
        let speedMultiplier = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : 1;
        if (clip.easing === "spring") return springProgress(progress, clip.springSpeed * speedMultiplier);
        const clamped = Math.max(0, Math.min(1, progress));
        return clamped < .5 ? 4 * clamped * clamped * clamped : 1 - Math.pow(-2 * clamped + 2, 3) / 2;
    };
    const interpolateMockup = (from, to, progress)=>({
            ...from,
            scale: from.scale + (to.scale - from.scale) * progress,
            x: from.x + (to.x - from.x) * progress,
            y: from.y + (to.y - from.y) * progress,
            cameraX: from.cameraX + (to.cameraX - from.cameraX) * progress,
            cameraY: from.cameraY + (to.cameraY - from.cameraY) * progress,
            tiltX: from.tiltX + (to.tiltX - from.tiltX) * progress,
            tiltY: from.tiltY + (to.tiltY - from.tiltY) * progress,
            rotate: from.rotate + (to.rotate - from.rotate) * progress
        });
    const targetState = (clip)=>{
        var _mockupPresets_find;
        const preset = (_mockupPresets_find = mockupPresets.find((item)=>item.id === clip.presetId)) !== null && _mockupPresets_find !== void 0 ? _mockupPresets_find : focusPreset;
        return {
            ...mockup,
            scale: preset.settings.scale * clip.zoom,
            x: clip.targetX,
            y: clip.targetY,
            cameraX: clip.cameraX,
            cameraY: clip.cameraY,
            tiltX: clip.targetTiltX + clip.tilt,
            tiltY: clip.targetTiltY,
            rotate: clip.targetRotate
        };
    };
    const animationState = (clip)=>{
        const target = targetState(clip);
        const localTime = playhead - clip.start;
        const hold = Math.min(clip.hold, clip.duration * .3);
        const next = nextFor(clip);
        const exitState = clip.exit === "next" && next && Math.abs(clip.start + clip.duration - next.start) < .11 ? targetState(next) : mockup;
        if (isLinkedFromPrevious(clip)) {
            const exitDuration = Math.max(.12, clip.duration - hold);
            if (localTime <= hold) return target;
            return interpolateMockup(target, exitState, motionProgress((localTime - hold) / exitDuration, clip, 1.28));
        }
        const travel = Math.min(clip.transition, Math.max(.12, clip.duration - hold - .18));
        const exitDuration = Math.max(.12, clip.duration - travel - hold);
        const progress = localTime <= travel ? motionProgress(localTime / travel, clip) : localTime <= travel + hold ? 1 : motionProgress((localTime - travel - hold) / exitDuration, clip, 1.28);
        return localTime <= travel + hold ? interpolateMockup(mockup, target, progress) : interpolateMockup(target, exitState, progress);
    };
    const stageTransform = (state)=>{
        const frame = getCameraFrame(state, cameraGeometry);
        const panX = -state.cameraX / 50 * frame.panLimitX;
        const panY = -state.cameraY / 50 * frame.panLimitY;
        return "translate(-50%, -50%) translate(".concat(state.x, "% , ").concat(state.y, "%) translate(").concat(panX, "px, ").concat(panY, "px) scale(").concat(frame.renderScale, ") perspective(1200px) rotateX(").concat(state.tiltX, "deg) rotateY(").concat(state.tiltY, "deg) rotateZ(").concat(state.rotate, "deg)");
    };
    const stageMockup = editorMode === "animation" && previewClip ? animationState(previewClip) : mockup;
    const moveCamera = (event)=>{
        const frame = getCameraFrame(mockup, cameraGeometry);
        const box = event.currentTarget.getBoundingClientRect();
        const px = event.clientX - box.left - box.width / 2;
        const py = event.clientY - box.top - box.height / 2;
        if (cameraMode === "zoom") {
            const cameraX = frame.panLimitX ? Math.round(Math.max(-50, Math.min(50, px / (frame.previewScale * frame.panLimitX) * 50))) : 0;
            const cameraY = frame.panLimitY ? Math.round(Math.max(-50, Math.min(50, py / (frame.previewScale * frame.panLimitY) * 50))) : 0;
            updateMockup({
                cameraX,
                cameraY
            });
        } else {
            const normalizedX = Math.min(1, Math.max(0, (event.clientX - box.left) / box.width));
            const normalizedY = Math.min(1, Math.max(0, (event.clientY - box.top) / box.height));
            updateMockup({
                tiltY: Math.round((normalizedX - .5) * 90),
                tiltX: Math.round((.5 - normalizedY) * 90)
            });
        }
    };
    const moveAnimationCamera = (event)=>{
        if (!activeClip) return;
        const frame = getCameraFrame({
            scale: activeTargetScale,
            cameraX: activeClip.cameraX,
            cameraY: activeClip.cameraY
        }, cameraGeometry);
        const box = event.currentTarget.getBoundingClientRect();
        const px = Math.min(1, Math.max(0, (event.clientX - box.left) / box.width));
        const py = Math.min(1, Math.max(0, (event.clientY - box.top) / box.height));
        const updated = cameraMode === "zoom" ? {
            ...activeClip,
            cameraX: frame.panLimitX ? Math.round(Math.max(-50, Math.min(50, (event.clientX - box.left - box.width / 2) / (frame.previewScale * frame.panLimitX) * 50))) : 0,
            cameraY: frame.panLimitY ? Math.round(Math.max(-50, Math.min(50, (event.clientY - box.top - box.height / 2) / (frame.previewScale * frame.panLimitY) * 50))) : 0
        } : {
            ...activeClip,
            targetTiltY: Math.round((px - .5) * 90),
            targetTiltX: Math.round((.5 - py) * 90)
        };
        setAnimationClips((clips)=>clips.map((clip)=>clip.id === activeClipId ? updated : clip));
        seekToClipTarget(updated);
    };
    var _recipe_blur, _activeClip_label, _activeClip_transition, _activeClip_duration, _activeClip_easing, _activeClip_targetX, _activeClip_targetY, _activeClip_targetRotate, _activeClip_cameraX, _activeClip_cameraY, _activeClip_targetTiltX, _activeClip_targetTiltY, _activeClip_targetRotate1, _activeClip_cameraX1, _activeClip_cameraY1, _activeClip_targetTiltY1, _activeClip_cameraX2, _activeClip_cameraY2, _activeClip_targetTiltX1, _activeClip_targetTiltX2, _activeClip_targetTiltY2, _activeClip_duration1;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "studio-shell ".concat(editorMode === "animation" ? "animation-mode" : ""),
        onDragOver: (event)=>event.preventDefault(),
        onDrop: handleDrop,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "topbar",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "brand",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "brand-mark",
                                children: "S"
                            }, void 0, false, {
                                fileName: "[project]/components/shader-studio.tsx",
                                lineNumber: 1098,
                                columnNumber: 55
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "SHADER STUDIO"
                            }, void 0, false, {
                                fileName: "[project]/components/shader-studio.tsx",
                                lineNumber: 1098,
                                columnNumber: 92
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shader-studio.tsx",
                        lineNumber: 1098,
                        columnNumber: 32
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "top-actions",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "icon-button",
                                onClick: undo,
                                disabled: !history.length,
                                "aria-label": "Undo",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$undo$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Undo2$3e$__["Undo2"], {}, void 0, false, {
                                    fileName: "[project]/components/shader-studio.tsx",
                                    lineNumber: 1098,
                                    columnNumber: 245
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/shader-studio.tsx",
                                lineNumber: 1098,
                                columnNumber: 153
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "icon-button",
                                onClick: redo,
                                disabled: !future.length,
                                "aria-label": "Redo",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$redo$2d$2$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Redo2$3e$__["Redo2"], {}, void 0, false, {
                                    fileName: "[project]/components/shader-studio.tsx",
                                    lineNumber: 1098,
                                    columnNumber: 354
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/shader-studio.tsx",
                                lineNumber: 1098,
                                columnNumber: 263
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "button ghost",
                                onClick: ()=>{
                                    setExportTab(tab === "mockup" || editorMode === "animation" ? "mockup" : "image");
                                    setMockupExportOpen(true);
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageDown$3e$__["ImageDown"], {}, void 0, false, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1098,
                                        columnNumber: 535
                                    }, this),
                                    " Export"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shader-studio.tsx",
                                lineNumber: 1098,
                                columnNumber: 372
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "button primary",
                                onClick: ()=>copyText(buildPrompt(), "Build prompt copied"),
                                children: [
                                    copied ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {}, void 0, false, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1098,
                                        columnNumber: 672
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {}, void 0, false, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1098,
                                        columnNumber: 684
                                    }, this),
                                    copied ? "Copied" : "Copy prompt"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shader-studio.tsx",
                                lineNumber: 1098,
                                columnNumber: 564
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "button primary",
                                onClick: ()=>setSaveOpen(true),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {}, void 0, false, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1098,
                                        columnNumber: 806
                                    }, this),
                                    " Save recipe"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shader-studio.tsx",
                                lineNumber: 1098,
                                columnNumber: 737
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shader-studio.tsx",
                        lineNumber: 1098,
                        columnNumber: 124
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shader-studio.tsx",
                lineNumber: 1098,
                columnNumber: 5
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "workspace",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "icon-rail ".concat(editorMode === "animation" ? "mode-disabled" : ""),
                        "aria-label": "Shader controls",
                        children: tabs.map((param)=>{
                            let { id, label, icon: Icon } = param;
                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                disabled: editorMode === "animation",
                                className: "rail-tab ".concat(tab === id ? "active" : ""),
                                onClick: ()=>{
                                    if (id === "export") {
                                        setExportTab(tab === "mockup" || editorMode === "animation" ? "mockup" : "image");
                                        setMockupExportOpen(true);
                                        return;
                                    }
                                    setTab(id);
                                },
                                "aria-label": label,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Icon, {
                                        size: 19,
                                        strokeWidth: 1.8
                                    }, void 0, false, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1100,
                                        columnNumber: 461
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: label
                                    }, void 0, false, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1100,
                                        columnNumber: 497
                                    }, this)
                                ]
                            }, id, true, {
                                fileName: "[project]/components/shader-studio.tsx",
                                lineNumber: 1100,
                                columnNumber: 159
                            }, this);
                        })
                    }, void 0, false, {
                        fileName: "[project]/components/shader-studio.tsx",
                        lineNumber: 1100,
                        columnNumber: 7
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                        className: "inspector ".concat(tab === "mockup" && editorMode === "animation" ? "mode-disabled" : ""),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "inspector-scroll",
                                children: [
                                    tab === "mockup" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "editor-mode-switch",
                                        role: "group",
                                        "aria-label": "Mockup editor mode",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: editorMode === "mockup" ? "active" : "",
                                                onClick: ()=>setEditorMode("mockup"),
                                                children: "Mockup"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1102,
                                                columnNumber: 111
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: editorMode === "animation" ? "active" : "",
                                                onClick: openAnimation,
                                                disabled: !basePresetId && !mockup.media,
                                                title: !basePresetId && !mockup.media ? "Upload media or choose a mockup preset first" : undefined,
                                                children: [
                                                    "Animation ",
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$components$2f$ui$2f$badge$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Badge"], {
                                                        variant: "secondary",
                                                        children: "Beta"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1102,
                                                        columnNumber: 465
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1102,
                                                columnNumber: 226
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1102,
                                        columnNumber: 30
                                    }, this),
                                    tab === "mockup" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                        className: "output-frame-control",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "section-label",
                                                        children: "Output frame"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1103,
                                                        columnNumber: 77
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: "Canvas, camera, animation, and export"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1103,
                                                        columnNumber: 128
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1103,
                                                columnNumber: 72
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "output-frame-grid",
                                                children: outputFrames.map((frame)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: outputAspect === frame.aspect ? "selected" : "",
                                                        onClick: ()=>setOutputFrame(frame.aspect),
                                                        "aria-pressed": outputAspect === frame.aspect,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                className: "output-frame-shape ratio-".concat(frame.aspect.replace(":", "-"))
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/shader-studio.tsx",
                                                                lineNumber: 1103,
                                                                columnNumber: 419
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: frame.aspect
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/shader-studio.tsx",
                                                                lineNumber: 1103,
                                                                columnNumber: 497
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                                children: frame.label
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/shader-studio.tsx",
                                                                lineNumber: 1103,
                                                                columnNumber: 524
                                                            }, this)
                                                        ]
                                                    }, frame.aspect, true, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1103,
                                                        columnNumber: 242
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1103,
                                                columnNumber: 178
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1103,
                                        columnNumber: 30
                                    }, this),
                                    tab === "style" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "panel-content",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "panel-title",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                            children: "Shader styles"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1104,
                                                            columnNumber: 94
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                            className: "helper",
                                                            children: "Exact, fixed-frame PNG previews of each base shader."
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1104,
                                                            columnNumber: 116
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1104,
                                                    columnNumber: 89
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1104,
                                                columnNumber: 60
                                            }, this),
                                            presetGroups.map((group)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                                    className: "preset-group",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                            children: group.title
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1104,
                                                            columnNumber: 287
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                            className: "preset-grid",
                                                            children: group.items.map((param)=>{
                                                                let [name, style] = param;
                                                                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                    onClick: ()=>selectPreset(name, style),
                                                                    className: "preset-card ".concat(recipe.style === style ? "selected" : ""),
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ShaderThumbnail, {
                                                                            style: style
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/shader-studio.tsx",
                                                                            lineNumber: 1104,
                                                                            columnNumber: 505
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                            children: name
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/shader-studio.tsx",
                                                                            lineNumber: 1104,
                                                                            columnNumber: 538
                                                                        }, this)
                                                                    ]
                                                                }, name, true, {
                                                                    fileName: "[project]/components/shader-studio.tsx",
                                                                    lineNumber: 1104,
                                                                    columnNumber: 374
                                                                }, this);
                                                            })
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1104,
                                                            columnNumber: 309
                                                        }, this)
                                                    ]
                                                }, group.title, true, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1104,
                                                    columnNumber: 235
                                                }, this)),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                                className: "control-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        children: "Character"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1104,
                                                        columnNumber: 623
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Slider, {
                                                        label: "Intensity",
                                                        value: recipe.intensity,
                                                        onChange: (intensity)=>change({
                                                                intensity
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1104,
                                                        columnNumber: 641
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Slider, {
                                                        label: "Zoom",
                                                        value: recipe.zoom,
                                                        min: .5,
                                                        max: 2,
                                                        unit: "Ãƒâ€”",
                                                        onChange: (zoom)=>change({
                                                                zoom
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1104,
                                                        columnNumber: 742
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Slider, {
                                                        label: "Warp",
                                                        value: recipe.warp,
                                                        onChange: (warp)=>change({
                                                                warp
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1104,
                                                        columnNumber: 853
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Slider, {
                                                        label: "Contrast",
                                                        value: recipe.contrast,
                                                        onChange: (contrast)=>change({
                                                                contrast
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1104,
                                                        columnNumber: 934
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "button-pair",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "button ghost",
                                                                onClick: ()=>change({
                                                                        seed: Math.floor(Math.random() * 100000)
                                                                    }),
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wand$2d$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__WandSparkles$3e$__["WandSparkles"], {}, void 0, false, {
                                                                        fileName: "[project]/components/shader-studio.tsx",
                                                                        lineNumber: 1104,
                                                                        columnNumber: 1162
                                                                    }, this),
                                                                    " Reseed"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/shader-studio.tsx",
                                                                lineNumber: 1104,
                                                                columnNumber: 1060
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "button ghost",
                                                                onClick: ()=>change({
                                                                        intensity: defaultRecipe.intensity,
                                                                        zoom: defaultRecipe.zoom,
                                                                        warp: defaultRecipe.warp,
                                                                        contrast: defaultRecipe.contrast,
                                                                        seed: defaultRecipe.seed
                                                                    }),
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCcw$3e$__["RefreshCcw"], {}, void 0, false, {
                                                                        fileName: "[project]/components/shader-studio.tsx",
                                                                        lineNumber: 1104,
                                                                        columnNumber: 1402
                                                                    }, this),
                                                                    " Reset"
                                                                ]
                                                            }, void 0, true, {
                                                                fileName: "[project]/components/shader-studio.tsx",
                                                                lineNumber: 1104,
                                                                columnNumber: 1194
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1104,
                                                        columnNumber: 1031
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1104,
                                                columnNumber: 586
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                                                className: "control-section",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                        children: "Frame"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1104,
                                                        columnNumber: 1484
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Slider, {
                                                        label: "Rotate",
                                                        value: recipe.rotate,
                                                        min: -3.14,
                                                        max: 3.14,
                                                        step: .01,
                                                        unit: " rad",
                                                        onChange: (rotate)=>change({
                                                                rotate
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1104,
                                                        columnNumber: 1498
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Slider, {
                                                        label: "Offset X",
                                                        value: recipe.offsetX,
                                                        min: -1,
                                                        max: 1,
                                                        onChange: (offsetX)=>change({
                                                                offsetX
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1104,
                                                        columnNumber: 1633
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Slider, {
                                                        label: "Offset Y",
                                                        value: recipe.offsetY,
                                                        min: -1,
                                                        max: 1,
                                                        onChange: (offsetY)=>change({
                                                                offsetY
                                                            })
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1104,
                                                        columnNumber: 1744
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1104,
                                                columnNumber: 1447
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1104,
                                        columnNumber: 29
                                    }, this),
                                    tab === "palette" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "panel-content",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                children: "Colours"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1105,
                                                columnNumber: 62
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "stops",
                                                children: recipe.palette.map((color, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "color-stop",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ShadcnColorPicker, {
                                                                color: color,
                                                                onChange: (nextColor)=>{
                                                                    const palette = [
                                                                        ...recipe.palette
                                                                    ];
                                                                    palette[index] = nextColor;
                                                                    change({
                                                                        palette
                                                                    });
                                                                }
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/shader-studio.tsx",
                                                                lineNumber: 1105,
                                                                columnNumber: 193
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                children: index === 0 ? "BASE" : "STOP ".concat(index)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/shader-studio.tsx",
                                                                lineNumber: 1105,
                                                                columnNumber: 344
                                                            }, this),
                                                            index > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "remove-colour",
                                                                type: "button",
                                                                "aria-label": "Remove stop ".concat(index),
                                                                onClick: ()=>{
                                                                    const palette = recipe.palette.filter((_, itemIndex)=>itemIndex !== index);
                                                                    change({
                                                                        palette
                                                                    });
                                                                },
                                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$minus$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Minus$3e$__["Minus"], {}, void 0, false, {
                                                                    fileName: "[project]/components/shader-studio.tsx",
                                                                    lineNumber: 1105,
                                                                    columnNumber: 608
                                                                }, this)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/shader-studio.tsx",
                                                                lineNumber: 1105,
                                                                columnNumber: 405
                                                            }, this)
                                                        ]
                                                    }, "".concat(color, "-").concat(index), true, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1105,
                                                        columnNumber: 139
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1105,
                                                columnNumber: 78
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "add-colour",
                                                disabled: recipe.palette.length >= 5,
                                                onClick: ()=>change({
                                                        palette: [
                                                            ...recipe.palette,
                                                            recipe.palette.at(-1) || "#ffffff"
                                                        ]
                                                    }),
                                                children: "+   Add colour"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1105,
                                                columnNumber: 641
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "switch-row",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Smooth blend (OKLab)"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1105,
                                                        columnNumber: 859
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "switch ".concat(recipe.smoothBlend ? "on" : ""),
                                                        onClick: ()=>change({
                                                                smoothBlend: !recipe.smoothBlend
                                                            }),
                                                        "aria-pressed": recipe.smoothBlend,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1105,
                                                            columnNumber: 1050
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1105,
                                                        columnNumber: 892
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1105,
                                                columnNumber: 831
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "section-label",
                                                children: "From a theme"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1105,
                                                columnNumber: 1070
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "theme-picker",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "theme-select",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                "aria-label": "Company inspired themes",
                                                                value: selectedTheme,
                                                                onChange: (event)=>setSelectedTheme(event.target.value),
                                                                children: companyThemes.map((theme)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                        children: theme.name
                                                                    }, theme.name, false, {
                                                                        fileName: "[project]/components/shader-studio.tsx",
                                                                        lineNumber: 1105,
                                                                        columnNumber: 1335
                                                                    }, this))
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/shader-studio.tsx",
                                                                lineNumber: 1105,
                                                                columnNumber: 1179
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {}, void 0, false, {
                                                                fileName: "[project]/components/shader-studio.tsx",
                                                                lineNumber: 1105,
                                                                columnNumber: 1392
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1105,
                                                        columnNumber: 1149
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "button primary",
                                                        onClick: ()=>applyTheme(selectedTheme),
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$palette$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Palette$3e$__["Palette"], {}, void 0, false, {
                                                                fileName: "[project]/components/shader-studio.tsx",
                                                                lineNumber: 1105,
                                                                columnNumber: 1490
                                                            }, this),
                                                            " Apply theme"
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1105,
                                                        columnNumber: 1413
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1105,
                                                columnNumber: 1119
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "button wide ghost palette-randomize",
                                                onClick: randomizePalette,
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {}, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1105,
                                                        columnNumber: 1611
                                                    }, this),
                                                    " Randomize palette"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1105,
                                                columnNumber: 1528
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "section-label palette-label",
                                                children: "Curated palettes"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1105,
                                                columnNumber: 1650
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "palette-grid",
                                                children: palettes.map((palette, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>change({
                                                                palette
                                                            }),
                                                        className: "palette-swatch ".concat(recipe.palette.join() === palette.join() ? "selected" : ""),
                                                        children: palette.map((color)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                style: {
                                                                    background: color
                                                                }
                                                            }, color, false, {
                                                                fileName: "[project]/components/shader-studio.tsx",
                                                                lineNumber: 1105,
                                                                columnNumber: 1952
                                                            }, this))
                                                    }, index, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1105,
                                                        columnNumber: 1781
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1105,
                                                columnNumber: 1717
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1105,
                                        columnNumber: 31
                                    }, this),
                                    tab === "surface" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "panel-content",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                children: "Surface"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1106,
                                                columnNumber: 62
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "helper",
                                                children: "Control depth, texture, and contrast across the full shader field."
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1106,
                                                columnNumber: 78
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Slider, {
                                                label: "Intensity",
                                                value: recipe.intensity,
                                                onChange: (intensity)=>change({
                                                        intensity
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1106,
                                                columnNumber: 170
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Slider, {
                                                label: "Zoom",
                                                value: recipe.zoom,
                                                min: .5,
                                                max: 2,
                                                unit: "Ãƒâ€”",
                                                onChange: (zoom)=>change({
                                                        zoom
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1106,
                                                columnNumber: 271
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Slider, {
                                                label: "Warp",
                                                value: recipe.warp,
                                                onChange: (warp)=>change({
                                                        warp
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1106,
                                                columnNumber: 382
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Slider, {
                                                label: "Contrast",
                                                value: recipe.contrast,
                                                onChange: (contrast)=>change({
                                                        contrast
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1106,
                                                columnNumber: 463
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Slider, {
                                                label: "Grain",
                                                value: recipe.grain,
                                                max: .12,
                                                onChange: (grain)=>change({
                                                        grain
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1106,
                                                columnNumber: 560
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1106,
                                        columnNumber: 31
                                    }, this),
                                    tab === "motion" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "panel-content",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                children: "Movement"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1107,
                                                columnNumber: 61
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "switch-row",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Animate"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1107,
                                                        columnNumber: 106
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "switch ".concat(recipe.animate ? "on" : ""),
                                                        onClick: ()=>change({
                                                                animate: !recipe.animate
                                                            }),
                                                        "aria-pressed": recipe.animate,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1107,
                                                            columnNumber: 268
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1107,
                                                        columnNumber: 126
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1107,
                                                columnNumber: 78
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Slider, {
                                                label: "Speed",
                                                value: recipe.speed,
                                                min: 0,
                                                max: 3,
                                                unit: "Ãƒâ€”",
                                                onChange: (speed)=>change({
                                                        speed
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1107,
                                                columnNumber: 288
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Slider, {
                                                label: "Drift",
                                                value: recipe.drift,
                                                onChange: (drift)=>change({
                                                        drift
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1107,
                                                columnNumber: 402
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "switch-row",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Reverse"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1107,
                                                        columnNumber: 515
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "switch ".concat(recipe.reverse ? "on" : ""),
                                                        onClick: ()=>change({
                                                                reverse: !recipe.reverse
                                                            }),
                                                        "aria-pressed": recipe.reverse,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1107,
                                                            columnNumber: 677
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1107,
                                                        columnNumber: 535
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1107,
                                                columnNumber: 487
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "helper",
                                                children: "Drift controls how far the whole field wanders."
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1107,
                                                columnNumber: 697
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1107,
                                        columnNumber: 30
                                    }, this),
                                    tab === "cursor" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "panel-content",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                children: "Interaction"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1108,
                                                columnNumber: 61
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "switch-row",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "React to cursor"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1108,
                                                        columnNumber: 109
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "switch ".concat(recipe.cursorEnabled ? "on" : ""),
                                                        onClick: ()=>change({
                                                                cursorEnabled: !recipe.cursorEnabled
                                                            }),
                                                        "aria-pressed": recipe.cursorEnabled,
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1108,
                                                            columnNumber: 303
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1108,
                                                        columnNumber: 137
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1108,
                                                columnNumber: 81
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "section-label",
                                                children: "Effect"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1108,
                                                columnNumber: 323
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "effect-grid",
                                                children: [
                                                    "push",
                                                    "repel",
                                                    "swirl",
                                                    "ripple",
                                                    "spotlight"
                                                ].map((effect)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: recipe.cursorEffect === effect ? "selected" : "",
                                                        onClick: ()=>change({
                                                                cursorEffect: effect
                                                            }),
                                                        children: effect
                                                    }, effect, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1108,
                                                        columnNumber: 482
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1108,
                                                columnNumber: 366
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Slider, {
                                                label: "Strength",
                                                value: recipe.cursorStrength,
                                                onChange: (cursorStrength)=>change({
                                                        cursorStrength
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1108,
                                                columnNumber: 638
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Slider, {
                                                label: "Radius",
                                                value: recipe.cursorRadius,
                                                min: .15,
                                                max: 1,
                                                onChange: (cursorRadius)=>change({
                                                        cursorRadius
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1108,
                                                columnNumber: 753
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "helper",
                                                children: recipe.cursorEffect === "swirl" ? "Twists the pattern around the pointer." : "Moves the shader field with the pointer."
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1108,
                                                columnNumber: 878
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "button wide ghost",
                                                onClick: ()=>change({
                                                        cursorStrength: defaultRecipe.cursorStrength,
                                                        cursorRadius: defaultRecipe.cursorRadius
                                                    }),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$refresh$2d$ccw$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__RefreshCcw$3e$__["RefreshCcw"], {}, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1108,
                                                        columnNumber: 1178
                                                    }, this),
                                                    " Reset cursor"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1108,
                                                columnNumber: 1025
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1108,
                                        columnNumber: 30
                                    }, this),
                                    tab === "mockup" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "panel-content mockup-panel",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                ref: mediaInput,
                                                className: "visually-hidden",
                                                type: "file",
                                                accept: "image/*,video/*",
                                                onChange: loadMockupMedia
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1109,
                                                columnNumber: 74
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                children: "Mockup"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1109,
                                                columnNumber: 192
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                className: "helper",
                                                children: "Place your product on the live shader scene."
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1109,
                                                columnNumber: 207
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "mockup-upload",
                                                onClick: ()=>{
                                                    var _mediaInput_current;
                                                    return (_mediaInput_current = mediaInput.current) === null || _mediaInput_current === void 0 ? void 0 : _mediaInput_current.click();
                                                },
                                                children: mockup.media && mockup.mediaType === "image" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: mockup.media,
                                                    alt: "Selected mockup media"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1109,
                                                    columnNumber: 403
                                                }, this) : mockup.media ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                                    src: mockup.media,
                                                    muted: true,
                                                    playsInline: true
                                                }, void 0, false, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1109,
                                                    columnNumber: 475
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "mockup-upload-placeholder",
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageDown$3e$__["ImageDown"], {}, void 0, false, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1109,
                                                            columnNumber: 568
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                            children: "Screenshot"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1109,
                                                            columnNumber: 581
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                            children: "Drop media or click to choose"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1109,
                                                            columnNumber: 598
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1109,
                                                    columnNumber: 524
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1109,
                                                columnNumber: 277
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "button wide ghost replace-media",
                                                onClick: ()=>{
                                                    var _mediaInput_current;
                                                    return (_mediaInput_current = mediaInput.current) === null || _mediaInput_current === void 0 ? void 0 : _mediaInput_current.click();
                                                },
                                                children: mockup.media ? "Replace media" : "Choose media"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1109,
                                                columnNumber: 659
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mockup-aspect-inline",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "section-label",
                                                        children: "Aspect ratio"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1109,
                                                        columnNumber: 851
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "aspect-ratio-grid",
                                                        children: [
                                                            "auto",
                                                            "16 / 9",
                                                            "4 / 3",
                                                            "1 / 1",
                                                            "9 / 16"
                                                        ].map((aspect)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                onClick: ()=>setMockupAspect(aspect),
                                                                className: mockupAspect === aspect ? "selected" : "",
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                        className: "aspect-symbol ".concat(aspect === "auto" ? "auto" : "ratio-".concat(aspect.replaceAll(" ", "").replace("/", "-")))
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/shader-studio.tsx",
                                                                        lineNumber: 1109,
                                                                        columnNumber: 1134
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: aspect === "auto" ? "Auto" : aspect
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/shader-studio.tsx",
                                                                        lineNumber: 1109,
                                                                        columnNumber: 1255
                                                                    }, this)
                                                                ]
                                                            }, aspect, true, {
                                                                fileName: "[project]/components/shader-studio.tsx",
                                                                lineNumber: 1109,
                                                                columnNumber: 1019
                                                            }, this))
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1109,
                                                        columnNumber: 900
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1109,
                                                columnNumber: 813
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "section-label",
                                                children: "Style"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1109,
                                                columnNumber: 1328
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mockup-style-grid",
                                                children: [
                                                    "browser",
                                                    "glass",
                                                    "border",
                                                    "inset",
                                                    "none"
                                                ].map((frame)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>updateMockup({
                                                                frame
                                                            }),
                                                        className: mockup.frame === frame ? "selected" : "",
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                className: "frame-sample ".concat(frame)
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/shader-studio.tsx",
                                                                lineNumber: 1109,
                                                                columnNumber: 1601
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: frame === "none" ? "Clean" : frame
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/shader-studio.tsx",
                                                                lineNumber: 1109,
                                                                columnNumber: 1642
                                                            }, this)
                                                        ]
                                                    }, frame, true, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1109,
                                                        columnNumber: 1488
                                                    }, this))
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1109,
                                                columnNumber: 1370
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "section-label",
                                                children: "Border"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1109,
                                                columnNumber: 1708
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mockup-segment",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>updateMockup({
                                                                radius: 0
                                                            }),
                                                        className: mockup.radius === 0 ? "selected" : "",
                                                        children: "Sharp"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1109,
                                                        columnNumber: 1783
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>updateMockup({
                                                                radius: 20
                                                            }),
                                                        className: mockup.radius === 20 ? "selected" : "",
                                                        children: "Curved"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1109,
                                                        columnNumber: 1899
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>updateMockup({
                                                                radius: 42
                                                            }),
                                                        className: mockup.radius === 42 ? "selected" : "",
                                                        children: "Round"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1109,
                                                        columnNumber: 2018
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1109,
                                                columnNumber: 1751
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Slider, {
                                                label: "Radius",
                                                value: mockup.radius,
                                                min: 0,
                                                max: 48,
                                                step: 1,
                                                onChange: (radius)=>updateMockup({
                                                        radius
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1109,
                                                columnNumber: 2142
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "section-label",
                                                children: "Shadow"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1109,
                                                columnNumber: 2263
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mockup-segment",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>updateMockup({
                                                                shadow: 0
                                                            }),
                                                        className: mockup.shadow === 0 ? "selected" : "",
                                                        children: "None"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1109,
                                                        columnNumber: 2338
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>updateMockup({
                                                                shadow: 40
                                                            }),
                                                        className: mockup.shadow === 40 ? "selected" : "",
                                                        children: "Spread"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1109,
                                                        columnNumber: 2453
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: ()=>updateMockup({
                                                                shadow: 80
                                                            }),
                                                        className: mockup.shadow === 80 ? "selected" : "",
                                                        children: "Hug"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1109,
                                                        columnNumber: 2572
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1109,
                                                columnNumber: 2306
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Slider, {
                                                label: "Opacity",
                                                value: mockup.shadow / 100,
                                                min: 0,
                                                max: 1,
                                                step: .01,
                                                unit: "%",
                                                onChange: (shadow)=>updateMockup({
                                                        shadow: shadow * 100
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1109,
                                                columnNumber: 2694
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "section-label",
                                                children: "Visibility"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1109,
                                                columnNumber: 2846
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "mockup-visibility",
                                                onClick: ()=>updateMockup({
                                                        visible: !mockup.visible
                                                    }),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$eye$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Eye$3e$__["Eye"], {}, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1109,
                                                        columnNumber: 2990
                                                    }, this),
                                                    " ",
                                                    mockup.visible ? "Hide mockup" : "Show mockup"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1109,
                                                columnNumber: 2893
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mockup-details",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "Details"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1109,
                                                        columnNumber: 3087
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                children: "Device"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/shader-studio.tsx",
                                                                lineNumber: 1109,
                                                                columnNumber: 3112
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                                                children: mockup.mediaType === "video" ? "Video" : mockup.media ? "Screenshot" : "Demo card"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/shader-studio.tsx",
                                                                lineNumber: 1109,
                                                                columnNumber: 3125
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1109,
                                                        columnNumber: 3107
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                children: "Screen pixels"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/shader-studio.tsx",
                                                                lineNumber: 1109,
                                                                columnNumber: 3229
                                                            }, this),
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                                                children: "Adapts to media"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/shader-studio.tsx",
                                                                lineNumber: 1109,
                                                                columnNumber: 3249
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1109,
                                                        columnNumber: 3224
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1109,
                                                columnNumber: 3055
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1109,
                                        columnNumber: 30
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shader-studio.tsx",
                                lineNumber: 1101,
                                columnNumber: 111
                            }, this),
                            tab === "presets" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "presets-panel",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "presets-heading",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "eyebrow",
                                                children: "PRESET LIBRARY"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1110,
                                                columnNumber: 99
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                children: "Presets"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1110,
                                                columnNumber: 146
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "App defaults and your saved shader looks, ready to remix."
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1110,
                                                columnNumber: 162
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1110,
                                        columnNumber: 66
                                    }, this),
                                    availablePresets.length ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                className: "preset-search",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$search$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Search$3e$__["Search"], {}, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1110,
                                                        columnNumber: 294
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                        value: presetSearch,
                                                        onChange: (event)=>setPresetSearch(event.target.value),
                                                        placeholder: "Search presets",
                                                        "aria-label": "Search presets"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1110,
                                                        columnNumber: 304
                                                    }, this),
                                                    presetSearch && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        type: "button",
                                                        onClick: ()=>setPresetSearch(""),
                                                        "aria-label": "Clear preset search",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {}, void 0, false, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1110,
                                                            columnNumber: 557
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1110,
                                                        columnNumber: 466
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1110,
                                                columnNumber: 261
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "preset-library",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                                        initial: false,
                                                        mode: "popLayout",
                                                        children: filteredSaved.map((item, index)=>{
                                                            var _styleNames_item_style;
                                                            return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].button, {
                                                                layout: true,
                                                                onClick: ()=>setRecipe(item),
                                                                "aria-label": "Open preset ".concat(item.name),
                                                                initial: {
                                                                    opacity: 0,
                                                                    y: 12,
                                                                    scale: .985
                                                                },
                                                                animate: {
                                                                    opacity: 1,
                                                                    y: 0,
                                                                    scale: 1
                                                                },
                                                                exit: {
                                                                    opacity: 0,
                                                                    y: -10,
                                                                    scale: .985
                                                                },
                                                                transition: {
                                                                    duration: .22,
                                                                    delay: Math.min(index * .025, .14),
                                                                    ease: [
                                                                        0.22,
                                                                        1,
                                                                        0.36,
                                                                        1
                                                                    ]
                                                                },
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SavedRecipePreview, {
                                                                        recipe: item
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/shader-studio.tsx",
                                                                        lineNumber: 1110,
                                                                        columnNumber: 1028
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: [
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                                children: item.name
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/shader-studio.tsx",
                                                                                lineNumber: 1110,
                                                                                columnNumber: 1070
                                                                            }, this),
                                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                                                                children: (_styleNames_item_style = styleNames[item.style]) !== null && _styleNames_item_style !== void 0 ? _styleNames_item_style : "Custom look"
                                                                            }, void 0, false, {
                                                                                fileName: "[project]/components/shader-studio.tsx",
                                                                                lineNumber: 1110,
                                                                                columnNumber: 1088
                                                                            }, this)
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/shader-studio.tsx",
                                                                        lineNumber: 1110,
                                                                        columnNumber: 1064
                                                                    }, this)
                                                                ]
                                                            }, item.id, true, {
                                                                fileName: "[project]/components/shader-studio.tsx",
                                                                lineNumber: 1110,
                                                                columnNumber: 698
                                                            }, this);
                                                        })
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1110,
                                                        columnNumber: 612
                                                    }, this),
                                                    !filteredSaved.length && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].p, {
                                                        className: "preset-search-empty",
                                                        initial: {
                                                            opacity: 0,
                                                            y: 6
                                                        },
                                                        animate: {
                                                            opacity: 1,
                                                            y: 0
                                                        },
                                                        children: [
                                                            "No presets match Ã¢â‚¬Å“",
                                                            presetSearch,
                                                            "Ã¢â‚¬Â."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1110,
                                                        columnNumber: 1207
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1110,
                                                columnNumber: 580
                                            }, this)
                                        ]
                                    }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "presets-empty",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "presets-empty-icon",
                                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wand$2d$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__WandSparkles$3e$__["WandSparkles"], {}, void 0, false, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1110,
                                                    columnNumber: 1448
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1110,
                                                columnNumber: 1412
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                children: "No presets yet"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1110,
                                                columnNumber: 1470
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: "Build a look in Styles, then save it here for your next project."
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1110,
                                                columnNumber: 1493
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "button primary",
                                                onClick: ()=>setTab("style"),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wand$2d$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__WandSparkles$3e$__["WandSparkles"], {}, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1110,
                                                        columnNumber: 1631
                                                    }, this),
                                                    " Explore styles"
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1110,
                                                columnNumber: 1564
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1110,
                                        columnNumber: 1381
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shader-studio.tsx",
                                lineNumber: 1110,
                                columnNumber: 35
                            }, this),
                            tab === "surface" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "surface-blur-inline",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "section-label",
                                        children: "Focus"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1110,
                                        columnNumber: 1744
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Slider, {
                                        label: "Blur",
                                        value: (_recipe_blur = recipe.blur) !== null && _recipe_blur !== void 0 ? _recipe_blur : 0,
                                        max: 20,
                                        step: .25,
                                        unit: "px",
                                        onChange: (blur)=>change({
                                                blur
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1110,
                                        columnNumber: 1786
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shader-studio.tsx",
                                lineNumber: 1110,
                                columnNumber: 1707
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "local-recipes",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "section-label",
                                        children: "Local recipes"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1110,
                                        columnNumber: 1940
                                    }, this),
                                    saved.length ? saved.slice(0, 3).map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            onClick: ()=>setRecipe(item),
                                            children: [
                                                item.name,
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$chevron$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ChevronDown$3e$__["ChevronDown"], {}, void 0, false, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1110,
                                                    columnNumber: 2103
                                                }, this)
                                            ]
                                        }, item.id, true, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1110,
                                            columnNumber: 2038
                                        }, this)) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Saved looks appear here."
                                    }, void 0, false, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1110,
                                        columnNumber: 2131
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shader-studio.tsx",
                                lineNumber: 1110,
                                columnNumber: 1909
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/components/shader-studio.tsx",
                        lineNumber: 1101,
                        columnNumber: 7
                    }, this),
                    tab === "mockup" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                ref: mockupViewportRef,
                                className: "mockup-viewport",
                                children: [
                                    editorMode === "animation" && activeClip && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "stage-target-badge",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1111,
                                                columnNumber: 162
                                            }, this),
                                            " TARGET Ã‚Â· ",
                                            activeClip.label,
                                            " Ã‚Â· ",
                                            activeClip.easing
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1111,
                                        columnNumber: 126
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        ref: mockupStageRef,
                                        className: "mockup-stage frame-".concat(mockup.frame),
                                        style: {
                                            transform: stageTransform(stageMockup),
                                            borderRadius: mockup.radius,
                                            boxShadow: "0 ".concat(18 + mockup.shadow / 3, "px ").concat(35 + mockup.shadow, "px rgba(0,0,0,").concat(.2 + mockup.shadow / 160, ")"),
                                            visibility: mockup.visible ? "visible" : "hidden"
                                        },
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "browser-bar",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1111,
                                                        columnNumber: 573
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1111,
                                                        columnNumber: 578
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1111,
                                                        columnNumber: 583
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "your-product.com"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1111,
                                                        columnNumber: 588
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1111,
                                                columnNumber: 544
                                            }, this),
                                            mockup.media && mockup.mediaType === "video" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("video", {
                                                src: mockup.media,
                                                autoPlay: true,
                                                muted: true,
                                                loop: true,
                                                playsInline: true
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1111,
                                                columnNumber: 671
                                            }, this) : mockup.media ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                src: mockup.media,
                                                alt: "Mockup preview"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1111,
                                                columnNumber: 749
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "mockup-demo",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        children: "THE NEXT RELEASE"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1111,
                                                        columnNumber: 828
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                        children: [
                                                            "Make the work",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("br", {}, void 0, false, {
                                                                fileName: "[project]/components/shader-studio.tsx",
                                                                lineNumber: 1111,
                                                                columnNumber: 874
                                                            }, this),
                                                            "feel inevitable."
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1111,
                                                        columnNumber: 857
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: "Your product, framed by a live visual system."
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1111,
                                                        columnNumber: 901
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                        children: [
                                                            "Explore release notes ",
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                children: "Ã¢â€ â€”"
                                                            }, void 0, false, {
                                                                fileName: "[project]/components/shader-studio.tsx",
                                                                lineNumber: 1111,
                                                                columnNumber: 978
                                                            }, this)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1111,
                                                        columnNumber: 953
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1111,
                                                columnNumber: 799
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1111,
                                        columnNumber: 230
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shader-studio.tsx",
                                lineNumber: 1111,
                                columnNumber: 24
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                                className: "camera-inspector",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "camera-tabs",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: cameraMode === "zoom" ? "active" : "",
                                                onClick: ()=>setCameraMode("zoom"),
                                                children: "Zoom"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1111,
                                                columnNumber: 1087
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: cameraMode === "tilt" ? "active" : "",
                                                onClick: ()=>setCameraMode("tilt"),
                                                children: "Tilt"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1111,
                                                columnNumber: 1196
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1111,
                                        columnNumber: 1058
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        ref: cameraPadRef,
                                        className: "camera-pad ".concat(cameraMode === "tilt" ? "tilt-preview" : "zoom-preview"),
                                        onPointerDown: moveCamera,
                                        onPointerMove: (event)=>event.buttons === 1 && moveCamera(event),
                                        role: "application",
                                        "aria-label": "Camera positioning pad",
                                        children: [
                                            cameraMode === "zoom" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CameraPadScene, {
                                                recipe: recipe,
                                                mockup: mockup,
                                                geometry: cameraGeometry,
                                                camera: mockup
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1111,
                                                columnNumber: 1595
                                            }, this),
                                            cameraMode === "tilt" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "camera-pad-card",
                                                style: {
                                                    transform: "translate(-50%, -50%) perspective(280px) rotateX(".concat(mockup.tiltX, "deg) rotateY(").concat(mockup.tiltY, "deg) rotateZ(").concat(mockup.rotate, "deg) scale(").concat(.65 + mockup.scale * .18, ")")
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1111,
                                                columnNumber: 1714
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "camera-cross horizontal"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1111,
                                                columnNumber: 1936
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "camera-cross vertical"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1111,
                                                columnNumber: 1980
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: "camera-handle",
                                                style: {
                                                    left: "".concat(cameraMode === "zoom" ? getCameraFrame(mockup, cameraGeometry).cropCenterX : 50 + Math.max(-45, Math.min(45, mockup.tiltY)) * 1.1).concat(cameraMode === "zoom" ? "px" : "%"),
                                                    top: "".concat(cameraMode === "zoom" ? getCameraFrame(mockup, cameraGeometry).cropCenterY : 50 - Math.max(-45, Math.min(45, mockup.tiltX)) * 1.1).concat(cameraMode === "zoom" ? "px" : "%")
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1111,
                                                columnNumber: 2022
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "tilt-preview-label",
                                                children: "Tilt preview"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1111,
                                                columnNumber: 2421
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1111,
                                        columnNumber: 1311
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Slider, {
                                        label: cameraMode === "zoom" ? "Zoom" : "Tilt",
                                        value: cameraMode === "zoom" ? mockup.scale : mockup.tiltY,
                                        min: cameraMode === "zoom" ? .45 : -12,
                                        max: cameraMode === "zoom" ? 4 : 12,
                                        step: .01,
                                        unit: cameraMode === "zoom" ? "Ãƒâ€”" : "Ã‚Â°",
                                        onChange: (value)=>updateMockup(cameraMode === "zoom" ? {
                                                scale: value
                                            } : {
                                                tiltY: value
                                            })
                                    }, void 0, false, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1111,
                                        columnNumber: 2483
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "section-label camera-label",
                                        children: "Camera presets"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1111,
                                        columnNumber: 2833
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "layout-presets",
                                        children: mockupPresets.map((preset)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: _s(()=>{
                                                    _s();
                                                    return useMockupPreset(preset);
                                                }, "YDky+F8JV6FDlKttkZHn8xYFCW0=", false, function() {
                                                    return [
                                                        useMockupPreset
                                                    ];
                                                }),
                                                className: "layout-preset ".concat(preset.id),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "layout-backdrop"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1111,
                                                        columnNumber: 3065
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        style: {
                                                            transform: "translate(".concat(preset.settings.cameraX * .35, "%, ").concat(preset.settings.cameraY * .35, "%) rotate(").concat(preset.settings.rotate, "deg) scale(").concat(preset.settings.scale, ")")
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1111,
                                                        columnNumber: 3101
                                                    }, this),
                                                    preset.id === "hero" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                        children: "Full view"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1111,
                                                        columnNumber: 3305
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                                        children: preset.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1111,
                                                        columnNumber: 3322
                                                    }, this)
                                                ]
                                            }, preset.id, true, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1111,
                                                columnNumber: 2960
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1111,
                                        columnNumber: 2897
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shader-studio.tsx",
                                lineNumber: 1111,
                                columnNumber: 1022
                            }, this)
                        ]
                    }, void 0, true),
                    tab === "mockup" && editorMode === "animation" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                                className: "motion-inspector",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "motion-header",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "eyebrow",
                                                        children: "SELECTED ANIMATION"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1114,
                                                        columnNumber: 47
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                                        children: (_activeClip_label = activeClip === null || activeClip === void 0 ? void 0 : activeClip.label) !== null && _activeClip_label !== void 0 ? _activeClip_label : "Animation"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1114,
                                                        columnNumber: 98
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                        children: "Choose its destination, then fine-tune it."
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1114,
                                                        columnNumber: 141
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1114,
                                                columnNumber: 42
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "motion-header-actions",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "duplicate-animation",
                                                        onClick: duplicateActiveClip,
                                                        title: "Duplicate animation",
                                                        "aria-label": "Duplicate animation",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {}, void 0, false, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1114,
                                                            columnNumber: 366
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1114,
                                                        columnNumber: 235
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        onClick: selectBaseMedia,
                                                        children: "Edit base"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1114,
                                                        columnNumber: 383
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1114,
                                                columnNumber: 196
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1114,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Slider, {
                                        label: "Transition",
                                        value: (_activeClip_transition = activeClip === null || activeClip === void 0 ? void 0 : activeClip.transition) !== null && _activeClip_transition !== void 0 ? _activeClip_transition : animationTransition,
                                        min: .12,
                                        max: (_activeClip_duration = activeClip === null || activeClip === void 0 ? void 0 : activeClip.duration) !== null && _activeClip_duration !== void 0 ? _activeClip_duration : baseDuration,
                                        step: .1,
                                        unit: "s",
                                        onChange: (transition)=>{
                                            if (!activeClip) return;
                                            const updated = {
                                                ...activeClip,
                                                transition: Math.min(transition, activeClip.duration - .18)
                                            };
                                            setAnimationTransition(updated.transition);
                                            setAnimationClips((clips)=>clips.map((clip)=>clip.id === activeClipId ? updated : clip));
                                            seekToClipTarget(updated);
                                        },
                                        trailing: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            type: "button",
                                            className: "curve-toggle ".concat((_activeClip_easing = activeClip === null || activeClip === void 0 ? void 0 : activeClip.easing) !== null && _activeClip_easing !== void 0 ? _activeClip_easing : animationEasing),
                                            "aria-label": "Switch to ".concat((activeClip === null || activeClip === void 0 ? void 0 : activeClip.easing) === "spring" ? "ease" : "spring", " curve"),
                                            title: (activeClip === null || activeClip === void 0 ? void 0 : activeClip.easing) === "spring" ? "Spring curve Ã¢â‚¬â€ click for ease" : "Ease curve Ã¢â‚¬â€ click for spring",
                                            onClick: (event)=>{
                                                event.preventDefault();
                                                if (!activeClip) return;
                                                const easing = activeClip.easing === "spring" ? "ease" : "spring";
                                                const updated = {
                                                    ...activeClip,
                                                    easing
                                                };
                                                setAnimationEasing(easing);
                                                setAnimationClips((clips)=>clips.map((clip)=>clip.id === activeClipId ? updated : clip));
                                                seekToClipTarget(updated);
                                                setToast("".concat(easing === "spring" ? "Spring" : "Ease", " motion applied"));
                                            },
                                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                "aria-hidden": "true"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1115,
                                                columnNumber: 1211
                                            }, void 0)
                                        }, void 0, false, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1115,
                                            columnNumber: 491
                                        }, void 0)
                                    }, void 0, false, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1115,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "motion-exit-control",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "After this animation"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1116,
                                                columnNumber: 48
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: (activeClip === null || activeClip === void 0 ? void 0 : activeClip.exit) === "base" ? "active" : "",
                                                        onClick: ()=>activeClip && setAnimationClips((clips)=>clips.map((clip)=>clip.id === activeClip.id ? {
                                                                        ...clip,
                                                                        exit: "base"
                                                                    } : clip)),
                                                        children: "Return to base"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1116,
                                                        columnNumber: 86
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        disabled: !activeClip || !nextClip,
                                                        className: (activeClip === null || activeClip === void 0 ? void 0 : activeClip.exit) === "next" ? "active" : "",
                                                        onClick: ()=>{
                                                            if (!activeClip || !nextClip) return;
                                                            const nextStart = activeClip.start + activeClip.duration;
                                                            setAnimationClips((clips)=>clips.map((clip)=>clip.id === activeClip.id ? {
                                                                        ...clip,
                                                                        exit: "next"
                                                                    } : clip.id === nextClip.id ? {
                                                                        ...clip,
                                                                        start: nextStart
                                                                    } : clip));
                                                            setToast("Flows into ".concat(nextClip.label));
                                                        },
                                                        children: "Continue to next"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1116,
                                                        columnNumber: 315
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1116,
                                                columnNumber: 81
                                            }, this),
                                            nextClip ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                children: [
                                                    "Flows into ",
                                                    nextClip.label,
                                                    " instead of returning to base."
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1116,
                                                columnNumber: 787
                                            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                children: "Add another animation to create a continuation."
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1116,
                                                columnNumber: 862
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1116,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "camera-tabs",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: cameraMode === "zoom" ? "active" : "",
                                                onClick: ()=>setCameraMode("zoom"),
                                                children: "Zoom"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1117,
                                                columnNumber: 40
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: cameraMode === "tilt" ? "active" : "",
                                                onClick: ()=>setCameraMode("tilt"),
                                                children: "Tilt"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1117,
                                                columnNumber: 149
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                className: "precision-toggle",
                                                onClick: ()=>setPrecisionOpen((value)=>!value),
                                                children: precisionOpen ? "Simple" : "Precision"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1117,
                                                columnNumber: 258
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1117,
                                        columnNumber: 11
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        ref: cameraPadRef,
                                        className: "camera-pad animation-camera-pad ".concat(cameraMode === "tilt" ? "tilt-preview" : "zoom-preview"),
                                        onPointerDown: moveAnimationCamera,
                                        onPointerMove: (event)=>event.buttons === 1 && moveAnimationCamera(event),
                                        role: "application",
                                        "aria-label": "Animation destination camera pad",
                                        children: [
                                            cameraMode === "zoom" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(CameraPadScene, {
                                                recipe: recipe,
                                                mockup: mockup,
                                                geometry: cameraGeometry,
                                                camera: {
                                                    ...mockup,
                                                    scale: activeTargetScale,
                                                    x: (_activeClip_targetX = activeClip === null || activeClip === void 0 ? void 0 : activeClip.targetX) !== null && _activeClip_targetX !== void 0 ? _activeClip_targetX : mockup.x,
                                                    y: (_activeClip_targetY = activeClip === null || activeClip === void 0 ? void 0 : activeClip.targetY) !== null && _activeClip_targetY !== void 0 ? _activeClip_targetY : mockup.y,
                                                    rotate: (_activeClip_targetRotate = activeClip === null || activeClip === void 0 ? void 0 : activeClip.targetRotate) !== null && _activeClip_targetRotate !== void 0 ? _activeClip_targetRotate : mockup.rotate,
                                                    cameraX: (_activeClip_cameraX = activeClip === null || activeClip === void 0 ? void 0 : activeClip.cameraX) !== null && _activeClip_cameraX !== void 0 ? _activeClip_cameraX : 0,
                                                    cameraY: (_activeClip_cameraY = activeClip === null || activeClip === void 0 ? void 0 : activeClip.cameraY) !== null && _activeClip_cameraY !== void 0 ? _activeClip_cameraY : 0
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1118,
                                                columnNumber: 334
                                            }, this),
                                            cameraMode === "tilt" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "camera-pad-card",
                                                style: {
                                                    transform: "translate(-50%, -50%) perspective(280px) rotateX(".concat(((_activeClip_targetTiltX = activeClip === null || activeClip === void 0 ? void 0 : activeClip.targetTiltX) !== null && _activeClip_targetTiltX !== void 0 ? _activeClip_targetTiltX : 0) + focusTilt, "deg) rotateY(").concat((_activeClip_targetTiltY = activeClip === null || activeClip === void 0 ? void 0 : activeClip.targetTiltY) !== null && _activeClip_targetTiltY !== void 0 ? _activeClip_targetTiltY : 0, "deg) rotateZ(").concat((_activeClip_targetRotate1 = activeClip === null || activeClip === void 0 ? void 0 : activeClip.targetRotate) !== null && _activeClip_targetRotate1 !== void 0 ? _activeClip_targetRotate1 : 0, "deg) scale(").concat(.65 + activeTargetScale * .18, ")")
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1118,
                                                columnNumber: 679
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "camera-cross horizontal"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1118,
                                                columnNumber: 968
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "camera-cross vertical"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1118,
                                                columnNumber: 1012
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                className: "camera-handle",
                                                style: {
                                                    left: "".concat(cameraMode === "zoom" ? getCameraFrame({
                                                        scale: activeTargetScale,
                                                        cameraX: (_activeClip_cameraX1 = activeClip === null || activeClip === void 0 ? void 0 : activeClip.cameraX) !== null && _activeClip_cameraX1 !== void 0 ? _activeClip_cameraX1 : 0,
                                                        cameraY: (_activeClip_cameraY1 = activeClip === null || activeClip === void 0 ? void 0 : activeClip.cameraY) !== null && _activeClip_cameraY1 !== void 0 ? _activeClip_cameraY1 : 0
                                                    }, cameraGeometry).cropCenterX : 50 + Math.max(-45, Math.min(45, (_activeClip_targetTiltY1 = activeClip === null || activeClip === void 0 ? void 0 : activeClip.targetTiltY) !== null && _activeClip_targetTiltY1 !== void 0 ? _activeClip_targetTiltY1 : 0)) * 1.1).concat(cameraMode === "zoom" ? "px" : "%"),
                                                    top: "".concat(cameraMode === "zoom" ? getCameraFrame({
                                                        scale: activeTargetScale,
                                                        cameraX: (_activeClip_cameraX2 = activeClip === null || activeClip === void 0 ? void 0 : activeClip.cameraX) !== null && _activeClip_cameraX2 !== void 0 ? _activeClip_cameraX2 : 0,
                                                        cameraY: (_activeClip_cameraY2 = activeClip === null || activeClip === void 0 ? void 0 : activeClip.cameraY) !== null && _activeClip_cameraY2 !== void 0 ? _activeClip_cameraY2 : 0
                                                    }, cameraGeometry).cropCenterY : 50 - Math.max(-45, Math.min(45, ((_activeClip_targetTiltX1 = activeClip === null || activeClip === void 0 ? void 0 : activeClip.targetTiltX) !== null && _activeClip_targetTiltX1 !== void 0 ? _activeClip_targetTiltX1 : 0) + focusTilt)) * 1.1).concat(cameraMode === "zoom" ? "px" : "%")
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1118,
                                                columnNumber: 1054
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "tilt-preview-label",
                                                children: "Tilt preview"
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1118,
                                                columnNumber: 1683
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1118,
                                        columnNumber: 1
                                    }, this),
                                    cameraMode === "zoom" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Slider, {
                                        label: "Zoom",
                                        value: focusZoom,
                                        min: .45,
                                        max: 4,
                                        step: .01,
                                        unit: "Ãƒâ€”",
                                        onChange: (value)=>{
                                            if (!activeClip) return;
                                            const updated = {
                                                ...activeClip,
                                                zoom: value
                                            };
                                            setFocusZoom(value);
                                            setAnimationClips((clips)=>clips.map((clip)=>clip.id === activeClipId ? updated : clip));
                                            seekToClipTarget(updated);
                                        }
                                    }, void 0, false, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1119,
                                        columnNumber: 36
                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Slider, {
                                                label: "Tilt X",
                                                value: ((_activeClip_targetTiltX2 = activeClip === null || activeClip === void 0 ? void 0 : activeClip.targetTiltX) !== null && _activeClip_targetTiltX2 !== void 0 ? _activeClip_targetTiltX2 : 0) + focusTilt,
                                                min: -45,
                                                max: 45,
                                                step: 1,
                                                unit: "Ã‚Â°",
                                                onChange: (value)=>{
                                                    if (!activeClip) return;
                                                    const updated = {
                                                        ...activeClip,
                                                        targetTiltX: value,
                                                        tilt: 0
                                                    };
                                                    setFocusTilt(0);
                                                    setAnimationClips((clips)=>clips.map((clip)=>clip.id === activeClipId ? updated : clip));
                                                    seekToClipTarget(updated);
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1119,
                                                columnNumber: 365
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Slider, {
                                                label: "Tilt Y",
                                                value: (_activeClip_targetTiltY2 = activeClip === null || activeClip === void 0 ? void 0 : activeClip.targetTiltY) !== null && _activeClip_targetTiltY2 !== void 0 ? _activeClip_targetTiltY2 : 0,
                                                min: -45,
                                                max: 45,
                                                step: 1,
                                                unit: "Ã‚Â°",
                                                onChange: (value)=>{
                                                    if (!activeClip) return;
                                                    const updated = {
                                                        ...activeClip,
                                                        targetTiltY: value
                                                    };
                                                    setAnimationClips((clips)=>clips.map((clip)=>clip.id === activeClipId ? updated : clip));
                                                    seekToClipTarget(updated);
                                                }
                                            }, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1119,
                                                columnNumber: 734
                                            }, this)
                                        ]
                                    }, void 0, true),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                        children: precisionOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].div, {
                                            className: "precision-controls",
                                            initial: {
                                                opacity: 0,
                                                height: 0
                                            },
                                            animate: {
                                                opacity: 1,
                                                height: "auto"
                                            },
                                            exit: {
                                                opacity: 0,
                                                height: 0
                                            },
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Slider, {
                                                    label: "Hold",
                                                    value: animationHold,
                                                    min: 0,
                                                    max: Math.min(3, ((_activeClip_duration1 = activeClip === null || activeClip === void 0 ? void 0 : activeClip.duration) !== null && _activeClip_duration1 !== void 0 ? _activeClip_duration1 : animationDuration) * .3),
                                                    step: .1,
                                                    unit: "s",
                                                    onChange: (hold)=>{
                                                        if (!activeClip) return;
                                                        const updated = {
                                                            ...activeClip,
                                                            hold
                                                        };
                                                        setAnimationHold(hold);
                                                        setAnimationClips((clips)=>clips.map((clip)=>clip.id === activeClipId ? updated : clip));
                                                        seekToClipTarget(updated);
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1120,
                                                    columnNumber: 189
                                                }, this),
                                                (activeClip === null || activeClip === void 0 ? void 0 : activeClip.easing) === "spring" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Slider, {
                                                    label: "Spring speed",
                                                    value: springSpeed,
                                                    min: .3,
                                                    max: 2,
                                                    step: .1,
                                                    unit: "Ãƒâ€”",
                                                    onChange: (speed)=>{
                                                        if (!activeClip) return;
                                                        const updated = {
                                                            ...activeClip,
                                                            springSpeed: speed
                                                        };
                                                        setSpringSpeed(speed);
                                                        setAnimationClips((clips)=>clips.map((clip)=>clip.id === activeClipId ? updated : clip));
                                                        seekToClipTarget(updated);
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1120,
                                                    columnNumber: 601
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1120,
                                            columnNumber: 36
                                        }, this)
                                    }, void 0, false, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1120,
                                        columnNumber: 1
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "section-label camera-label",
                                        children: "Destination preset"
                                    }, void 0, false, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1121,
                                        columnNumber: 1
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "layout-presets",
                                        children: mockupPresets.map((preset)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                onClick: ()=>{
                                                    if (!activeClip) return;
                                                    const updated = {
                                                        ...activeClip,
                                                        presetId: preset.id,
                                                        label: cameraMode === "tilt" ? "Tilt" : "Zoom",
                                                        targetX: activeClip.targetX,
                                                        targetY: activeClip.targetY,
                                                        targetTiltX: preset.settings.tiltX,
                                                        targetTiltY: preset.settings.tiltY,
                                                        targetRotate: preset.settings.rotate,
                                                        cameraX: preset.settings.cameraX,
                                                        cameraY: preset.settings.cameraY
                                                    };
                                                    setFocusPresetId(preset.id);
                                                    setAnimationClips((clips)=>clips.map((clip)=>clip.id === activeClipId ? updated : clip));
                                                    seekToClipTarget(updated);
                                                },
                                                className: "layout-preset ".concat(preset.id, " ").concat(focusPresetId === preset.id ? "selected" : ""),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "layout-backdrop"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1121,
                                                        columnNumber: 781
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                        style: {
                                                            transform: "translate(".concat(preset.settings.cameraX * .35, "%, ").concat(preset.settings.cameraY * .35, "%) rotate(").concat(preset.settings.rotate, "deg) scale(").concat(preset.settings.scale, ")")
                                                        }
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1121,
                                                        columnNumber: 817
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("em", {
                                                        children: preset.id === basePresetId ? "Same as base" : preset.label
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1121,
                                                        columnNumber: 996
                                                    }, this)
                                                ]
                                            }, preset.id, true, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1121,
                                                columnNumber: 132
                                            }, this))
                                    }, void 0, false, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1121,
                                        columnNumber: 69
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/components/shader-studio.tsx",
                                lineNumber: 1113,
                                columnNumber: 10
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$components$2f$AnimatePresence$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["AnimatePresence"], {
                                children: editorMode === "animation" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$framer$2d$motion$2f$dist$2f$es$2f$render$2f$components$2f$motion$2f$proxy$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["motion"].section, {
                                    className: "timeline-composer",
                                    initial: {
                                        y: 36,
                                        opacity: 0
                                    },
                                    animate: {
                                        y: 0,
                                        opacity: 1
                                    },
                                    exit: {
                                        y: 36,
                                        opacity: 0
                                    },
                                    transition: {
                                        type: "spring",
                                        stiffness: 280,
                                        damping: 28
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "composer-toolbar",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "timeline-back",
                                                    onClick: selectBaseMedia,
                                                    children: "Edit mockup"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1125,
                                                    columnNumber: 47
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "composer-add",
                                                    onClick: addAnimationClip,
                                                    children: "+ Add animation"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1125,
                                                    columnNumber: 127
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "timeline-play",
                                                    onClick: playMotionPreview,
                                                    "aria-label": isTimelinePlaying ? "Pause timeline" : "Play timeline",
                                                    children: isTimelinePlaying ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__["Pause"], {}, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1125,
                                                        columnNumber: 362
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {}, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1125,
                                                        columnNumber: 374
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1125,
                                                    columnNumber: 211
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "timeline-time",
                                                    children: [
                                                        Math.floor(playhead / 60),
                                                        ":",
                                                        (playhead % 60).toFixed(1).padStart(4, "0"),
                                                        " / ",
                                                        baseDuration.toFixed(1),
                                                        "s"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1125,
                                                    columnNumber: 392
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "timeline-export",
                                                    onClick: ()=>{
                                                        setExportTab("video");
                                                        setExportOpen(true);
                                                    },
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__["Video"], {}, void 0, false, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1125,
                                                            columnNumber: 633
                                                        }, this),
                                                        " Export 1080p"
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1125,
                                                    columnNumber: 533
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1125,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "composer-ruler",
                                            onPointerDown: seekTimeline,
                                            children: Array.from({
                                                length: baseDuration + 1
                                            }, (_, index)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    style: {
                                                        left: "".concat(index / baseDuration * 100, "%")
                                                    },
                                                    children: index === 0 ? "0:00" : "0:0".concat(index)
                                                }, index, false, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1126,
                                                    columnNumber: 130
                                                }, this))
                                        }, void 0, false, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1126,
                                            columnNumber: 13
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "composer-lanes",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "composer-lane-label",
                                                    children: "Animations"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1127,
                                                    columnNumber: 33
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    ref: animationTrackRef,
                                                    className: "composer-track animation-lane",
                                                    onPointerDown: seekTimeline,
                                                    children: [
                                                        animationClips.map((clip)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                                className: "composer-clip ".concat(activeClipId === clip.id ? "active" : ""),
                                                                style: {
                                                                    left: "".concat(clip.start / baseDuration * 100, "%"),
                                                                    width: "".concat(clip.duration / baseDuration * 100, "%")
                                                                },
                                                                onClick: ()=>selectAnimationClip(clip),
                                                                onPointerDown: (event)=>beginClipGesture(event, clip, "move"),
                                                                children: [
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "clip-handle clip-handle-left",
                                                                        "data-drag": "move"
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/shader-studio.tsx",
                                                                        lineNumber: 1127,
                                                                        columnNumber: 522
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        children: clip.label
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/shader-studio.tsx",
                                                                        lineNumber: 1127,
                                                                        columnNumber: 588
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                                        children: [
                                                                            clip.duration.toFixed(1),
                                                                            "s"
                                                                        ]
                                                                    }, void 0, true, {
                                                                        fileName: "[project]/components/shader-studio.tsx",
                                                                        lineNumber: 1127,
                                                                        columnNumber: 613
                                                                    }, this),
                                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                        className: "clip-handle clip-handle-right",
                                                                        "data-drag": "resize",
                                                                        onPointerDown: (event)=>beginClipGesture(event, clip, "resize")
                                                                    }, void 0, false, {
                                                                        fileName: "[project]/components/shader-studio.tsx",
                                                                        lineNumber: 1127,
                                                                        columnNumber: 655
                                                                    }, this)
                                                                ]
                                                            }, clip.id, true, {
                                                                fileName: "[project]/components/shader-studio.tsx",
                                                                lineNumber: 1127,
                                                                columnNumber: 216
                                                            }, this)),
                                                        orderedClips.map((clip, index)=>{
                                                            const next = orderedClips[index + 1];
                                                            return clip.exit === "next" && next && Math.abs(clip.start + clip.duration - next.start) < .11 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                                className: "clip-link",
                                                                style: {
                                                                    left: "".concat((clip.start + clip.duration) / baseDuration * 100, "%"),
                                                                    width: "14px"
                                                                }
                                                            }, "".concat(clip.id, "-link"), false, {
                                                                fileName: "[project]/components/shader-studio.tsx",
                                                                lineNumber: 1127,
                                                                columnNumber: 974
                                                            }, this) : null;
                                                        }),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "composer-plus",
                                                            onClick: addAnimationClip,
                                                            children: "+"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1127,
                                                            columnNumber: 1126
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            className: "timeline-playhead",
                                                            style: {
                                                                left: "".concat(playhead / baseDuration * 100, "%")
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1127,
                                                            columnNumber: 1197
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1127,
                                                    columnNumber: 86
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "composer-lane-label media-label",
                                                    children: "Base media"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1127,
                                                    columnNumber: 1292
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "composer-track media-lane",
                                                    onPointerDown: seekTimeline,
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            type: "button",
                                                            "aria-pressed": activeClipId === null,
                                                            className: "base-media-clip",
                                                            onPointerDown: (event)=>{
                                                                event.stopPropagation();
                                                                selectBaseMedia();
                                                            },
                                                            onClick: selectBaseMedia,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                                                                    fileName: "[project]/components/shader-studio.tsx",
                                                                    lineNumber: 1127,
                                                                    columnNumber: 1617
                                                                }, this),
                                                                "Mockup ",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                                    children: [
                                                                        mockup.media ? "Screenshot" : "Demo media",
                                                                        " Ã‚Â· ",
                                                                        baseDuration.toFixed(1),
                                                                        "s"
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/shader-studio.tsx",
                                                                    lineNumber: 1127,
                                                                    columnNumber: 1629
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                                    children: "Edit mockup"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/shader-studio.tsx",
                                                                    lineNumber: 1127,
                                                                    columnNumber: 1712
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1127,
                                                            columnNumber: 1429
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {
                                                            className: "timeline-playhead",
                                                            style: {
                                                                left: "".concat(playhead / baseDuration * 100, "%")
                                                            }
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1127,
                                                            columnNumber: 1745
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1127,
                                                    columnNumber: 1357
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1127,
                                            columnNumber: 1
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/shader-studio.tsx",
                                    lineNumber: 1124,
                                    columnNumber: 42
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/components/shader-studio.tsx",
                                lineNumber: 1123,
                                columnNumber: 9
                            }, this)
                        ]
                    }, void 0, true),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "canvas-area",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "canvas-frame",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ShaderCanvas, {
                                    recipe: recipe,
                                    paused: paused,
                                    onError: setError
                                }, void 0, false, {
                                    fileName: "[project]/components/shader-studio.tsx",
                                    lineNumber: 1131,
                                    columnNumber: 70
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "canvas-meta",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "live-dot"
                                        }, void 0, false, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1131,
                                            columnNumber: 166
                                        }, this),
                                        " LIVE ",
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                            children: activeLabel
                                        }, void 0, false, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1131,
                                            columnNumber: 201
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/shader-studio.tsx",
                                    lineNumber: 1131,
                                    columnNumber: 137
                                }, this),
                                error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "canvas-error",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$help$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleHelp$3e$__["CircleHelp"], {}, void 0, false, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1131,
                                            columnNumber: 267
                                        }, this),
                                        " Shader error Ã¢â‚¬â€ open Code to repair it."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/shader-studio.tsx",
                                    lineNumber: 1131,
                                    columnNumber: 237
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "canvas-dock",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            "data-tooltip": "Create a completely new shader recipe",
                                            onClick: inspire,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$circle$2d$help$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__CircleHelp$3e$__["CircleHelp"], {}, void 0, false, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1131,
                                                    columnNumber: 442
                                                }, this),
                                                " Inspire"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1131,
                                            columnNumber: 363
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            "data-tooltip": "Keep the style and settings; choose new colours",
                                            onClick: recolour,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$droplets$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Droplets$3e$__["Droplets"], {}, void 0, false, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1131,
                                                    columnNumber: 563
                                                }, this),
                                                " Recolour"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1131,
                                            columnNumber: 473
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            "data-tooltip": "Keep the style and colours; replace only the settings",
                                            onClick: remix,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wand$2d$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__WandSparkles$3e$__["WandSparkles"], {}, void 0, false, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1131,
                                                    columnNumber: 686
                                                }, this),
                                                " Remix"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1131,
                                            columnNumber: 593
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            "data-tooltip": "Choose a new shader style while keeping the palette",
                                            onClick: restyle,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$wand$2d$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__WandSparkles$3e$__["WandSparkles"], {}, void 0, false, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1131,
                                                    columnNumber: 810
                                                }, this),
                                                " Restyle"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1131,
                                            columnNumber: 717
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            "data-tooltip": paused ? "Resume the live preview" : "Pause the live preview",
                                            onClick: ()=>setPaused((value)=>!value),
                                            children: [
                                                paused ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$play$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Play$3e$__["Play"], {}, void 0, false, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1131,
                                                    columnNumber: 983
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$pause$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Pause$3e$__["Pause"], {}, void 0, false, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1131,
                                                    columnNumber: 994
                                                }, this),
                                                paused ? "Play" : "Pause"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1131,
                                            columnNumber: 843
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/shader-studio.tsx",
                                    lineNumber: 1131,
                                    columnNumber: 334
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/shader-studio.tsx",
                            lineNumber: 1131,
                            columnNumber: 40
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/components/shader-studio.tsx",
                        lineNumber: 1131,
                        columnNumber: 7
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/components/shader-studio.tsx",
                lineNumber: 1099,
                columnNumber: 5
            }, this),
            saveOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "modal-backdrop",
                role: "presentation",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "save-modal",
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-labelledby": "save-title",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "close",
                            onClick: ()=>setSaveOpen(false),
                            "aria-label": "Close",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {}, void 0, false, {
                                fileName: "[project]/components/shader-studio.tsx",
                                lineNumber: 1133,
                                columnNumber: 239
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/shader-studio.tsx",
                            lineNumber: 1133,
                            columnNumber: 159
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$sparkles$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Sparkles$3e$__["Sparkles"], {}, void 0, false, {
                            fileName: "[project]/components/shader-studio.tsx",
                            lineNumber: 1133,
                            columnNumber: 253
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            id: "save-title",
                            children: "Save recipe"
                        }, void 0, false, {
                            fileName: "[project]/components/shader-studio.tsx",
                            lineNumber: 1133,
                            columnNumber: 265
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            children: "Keep this shader configuration in this browser for later remixing."
                        }, void 0, false, {
                            fileName: "[project]/components/shader-studio.tsx",
                            lineNumber: 1133,
                            columnNumber: 301
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                            autoFocus: true,
                            value: saveName,
                            onChange: (event)=>setSaveName(event.target.value),
                            onKeyDown: (event)=>event.key === "Enter" && save()
                        }, void 0, false, {
                            fileName: "[project]/components/shader-studio.tsx",
                            lineNumber: 1133,
                            columnNumber: 374
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "button primary wide",
                            onClick: save,
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$save$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Save$3e$__["Save"], {}, void 0, false, {
                                    fileName: "[project]/components/shader-studio.tsx",
                                    lineNumber: 1133,
                                    columnNumber: 574
                                }, this),
                                " Save locally"
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/shader-studio.tsx",
                            lineNumber: 1133,
                            columnNumber: 519
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/shader-studio.tsx",
                    lineNumber: 1133,
                    columnNumber: 70
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shader-studio.tsx",
                lineNumber: 1133,
                columnNumber: 18
            }, this),
            exportOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "modal-backdrop",
                role: "presentation",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "export-modal",
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-labelledby": "export-title",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "close",
                            onClick: ()=>setExportOpen(false),
                            "aria-label": "Close",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {}, void 0, false, {
                                fileName: "[project]/components/shader-studio.tsx",
                                lineNumber: 1134,
                                columnNumber: 247
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/shader-studio.tsx",
                            lineNumber: 1134,
                            columnNumber: 165
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "export-header",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "eyebrow",
                                            children: "READY TO SHIP"
                                        }, void 0, false, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1134,
                                            columnNumber: 297
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            id: "export-title",
                                            children: "Export shader"
                                        }, void 0, false, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1134,
                                            columnNumber: 343
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: "Take the current look into your project in the format you need."
                                        }, void 0, false, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1134,
                                            columnNumber: 383
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/shader-studio.tsx",
                                    lineNumber: 1134,
                                    columnNumber: 292
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageDown$3e$__["ImageDown"], {}, void 0, false, {
                                    fileName: "[project]/components/shader-studio.tsx",
                                    lineNumber: 1134,
                                    columnNumber: 459
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/shader-studio.tsx",
                            lineNumber: 1134,
                            columnNumber: 261
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "export-tabs",
                            role: "tablist",
                            children: [
                                "image",
                                "video",
                                "prompt",
                                "react",
                                "glsl"
                            ].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: exportTab === item ? "active" : "",
                                    onClick: ()=>setExportTab(item),
                                    role: "tab",
                                    "aria-selected": exportTab === item,
                                    children: item === "image" ? "Image" : item === "video" ? "Animation" : item === "prompt" ? "Prompt" : item === "react" ? "React code" : "GLSL"
                                }, item, false, {
                                    fileName: "[project]/components/shader-studio.tsx",
                                    lineNumber: 1134,
                                    columnNumber: 600
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/components/shader-studio.tsx",
                            lineNumber: 1134,
                            columnNumber: 478
                        }, this),
                        exportTab === "image" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "export-image",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "export-preview",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ShaderCanvas, {
                                        recipe: recipe,
                                        paused: false,
                                        onError: ()=>undefined
                                    }, void 0, false, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1134,
                                        columnNumber: 987
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/shader-studio.tsx",
                                    lineNumber: 1134,
                                    columnNumber: 955
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            children: "High-resolution PNG"
                                        }, void 0, false, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1134,
                                            columnNumber: 1071
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: "Captures the current shader exactly as it appears in the live renderer."
                                        }, void 0, false, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1134,
                                            columnNumber: 1099
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "button primary wide",
                                            onClick: exportPng,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageDown$3e$__["ImageDown"], {}, void 0, false, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1134,
                                                    columnNumber: 1237
                                                }, this),
                                                " Download PNG"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1134,
                                            columnNumber: 1177
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/shader-studio.tsx",
                                    lineNumber: 1134,
                                    columnNumber: 1066
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/shader-studio.tsx",
                            lineNumber: 1134,
                            columnNumber: 925
                        }, this),
                        exportTab === "video" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "video-export",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "export-preview",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ShaderCanvas, {
                                        recipe: recipe,
                                        paused: false,
                                        onError: ()=>undefined
                                    }, void 0, false, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1134,
                                        columnNumber: 1373
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/shader-studio.tsx",
                                    lineNumber: 1134,
                                    columnNumber: 1341
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "video-controls",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            children: [
                                                "Aspect",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: videoSettings.aspect,
                                                    onChange: (event)=>updateVideoSettings({
                                                            aspect: event.target.value
                                                        }),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "16:9",
                                                            children: "16:9"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1134,
                                                            columnNumber: 1641
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "1:1",
                                                            children: "1:1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1134,
                                                            columnNumber: 1675
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "9:16",
                                                            children: "9:16"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1134,
                                                            columnNumber: 1707
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1134,
                                                    columnNumber: 1497
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1134,
                                            columnNumber: 1484
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            children: [
                                                "Format",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: videoSettings.mimeType,
                                                    onChange: (event)=>updateVideoSettings({
                                                            mimeType: event.target.value
                                                        }),
                                                    children: videoFormats.map((format)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: format.value,
                                                            disabled: typeof MediaRecorder !== "undefined" && !MediaRecorder.isTypeSupported(format.value),
                                                            children: [
                                                                format.label,
                                                                typeof MediaRecorder !== "undefined" && !MediaRecorder.isTypeSupported(format.value) ? " Ã¢â‚¬â€ unavailable" : ""
                                                            ]
                                                        }, format.value, true, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1134,
                                                            columnNumber: 1916
                                                        }, this))
                                                }, void 0, false, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1134,
                                                    columnNumber: 1771
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1134,
                                            columnNumber: 1758
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            children: [
                                                "Resolution",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: videoSettings.height,
                                                    onChange: (event)=>updateVideoSettings({
                                                            height: Number(event.target.value)
                                                        }),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: 480,
                                                            children: "480p"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1134,
                                                            columnNumber: 2388
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: 720,
                                                            children: "720p"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1134,
                                                            columnNumber: 2421
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: 1080,
                                                            children: "1080p"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1134,
                                                            columnNumber: 2454
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1134,
                                                    columnNumber: 2236
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1134,
                                            columnNumber: 2219
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            children: [
                                                "Frame rate",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: videoSettings.fps,
                                                    onChange: (event)=>updateVideoSettings({
                                                            fps: Number(event.target.value)
                                                        }),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: 24,
                                                            children: "24 fps"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1134,
                                                            columnNumber: 2666
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: 30,
                                                            children: "30 fps"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1134,
                                                            columnNumber: 2700
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: 60,
                                                            children: "60 fps"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1134,
                                                            columnNumber: 2734
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1134,
                                                    columnNumber: 2523
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1134,
                                            columnNumber: 2506
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "video-duration",
                                            children: [
                                                "Duration",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: videoSettings.duration,
                                                    onChange: (event)=>updateVideoSettings({
                                                            duration: Number(event.target.value)
                                                        }),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: 2,
                                                            children: "2 s"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1134,
                                                            columnNumber: 2985
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: 3,
                                                            children: "3 s"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1134,
                                                            columnNumber: 3015
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: 5,
                                                            children: "5 s"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1134,
                                                            columnNumber: 3045
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: 8,
                                                            children: "8 s"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1134,
                                                            columnNumber: 3075
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1134,
                                                    columnNumber: 2827
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1134,
                                            columnNumber: 2785
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "loop-row",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                                            children: "Ping-pong loop"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1134,
                                                            columnNumber: 3153
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                            children: videoSettings.loop ? "Forward + reverse Ã‚Â· ".concat((videoSettings.duration * 2 - 2 / videoSettings.fps).toFixed(1), " s") : "Export one forward pass"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1134,
                                                            columnNumber: 3174
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1134,
                                                    columnNumber: 3148
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                    className: "switch ".concat(videoSettings.loop ? "on" : ""),
                                                    onClick: ()=>updateVideoSettings({
                                                            loop: !videoSettings.loop
                                                        }),
                                                    "aria-pressed": videoSettings.loop,
                                                    "aria-label": "Export as a reverse loop",
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1134,
                                                        columnNumber: 3539
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1134,
                                                    columnNumber: 3337
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1134,
                                            columnNumber: 3122
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            className: "video-note",
                                            children: [
                                                Math.round(videoSettings.height * ({
                                                    "16:9": 16 / 9,
                                                    "1:1": 1,
                                                    "9:16": 9 / 16
                                                })[videoSettings.aspect]),
                                                " Ãƒâ€” ",
                                                videoSettings.height,
                                                " px Ã‚Â· ",
                                                videoSettings.loop ? videoSettings.duration * videoSettings.fps * 2 - 2 : videoSettings.duration * videoSettings.fps,
                                                " exact frames. Cursor interactions are excluded from exports."
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1134,
                                            columnNumber: 3559
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "button primary wide",
                                            onClick: exportVideo,
                                            disabled: videoProgress !== null,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__["Video"], {}, void 0, false, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1134,
                                                    columnNumber: 4007
                                                }, this),
                                                " ",
                                                videoProgress === null ? "Export video" : "Rendering ".concat(Math.round(videoProgress * 100), "%")
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1134,
                                            columnNumber: 3911
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/shader-studio.tsx",
                                    lineNumber: 1134,
                                    columnNumber: 1452
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/shader-studio.tsx",
                            lineNumber: 1134,
                            columnNumber: 1311
                        }, this),
                        exportTab === "prompt" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SourceSurface, {
                            title: "Build prompt",
                            helper: "A complete implementation prompt generated from the active shader configuration.",
                            source: buildPrompt(),
                            footer: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "button primary wide",
                                        onClick: ()=>copyText(buildPrompt(), "Build prompt copied"),
                                        children: [
                                            copied ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {}, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1134,
                                                columnNumber: 4429
                                            }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {}, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1134,
                                                columnNumber: 4441
                                            }, void 0),
                                            copied ? "Copied" : "Copy prompt"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1134,
                                        columnNumber: 4316
                                    }, void 0),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "button wide ghost",
                                        onClick: ()=>exportText(buildPrompt(), "shader-studio-prompt.txt", "text/plain"),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {}, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1134,
                                                columnNumber: 4616
                                            }, void 0),
                                            " Download .txt"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1134,
                                        columnNumber: 4494
                                    }, void 0)
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/components/shader-studio.tsx",
                            lineNumber: 1134,
                            columnNumber: 4157
                        }, this),
                        exportTab === "react" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SourceSurface, {
                            title: "React component",
                            helper: "A self-contained recipe and fragment shader ready to paste into a client component.",
                            source: reactCode,
                            footer: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "button primary wide",
                                        onClick: ()=>copyText(reactCode, "React component copied"),
                                        children: [
                                            copied ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {}, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1134,
                                                columnNumber: 4958
                                            }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {}, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1134,
                                                columnNumber: 4970
                                            }, void 0),
                                            copied ? "Copied" : "Copy React code"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1134,
                                        columnNumber: 4846
                                    }, void 0),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "button wide ghost",
                                        onClick: ()=>exportText(reactCode, "shader-studio-shader.ts", "text/plain"),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {}, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1134,
                                                columnNumber: 5144
                                            }, void 0),
                                            " Download .ts"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1134,
                                        columnNumber: 5027
                                    }, void 0)
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/components/shader-studio.tsx",
                            lineNumber: 1134,
                            columnNumber: 4685
                        }, this),
                        exportTab === "glsl" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SourceSurface, {
                            title: "Fragment GLSL",
                            helper: "The exact fragment shader currently driving the preview.",
                            source: recipe.glsl,
                            footer: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "button primary wide",
                                        onClick: ()=>copyText(recipe.glsl, "GLSL copied"),
                                        children: [
                                            copied ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {}, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1134,
                                                columnNumber: 5448
                                            }, void 0) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$copy$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Copy$3e$__["Copy"], {}, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1134,
                                                columnNumber: 5460
                                            }, void 0),
                                            copied ? "Copied" : "Copy GLSL"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1134,
                                        columnNumber: 5345
                                    }, void 0),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "button wide ghost",
                                        onClick: ()=>exportText(recipe.glsl, "shader-studio-shader.glsl", "text/plain"),
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$download$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Download$3e$__["Download"], {}, void 0, false, {
                                                fileName: "[project]/components/shader-studio.tsx",
                                                lineNumber: 1134,
                                                columnNumber: 5632
                                            }, void 0),
                                            " Download .glsl"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1134,
                                        columnNumber: 5511
                                    }, void 0)
                                ]
                            }, void 0, true)
                        }, void 0, false, {
                            fileName: "[project]/components/shader-studio.tsx",
                            lineNumber: 1134,
                            columnNumber: 5211
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/shader-studio.tsx",
                    lineNumber: 1134,
                    columnNumber: 72
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shader-studio.tsx",
                lineNumber: 1134,
                columnNumber: 20
            }, this),
            mockupExportOpen && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "modal-backdrop",
                role: "presentation",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "export-modal mockup-export-modal",
                    role: "dialog",
                    "aria-modal": "true",
                    "aria-labelledby": "mockup-export-title",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "close",
                            onClick: ()=>setMockupExportOpen(false),
                            "aria-label": "Close",
                            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$x$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__X$3e$__["X"], {}, void 0, false, {
                                fileName: "[project]/components/shader-studio.tsx",
                                lineNumber: 1135,
                                columnNumber: 286
                            }, this)
                        }, void 0, false, {
                            fileName: "[project]/components/shader-studio.tsx",
                            lineNumber: 1135,
                            columnNumber: 198
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "export-header",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            className: "eyebrow",
                                            children: "READY TO SHIP"
                                        }, void 0, false, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1135,
                                            columnNumber: 336
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                            id: "mockup-export-title",
                                            children: "Export shader"
                                        }, void 0, false, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1135,
                                            columnNumber: 382
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: "Choose a shader-only or composed mockup output."
                                        }, void 0, false, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1135,
                                            columnNumber: 429
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/shader-studio.tsx",
                                    lineNumber: 1135,
                                    columnNumber: 331
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageDown$3e$__["ImageDown"], {}, void 0, false, {
                                    fileName: "[project]/components/shader-studio.tsx",
                                    lineNumber: 1135,
                                    columnNumber: 489
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/shader-studio.tsx",
                            lineNumber: 1135,
                            columnNumber: 300
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "export-tabs",
                            role: "tablist",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: exportTab === "image" ? "active" : "",
                                    onClick: ()=>setExportTab("image"),
                                    children: "Image"
                                }, void 0, false, {
                                    fileName: "[project]/components/shader-studio.tsx",
                                    lineNumber: 1135,
                                    columnNumber: 552
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: exportTab === "video" ? "active" : "",
                                    onClick: ()=>setExportTab("video"),
                                    children: "Animation"
                                }, void 0, false, {
                                    fileName: "[project]/components/shader-studio.tsx",
                                    lineNumber: 1135,
                                    columnNumber: 662
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: exportTab === "mockup" ? "active" : "",
                                    onClick: ()=>setExportTab("mockup"),
                                    disabled: !mockup.visible,
                                    children: "Mockup"
                                }, void 0, false, {
                                    fileName: "[project]/components/shader-studio.tsx",
                                    lineNumber: 1135,
                                    columnNumber: 776
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setMockupExportOpen(false);
                                        setExportTab("prompt");
                                        setExportOpen(true);
                                    },
                                    children: "Prompt"
                                }, void 0, false, {
                                    fileName: "[project]/components/shader-studio.tsx",
                                    lineNumber: 1135,
                                    columnNumber: 916
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setMockupExportOpen(false);
                                        setExportTab("react");
                                        setExportOpen(true);
                                    },
                                    children: "React code"
                                }, void 0, false, {
                                    fileName: "[project]/components/shader-studio.tsx",
                                    lineNumber: 1135,
                                    columnNumber: 1032
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: ()=>{
                                        setMockupExportOpen(false);
                                        setExportTab("glsl");
                                        setExportOpen(true);
                                    },
                                    children: "GLSL"
                                }, void 0, false, {
                                    fileName: "[project]/components/shader-studio.tsx",
                                    lineNumber: 1135,
                                    columnNumber: 1151
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/shader-studio.tsx",
                            lineNumber: 1135,
                            columnNumber: 508
                        }, this),
                        exportTab === "image" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "export-image",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "export-preview",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ShaderCanvas, {
                                        recipe: recipe,
                                        paused: false,
                                        onError: ()=>undefined
                                    }, void 0, false, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1135,
                                        columnNumber: 1357
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/shader-studio.tsx",
                                    lineNumber: 1135,
                                    columnNumber: 1325
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                            children: "High-resolution PNG"
                                        }, void 0, false, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1135,
                                            columnNumber: 1441
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                            children: "Captures the shader only."
                                        }, void 0, false, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1135,
                                            columnNumber: 1469
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "button primary wide",
                                            onClick: exportPng,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageDown$3e$__["ImageDown"], {}, void 0, false, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1135,
                                                    columnNumber: 1561
                                                }, this),
                                                " Download PNG"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1135,
                                            columnNumber: 1501
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/shader-studio.tsx",
                                    lineNumber: 1135,
                                    columnNumber: 1436
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/shader-studio.tsx",
                            lineNumber: 1135,
                            columnNumber: 1295
                        }, this),
                        exportTab === "video" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "video-export",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "export-preview",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ShaderCanvas, {
                                        recipe: recipe,
                                        paused: false,
                                        onError: ()=>undefined
                                    }, void 0, false, {
                                        fileName: "[project]/components/shader-studio.tsx",
                                        lineNumber: 1135,
                                        columnNumber: 1697
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/components/shader-studio.tsx",
                                    lineNumber: 1135,
                                    columnNumber: 1665
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "video-controls",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            children: [
                                                "Aspect",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: videoSettings.aspect,
                                                    onChange: (event)=>updateVideoSettings({
                                                            aspect: event.target.value
                                                        }),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "16:9",
                                                            children: "16:9"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1135,
                                                            columnNumber: 1965
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "1:1",
                                                            children: "1:1"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1135,
                                                            columnNumber: 1999
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: "9:16",
                                                            children: "9:16"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1135,
                                                            columnNumber: 2031
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1135,
                                                    columnNumber: 1821
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1135,
                                            columnNumber: 1808
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            children: [
                                                "Resolution",
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                    value: videoSettings.height,
                                                    onChange: (event)=>updateVideoSettings({
                                                            height: Number(event.target.value)
                                                        }),
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: 480,
                                                            children: "480p"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1135,
                                                            columnNumber: 2251
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: 720,
                                                            children: "720p"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1135,
                                                            columnNumber: 2284
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: 1080,
                                                            children: "1080p"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1135,
                                                            columnNumber: 2317
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1135,
                                                    columnNumber: 2099
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1135,
                                            columnNumber: 2082
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: "button primary wide",
                                            onClick: exportVideo,
                                            disabled: videoProgress !== null,
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__["Video"], {}, void 0, false, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1135,
                                                    columnNumber: 2465
                                                }, this),
                                                " Export video"
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1135,
                                            columnNumber: 2369
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/shader-studio.tsx",
                                    lineNumber: 1135,
                                    columnNumber: 1776
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/components/shader-studio.tsx",
                            lineNumber: 1135,
                            columnNumber: 1635
                        }, this),
                        exportTab === "mockup" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "export-mode-toggle",
                                    role: "tablist",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: mockupExportMode === "image" ? "active" : "",
                                            onClick: ()=>setMockupExportMode("image"),
                                            children: "Image"
                                        }, void 0, false, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1135,
                                            columnNumber: 2589
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                            className: mockupExportMode === "video" ? "active" : "",
                                            onClick: ()=>setMockupExportMode("video"),
                                            children: "Video"
                                        }, void 0, false, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1135,
                                            columnNumber: 2713
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/shader-studio.tsx",
                                    lineNumber: 1135,
                                    columnNumber: 2538
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    className: "mockup-export",
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "export-preview mockup-export-preview",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ShaderCanvas, {
                                                    recipe: recipe,
                                                    paused: false,
                                                    onError: ()=>undefined
                                                }, void 0, false, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1135,
                                                    columnNumber: 2928
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                    className: "mockup-export-card frame-".concat(mockup.frame),
                                                    style: {
                                                        borderRadius: mockup.radius,
                                                        transform: "translate(".concat(mockup.x / 2, "%, ").concat(mockup.y / 2, "%) rotate(").concat(mockup.rotate, "deg) scale(").concat(Math.max(.5, mockup.scale), ")")
                                                    },
                                                    children: mockup.media && mockup.mediaType === "image" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                        src: mockup.media,
                                                        alt: "Mockup export preview"
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1135,
                                                        columnNumber: 3274
                                                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                        className: "mockup-demo",
                                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                            children: "Your product"
                                                        }, void 0, false, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1135,
                                                            columnNumber: 3360
                                                        }, this)
                                                    }, void 0, false, {
                                                        fileName: "[project]/components/shader-studio.tsx",
                                                        lineNumber: 1135,
                                                        columnNumber: 3331
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1135,
                                                    columnNumber: 3001
                                                }, this)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1135,
                                            columnNumber: 2874
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "mockup-export-controls",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                                    children: mockupExportMode === "image" ? "Mockup PNG" : "Animated mockup video"
                                                }, void 0, false, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1135,
                                                    columnNumber: 3440
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                    children: [
                                                        "Aspect",
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                            value: videoSettings.aspect,
                                                            onChange: (event)=>updateVideoSettings({
                                                                    aspect: event.target.value
                                                                }),
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "16:9",
                                                                    children: "16:9"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/shader-studio.tsx",
                                                                    lineNumber: 1135,
                                                                    columnNumber: 3677
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "1:1",
                                                                    children: "1:1"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/shader-studio.tsx",
                                                                    lineNumber: 1135,
                                                                    columnNumber: 3711
                                                                }, this),
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                    value: "9:16",
                                                                    children: "9:16"
                                                                }, void 0, false, {
                                                                    fileName: "[project]/components/shader-studio.tsx",
                                                                    lineNumber: 1135,
                                                                    columnNumber: 3743
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1135,
                                                            columnNumber: 3533
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/components/shader-studio.tsx",
                                                    lineNumber: 1135,
                                                    columnNumber: 3520
                                                }, this),
                                                mockupExportMode === "image" ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            children: [
                                                                "Resolution",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                    value: mockupImageHeight,
                                                                    onChange: (event)=>setMockupImageHeight(Number(event.target.value)),
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: 720,
                                                                            children: "720p"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/shader-studio.tsx",
                                                                            lineNumber: 1135,
                                                                            columnNumber: 3971
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: 1080,
                                                                            children: "1080p"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/shader-studio.tsx",
                                                                            lineNumber: 1135,
                                                                            columnNumber: 4004
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: 1440,
                                                                            children: "1440p"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/shader-studio.tsx",
                                                                            lineNumber: 1135,
                                                                            columnNumber: 4039
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/shader-studio.tsx",
                                                                    lineNumber: 1135,
                                                                    columnNumber: 3845
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1135,
                                                            columnNumber: 3828
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "button primary wide",
                                                            onClick: exportMockupImage,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$image$2d$down$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__ImageDown$3e$__["ImageDown"], {}, void 0, false, {
                                                                    fileName: "[project]/components/shader-studio.tsx",
                                                                    lineNumber: 1135,
                                                                    columnNumber: 4159
                                                                }, this),
                                                                " Download mockup PNG"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1135,
                                                            columnNumber: 4091
                                                        }, this)
                                                    ]
                                                }, void 0, true) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            children: [
                                                                "Resolution",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                    value: videoSettings.height,
                                                                    onChange: (event)=>updateVideoSettings({
                                                                            height: Number(event.target.value)
                                                                        }),
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: 480,
                                                                            children: "480p"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/shader-studio.tsx",
                                                                            lineNumber: 1135,
                                                                            columnNumber: 4378
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: 720,
                                                                            children: "720p"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/shader-studio.tsx",
                                                                            lineNumber: 1135,
                                                                            columnNumber: 4411
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: 1080,
                                                                            children: "1080p"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/shader-studio.tsx",
                                                                            lineNumber: 1135,
                                                                            columnNumber: 4444
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/shader-studio.tsx",
                                                                    lineNumber: 1135,
                                                                    columnNumber: 4226
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1135,
                                                            columnNumber: 4209
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                                            children: [
                                                                "Duration",
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                                    value: videoSettings.duration,
                                                                    onChange: (event)=>updateVideoSettings({
                                                                            duration: Number(event.target.value)
                                                                        }),
                                                                    children: [
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: 2,
                                                                            children: "2 s"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/shader-studio.tsx",
                                                                            lineNumber: 1135,
                                                                            columnNumber: 4669
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: 3,
                                                                            children: "3 s"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/shader-studio.tsx",
                                                                            lineNumber: 1135,
                                                                            columnNumber: 4699
                                                                        }, this),
                                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                                            value: 5,
                                                                            children: "5 s"
                                                                        }, void 0, false, {
                                                                            fileName: "[project]/components/shader-studio.tsx",
                                                                            lineNumber: 1135,
                                                                            columnNumber: 4729
                                                                        }, this)
                                                                    ]
                                                                }, void 0, true, {
                                                                    fileName: "[project]/components/shader-studio.tsx",
                                                                    lineNumber: 1135,
                                                                    columnNumber: 4511
                                                                }, this)
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1135,
                                                            columnNumber: 4496
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "button primary wide",
                                                            onClick: exportMockupVideo,
                                                            disabled: videoProgress !== null,
                                                            children: [
                                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$video$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Video$3e$__["Video"], {}, void 0, false, {
                                                                    fileName: "[project]/components/shader-studio.tsx",
                                                                    lineNumber: 1135,
                                                                    columnNumber: 4878
                                                                }, this),
                                                                " Export mockup video"
                                                            ]
                                                        }, void 0, true, {
                                                            fileName: "[project]/components/shader-studio.tsx",
                                                            lineNumber: 1135,
                                                            columnNumber: 4776
                                                        }, this)
                                                    ]
                                                }, void 0, true)
                                            ]
                                        }, void 0, true, {
                                            fileName: "[project]/components/shader-studio.tsx",
                                            lineNumber: 1135,
                                            columnNumber: 3400
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/components/shader-studio.tsx",
                                    lineNumber: 1135,
                                    columnNumber: 2843
                                }, this)
                            ]
                        }, void 0, true)
                    ]
                }, void 0, true, {
                    fileName: "[project]/components/shader-studio.tsx",
                    lineNumber: 1135,
                    columnNumber: 78
                }, this)
            }, void 0, false, {
                fileName: "[project]/components/shader-studio.tsx",
                lineNumber: 1135,
                columnNumber: 26
            }, this),
            toast && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "studio-toast",
                role: "status",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$lucide$2d$react$2f$dist$2f$esm$2f$icons$2f$check$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__default__as__Check$3e$__["Check"], {}, void 0, false, {
                        fileName: "[project]/components/shader-studio.tsx",
                        lineNumber: 1137,
                        columnNumber: 59
                    }, this),
                    toast
                ]
            }, void 0, true, {
                fileName: "[project]/components/shader-studio.tsx",
                lineNumber: 1137,
                columnNumber: 15
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/components/shader-studio.tsx",
        lineNumber: 1097,
        columnNumber: 10
    }, this);
}
_s4(ShaderStudio, "iK6sIZ+jP0k9dd4Lew7a1wS8bZ8=", false, function() {
    return [
        useStudioStore,
        useStudioStore
    ];
});
_c10 = ShaderStudio;
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9, _c10;
__turbopack_context__.k.register(_c, "PaperShaderCanvas");
__turbopack_context__.k.register(_c1, "NativeShaderCanvas");
__turbopack_context__.k.register(_c2, "ShaderCanvas");
__turbopack_context__.k.register(_c3, "ShaderThumbnail");
__turbopack_context__.k.register(_c4, "StaticStylePreview");
__turbopack_context__.k.register(_c5, "SavedRecipePreview");
__turbopack_context__.k.register(_c6, "SourceSurface");
__turbopack_context__.k.register(_c7, "ShadcnColorPicker");
__turbopack_context__.k.register(_c8, "Slider");
__turbopack_context__.k.register(_c9, "CameraPadScene");
__turbopack_context__.k.register(_c10, "ShaderStudio");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=components_47af2df7._.js.map