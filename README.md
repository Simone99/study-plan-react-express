# Exam #12345: "Exam Title"
## Student: s295316 Zanella Simone 

## React Client Application Routes

- Route `/`: page content and purpose
- Route `/something/:param`: page content and purpose, param specification
- ...

## API Server

- POST `/api/login`
  - request parameters and request body content
  - response body content
- GET `/api/something`
  - request parameters
  - response body content

HTTP Method: GET \
URL: `/api/courses`\
Description: Retrieve all courses stored in DB\
Sample request body: _None_\
Sample response: `200 OK`\
Sample response body:

```
[
  {code:'02GOLOV', name:'Architetture dei sistemi di elaborazione', credits:12, maxStudents: null, incompatibleWith: ['02LSEOV'], preparatoryCourse: null},
  {code:'02LSEOV', name:'Computer architectures', credits:12, maxStudents: null, incompatibleWith: ['02GOLOV'], preparatoryCourse: null},
  {code:'01OTWOV', name:'Computer network technologies and services', credits:6, maxStudents: 3, incompatibleWith: ['02KPNOV'], preparatoryCourse: null},
  {code:'04GSPOV', name:'Software engineering', credits:6, maxStudents: null, incompatibleWith: ['05BIDOV'], preparatoryCourse: '02LSEOV'},
  ...
]
```

Error responses: `500 Internal server error`

HTTP Method: GET \
URL: `/api/courses/:code`\
Description: Retrieve course stored in DB according to the code specified in the URL\
Sample request body: _None_\
Sample response: `200 OK`\
Sample response body:

```
{code:'02GOLOV', name:'Architetture dei sistemi di elaborazione', credits:12, maxStudents: null, incompatibleWith: ['02LSEOV'], preparatoryCourse: null}
```

Error responses: `500 Internal Server Error`, `422 Unprocessable entity`, `404 Not found`

## Database Tables

- Table `users` - contains xx yy zz
- Table `something` - contains ww qq ss
- ...

## Main React Components

- `ListOfSomething` (in `List.js`): component purpose and main functionality
- `GreatButton` (in `GreatButton.js`): component purpose and main functionality
- ...

(only _main_ components, minor ones may be skipped)

## Screenshot

![Screenshot](./img/screenshot.jpg)

## Users Credentials

- username, password (plus any other requested info)
- username, password (plus any other requested info)
