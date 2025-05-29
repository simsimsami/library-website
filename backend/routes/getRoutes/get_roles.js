import express, { json } from 'express';
const router = express.Router();
import { get_contrib_roles, get_contrib_role } from '../../database.js';

export default router.get('/:id?', async (req, res) => {
    const role_id = req.params.id;
    if (!role_id) {
        const roles = await get_contrib_roles();
        res.status(200).json(roles);
    }
    else {
        const roles = await get_contrib_role(role_id);
        res.status(200).json(roles);
    }
});