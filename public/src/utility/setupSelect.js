export function setupSelect(id, text) {
    const option = document.createElement("option");
    option.value = `${text}`;
    option.id = id;
    option.innerHTML = text;
    return option;
}