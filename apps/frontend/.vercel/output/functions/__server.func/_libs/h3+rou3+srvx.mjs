import { PassThrough, Readable } from "node:stream";
// ../../node_modules/.pnpm/srvx@1.0.8/node_modules/srvx/dist/_chunks/_url.mjs
function getNativeClass(key, current) {
	let C = globalThis[key] || current;
	let P = Object.getPrototypeOf(C);
	while (typeof P === "function" && P.prototype) {
		C = P;
		P = Object.getPrototypeOf(C);
	}
	return globalThis[key] = C;
}
function lazyInherit(target, source, sourceKey) {
	for (const key of [...Object.getOwnPropertyNames(source), ...Object.getOwnPropertySymbols(source)]) {
		if (key === "constructor") continue;
		const targetDesc = Object.getOwnPropertyDescriptor(target, key);
		const desc = Object.getOwnPropertyDescriptor(source, key);
		let modified = false;
		if (desc.get) {
			modified = true;
			desc.get = targetDesc?.get || function() {
				return this[sourceKey][key];
			};
		}
		if (desc.set) {
			modified = true;
			desc.set = targetDesc?.set || function(value) {
				this[sourceKey][key] = value;
			};
		}
		if (!targetDesc?.value && typeof desc.value === "function") {
			modified = true;
			desc.value = function(...args) {
				return this[sourceKey][key](...args);
			};
		}
		if (modified) Object.defineProperty(target, key, desc);
	}
}
var _needsNormRE = /(?:(?:^|\/)(?:\.|\.\.|%2e|%2e\.|\.%2e|%2e%2e)(?:\/|$))|[\\^#"<>{}`\x00-\x20\x7f-\uffff]/i;
var _searchNeedsNormRE = /[#"'<>\x00-\x20\x7f-\uffff]/;
var FastURL = /* @__PURE__ */ (() => {
	const NativeURL = globalThis.URL;
	const NativeSearchParams = globalThis.URLSearchParams;
	const FastURLSearchParams = class URLSearchParams {
		#owner;
		#params;
		constructor(owner) {
			this.#owner = owner;
		}
		static [Symbol.hasInstance](val) {
			return val instanceof NativeSearchParams;
		}
		_adopt(params) {
			this.#params = params;
		}
		get _params() {
			if (!this.#params) {
				const search = this.#owner.search;
				this.#params ??= new NativeSearchParams(search);
			}
			return this.#params;
		}
		#mutable() {
			this.#owner._url;
			return this.#params;
		}
		append(name, value) {
			this.#mutable().append(name, value);
		}
		set(name, value) {
			this.#mutable().set(name, value);
		}
		delete(name, value) {
			this.#mutable().delete(name, value);
		}
		sort() {
			this.#mutable().sort();
		}
	};
	lazyInherit(FastURLSearchParams.prototype, NativeSearchParams.prototype, "_params");
	Object.setPrototypeOf(FastURLSearchParams.prototype, NativeSearchParams.prototype);
	Object.setPrototypeOf(FastURLSearchParams, NativeSearchParams);
	const FastURL = class URL {
		#url;
		#href;
		#protocol;
		#host;
		#pathname;
		#search;
		#searchParams;
		#pos;
		constructor(url) {
			if (typeof url === "string") {
				const isOriginForm = url[0] === "/";
				if (isOriginForm && !_searchNeedsNormRE.test(url)) this.#href = `http://localhost${url}`;
				else this.#url = new NativeURL(isOriginForm ? `http://localhost${url}` : url);
			} else if (_needsNormRE.test(url.pathname) || url.search && _searchNeedsNormRE.test(url.search)) this.#url = new NativeURL(`${url.protocol || "http:"}//${url.host || "localhost"}${url.pathname}${url.search || ""}`);
			else {
				this.#protocol = url.protocol;
				this.#host = url.host;
				this.#pathname = url.pathname;
				this.#search = url.search;
			}
		}
		static [Symbol.hasInstance](val) {
			return val instanceof NativeURL;
		}
		get _url() {
			if (this.#url) return this.#url;
			this.#url = new NativeURL(this.href);
			this.#href = void 0;
			this.#protocol = void 0;
			this.#host = void 0;
			this.#pathname = void 0;
			this.#search = void 0;
			this.#pos = void 0;
			this.#searchParams?._adopt(this.#url.searchParams);
			return this.#url;
		}
		get href() {
			if (this.#url) return this.#url.href;
			if (!this.#href) this.#href = `${this.#protocol || "http:"}//${this.#host || "localhost"}${this.#pathname || "/"}${this.#search || ""}`;
			return this.#href;
		}
		#getPos() {
			if (!this.#pos) {
				const url = this.href;
				const protoIndex = url.indexOf("://");
				const pathnameIndex = protoIndex === -1 ? -1 : url.indexOf("/", protoIndex + 4);
				const qIndex = pathnameIndex === -1 ? -1 : url.indexOf("?", pathnameIndex);
				this.#pos = [
					protoIndex,
					pathnameIndex,
					qIndex
				];
			}
			return this.#pos;
		}
		get pathname() {
			if (this.#url) return this.#url.pathname;
			if (this.#pathname === void 0) {
				const [, pathnameIndex, queryIndex] = this.#getPos();
				if (pathnameIndex === -1) return this._url.pathname;
				this.#pathname = this.href.slice(pathnameIndex, queryIndex === -1 ? void 0 : queryIndex);
			}
			return this.#pathname;
		}
		get search() {
			if (this.#url) return this.#url.search;
			if (this.#search === void 0) {
				const [, pathnameIndex, queryIndex] = this.#getPos();
				if (pathnameIndex === -1) return this._url.search;
				const url = this.href;
				this.#search = queryIndex === -1 || queryIndex === url.length - 1 ? "" : url.slice(queryIndex);
			}
			return this.#search;
		}
		get searchParams() {
			if (this.#searchParams) return this.#searchParams;
			if (this.#url) return this.#url.searchParams;
			return this.#searchParams = new FastURLSearchParams(this);
		}
		get protocol() {
			if (this.#url) return this.#url.protocol;
			if (this.#protocol === void 0) {
				const [protocolIndex] = this.#getPos();
				if (protocolIndex === -1) return this._url.protocol;
				const url = this.href;
				this.#protocol = url.slice(0, protocolIndex + 1);
			}
			return this.#protocol;
		}
		get hash() {
			if (this.#url) return this.#url.hash;
			return "";
		}
		toString() {
			return this.href;
		}
		toJSON() {
			return this.href;
		}
	};
	lazyInherit(FastURL.prototype, NativeURL.prototype, "_url");
	Object.setPrototypeOf(FastURL.prototype, NativeURL.prototype);
	Object.setPrototypeOf(FastURL, NativeURL);
	return FastURL;
})();
// ../../node_modules/.pnpm/srvx@1.0.8/node_modules/srvx/dist/adapters/node.mjs
var kNativeResponse = /* @__PURE__ */ Symbol.for("srvx.nativeResponse");
var NodeResponse = /* @__PURE__ */ (() => {
	const NativeResponse = getNativeClass(kNativeResponse, globalThis.Response);
	class NodeResponse {
		#body;
		#init;
		#headers;
		#response;
		#contentLength;
		constructor(body, init) {
			this.#body = body;
			this.#init = init;
		}
		static [Symbol.hasInstance](val) {
			if (this === NodeResponse) return val instanceof NativeResponse;
			return Object.prototype.isPrototypeOf.call(this.prototype, val);
		}
		static json(data, init) {
			const body = JSON.stringify(data);
			if (body === void 0) throw new TypeError("Value is not JSON serializable");
			let headers = init?.headers;
			if (!headers) headers = { "content-type": "application/json" };
			else {
				const merged = new Headers(headers);
				if (!merged.has("content-type")) merged.set("content-type", "application/json");
				headers = merged;
			}
			return new NodeResponse(body, init ? {
				...init,
				headers
			} : { headers });
		}
		get status() {
			return this.#response?.status || this.#init?.status || 200;
		}
		get statusText() {
			return this.#response?.statusText || this.#init?.statusText || "";
		}
		get headers() {
			if (this.#response) return this.#response.headers;
			if (this.#headers) return this.#headers;
			return this.#headers = new Headers(this.#init?.headers);
		}
		get ok() {
			if (this.#response) return this.#response.ok;
			const status = this.status;
			return status >= 200 && status < 300;
		}
		get _response() {
			if (this.#response) return this.#response;
			let body = this.#body;
			if (body && typeof body.pipe === "function" && !(body instanceof Readable)) {
				const stream = new PassThrough();
				body.pipe(stream);
				const abort = body.abort;
				if (abort) stream.once("close", () => abort());
				body = stream;
			}
			if (typeof body === "string") this.#contentLength = Buffer.byteLength(body);
			else if (body instanceof ArrayBuffer || body instanceof Uint8Array || body instanceof DataView) this.#contentLength = body.byteLength;
			else if (body instanceof Blob) this.#contentLength = body.size;
			this.#response = new NativeResponse(body, this.#headers ? {
				...this.#init,
				headers: this.#headers
			} : this.#init);
			this.#init = void 0;
			this.#headers = void 0;
			this.#body = void 0;
			return this.#response;
		}
		_toNodeResponse() {
			const status = this.status;
			const statusText = this.statusText;
			let body;
			let contentType;
			let contentLength;
			if (this.#response) {
				body = this.#response.body;
				if (!this.#response.bodyUsed) contentLength = this.#contentLength;
			} else if (this.#body != null) {
				if (this.#body instanceof ReadableStream) body = this.#body;
				else if (typeof this.#body === "string") {
					body = this.#body;
					contentType = "text/plain; charset=UTF-8";
					contentLength = Buffer.byteLength(this.#body);
				} else if (this.#body instanceof ArrayBuffer) {
					body = Buffer.from(this.#body);
					contentLength = this.#body.byteLength;
				} else if (this.#body instanceof Uint8Array) {
					body = this.#body;
					contentLength = this.#body.byteLength;
				} else if (this.#body instanceof DataView) {
					body = Buffer.from(this.#body.buffer, this.#body.byteOffset, this.#body.byteLength);
					contentLength = this.#body.byteLength;
				} else if (this.#body instanceof Blob) {
					body = this.#body.stream();
					contentType = this.#body.type;
					contentLength = this.#body.size;
				} else if (typeof this.#body.pipe === "function") body = this.#body;
				else body = this._response.body;
			}
			const headers = [];
			const initHeaders = this.#init?.headers;
			const headerEntries = this.#response?.headers || this.#headers || (initHeaders ? Array.isArray(initHeaders) ? initHeaders : initHeaders?.entries ? initHeaders.entries() : Object.entries(initHeaders) : void 0);
			let hasContentTypeHeader;
			let hasContentLength;
			if (headerEntries) for (const [key, value] of headerEntries) {
				const lowerKey = typeof key === "string" ? key.toLowerCase() : String(key);
				if (Array.isArray(value)) for (const v of value) headers.push(lowerKey, v);
				else headers.push(lowerKey, value);
				if (lowerKey === "content-type") hasContentTypeHeader = true;
				else if (lowerKey === "content-length") hasContentLength = true;
			}
			if (contentType && !hasContentTypeHeader) headers.push("content-type", contentType);
			if (contentLength != null && !hasContentLength) headers.push("content-length", String(contentLength));
			this.#init = void 0;
			this.#headers = void 0;
			this.#response = void 0;
			this.#contentLength = void 0;
			this.#body = void 0;
			return {
				status,
				statusText,
				headers,
				body
			};
		}
	}
	lazyInherit(NodeResponse.prototype, NativeResponse.prototype, "_response");
	Object.setPrototypeOf(NodeResponse, NativeResponse);
	Object.setPrototypeOf(NodeResponse.prototype, NativeResponse.prototype);
	return NodeResponse;
})();
// ../../node_modules/.pnpm/rou3@1.0.0/node_modules/rou3/dist/index.mjs
var NullProtoObj = /* @__PURE__ */ (() => {
	const e = function() {};
	return e.prototype = Object.create(null), Object.freeze(e.prototype), e;
})();
// ../../node_modules/.pnpm/h3@2.0.8_crossws@0.4.17_srvx@1.0.8__ocache@0.3.2/node_modules/h3/dist/response.mjs
function withoutTrailingSlash(path) {
	if (!path || path === "/") return "/";
	return path[path.length - 1] === "/" ? path.slice(0, -1) : path;
}
function joinURL(base, path) {
	if (!path || path === "/") return base || "/";
	if (!base) return path;
	const segment = path.replace(JOIN_LEADING_SLASH_RE, "");
	return (base[base.length - 1] === "/" ? base : base + "/") + segment;
}
var JOIN_LEADING_SLASH_RE = /^\//;
function stripBase(pathname, base) {
	if (pathname === base || pathname.startsWith(base + "/") || pathname.startsWith(base + "?")) return "/" + pathname.slice(base.length).replace(/^\/+/, "");
	return pathname;
}
function withoutBase(input = "", base = "") {
	if (!base || base === "/") return input;
	return stripBase(input, withoutTrailingSlash(base));
}
var AUTHORITY_RE$1 = /^(?:[a-z][a-z\d+.-]*:)?\/\//i;
function getURLPathname(input) {
	const path = AUTHORITY_RE$1.test(input) ? input.replace(AUTHORITY_RE$1, "").replace(/^[^/?#]*/, "") : input;
	const end = path.search(/[#?]/);
	return end === -1 ? path : path.slice(0, end);
}
var NEEDLESS_ESCAPE_SRC = String.raw`%(?:2[146-9A-E]|3[0-9ABD]|4[0-9A-F]|5[0-9ABDF]|6[1-9A-F]|7[0-9ACE])`;
var NEEDLESS_ESCAPE_RE = /* @__PURE__ */ new RegExp(NEEDLESS_ESCAPE_SRC, "i");
var NEEDLESS_ESCAPE_RE_G = /* @__PURE__ */ new RegExp(NEEDLESS_ESCAPE_SRC, "gi");
function isNonCanonicalPathname(pathname) {
	return NEEDLESS_ESCAPE_RE.test(pathname);
}
function canonicalPathname(pathname) {
	return pathname.replace(NEEDLESS_ESCAPE_RE_G, (m) => String.fromCharCode(Number.parseInt(m.slice(1), 16)));
}
function decodePathname(pathname) {
	try {
		return decodeURI(pathname);
	} catch {
		return;
	}
}
var ENCODED_SEP_RE_G$1 = /%(?:25)*(?:2f|5c)/gi;
var ENCODED_SEP_FLAT_RE_G = /%(?:2f|5c)/gi;
function decodePreservingSeparators(value, opts) {
	if (!value.includes("%")) return value;
	const decode = opts?.decode || decodeURIComponent;
	const re = opts?.nested === false ? ENCODED_SEP_FLAT_RE_G : ENCODED_SEP_RE_G$1;
	let result = "";
	let lastIndex = 0;
	re.lastIndex = 0;
	for (let m; m = re.exec(value);) {
		result += decode(value.slice(lastIndex, m.index)) + m[0];
		lastIndex = m.index + m[0].length;
	}
	return result + decode(value.slice(lastIndex));
}
var kEventNS = "h3.internal.event.";
var kEventRes = /* @__PURE__ */ Symbol.for(`${kEventNS}res`);
var kEventResHeaders = /* @__PURE__ */ Symbol.for(`${kEventNS}res.headers`);
var kEventResErrHeaders = /* @__PURE__ */ Symbol.for(`${kEventNS}res.err.headers`);
var kMalformedURL = /* @__PURE__ */ Symbol.for(`${kEventNS}malformed`);
var H3Event = class {
	app;
	req;
	url;
	context;
	static __is_event__ = true;
	constructor(req, context, app) {
		this.context = req.context = context || req.context || new NullProtoObj();
		this.req = req;
		this.app = app;
		const _url = req._url;
		let url = _url && _url instanceof URL ? _url : new FastURL(req.url);
		const pathname = url.pathname;
		if (pathname.includes("%")) {
			if (decodePathname(pathname) === void 0) this[kMalformedURL] = true;
			else if (isNonCanonicalPathname(pathname)) url = new FastURL(`${url.protocol}//${url.host}${canonicalPathname(pathname)}${url.search}`);
		}
		this.url = url;
	}
	get res() {
		return this[kEventRes] ||= new H3EventResponse();
	}
	get runtime() {
		return this.req.runtime;
	}
	waitUntil(promise) {
		this.req.waitUntil?.(promise);
	}
	toString() {
		return `[${this.req.method}] ${this.req.url}`;
	}
	toJSON() {
		return this.toString();
	}
	get node() {
		return this.req.runtime?.node;
	}
	get headers() {
		return this.req.headers;
	}
	get path() {
		return this.url.pathname + this.url.search;
	}
	get method() {
		return this.req.method;
	}
};
var H3EventResponse = class {
	status;
	statusText;
	get headers() {
		return this[kEventResHeaders] ||= new Headers();
	}
	get errHeaders() {
		return this[kEventResErrHeaders] ||= new Headers();
	}
};
var DISALLOWED_STATUS_CHARS = /[^\u0009\u0020-\u007E]/g;
function sanitizeStatusMessage(statusMessage = "") {
	return statusMessage.replace(DISALLOWED_STATUS_CHARS, "");
}
function sanitizeStatusCode(statusCode, defaultStatusCode = 200) {
	if (!statusCode) return defaultStatusCode;
	if (typeof statusCode === "string") statusCode = +statusCode;
	if (!Number.isInteger(statusCode) || statusCode < 100 || statusCode > 599) return defaultStatusCode;
	return statusCode;
}
var HTTPError = class HTTPError extends Error {
	get name() {
		return "HTTPError";
	}
	status;
	statusText;
	headers;
	cause;
	data;
	body;
	unhandled;
	static isError(input) {
		return input instanceof Error && input?.name === "HTTPError" && input.status > 99;
	}
	static status(status, statusText, details) {
		return new HTTPError({
			...details,
			statusText,
			status
		});
	}
	constructor(arg1, arg2) {
		let messageInput;
		let details;
		if (typeof arg1 === "string") {
			messageInput = arg1;
			details = arg2;
		} else details = arg1;
		const status = sanitizeStatusCode(details?.status || details?.statusCode || (details?.cause)?.status || (details?.cause)?.statusCode, 500);
		const statusText = sanitizeStatusMessage(details?.statusText || details?.statusMessage || (details?.cause)?.statusText || (details?.cause)?.statusMessage);
		const message = messageInput || details?.message || (details?.cause)?.message || details?.statusText || details?.statusMessage || [
			"HTTPError",
			status,
			statusText
		].filter(Boolean).join(" ");
		super(message, { cause: details });
		this.cause = details;
		this.status = status;
		this.statusText = statusText || void 0;
		const rawHeaders = details?.headers || (details?.cause)?.headers;
		this.headers = rawHeaders ? new Headers(rawHeaders) : void 0;
		this.unhandled = details?.unhandled ?? (details?.cause)?.unhandled ?? void 0;
		this.data = details?.data;
		this.body = details?.body;
	}
	get statusCode() {
		return this.status;
	}
	get statusMessage() {
		return this.statusText;
	}
	toJSON() {
		const unhandled = this.unhandled;
		return {
			status: this.status,
			statusText: this.statusText,
			unhandled,
			message: unhandled ? "HTTPError" : this.message,
			data: unhandled ? void 0 : this.data,
			...unhandled ? void 0 : this.body
		};
	}
};
function isJSONSerializable(value, _type) {
	if (value === null || value === void 0) return true;
	if (_type !== "object") return _type === "boolean" || _type === "number" || _type === "string";
	if (typeof value.toJSON === "function") return true;
	if (Array.isArray(value)) return true;
	if (typeof value.pipe === "function" || typeof value.pipeTo === "function") return false;
	if (value instanceof NullProtoObj) return true;
	const proto = Object.getPrototypeOf(value);
	return proto === Object.prototype || proto === null;
}
var kEventDispose = /* @__PURE__ */ Symbol.for("h3.internal.event.dispose");
var kNotFound = /* @__PURE__ */ Symbol.for("h3.notFound");
var kHandled = /* @__PURE__ */ Symbol.for("h3.handled");
function toResponse(val, event, config = {}) {
	if (typeof val?.then === "function") return val.then((resolvedVal) => toResponse(resolvedVal, event, config), (r) => toResponse(toError(r), event, config));
	let response;
	try {
		response = prepareResponse(val, event, config);
	} catch (error) {
		return toResponse(toError(error), event, config);
	}
	if (typeof response?.then === "function") return toResponse(response, event, config);
	const { onResponse } = config;
	if (onResponse) return Promise.resolve().then(() => onResponse(response, event)).catch((error) => {
		if (!config.silent) console.error(error);
	}).then(() => event[kEventDispose]?.observe(response, val) ?? response);
	return event[kEventDispose]?.observe(response, val) ?? response;
}
function toError(value) {
	if (value === kNotFound || value === kHandled || value instanceof Error) return value;
	if (typeof value === "number") return new HTTPError({ status: value });
	const error = new HTTPError({
		status: 500,
		unhandled: true
	});
	error.cause = value;
	return error;
}
var kHTTPResponse = /* @__PURE__ */ Symbol.for("h3.HTTPResponse");
var HTTPResponse = class {
	#headers;
	#init;
	body;
	constructor(body, init) {
		this.body = body;
		this.#init = init;
	}
	get status() {
		return this.#init?.status;
	}
	get statusText() {
		return this.#init?.statusText;
	}
	get headers() {
		return this.#headers ||= new Headers(this.#init?.headers);
	}
};
HTTPResponse.prototype[kHTTPResponse] = true;
function prepareResponse(val, event, config, nested) {
	if (val === kHandled) return new NodeResponse(null);
	if (val === kNotFound) val = new HTTPError({
		status: 404,
		message: `Cannot find any route matching [${event.req.method}] ${event.url}`
	});
	if (val && val instanceof Error) {
		const isHTTPError = HTTPError.isError(val);
		const error = isHTTPError ? val : new HTTPError(val);
		if (!isHTTPError) {
			error.unhandled = true;
			if (val?.stack) error.stack = val.stack;
		}
		if (error.unhandled && !config.silent) console.error(error);
		const { onError } = config;
		const errHeaders = event[kEventRes]?.[kEventResErrHeaders];
		if (onError && !nested) return Promise.resolve().then(() => onError(error, event)).catch(toError).then((newVal) => prepareResponse(newVal ?? val, event, config, true));
		event[kEventRes] = void 0;
		val = errorResponse(error, config.debug, errHeaders);
	}
	const preparedRes = event[kEventRes];
	let preparedHeaders = preparedRes?.[kEventResHeaders];
	event[kEventRes] = void 0;
	if (!(val instanceof Response)) {
		const res = prepareResponseBody(val, event, config);
		const rawStatus = res.status || preparedRes?.status;
		const status = rawStatus ? sanitizeStatusCode(rawStatus) : void 0;
		const rawStatusText = res.statusText || preparedRes?.statusText;
		return new NodeResponse(nullBody(event.req.method, status) ? null : res.body, {
			status,
			statusText: rawStatusText === void 0 ? void 0 : sanitizeStatusMessage(rawStatusText),
			headers: res.headers && preparedHeaders ? mergeHeaders$1(res.headers, preparedHeaders) : res.headers || preparedHeaders
		});
	}
	if (val.status >= 400) preparedHeaders = preparedRes?.[kEventResErrHeaders];
	if (preparedHeaders && !nested && !preparedHeaders.keys().next().done) return new NodeResponse(nullBody(event.req.method, val.status) ? null : val.body, {
		status: val.status,
		statusText: val.statusText,
		headers: mergeHeaders$1(val.headers, preparedHeaders)
	});
	return event.req.method === "HEAD" && val.body !== null ? new NodeResponse(null, {
		status: val.status,
		statusText: val.statusText,
		headers: val.headers
	}) : val;
}
function mergeHeaders$1(base, overrides, target = new Headers(base)) {
	for (const [name, value] of overrides) if (name === "set-cookie") target.append(name, value);
	else target.set(name, value);
	return target;
}
var frozen = (name) => (...args) => {
	throw new Error(`Headers are frozen (${name} ${args.join(", ")})`);
};
var FrozenHeaders = class extends Headers {
	set = frozen("set");
	append = frozen("append");
	delete = frozen("delete");
};
var emptyHeaders = /* @__PURE__ */ new FrozenHeaders({ "content-length": "0" });
var jsonHeaders = /* @__PURE__ */ new FrozenHeaders({ "content-type": "application/json;charset=UTF-8" });
function prepareResponseBody(val, event, config) {
	if (val === null || val === void 0) return {
		body: "",
		headers: emptyHeaders
	};
	const valType = typeof val;
	if (valType === "string") return { body: val };
	if (val instanceof Uint8Array) return {
		body: val,
		headers: new Headers({ "content-length": val.byteLength.toString() })
	};
	if (val instanceof HTTPResponse || val?.[kHTTPResponse] === true) return val;
	if (isJSONSerializable(val, valType)) return {
		body: JSON.stringify(val, void 0, config.debug ? 2 : void 0),
		headers: jsonHeaders
	};
	if (valType === "bigint") return {
		body: val.toString(),
		headers: jsonHeaders
	};
	if (val instanceof Blob) {
		const headers = new Headers({
			"content-type": val.type,
			"content-length": val.size.toString()
		});
		let filename = val.name;
		if (filename) {
			filename = encodeURIComponent(filename);
			headers.set("content-disposition", `filename="${filename}"; filename*=UTF-8''${filename}`);
		}
		return {
			body: val.stream(),
			headers
		};
	}
	if (valType === "symbol") return { body: val.toString() };
	if (valType === "function") return { body: `${val.name}()` };
	return { body: val };
}
function nullBody(method, status) {
	return method === "HEAD" || status === 100 || status === 101 || status === 102 || status === 204 || status === 205 || status === 304;
}
function errorResponse(error, debug, errHeaders) {
	let headers = error.headers ? mergeHeaders$1(jsonHeaders, error.headers) : new Headers(jsonHeaders);
	if (errHeaders) headers = mergeHeaders$1(headers, errHeaders);
	return new NodeResponse(JSON.stringify({
		...error.toJSON(),
		stack: debug && error.stack ? error.stack.split("\n").map((l) => l.trim()) : void 0
	}, void 0, debug ? 2 : void 0), {
		status: error.status,
		statusText: error.statusText,
		headers
	});
}
// ../../node_modules/.pnpm/h3@2.0.8_crossws@0.4.17_srvx@1.0.8__ocache@0.3.2/node_modules/h3/dist/middleware.mjs
function composeMiddleware(middleware) {
	let chain = (event, handler) => handler(event);
	for (let i = middleware.length - 1; i >= 0; i--) {
		const fn = middleware[i];
		const inner = chain;
		chain = (event, handler) => callLayer(fn, event, handler, inner);
	}
	return chain;
}
function composeHandler(middleware, handler) {
	const chain = composeMiddleware(middleware);
	return function _composedHandler(event) {
		return chain(event, handler);
	};
}
function callMiddleware(event, middleware, handler, index = 0) {
	return index === middleware.length ? handler(event) : callLayer(middleware[index], event, handler, (_event, _handler) => callMiddleware(_event, middleware, _handler, index + 1));
}
function callLayer(fn, event, handler, inner) {
	let nextCalled;
	let nextResult;
	const next = () => {
		if (nextCalled) return nextResult;
		nextCalled = true;
		nextResult = inner(event, handler);
		return nextResult;
	};
	const ret = fn(event, next);
	return isUnhandledResponse(ret) ? next() : typeof ret?.then === "function" ? ret.then((resolved) => isUnhandledResponse(resolved) ? next() : resolved) : ret;
}
function isUnhandledResponse(val) {
	return val === void 0 || val === kNotFound;
}
// ../../node_modules/.pnpm/h3@2.0.8_crossws@0.4.17_srvx@1.0.8__ocache@0.3.2/node_modules/h3/dist/cache.mjs
function toRequest(input, options) {
	if (typeof input === "string") {
		let url = input;
		if (url[0] === "/") url = `http://${safeHost((options?.headers ? new Headers(options.headers) : void 0)?.get("host"))}${url}`;
		return new Request(url, options);
	} else if (options || input instanceof URL) return new Request(input, options);
	return input;
}
function safeHost(host) {
	return host && !/[/\\?#@\s]/.test(host) ? host : "localhost";
}
function defineHandler(input) {
	if (typeof input === "function") return handlerWithFetch(input);
	const handler = input.handler || (input.fetch ? function _fetchHandler(event) {
		return input.fetch(event.req);
	} : NoHandler);
	const composed = input.middleware?.length && composeHandler(input.middleware, handler);
	const eventHandler = handlerWithFetch(composed || handler);
	return Object.assign(eventHandler, input, composed && { fetch: eventHandler.fetch });
}
function handlerWithFetch(handler) {
	if ("fetch" in handler) return handler;
	return Object.assign(handler, { fetch: (req) => {
		if (typeof req === "string") req = new URL(req, "http://_");
		if (req instanceof URL) req = new Request(req);
		const event = new H3Event(req);
		try {
			return Promise.resolve(toResponse(handler(event), event));
		} catch (error) {
			return Promise.resolve(toResponse(toError(error), event));
		}
	} });
}
function defineLazyEventHandler(loader) {
	let handler;
	let promise;
	return defineHandler(function lazyHandler(event) {
		return handler ? handler(event) : (promise ??= Promise.resolve(loader()).then(function resolveLazyHandler(r) {
			handler = toEventHandler(r) || toEventHandler(r.default);
			if (typeof handler !== "function") throw new TypeError("Invalid lazy handler", { cause: { resolved: r } });
			return handler;
		})).then((r) => r(event));
	});
}
function toEventHandler(handler) {
	if (typeof handler === "function") return handler;
	if (typeof handler?.handler === "function" && handler.constructor?.["~h3"]) return handler.handler;
	if (typeof handler?.fetch === "function") return function _fetchHandler(event) {
		return handler.fetch(event.req);
	};
}
var NoHandler = () => kNotFound;
var H3Core = class {
	static "~h3" = true;
	config;
	"~middleware";
	"~routes" = [];
	"~dispatch";
	"~composed";
	constructor(config = {}) {
		this["~middleware"] = [];
		this.config = config;
		this.fetch = this.fetch.bind(this);
		this.handler = this.handler.bind(this);
	}
	fetch(request) {
		return this["~request"](request);
	}
	handler(event) {
		const route = this["~findRoute"](event);
		if (route) {
			event.context.params = route.params;
			event.context.matchedRoute = route.data;
		}
		return (this["~dispatch"] ??= createDispatcher(this))(event, route);
	}
	"~request"(request, context) {
		const event = new H3Event(request, context, this);
		let handlerRes;
		try {
			if (event[kMalformedURL] && !this.config.allowMalformedURL) throw new HTTPError({
				status: 400,
				message: "Bad Request"
			});
			if (this.config.onRequest) {
				const hookRes = this.config.onRequest(event);
				handlerRes = typeof hookRes?.then === "function" ? hookRes.then(() => this.handler(event)) : this.handler(event);
			} else handlerRes = this.handler(event);
		} catch (error) {
			handlerRes = Promise.reject(error);
		}
		return toResponse(handlerRes, event, this.config);
	}
	"~findRoute"(_event) {}
	"~addRoute"(_route) {
		this["~routes"].push(_route);
	}
	"~getMiddleware"(_event, _route) {
		return this["~middleware"];
	}
};
function createDispatcher(app) {
	if (app["~getMiddleware"] !== H3Core.prototype["~getMiddleware"]) return (event, route) => callMiddleware(event, app["~getMiddleware"](event, route || void 0), routeHandler(route));
	const middleware = app["~middleware"];
	if (middleware.length === 0) return (event, route) => routeHandler(route)(event);
	const composed = app["~composed"] ??= composeMiddleware(middleware);
	return (event, route) => composed(event, routeHandler(route));
}
function routeHandler(route) {
	const data = route?.data;
	if (!data) return NoHandler;
	return data.middleware?.length ? data["~composed"] ??= composeHandler(data.middleware, data.handler) : data.handler;
}
// ../../node_modules/.pnpm/h3@2.0.8_crossws@0.4.17_srvx@1.0.8__ocache@0.3.2/node_modules/h3/dist/proxy.mjs
var ignoredHeaders = /* @__PURE__ */ new Set([
	"transfer-encoding",
	"accept-encoding",
	"connection",
	"keep-alive",
	"upgrade",
	"expect",
	"te",
	"trailer",
	"host",
	"proxy-authorization",
	"proxy-connection"
]);
var framingHeaders = /* @__PURE__ */ new Set([
	"connection",
	"keep-alive",
	"transfer-encoding",
	"te",
	"trailer",
	"upgrade",
	"proxy-authorization",
	"proxy-connection"
]);
function connectionTokens(connection) {
	return new Set((connection || "").toLowerCase().split(",").map((name) => name.trim()).filter(Boolean));
}
var ignoredResponseHeaders = /* @__PURE__ */ new Set([
	"content-encoding",
	"content-length",
	"transfer-encoding",
	"connection",
	"keep-alive",
	"proxy-authenticate",
	"proxy-connection",
	"upgrade",
	"trailer",
	"te"
]);
function rewriteCookieProperty(header, map, property) {
	const _map = typeof map === "string" ? { "*": map } : map;
	return header.replace(new RegExp(`(;\\s*${property}=)([^;]+)`, "gi"), (match, prefix, previousValue) => {
		let newValue;
		if (Object.hasOwn(_map, previousValue)) newValue = _map[previousValue];
		else if (Object.hasOwn(_map, "*")) newValue = _map["*"];
		else return match;
		return newValue ? prefix + newValue : "";
	});
}
function applyXForwardedHeaders(headers, event) {
	const merged = headers instanceof Headers ? headers : new Headers(headers);
	const ip = event.req.ip;
	if (ip) {
		const forwardedFor = merged.get("x-forwarded-for");
		merged.set("x-forwarded-for", forwardedFor ? `${forwardedFor}, ${ip}` : ip);
	}
	const proto = event.url.protocol.slice(0, -1);
	merged.set("x-forwarded-proto", proto);
	merged.set("x-forwarded-host", event.url.host);
	merged.set("x-forwarded-port", event.url.port || (proto === "https" ? "443" : "80"));
	return merged;
}
function rewriteLocationHeaders(headers, rewrite, targetOrigin, requestOrigin) {
	const rewriteValue = (value) => rewrite === true ? rewriteOrigin(value, targetOrigin, requestOrigin) : rewritePrefix(value, rewrite);
	const location = headers.get("location");
	if (location) {
		const rewritten = rewriteValue(location);
		if (rewritten) headers.set("location", rewritten);
	}
	const refresh = headers.get("refresh");
	if (refresh) {
		const match = refresh.match(/^(\s*(?:[\d.]+\s*[;,]\s*)?url\s*=\s*)(['"]?)(.*?)\2(\s*)$/i);
		const rewritten = match && rewriteValue(match[3]);
		if (rewritten) headers.set("refresh", match[1] + match[2] + rewritten + match[2] + match[4]);
	}
}
function rewriteOrigin(value, targetOrigin, requestOrigin) {
	if (!targetOrigin || targetOrigin === requestOrigin) return;
	const url = value.startsWith("//") ? URL.canParse(value, targetOrigin) ? new URL(value, targetOrigin) : void 0 : URL.canParse(value) ? new URL(value) : void 0;
	if (!url || url.origin !== targetOrigin) return;
	return requestOrigin + url.pathname + url.search + url.hash;
}
function rewritePrefix(value, map) {
	for (const prefix of Object.keys(map)) if (value.startsWith(prefix)) return map[prefix] + value.slice(prefix.length);
}
function abortable(run, signal) {
	if (signal.aborted) return Promise.reject(signal.reason);
	return new Promise((resolve, reject) => {
		const onAbort = () => reject(signal.reason);
		signal.addEventListener("abort", onAbort, { once: true });
		Promise.resolve(run()).then((value) => {
			signal.removeEventListener("abort", onAbort);
			resolve(value);
		}, (error) => {
			signal.removeEventListener("abort", onAbort);
			reject(error);
		});
	});
}
function mergeHeaders(defaults, ...inputs) {
	const _inputs = inputs.filter(Boolean);
	if (_inputs.length === 0) return defaults;
	const merged = new Headers(defaults);
	for (const input of _inputs) {
		const entries = Array.isArray(input) ? input : typeof input.entries === "function" ? input.entries() : Object.entries(input);
		for (const [key, value] of entries) if (value !== void 0) merged.set(key, value);
	}
	return merged;
}
async function proxyRequest(event, target, opts = {}) {
	const method = opts.fetchOptions?.method || event.req.method;
	const methodUpper = method.toUpperCase();
	const incomingBody = event.req.body;
	const requestBody = incomingBody != null && methodUpper !== "GET" && methodUpper !== "HEAD" ? incomingBody : void 0;
	const proxyHeaders = getProxyRequestHeaders(event, {
		host: target.startsWith("/"),
		forwardHeaders: opts.forwardHeaders,
		filterHeaders: opts.filterHeaders
	});
	const fetchHeaders = mergeHeaders(opts.xfwd ? applyXForwardedHeaders(proxyHeaders, event) : proxyHeaders, opts.fetchOptions?.headers, opts.headers);
	if (opts.fetchOptions && "body" in opts.fetchOptions || incomingBody && !requestBody) {
		if (fetchHeaders instanceof Headers) fetchHeaders.delete("content-length");
		else if (!Array.isArray(fetchHeaders)) delete fetchHeaders["content-length"];
	}
	const fetchBody = opts.fetchOptions?.body ?? requestBody;
	return proxy$1(event, target, {
		...opts,
		fetchOptions: {
			method,
			body: requestBody,
			...opts.fetchOptions,
			duplex: opts.fetchOptions?.duplex ?? (fetchBody != null ? "half" : void 0),
			headers: fetchHeaders
		}
	});
}
async function proxy$1(event, target, opts = {}) {
	const signals = [event.req.signal];
	if (opts.fetchOptions?.signal) signals.push(opts.fetchOptions.signal);
	let timeoutId;
	if (opts.timeout > 0 && Number.isFinite(opts.timeout)) {
		const timeoutController = new AbortController();
		timeoutId = setTimeout(() => timeoutController.abort(new DOMException("Proxy request timed out", "TimeoutError")), Math.min(Math.max(Math.trunc(opts.timeout), 1), 2147483647));
		signals.push(timeoutController.signal);
	}
	const signal = signals.length > 1 ? AbortSignal.any(signals) : signals[0];
	const fetchOptions = {
		headers: opts.headers,
		...opts.fetchOptions,
		redirect: opts.fetchOptions?.redirect ?? "manual",
		signal
	};
	let response;
	try {
		response = target[0] === "/" ? await abortable(() => event.app.fetch(createSubRequest(event, target, fetchOptions)), signal) : await fetch(target, fetchOptions);
	} catch (error) {
		if ((signal.aborted ? signal.reason : void 0)?.name === "TimeoutError" || error?.name === "TimeoutError") throw new HTTPError({
			status: 504,
			statusText: "Gateway Timeout",
			cause: error
		});
		if (signal.aborted || error?.name === "AbortError") {
			if (opts.propagateAbortError) throw error;
			if (event.req.signal.aborted) return new HTTPResponse(null, {
				status: 499,
				statusText: "Client Closed Request"
			});
		}
		throw new HTTPError("Bad Gateway", {
			status: 502,
			statusText: "Bad Gateway",
			cause: error
		});
	} finally {
		if (timeoutId !== void 0) clearTimeout(timeoutId);
	}
	if (response.type === "opaqueredirect") throw new HTTPError({
		status: 502,
		message: "Cannot relay an opaque redirect response on this runtime. Set `fetchOptions: { redirect: \"follow\" }` to follow upstream redirects instead."
	});
	if (response.type === "opaque" || response.type === "error" || response.status === 0) throw new HTTPError({
		status: 502,
		message: "Cannot relay an opaque or errored upstream response (status 0), typically caused by a `no-cors` request mode on browser/service-worker runtimes."
	});
	const headers = new Headers();
	const connectionNominated = connectionTokens(response.headers.get("connection"));
	for (const [key, value] of response.headers.entries()) {
		if (ignoredResponseHeaders.has(key) || connectionNominated.has(key) || key === "set-cookie") continue;
		headers.append(key, value);
	}
	const cookies = response.headers.getSetCookie();
	if (cookies.length > 0) {
		const _cookies = cookies.map((cookie) => {
			if (opts.cookieDomainRewrite) cookie = rewriteCookieProperty(cookie, opts.cookieDomainRewrite, "domain");
			if (opts.cookiePathRewrite) cookie = rewriteCookieProperty(cookie, opts.cookiePathRewrite, "path");
			return cookie;
		});
		for (const cookie of _cookies) headers.append("set-cookie", cookie);
	}
	const locationRewrite = opts.locationRewrite ?? true;
	if (locationRewrite !== false && (locationRewrite !== true || target[0] !== "/")) rewriteLocationHeaders(headers, locationRewrite, target[0] === "/" ? void 0 : new URL(target).origin, event.url.origin);
	if (opts.onResponse) await opts.onResponse(event, response);
	return new HTTPResponse(response.body, {
		status: response.status,
		statusText: response.statusText,
		headers
	});
}
function getProxyRequestHeaders(event, opts) {
	const headers = new NullProtoObj();
	const filterHeaders = opts?.filterHeaders?.map((h) => h.toLowerCase());
	const forwardHeaders = opts?.forwardHeaders?.map((h) => h.toLowerCase());
	const connectionNominated = connectionTokens(event.req.headers.get("connection"));
	for (const [name, value] of event.req.headers.entries()) {
		if (filterHeaders?.includes(name)) continue;
		if (forwardHeaders?.includes(name) && !framingHeaders.has(name) && !connectionNominated.has(name)) {
			headers[name] = value;
			continue;
		}
		if (connectionNominated.has(name)) continue;
		if (!ignoredHeaders.has(name) || name === "host" && opts?.host) {
			headers[name] = value;
			continue;
		}
	}
	return headers;
}
function createSubRequest(event, path, init) {
	const url = new URL(path.replace(LEADING_SEPARATOR_RUN_RE$1, "/"), event.url);
	if (init.body != null && init.duplex === void 0) init = {
		...init,
		duplex: "half"
	};
	const req = new Request(url, init);
	req.runtime = event.req.runtime;
	req.waitUntil = event.req.waitUntil;
	req.ip = event.req.ip;
	return req;
}
var LEADING_SEPARATOR_RUN_RE$1 = /^(?:[/\\]|[\t\n\r])+/;
// ../../node_modules/.pnpm/h3@2.0.8_crossws@0.4.17_srvx@1.0.8__ocache@0.3.2/node_modules/h3/dist/path.mjs
var DOT_SEGMENT_SRC = String.raw`(?:^|/)(?:\.|%(?:25)*2e){1,2}(?:/|$)`;
var ENCODED_SEP_SRC = String.raw`%(?:25)*(?:2f|5c)`;
var ENCODED_SEP_RE_G = /* @__PURE__ */ new RegExp(ENCODED_SEP_SRC, "gi");
var TRIGGER_RES = /* @__PURE__ */ (() => {
	const base = String.raw`\\|` + DOT_SEGMENT_SRC;
	return [
		new RegExp(base, "i"),
		new RegExp(`${base}|${ENCODED_SEP_SRC}`, "i"),
		new RegExp(`${base}|//`, "i"),
		new RegExp(`${base}|${ENCODED_SEP_SRC}|//`, "i")
	];
})();
var ENCODED_DOT_RE_G = /%(?:25)*2e/gi;
function resolveDotSegments(path, opts) {
	if (path[0] !== "/" || path[1] === "/" || path[1] === "\\") path = "/" + path.replace(/^[/\\]+/, "");
	if (isCanonicalPath(path, opts)) return path;
	const decodeSlashes = opts?.decodeSlashes;
	const mergeSlashes = opts?.mergeSlashes;
	let normalized = path.includes("\\") ? path.replaceAll("\\", "/") : path;
	if (decodeSlashes) normalized = normalized.replace(ENCODED_SEP_RE_G, "/");
	const segments = normalized.split("/");
	const lastIndex = segments.length - 1;
	const resolved = [];
	for (let i = 0; i <= lastIndex; i++) {
		const segment = segments[i];
		const normalizedSegment = segment.includes("%") ? segment.replace(ENCODED_DOT_RE_G, ".") : segment;
		const isDotSegment = normalizedSegment === "." || normalizedSegment === "..";
		if (normalizedSegment === "..") {
			if (resolved.length > 1) resolved.pop();
		} else if (mergeSlashes && normalizedSegment === "" && i > 0 && i < lastIndex) {} else if (!isDotSegment) resolved.push(segment);
		if (isDotSegment && i === lastIndex) resolved.push("");
	}
	return (resolved.join("/") || "/").replace(/^\/+/, "/");
}
function isCanonicalPath(path, opts) {
	return path[0] === "/" && path[1] !== "/" && path[1] !== "\\" && !TRIGGER_RES[(opts?.decodeSlashes ? 1 : 0) | (opts?.mergeSlashes ? 2 : 0)].test(path);
}
// ../../node_modules/.pnpm/h3@2.0.8_crossws@0.4.17_srvx@1.0.8__ocache@0.3.2/node_modules/h3/dist/_utils.mjs
var CANONICAL_OPTS = { decodeSlashes: true };
var MERGED_OPTS = {
	decodeSlashes: true,
	mergeSlashes: true
};
function canonicalPath(pathname) {
	return resolveDotSegments(pathname, CANONICAL_OPTS);
}
function decodedPath(pathname) {
	let decoded = pathname;
	for (let pass = 0; hasDecodableEscape(decoded); pass++) {
		if (pass >= MAX_PASSES) return decoded;
		const input = pass < EXACT_PASSES ? decoded : flattenNesting(decoded);
		let next;
		try {
			next = decodePreservingSeparators(input);
		} catch {
			return input;
		}
		if (next === input) return input;
		decoded = next;
	}
	return decoded;
}
var PATH_ENCODE_RE = /(?:[\u0000-\u0020"#<>?^`{}]|[^\u0000-\u007E])+/gu;
function encodedReading(pathname) {
	return pathname.replace(PATH_ENCODE_RE, (run) => encodeURIComponent(run.replace(/[\uD800-\uDFFF]/gu, "�")));
}
var EXACT_PASSES = 8;
var MAX_PASSES = 24;
var CHAR_2 = 50;
var CHAR_5 = 53;
function needsCanonicalPasses(pathname) {
	return !isCanonicalPath(pathname, MERGED_OPTS);
}
function mergedCanonicalPath(pathname, canonical) {
	const merged = resolveDotSegments(pathname, MERGED_OPTS);
	return merged === canonical ? void 0 : merged;
}
function isPathInScope(pathname, base) {
	if (!base) return true;
	if (!isEveryCanonicalReadingInScope(pathname, base)) return false;
	const decoded = decodedPath(pathname);
	return decoded === pathname || isEveryCanonicalReadingInScope(decoded, base);
}
function isPathInServedScope(pathname, base) {
	const decodedBase = decodedPath(base);
	if (decodedBase === base) return isPathInScope(pathname, base);
	return isEveryCanonicalReadingInScope(pathname, base) && isEveryCanonicalReadingInScope(decodedPath(pathname), decodedBase);
}
function isEveryCanonicalReadingInScope(pathname, base) {
	if (!needsCanonicalPasses(pathname)) return isCanonicalInScope(pathname, base);
	return isCanonicalInScope(canonicalPath(pathname), base) && isCanonicalInScope(resolveDotSegments(pathname, MERGED_OPTS), base);
}
function isCanonicalInScope(canonical, base) {
	return canonical === base || canonical.startsWith(base + "/");
}
function hasDecodableEscape(value) {
	for (let i = value.indexOf("%"); i !== -1; i = value.indexOf("%", i + 1)) {
		const byte = escapeByte(value, nestingEnd(value, i));
		if (byte !== 47 && byte !== 92) return true;
	}
	return false;
}
function flattenNesting(path) {
	let flat = "";
	let last = 0;
	for (let i = path.indexOf("%"); i !== -1; i = path.indexOf("%", i + 1)) {
		const end = nestingEnd(path, i);
		if (end === i + 1) continue;
		const byte = escapeByte(path, end);
		if (byte === 47 || byte === 92) continue;
		flat += path.slice(last, i) + (byte === -1 ? "%25" : "%");
		last = end;
	}
	return last === 0 ? path : flat + path.slice(last);
}
function nestingEnd(value, index) {
	let end = index + 1;
	while (value.charCodeAt(end) === CHAR_2 && value.charCodeAt(end + 1) === CHAR_5) end += 2;
	return end;
}
function escapeByte(value, index) {
	const high = hexDigit(value.charCodeAt(index));
	const low = hexDigit(value.charCodeAt(index + 1));
	return high === -1 || low === -1 ? -1 : high * 16 + low;
}
function hexDigit(code) {
	if (code >= 48 && code <= 57) return code - 48;
	if (code >= 97 && code <= 102) return code - 87;
	if (code >= 65 && code <= 70) return code - 55;
	return -1;
}
var QUERY_UNSAFE_RE = /[#&+;=?]/g;
var asQueryValue = (tail) => tail.replace(QUERY_UNSAFE_RE, (c) => "%" + c.charCodeAt(0).toString(16).toUpperCase());
var asPath = (tail) => tail;
var AUTHORITY_RE = /^(?:[a-z][a-z\d+.-]*:[/\\]*|[/\\]{2,})[^/\\?#]*/i;
function authorityEnd(target) {
	return AUTHORITY_RE.exec(target)?.[0].length ?? 0;
}
function parseSplatTemplate(target) {
	let index = target.indexOf("**");
	if (index === -1 || index <= authorityEnd(target)) return;
	const marker = target.search(/[?#]/);
	const valueStart = marker === -1 ? Number.POSITIVE_INFINITY : marker;
	const literals = [];
	const encoders = [];
	let last = 0;
	for (; index !== -1; index = target.indexOf("**", last)) {
		literals.push(target.slice(last, index));
		encoders.push(index > valueStart ? asQueryValue : asPath);
		last = index + 2;
	}
	literals.push(target.slice(last));
	return {
		literals,
		encoders
	};
}
function interpolateSplat(template, tail) {
	const { literals, encoders } = template;
	let resolved = literals[0];
	for (let i = 0; i < encoders.length; i++) resolved += encoders[i](tail) + literals[i + 1];
	return resolved;
}
var LEADING_SEPARATOR_RUN_RE = /^(?:[/\\]|%(?:25)*(?:2f|5c))+/i;
var DYNAMIC_PATTERN_RE = /[:*()\\]/;
var VARIABLE_WIDTH_SEGMENT_RE = /^\*\*|^:.*[?*+]$/;
function prepareRuleTarget(options) {
	const target = options?.to;
	if (!target) return;
	const base = options?.base;
	if (target.endsWith("/**")) {
		const baseTarget = target.slice(0, -3);
		const baseTargetPath = targetBasePath(baseTarget);
		const resolveTail = prepareTailResolver(base);
		return (event) => {
			const resolved = joinURL(baseTarget, resolveTail(event) + event.url.search);
			assertTargetInScope(resolved, baseTargetPath);
			return resolved;
		};
	}
	const template = base === void 0 ? void 0 : parseSplatTemplate(target);
	if (template) {
		const prefix = template.literals[0];
		const baseTargetPath = targetBasePath(prefix);
		const resolveTail = prepareTailResolver(base);
		return (event) => {
			const resolved = interpolateSplat(template, resolveTail(event).slice(1));
			assertTargetInScope(resolved, baseTargetPath);
			assertTargetOrigin(resolved, prefix, event.url);
			return appendSearch(resolved, event.url.search);
		};
	}
	return (event) => appendSearch(target, event.url.search);
}
function prepareTailResolver(base) {
	const baseSegments = base && DYNAMIC_PATTERN_RE.test(base) ? patternSegmentCount(base) : 0;
	return (event) => {
		const rawPath = event.url.pathname;
		let scopeBase = base;
		if (baseSegments) {
			scopeBase = leadingSegments(rawPath, baseSegments);
			if (scopeBase === void 0) throw new HTTPError({ status: 400 });
		}
		if (!scopeBase) return rawPath.replace(LEADING_SEPARATOR_RUN_RE, "/");
		if (!isLiterallyInScope(rawPath, scopeBase)) {
			const decoded = decodedPath(rawPath);
			const derived = decoded === rawPath || !isLiterallyInScope(decoded, decodedPath(scopeBase)) ? void 0 : leadingSegments(rawPath, countSegments(scopeBase));
			if (derived === void 0) throw new HTTPError({ status: 400 });
			scopeBase = derived;
		}
		return withoutBase(rawPath, scopeBase);
	};
}
function targetBasePath(prefix) {
	const path = getURLPathname(prefix);
	return path.endsWith("/") ? path.slice(0, -1) : path;
}
function appendSearch(target, search) {
	if (!search) return target;
	const hashIndex = target.indexOf("#");
	const targetBase = hashIndex === -1 ? target : target.slice(0, hashIndex);
	const targetHash = hashIndex === -1 ? "" : target.slice(hashIndex);
	return targetBase + (targetBase.includes("?") ? targetBase.endsWith("?") || targetBase.endsWith("&") ? "" : "&" : "?") + search.slice(1) + targetHash;
}
function assertTargetInScope(resolved, baseTargetPath) {
	if (!isFinalTargetInScope(getURLPathname(resolved), baseTargetPath)) throw new HTTPError({ status: 400 });
}
function assertTargetOrigin(resolved, prefix, url) {
	let expected;
	let actual;
	try {
		expected = new URL(prefix, url);
		actual = new URL(resolved, url);
	} catch {
		throw new HTTPError({ status: 400 });
	}
	if (expected.origin !== actual.origin || expected.protocol !== actual.protocol) throw new HTTPError({ status: 400 });
}
function isFinalTargetInScope(pathname, baseTargetPath) {
	if (baseTargetPath) return isPathInScope(pathname, baseTargetPath);
	const run = LEADING_SEPARATOR_RUN_RE.exec(pathname);
	return run === null || run[0] === "/";
}
function isLiterallyInScope(pathname, base) {
	return isPathInServedScope(pathname, base) && (pathname === base || pathname.startsWith(base + "/"));
}
function patternSegmentCount(base) {
	const segments = splitSegments(base);
	let depth = 0;
	for (const segment of segments) {
		if (VARIABLE_WIDTH_SEGMENT_RE.test(segment)) return 0;
		for (let i = 0; i < segment.length; i++) if (segment[i] === "{") depth++;
		else if (segment[i] === "}") depth--;
		if (depth !== 0) return 0;
	}
	return segments.length;
}
function countSegments(base) {
	return splitSegments(base).length;
}
function splitSegments(base) {
	return (base.startsWith("/") ? base.slice(1) : base).split("/");
}
function leadingSegments(pathname, count) {
	let index = 0;
	for (let i = 0; i < count; i++) {
		index = pathname.indexOf("/", index + 1);
		if (index === -1) return i === count - 1 ? pathname : void 0;
	}
	return pathname.slice(0, index);
}
// ../../node_modules/.pnpm/h3@2.0.8_crossws@0.4.17_srvx@1.0.8__ocache@0.3.2/node_modules/h3/dist/normalize.mjs
function recordResets(resets, resetEntries, routeRules, canOverride) {
	for (const entry of resetEntries) {
		const rule = routeRules[entry.name];
		if (!rule || !canOverride?.(entry.route, rule.route)) addReset(resets, entry.name, entry.route);
	}
}
function addReset(resets, name, route) {
	const routes = resets.get(name);
	if (!routes) resets.set(name, [route]);
	else if (!routes.includes(route)) routes.push(route);
}
function canReinstate(resetRoutes, route, canOverride) {
	return !resetRoutes || canOverride !== void 0 && resetRoutes.every((resetRoute) => canOverride(resetRoute, route));
}
function mergeMatchedRouteRules(rawLayers, altLayers, canOverride) {
	if (!altLayers) return resolveLayers(rawLayers);
	const resets = /* @__PURE__ */ new Map();
	const routeRules = resolveLayers(rawLayers, resets, canOverride);
	const resolved = altLayers.map((layers) => layers?.length ? resolveLayers(layers, resets, canOverride) : void 0);
	for (const rules of resolved) if (rules) unionRules(routeRules, rules, resets, canOverride);
	return routeRules;
}
function unionRules(routeRules, resolved, resets, canOverride) {
	for (const [name, rule] of Object.entries(resolved)) {
		const current = routeRules[name];
		if (current) {
			if (canOverride && !canOverride(current.route, rule.route)) continue;
		} else if (!rule.handler?.restricting && !canReinstate(resets.get(name), rule.route, canOverride)) continue;
		mergeRouteRule(routeRules, name, rule, rule.params);
	}
}
function resolveLayers(layers, resets, canOverride) {
	const firstData = layers?.[0]?.data;
	if (firstData && !Array.isArray(firstData)) return resolvePreMergedLayers(layers, resets);
	const routeRules = emptyRouteRules();
	let resetEntries;
	for (const layer of orderedLayers(layers)) for (const entry of layer.data) {
		if (resets && entry.options === false) (resetEntries ||= []).push(entry);
		mergeRouteRule(routeRules, entry.name, entry, layer.params);
	}
	if (resetEntries) recordResets(resets, resetEntries, routeRules, canOverride);
	return routeRules;
}
function isMergeableObject(value) {
	return value !== null && typeof value === "object";
}
function emptyRouteRules() {
	return Object.create(null);
}
function mergeRuleOptions(current, incoming) {
	return isMergeableObject(current) && isMergeableObject(incoming) ? {
		...current,
		...incoming
	} : incoming;
}
function orderedLayers(layers) {
	if (!layers || layers.length < 2) return layers || [];
	let ordered = layers;
	for (let i = 1; i < ordered.length; i++) {
		const layer = ordered[i];
		const rank = layerRank(layer);
		let j = i - 1;
		while (j >= 0 && layerRank(ordered[j]) > rank) {
			if (ordered === layers) ordered = [...layers];
			ordered[j + 1] = ordered[j];
			j--;
		}
		if (j + 1 !== i) ordered[j + 1] = layer;
	}
	return ordered;
}
function layerRank(layer) {
	return layer.data[0]?.rank ?? 0;
}
function resolvePreMergedLayers(rawLayers, resets) {
	const layers = rawLayers.length < 2 ? rawLayers : [...rawLayers].sort((a, b) => a.data.rank - b.data.rank);
	const routeRules = emptyRouteRules();
	const winning = layers[layers.length - 1].data;
	if (resets && winning.resets) for (const name of winning.resets) addReset(resets, name, winning.route);
	for (const entry of winning.rules) {
		const paramRoutes = entry.paramRoutes;
		let params;
		for (const layer of layers) {
			const layerParams = layer.params;
			if (!layerParams) continue;
			const layerRoute = layer.data.route;
			if (paramRoutes ? paramRoutes.includes(layerRoute) : layerRoute === entry.route) params = params ? {
				...params,
				...layerParams
			} : layerParams;
		}
		routeRules[entry.name] = {
			route: entry.route,
			options: entry.options,
			handler: entry.handler,
			params
		};
	}
	return routeRules;
}
function mergeRouteRule(routeRules, ruleName, rule, params) {
	const name = ruleName;
	const currentRule = routeRules[name];
	if (currentRule) {
		if (rule.options === false) {
			delete routeRules[name];
			return;
		}
		currentRule.options = mergeRuleOptions(currentRule.options, rule.options);
		currentRule.route = rule.route;
		if (currentRule.params || params) currentRule.params = {
			...currentRule.params,
			...params
		};
	} else if (rule.options !== false) routeRules[name] = {
		route: rule.route,
		options: rule.options,
		handler: rule.handler,
		params
	};
}
var headers = {
	order: -1,
	handler: (m) => {
		const entries = Object.entries(m.options || {});
		return async function headersRouteRule(event, next) {
			let result;
			try {
				result = await next();
			} catch (error) {
				setRuleHeaders(event, entries, error);
				throw error;
			}
			setRuleHeaders(event, entries, result);
			return result;
		};
	}
};
function setRuleHeaders(event, entries, outcome) {
	const own = outcome instanceof Error && outcome.name === "HTTPError" && outcome.status > 99 ? outcome.headers : void 0;
	for (const [key, value] of entries) {
		event.res.headers.set(key, value);
		if (!own?.has(key)) event.res.errHeaders.set(key, value);
	}
}
var WHOLE_PARAM_SEGMENT_RE = /^:[A-Za-z_]\w*[?+*]?$/;
var CONCRETE_SEGMENT_RE = /^[^:*(){}\\]+$/;
var DOT_SEGMENT_RE = /(?:^|\/)(?:\.|%2e){1,2}(?:\/|$)/i;
var GROUP_RE = /[{}]/;
var canOverrideRouteShape = (currentRoute, incomingRoute) => {
	if (DOT_SEGMENT_RE.test(currentRoute) || DOT_SEGMENT_RE.test(incomingRoute)) return false;
	if (currentRoute === incomingRoute) return true;
	if (GROUP_RE.test(currentRoute) || GROUP_RE.test(incomingRoute)) return false;
	const current = currentRoute.split("/");
	const incoming = incomingRoute.split("/");
	for (let i = 0; i < current.length; i++) {
		const cur = current[i];
		if (cur === "**") return i === current.length - 1 && incoming.length > i && !current.slice(1, i).includes("");
		const inc = incoming[i];
		if (inc === void 0) return false;
		if (cur === inc) continue;
		if ((cur === "*" || WHOLE_PARAM_SEGMENT_RE.test(cur)) && CONCRETE_SEGMENT_RE.test(inc)) continue;
		return false;
	}
	return current.length === incoming.length;
};
function createMatcherFromFind(findRouteRules, canOverride = canOverrideRouteShape) {
	return (method, pathname) => {
		const rawLayers = findRouteRules(method, pathname);
		let altLayers;
		let hasAltMatch = false;
		const readings = alternateReadings(pathname);
		if (readings) {
			altLayers = [];
			for (const reading of readings) {
				const layers = findRouteRules(method, reading);
				if (layers?.length) hasAltMatch = true;
				altLayers.push(layers);
			}
		}
		if (!rawLayers?.length && !hasAltMatch) return {
			routeRules: {},
			matchedRules: {},
			routeRuleMiddleware: []
		};
		const matchedRules = mergeMatchedRouteRules(rawLayers, altLayers, canOverride);
		return {
			routeRules: toRouteRules(matchedRules),
			matchedRules,
			routeRuleMiddleware: buildRouteRuleMiddleware(matchedRules)
		};
	};
}
function toRouteRules(matchedRules) {
	const routeRules = Object.create(null);
	for (const name in matchedRules) routeRules[name] = matchedRules[name].options;
	return routeRules;
}
function buildRouteRuleMiddleware(matchedRules) {
	const routeRuleMiddleware = [];
	const rules = Object.entries(matchedRules);
	if (rules.length > 1) rules.sort(compareRuleOrder);
	for (const [, rule] of rules) {
		if (!rule.handler) continue;
		routeRuleMiddleware.push(rule.handler.handler(rule));
	}
	return routeRuleMiddleware;
}
function memoizeRouteRulesMatcher(matcher, opts) {
	const max = opts?.max ?? 1024;
	if (max <= 0) return matcher;
	const memo = /* @__PURE__ */ new Map();
	let hand;
	const evict = () => {
		for (;;) {
			let next = hand?.next();
			if (!next || next.done) {
				hand = memo.values();
				next = hand.next();
				if (next.done) return;
			}
			const entry = next.value;
			if (entry.visited) entry.visited = false;
			else {
				memo.delete(entry.key);
				return;
			}
		}
	};
	return (method, pathname) => {
		const key = method + " " + pathname;
		const entry = memo.get(key);
		if (entry) {
			entry.visited = true;
			return entry.result;
		}
		const result = matcher(method, pathname);
		if (memo.size >= max) evict();
		memo.set(key, {
			key,
			result,
			visited: false
		});
		return result;
	};
}
function alternateReadings(pathname) {
	const recase = pathname.includes("%") && !isNonCanonicalPathname(pathname);
	const upper = recase ? recaseEscapes(pathname, true) : pathname;
	const lower = recase ? recaseEscapes(pathname, false) : pathname;
	const decoded = decodedPath(pathname);
	const encoded = encodedReading(decoded);
	const lowerEncoded = recaseEscapes(encoded, false);
	if (upper === pathname && lower === pathname && decoded === pathname && encoded === pathname && lowerEncoded === pathname && !needsCanonicalPasses(pathname)) return;
	const readings = [];
	pushReading(readings, pathname, upper);
	pushReading(readings, pathname, lower);
	const spellings = [pathname];
	for (const spelling of [
		encoded,
		lowerEncoded,
		decoded
	]) if (!spellings.includes(spelling)) spellings.push(spelling);
	for (const spelling of spellings) {
		if (!needsCanonicalPasses(spelling)) {
			pushReading(readings, pathname, spelling);
			continue;
		}
		const canonical = canonicalPath(spelling);
		pushReading(readings, pathname, canonical);
		const merged = mergedCanonicalPath(spelling, canonical);
		if (merged !== void 0) pushReading(readings, pathname, merged);
	}
	return readings.length > 0 ? readings : void 0;
}
var ESCAPE_RE_G = /%[\da-f]{2}/gi;
function recaseEscapes(path, upper) {
	return path.includes("%") ? path.replace(ESCAPE_RE_G, (escape) => upper ? escape.toUpperCase() : escape.toLowerCase()) : path;
}
function pushReading(readings, pathname, reading) {
	if (reading !== pathname && !readings.includes(reading)) readings.push(reading);
}
var compareRuleOrder = (a, b) => orderWeight(a[1].handler) - orderWeight(b[1].handler) || (a[0] < b[0] ? -1 : 1);
function orderWeight(handler) {
	return handler?.order ?? 0;
}
// ../../node_modules/.pnpm/h3@2.0.8_crossws@0.4.17_srvx@1.0.8__ocache@0.3.2/node_modules/h3/dist/rules/proxy.mjs
var proxy = {
	order: 2,
	handler: (m) => {
		const options = m.options;
		const resolveTarget = prepareRuleTarget(options);
		if (!resolveTarget) return function proxyRouteRule() {};
		return function proxyRouteRule(event) {
			return proxyRequest(event, resolveTarget(event), { ...options });
		};
	}
};
export { H3Core, HTTPError, NodeResponse, composeMiddleware, createMatcherFromFind, defineHandler, defineLazyEventHandler, headers, memoizeRouteRulesMatcher, proxy, toEventHandler, toRequest };
