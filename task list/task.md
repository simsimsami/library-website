# Task List

## What I have done

- I created a table within the database, called it "contributor".
- I made a get_query request with node.js to get all records in "contributor".
- I made a get_route for the "contributors".
- I made a specific get_route for a single contributor

- Create server
- implement get route in server
- test the 2 get routes with postman
- 2 routes work normally (<http://localhost:3000/contrib/'{contrib_id}>')

- front end allows the user to see some data.
- - publishers
- - users
- - subjects
- - books
- - made 2 junction tables

-- added post route from front end: books_contribution table
Fix get request for books

-- able to view contributors and their roles in books

- Post routes
- - Books
- - subjects
- - books contributions
- - book subjects
- - contributors
- - publishers

Implemented a cascade in the postgresql for

- books -> books contributor
- books -> books_subject

## What to do next

- make a route for specific entries : eg, click on 1 contributor, and get a list of books and what roles they are in

Implement post to frontend

- Refractor code
- - Rewrite get routes on the frontend

Implement adding subjects to books (multi add? might be a good idea)

I need to workout the vitest integration testing

- Need to be able to assign subjects to books
- - Need to be able to assign multiple contributors to books

- delete request
- - contributors
- - contributor roles
- - books
- - publishers
- put request (edit and etc)

## tasks

delete route

1) books

- For me to remove a specific book from my database, I will need to
- - delete the books information in subject_books table
- - delete the books information in books_contribution table

- delete route for contributors.
- - delete records of contributors -> contributor roles
- - delete records of contributors -> book_contributors

- delete route for books
- - delete records of books -> books contributor
- - delete records of books -> books_subject