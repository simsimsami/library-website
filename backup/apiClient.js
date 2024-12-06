class ApiError extends Error {
    constructor(status, body, message) {
        super(message);
        this.status = status;
        this.body = body;
    }
}

export const apiClient = (baseUrl, headers) => {
    const makeApiRequest = async (path, options) => {
        const res = await fetch(`${baseUrl}/${path}`, {headers, ...options});

        if (!res.ok)
            throw new ApiError(res.status, await res.json(), "there was a API error");

        return await res.json();
    }

    const get = (path, options = { headers: {} }) => {
        const headers = new Headers({
            "Content-Type": "application/json",
            ...options.headers
        });
        return makeApiRequest(path, {...options, method: 'GET', headers});
    }
    return {get};
}