import express from 'express';
import getContrib from './backend/routes/getRoutes/get_contribs.js';
import getPublish from './backend/routes/getRoutes/get_publishers.js';
import getSubject from './backend/routes/getRoutes/get_subject.js';
import getBook from './backend/routes/getRoutes/get_books.js';
import getRole from './backend/routes/getRoutes/get_roles.js'

import postContrib from './backend/routes/postRoutes/post_contrib.js'
import postBookContrib from './backend/routes/postRoutes/post_book_contrib.js'

import path from 'path';
import { fileURLToPath } from 'url';
import { KEYS } from './config/keys.js';

class Server {
    constructor() {
        this.port = process.env.PORT || 8000;
        this.app = express();
        
        this.routes();
        this.config();
    }

    config() {
        const __filename = fileURLToPath(import.meta.url);
        const __dirname = path.dirname(__filename);


        this.app.use(express.static(path.join(__dirname, '/public')));
        this.app.use(express.json());
        this.app.get('/', async (req, res) => {
            res.sendFile(path.join(__dirname, 'public.index.html'));
        });
    }

    routes() {
        this.app.use('/get/contrib', getContrib);
        this.app.use('/get/publisher', getPublish);
        this.app.use('/get/subject', getSubject);
        this.app.use('/get/book', getBook);
        this.app.use('/get/role', getRole);
        
        this.app.use('/post/contrib', postContrib);
        this.app.use('/post/bookContrib', postBookContrib);
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log("Server is listening on PORT ", this.port);
        })
    }
}

export default Server;