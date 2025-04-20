import { grid } from "../utility/grid.js";
import { getRoute, postRoute } from "../apiFrontSetup.js";
import { errorHandle } from "../utility/errorhandle.js";
import { elementCreator } from "../utility/elementCreator.js";
import { setupSelect } from "../utility/setupSelect.js";
import { inputText } from "../utility/inputText.js";

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