import express from 'express';
import bodyParser from 'body-parser';
const router = express.Router();
router.use(bodyParser.json());
import { post_contrib } from '../database.js';

export default router.post('/', async (req, res) => {
    const body = req.body;
    console.log(body);
    try {
        const response = await post_contrib(body.contributor_first_name, body.contributor_last_name, body.contributor_title)
        console.log("Post successfully done");
        res.json(response);
    } catch (error) {
        console.log(error.message);
    }
});