import apiRequest from "../apiRequest.js";

export async function getRoute(route, id = "") {
    const response = await new apiRequest("localhost", "8080", `/get/${route}/${id}`);
    const data = await response.getRequest();
    return data;
}

export async function postRoute(route, postData) {
    const request = await new apiRequest("localhost", "8080", `/post/${route}/`);
    const response = await request.postRequest(postData);
    if (response.ok) {
        return response.status(200);
    }
    return response;
}