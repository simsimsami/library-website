export async function errorHandle(error) {
    throw new Error(`Error Name: ${error.name}: ${error.message}`);
}