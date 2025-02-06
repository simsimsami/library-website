import { getRoute } from "../apiFrontSetup.js"

export async function getData(parameter) {
    const data = await getRoute(`${parameter}`);
    return data;
}
