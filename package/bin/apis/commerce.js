export const createCommerceApis = (client) => {
    const listPlansConfig = async () => {
        const res = await client.get("/v1/configs/config", {
            params: {
                namespace: "fe_configs",
                key: "plans",
            },
        });
        return res.data;
    };
    const createOrder = async (params) => {
        const res = await client.post("/v1/commerce/orders", params);
        return res.data;
    };
    const orders = async (params) => {
        const res = await client.get("/v1/commerce/orders", {
            params,
        });
        return res.data;
    };
    const order = async (params) => {
        const res = await client.get(`/v1/commerce/orders/${params.order_uuid}`);
        return res.data;
    };
    const pay = async (params) => {
        const { order_uuid, channel, return_url, redirect_url } = params;
        return client
            .post(`/v1/commerce/orders/${order_uuid}/payment/${channel}`, {
            redirect_url,
            return_url,
        })
            .then((res) => res.data);
    };
    return {
        listPlansConfig,
        createOrder,
        orders,
        order,
        pay,
    };
};
