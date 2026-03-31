export const createOssApis = (client) => {
    const getStsCredentials = async (suffix) => {
        const res = await client.get("/v1/oss/sts-upload-token", {
            params: {
                suffix,
            },
        });
        return res.data;
    };
    const getVideoStsCredentials = async (suffix) => {
        const res = await client.get("/v1/oss/anonymous-upload-token", {
            params: {
                suffix,
            },
        });
        return res.data;
    };
    return {
        getStsCredentials,
        getVideoStsCredentials,
    };
};
