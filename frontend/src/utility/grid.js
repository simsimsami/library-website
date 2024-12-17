export function grid(data) {
    const gridItem = document.createElement('div');
    gridItem.setAttribute("class", "grid-item");
    gridItem.innerHTML = data;
    return gridItem;
}
