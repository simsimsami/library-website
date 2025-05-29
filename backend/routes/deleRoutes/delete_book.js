import express, { response } from 'express';;
import bodyParser from 'body-parser';
const router = express.Router();
router.use(bodyParser.json());
import { delete_book } from '../../database.js';
import { errorHandle } from '../../../frontend/src/utility/errorhandle.js';

export default router.delete('/:book_id', async (req, res) => {
    const book_id = req.params.book_id;
    try {
        if (!book_id) {
            res.sendStatus(400);
        }
        else if (book_id === " ") {
            res.sendStatus(400);
        }
        else {
            const response = await delete_book(book_id);
            res.status(200).json(response);
            console.log("Delete book successful: ", book_id);
            
        }
    } catch (error) {
        errorHandle(error)
    }
})