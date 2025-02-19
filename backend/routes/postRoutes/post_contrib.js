import express from 'express';
import bodyParser from 'body-parser';
const router = express.Router();
router.use(bodyParser.json());
import { post_contrib } from '../../database.js';
import { errorHandle } from '../../../frontend/src/utility/errorhandle.js';


export default router.post('/', async (req, res) => {
    const body = req.body;
    const { contributor_title } = req.body;
    const { contributor_first_name } = req.body;
    const { contributor_last_name } = req.body;
    try {
        if (!contributor_title || !contributor_first_name || !contributor_last_name) {
            res.sendStatus(400);
        }
        else if (contributor_title === " " || contributor_first_name === " " || contributor_last_name === " ") {
            res.sendStatus(400);
        }
        else {
            const response = await post_contrib(body.contributor_first_name, body.contributor_last_name, body.contributor_title);
            res.status(200).json(response);
        }
    } catch (error) {
        errorHandle(error);
    }
});