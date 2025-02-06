import express from 'express';
import bodyParser from 'body-parser';
const router = express.Router();
router.use(bodyParser.json());
import { post_book_contrib } from '../../database.js';
import { errorHandle } from '../../../frontend/src/utility/errorhandle.js';


export default router.post('/', async (req, res) => {
    const body = req.body;
    const { book_id } = req.body;
    const { contributor_id } = req.body;
    const { contribution_role_id } = req.body;
    try {
        if (!book_id || !contributor_id || !contribution_role_id) {
            res.sendStatus(400);
            console.log("book_id, contributor_id or contribution_role_id doesnt exist. Output");
            console.log("book_id: ", book_id);
            console.log("contributor_id: ", contributor_id);
            console.log("contribution_role_id: ", contribution_role_id);
            
        }
        else if (book_id === " " || contributor_id === " " || contribution_role_id === " ") {
            res.sendStatus(400);
            console.log("book_id, contributor_id or contribution_role_id doesnt are empty. Output");
            console.log("book_id: ", book_id);
            console.log("contributor_id: ", contributor_id);
            console.log("contribution_role_id: ", contribution_role_id);
        }
        else {
            const response = await post_book_contrib(body.book_id, body.contributor_id, body.contribution_role_id);
            res.status(200).json(response);
        }
    } catch (error) {
        errorHandle(error);
    }
})