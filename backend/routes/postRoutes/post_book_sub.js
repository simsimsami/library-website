import express from 'express';
import bodyParser from 'body-parser';
const router = express.Router();
router.use(bodyParser.json());
import { post_book_subject } from '../../database.js';
import { errorHandle } from '../../../frontend/src/utility/errorhandle.js';

export default router.post('/', async (req, res) => {
    const body = req.body;
    const { book_id } = req.body;
    const { subject_id } = req.body;
    
    try {
        if (!book_id || !subject_id) {
            res.sendStatus(400);
            console.log("Nothing is inside ");
            
        }
        else if (book_id === " " || subject_id === " ") {
            res.sendStatus(400);
            console.log("There is only space");
        }
        else {
            const response = await post_book_subject(body.book_id, body.subject_id);
            res.status(200);
        }
    } catch (error) {
        errorHandle(error);
    }
})