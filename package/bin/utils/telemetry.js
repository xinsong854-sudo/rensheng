import axios from "axios";
import pkg from "../../package.json" with { type: "json" };
const DISABLE_TELEMETRY = process.env["DISABLE_TELEMETRY"] === "1";
const IS_DEV = process.env["NODE_ENV"] === "development";
const api = axios.create({
    baseURL: "https://gator.volces.com/v2/event/json",
    headers: {
        "content-type": "application/json",
        "x-mcs-appkey": "e8cf31177d1687876753d8359bf633258f9c5c8e8b63e7b061affe59fe1f106d",
    },
});
let _user = null;
let _header = {
    app_name: "neta_cli",
    app_package: pkg.name,
    app_version: pkg.version,
};
export const trackConfigUser = (user) => {
    _user = user;
};
export const trackConfig = (config) => {
    _header = {
        ..._header,
        ...config,
    };
};
const logger = console;
export const track = (event, params) => {
    if (DISABLE_TELEMETRY)
        return;
    api
        .post("/", {
        user: _user,
        header: {
            ..._header,
        },
        events: [
            {
                event,
                params,
                local_time_ms: Date.now(),
            },
        ],
    })
        .then((e) => {
        if (!IS_DEV)
            return;
        if (e.status === 200)
            return;
        logger.warn("[telemetry] track error: %s %o", e.status, e.data);
    })
        .catch((e) => {
        if (!IS_DEV)
            return;
        logger.warn("[telemetry] track error: %o", e);
    });
};
export const formatCommandParams = (params) => {
    return Object.fromEntries(Object.entries(params).map(([key, value]) => {
        if (typeof value === "string") {
            return [`param_${key}`, value];
        }
        if (typeof value === "number") {
            return [`param_${key}`, value];
        }
        if (typeof value === "boolean") {
            return [`param_${key}`, value];
        }
        if (Array.isArray(value)) {
            if (value.every((item) => typeof item === "string")) {
                return [`param_${key}`, value];
            }
            if (value.every((item) => typeof item === "number")) {
                return [`param_${key}`, value];
            }
        }
        return [`param_${key}`, JSON.stringify(value)];
    }));
};
