import express from 'express';
import bodyParser from 'body-parser';
const router = express.Router();
router.use(bodyParser.json());
import { post_book } from '../../database.js';
import { errorHandle } from '../../../frontend/src/utility/errorhandle.js';

export default router.post('/', async (req, res) => {
    try {
        const body = req.body;
        const { book_title } = req.body;
        const { book_release_date } = req.body;
        const { publisher_id } = req.body;
        const { isbn } = req.body;
        if (!book_title || !book_release_date || !publisher_id || !isbn) {
            res.sendStatus(400);
        }
        else if (book_title === " " || book_release_date === " " || publisher_id === " " || isbn === " ") {
            res.sendStatus(400);
        }
        else {
            const response = await post_book(body.book_title, body.book_release_date, body.publisher_id, body.isbn);
            res.status(200).json(response);
        }
    } catch (error) {
        errorHandle(error);
    }
})