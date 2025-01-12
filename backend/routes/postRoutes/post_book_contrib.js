import express from 'express';
import bodyParser from 'body-parser';
const router = express.Router();
router.use(bodyParser.json());
import { post_bookContrib } from '../../database.js';

export default router.post('/', async (req, res) => {
    const body = req.body;
    const { book_id } = req.body;
    const { contributor_id } = req.body;
    const { contribution_role_id } = req.body;
    try {
        if (!book_id || !contributor_id || !contribution_role_id) {
            res.sendStatus(400);
        }
        else {
            const response = await post_bookContrib(body.book_id, body.contributor_id, body.contribution_role_id);
            console.log("Post successfully done");
            res.status(200).json(response);
        }
    } catch (error) {
        console.log(error.message);
    }
})