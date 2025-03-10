export async function errorHandle(error) {
    throw new Error(`Error: ${error}: ${error.status}`);
}