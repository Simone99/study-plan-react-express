# Exam #1: "StudyPlan"
## Student: s295316 Zanella Simone 

## React Client Application Routes

- Route `/`: shows the user home page and the not-logged user home page.
- Route `/login`: shows the login form, in order to let the user entering his/her credentials.

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

Error responses: `500 Internal Server Error`, `401 Not authenticated`

HTTP Method: POST \
URL: `/api/students/courses` \
Description: Add logged user new study plan \
Sample request body:

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

Sample response: `201 Created` \
Sample response body: _None_ \
Error responses: `503 Service unavailable`, `422 Unprocessable entity`, `401 Not authenticated`

HTTP Method: PUT \
URL: `/api/students`\
Description: Edit logged user study plan category\
Sample request body:

```
{fulltime : true}
```

Sample response: `200 OK` \
Sample response body: _None_ \
Error responses: `503 Service Unavailable`, `422 Unprocessable entity`, `401 Not authenticated`

HTTP Method: DELETE \
URL: `/api/students/courses`\
Description: Delete logged user study plan\
Sample request body: _None_\
Sample response: `204 No Content`\
Sample response body: _None_\
Error responses: `503 Service Unavailable`, `401 Not authenticated`

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

Table `COURSES`
|          CODE          |     NAME     | CREDITS          | MAX_STUDENTS | ENROLLED_STUDENTS | DEPENDENCY |
|:----------------------:|:------------:|------------------|--------------|-------------------|------------|
| VARCHAR(7) PRIMARY KEY | VARCHAR(100) | INTEGER NOT NULL | INTEGER      | INTEGER DEFAULT 0 | VARCHAR(7) |

Table `INCOMPATIBILITIES`
|       COURSE_CODE      | INCOMPATIBLE_COURSE_CODE |
|:----------------------:|:------------------------:|
| VARCHAR(7) PRIMARY KEY | VARCHAR(7) PRIMARY KEY   |

Table `STUDENTS`
|          EMAIL          |         NAME         |        SURNAME       |       PASSWORD       | FULLTIME |
|:-----------------------:|:--------------------:|:--------------------:|:--------------------:|:--------:|
| VARCHAR(50) PRIMARY KEY | VARCHAR(50) NOT NULL | VARCHAR(50) NOT NULL | VARCHAR(64) NOT NULL |  BOOLEAN |

Table `STUDY_PLANS`
|       COURSE_CODE      |      STUDENT_EMAIL      |
|:----------------------:|:-----------------------:|
| VARCHAR(7) PRIMARY KEY | VARCHAR(50) PRIMARY KEY |

Trigger `INCREASE_ENROLLED_STUDENTS`
```
CREATE TRIGGER IF NOT EXISTS INCREASE_ENROLLED_STUDENTS
AFTER INSERT ON STUDY_PLANS
BEGIN
UPDATE COURSES
SET ENROLLED_STUDENTS = ENROLLED_STUDENTS + 1
WHERE CODE = NEW.COURSE_CODE;
END;
```

Trigger `DECREASE_ENROLLED_STUDENTS`
```
CREATE TRIGGER IF NOT EXISTS DECREASE_ENROLLED_STUDENTS
AFTER DELETE ON STUDY_PLANS
BEGIN
UPDATE COURSES
SET ENROLLED_STUDENTS = ENROLLED_STUDENTS - 1
WHERE CODE = OLD.COURSE_CODE;
END;
```

## Main React Components

- `LoggedUserPage` (in `LoggedUserPage.js`): this component has to render and handle the logged user home page. It renders the study plan with all the functionalities like adding a new course to the study plan, delete courses inside the study plan, create a new study plan, delete the existent one, drop all changes and so on.
- `CourseNavBar` (in `CourseNavBar.js`): it represents the top navigation bar where the logout functionality is implemented.
- `CoursesList` (in `CoursesList.js`): it renders a table containing all the information related to all the courses available. Given a logged user, so a study plan, it marks differently all the courses that can't be added in the current study plan.
- `LoginForm` (in `LoginForm.js`): it renders a form to collect user credential in order to perform the login implemented inside the component.
- `StudyPlanList` (in `StudyPlanList.js`): it renders all the needed information about courses inside the current study plan and list them. It marks as selected the courses that have been selected by the user in order to delete them from the study plan.
- `ToastNotification` (in `ToastNotification.js`): minor component which renders a toast notification warning the user on different events happening on the web page.

## Screenshot

![Screenshot](./img/screenshot.jpg)

## Users Credentials

- s295316@studenti.polito.it, password
- s123456@studenti.polito.it, password
- s956325@studenti.polito.it, password
- s462034@studenti.polito.it, password
- s254991@studenti.polito.it, password
