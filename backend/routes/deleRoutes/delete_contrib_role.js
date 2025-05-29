import express from 'express';
import bodyParser from 'body-parser';
const router = express.Router();
router.use(bodyParser.json());
import { delete_contrib_role } from '../../database.js';
import { errorHandle } from '../../../frontend/src/utility/errorhandle.js';

export default router.delete('/:contributor_role_id', async (req, res) => {
    const contributor_role_id = req.params.contributor_role_id;
    try {
        if (!contributor_role_id) {
            res.sendStatus(400);
        }
        else if (contributor_role_id === " ") {
            res.sendStatus(400);
        }
        else {
            const response = await delete_contrib_role(contributor_role_id);
            res.status(200).json(response);
            console.log("Delete contribution role title successful: ", contributor_role_id);
            
        }
        
    } catch (error) {
        errorHandle(error);
    }
})