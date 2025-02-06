import express from 'express';
import bodyParser from 'body-parser';
const router = express.Router();
router.use(bodyParser.json());
import { post_subject } from '../../database.js';
import { errorHandle } from '../../../frontend/src/utility/errorhandle.js';

export default router.post('/', async (req, res) => {
    const body = req.body;
    const { subject_title } = req.body;
    try {
        if (!subject_title) {
            res.sendStatus(400);
        }
        else if (subject_title === " ") {
            res.sendStatus(400);
        }
        else {
            const response = await post_subject(body.subject_title);
            res.status(200);
        }
    } catch (error) {
        errorHandle(error);
    }
})