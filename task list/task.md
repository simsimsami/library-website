
## What I have done

- I created a table within the database, called it "contributor".
- I made a get_query request with node.js to get all records in "contributor".
- I made a get_route for the "contributors".
- I made a specific get_route for a single contributor

- Create server
- implement get route in server
- test the 2 get routes with postman
- 2 routes work normally (http://localhost:3000/contrib/'{contrib_id}')

- front end allows the user to see some data.
- - publishers
- - users
- - subjects
- - books

- - made 2 junction tables

-- added post route from front end: books_contribution table

## What to do next

- Fix get request for books (I dont get any publishers. Inner join table);
- make a route for specific entries : eg, click on 1 contributor, and get a list of books and what roles they are in

- when clicking on books, I want to show who has been involved and their roles. Need to show the books contributors and their contribution roles

- post request
- - for subjects
- - for contributor roles
- - publishers

- delete request
- - contributors
- - contributor roles
- - books
- - publishers
- put request (edit and etc)

## tasks

- post class
- post request for contributions
- post request for books
- post request for publishers
- post request for contribution_roles
