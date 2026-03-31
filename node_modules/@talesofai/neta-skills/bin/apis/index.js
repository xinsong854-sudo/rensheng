import axios, { AxiosError } from "axios";
import { catchErrorResponse, handleAxiosError } from "../utils/errors.js";
import { createActivityApis } from "./activity.js";
import { createArtifactApis } from "./artifact.js";
import { createAudioApis } from "./audio.js";
import { createCollectionApis } from "./collection.js";
import { createCommerceApis } from "./commerce.js";
import { createConfigApis } from "./config.js";
import { createFeedsApis } from "./feeds.js";
import { createGptApis } from "./gpt.js";
import { createHashtagApis, } from "./hashtag.js";
import { createOssApis } from "./oss.js";
import { createPromptApis } from "./prompt.js";
import { createRecsysApis } from "./recsys.js";
import { createSpaceApis } from "./space.js";
import { createTaskApis } from "./task.js";
import { createTcpApis } from "./tcp.js";
import { createTravelCampaignApis } from "./travel_campaign.js";
import { createUserApis } from "./user.js";
import { createVerseApis } from "./verse.js";
export const createApis = (option) => {
    const baseUrl = option.baseUrl;
    const logger = option.logger;
    const client = axios.create({
        adapter: "fetch",
        baseURL: baseUrl,
        headers: {
            ...option.headers,
        },
        timeout: 10 * 1000,
    });
    client.interceptors.request.use((config) => {
        const now = Date.now();
        config.start_time = now;
        logger.debug("[api] request: %s %s", config.method, config.url);
        return config;
    });
    client.interceptors.response.use((response) => {
        const now = Date.now();
        const startTime = response.config.start_time ?? now;
        const duration = now - startTime;
        logger.debug("[api] response: %s %s %s %dms", response.config.method, response.status, response.config.url, duration);
        return response;
    }, (error) => {
        if (error instanceof AxiosError) {
            logger.debug("[api] response error: %s %s %s %s", error.request?.method, error.request?.url, error.response?.status, catchErrorResponse(error.response?.data));
        }
        handleAxiosError(error);
    });
    const tcp = createTcpApis(client);
    const artifact = createArtifactApis(client);
    const prompt = createPromptApis(client, tcp, artifact);
    const gpt = createGptApis(client);
    const audio = createAudioApis(client);
    const hashtag = createHashtagApis(client);
    const activity = createActivityApis(client);
    const verse = createVerseApis(client);
    const task = createTaskApis(client);
    const config = createConfigApis(client);
    const user = createUserApis(client);
    const collection = createCollectionApis(client);
    const feeds = createFeedsApis(client);
    const space = createSpaceApis(client);
    const recsys = createRecsysApis(client);
    const travelCampaign = createTravelCampaignApis(client);
    const commerce = createCommerceApis(client);
    const oss = createOssApis(client);
    return {
        baseUrl,
        tcp,
        prompt,
        artifact,
        gpt,
        audio,
        hashtag,
        activity,
        verse,
        task,
        config,
        user,
        collection,
        feeds,
        space,
        recsys,
        travelCampaign,
        commerce,
        oss,
    };
};
