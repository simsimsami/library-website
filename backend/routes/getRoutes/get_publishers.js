import express from 'express';
const router = express.Router();
import { get_publishers, get_publisher } from '../../database.js';

export default router.get('/:id?', async (req, res) => {
    let publish_id = req.params.id;
    if (!publish_id) {
        const publish = await get_publishers();
        res.json(publish);
    } else {
        const publish = await get_publisher(publish_id);
        res.json(publish);
    }
});
