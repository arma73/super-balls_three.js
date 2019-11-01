(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "./src/js/app.js":
/*!***********************!*\
  !*** ./src/js/app.js ***!
  \***********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var three__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! three */ \"./node_modules/three/build/three.module.js\");\n\nvar canvas = document.querySelector(\"#SuperBalls\");\nvar context = canvas.getContext(\"webgl\", {\n  alpha: false\n});\nvar renderer = new three__WEBPACK_IMPORTED_MODULE_0__[\"WebGLRenderer\"]({\n  canvas: canvas,\n  context: context\n});\nvar camera = new three__WEBPACK_IMPORTED_MODULE_0__[\"PerspectiveCamera\"](45, window.innerWidth / window.innerHeight, 1, 500);\ncamera.position.set(0, 0, 100);\ncamera.lookAt(0, 0, 0);\nvar scene = new three__WEBPACK_IMPORTED_MODULE_0__[\"Scene\"]();\nvar material = Object(three__WEBPACK_IMPORTED_MODULE_0__[\"LineBasicMaterial\"])({\n  color: 0x0000ff\n});\nvar geometry = new three__WEBPACK_IMPORTED_MODULE_0__[\"Geometry\"]();\ngeometry.vertices.push(new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](-10, 0, 0));\ngeometry.vertices.push(new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](0, 10, 0));\ngeometry.vertices.push(new three__WEBPACK_IMPORTED_MODULE_0__[\"Vector3\"](10, 0, 0));\nvar line = new three__WEBPACK_IMPORTED_MODULE_0__[\"Line\"](geometry, material);\nscene.add(line);\nrenderer.render(scene, camera);\n\n//# sourceURL=webpack:///./src/js/app.js?");

/***/ }),

/***/ 0:
/*!*****************************!*\
  !*** multi ./src/js/app.js ***!
  \*****************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("module.exports = __webpack_require__(/*! ./src/js/app.js */\"./src/js/app.js\");\n\n\n//# sourceURL=webpack:///multi_./src/js/app.js?");

/***/ })

},[[0,"runtime","vendors"]]]);