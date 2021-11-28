"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConnectModal = void 0;
var react_1 = __importStar(require("react"));
var react_modal_1 = __importDefault(require("react-modal"));
var constants_1 = require("../constants");
var screens_1 = require("../screens");
var use_contractkit_1 = require("../use-contractkit");
var utils_1 = require("../utils");
var providers = [
    {
        name: constants_1.SupportedProviders.Valora,
        description: 'A mobile payments app that works worldwide',
        image: constants_1.images.Valora,
    },
    {
        name: constants_1.SupportedProviders.WalletConnect,
        description: 'Scan a QR code to connect your wallet',
        image: constants_1.images['Wallet Connect'],
    },
];
!utils_1.isMobile &&
    providers.push({
        name: constants_1.SupportedProviders.Ledger,
        description: 'Connect to your Ledger wallet',
        image: constants_1.images.Ledger,
    });
providers.push({
    name: constants_1.SupportedProviders.PrivateKey,
    description: 'Enter a plaintext private key to load your account',
    image: (react_1.default.createElement("svg", { className: "dark:tw-text-gray-300", style: { height: '24px', width: '24px' }, "aria-hidden": "true", focusable: "false", "data-prefix": "fas", "data-icon": "key", role: "img", xmlns: "http://www.w3.org/2000/svg", viewBox: "0 0 512 512" },
        react_1.default.createElement("path", { fill: "currentColor", d: "M512 176.001C512 273.203 433.202 352 336 352c-11.22 0-22.19-1.062-32.827-3.069l-24.012 27.014A23.999 23.999 0 0 1 261.223 384H224v40c0 13.255-10.745 24-24 24h-40v40c0 13.255-10.745 24-24 24H24c-13.255 0-24-10.745-24-24v-78.059c0-6.365 2.529-12.47 7.029-16.971l161.802-161.802C163.108 213.814 160 195.271 160 176 160 78.798 238.797.001 335.999 0 433.488-.001 512 78.511 512 176.001zM336 128c0 26.51 21.49 48 48 48s48-21.49 48-48-21.49-48-48-48-48 21.49-48 48z" }))),
});
function defaultRenderProvider(provider) {
    return (react_1.default.createElement("div", { className: "tw-flex tw-cursor-pointer tw-py-5 tw-px-4 hover:tw-bg-gray-100 dark:hover:tw-bg-gray-700 tw-transition tw-rounded-md", onClick: provider.onClick, key: provider.name.trim() },
        react_1.default.createElement("div", { className: "tw-flex tw-w-1/4" },
            react_1.default.createElement("span", { className: "tw-my-auto" }, typeof provider.image === 'string' ? (react_1.default.createElement("img", { src: provider.image, alt: provider.name + " logo", style: { height: '48px', width: '48px' } })) : (provider.image))),
        react_1.default.createElement("div", { className: "tw-w-3/4" },
            react_1.default.createElement("div", { className: "tw-text-lg tw-pb-1 tw-font-medium dark:tw-text-gray-300" }, provider.name),
            react_1.default.createElement("div", { className: "tw-text-sm tw-text-gray-600 dark:tw-text-gray-400" }, provider.description))));
}
function ConnectModal(_a) {
    var _this = this;
    var reactModalProps = _a.reactModalProps, _b = _a.renderProvider, renderProvider = _b === void 0 ? defaultRenderProvider : _b, _c = _a.screens, screens = _c === void 0 ? screens_1.defaultScreens : _c;
    var connectionCallback = use_contractkit_1.useContractKit().connectionCallback;
    var _d = react_1.useState(null), adding = _d[0], setAdding = _d[1];
    var close = function () { return __awaiter(_this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            setAdding(null);
            connectionCallback(false);
            return [2 /*return*/];
        });
    }); };
    function onSubmit(connector) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                setAdding(null);
                connectionCallback(connector);
                return [2 /*return*/];
            });
        });
    }
    var list = (react_1.default.createElement("div", null, Object.keys(screens)
        .map(function (screen) { return providers.find(function (p) { return p.name === screen; }); })
        .filter(Boolean)
        .map(function (provider) {
        return renderProvider(__assign(__assign({}, provider), { onClick: function () { return setAdding(provider.name); } }));
    })));
    var component;
    if (adding) {
        var ProviderElement = screens === null || screens === void 0 ? void 0 : screens[adding];
        if (!ProviderElement) {
            return null;
        }
        component = react_1.default.createElement(ProviderElement, { onSubmit: onSubmit });
    }
    else {
        component = list;
    }
    return (react_1.default.createElement(react_modal_1.default, __assign({ isOpen: !!connectionCallback, onRequestClose: close }, (reactModalProps
        ? reactModalProps
        : {
            style: {
                content: {
                    top: '50%',
                    left: '50%',
                    right: 'auto',
                    bottom: 'auto',
                    transform: 'translate(-50%, -50%)',
                    border: 'unset',
                    background: 'unset',
                    padding: 'unset',
                },
            },
            overlayClassName: 'tw-fixed tw-bg-gray-100 dark:tw-bg-gray-700 tw-bg-opacity-75 tw-inset-0',
        })),
        react_1.default.createElement("div", { className: "use-ck tw-max-h-screen" },
            react_1.default.createElement("div", { className: "tw-relative tw-bg-white dark:tw-bg-gray-800 tw-border tw-border-gray-300 dark:tw-border-gray-900 tw-w-80 md:tw-w-96" },
                react_1.default.createElement("button", { onClick: close, className: "tw-absolute tw-top-4 tw-right-4 tw-text-gray-700 dark:tw-text-gray-400 hover:tw-text-gray-800 dark:hover:tw-text-gray-300 hover:tw-bg-gray-100 dark:hover:tw-bg-gray-700 tw-p-3 rounded-full" },
                    react_1.default.createElement("svg", { className: "tw-h-5 tw-w-5", xmlns: "http://www.w3.org/2000/svg", fill: "none", viewBox: "0 0 24 24", stroke: "currentColor" },
                        react_1.default.createElement("path", { strokeLinecap: "round", strokeLinejoin: "round", strokeWidth: 2, d: "M6 18L18 6M6 6l12 12" })),
                    ' '),
                react_1.default.createElement("div", { className: "tw-rounded-b-lg tw-px-5 tw-py-6" }, component)))));
}
exports.ConnectModal = ConnectModal;
