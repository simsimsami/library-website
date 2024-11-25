import express from 'express';
import getContrib from './backend/routes/get_contribs.js';
import getPublish from './backend/routes/get_publishers.js';
import getSubject from './backend/routes/get_subject.js';
import getBook from './backend/routes/get_books.js';
import path from 'path';
import { fileURLToPath } from 'url';
import { KEYS } from './config/keys.js'

const app = express();
const __filename = fileURLToPath(import.meta.url); // get the resolved path to the file
const __dirname = path.dirname(__filename); // get the name of the directory
app.use(express.static(__dirname + '/public'))


app.get('/', async (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
    // console.log(__dirname, '../public/index.html');
});

// posts

app.listen(KEYS.PORT, () => {
    console.log("Server is listening on PORT", KEYS.PORT);
});

app.use('/get/contrib', getContrib);
app.use('/get/publisher', getPublish);
app.use('/get/subject', getSubject);
app.use('/get/book', getBook);