export default function sanitization(word) {
    const str = word.replace(/[^a-z0-9áéíóúñü \.,_-]/gim,"");
    return str.trim();
}