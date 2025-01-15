import express from 'express';
import bodyParser from 'body-parser';
const router = express.Router();
router.use(bodyParser.json());
import { post_contrib_role } from '../../database.js';
import { errorHandle } from '../../../frontend/src/utility/errorhandle.js';

export default router.post('/', async (req, res) => {
    try {
        const body = req.body;
        const { contrib_role_title } = req.body;
        if (!contrib_role_title) {
            res.sendStatus(400);
        } 
        else if (contrib_role_title === " ") {
            res.sendStatus(400);
        }
        else {
            const response = await post_contrib_role(body.contrib_role_title);
            res.status(200).json(response);
        }
    } catch (error) {
        errorHandle(error);
    }
})