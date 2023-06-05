(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else {
		var a = factory();
		for(var i in a) (typeof exports === 'object' ? exports : root)[i] = a[i];
	}
})(window, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/browser/custom.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/@cloudide/messaging/messaging.js":
/*!*******************************************************!*\
  !*** ./node_modules/@cloudide/messaging/messaging.js ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/********************************************************************************
 * Copyright (C) 2020. Huawei Technologies Co., Ltd. All rights reserved.
 * SPDX-License-Identifier: MIT
 ********************************************************************************/
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.call = exports.expose = exports.exposable = exports.messaging = exports.Messaging = exports.Deferred = void 0;
/* eslint-disable @typescript-eslint/no-explicit-any */
const uuid_1 = __webpack_require__(/*! uuid */ "./node_modules/uuid/index.js");
__webpack_require__(/*! reflect-metadata */ "./node_modules/reflect-metadata/Reflect.js");
class Deferred {
    constructor() {
        this.isPending = true;
        this.isFulfilled = false;
        this.isRejected = false;
        this.promise = new Promise((resolve, reject) => {
            this.resolve = (value) => {
                resolve(value);
                this.isFulfilled = true;
                this.isPending = false;
            };
            this.reject = (error) => {
                reject(error);
                this.isRejected = true;
                this.isPending = false;
            };
        });
    }
}
exports.Deferred = Deferred;
/**
 * messaging protocal
 * page work with messaging protocal must implements the IframeLike Interface
 */
class Messaging {
    constructor(iframeContext, clientId) {
        this.exposedFunctions = new Map();
        // calls have been sent to remote
        this.pendingCalls = new Map();
        // calls received and is executing, stored with id
        this.executingCalls = new Map();
        this.iframeContexts = [];
        if (iframeContext) {
            this.registerIframeContext(iframeContext);
        }
        this.from = clientId ? clientId : uuid_1.v4();
    }
    static init(clientId) {
        if (!Messaging.instance) {
            Messaging.instance = new Messaging(undefined, clientId);
        }
        return Messaging.instance;
    }
    static bind(iframeContext, clientId) {
        if (!Messaging.instance) {
            Messaging.instance = new Messaging(iframeContext, clientId);
        }
        else {
            Messaging.instance.registerIframeContext(iframeContext);
            console.log(`New iframe messaging client added to ${Messaging.instance.from}`);
        }
        return Messaging.instance;
    }
    static getInstance() {
        if (!Messaging.instance) {
            console.log('Messaging has not been initialized, using "init" or "bind" function to initialize and bind Messaging instance');
        }
        return Messaging.instance;
    }
    registerIframeContext(iframeContext) {
        iframeContext.registerMessageHandler(this.onRemoteCall.bind(this));
        iframeContext.onDispose(() => {
            this.dispose(iframeContext);
        });
        this.iframeContexts.push(iframeContext);
    }
    dispose(iframeContext) {
        const idx = this.iframeContexts.indexOf(iframeContext);
        if (idx > 0) {
            this.iframeContexts.splice(idx, 1);
        }
    }
    sendRemoteCall(remoteCall) {
        remoteCall.from = this.from;
        if (remoteCall.notify) {
            this.iframeContexts.forEach((iframeContext) => {
                iframeContext.postMessage(remoteCall);
            });
            return undefined;
        }
        const deferred = new Deferred();
        this.pendingCalls.set(remoteCall.id, deferred);
        this.iframeContexts.forEach((iframeContext) => {
            iframeContext.postMessage(remoteCall);
        });
        return deferred;
    }
    onRemoteCall(remoteCall) {
        // discard message sent from this instance
        if (!remoteCall || remoteCall.from === this.from) {
            // console.log(`ack received: remoteCall.from`);
            return;
        }
        // discard message does not send to this client
        if (remoteCall.to !== '*' && remoteCall.to !== this.from) {
            return;
        }
        if (remoteCall.notify) {
            // received a notify from remote to complete a call
            const call = this.pendingCalls.get(remoteCall.id);
            if (call) {
                delete remoteCall.notify;
                if (remoteCall.success) {
                    call.resolve(remoteCall.ret);
                }
                else {
                    call.reject(remoteCall.ret);
                }
                this.pendingCalls.delete(remoteCall.id);
            }
            return;
        }
        if (!remoteCall.func) {
            return;
        }
        const funcName = remoteCall.func.indexOf('::') >= 0
            ? remoteCall.func.substr(remoteCall.func.indexOf('::') + 2)
            : remoteCall.func;
        const func = this.exposedFunctions.get(funcName);
        if (func) {
            this.executingCalls.set(remoteCall.id, remoteCall.func);
            const args = remoteCall.args ? remoteCall.args : [];
            func(...args)
                .then((ret) => {
                this.executingCalls.delete(remoteCall.id);
                // send notify to remote when function call completed
                this.sendRemoteCall({
                    id: remoteCall.id,
                    func: remoteCall.func,
                    ret: ret,
                    success: true,
                    notify: true,
                    to: remoteCall.from,
                    from: remoteCall.to
                });
            })
                .catch((err) => {
                const errData = {};
                Object.getOwnPropertyNames(err).forEach((value, index) => {
                    errData[value] = err[value];
                });
                this.sendRemoteCall({
                    id: remoteCall.id,
                    func: remoteCall.func,
                    ret: errData,
                    success: false,
                    notify: true,
                    to: remoteCall.from,
                    from: remoteCall.to
                });
            });
        }
        else {
            this.sendRemoteCall({
                id: remoteCall.id,
                func: remoteCall.func,
                ret: `no function exposed as ${remoteCall.func}`,
                success: false,
                notify: true,
                to: remoteCall.from,
                from: this.from
            });
        }
    }
    /**
     * expose function to remote
     * exposed function can be called remotely using call(func: string, args: any[]): Promise<any>
     * @param func function to expose
     * @param identifier unique identifier for calling remotely
     */
    expose(func, identifier) {
        this.exposedFunctions.set(identifier ? identifier : func.name, (...args) => __awaiter(this, void 0, void 0, function* () {
            return func(...args);
        }));
    }
    /**
     * make a remote function call
     * @param func remote function name
     * @param args arguments passed to remote function
     */
    call(func, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            const callDeferred = this.sendRemoteCall({
                id: uuid_1.v4(),
                func: func,
                args: args,
                notify: false,
                from: this.from,
                to: func.indexOf('::') >= 0 ? func.substr(0, func.indexOf('::')) : '*'
            });
            return callDeferred.promise;
        });
    }
    getExposedFunctions() {
        return this.exposedFunctions;
    }
}
exports.Messaging = Messaging;
const exposeMetadataKey = Symbol('expose');
/**
 * bind messaging protocal to which implements IframeLike
 * notice: this decorator only support class without static member
 * @param constructorFunction constrctor function of page implements IframeLike
 * @example
 * ```
 *     @messaging('my-client')
 *     export class IframePage implements IframeLike{
 *
 *     }
 * ```
 */
function messaging(clientId) {
    return function (constructorFunction) {
        //new constructor function
        const newConstructorFunction = function (...args) {
            const func = function () {
                return new constructorFunction(...args);
            };
            func.prototype = constructorFunction.prototype;
            const result = new func(...args);
            Messaging.bind(result, clientId);
            return result;
        };
        newConstructorFunction.prototype = constructorFunction.prototype;
        return newConstructorFunction;
    };
}
exports.messaging = messaging;
/**
 * exposable class which can be bind with messaging protocal
 * notice: this decorator only support class without static member
 * @param constrctor function of page implements IframeLike
 * @example
 * ```
 *     @exposable
 *     export class ExposedLocalAPi {
 *         @expose('identifier_of_your_function')
 *         public doSomething(something: any): any {
 *             const ret = `do ${something}`;
 *             return ret;
 *         }
 *     }
 * ```
 */
function exposable(constructorFunction) {
    //new constructor function
    const newConstructorFunction = function (...args) {
        const func = function () {
            return new constructorFunction(...args);
        };
        func.prototype = constructorFunction.prototype;
        const result = new func(...args);
        const exposedMethods = Reflect.getMetadata(exposeMetadataKey, result);
        const messagingInstance = Messaging.getInstance();
        if (!messagingInstance || !exposedMethods) {
            return result;
        }
        exposedMethods.forEach((method, identifier) => {
            if (messagingInstance.getExposedFunctions().get(identifier)) {
                console.log(`warning: identifier "${identifier}" rebind to [${JSON.stringify(result)}].[${method}] `);
            }
            messagingInstance.expose((...args) => {
                return Promise.resolve(method.apply(result, args));
            }, identifier);
            // console.log(`Messaging API exposed: ${identifier}, ${method}`);
        });
        return result;
    };
    newConstructorFunction.prototype = constructorFunction.prototype;
    return newConstructorFunction;
}
exports.exposable = exposable;
/**
 * decorator to expose function for remote call
 * @param identifier unique identifier of function to be exposed
 * @example
 * ```
 *     @exposable
 *     export class ExposabledLocalAPi {
 *         @expose('identifier_of_your_function')
 *         public doSomething(something: any): any {
 *             const ret = `do ${something}`;
 *             return ret;
 *         }
 *     }
 * ```
 */
function expose(identifier) {
    return function (target, propertyKey, descriptor) {
        const method = descriptor.value;
        let stored = Reflect.getMetadata(exposeMetadataKey, target);
        if (stored) {
            const oldBind = stored.get(identifier);
            if (oldBind) {
                console.log(`warning: duplicated identifier detected! function identifier '${identifier}' is rebinded from ${oldBind} to ${method}`);
            }
            stored.set(identifier, method);
        }
        else {
            stored = new Map();
            stored.set(identifier, method);
        }
        Reflect.defineMetadata(exposeMetadataKey, stored, target);
    };
}
exports.expose = expose;
/**
 * delegate to call remote function, all parameter will be passed to remote
 * @param exposedFunctionIdentifier identifier of exposed function
 * @example
 * ```
 *     @call('identifier_of_your_function')
 *     function callRemote(type: string, event: any) {
 *         // console.log(`remtoe function called`);
 *     }
 * ```
 */
function call(exposedFunctionIdentifier) {
    return function (target, propertyKey, descriptor) {
        const originalMethod = descriptor.value;
        descriptor.value = function (...args) {
            const messagingInstance = Messaging.getInstance();
            if (messagingInstance) {
                messagingInstance.call(exposedFunctionIdentifier, ...args);
            }
            originalMethod(...args);
        };
    };
}
exports.call = call;


/***/ }),

/***/ "./node_modules/@cloudide/nls/lib/common/common.js":
/*!*********************************************************!*\
  !*** ./node_modules/@cloudide/nls/lib/common/common.js ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/********************************************************************************
 * Copyright (C) 2021. Huawei Technologies Co., Ltd. All rights reserved.
 * SPDX-License-Identifier: MIT
 ********************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.format = void 0;
// copied and modified from https://github.com/microsoft/vscode-nls/blob/master/src/common/common.ts#L100
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function format(message, args) {
    let result = message;
    if (args.length === 0) {
        result = message;
    }
    else {
        result = message.replace(/\{(\d+)\}/g, (match, rest) => {
            const index = rest[0];
            const arg = args[index];
            let replacement = match;
            if (typeof arg === 'string') {
                replacement = arg;
            }
            else if (typeof arg === 'number' || typeof arg === 'boolean' || arg === void 0 || arg === null) {
                replacement = String(arg);
            }
            return replacement;
        });
    }
    return result;
}
exports.format = format;
//# sourceMappingURL=common.js.map

/***/ }),

/***/ "./node_modules/@codearts/core/lib/browser/plugin-api.js":
/*!***************************************************************!*\
  !*** ./node_modules/@codearts/core/lib/browser/plugin-api.js ***!
  \***************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/********************************************************************************
 * Copyright (C) 2020. Huawei Technologies Co., Ltd. All rights reserved.
 * SPDX-License-Identifier: MIT
 ********************************************************************************/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginPage = exports.AbstractFrontend = void 0;
const messaging_1 = __webpack_require__(/*! @cloudide/messaging */ "./node_modules/@cloudide/messaging/messaging.js");
const common_1 = __webpack_require__(/*! @cloudide/nls/lib/common/common */ "./node_modules/@cloudide/nls/lib/common/common.js");
const cloudidePluginApi = acquireCloudidePluginApi();
/**
 * Defines abstract frontend class that all frontend must extend.
 * A frontend is a program that runs within a web browser.
 * Frontend expose and receive remote call from other scope.
 */
class AbstractFrontend {
    /**
     * When constructed, parameter 'plugin' is the PluginPage object.
     * @param plugin plugin page that provide CloudIDE api
     */
    constructor(plugin) {
        this.plugin = plugin;
    }
}
exports.AbstractFrontend = AbstractFrontend;
const backendClientIdentifier = 'backend';
/**
 * Defines an object to provide CloudIDE API.
 * PluginPage is a singleton in a webview page.
 */
class PluginPage {
    constructor(pluginPageContext, frontends) {
        this.domInitialized = new messaging_1.Deferred();
        this.isReady = new messaging_1.Deferred();
        this.registeredEventHandlers = new Map();
        this.frontends = new Map();
        this.registeredContextMenu = new Map();
        this.pluginPageContext = pluginPageContext;
        this.cloudidePluginApi = cloudidePluginApi;
        this.extensionPath = this.cloudidePluginApi.getExtensionPath();
        // remove duplicates from the frontend list
        frontends = [...new Set(frontends)];
        const doc = this.pluginPageContext.window.document;
        doc.addEventListener('keydown', (event) => {
            switch (event.key) {
                case 'F1':
                case 'F5':
                    event.preventDefault();
                    break;
            }
        });
        if (doc.readyState === 'loading') {
            doc.addEventListener('DOMContentLoaded', () => {
                this.domInitialized.resolve(true);
            });
        }
        else {
            this.domInitialized.resolve(true);
        }
        this.initApi(this, frontends);
    }
    /**
     * Notify backend that webview page is loaded and all frontend classes have been initialized.
     */
    ready() {
        return __awaiter(this, void 0, void 0, function* () {
            const domInitialized = yield this.domInitialized.promise;
            if (domInitialized) {
                this.syncInitializedStatus();
            }
            return this.isReady.promise;
        });
    }
    syncInitializedStatus() {
        return __awaiter(this, void 0, void 0, function* () {
            this._call('plugin.onPageInit', cloudidePluginApi.getViewType(), true)
                .then((value) => {
                this.isReady.resolve(value);
            })
                .catch((err) => {
                console.error(err);
                this.isReady.resolve(false);
            });
        });
    }
    _call(func, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            const messageInstance = messaging_1.Messaging.getInstance();
            if (!messageInstance) {
                return false;
            }
            func = func.indexOf('::') >= 0 ? func : `${backendClientIdentifier}::${func}`;
            return messageInstance.call(func, ...args);
        });
    }
    initApi(plugin, frontends) {
        return __awaiter(this, void 0, void 0, function* () {
            frontends.push(DefaultPageApi);
            frontends.forEach((frontendClass) => {
                if (!this.frontends.get(frontendClass)) {
                    const frontendInstance = new frontendClass(plugin);
                    this.frontends.set(frontendClass, frontendInstance);
                }
            });
            const initPromises = [];
            const iterator = this.frontends.values();
            let frontendInstance;
            while (((frontendInstance = iterator.next()), !frontendInstance.done)) {
                initPromises.push(frontendInstance.value.init());
            }
            yield Promise.all(initPromises);
            yield this.ready();
            this.frontends.forEach((frontendInstance) => {
                frontendInstance.run();
            });
        });
    }
    /**
     * Initialize plugin page API and frontend classes
     * The call to create function will only take effect once.
     * @param frontends All frontend classes that need to be created.
     */
    static create(frontends) {
        if (this.instance && this.instance.pluginPageContext) {
            return this.instance;
        }
        this.instance = new PluginPage(new PluginPageContext(window), frontends);
        return this.instance;
    }
    /**
     * Return plugin page API object, call it after calling craete
     */
    static getInstance() {
        return this.instance;
    }
    /**
     * Return frontend object initialized by plugin
     * @param frontendClass Class definition of front class
     */
    getFrontend(frontendClass) {
        return this.frontends.get(frontendClass);
    }
    /**
     * Return all frontends
     */
    getAllFrontend() {
        return this.frontends;
    }
    /**
     * Pass events to registeredEventHandlers
     * @param eventType unique type of event
     * @param event event object
     */
    onEvent(eventType, event) {
        const eventHandlers = this.registeredEventHandlers.get(eventType);
        if (eventHandlers) {
            eventHandlers.forEach((eventHandler) => {
                eventHandler(eventType, event);
            });
        }
    }
    /**
     * Return localized messaging according to the locale config
     * @param key key configuration stored in package.nls.*.json
     */
    localize(key, ...args) {
        var _a;
        const message = (_a = this.cloudidePluginApi.getI18n()) === null || _a === void 0 ? void 0 : _a.l10n[key];
        if (!message) {
            return '';
        }
        return (0, common_1.format)(message, args);
    }
    /**
     * Make a function call to frontend.
     * @param identifier remote function with the format of 'viewType::function-id'
     * @param args parameters passed to remote function
     * @returns Promise<any>
     */
    call(func, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            let funcName = func;
            if (typeof func !== 'string') {
                funcName = func.name;
            }
            if (funcName.startsWith('theia.') || funcName.startsWith('cloudide.') || funcName.startsWith('codearts.')) {
                const funcCallArry = funcName.split('.');
                const argsForTheia = funcCallArry.slice(1);
                argsForTheia.push(...args);
                return this._call('codearts', ...argsForTheia);
            }
            return this._call(funcName, ...args);
        });
    }
    /**
     * Subscribe to event fired from backend plugin
     * @param eventType unique type of event
     * @param eventHandler callback function to execute when event fired
     */
    subscribeEvent(eventType, eventHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.call('plugin.subscribeEvent', eventType);
            const eventHandlers = this.registeredEventHandlers.get(eventType);
            if (eventHandlers) {
                eventHandlers.push(eventHandler);
            }
            else {
                const handlers = [eventHandler];
                this.registeredEventHandlers.set(eventType, handlers);
            }
        });
    }
    /**
     * Cancel event subscription
     * @param eventType unique type of event
     * @param eventHandler callback function registered
     */
    unsubscribeEvent(eventType, eventHandler) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.call('plugin.unsubscribeEvent', eventType);
            const eventHandlers = this.registeredEventHandlers.get(eventType);
            if (eventHandlers) {
                eventHandlers.splice(eventHandlers.indexOf(eventHandler), 1);
            }
        });
    }
    /**
     * Cancel all event subscription
     * @param eventType unique type of event
     * @param eventHandler callback function registered
     */
    unsubscribeAllEvents() {
        return __awaiter(this, void 0, void 0, function* () {
            for (const eventType of this.registeredEventHandlers.keys()) {
                yield this.call('plugin.unsubscribeEvent', eventType);
            }
            this.registeredEventHandlers.clear();
        });
    }
    /**
     * Log to backend
     * @param level log level
     * @param message log message
     */
    log(level, message) {
        return __awaiter(this, void 0, void 0, function* () {
            this.call('plugin.log', level.valueOf(), message);
        });
    }
    /**
     * Convert local resource path to webview path
     * @param path relative path to the plugin root directory
     */
    toWebviewResource(path) {
        return `theia-resource/file${this.extensionPath}/${path}`.split(/\/+/).join('/');
    }
    /**
     * Create webview on the IDE workbench
     * @param opts options to configure the dynamic webview
     * @param override replace the dynamic webview with the same viewType
     * @deprecated using createWebviewPanel instead
     */
    createDynamicWebview(opts, override) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.call('plugin.createDynamicWebview', opts, override);
        });
    }
    /**
     * Dispose webview with specific viewType
     * @param viewType view type of the dynamic webview
     * @deprecated using disposeWebviewContainer instead
     */
    disposeDynamicWebview(viewType) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.call('plugin.disposeDynamicWebview', viewType);
        });
    }
    /**
     * Create webview on the IDE workbench
     * @param opts options to configure the webview
     * @param override replace the webview with the same viewType
     */
    createWebviewPanel(opts, override) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.call('plugin.createWebviewPanel', opts, override);
        });
    }
    /**
     * Create webview view dialog
     * @param opts options to configure the dynamic webview
     * @param override replace the dynamic webview with the same viewType
     */
    createWebviewViewDialog(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.call('plugin.createWebviewViewDialog', opts);
        });
    }
    /**
     * Register a provider for project wizard with webview view.
     * @param opts options to create the webview provider
     * @returns Pormose<void>
     */
    registerProjectWizardProvider(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.call('plugin.registerProjectWizardProvider', opts);
        });
    }
    /**
     * Dispose webview with specific viewType
     * @param viewType view type of the dynamic webview
     */
    disposeWebviewContainer(viewType) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.call('plugin.disposeWebviewContainer', viewType);
        });
    }
    /**
     * Execute command registered to IDE
     * @param id command id
     */
    executeCommand(id, ...args) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.call('cloudide.commands.executeCommand', id, ...args);
        });
    }
    /**
     * Register context menu to the target dom
     * @param target the dom to add context menu
     * @param menu menu items
     * @param concat concatenate all menu items registered
     */
    registerContextMenu(target, menu, concat) {
        const existTargetCallBack = this.registeredContextMenu.get(target);
        if (existTargetCallBack) {
            target.removeEventListener('contextmenu', existTargetCallBack);
            this.registeredContextMenu.delete(target);
        }
        const callback = (e) => {
            const curMenu = e['menu'];
            if (concat) {
                e['menu'] = curMenu || menu ? [...(curMenu || []), ...(menu || [])] : curMenu;
            }
            else {
                e['menu'] = menu;
            }
        };
        this.registeredContextMenu.set(target, callback);
        target.addEventListener('contextmenu', callback);
    }
}
exports.PluginPage = PluginPage;
/**
 * Defines a set of methods that used to communicate between PluginPage and other scope.
 */
let PluginPageContext = class PluginPageContext {
    constructor(window) {
        this.initialized = new messaging_1.Deferred();
        this.window = window;
        this.window.onunload = (evt) => {
            if (this.disposedEventHandler) {
                this.disposedEventHandler(evt);
            }
        };
        this.vscodeApi = acquireVsCodeApi();
    }
    onDispose(disposedEventHandler) {
        this.disposedEventHandler = disposedEventHandler;
    }
    registerMessageHandler(handleMessage) {
        this.handleMessage = handleMessage;
        const handlePluginMessage = this.handleMessage;
        this.window.addEventListener('message', (event) => {
            handlePluginMessage(event.data);
        });
    }
    postMessage(message) {
        if (this.vscodeApi) {
            this.vscodeApi.postMessage(message);
        }
        else {
            this.window.parent.postMessage(message, '*');
        }
    }
};
PluginPageContext = __decorate([
    (0, messaging_1.messaging)(cloudidePluginApi.getViewType()),
    __metadata("design:paramtypes", [Window])
], PluginPageContext);
/**
 * Provides Default CloudIDE API.
 */
let DefaultPageApi = class DefaultPageApi extends AbstractFrontend {
    init() {
        return __awaiter(this, void 0, void 0, function* () {
            // do nothing
        });
    }
    run() {
        // do nothing
    }
    stop() {
        // do nothing
    }
    onEvent(eventType, event) {
        this.plugin.onEvent(eventType, event);
    }
};
__decorate([
    (0, messaging_1.expose)('plugin.page.onEvent'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], DefaultPageApi.prototype, "onEvent", null);
DefaultPageApi = __decorate([
    messaging_1.exposable
], DefaultPageApi);
//# sourceMappingURL=plugin-api.js.map

/***/ }),

/***/ "./node_modules/@codearts/core/lib/common/plugin-common.js":
/*!*****************************************************************!*\
  !*** ./node_modules/@codearts/core/lib/common/plugin-common.js ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/********************************************************************************
 * Copyright (C) 2022. Huawei Technologies Co., Ltd. All rights reserved.
 * SPDX-License-Identifier: MIT
 ********************************************************************************/
Object.defineProperty(exports, "__esModule", { value: true });
exports.EventType = exports.LogLevel = void 0;
var LogLevel;
(function (LogLevel) {
    LogLevel["DEBUG"] = "DEBUG";
    LogLevel["INFO"] = "INFO";
    LogLevel["WARN"] = "WARN";
    LogLevel["ERROR"] = "ERROR";
})(LogLevel = exports.LogLevel || (exports.LogLevel = {}));
var EventType;
(function (EventType) {
    // events from workspace module
    EventType["WORKSPACE_ONDIDCHANGEWORKSPACEFOLDERS"] = "codearts.workspace.onDidChangeWorkspaceFolders";
    EventType["WORKSPACE_ONDIDOPENTEXTDOCUMENT"] = "codearts.workspace.onDidOpenTextDocument";
    EventType["WORKSPACE_ONDIDCLOSETEXTDOCUMENT"] = "codearts.workspace.onDidCloseTextDocument";
    EventType["WORKSPACE_ONDIDCHANGETEXTDOCUMENT"] = "codearts.workspace.onDidChangeTextDocument";
    EventType["WORKSPACE_ONWILLSAVETEXTDOCUMENT"] = "codearts.workspace.onWillSaveTextDocument";
    EventType["WORKSPACE_ONDIDSAVETEXTDOCUMENT"] = "codearts.workspace.onDidSaveTextDocument";
    EventType["WORKSPACE_ONDIDCHANGENOTEBOOKDOCUMENT"] = "codearts.workspace.onDidChangeNotebookDocument";
    EventType["WORKSPACE_ONDIDSAVENOTEBOOKDOCUMENT"] = "codearts.workspace.onDidSaveNotebookDocument";
    EventType["WORKSPACE_ONDIDOPENNOTEBOOKDOCUMENT"] = "codearts.workspace.onDidOpenNotebookDocument";
    EventType["WORKSPACE_ONDIDCLOSENOTEBOOKDOCUMENT"] = "codearts.workspace.onDidCloseNotebookDocument";
    EventType["WORKSPACE_ONWILLCREATEFILES"] = "codearts.workspace.onWillCreateFiles";
    EventType["WORKSPACE_ONDIDCREATEFILES"] = "codearts.workspace.onDidCreateFiles";
    EventType["WORKSPACE_ONWILLDELETEFILES"] = "codearts.workspace.onWillDeleteFiles";
    EventType["WORKSPACE_ONDIDDELETEFILES"] = "codearts.workspace.onDidDeleteFiles";
    EventType["WORKSPACE_ONWILLRENAMEFILES"] = "codearts.workspace.onWillRenameFiles";
    EventType["WORKSPACE_ONDIDRENAMEFILES"] = "codearts.workspace.onDidRenameFiles";
    EventType["WORKSPACE_ONDIDCHANGECONFIGURATION"] = "codearts.workspace.onDidChangeConfiguration";
    // events from debug module
    EventType["DEBUG_ONDIDCHANGEACTIVEDEBUGSESSION"] = "codearts.debug.onDidChangeActiveDebugSession";
    EventType["DEBUG_ONDIDSTARTDEBUGSESSION"] = "codearts.debug.onDidStartDebugSession";
    EventType["DEBUG_ONDIDRECEIVEDEBUGSESSIONCUSTOMEVENT"] = "codearts.debug.onDidReceiveDebugSessionCustomEvent";
    EventType["DEBUG_ONDIDTERMINATEDEBUGSESSION"] = "codearts.debug.onDidTerminateDebugSession";
    EventType["DEBUG_ONDIDCHANGEBREAKPOINTS"] = "codearts.debug.onDidChangeBreakpoints";
    // events from languages module
    EventType["LANGUAGES_ONDIDCHANGEDIAGNOSTICS"] = "codearts.languages.onDidChangeDiagnostics";
    // events from plugins module
    EventType["EXTENSIONS_ONDIDCHANGE"] = "codearts.extensions.onDidChange";
    // events from tasks module
    EventType["TASKS_ONDIDSTARTTASK"] = "codearts.tasks.onDidStartTask";
    EventType["TASKS_ONDIDENDTASK"] = "codearts.tasks.onDidEndTask";
    EventType["TASKS_ONDIDSTARTTASKPROCESS"] = "codearts.tasks.onDidStartTaskProcess";
    EventType["TASKS_ONDIDENDTASKPROCESS"] = "codearts.tasks.onDidEndTaskProcess";
    // events from window module
    EventType["WINDOW_ONDIDCHANGEACTIVETEXTEDITOR"] = "codearts.window.onDidChangeActiveTextEditor";
    EventType["WINDOW_ONDIDCHANGEVISIBLETEXTEDITORS"] = "codearts.window.onDidChangeVisibleTextEditors";
    EventType["WINDOW_ONDIDCHANGETEXTEDITORSELECTION"] = "codearts.window.onDidChangeTextEditorSelection";
    EventType["WINDOW_ONDIDCHANGETEXTEDITORVISIBLERANGES"] = "codearts.window.onDidChangeTextEditorVisibleRanges";
    EventType["WINDOW_ONDIDCHANGETEXTEDITOROPTIONS"] = "codearts.window.onDidChangeTextEditorOptions";
    EventType["WINDOW_ONDIDCHANGETEXTEDITORVIEWCOLUMN"] = "codearts.window.onDidChangeTextEditorViewColumn";
    EventType["WINDOW_ONDIDCHANGEVISIBLENOTEBOOKEDITORS"] = "codearts.window.onDidChangeVisibleNotebookEditors";
    EventType["WINDOW_ONDIDCHANGEACTIVENOTEBOOKEDITOR"] = "codearts.window.onDidChangeActiveNotebookEditor";
    EventType["WINDOW_ONDIDCHANGENOTEBOOKEDITORSELECTION"] = "codearts.window.onDidChangeNotebookEditorSelection";
    EventType["WINDOW_ONDIDCHANGENOTEBOOKEDITORVISIBLERANGES"] = "codearts.window.onDidChangeNotebookEditorVisibleRanges";
    EventType["WINDOW_ONDIDCHANGEACTIVETERMINAL"] = "codearts.window.onDidChangeActiveTerminal";
    EventType["WINDOW_ONDIDOPENTERMINAL"] = "codearts.window.onDidOpenTerminal";
    EventType["WINDOW_ONDIDCLOSETERMINAL"] = "codearts.window.onDidCloseTerminal";
    EventType["WINDOW_ONDIDCHANGETERMINALSTATE"] = "codearts.window.onDidChangeTerminalState";
    EventType["WINDOW_ONDIDCHANGEWINDOWSTATE"] = "codearts.window.onDidChangeWindowState";
})(EventType = exports.EventType || (exports.EventType = {}));
//# sourceMappingURL=plugin-common.js.map

/***/ }),

/***/ "./node_modules/process/browser.js":
/*!*****************************************!*\
  !*** ./node_modules/process/browser.js ***!
  \*****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// shim for using process in browser
var process = module.exports = {};

// cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
    throw new Error('setTimeout has not been defined');
}
function defaultClearTimeout () {
    throw new Error('clearTimeout has not been defined');
}
(function () {
    try {
        if (typeof setTimeout === 'function') {
            cachedSetTimeout = setTimeout;
        } else {
            cachedSetTimeout = defaultSetTimout;
        }
    } catch (e) {
        cachedSetTimeout = defaultSetTimout;
    }
    try {
        if (typeof clearTimeout === 'function') {
            cachedClearTimeout = clearTimeout;
        } else {
            cachedClearTimeout = defaultClearTimeout;
        }
    } catch (e) {
        cachedClearTimeout = defaultClearTimeout;
    }
} ())
function runTimeout(fun) {
    if (cachedSetTimeout === setTimeout) {
        //normal enviroments in sane situations
        return setTimeout(fun, 0);
    }
    // if setTimeout wasn't available but was latter defined
    if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
        cachedSetTimeout = setTimeout;
        return setTimeout(fun, 0);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedSetTimeout(fun, 0);
    } catch(e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
            return cachedSetTimeout.call(null, fun, 0);
        } catch(e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
            return cachedSetTimeout.call(this, fun, 0);
        }
    }


}
function runClearTimeout(marker) {
    if (cachedClearTimeout === clearTimeout) {
        //normal enviroments in sane situations
        return clearTimeout(marker);
    }
    // if clearTimeout wasn't available but was latter defined
    if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
        cachedClearTimeout = clearTimeout;
        return clearTimeout(marker);
    }
    try {
        // when when somebody has screwed with setTimeout but no I.E. maddness
        return cachedClearTimeout(marker);
    } catch (e){
        try {
            // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
            return cachedClearTimeout.call(null, marker);
        } catch (e){
            // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
            // Some versions of I.E. have different rules for clearTimeout vs setTimeout
            return cachedClearTimeout.call(this, marker);
        }
    }



}
var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
    if (!draining || !currentQueue) {
        return;
    }
    draining = false;
    if (currentQueue.length) {
        queue = currentQueue.concat(queue);
    } else {
        queueIndex = -1;
    }
    if (queue.length) {
        drainQueue();
    }
}

function drainQueue() {
    if (draining) {
        return;
    }
    var timeout = runTimeout(cleanUpNextTick);
    draining = true;

    var len = queue.length;
    while(len) {
        currentQueue = queue;
        queue = [];
        while (++queueIndex < len) {
            if (currentQueue) {
                currentQueue[queueIndex].run();
            }
        }
        queueIndex = -1;
        len = queue.length;
    }
    currentQueue = null;
    draining = false;
    runClearTimeout(timeout);
}

process.nextTick = function (fun) {
    var args = new Array(arguments.length - 1);
    if (arguments.length > 1) {
        for (var i = 1; i < arguments.length; i++) {
            args[i - 1] = arguments[i];
        }
    }
    queue.push(new Item(fun, args));
    if (queue.length === 1 && !draining) {
        runTimeout(drainQueue);
    }
};

// v8 likes predictible objects
function Item(fun, array) {
    this.fun = fun;
    this.array = array;
}
Item.prototype.run = function () {
    this.fun.apply(null, this.array);
};
process.title = 'browser';
process.browser = true;
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues
process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) { return [] }

process.binding = function (name) {
    throw new Error('process.binding is not supported');
};

process.cwd = function () { return '/' };
process.chdir = function (dir) {
    throw new Error('process.chdir is not supported');
};
process.umask = function() { return 0; };


/***/ }),

/***/ "./node_modules/reflect-metadata/Reflect.js":
/*!**************************************************!*\
  !*** ./node_modules/reflect-metadata/Reflect.js ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(process, global) {/*! *****************************************************************************
Copyright (C) Microsoft. All rights reserved.
Licensed under the Apache License, Version 2.0 (the "License"); you may not use
this file except in compliance with the License. You may obtain a copy of the
License at http://www.apache.org/licenses/LICENSE-2.0

THIS CODE IS PROVIDED ON AN *AS IS* BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
KIND, EITHER EXPRESS OR IMPLIED, INCLUDING WITHOUT LIMITATION ANY IMPLIED
WARRANTIES OR CONDITIONS OF TITLE, FITNESS FOR A PARTICULAR PURPOSE,
MERCHANTABLITY OR NON-INFRINGEMENT.

See the Apache Version 2.0 License for specific language governing permissions
and limitations under the License.
***************************************************************************** */
var Reflect;
(function (Reflect) {
    // Metadata Proposal
    // https://rbuckton.github.io/reflect-metadata/
    (function (factory) {
        var root = typeof global === "object" ? global :
            typeof self === "object" ? self :
                typeof this === "object" ? this :
                    Function("return this;")();
        var exporter = makeExporter(Reflect);
        if (typeof root.Reflect === "undefined") {
            root.Reflect = Reflect;
        }
        else {
            exporter = makeExporter(root.Reflect, exporter);
        }
        factory(exporter);
        function makeExporter(target, previous) {
            return function (key, value) {
                if (typeof target[key] !== "function") {
                    Object.defineProperty(target, key, { configurable: true, writable: true, value: value });
                }
                if (previous)
                    previous(key, value);
            };
        }
    })(function (exporter) {
        var hasOwn = Object.prototype.hasOwnProperty;
        // feature test for Symbol support
        var supportsSymbol = typeof Symbol === "function";
        var toPrimitiveSymbol = supportsSymbol && typeof Symbol.toPrimitive !== "undefined" ? Symbol.toPrimitive : "@@toPrimitive";
        var iteratorSymbol = supportsSymbol && typeof Symbol.iterator !== "undefined" ? Symbol.iterator : "@@iterator";
        var supportsCreate = typeof Object.create === "function"; // feature test for Object.create support
        var supportsProto = { __proto__: [] } instanceof Array; // feature test for __proto__ support
        var downLevel = !supportsCreate && !supportsProto;
        var HashMap = {
            // create an object in dictionary mode (a.k.a. "slow" mode in v8)
            create: supportsCreate
                ? function () { return MakeDictionary(Object.create(null)); }
                : supportsProto
                    ? function () { return MakeDictionary({ __proto__: null }); }
                    : function () { return MakeDictionary({}); },
            has: downLevel
                ? function (map, key) { return hasOwn.call(map, key); }
                : function (map, key) { return key in map; },
            get: downLevel
                ? function (map, key) { return hasOwn.call(map, key) ? map[key] : undefined; }
                : function (map, key) { return map[key]; },
        };
        // Load global or shim versions of Map, Set, and WeakMap
        var functionPrototype = Object.getPrototypeOf(Function);
        var usePolyfill = typeof process === "object" && process.env && process.env["REFLECT_METADATA_USE_MAP_POLYFILL"] === "true";
        var _Map = !usePolyfill && typeof Map === "function" && typeof Map.prototype.entries === "function" ? Map : CreateMapPolyfill();
        var _Set = !usePolyfill && typeof Set === "function" && typeof Set.prototype.entries === "function" ? Set : CreateSetPolyfill();
        var _WeakMap = !usePolyfill && typeof WeakMap === "function" ? WeakMap : CreateWeakMapPolyfill();
        // [[Metadata]] internal slot
        // https://rbuckton.github.io/reflect-metadata/#ordinary-object-internal-methods-and-internal-slots
        var Metadata = new _WeakMap();
        /**
         * Applies a set of decorators to a property of a target object.
         * @param decorators An array of decorators.
         * @param target The target object.
         * @param propertyKey (Optional) The property key to decorate.
         * @param attributes (Optional) The property descriptor for the target key.
         * @remarks Decorators are applied in reverse order.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     Example = Reflect.decorate(decoratorsArray, Example);
         *
         *     // property (on constructor)
         *     Reflect.decorate(decoratorsArray, Example, "staticProperty");
         *
         *     // property (on prototype)
         *     Reflect.decorate(decoratorsArray, Example.prototype, "property");
         *
         *     // method (on constructor)
         *     Object.defineProperty(Example, "staticMethod",
         *         Reflect.decorate(decoratorsArray, Example, "staticMethod",
         *             Object.getOwnPropertyDescriptor(Example, "staticMethod")));
         *
         *     // method (on prototype)
         *     Object.defineProperty(Example.prototype, "method",
         *         Reflect.decorate(decoratorsArray, Example.prototype, "method",
         *             Object.getOwnPropertyDescriptor(Example.prototype, "method")));
         *
         */
        function decorate(decorators, target, propertyKey, attributes) {
            if (!IsUndefined(propertyKey)) {
                if (!IsArray(decorators))
                    throw new TypeError();
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsObject(attributes) && !IsUndefined(attributes) && !IsNull(attributes))
                    throw new TypeError();
                if (IsNull(attributes))
                    attributes = undefined;
                propertyKey = ToPropertyKey(propertyKey);
                return DecorateProperty(decorators, target, propertyKey, attributes);
            }
            else {
                if (!IsArray(decorators))
                    throw new TypeError();
                if (!IsConstructor(target))
                    throw new TypeError();
                return DecorateConstructor(decorators, target);
            }
        }
        exporter("decorate", decorate);
        // 4.1.2 Reflect.metadata(metadataKey, metadataValue)
        // https://rbuckton.github.io/reflect-metadata/#reflect.metadata
        /**
         * A default metadata decorator factory that can be used on a class, class member, or parameter.
         * @param metadataKey The key for the metadata entry.
         * @param metadataValue The value for the metadata entry.
         * @returns A decorator function.
         * @remarks
         * If `metadataKey` is already defined for the target and target key, the
         * metadataValue for that key will be overwritten.
         * @example
         *
         *     // constructor
         *     @Reflect.metadata(key, value)
         *     class Example {
         *     }
         *
         *     // property (on constructor, TypeScript only)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         static staticProperty;
         *     }
         *
         *     // property (on prototype, TypeScript only)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         property;
         *     }
         *
         *     // method (on constructor)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         static staticMethod() { }
         *     }
         *
         *     // method (on prototype)
         *     class Example {
         *         @Reflect.metadata(key, value)
         *         method() { }
         *     }
         *
         */
        function metadata(metadataKey, metadataValue) {
            function decorator(target, propertyKey) {
                if (!IsObject(target))
                    throw new TypeError();
                if (!IsUndefined(propertyKey) && !IsPropertyKey(propertyKey))
                    throw new TypeError();
                OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
            }
            return decorator;
        }
        exporter("metadata", metadata);
        /**
         * Define a unique metadata entry on the target.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param metadataValue A value that contains attached metadata.
         * @param target The target object on which to define metadata.
         * @param propertyKey (Optional) The property key for the target.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     Reflect.defineMetadata("custom:annotation", options, Example);
         *
         *     // property (on constructor)
         *     Reflect.defineMetadata("custom:annotation", options, Example, "staticProperty");
         *
         *     // property (on prototype)
         *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "property");
         *
         *     // method (on constructor)
         *     Reflect.defineMetadata("custom:annotation", options, Example, "staticMethod");
         *
         *     // method (on prototype)
         *     Reflect.defineMetadata("custom:annotation", options, Example.prototype, "method");
         *
         *     // decorator factory as metadata-producing annotation.
         *     function MyAnnotation(options): Decorator {
         *         return (target, key?) => Reflect.defineMetadata("custom:annotation", options, target, key);
         *     }
         *
         */
        function defineMetadata(metadataKey, metadataValue, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryDefineOwnMetadata(metadataKey, metadataValue, target, propertyKey);
        }
        exporter("defineMetadata", defineMetadata);
        /**
         * Gets a value indicating whether the target object or its prototype chain has the provided metadata key defined.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata key was defined on the target object or its prototype chain; otherwise, `false`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.hasMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.hasMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.hasMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.hasMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function hasMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryHasMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasMetadata", hasMetadata);
        /**
         * Gets a value indicating whether the target object has the provided metadata key defined.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata key was defined on the target object; otherwise, `false`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.hasOwnMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function hasOwnMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryHasOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("hasOwnMetadata", hasOwnMetadata);
        /**
         * Gets the metadata value for the provided metadata key on the target object or its prototype chain.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function getMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryGetMetadata(metadataKey, target, propertyKey);
        }
        exporter("getMetadata", getMetadata);
        /**
         * Gets the metadata value for the provided metadata key on the target object.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns The metadata value for the metadata key if found; otherwise, `undefined`.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getOwnMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getOwnMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function getOwnMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryGetOwnMetadata(metadataKey, target, propertyKey);
        }
        exporter("getOwnMetadata", getOwnMetadata);
        /**
         * Gets the metadata keys defined on the target object or its prototype chain.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns An array of unique metadata keys.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getMetadataKeys(Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getMetadataKeys(Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getMetadataKeys(Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getMetadataKeys(Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getMetadataKeys(Example.prototype, "method");
         *
         */
        function getMetadataKeys(target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryMetadataKeys(target, propertyKey);
        }
        exporter("getMetadataKeys", getMetadataKeys);
        /**
         * Gets the unique metadata keys defined on the target object.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns An array of unique metadata keys.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.getOwnMetadataKeys(Example);
         *
         *     // property (on constructor)
         *     result = Reflect.getOwnMetadataKeys(Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.getOwnMetadataKeys(Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.getOwnMetadataKeys(Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.getOwnMetadataKeys(Example.prototype, "method");
         *
         */
        function getOwnMetadataKeys(target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            return OrdinaryOwnMetadataKeys(target, propertyKey);
        }
        exporter("getOwnMetadataKeys", getOwnMetadataKeys);
        /**
         * Deletes the metadata entry from the target object with the provided key.
         * @param metadataKey A key used to store and retrieve metadata.
         * @param target The target object on which the metadata is defined.
         * @param propertyKey (Optional) The property key for the target.
         * @returns `true` if the metadata entry was found and deleted; otherwise, false.
         * @example
         *
         *     class Example {
         *         // property declarations are not part of ES6, though they are valid in TypeScript:
         *         // static staticProperty;
         *         // property;
         *
         *         constructor(p) { }
         *         static staticMethod(p) { }
         *         method(p) { }
         *     }
         *
         *     // constructor
         *     result = Reflect.deleteMetadata("custom:annotation", Example);
         *
         *     // property (on constructor)
         *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticProperty");
         *
         *     // property (on prototype)
         *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "property");
         *
         *     // method (on constructor)
         *     result = Reflect.deleteMetadata("custom:annotation", Example, "staticMethod");
         *
         *     // method (on prototype)
         *     result = Reflect.deleteMetadata("custom:annotation", Example.prototype, "method");
         *
         */
        function deleteMetadata(metadataKey, target, propertyKey) {
            if (!IsObject(target))
                throw new TypeError();
            if (!IsUndefined(propertyKey))
                propertyKey = ToPropertyKey(propertyKey);
            var metadataMap = GetOrCreateMetadataMap(target, propertyKey, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return false;
            if (!metadataMap.delete(metadataKey))
                return false;
            if (metadataMap.size > 0)
                return true;
            var targetMetadata = Metadata.get(target);
            targetMetadata.delete(propertyKey);
            if (targetMetadata.size > 0)
                return true;
            Metadata.delete(target);
            return true;
        }
        exporter("deleteMetadata", deleteMetadata);
        function DecorateConstructor(decorators, target) {
            for (var i = decorators.length - 1; i >= 0; --i) {
                var decorator = decorators[i];
                var decorated = decorator(target);
                if (!IsUndefined(decorated) && !IsNull(decorated)) {
                    if (!IsConstructor(decorated))
                        throw new TypeError();
                    target = decorated;
                }
            }
            return target;
        }
        function DecorateProperty(decorators, target, propertyKey, descriptor) {
            for (var i = decorators.length - 1; i >= 0; --i) {
                var decorator = decorators[i];
                var decorated = decorator(target, propertyKey, descriptor);
                if (!IsUndefined(decorated) && !IsNull(decorated)) {
                    if (!IsObject(decorated))
                        throw new TypeError();
                    descriptor = decorated;
                }
            }
            return descriptor;
        }
        function GetOrCreateMetadataMap(O, P, Create) {
            var targetMetadata = Metadata.get(O);
            if (IsUndefined(targetMetadata)) {
                if (!Create)
                    return undefined;
                targetMetadata = new _Map();
                Metadata.set(O, targetMetadata);
            }
            var metadataMap = targetMetadata.get(P);
            if (IsUndefined(metadataMap)) {
                if (!Create)
                    return undefined;
                metadataMap = new _Map();
                targetMetadata.set(P, metadataMap);
            }
            return metadataMap;
        }
        // 3.1.1.1 OrdinaryHasMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryhasmetadata
        function OrdinaryHasMetadata(MetadataKey, O, P) {
            var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
            if (hasOwn)
                return true;
            var parent = OrdinaryGetPrototypeOf(O);
            if (!IsNull(parent))
                return OrdinaryHasMetadata(MetadataKey, parent, P);
            return false;
        }
        // 3.1.2.1 OrdinaryHasOwnMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryhasownmetadata
        function OrdinaryHasOwnMetadata(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return false;
            return ToBoolean(metadataMap.has(MetadataKey));
        }
        // 3.1.3.1 OrdinaryGetMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarygetmetadata
        function OrdinaryGetMetadata(MetadataKey, O, P) {
            var hasOwn = OrdinaryHasOwnMetadata(MetadataKey, O, P);
            if (hasOwn)
                return OrdinaryGetOwnMetadata(MetadataKey, O, P);
            var parent = OrdinaryGetPrototypeOf(O);
            if (!IsNull(parent))
                return OrdinaryGetMetadata(MetadataKey, parent, P);
            return undefined;
        }
        // 3.1.4.1 OrdinaryGetOwnMetadata(MetadataKey, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarygetownmetadata
        function OrdinaryGetOwnMetadata(MetadataKey, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return undefined;
            return metadataMap.get(MetadataKey);
        }
        // 3.1.5.1 OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarydefineownmetadata
        function OrdinaryDefineOwnMetadata(MetadataKey, MetadataValue, O, P) {
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ true);
            metadataMap.set(MetadataKey, MetadataValue);
        }
        // 3.1.6.1 OrdinaryMetadataKeys(O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinarymetadatakeys
        function OrdinaryMetadataKeys(O, P) {
            var ownKeys = OrdinaryOwnMetadataKeys(O, P);
            var parent = OrdinaryGetPrototypeOf(O);
            if (parent === null)
                return ownKeys;
            var parentKeys = OrdinaryMetadataKeys(parent, P);
            if (parentKeys.length <= 0)
                return ownKeys;
            if (ownKeys.length <= 0)
                return parentKeys;
            var set = new _Set();
            var keys = [];
            for (var _i = 0, ownKeys_1 = ownKeys; _i < ownKeys_1.length; _i++) {
                var key = ownKeys_1[_i];
                var hasKey = set.has(key);
                if (!hasKey) {
                    set.add(key);
                    keys.push(key);
                }
            }
            for (var _a = 0, parentKeys_1 = parentKeys; _a < parentKeys_1.length; _a++) {
                var key = parentKeys_1[_a];
                var hasKey = set.has(key);
                if (!hasKey) {
                    set.add(key);
                    keys.push(key);
                }
            }
            return keys;
        }
        // 3.1.7.1 OrdinaryOwnMetadataKeys(O, P)
        // https://rbuckton.github.io/reflect-metadata/#ordinaryownmetadatakeys
        function OrdinaryOwnMetadataKeys(O, P) {
            var keys = [];
            var metadataMap = GetOrCreateMetadataMap(O, P, /*Create*/ false);
            if (IsUndefined(metadataMap))
                return keys;
            var keysObj = metadataMap.keys();
            var iterator = GetIterator(keysObj);
            var k = 0;
            while (true) {
                var next = IteratorStep(iterator);
                if (!next) {
                    keys.length = k;
                    return keys;
                }
                var nextValue = IteratorValue(next);
                try {
                    keys[k] = nextValue;
                }
                catch (e) {
                    try {
                        IteratorClose(iterator);
                    }
                    finally {
                        throw e;
                    }
                }
                k++;
            }
        }
        // 6 ECMAScript Data Typ0es and Values
        // https://tc39.github.io/ecma262/#sec-ecmascript-data-types-and-values
        function Type(x) {
            if (x === null)
                return 1 /* Null */;
            switch (typeof x) {
                case "undefined": return 0 /* Undefined */;
                case "boolean": return 2 /* Boolean */;
                case "string": return 3 /* String */;
                case "symbol": return 4 /* Symbol */;
                case "number": return 5 /* Number */;
                case "object": return x === null ? 1 /* Null */ : 6 /* Object */;
                default: return 6 /* Object */;
            }
        }
        // 6.1.1 The Undefined Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-undefined-type
        function IsUndefined(x) {
            return x === undefined;
        }
        // 6.1.2 The Null Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-null-type
        function IsNull(x) {
            return x === null;
        }
        // 6.1.5 The Symbol Type
        // https://tc39.github.io/ecma262/#sec-ecmascript-language-types-symbol-type
        function IsSymbol(x) {
            return typeof x === "symbol";
        }
        // 6.1.7 The Object Type
        // https://tc39.github.io/ecma262/#sec-object-type
        function IsObject(x) {
            return typeof x === "object" ? x !== null : typeof x === "function";
        }
        // 7.1 Type Conversion
        // https://tc39.github.io/ecma262/#sec-type-conversion
        // 7.1.1 ToPrimitive(input [, PreferredType])
        // https://tc39.github.io/ecma262/#sec-toprimitive
        function ToPrimitive(input, PreferredType) {
            switch (Type(input)) {
                case 0 /* Undefined */: return input;
                case 1 /* Null */: return input;
                case 2 /* Boolean */: return input;
                case 3 /* String */: return input;
                case 4 /* Symbol */: return input;
                case 5 /* Number */: return input;
            }
            var hint = PreferredType === 3 /* String */ ? "string" : PreferredType === 5 /* Number */ ? "number" : "default";
            var exoticToPrim = GetMethod(input, toPrimitiveSymbol);
            if (exoticToPrim !== undefined) {
                var result = exoticToPrim.call(input, hint);
                if (IsObject(result))
                    throw new TypeError();
                return result;
            }
            return OrdinaryToPrimitive(input, hint === "default" ? "number" : hint);
        }
        // 7.1.1.1 OrdinaryToPrimitive(O, hint)
        // https://tc39.github.io/ecma262/#sec-ordinarytoprimitive
        function OrdinaryToPrimitive(O, hint) {
            if (hint === "string") {
                var toString_1 = O.toString;
                if (IsCallable(toString_1)) {
                    var result = toString_1.call(O);
                    if (!IsObject(result))
                        return result;
                }
                var valueOf = O.valueOf;
                if (IsCallable(valueOf)) {
                    var result = valueOf.call(O);
                    if (!IsObject(result))
                        return result;
                }
            }
            else {
                var valueOf = O.valueOf;
                if (IsCallable(valueOf)) {
                    var result = valueOf.call(O);
                    if (!IsObject(result))
                        return result;
                }
                var toString_2 = O.toString;
                if (IsCallable(toString_2)) {
                    var result = toString_2.call(O);
                    if (!IsObject(result))
                        return result;
                }
            }
            throw new TypeError();
        }
        // 7.1.2 ToBoolean(argument)
        // https://tc39.github.io/ecma262/2016/#sec-toboolean
        function ToBoolean(argument) {
            return !!argument;
        }
        // 7.1.12 ToString(argument)
        // https://tc39.github.io/ecma262/#sec-tostring
        function ToString(argument) {
            return "" + argument;
        }
        // 7.1.14 ToPropertyKey(argument)
        // https://tc39.github.io/ecma262/#sec-topropertykey
        function ToPropertyKey(argument) {
            var key = ToPrimitive(argument, 3 /* String */);
            if (IsSymbol(key))
                return key;
            return ToString(key);
        }
        // 7.2 Testing and Comparison Operations
        // https://tc39.github.io/ecma262/#sec-testing-and-comparison-operations
        // 7.2.2 IsArray(argument)
        // https://tc39.github.io/ecma262/#sec-isarray
        function IsArray(argument) {
            return Array.isArray
                ? Array.isArray(argument)
                : argument instanceof Object
                    ? argument instanceof Array
                    : Object.prototype.toString.call(argument) === "[object Array]";
        }
        // 7.2.3 IsCallable(argument)
        // https://tc39.github.io/ecma262/#sec-iscallable
        function IsCallable(argument) {
            // NOTE: This is an approximation as we cannot check for [[Call]] internal method.
            return typeof argument === "function";
        }
        // 7.2.4 IsConstructor(argument)
        // https://tc39.github.io/ecma262/#sec-isconstructor
        function IsConstructor(argument) {
            // NOTE: This is an approximation as we cannot check for [[Construct]] internal method.
            return typeof argument === "function";
        }
        // 7.2.7 IsPropertyKey(argument)
        // https://tc39.github.io/ecma262/#sec-ispropertykey
        function IsPropertyKey(argument) {
            switch (Type(argument)) {
                case 3 /* String */: return true;
                case 4 /* Symbol */: return true;
                default: return false;
            }
        }
        // 7.3 Operations on Objects
        // https://tc39.github.io/ecma262/#sec-operations-on-objects
        // 7.3.9 GetMethod(V, P)
        // https://tc39.github.io/ecma262/#sec-getmethod
        function GetMethod(V, P) {
            var func = V[P];
            if (func === undefined || func === null)
                return undefined;
            if (!IsCallable(func))
                throw new TypeError();
            return func;
        }
        // 7.4 Operations on Iterator Objects
        // https://tc39.github.io/ecma262/#sec-operations-on-iterator-objects
        function GetIterator(obj) {
            var method = GetMethod(obj, iteratorSymbol);
            if (!IsCallable(method))
                throw new TypeError(); // from Call
            var iterator = method.call(obj);
            if (!IsObject(iterator))
                throw new TypeError();
            return iterator;
        }
        // 7.4.4 IteratorValue(iterResult)
        // https://tc39.github.io/ecma262/2016/#sec-iteratorvalue
        function IteratorValue(iterResult) {
            return iterResult.value;
        }
        // 7.4.5 IteratorStep(iterator)
        // https://tc39.github.io/ecma262/#sec-iteratorstep
        function IteratorStep(iterator) {
            var result = iterator.next();
            return result.done ? false : result;
        }
        // 7.4.6 IteratorClose(iterator, completion)
        // https://tc39.github.io/ecma262/#sec-iteratorclose
        function IteratorClose(iterator) {
            var f = iterator["return"];
            if (f)
                f.call(iterator);
        }
        // 9.1 Ordinary Object Internal Methods and Internal Slots
        // https://tc39.github.io/ecma262/#sec-ordinary-object-internal-methods-and-internal-slots
        // 9.1.1.1 OrdinaryGetPrototypeOf(O)
        // https://tc39.github.io/ecma262/#sec-ordinarygetprototypeof
        function OrdinaryGetPrototypeOf(O) {
            var proto = Object.getPrototypeOf(O);
            if (typeof O !== "function" || O === functionPrototype)
                return proto;
            // TypeScript doesn't set __proto__ in ES5, as it's non-standard.
            // Try to determine the superclass constructor. Compatible implementations
            // must either set __proto__ on a subclass constructor to the superclass constructor,
            // or ensure each class has a valid `constructor` property on its prototype that
            // points back to the constructor.
            // If this is not the same as Function.[[Prototype]], then this is definately inherited.
            // This is the case when in ES6 or when using __proto__ in a compatible browser.
            if (proto !== functionPrototype)
                return proto;
            // If the super prototype is Object.prototype, null, or undefined, then we cannot determine the heritage.
            var prototype = O.prototype;
            var prototypeProto = prototype && Object.getPrototypeOf(prototype);
            if (prototypeProto == null || prototypeProto === Object.prototype)
                return proto;
            // If the constructor was not a function, then we cannot determine the heritage.
            var constructor = prototypeProto.constructor;
            if (typeof constructor !== "function")
                return proto;
            // If we have some kind of self-reference, then we cannot determine the heritage.
            if (constructor === O)
                return proto;
            // we have a pretty good guess at the heritage.
            return constructor;
        }
        // naive Map shim
        function CreateMapPolyfill() {
            var cacheSentinel = {};
            var arraySentinel = [];
            var MapIterator = /** @class */ (function () {
                function MapIterator(keys, values, selector) {
                    this._index = 0;
                    this._keys = keys;
                    this._values = values;
                    this._selector = selector;
                }
                MapIterator.prototype["@@iterator"] = function () { return this; };
                MapIterator.prototype[iteratorSymbol] = function () { return this; };
                MapIterator.prototype.next = function () {
                    var index = this._index;
                    if (index >= 0 && index < this._keys.length) {
                        var result = this._selector(this._keys[index], this._values[index]);
                        if (index + 1 >= this._keys.length) {
                            this._index = -1;
                            this._keys = arraySentinel;
                            this._values = arraySentinel;
                        }
                        else {
                            this._index++;
                        }
                        return { value: result, done: false };
                    }
                    return { value: undefined, done: true };
                };
                MapIterator.prototype.throw = function (error) {
                    if (this._index >= 0) {
                        this._index = -1;
                        this._keys = arraySentinel;
                        this._values = arraySentinel;
                    }
                    throw error;
                };
                MapIterator.prototype.return = function (value) {
                    if (this._index >= 0) {
                        this._index = -1;
                        this._keys = arraySentinel;
                        this._values = arraySentinel;
                    }
                    return { value: value, done: true };
                };
                return MapIterator;
            }());
            return /** @class */ (function () {
                function Map() {
                    this._keys = [];
                    this._values = [];
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                }
                Object.defineProperty(Map.prototype, "size", {
                    get: function () { return this._keys.length; },
                    enumerable: true,
                    configurable: true
                });
                Map.prototype.has = function (key) { return this._find(key, /*insert*/ false) >= 0; };
                Map.prototype.get = function (key) {
                    var index = this._find(key, /*insert*/ false);
                    return index >= 0 ? this._values[index] : undefined;
                };
                Map.prototype.set = function (key, value) {
                    var index = this._find(key, /*insert*/ true);
                    this._values[index] = value;
                    return this;
                };
                Map.prototype.delete = function (key) {
                    var index = this._find(key, /*insert*/ false);
                    if (index >= 0) {
                        var size = this._keys.length;
                        for (var i = index + 1; i < size; i++) {
                            this._keys[i - 1] = this._keys[i];
                            this._values[i - 1] = this._values[i];
                        }
                        this._keys.length--;
                        this._values.length--;
                        if (key === this._cacheKey) {
                            this._cacheKey = cacheSentinel;
                            this._cacheIndex = -2;
                        }
                        return true;
                    }
                    return false;
                };
                Map.prototype.clear = function () {
                    this._keys.length = 0;
                    this._values.length = 0;
                    this._cacheKey = cacheSentinel;
                    this._cacheIndex = -2;
                };
                Map.prototype.keys = function () { return new MapIterator(this._keys, this._values, getKey); };
                Map.prototype.values = function () { return new MapIterator(this._keys, this._values, getValue); };
                Map.prototype.entries = function () { return new MapIterator(this._keys, this._values, getEntry); };
                Map.prototype["@@iterator"] = function () { return this.entries(); };
                Map.prototype[iteratorSymbol] = function () { return this.entries(); };
                Map.prototype._find = function (key, insert) {
                    if (this._cacheKey !== key) {
                        this._cacheIndex = this._keys.indexOf(this._cacheKey = key);
                    }
                    if (this._cacheIndex < 0 && insert) {
                        this._cacheIndex = this._keys.length;
                        this._keys.push(key);
                        this._values.push(undefined);
                    }
                    return this._cacheIndex;
                };
                return Map;
            }());
            function getKey(key, _) {
                return key;
            }
            function getValue(_, value) {
                return value;
            }
            function getEntry(key, value) {
                return [key, value];
            }
        }
        // naive Set shim
        function CreateSetPolyfill() {
            return /** @class */ (function () {
                function Set() {
                    this._map = new _Map();
                }
                Object.defineProperty(Set.prototype, "size", {
                    get: function () { return this._map.size; },
                    enumerable: true,
                    configurable: true
                });
                Set.prototype.has = function (value) { return this._map.has(value); };
                Set.prototype.add = function (value) { return this._map.set(value, value), this; };
                Set.prototype.delete = function (value) { return this._map.delete(value); };
                Set.prototype.clear = function () { this._map.clear(); };
                Set.prototype.keys = function () { return this._map.keys(); };
                Set.prototype.values = function () { return this._map.values(); };
                Set.prototype.entries = function () { return this._map.entries(); };
                Set.prototype["@@iterator"] = function () { return this.keys(); };
                Set.prototype[iteratorSymbol] = function () { return this.keys(); };
                return Set;
            }());
        }
        // naive WeakMap shim
        function CreateWeakMapPolyfill() {
            var UUID_SIZE = 16;
            var keys = HashMap.create();
            var rootKey = CreateUniqueKey();
            return /** @class */ (function () {
                function WeakMap() {
                    this._key = CreateUniqueKey();
                }
                WeakMap.prototype.has = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? HashMap.has(table, this._key) : false;
                };
                WeakMap.prototype.get = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? HashMap.get(table, this._key) : undefined;
                };
                WeakMap.prototype.set = function (target, value) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ true);
                    table[this._key] = value;
                    return this;
                };
                WeakMap.prototype.delete = function (target) {
                    var table = GetOrCreateWeakMapTable(target, /*create*/ false);
                    return table !== undefined ? delete table[this._key] : false;
                };
                WeakMap.prototype.clear = function () {
                    // NOTE: not a real clear, just makes the previous data unreachable
                    this._key = CreateUniqueKey();
                };
                return WeakMap;
            }());
            function CreateUniqueKey() {
                var key;
                do
                    key = "@@WeakMap@@" + CreateUUID();
                while (HashMap.has(keys, key));
                keys[key] = true;
                return key;
            }
            function GetOrCreateWeakMapTable(target, create) {
                if (!hasOwn.call(target, rootKey)) {
                    if (!create)
                        return undefined;
                    Object.defineProperty(target, rootKey, { value: HashMap.create() });
                }
                return target[rootKey];
            }
            function FillRandomBytes(buffer, size) {
                for (var i = 0; i < size; ++i)
                    buffer[i] = Math.random() * 0xff | 0;
                return buffer;
            }
            function GenRandomBytes(size) {
                if (typeof Uint8Array === "function") {
                    if (typeof crypto !== "undefined")
                        return crypto.getRandomValues(new Uint8Array(size));
                    if (typeof msCrypto !== "undefined")
                        return msCrypto.getRandomValues(new Uint8Array(size));
                    return FillRandomBytes(new Uint8Array(size), size);
                }
                return FillRandomBytes(new Array(size), size);
            }
            function CreateUUID() {
                var data = GenRandomBytes(UUID_SIZE);
                // mark as random - RFC 4122 § 4.4
                data[6] = data[6] & 0x4f | 0x40;
                data[8] = data[8] & 0xbf | 0x80;
                var result = "";
                for (var offset = 0; offset < UUID_SIZE; ++offset) {
                    var byte = data[offset];
                    if (offset === 4 || offset === 6 || offset === 8)
                        result += "-";
                    if (byte < 16)
                        result += "0";
                    result += byte.toString(16).toLowerCase();
                }
                return result;
            }
        }
        // uses a heuristic used by v8 and chakra to force an object into dictionary mode.
        function MakeDictionary(obj) {
            obj.__ = undefined;
            delete obj.__;
            return obj;
        }
    });
})(Reflect || (Reflect = {}));

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__(/*! ./../process/browser.js */ "./node_modules/process/browser.js"), __webpack_require__(/*! ./../webpack/buildin/global.js */ "./node_modules/webpack/buildin/global.js")))

/***/ }),

/***/ "./node_modules/uuid/index.js":
/*!************************************!*\
  !*** ./node_modules/uuid/index.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var v1 = __webpack_require__(/*! ./v1 */ "./node_modules/uuid/v1.js");
var v4 = __webpack_require__(/*! ./v4 */ "./node_modules/uuid/v4.js");

var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;

module.exports = uuid;


/***/ }),

/***/ "./node_modules/uuid/lib/bytesToUuid.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/bytesToUuid.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/**
 * Convert array of 16 byte values to UUID string format of the form:
 * XXXXXXXX-XXXX-XXXX-XXXX-XXXXXXXXXXXX
 */
var byteToHex = [];
for (var i = 0; i < 256; ++i) {
  byteToHex[i] = (i + 0x100).toString(16).substr(1);
}

function bytesToUuid(buf, offset) {
  var i = offset || 0;
  var bth = byteToHex;
  // join used to fix memory issue caused by concatenation: https://bugs.chromium.org/p/v8/issues/detail?id=3175#c4
  return ([
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]], '-',
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]],
    bth[buf[i++]], bth[buf[i++]]
  ]).join('');
}

module.exports = bytesToUuid;


/***/ }),

/***/ "./node_modules/uuid/lib/rng-browser.js":
/*!**********************************************!*\
  !*** ./node_modules/uuid/lib/rng-browser.js ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

// Unique ID creation requires a high quality random # generator.  In the
// browser this is a little complicated due to unknown quality of Math.random()
// and inconsistent support for the `crypto` API.  We do the best we can via
// feature-detection

// getRandomValues needs to be invoked in a context where "this" is a Crypto
// implementation. Also, find the complete implementation of crypto on IE11.
var getRandomValues = (typeof(crypto) != 'undefined' && crypto.getRandomValues && crypto.getRandomValues.bind(crypto)) ||
                      (typeof(msCrypto) != 'undefined' && typeof window.msCrypto.getRandomValues == 'function' && msCrypto.getRandomValues.bind(msCrypto));

if (getRandomValues) {
  // WHATWG crypto RNG - http://wiki.whatwg.org/wiki/Crypto
  var rnds8 = new Uint8Array(16); // eslint-disable-line no-undef

  module.exports = function whatwgRNG() {
    getRandomValues(rnds8);
    return rnds8;
  };
} else {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var rnds = new Array(16);

  module.exports = function mathRNG() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return rnds;
  };
}


/***/ }),

/***/ "./node_modules/uuid/v1.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v1.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js");

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

var _nodeId;
var _clockseq;

// Previous uuid creation time
var _lastMSecs = 0;
var _lastNSecs = 0;

// See https://github.com/uuidjs/uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};
  var node = options.node || _nodeId;
  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // node and clockseq need to be initialized to random values if they're not
  // specified.  We do this lazily to minimize issues related to insufficient
  // system entropy.  See #189
  if (node == null || clockseq == null) {
    var seedBytes = rng();
    if (node == null) {
      // Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
      node = _nodeId = [
        seedBytes[0] | 0x01,
        seedBytes[1], seedBytes[2], seedBytes[3], seedBytes[4], seedBytes[5]
      ];
    }
    if (clockseq == null) {
      // Per 4.2.2, randomize (14 bit) clockseq
      clockseq = _clockseq = (seedBytes[6] << 8 | seedBytes[7]) & 0x3fff;
    }
  }

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  for (var n = 0; n < 6; ++n) {
    b[i + n] = node[n];
  }

  return buf ? buf : bytesToUuid(b);
}

module.exports = v1;


/***/ }),

/***/ "./node_modules/uuid/v4.js":
/*!*********************************!*\
  !*** ./node_modules/uuid/v4.js ***!
  \*********************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

var rng = __webpack_require__(/*! ./lib/rng */ "./node_modules/uuid/lib/rng-browser.js");
var bytesToUuid = __webpack_require__(/*! ./lib/bytesToUuid */ "./node_modules/uuid/lib/bytesToUuid.js");

function v4(options, buf, offset) {
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options === 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ++ii) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || bytesToUuid(rnds);
}

module.exports = v4;


/***/ }),

/***/ "./node_modules/webpack/buildin/global.js":
/*!***********************************!*\
  !*** (webpack)/buildin/global.js ***!
  \***********************************/
/*! no static exports found */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "./src/browser/custom.ts":
/*!*******************************!*\
  !*** ./src/browser/custom.ts ***!
  \*******************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

"use strict";

/********************************************************************************
 * Copyright (C) 2023 HuaweiCloud All rights reserved.
 * SPDX-License-Identifier: MIT
 ********************************************************************************/
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const plugin_api_1 = __webpack_require__(/*! @codearts/core/lib/browser/plugin-api */ "./node_modules/@codearts/core/lib/browser/plugin-api.js");
const plugin_common_1 = __webpack_require__(/*! @codearts/core/lib/common/plugin-common */ "./node_modules/@codearts/core/lib/common/plugin-common.js");
const messaging_1 = __webpack_require__(/*! @cloudide/messaging */ "./node_modules/@cloudide/messaging/messaging.js");
let CustomWebviewPageAPI = class CustomWebviewPageAPI extends plugin_api_1.AbstractFrontend {
    /**
     * function call to the frontend will wait until init() to be resolved
     */
    init() {
        return __awaiter(this, void 0, void 0, function* () {
        });
    }
    run() {
        const info = document.createElement('p');
        info.innerText = 'Info in custom.ts from dialog-demo';
        document.body.appendChild(info);
        this.plugin.log(plugin_common_1.LogLevel.INFO, 'dynamic webview page loaded!');
    }
    stop() {
    }
    print(message) {
        document.body.appendChild(document.createElement('pre').appendChild(document.createTextNode(`print function called, param: ${message}`)));
        return "myplugin.dynamic.page.print called";
    }
};
__decorate([
    (0, messaging_1.expose)('myplugin.dynamic.page.print'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", String)
], CustomWebviewPageAPI.prototype, "print", null);
CustomWebviewPageAPI = __decorate([
    messaging_1.exposable
], CustomWebviewPageAPI);
document.addEventListener('DOMContentLoaded', function () {
    return __awaiter(this, void 0, void 0, function* () {
        plugin_api_1.PluginPage.create([CustomWebviewPageAPI]);
    });
});


/***/ })

/******/ });
});
//# sourceMappingURL=custom.js.map