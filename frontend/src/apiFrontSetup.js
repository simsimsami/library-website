import apiRequest from "../apiRequest.js";

export async function getRoute(route, id = "") {
    if (route === "") {
        throw new Error('Empty Input for getRoute');
    }
    else if (!route) {
        throw new Error('No Parameter Input for getRoute');
    }
    const response = await new apiRequest("localhost", "8080", `/get/${route}/${id}`);
    const data = await response.getRequest();
    return data;
}

export async function postRoute(route, postData) {
    if (route === "") {
        throw new Error('Empty Route for postRoute');
    }
    else if (!route) {
        throw new Error('No Parameter Input for postRoute');

    }
    else if (postData === "") {
        throw new Error('Empty postData Input for postRoute');

    } 
    else if (!postData) {
        throw new Error('No postData Input for postRoute');
    }
    const request = await new apiRequest("localhost", "8080", `/post/${route}/`);
    const response = await request.postRequest(postData);
    if (response.ok) {
        return response.status(200);
    }
    return response;
}

export async function deleteRoute(route, id) {
    if (route === "") {
        throw new Error('Empty route for deleteRoute');
    }
    else if (!route) {
        throw new Error('No Parameter Input for deleteRoute');
    }
    const request = await new apiRequest("localhost", "8080", `/delete/${route}/`);
    const response = await request.deleteRequest(id);
    if (response.ok) {
        return response.status(200);
    }
    return response;
}