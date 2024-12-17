export function inputText(id, placeholder) {
    const input = document.createElement('input');
    input.setAttribute("type", "text")
    input.setAttribute("placeholder", placeholder)
    input.setAttribute("id", id);
    input.setAttribute("className", "input-class");
    input.setAttribute("name", id);
    return input;
}