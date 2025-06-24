CREATE DATABASE library_project;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

ALTER SEQUENCE [table]_id_seq RESTART [last items id];

-- use "DO $SYNTAX_CHECK$ BEGIN RETURN;" 
-- -- INSERT SQL here (for SQL checks)
--- "END; $SYNTAX_CHECK$;"

--- Contributor first ---

-- I might redo the contributor table...

DO $SYNTAX_CHECK$ BEGIN RETURN;
CREATE TABLE contributor (
    contributor_id uuid DEFAULT uuid_generate_v4(),
    contributor_first_name varchar(255),
    contributor_last_name varchar(255),
    contributor_title varchar(255),
    created_at timestamp default current_timestamp,
    PRIMARY KEY (contributor_id)
);
END; $SYNTAX_CHECK$;

DO $SYNTAX_CHECK$ BEGIN RETURN;
CREATE TABLE publisher(
    publisher_id serial,
    publisher_name varchar(36),
    created_at timestamp default current_timestamp,
    PRIMARY KEY (publisher_id)
);
END; $SYNTAX_CHECK$;


DO $SYNTAX_CHECK$ BEGIN RETURN;
CREATE TABLE book (
    book_id INT GENERATED ALWAYS AS IDENTITY,
    book_title varchar(200) NOT NULL,
    book_release_date varchar(10),
    publisher_id int,
    ISBN varchar(20),
    created_at timestamp default current_timestamp,
    PRIMARY KEY (book_id),
    CONSTRAINT fk_publisher
        FOREIGN KEY(publisher_id)
            REFERENCES publisher(publisher_id) on delete cascade
);
END; $SYNTAX_CHECK$;

DO $SYNTAX_CHECK$ BEGIN RETURN;
CREATE TABLE subject (
    subject_id INT GENERATED ALWAYS AS IDENTITY,
    subject_title varchar(200),
    created_at timestamp default current_timestamp,
    PRIMARY KEY (subject_id)
);
END; $SYNTAX_CHECK$;

DO $SYNTAX_CHECK$ BEGIN RETURN;
CREATE TABLE contribution_role (
    contribution_role_id INT GENERATED ALWAYS AS IDENTITY,
    contribution_role_title varchar(400) NOT NULL,
    created_at timestamp default current_timestamp,
    PRIMARY KEY (contribution_role_id)
);
END; $SYNTAX_CHECK$;

DO $SYNTAX_CHECK$ BEGIN RETURN;
CREATE TABLE books_contributor (
    book_id INT NOT NULL, 
    contributor_id UUID NOT NULL,
    contribution_role_id INT NOT NULL,
    FOREIGN KEY (book_id) REFERENCES book(book_id) on delete cascade,
    FOREIGN KEY (contributor_id) REFERENCES contributor(contributor_id) on delete cascade,
    FOREIGN KEY (contribution_role_id) REFERENCES contribution_role(contribution_role_id) on delete cascade
);

END; $SYNTAX_CHECK$;

DO $SYNTAX_CHECK$ BEGIN RETURN;
CREATE TABLE subject_books (
    book_id INT NOT NULL,
    subject_id INT NOT NULL,
    FOREIGN KEY (book_id) REFERENCES book(book_id) on delete cascade,
    FOREIGN KEY (subject_id) REFERENCES subject(subject_id) on delete cascade
);

END; $SYNTAX_CHECK$;

DO $SYNTAX_CHECK$ BEGIN RETURN;
CREATE TABLE book_publishers (
);

END; $SYNTAX_CHECK$;

-- select book and publishers
SELECT
    b.book_id,
    b.book_title,
    p.publisher_name,
    b.book_release_date,
    b.isbn
FROM
    book b
    INNER JOIN publisher p 
    ON b.publisher_id = p.publisher_id
ORDER BY
    b.book_id;


SELECT
    b.book_title, 
    con.contributor_title, 
    con.contributor_first_name, 
    con.contributor_last_name, 
    con_role.contribution_role_title, 
    p.publisher_name 
FROM books_contributor book_con 
INNER JOIN book b ON b.book_id = book_con.book_id 
INNER JOIN contributor con ON con.contributor_id = book_con.contributor_id 
INNER JOIN contribution_role con_role ON con_role.contribution_role_id = book_con.contribution_role_id 
INNER JOIN publisher p ON b.publisher_id = p.publisher_id 
WHERE b.book_id = $1

select book.book_id, book.book_title, book.isbn, subject.subject_title, publisher.publisher_name, contributor.contributor_first_name, contributor.contributor_last_name
from subject_books
inner join subject on subject.subject_id = subject_books.subject_id
inner join book on book.book_id = subject_books.book_id
inner join publisher on publisher.publisher_id = book.book_id;
inner join contributor


INNER JOIN publisher ON publisher.publisher_id = book.publisher_id
INNER JOIN subject ON subject.subject_id = subject_books.subject_id
INNER JOIN subject_books ON subject_books.book_id = book.book_id
WHERE book.book_id = 1;

select book.book_title, subject.subject_title
from subject_books
inner join subject on subject.subject_id = subject_books.subject_id
inner join book on book.book_id = subject_books.book_id;

-- book, book_contributors contributor, publisher, subject_books, subject.
-- book -> book_contributor
-- contribution_role -> books_contributor
-- contributor -> books_contributor
-- book -> publisher

--  no subject yet
-- book -> subject_books
-- subject -> subject_books

-- getting information on who has contributed to what in books

SELECT
    b.book_title,
    con.contributor_title,
    con.contributor_first_name,
    con.contributor_last_name,
    con_role.contribution_role_title,
    p.publisher_name

FROM books_contributor book_con
INNER JOIN book b ON b.book_id = book_con.book_id
INNER JOIN contributor con ON con.contributor_id = book_con.contributor_id
INNER JOIN contribution_role con_role ON con_role.contribution_role_id = book_con.contribution_role_id
INNER JOIN publisher p ON b.publisher_id = p.publisher_id

WHERE b.book_id = 1;


-- missed genre/subject

SELECT 
b.book_title, 
con.contributor_title, 
con.contributor_first_name, 
con.contributor_last_name, 
con_role.contribution_role_title,
s.subject_title

FROM books_contributor book_con 
INNER JOIN book b ON b.book_id = book_con.book_id 
INNER JOIN contributor con ON con.contributor_id = book_con.contributor_id 
INNER JOIN contribution_role con_role ON con_role.contribution_role_id = book_con.contribution_role_id 

INNER JOIN subject_books sub_books ON sub_books.book_id = b.book_id
INNER JOIN subject s ON s.subject_id = sub_books.subject_id
WHERE b.book_id = 1;



-- fixing query

SELECT b.book_title, s.subject_title, con.contributor_title, con.contributor_first_name, con.contributor_last_name, con_role.contribution_role_title, 
p.publisher_name FROM books_contributor book_con 
INNER JOIN book b ON b.book_id = book_con.book_id 
INNER JOIN contributor con ON con.contributor_id = book_con.contributor_id 
INNER JOIN contribution_role con_role ON con_role.contribution_role_id = book_con.contribution_role_id 
INNER JOIN subject_books sub_books ON sub_books.book_id = b.book_id 
INNER JOIN subject s ON s.subject_id = sub_books.subject_id 
INNER JOIN publisher p ON b.publisher_id = p.publisher_id WHERE b.book_id = 1;

-- edit version - incase of fuck up 

SELECT b.book_title, con.contributor_title, con.contributor_first_name, con.contributor_last_name, con_role.contribution_role_title
FROM books_contributor books_con
INNER JOIN book b ON b.book_id = books_con.book_id
INNER JOIN contribution_role con_role ON con_role.contribution_role_id = books_con.contribution_role_id
INNER JOIN contributor con ON con.contributor_id = books_con.contributor_id
WHERE b.book_id = 1;


select b.book_id, b.book_title, b.book_release_date, b.isbn, b.created_at, p.publisher_name, s.subject_title
from book b
INNER JOIN publisher p ON p.publisher_id = b.publisher_id
INNER JOIN subject_books sb ON sb.book_id = b.book_id
INNER JOIN subject s ON s.subject_id = sb.subject_id




-- list book subjects

select b.book_id, b.book_title, b.book_release_date, b.isbn, b.created_at, p.publisher_name, STRING_AGG(
    s.subject_title, 
    ', '
    ORDER BY
    b.book_id
    ) subject_name

from book b
INNER JOIN publisher p ON p.publisher_id = b.publisher_id
INNER JOIN subject_books sb ON sb.book_id = b.book_id
INNER JOIN subject s ON s.subject_id = sb.subject_id
GROUP BY b.book_id, b.book_title, b.book_release_date, b.isbn, b.created_at, p.publisher_name

