export async function errorHandle(error) {
    throw new Error(`${error.name}: ${error.message}`);
}