CREATE DATABASE library_project;
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

ALTER SEQUENCE [table]_id_seq RESTART;

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
            REFERENCES publisher(publisher_id)
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
