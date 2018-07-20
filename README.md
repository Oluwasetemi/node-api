# node-api

Created a restful api using node, express, mongodb and mongoose

- it follows the RESTful route system.
- the master branch was done using mongodb node client and the `api-mongoose` is using mongoose - a ORM for mongoDB.

## Motivation

Creating an API that follows the RESTful route pattern and is built to model the CRUD System.

### Available Routes

Use POSTMAN to check the following routes.

Create
`www.localhost:7777/notes` using a `POST`

All the details will be in the request.body.

Read
`www.localhost:7777/notes` using a `GET` to find all the notes.

`www.localhost:7777/notes/:id` using a `GET`

Update
`www.localhost:7777/notes/:id` using a `PUT`

NB: Always put the updated value in the request.body.

Delete
`www.localhost:7777/notes/:id` using a `DELETE`