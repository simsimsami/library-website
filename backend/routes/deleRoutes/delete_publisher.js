import express from 'express';
import bodyParser from 'body-parser';
const router = express.Router();
router.use(bodyParser.json());
import { delete_publisher } from '../../database.js';
import { errorHandle } from '../../../frontend/src/utility/errorhandle.js';

export default router.delete('/:publisher_id', async (req, res) => {
    const publisher_id = req.params.publisher_id;
    try {
        if (!publisher_id) {
            res.sendStatus(400);
            console.log(publisher_id);
            console.log("publisher id is !publisher_id: ", publisher_id);
            
        }
        else if (publisher_id === " ") {
            res.sendStatus(400);
            console.log("publisher id == ' ', ",publisher_id);
        }
        else {
            const response = await delete_publisher(publisher_id);
            res.status(200).json(response);
            console.log("Delete delete contributor successful: ", publisher_id);
            
        }
        
    } catch (error) {
        errorHandle(error);
    }
})