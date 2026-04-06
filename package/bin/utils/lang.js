import osLocale from "os-locale";
export const getLocale = () => {
    const locale = osLocale();
    if (locale.startsWith("zh")) {
        return "zh_cn";
    }
    return "en_us";
};
