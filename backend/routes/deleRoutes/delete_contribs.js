import express from 'express';
import bodyParser from 'body-parser';
const router = express.Router();
router.use(bodyParser.json());
import { delete_contrib } from '../../database.js';
import { errorHandle } from '../../../frontend/src/utility/errorhandle.js';

export default router.delete('/:contributor_id', async (req, res) => {
    const contributor_id = req.params.contributor_id;
    // const { contributor_id } = req.body;
    try {
        if (!contributor_id) {
            res.sendStatus(400);
        }
        else if (contributor_id === " ") {
            res.sendStatus(400);
        }
        else {
            const response = await delete_contrib(contributor_id);
            res.status(200).json(response);
            console.log("Delete successful: ", contributor_id);
            
        }
        
    } catch (error) {
        errorHandle(error);
    }
})