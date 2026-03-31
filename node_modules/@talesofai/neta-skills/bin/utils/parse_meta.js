import { readFileSync } from "node:fs";
import { Value } from "@sinclair/typebox/value";
import yaml from "yaml";
import { getLocale as getLocaleFromLang } from "./lang.js";
let _locale = "en_us";
export const setLocale = (locale) => {
    _locale = locale ?? getLocaleFromLang();
};
export const getLocale = () => {
    return _locale;
};
export const parseMeta = (schema, importMeta) => {
    const file = readFileSync(importMeta.filename.replace(/\.(ts|js)$/, `.${_locale}.yml`), "utf-8");
    const data = yaml.parse(file);
    return Value.Parse(schema, data);
};
