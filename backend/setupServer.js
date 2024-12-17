import express from 'express';
import getContrib from './routes/getRoutes/get_contribs.js';
import getPublish from './routes/getRoutes/get_publishers.js';
import getSubject from './routes/getRoutes/get_subject.js';
import getBook from './routes/getRoutes/get_books.js';
import getRole from './routes/getRoutes/get_roles.js'

import postContrib from './routes/postRoutes/post_contrib.js'
import postBookContrib from './routes/postRoutes/post_book_contrib.js'

import path from 'path';
import { fileURLToPath } from 'url';
import { KEYS } from '../config/keys.js'


class Server {
    constructor() {
        this.PORT = KEYS.PORT || 8000;
        this.app = express();

        this.routes();
        this.config();
    }

    config() {
        const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
        const __dirname = path.dirname(__filename); // get the name of the directory

        console.log(__dirname);
        
        // Middleware
        this.app.use(express.static(path.join(__dirname, '../', '/frontend')));

        // __dirname + "/[folder]", always remember the "/". not "./", but just "/"

        /*
        taking break. cant serve static files in frontend from this directory
        */

        this.app.use(express.json());
        
        // Routes
        this.app.get('/', async (req, res) => {
            res.sendFile(path.join(__dirname, '../', '/frontend','/index.html'));
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
        this.app.listen(this.PORT, () => {
            console.log("Server is listening on PORT ", this.PORT);
        });
    }
}


export default Server;