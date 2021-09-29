/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/client/js/main.js":
/*!*******************************!*\
  !*** ./src/client/js/main.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _scss_style_scss__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../scss/style.scss */ \"./src/client/scss/style.scss\");\n\nconsole.log(\"hi\");\n\n//# sourceURL=webpack://youtube-clone/./src/client/js/main.js?");

/***/ }),

/***/ "./src/client/scss/style.scss":
/*!************************************!*\
  !*** ./src/client/scss/style.scss ***!
  \************************************/
/***/ (() => {

eval("throw new Error(\"Module build failed (from ./node_modules/mini-css-extract-plugin/dist/loader.js):\\nModuleBuildError: Module build failed (from ./node_modules/sass-loader/dist/cjs.js):\\nSassError: Can't find stylesheet to import.\\n  ╷\\n2 │ @import \\\"./congif/reset\\\";\\n  │         ^^^^^^^^^^^^^^^^\\n  ╵\\n  src/client/scss/style.scss 2:9  root stylesheet\\n    at processResult (/home/schmatz/youtube-clone/node_modules/webpack/lib/NormalModule.js:721:19)\\n    at /home/schmatz/youtube-clone/node_modules/webpack/lib/NormalModule.js:827:5\\n    at /home/schmatz/youtube-clone/node_modules/loader-runner/lib/LoaderRunner.js:399:11\\n    at /home/schmatz/youtube-clone/node_modules/loader-runner/lib/LoaderRunner.js:251:18\\n    at context.callback (/home/schmatz/youtube-clone/node_modules/loader-runner/lib/LoaderRunner.js:124:13)\\n    at /home/schmatz/youtube-clone/node_modules/sass-loader/dist/index.js:54:7\\n    at Function.call$2 (/home/schmatz/youtube-clone/node_modules/sass/sass.dart.js:95825:16)\\n    at _render_closure1.call$2 (/home/schmatz/youtube-clone/node_modules/sass/sass.dart.js:83882:12)\\n    at _RootZone.runBinary$3$3 (/home/schmatz/youtube-clone/node_modules/sass/sass.dart.js:28060:18)\\n    at _FutureListener.handleError$1 (/home/schmatz/youtube-clone/node_modules/sass/sass.dart.js:26590:21)\");\n\n//# sourceURL=webpack://youtube-clone/./src/client/scss/style.scss?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/client/js/main.js");
/******/ 	
/******/ })()
;