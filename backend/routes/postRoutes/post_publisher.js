import express from 'express';
import bodyParser from 'body-parser';
const router = express.Router();
router.use(bodyParser.json());
import { post_publisher } from '../../database.js';
import { errorHandle } from '../../../frontend/src/utility/errorhandle.js';

export default router.post('/', async (req, res) => {
    const body = req.body;
    const { publisher_title } = req.body;
    try {
        if (!publisher_title) {
            res.sendStatus(400);
        }
        else if (publisher_title === " ") {
            res.sendStatus(400);
        }
        else {
            const response = await post_publisher(body.publisher_title);
            res.status(200).json(response);
            console.log("Post publisher successful: ", body.publisher_title);
            
        }
    } catch (error) {
        errorHandle(error);
    }
})