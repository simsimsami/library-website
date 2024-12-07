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
import { KEYS } from './config/keys.js'

const app = express();
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory


// Middleware
app.use(express.static(__dirname + '/public'))
app.use(express.json());

// Routes
app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
    // console.log(__dirname, '../public/index.html');
});

app.use('/get/contrib', getContrib);
app.use('/get/publisher', getPublish);
app.use('/get/subject', getSubject);
app.use('/get/book', getBook);
app.use('/get/role', getRole);

app.use('/post/contrib', postContrib);
app.use('/post/bookContrib', postBookContrib);

// Start Server
app.listen(KEYS.PORT, () => {
    console.log("Server is listening on PORT", KEYS.PORT);
});