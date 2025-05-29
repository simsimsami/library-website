import express from 'express';
const router = express.Router();
import { get_contrib, get_contribs } from "../../database.js";

// get_contribs and get_contrib

export default router.get('/:id?', async (req, res) => {
    let contrib_id = req.params.id;
    if (!contrib_id) {
        const contrib = await get_contribs();
        res.status(200).json(contrib);
    } else {
        const contrib = await get_contrib(contrib_id);
        res.status(200).json(contrib);

    }
})
