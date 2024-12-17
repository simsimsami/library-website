export function elementCreator(element, id, innerHTML) {
    const create = document.createElement(element);
    create.id = id;
    create.innerHTML = innerHTML;
    return create;
}
