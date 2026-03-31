export const createTcpApis = (client) => {
    const searchTCPs = async (query) => {
        return client
            .get("/v2/travel/parent-search", { params: query })
            .then((res) => res.data);
    };
    const tcpProfile = async (uuid) => {
        return client
            .get(`/v2/travel/parent/${uuid}/profile`)
            .then((res) => res.data);
    };
    const createCharacter = async (params) => {
        return client
            .post("/v3/oc/character", params)
            .then((res) => res.data);
    };
    const updateCharacter = async (tcp_uuid, params) => {
        return client
            .patch(`/v3/oc/character/${tcp_uuid}`, params)
            .then((res) => res.data);
    };
    const createElementum = async (params) => {
        return client
            .post("/v3/oc/elementum", params)
            .then((res) => res.data);
    };
    const updateElementum = async (tcp_uuid, params) => {
        return client
            .patch(`/v3/oc/elementum/${tcp_uuid}`, params)
            .then((res) => res.data);
    };
    const listMyTCPs = async (query) => {
        return client
            .get("/v2/travel/parent", { params: query })
            .then((res) => res.data);
    };
    return {
        searchTCPs,
        tcpProfile,
        createCharacter,
        updateCharacter,
        createElementum,
        updateElementum,
        listMyTCPs,
    };
};
