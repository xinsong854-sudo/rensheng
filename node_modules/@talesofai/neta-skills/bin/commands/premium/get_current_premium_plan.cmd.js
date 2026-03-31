import { Type } from "@sinclair/typebox";
import { parseDate } from "../../utils/date.js";
import { parseMeta } from "../../utils/parse_meta.js";
import { createCommand } from "../factory.js";
const PlanningMap = {
    0: "Basic",
    1: "Starter",
    2: "Pro",
    3: "Master",
};
const meta = parseMeta(Type.Object({
    name: Type.String(),
    title: Type.String(),
    description: Type.String(),
}), import.meta);
export const getCurrentPremiumPlan = createCommand({
    name: meta.name,
    title: meta.title,
    description: meta.description,
}, async (_, { apis, user }) => {
    if (!apis.baseUrl.endsWith("talesofai.com")) {
        throw new Error("This command is not supported in the current region");
    }
    if (!user) {
        throw new Error("Not authenticated. Please check your NETA_TOKEN.");
    }
    const level = user.properties?.vip_level ?? 0;
    return {
        plan: PlanningMap[level],
        until: user.properties?.vip_until
            ? parseDate(user.properties.vip_until).format()
            : null,
    };
});
