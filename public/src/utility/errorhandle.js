export async function errorHandle(response) {
    throw new Error(`Response Status: ${response.status}`);
}