import express from 'express';
const router = express.Router();
import { get_subjects, get_subject } from '../database.js';

export default router.get('/:id?', async (req, res) => {
    let sub_id = req.params.id;
    if (!sub_id) {
        const subject = await get_subjects();
        res.json(subject);
    } else {
        const subject = await get_subject(sub_id);
        res.json(subject);
    }
});