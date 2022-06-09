# Exam #12345: "Exam Title"
## Student: s295316 Zanella Simone 

## React Client Application Routes

- Route `/`: page content and purpose
- Route `/something/:param`: page content and purpose, param specification
- ...

## API Server

HTTP Method: GET \
URL: `/api/courses`\
Description: Retrieve all courses stored in DB\
Sample request body: _None_\
Sample response: `200 OK`\
Sample response body:

```
[
    {
        "code": "02GOLOV",
        "name": "Architetture dei sistemi di elaborazione",
        "credits": 12,
        "maxStudents": null,
        "incompatibleWith": [
            "02LSEOV"
        ],
        "preparatoryCourse": null
    },
    {
        "code": "02LSEOV",
        "name": "Computer architectures",
        "credits": 12,
        "maxStudents": null,
        "incompatibleWith": [
            "02GOLOV"
        ],
        "preparatoryCourse": null
    },
    {
        "code": "01SQJOV",
        "name": "Data Science and Database Technology",
        "credits": 8,
        "maxStudents": null,
        "incompatibleWith": [
            "01SQMOV"
        ],
        "preparatoryCourse": null
    },
    {
        "code": "01SQMOV",
        "name": "Data Science e Tecnologie per le Basi di Dati ",
        "credits": 8,
        "maxStudents": null,
        "incompatibleWith": [
            "01SQJOV",
            "01SQLOV"
        ],
        "preparatoryCourse": null
    },
    {
        "code": "01SQLOV",
        "name": "Database systems",
        "credits": 8,
        "maxStudents": null,
        "incompatibleWith": [
            "01SQJOV",
            "01SQMOV"
        ],
        "preparatoryCourse": null
    },
    {
        "code": "01OTWOV",
        "name": "Computer network technologies and services",
        "credits": 6,
        "maxStudents": 3,
        "incompatibleWith": [
            "02KPNOV"
        ],
        "preparatoryCourse": null
    },
    {
        "code": "02KPNOV",
        "name": "Tecnologie e servizi di rete ",
        "credits": 6,
        "maxStudents": 3,
        "incompatibleWith": [
            "01OTWOV"
        ],
        "preparatoryCourse": null
    },
    {
        "code": "01TYMOV",
        "name": "Information systems security services",
        "credits": 12,
        "maxStudents": null,
        "incompatibleWith": [
            "01UDUOV"
        ],
        "preparatoryCourse": null
    },
    {
        "code": "01UDUOV",
        "name": "Sicurezza dei sistemi informativi",
        "credits": 12,
        "maxStudents": null,
        "incompatibleWith": [
            "01TYMOV"
        ],
        "preparatoryCourse": null
    },
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
{
    "code": "01OTWOV",
    "name": "Computer network technologies and services",
    "credits": 6,
    "maxStudents": 3,
    "incompatibleWith": [
        "02KPNOV"
    ],
    "preparatoryCourse": null
}
```

Error responses: `500 Internal Server Error`, `422 Unprocessable entity`, `404 Not found`

HTTP Method: GET \
URL: `/api/students/courses`\
Description: Retrieve courses stored in DB according to the user logged\
Sample request body: _None_\
Sample response: `200 OK`\
Sample response body:

```
[
    {
        "code": "01URSPD",
        "name": "Internet Video Streaming",
        "credits": 6,
        "maxStudents": 2,
        "incompatibleWith": [],
        "preparatoryCourse": null
    },
    {
        "code": "01NYHOV",
        "name": "System and device programming",
        "credits": 6,
        "maxStudents": 3,
        "incompatibleWith": [
            "02GRSOV"
        ],
        "preparatoryCourse": null
    },
    {
        "code": "01TXYOV",
        "name": "Web Applications I",
        "credits": 6,
        "maxStudents": 3,
        "incompatibleWith": [
            "01UDFOV"
        ],
        "preparatoryCourse": null
    },
    {
        "code": "01TYMOV",
        "name": "Information systems security services",
        "credits": 12,
        "maxStudents": null,
        "incompatibleWith": [
            "01UDUOV"
        ],
        "preparatoryCourse": null
    },
    {
        "code": "02LSEOV",
        "name": "Computer architectures",
        "credits": 12,
        "maxStudents": null,
        "incompatibleWith": [
            "02GOLOV"
        ],
        "preparatoryCourse": null
    },
    ...
]
```

Error responses: `500 Internal Server Error`

HTTP Method: GET \
URL: `/api/students/compatibleCourses`\
Description: Retrieve courses compatible with the current study plan of a student logged in\
Sample request body: _None_\
Sample response: `200 OK`\
Sample response body:

```
[
    {
        "code": "01URSPD",
        "name": "Internet Video Streaming",
        "credits": 6,
        "maxStudents": 2,
        "incompatibleWith": [],
        "preparatoryCourse": null
    },
    {
        "code": "01NYHOV",
        "name": "System and device programming",
        "credits": 6,
        "maxStudents": 3,
        "incompatibleWith": [
            "02GRSOV"
        ],
        "preparatoryCourse": null
    },
    {
        "code": "01TXYOV",
        "name": "Web Applications I",
        "credits": 6,
        "maxStudents": 3,
        "incompatibleWith": [
            "01UDFOV"
        ],
        "preparatoryCourse": null
    },
    {
        "code": "01TYMOV",
        "name": "Information systems security services",
        "credits": 12,
        "maxStudents": null,
        "incompatibleWith": [
            "01UDUOV"
        ],
        "preparatoryCourse": null
    },
    {
        "code": "02LSEOV",
        "name": "Computer architectures",
        "credits": 12,
        "maxStudents": null,
        "incompatibleWith": [
            "02GOLOV"
        ],
        "preparatoryCourse": null
    },
    ...
]
```

Error responses: `500 Internal Server Error`

HTTP Method: POST \
URL: `/api/students/courses` \
Description: Add a new course to the study plan \
Sample request body:

```
{courseCode:'04GSPOV'}
```

Sample response: `201 Created` \
Sample response body: _None_ \
Error responses: `503 Service unavailable`

HTTP Method: DELETE \
URL: `/api/students/courses/:code`\
Description: Delete a course from student study plan\
Sample request body: _None_\
Sample response: `204 No Content`\
Sample response body: _None_\
Error responses: `503 Service Unavailable`

HTTP Method: POST \
URL: `/api/login`\
Description: Authenticate a user\
Sample request body:

```
{username:'s295316@studenti.polito.it', password:'password'}
```

Sample response: `201 Created`\
Sample response body: _None_\
Error responses: `503 Service unavailable`

HTTP Method: DELETE \
URL: `/api/logout`\
Description: Log out user\
Sample request body: _None_\
Sample response: `204 No Content`\
Sample response body: _None_\
Error responses: `503 Service Unavailable`

HTTP Method: GET \
URL: `/api/sessions/current`\
Description: Retrieve user session if still up\
Sample request body: _None_\
Sample response: `200 OK`\
Sample response body:

```
{email: 's295316@studenti.polito.it', name: 'Simone', surname: 'Zanella', fulltime: 1}
```

Error responses: `500 Internal Server Error`, `401 Not authenticated`


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
