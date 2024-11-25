import express from 'express';
const router = express.Router();
import { get_book, get_books } from '../database.js';



export default router.get('/:id?', async (req, res) => {
    let book_id = req.params.id;
    if (!book_id) {
        const book = await get_books();
        res.json(book);
    } else {
        const book = await get_book(book_id);
        res.json(book);
    }
})