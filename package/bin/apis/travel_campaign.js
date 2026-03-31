export const createTravelCampaignApis = (client) => {
    const createCampaign = async (params) => {
        return client
            .post("/v3/travel/campaign/", params)
            .then((res) => res.data);
    };
    const updateCampaign = async (uuid, params) => {
        return client
            .patch(`/v3/travel/campaign/${uuid}`, params)
            .then((res) => res.data);
    };
    const listMyCampaigns = async (query) => {
        return client
            .get("/v3/travel/campaigns", {
            params: query,
        })
            .then((res) => res.data);
    };
    const getCampaign = async (uuid) => {
        return client
            .get(`/v3/travel/campaign/${uuid}`)
            .then((res) => res.data);
    };
    return {
        createCampaign,
        updateCampaign,
        listMyCampaigns,
        getCampaign,
    };
};
