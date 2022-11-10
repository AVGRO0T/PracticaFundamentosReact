import client from "../../clientApi/client";

export const getTags = () => {
    return client.get('api/v1/adverts/tags')
}
