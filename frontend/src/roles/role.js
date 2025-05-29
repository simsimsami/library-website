import { grid } from "../utility/grid.js";
import { deleteRoute, getRoute, postRoute } from "../apiFrontSetup.js";
import { errorHandle } from "../utility/errorhandle.js";
import { elementCreator } from "../utility/elementCreator.js";

function isNumber(n) { return /^-?[\d.]+(?:e-?\d+)?$/.test(n); } 


export async function roleData(id = "") {
    try {
        if (isNumber(id) === true || !id) {
            const data = await getRoute("role");
            return data;
        }
        else {
            errorHandle("roleData. ID input is not valid, is not a number or other");
            console.log("here is the value: ",id);
            console.log(isNumber(id));
        }
   }
   catch (e) {
       errorHandle(e, "roleData function");
   }
}

export async function listRoleData() {
    try {
        const data = await roleData();
        
        const currentDiv = document.querySelector("#records");
        currentDiv.innerHTML = "";

        for (const items in data) {
            const card = elementCreator("div", data[items].contribution_role_id, " ");
            card.setAttribute("class", "grid-container");

            const contriRoleTitle = grid(data[items].contribution_role_title);
            const createdAt = grid(data[items].created_at);

            const delButton = elementCreator("button", data[items].contribution_role_id, "Delete Role");
            delButton.setAttribute("class", "contribRoleDeleteButton");

            card.append(contriRoleTitle, createdAt, delButton);
            currentDiv.appendChild(card);
        }

    } catch (e) {
        errorHandle(e, "role roleData function");
    }
}


export async function deleteContribRole(event) {
    try {
        const contribRoleId = event.id;

        const request = await deleteRoute("role", contribRoleId);
        if (!request.ok) {
            errorHandle(request);
        }
                
    } catch (error) {
        errorHandle(error);
    }
}