import { errorHandle } from "./errorhandle.js";

export function elementCreator(element, id, innerHTML) {
    try {
        if (id === "") {
            const create = document.createElement(element);
            create.innerHTML = innerHTML;
            return create;
        }
        const create = document.createElement(element);
        create.id = id;
        create.innerHTML = innerHTML;
        return create;
    } catch (error) {
        errorHandle(error.message);    
    }
}
