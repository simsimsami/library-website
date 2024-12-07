import express from 'express';
import bodyParser from 'body-parser';
const router = express.Router();
router.use(bodyParser.json());
import { post_bookContrib } from '../../database.js';

export default router.post('/', async (req, res) => {
    const body = req.body;
    console.log(body);
    try {
        const response = await post_bookContrib(body.book_id, body.contributor_id, body.contribution_role_id);
        console.log("Post successfully done");
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
})