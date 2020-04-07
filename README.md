# Kanban-Server
https://desolate-ocean-86590.herokuapp.com/


**USER**
-----

**Signup**
----
  Registers new user

* **URL**

  /users/register

* **Method:**

  `POST`
  
*  **URL Params**
    None

* **Body/Form Params**<br>
  `{ "email" : "john_doe@sample.com", "password" : "johndoe1" }`<br>
  **Required**
  - `email` : string
  - `password` : string


* **Success Response:**

  * **Code:** 201 <br />
    **Content:**<br>
    `{
     {
        "id": 9,
        "email": "jose_mourinho@liverpoolfc.uk",
        "location": "-6.132;10.234"
        "password": "$2a$10$7zt.ibh3cp2eBD7pN9AjCuQ5rwmiyQMv7PVFNxq9uS/Qbag3TUHa2",
        "updatedAt": "2020-03-03T11:29:45.084Z",
        "createdAt": "2020-03-03T11:29:45.084Z"
    }
  }`
     

* **Error Responses:**

  * **Code:** 400 VALIDATION ERROR<br />
    **Content:**<br>
    `{
    "message": [
        "EMAIL FORMAT INVALID"
    ]
    }`
    <br>
    **OR**
    `{
    "message": [
        "EMAIL IS TAKEN"
    ]
    }`
    <br>
    **OR**
    `{
    "message": [
        "PASSWORDS MUST BETWEEN 6-16 CHARS"
    ]
    }`

<br>
<hr>
<br>

**Login**
----
  Login user

* **URL**

  /users/login

* **Method:**

  `POST`
  
*  **URL Params**
    None

* **Data Params**
`{ "email" : "john_doe@sample.com", "password" : "johndoe1" }`<br>
  **Required**
  - `email` : string
  - `password` : string


* **Success Response:**

  * **Code:** 200 <br />
    **Content:**<br>
    `{
    "access_token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJjcmlzdGlhbm9fcm9uYWxkb0BsaXZlcnBvb2xmYy51ayIsImlhdCI6MTU4MzIzNzgwOH0.eUjWk-QOFVss77WLfbbqFvt9rKuLNCNk4xEzCSiAdYk"
}`
     

* **Error Responses:**

  * **Code:** 400 WRONG EMAIL/PASSWORD<br />
    **Content:**<br>
    `{
    "message": "WRONG EMAIL/PASSWORD"
    }`
  <br>

  * **Code:** 500 INTERNAL SERVER ERROR<br />
    **Content:**<br>
     `{
    "message": [
        "INTERNAL SERVER ERROR"
    ]
    }`

<br>
<hr>
<br>

**Google Signin**
----
  Login user using Google OAuth

* **URL**

  /users/googleLogin

* **Method:**

  `POST`
  
*  **URL Params**
    None

* **Body/Form Params**<br>
  **Required**
  - GMail Username
  - GMail Passord


* **Success Response:**

  * **Code:** 200 <br />
    **Content:**<br>
    `{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NywiZW1haWwiOiJjcmlzdGlhbm9fcm9uYWxkb0BsaXZlcnBvb2xmYy51ayIsImlhdCI6MTU4MzIzNzgwOH0.eUjWk-QOFVss77WLfbbqFvt9rKuLNCNk4xEzCSiAdYk"
    }`
     
<br>
<hr>
<br>

**Fetch All**
----
  Fetch list of all users

* **URL**

  /users/fetchall

* **Method:**

  `POST`
  
*  **URL Params**
    None

* **Body/Form Params**<br>
    None


* **Success Response:**

  * **Code:** 200 <br />
    **Content:**<br>
    `{
     [
        {
            "id": 4,
            "email": "user3@mail.com",
            "location": "-6.1741;106.8296",
            "createdAt": "2020-03-31T10:44:22.376Z",
            "updatedAt": "2020-03-31T10:44:22.376Z"
        },
        {
            "id": 1,
            "email": "user@mail.com",
            "location": "-6.1741;106.8296",
            "createdAt": "2020-03-30T15:22:08.871Z",
            "updatedAt": "2020-03-30T15:22:08.871Z"
        },
        {
            "id": 2,
            "email": "user1@mail.com",
            "location": "-6.1741;106.8296",
            "createdAt": "2020-03-30T15:22:30.658Z",
            "updatedAt": "2020-03-30T15:22:30.658Z"
        },
        {
            "id": 3,
            "email": "user2@mail.com",
            "location": "-6.1741;106.8296",
            "createdAt": "2020-03-30T15:22:39.148Z",
            "updatedAt": "2020-03-30T15:22:39.148Z"
        },
        {
            "id": 7,
            "email": "user4@mail.com",
            "location": "-6.1741;106.8296",
            "createdAt": "2020-03-31T11:28:04.345Z",
            "updatedAt": "2020-03-31T11:28:04.345Z"
        }
    ]
}`

<br>
<hr>
<br>

**PROJECT**
-----------
<hr>

**Fetch Projects**
----
  Returns a list of all projects where currently logged in user is involved.

* **URL**

  /projects/

* **Method:**

  `GET`
  
*  **URL Params**
    None

* **Body/Form Params**<br>
   None

* **Header Params**<br>
   `access_token`: string (required)

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    <br>
    `{
     [
        {
            "ProjectId": 2,
            "UserId": 1,
            "createdAt": "2020-03-30T15:24:12.209Z",
            "updatedAt": "2020-03-30T15:24:12.209Z",
            "Project": {
                "id": 2,
                "UserId": 1,
                "title": "liwetan"
            },
            "User": {
                "id": 1,
                "email": "user@mail.com",
                "location": "-6.1741;106.8296"
            }
        }
    ]
}`
 
* **Error Responses:**

  * **Code:** 401 UNAUTHORIZED ACCESS <br />
    **Content:** <br>
    `{
      "errors": [
          "jwt expired"
      ]
    }`


  * **Code:** 404 NOT FOUND <br />
    **Content:** 
    <br>
    `{
    "message": [
        "NOT FOUND"
    ]
    }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    <br>
    `{
    "message": [
        "INTERNAL SERVER ERROR"
    ]
    }`

<br>
<hr>
<br>

**Get Project By Id**
----
  Returns a project based on ID

* **URL**

  /projects/:id

* **Method:**

  `GET`
  
*  **URL Params**
    `:id` : integer(required)

* **Header Params**<br>
   `access_token`: string (required)

* **Body/Form Params**<br>
   None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br>
   `{
     [
        {
            "id": 4,
            "title": "khatam quran",
            "description": "surah yasin",
            "status": "pending",
            "due_date": "2020-07-31T00:00:00.000Z",
            "ProjectId": 2,
            "createdAt": "2020-04-03T13:44:00.332Z",
            "updatedAt": "2020-04-03T13:44:00.332Z",
            "Project": {
                "id": 2,
                "UserId": 1,
                "title": "tahlilan",
                "createdAt": "2020-04-03T13:36:38.711Z",
                "updatedAt": "2020-04-03T15:17:09.120Z"
            }
        }
    ]
}`
 
* **Error Responses:**

  * **Code:** 401 UNAUTHORIZED ACCESS <br />
    **Content:** <br>
    `{
      "errors": [
          "jwt expired"
      ]
    }`


  * **Code:** 404 NOT FOUND <br />
    **Content:** <br>
    `{
    "message": "NOT FOUND"
    }`

<br>
<hr>
<br>

**Create Project**
----
  Create project. Current user will automatically be project owner

* **URL**

  /projects/

* **Method:**

  `POST`
  
*  **URL Params**
    None

* **Header Params**<br>
   `access_token`: string (required)

* **Body/Form Params**<br>
  `{ "title" : "Eureka" }`<br>
  **Required**
  - `title` : string

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**<br>
    `{
     [
        {
            "ProjectId": 2,
            "UserId": 1,
            "createdAt": "2020-03-30T15:24:12.209Z",
            "updatedAt": "2020-03-30T15:24:12.209Z",
            "Project": {
                "id": 2,
                "UserId": 1,
                "title": "liwetan"
            },
            "User": {
                "id": 1,
                "email": "user@mail.com",
                "location": "-6.1741;106.8296"
            }
        }
    ]
}`
 
* **Error Responses:**
  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** <br>
    `{
    "message": [
        "TITLE MUST BE FILLED"
    ]
    }`

  * **Code:** 401 UNAUTHORIZED ACCESS <br />
    **Content:** <br>
    `{
      "errors": [
          "jwt expired"
      ]
    }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** <br>
     `{
    "message": [
        "INTERNAL SERVER ERROR"
    ]
    }`
<br>
<hr>
<br>

**Invite**
----
  Assign member into a project.

* **URL**

  /projects/invite

* **Method:**

  `POST`
  
*  **URL Params**
    None

* **Header Params**<br>
   `access_token`: string (required)

* **Body/Form Params**<br>
  `{ "email" : "mail@user.com", "projectId": 2 }`<br>
  **Required**
  - `email` : string
  - `projectId` : integer

* **Success Response:**

  * **Code:** 201 <br />
    **Content:**<br>
    `{
     [
        {
            "id": 3
            "ProjectId": 2,
            "UserId": 4,
            "createdAt": "2020-03-30T15:24:12.209Z",
            "updatedAt": "2020-03-30T15:24:12.209Z",
            "Project": {
                "id": 2,
                "UserId": 4,
                "title": "liwetan"
            },
            "User": {
                "id": 4,
                "email": "user@mail.com",
                "location": "-6.1741;106.8296"
            }
        }
    ]
}`
 
* **Error Responses:**
  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** <br>
    `{
    "message": [
        "DUPLICATE ASSIGNMENT"
    ]
    }`
    <br>

  * **Code:** 401 UNAUTHORIZED ACCESS <br />
    **Content:** <br>
    `{
      "errors": [
          "jwt expired"
      ]
    }`

  * **Code:** 404 NOT FOUND <br />
    **Content:** <br>
     `{
    "message": [
        "NOT FOUND"
    ]
    }`
<br>
<hr>
<br>


**Update Project**
----
  Update project by ID

* **URL**

  /projects/:id

* **Method:**

  `PUT`
  
*  **URL Params**
    `:id` : integer(required)

* **Header Params**<br>
   `access_token`: string (required)

* **Body/Form Params**<br>
  `{ "title" : "Eureka", "userid" : 1 }`<br>
  **Required**
  - `title` : string
  - `userid` : integer

* **Success Response:**

  * **Code:** 201 <br />
    **Content:** <br>
   `{
     [
        {
            "id": 3
            "ProjectId": 2,
            "UserId": 4,
            "createdAt": "2020-03-30T15:24:12.209Z",
            "updatedAt": "2020-03-30T15:24:12.209Z",
            "Project": {
                "id": 2,
                "UserId": 4,
                "title": "liwetan"
            },
            "User": {
                "id": 4,
                "email": "user@mail.com"
            }
        }
    ]
}`
 
* **Error Responses:**

  * **Code:** 401 UNAUTHORIZED ACCESS <br />
    **Content:** <br>
    `{
      "errors": [
          "jwt expired"
      ]
    }`

  * **Code:** 404 NOT FOUND <br />
    **Content:** <br>
    `{
    "message": "NOT FOUND"
    }`

<br>
<hr>
<br>

**Delete Project**
----
  Delete project by Id.

* **URL**

  /tasks/:id

* **Method:**

  `DELETE`
  
*  **URL Params**
    `:id` : integer(required)

* **Header Params**<br>
   `access_token`: string (required)

* **Body/Form Params**<br>
  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
     {
      "PROJECT DROPPED"
    }
}`
 
* **Error Responses:**

  * **Code:** 401 UNAUTHORIZED ACCESS <br />
    **Content:** <br>
    `{
      "errors": [
          "jwt expired"
      ]
    }`

  * **Code:** 404 NOT FOUND <br />
    **Content:** <br>
    `{
    "message": "NOT FOUND"
    }`

<br>
<hr>
<br>



**Fetch Tasks**
----
  Returns a list of all tasks corresponding to a project ID

* **URL**

  /projects/:projectid/tasks/

* **Method:**

  `GET`
  
*  **URL Params**
    `:projectid` : integer (required)

* **Header Params**<br>
   `access_token`: string (required)

* **Body/Form Params**<br>
   None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:**
    <br>
    `{
     [
        {
            "id": 2,
            "title": "beli kurma",
            "category": "pending",
            "ProjectId": 2,
            "createdAt": "2020-03-30T15:52:30.036Z",
            "updatedAt": "2020-03-30T15:52:30.036Z",
            "Project": {
                "id": 2,
                "UserId": 1,
                "title": "liwetan",
                "createdAt": "2020-03-30T15:24:12.186Z",
                "updatedAt": "2020-03-30T15:24:12.186Z"
            }
        },
        {
            "id": 4,
            "title": "cari daun pisang",
            "category": "pending",
            "ProjectId": 2,
            "createdAt": "2020-03-30T15:53:55.352Z",
            "updatedAt": "2020-03-31T08:29:43.647Z",
            "Project": {
                "id": 2,
                "UserId": 1,
                "title": "liwetan",
                "createdAt": "2020-03-30T15:24:12.186Z",
                "updatedAt": "2020-03-30T15:24:12.186Z"
            }
        }
    ]
}`
 
* **Error Responses:**
  * **Code:** 401 UNAUTHORIZED ACCESS <br />
    **Content:** <br>
    `{
      "errors": [
          "jwt expired"
      ]
    }`

  * **Code:** 500 INTERNAL SERVER ERROR <br />
    **Content:** 
    <br>
    `{
    "message": [
        "INTERNAL SERVER ERROR"
    ]
    }`

<br>
<hr>
<br>

**Create Task**
----
  Create a task based on project ID

* **URL**

  /projects/:projectid/tasks/

* **Method:**

  `POST`
  
*  **URL Params**
    `:projectid` : integer (required)

* **Header Params**<br>
   `access_token`: string (required)

* **Body/Form Params**<br>
  **Required**
  - `title` : string

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br>
    `{
     {
        "id": 7,
        "title": "petik tomat",
        "category": "pending",
        "ProjectId": 2,
        "updatedAt": "2020-03-31T16:04:24.344Z",
        "createdAt": "2020-03-31T16:04:24.344Z"
    }
}`
 
* **Error Responses:**
  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** <br>
    `{
      "errors": [
        "TITLE MUST BE FILLED"
      ]   
    }`

  * **Code:** 401 UNAUTHORIZED ACCESS <br />
    **Content:** <br>
    `{
      "errors": [
          "jwt expired"
      ]
    }`

  * **Code:** 404 NOT FOUND <br />
    **Content:** <br>
    `{
    "message": "NOT FOUND"
    }`

<br>
<hr>
<br>

**Update Task**
----
  Update task entry by ID, corresponding to a project's ID

* **URL**

  /projects/:projectid/tasks/:taskid

* **Method:**

  `PUT`
  
*  **URL Params**
  -  `:projectid [integer]`
  -  `:taskid [integer]`

* **Header Params**<br>
   `access_token`: string (required)

* **Body/Form Params**<br>
  **Required**
  - `title` : string
  - `category` : string

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** <br>
    `{
     {
        "id": 7,
        "title": "Eureka",
        "category": "done",
        "due_date": "2020-08-08T00:00:00.000Z",
        "ProjectId": 2,
        "updatedAt": "2020-03-31T16:04:24.344Z",
        "createdAt": "2020-03-31T16:04:24.344Z"
    }
}`
 
* **Error Responses:**
  * **Code:** 400 VALIDATION ERROR <br />
    **Content:** <br>
    `{
      "errors": [
        "TITLE MUST BE FILLED"
      ]   
    }`

  * **Code:** 401 UNAUTHORIZED ACCESS <br />
    **Content:** <br>
    `{
      "errors": [
          "jwt expired"
      ]
    }`

  * **Code:** 404 NOT FOUND <br />
    **Content:** <br>
    `{
    "message": "NOT FOUND"
    }`
<br>
<hr>
<br>

**Delete Task**
----
  Delete to-do entry by Id.

* **URL**

  /projects/:projectid/tasks/:taskid

* **Method:**

  `DELETE`
  
*  **URL Params**
  -  `:projectid [integer]`
  -  `:taskid [integer]`

* **Header Params**<br>
   `access_token`: string (required)

* **Body/Form Params**<br>
  None

* **Success Response:**

  * **Code:** 200 <br />
    **Content:** `{
     "{
      "message": "TASK DROPPED FROM PROJECT"
    }"
}`
 
* **Error Responses:**
  * **Code:** 404 NOT FOUND <br />
    **Content:** <br>
    `{
    "message": "NOT FOUND"
    }`
<br>
<hr>
<br>


