import express from 'express';
import bodyParser from 'body-parser';
const router = express.Router();
router.use(bodyParser.json());
import { delete_book_contrib } from '../../database.js';
import { errorHandle } from '../../../frontend/src/utility/errorhandle.js';

export default router.delete('/:contributor_id', async (req, res) => {
    const contributor_id = req.params.contributor_id;
    try {
        if (!contributor_id) {
            res.sendStatus(400);
        }
        else if (contributor_id === " ") {
            res.sendStatus(400);
        }
        else {
            const response = await delete_book_contrib(contributor_id);
            res.status(200).json(response);
            console.log("Delete delete contributor successful: ", contributor_id);
            
        }
        
    } catch (error) {
        errorHandle(error);
    }
})