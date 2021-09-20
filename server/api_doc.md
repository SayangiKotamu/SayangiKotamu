# SayangiKotamu API

SayangiKotamu is a super-app city platform designed as a one-stop service to help Indonesians solve their daily problems. With SayangiKotamu, citizens and the government can synergize effectively and efficiently to solve city problems digitally. SayangiKotamu is built with the spirit of supporting industry 4.0 and grew human resources who are ready to contribute to the success of the city from various aspects. #LiveSmart

## API References

### USERS

#### Register user

```http
  POST /register
```

| Body       | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `NIK`      | `string` | **Required**. Your NIK      |
| `fullname` | `string` | **Required**. Your fullname |
| `email`    | `string` | **Required**. Your email    |
| `password` | `string` | **Required**. Your password |
| `kota`     | `string` | **Required**. Your kota     |
| `ktp`      | `string` | **Required**. Your ktp      |

_Response (201 - Created)_

```
{
    "_id": <given id by system>,
    "NIK": <your NIK>,
    "fullname": <your fullname>,
    "email": <your email>,
    "password": <your password>,
    "kota": <your kota>,
    "isActive": false
}
```

_Response (400 - Validate Error)_

```
{
    "message": [
       <validation errors>
    ]
}
```

_Response (400 - Duplicate Email)_

```
{
    "message": "Email is already registered"
}
```

_Response (400 - Duplicate NIK)_

```
{
    "message": "NIK is already registered"
}
```

---

#### Login user

```http
  POST /login
```

| Body       | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `email`    | `string` | **Required**. Your email    |
| `password` | `string` | **Required**. Your password |

_Response (200 - Ok)_

```
{
    "access_token": <your access_token>
}
```

_Response (401 - Unauthorized)_

```
{
    "message": "Email / Password is wrong"
}
```

_Response (401 - ID not verified)_

```
{
    "message": "Id is not verified"
}
```

_Response (401 - No Access Token)_

```
{
    "message": "You do not have aceess token"
}
```

_Response (400 - Email is already activated)_

```
{
    "message": "You have already activate your email"
}
```

---

#### Activate email

```http
  PATCH /activateEmail/:activate_token
```

| Parameter        | Type     | Description                       |
| :--------------- | :------- | :-------------------------------- |
| `activate_token` | `string` | **Required**. Your activate token |

_Response (200 - Ok)_

```
{
    "message": "Your email has been activated"
}
```

_Response (400 - Already activate email)_

```
{
    "message": "You have already activate your email"
}
```

_Response (401 - Invalid access token)_

```
{
    "message": "Invalid access token"
}
```

---

### DINAS

#### Register dinas

```http
  POST /dinas/register
```

| Body       | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `email`    | `string` | **Required**. Your email    |
| `password` | `string` | **Required**. Your password |
| `name`     | `string` | **Required**. Your name     |

_Response (201 - Created)_

```
{
    "_id": <given id by system>,
    "name": <your name>,
    "email": <your email>,
    "role": <given role by system>,
    "NID": <given NID by system>
}
```

_Response (400 - Validate Error)_

```
{
    "message": [
       <validation errors>
    ]
}
```

_Response (400 - Duplicate Email)_

```
{
    "message": "Email is already registered"
}
```

---

#### Login dinas

```http
  POST /dinas/login
```

| Body       | Type     | Description                 |
| :--------- | :------- | :-------------------------- |
| `email`    | `string` | **Required**. Your email    |
| `password` | `string` | **Required**. Your password |

_Response (200 - Ok)_

```
{
    "accessToken": <your access_token>,
    "email": <your email>
    "id": <your id>
}
```

_Response (401 - Unauthorized)_

```
{
    "message": "Email / Password is wrong"
}
```

_Response (401 - ID not verified)_

```
{
    "message": "Id is not verified"
}
```

_Response (401 - No Access Token)_

```
{
    "message": "You do not have aceess token"
}

```

---

#### Get all dinas

```http
  GET /dinas
```

_Response (200 - Ok)_

```
[
    {
        "_id": "61469eb1e31c5469ea2b970e",
        "name": "dinas pengamanan",
        "email": "dinaspengamanan@test.com",
        "role": "dinas",
        "reports": [
            {
                "_id": "6146d2d9623da83df10b566b",
                "title": "Pembunuhan",
                "user": "61469e4d4579b4fd616f9519",
                "status": "diterima",
                "description": "Dijalan margonda ada pembunuhan",
                "issuedDate": "2021-09-19T06:04:09.437Z",
                "location": "depok",
                "lat": -6.372639,
                "long": 106.833,
                "picture": null,
                "upVote": 0,
                "downVote": 0,
                "category": "6146a805efd3dd26a59b8b69",
                "dinas": "61469eb1e31c5469ea2b970e"
            },
            {
                "_id": "6146d38255f76761aea24419",
                "title": "Pembunuhan",
                "user": "61469e4d4579b4fd616f9519",
                "status": "diterima",
                "description": "Dijalan margonda ada pembunuhan",
                "issuedDate": "2021-09-19T06:06:58.815Z",
                "location": "depok",
                "lat": -6.372639,
                "long": 106.833,
                "picture": null,
                "upVote": 0,
                "downVote": 0,
                "category": "6146a805efd3dd26a59b8b69",
                "dinas": "61469eb1e31c5469ea2b970e"
            },
            {
                "_id": "6146e6939efaab5b033d843a",
                "title": "Pembunuhan",
                "user": "61469e4d4579b4fd616f9519",
                "status": "diproses",
                "description": "Dijalan margonda ada pembunuhan",
                "issuedDate": "2021-09-19T07:28:19.724Z",
                "location": "depok",
                "lat": -6.372639,
                "long": 106.833,
                "picture": null,
                "upVote": 0,
                "downVote": 0,
                "category": "6146a805efd3dd26a59b8b69",
                "dinas": "61469eb1e31c5469ea2b970e",
                "finishedDate": "null"
            }
        ],
        "aspirations": [
            {
                "_id": "6146c3af555f32bb430c58c7",
                "title": "test aspiration",
                "description": "ini hanya descript aspiration",
                "type": "kritik",
                "user": "61469e4d4579b4fd616f9519",
                "dinas": "61469eb1e31c5469ea2b970e"
            },
            {
                "_id": "6146c4aaf32729c3e7becf45",
                "title": "test aspiration2",
                "description": "ini hanya descript aspiration",
                "type": "kritik",
                "user": "61469e4d4579b4fd616f9519",
                "dinas": "61469eb1e31c5469ea2b970e"
            },
            {
                "_id": "6146e67b9efaab5b033d8430",
                "title": "test aspiration2",
                "description": "ini hanya descript aspiration",
                "type": "kritik",
                "user": "61469e4d4579b4fd616f9519",
                "dinas": "61469eb1e31c5469ea2b970e"
            }
        ],
        "announcments": [],
        "NID": "dnpn61469eb1e31c5469ea2b970e"
    },
    {
        "_id": "61469ec0e31c5469ea2b9712",
        "name": "dinas perhubungan",
        "email": "dinasperhubungan@test.com",
        "role": "dinas",
        "reports": [],
        "aspirations": [],
        "announcments": [],
        "NID": "dnpr61469ec0e31c5469ea2b9712"
    },
    {
        "_id": "61469ed8e31c5469ea2b9716",
        "name": "dinas kesehatan",
        "email": "dinaskesehatan@test.com",
        "role": "dinas",
        "reports": [],
        "aspirations": [],
        "announcments": [],
        "NID": "dnks61469ed8e31c5469ea2b9716"
    },
    {
        "_id": "6147181db667926caa5f87a0",
        "name": "dinas test",
        "email": "dinastest@test.com",
        "role": "dinas",
        "reports": [],
        "aspirations": [],
        "announcments": [],
        "NID": "dnts6147181db667926caa5f87a0"
    },
    ...
]
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

---

### CATEGORIES

#### Get all categories

```http
  GET /dinas/categories
```

| access_token   | Type     | Description                      |
| :------------- | :------- | :------------------------------- |
| `access_token` | `string` | **Required**. Dinas access token |

_Response (200 - Ok)_

```
[
    {
        "_id": "6146a7fcefd3dd26a59b8b66",
        "name": "Masalah Lingkungan",
        "slug": "masalah_lingkungan",
        "reports": [],
        "__v": 0
    },
    {
        "_id": "6146a805efd3dd26a59b8b69",
        "name": "Masalah Kriminal",
        "slug": "masalah_kriminal",
        "reports": [
            {
                "_id": "6146d2d9623da83df10b566b",
                "title": "Pembunuhan",
                "user": "61469e4d4579b4fd616f9519",
                "status": "diterima",
                "description": "Dijalan margonda ada pembunuhan",
                "issuedDate": "2021-09-19T06:04:09.437Z",
                "location": "depok",
                "lat": -6.372639,
                "long": 106.833,
                "picture": null,
                "upVote": 0,
                "downVote": 0,
                "category": "6146a805efd3dd26a59b8b69",
                "dinas": "61469eb1e31c5469ea2b970e"
            },
            {
                "_id": "6146d38255f76761aea24419",
                "title": "Pembunuhan",
                "user": "61469e4d4579b4fd616f9519",
                "status": "diterima",
                "description": "Dijalan margonda ada pembunuhan",
                "issuedDate": "2021-09-19T06:06:58.815Z",
                "location": "depok",
                "lat": -6.372639,
                "long": 106.833,
                "picture": null,
                "upVote": 0,
                "downVote": 0,
                "category": "6146a805efd3dd26a59b8b69",
                "dinas": "61469eb1e31c5469ea2b970e"
            },
            {
                "_id": "6146e6939efaab5b033d843a",
                "title": "Pembunuhan",
                "user": "61469e4d4579b4fd616f9519",
                "status": "diproses",
                "description": "Dijalan margonda ada pembunuhan",
                "issuedDate": "2021-09-19T07:28:19.724Z",
                "location": "depok",
                "lat": -6.372639,
                "long": 106.833,
                "picture": null,
                "upVote": 0,
                "downVote": 0,
                "category": "6146a805efd3dd26a59b8b69",
                "dinas": "61469eb1e31c5469ea2b970e",
                "finishedDate": "null"
            }
        ],
        "__v": 0
    },
    ...
]
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

_Response (401 - ID not verified)_

```
{
    "message": "Id is not verified"
}
```

_Response (401 - No Access Token)_

```
{
    "message": "You do not have aceess token"
}

```

---

#### Get category by id

```http
  GET /dinas/categories/:id
```

| access_token   | Type     | Description                      |
| :------------- | :------- | :------------------------------- |
| `access_token` | `string` | **Required**. Dinas access token |

| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `id`      | `string` | **Required**. Category id |

_Response (200 - Ok)_

```
{
    "_id": "6146a7fcefd3dd26a59b8b66",
    "name": "Masalah Lingkungan",
    "slug": "masalah_lingkungan",
    "reports": [],
    "__v": 0
}
```

_Response (404 - Not Found)_

```
{
    "message": "Category not found"
}
```

_Response (401 - ID not verified)_

```
{
    "message": "Id is not verified"
}
```

_Response (401 - No Access Token)_

```
{
    "message": "You do not have aceess token"
}

```

---

#### Create category

```http
  POST /dinas/categories
```

| access_token   | Type     | Description                      |
| :------------- | :------- | :------------------------------- |
| `access_token` | `string` | **Required**. Dinas access token |

| Body   | Type     | Description                      |
| :----- | :------- | :------------------------------- |
| `name` | `string` | **Required**. Your category name |

_Response (201 - Created)_

```
{
    "name": <your category name>,
    "slug": <given slug by system>,
    "_id":  <given id by system>
}
```

_Response (400 - Validate Error)_

```
{
    "message": [
       <validation errors>
    ]
}
```

---

#### Edit category

```http
  PUT /dinas/categories/:id
```

| access_token   | Type     | Description                      |
| :------------- | :------- | :------------------------------- |
| `access_token` | `string` | **Required**. Dinas access token |

| Body   | Type     | Description                      |
| :----- | :------- | :------------------------------- |
| `name` | `string` | **Required**. Your category name |

| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `id`      | `string` | **Required**. Category id |

_Response (200 - Ok)_

```
{
    "name": <your category name>,
    "slug": <given slug by system>,
    "_id":  <given id by system>
}
```

_Response (400 - Validate Error)_

```
{
    "message": [
       <validation errors>
    ]
}
```

_Response (404 - Not Found)_

```
{
    "message": "Category not found"
}
```

---

#### Delete category

```http
  Delete /dinas/categories/:id
```

| access_token   | Type     | Description                      |
| :------------- | :------- | :------------------------------- |
| `access_token` | `string` | **Required**. Dinas access token |

| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `id`      | `string` | **Required**. Category id |

_Response (200 - Ok)_

```
{
      "_id": <deleted id>,
    "name": <deleted name>,
    "slug": <deleted slug>,
    "reports": <deleted reports>,
    "__v": 0
}
```

_Response (404 - Not Found)_

```
{
    "message": "Category not found"
}
```

---

### REPORTS FOR USER

#### Get all reports

```http
  GET /reportUser
```

| access_token   | Type     | Description                     |
| :------------- | :------- | :------------------------------ |
| `access_token` | `string` | **Required**. User access token |

_Response (200 - Ok)_

```
[
    {
        "_id": "6146d2d9623da83df10b566b",
        "title": "Pembunuhan",
        "status": "diterima",
        "description": "Dijalan margonda ada pembunuhan",
        "issuedDate": "2021-09-19T06:04:09.437Z",
        "location": "depok",
        "long": 106.833,
        "lat": -6.372639,
        "category": "6146a805efd3dd26a59b8b69",
        "upVote": 0,
        "downVote": 0,
        "user": "61469e4d4579b4fd616f9519",
        "dinas": "61469eb1e31c5469ea2b970e",
        "__v": 0
    },
    {
        "_id": "6146d38255f76761aea24419",
        "title": "Pembunuhan",
        "status": "diterima",
        "description": "Dijalan margonda ada pembunuhan",
        "issuedDate": "2021-09-19T06:06:58.815Z",
        "location": "depok",
        "long": 106.833,
        "lat": -6.372639,
        "category": "6146a805efd3dd26a59b8b69",
        "upVote": 0,
        "downVote": 0,
        "user": "61469e4d4579b4fd616f9519",
        "dinas": "61469eb1e31c5469ea2b970e",
        "__v": 0
    },
   ...
]
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

_Response (401 - ID not verified)_

```
{
    "message": "Id is not verified"
}
```

_Response (401 - No Access Token)_

```
{
    "message": "You do not have aceess token"
}

```

---

#### Get all reports by category

```http
  GET /reportUser/:id
```

| access_token   | Type     | Description                     |
| :------------- | :------- | :------------------------------ |
| `access_token` | `string` | **Required**. User access token |

| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `id`      | `string` | **Required**. Category id |

_Response (200 - Ok)_

```
[
    {
        "_id": "6146e6939efaab5b033d843a",
        "title": "Pembunuhan",
        "status": "diproses",
        "description": "Dijalan margonda ada pembunuhan",
        "issuedDate": "2021-09-19T07:28:19.724Z",
        "location": "depok",
        "long": 106.833,
        "lat": -6.372639,
        "category": "6147309a8478acca5916e44e",
        "upVote": 0,
        "downVote": 0,
        "user": "61469e4d4579b4fd616f9519",
        "dinas": "61469eb1e31c5469ea2b970e",
        "__v": 0,
        "finishedDate": null
    },
    ...
]
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

_Response (401 - ID not verified)_

```
{
    "message": "Id is not verified"
}
```

_Response (401 - No Access Token)_

```
{
    "message": "You do not have aceess token"
}
```

_Response (404 - Not Found)_

```
{
    "message": "Category not found"
}
```

---

#### Create report by user

```http
  POST /reportUser
```

| access_token   | Type     | Description                     |
| :------------- | :------- | :------------------------------ |
| `access_token` | `string` | **Required**. User access token |

| Parameter | Type     | Description               |
| :-------- | :------- | :------------------------ |
| `id`      | `string` | **Required**. Category id |

| Body          | Type     | Description                    |
| :------------ | :------- | :----------------------------- |
| `title`       | `string` | **Required**. Your title       |
| `description` | `string` | **Required**. Your description |
| `location`    | `string` | **Required**. Your location    |
| `lat`         | `string` | **Required**. Your lat         |
| `long`        | `string` | **Required**. Your long        |
| `picture`     | `string` | **Required**. Your picture     |
| `dinas`       | `string` | **Required**. Your dinas       |
| `category`    | `string` | **Required**. Your picture     |

_Response (201 - Created)_

```
{
     "_id": <report id>,
    "title": <report title>,
    "status": "diterima",
    "description": <report description>,
    "issuedDate": <report issuedDate>,
    "location": <report location>,
    "long": <report long>,
    "lat": <report lat>,
    "category": <report category>,
    "upVote": <report upVote>,
    "downVote": <report downVote>,
    "user": <report user>,
    "dinas": <report dinas>,
    "__v": 0
}
```

_Response (400 - Validate Error)_

```
{
    "message": [
       <validation errors>
    ]
}
```

---

#### Up vote the reports

```http
  PATCH /reportUser/up/:id
```

| access_token   | Type     | Description                     |
| :------------- | :------- | :------------------------------ |
| `access_token` | `string` | **Required**. User access token |

| Parameter | Type     | Description             |
| :-------- | :------- | :---------------------- |
| `id`      | `string` | **Required**. Report id |

_Response (200 - Ok)_

```
{
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

_Response (401 - ID not verified)_

```
{
    "message": "Id is not verified"
}
```

_Response (401 - No Access Token)_

```
{
    "message": "You do not have aceess token"
}
```

_Response (404 - Not Found)_

```
{
    "message": "Report not found"
}
```

---

#### Down vote the reports

```http
  PATCH /reportUser/down/:id
```

| access_token   | Type     | Description                     |
| :------------- | :------- | :------------------------------ |
| `access_token` | `string` | **Required**. User access token |

| Parameter | Type     | Description             |
| :-------- | :------- | :---------------------- |
| `id`      | `string` | **Required**. Report id |

_Response (200 - Ok)_

```
{
    "acknowledged": true,
    "modifiedCount": 1,
    "upsertedId": null,
    "upsertedCount": 0,
    "matchedCount": 1
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

_Response (401 - ID not verified)_

```
{
    "message": "Id is not verified"
}
```

_Response (401 - No Access Token)_

```
{
    "message": "You do not have aceess token"
}
```

_Response (404 - Not Found)_

```
{
    "message": "Report not found"
}
```

---

### REPORTS FOR DINAS

#### Get all reports

```http
  GET /dinas/reports
```

| access_token   | Type     | Description                      |
| :------------- | :------- | :------------------------------- |
| `access_token` | `string` | **Required**. Dinas access token |

| Query      | Type     | Description                                             |
| :--------- | :------- | :------------------------------------------------------ |
| `stater`   | `string` | **If needed**. Report status(diterima/diproses/selesai) |
| `category` | `string` | **If needed**. Category status(:id)                     |

_Response (200 - Ok)_

```
[
    {
        "_id": "6146d2d9623da83df10b566b",
        "title": "Pembunuhan",
        "status": "diterima",
        "description": "Dijalan margonda ada pembunuhan",
        "issuedDate": "2021-09-19T06:04:09.437Z",
        "location": "depok",
        "long": 106.833,
        "lat": -6.372639,
        "category": "6146a805efd3dd26a59b8b69",
        "upVote": 1,
        "downVote": 1,
        "user": "61469e4d4579b4fd616f9519",
        "dinas": "61469eb1e31c5469ea2b970e",
        "__v": 0
    },
    {
        "_id": "6146d38255f76761aea24419",
        "title": "Pembunuhan",
        "status": "diterima",
        "description": "Dijalan margonda ada pembunuhan",
        "issuedDate": "2021-09-19T06:06:58.815Z",
        "location": "depok",
        "long": 106.833,
        "lat": -6.372639,
        "category": "6146a805efd3dd26a59b8b69",
        "upVote": 0,
        "downVote": 0,
        "user": "61469e4d4579b4fd616f9519",
        "dinas": "61469eb1e31c5469ea2b970e",
        "__v": 0
    },
    ...
]
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

_Response (401 - ID not verified)_

```
{
    "message": "Id is not verified"
}
```

_Response (401 - No Access Token)_

```
{
    "message": "You do not have aceess token"
}
```

_Response (404 - Not Found)_

```
{
    "message": "Report not found"
}
```

---

#### Get report by id

```http
  GET /dinas/reports/:id
```

| access_token   | Type     | Description                      |
| :------------- | :------- | :------------------------------- |
| `access_token` | `string` | **Required**. Dinas access token |

| Parameter | Type     | Description             |
| :-------- | :------- | :---------------------- |
| `id`      | `string` | **Required**. Report id |

_Response (200 - Ok)_

```
{
    "_id": "6146d2d9623da83df10b566b",
    "title": "Pembunuhan",
    "status": "diterima",
    "description": "Dijalan margonda ada pembunuhan",
    "issuedDate": "2021-09-19T06:04:09.437Z",
    "location": "depok",
    "long": 106.833,
    "lat": -6.372639,
    "category": "6146a805efd3dd26a59b8b69",
    "upVote": 1,
    "downVote": 1,
    "user": "61469e4d4579b4fd616f9519",
    "dinas": "61469eb1e31c5469ea2b970e",
    "__v": 0
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

_Response (401 - ID not verified)_

```
{
    "message": "Id is not verified"
}
```

_Response (401 - No Access Token)_

```
{
    "message": "You do not have aceess token"
}
```

_Response (404 - Not Found)_

```
{
    "message": "Report not found"
}
```

---

#### Change report status

```http
  PATCH /dinas/reports/:id
```

| access_token   | Type     | Description                      |
| :------------- | :------- | :------------------------------- |
| `access_token` | `string` | **Required**. Dinas access token |

| Parameter | Type     | Description             |
| :-------- | :------- | :---------------------- |
| `id`      | `string` | **Required**. Report id |

| Body     | Type     | Description                                     |
| :------- | :------- | :---------------------------------------------- |
| `status` | `string` | **Required**. Status(diterima/diproses/selesai) |

_Response (200 - Ok)_

```
{
    "_id": <report id>,
    "title": <report title>,
    "status": <updated report STATUS>,
    "description": <report description>,
    "issuedDate": <report issuedDate>,
    "location": <report location>,
    "long": <report long>,
    "lat": <report lat>,
    "category": <report category>,
    "upVote": <report upVote>,
    "downVote": <report downVote>,
    "user": <report user>,
    "dinas": <report dinas>,
    "__v": 0
    "finishedDate": <report finishedDate>
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

_Response (401 - ID not verified)_

```
{
    "message": "Id is not verified"
}
```

_Response (401 - No Access Token)_

```
{
    "message": "You do not have aceess token"
}
```

_Response (404 - Not Found)_

```
{
    "message": "Report not found"
}
```

---

#### Delete report status

```http
  DELETE /dinas/reports/:id
```

| access_token   | Type     | Description                      |
| :------------- | :------- | :------------------------------- |
| `access_token` | `string` | **Required**. Dinas access token |

| Parameter | Type     | Description             |
| :-------- | :------- | :---------------------- |
| `id`      | `string` | **Required**. Report id |

_Response (200 - Ok)_

```
{
    "_id": <deleted report id>,
    "title": <deleted report title>,
    "status": <deleted report STATUS>,
    "description": <deleted report description>,
    "issuedDate": <deleted report issuedDate>,
    "location": <deleted report location>,
    "long": <deleted report long>,
    "lat": <deleted report lat>,
    "category": <deleted report category>,
    "upVote": <deleted report upVote>,
    "downVote": <deleted report downVote>,
    "user": <deleted report user>,
    "dinas": <deleted report dinas>,
    "__v": 0
    "finishedDate": <deleted report finishedDate>
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

_Response (401 - ID not verified)_

```
{
    "message": "Id is not verified"
}
```

_Response (401 - No Access Token)_

```
{
    "message": "You do not have aceess token"
}
```

_Response (404 - Not Found)_

```
{
    "message": "Report not found"
}
```

---

### ASPIRATIONS FOR USER

#### Get all aspirations

```http
  GET /aspirations
```

| access_token   | Type     | Description                     |
| :------------- | :------- | :------------------------------ |
| `access_token` | `string` | **Required**. User access token |

_Response (200 - Ok)_

```
[
    {
        "_id": "6146c3af555f32bb430c58c7",
        "title": "test aspiration",
        "description": "ini hanya descript aspiration",
        "type": "kritik",
        "user": "61469e4d4579b4fd616f9519",
        "dinas": "61469eb1e31c5469ea2b970e",
        "__v": 0
    },
    {
        "_id": "6146c4aaf32729c3e7becf45",
        "title": "test aspiration2",
        "description": "ini hanya descript aspiration",
        "type": "saran",
        "user": "61469e4d4579b4fd616f9519",
        "dinas": "61469eb1e31c5469ea2b970e",
        "__v": 0
    },
    ...
]
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

_Response (401 - ID not verified)_

```
{
    "message": "Id is not verified"
}
```

_Response (401 - No Access Token)_

```
{
    "message": "You do not have aceess token"
}
```

---

#### Get aspiration by id

```http
  GET /aspirations/:id
```

| access_token   | Type     | Description                     |
| :------------- | :------- | :------------------------------ |
| `access_token` | `string` | **Required**. User access token |

| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `id`      | `string` | **Required**. Aspiration id |

_Response (200 - Ok)_

```
{
    "_id": "6146c4aaf32729c3e7becf45",
    "title": "test aspiration2",
    "description": "ini hanya descript aspiration",
    "type": "kritik",
    "user": "61469e4d4579b4fd616f9519",
    "dinas": "61469eb1e31c5469ea2b970e",
    "__v": 0
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

_Response (401 - ID not verified)_

```
{
    "message": "Id is not verified"
}
```

_Response (401 - No Access Token)_

```
{
    "message": "You do not have aceess token"
}
```

_Response (404 - Not Found)_

```
{
    "message": "Aspiration not found"
}
```

---

#### Create aspiration

```http
  POST /aspirations
```

| access_token   | Type     | Description                     |
| :------------- | :------- | :------------------------------ |
| `access_token` | `string` | **Required**. User access token |

| Body          | Type     | Description                    |
| :------------ | :------- | :----------------------------- |
| `title`       | `string` | **Required**. Your title       |
| `description` | `string` | **Required**. Your description |
| `type`        | `string` | **Required**. Your type        |
| `dinas`       | `string` | **Required**. Your dinas       |

_Response (201 - Created)_

```
{
    "_id": <given id by system>,
    "title": <your title>,
    "description": <your description>,
    "type": <your type>,
    "user": <your user>,
    "dinas": <your dinas>,
    "__v": 0
}
```

_Response (400 - Validate Error)_

```
{
    "message": [
       <validation errors>
    ]
}
```

_Response (401 - ID not verified)_

```
{
    "message": "Id is not verified"
}
```

_Response (401 - No Access Token)_

```
{
    "message": "You do not have aceess token"
}
```

---

### ASPIRATIONS FOR DINAS

#### Get all aspirations

```http
  GET /dinas/aspirations
```

| access_token   | Type     | Description                      |
| :------------- | :------- | :------------------------------- |
| `access_token` | `string` | **Required**. Dinas access token |

_Response (200 - Ok)_

```
[
    {
        "_id": "6146c3af555f32bb430c58c7",
        "title": "test aspiration",
        "description": "ini hanya descript aspiration",
        "type": "kritik",
        "user": "61469e4d4579b4fd616f9519",
        "dinas": "61469eb1e31c5469ea2b970e",
        "__v": 0
    },
    {
        "_id": "6146c4aaf32729c3e7becf45",
        "title": "test aspiration2",
        "description": "ini hanya descript aspiration",
        "type": "saran",
        "user": "61469e4d4579b4fd616f9519",
        "dinas": "61469eb1e31c5469ea2b970e",
        "__v": 0
    },
    ...
]
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

_Response (401 - ID not verified)_

```
{
    "message": "Id is not verified"
}
```

_Response (401 - No Access Token)_

```
{
    "message": "You do not have aceess token"
}
```

---

#### Get aspiration by id

```http
  GET /dinas/aspirations/:id
```

| access_token   | Type     | Description                      |
| :------------- | :------- | :------------------------------- |
| `access_token` | `string` | **Required**. Dinas access token |

| Parameter | Type     | Description                 |
| :-------- | :------- | :-------------------------- |
| `id`      | `string` | **Required**. Aspiration id |

_Response (200 - Ok)_

```
{
    "_id": "6146c4aaf32729c3e7becf45",
    "title": "test aspiration2",
    "description": "ini hanya descript aspiration",
    "type": "kritik",
    "user": "61469e4d4579b4fd616f9519",
    "dinas": "61469eb1e31c5469ea2b970e",
    "__v": 0
}
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

_Response (401 - ID not verified)_

```
{
    "message": "Id is not verified"
}
```

_Response (401 - No Access Token)_

```
{
    "message": "You do not have aceess token"
}
```

_Response (404 - Not Found)_

```
{
    "message": "Aspiration not found"
}
```

---

### ANNOUNCMENTS FROM DINAS

#### Get all announcments

```http
  GET /dinas/announcments
```

| access_token   | Type     | Description                      |
| :------------- | :------- | :------------------------------- |
| `access_token` | `string` | **Required**. Dinas access token |

_Response (200 - Ok)_

```
[
    {
        "_id": "6147749300ede5dadecfa43f",
        "title": "ini adalah pengumuman lagi 1 test",
        "announcment": "descripsi pengumuman yang akan panjang",
        "date": "2021-09-19T17:34:11.646Z",
        "dinas": "61469eb1e31c5469ea2b970e",
        "__v": 0
    },
    {
        "_id": "6147749300ede5dadecfa43f",
        "title": "ini adalah pengumuman lagi 2 test",
        "announcment": "descripsi pengumuman 2 yang akan panjang",
        "date": "2021-09-19T17:34:11.646Z",
        "dinas": "61469eb1e31c5469ea2b970e",
        "__v": 0
    },
    ...
]
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

_Response (401 - ID not verified)_

```
{
    "message": "Id is not verified"
}
```

_Response (401 - No Access Token)_

```
{
    "message": "You do not have aceess token"
}
```

---

#### Get announcment by id

```http
  GET /dinas/announcments/:id
```

| access_token   | Type     | Description                      |
| :------------- | :------- | :------------------------------- |
| `access_token` | `string` | **Required**. Dinas access token |

| Parameter | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| `id`      | `string` | **Required**. Announcment id |

_Response (200 - Ok)_

```
{
    "_id": "6147749300ede5dadecfa43f",
    "title": "ini adalah pengumuman lagi 1 test",
    "announcment": "descripsi pengumuman yang akan panjang",
    "date": "2021-09-19T17:34:11.646Z",
    "dinas": "61469eb1e31c5469ea2b970e",
    "__v": 0
}
```

_Response (401 - ID not verified)_

```
{
    "message": "Id is not verified"
}
```

_Response (401 - No Access Token)_

```
{
    "message": "You do not have aceess token"
}
```

_Response (404 - Not Found)_

```
{
    "message": "Announcment not found"
}
```

---

#### Create announcment

```http
  POST /dinas/announcments
```

| access_token   | Type     | Description                      |
| :------------- | :------- | :------------------------------- |
| `access_token` | `string` | **Required**. Dinas access token |

| Body          | Type     | Description                    |
| :------------ | :------- | :----------------------------- |
| `title`       | `string` | **Required**. Your title       |
| `announcment` | `string` | **Required**. Your announcment |

_Response (201 - Created)_

```
{
    "_id": <given id by system>,
    "title": <your title>,
    "announcment": <your announcment>,
    "date": <given date by system>,
    "dinas": <your dinas>
    "__v": 0
}
```

_Response (400 - Validate Error)_

```
{
    "message": [
       <validation errors>
    ]
}
```

_Response (401 - ID not verified)_

```
{
    "message": "Id is not verified"
}
```

_Response (401 - No Access Token)_

```
{
    "message": "You do not have aceess token"
}
```

---

#### Edit announcment

```http
  PUT /dinas/announcments/:id
```

| access_token   | Type     | Description                      |
| :------------- | :------- | :------------------------------- |
| `access_token` | `string` | **Required**. Dinas access token |

| Body          | Type     | Description                    |
| :------------ | :------- | :----------------------------- |
| `title`       | `string` | **Required**. Your title       |
| `announcment` | `string` | **Required**. Your announcment |

| Parameter | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| `id`      | `string` | **Required**. Announcment id |

_Response (200 - Ok)_

```
{
    "_id": <given id by system>,
    "title": <your updated title>,
    "announcment": <your updated announcment>,
    "date": <given date by system>,
    "dinas": <your dinas>
    "__v": 0
}
```

_Response (400 - Validate Error)_

```
{
    "message": [
       <validation errors>
    ]
}
```

_Response (401 - ID not verified)_

```
{
    "message": "Id is not verified"
}
```

_Response (401 - No Access Token)_

```
{
    "message": "You do not have aceess token"
}
```

_Response (404 - Not Found)_

```
{
    "message": "Announcment not found"
}
```

---

#### Delete announcment

```http
  DELETE /dinas/announcments/:id
```

| access_token   | Type     | Description                      |
| :------------- | :------- | :------------------------------- |
| `access_token` | `string` | **Required**. Dinas access token |

| Parameter | Type     | Description                  |
| :-------- | :------- | :--------------------------- |
| `id`      | `string` | **Required**. Announcment id |

_Response (200 - Ok)_

```
{
    "_id": id,
    "title": "title"
    "announcment": "announcment"
    "date": date
    "dinas": {dinas}
    "__v": 0
}
```

_Response (401 - ID not verified)_

```
{
    "message": "Id is not verified"
}
```

_Response (401 - No Access Token)_

```
{
    "message": "You do not have aceess token"
}
```

_Response (404 - Not Found)_

```
{
    "message": "Announcment not found"
}
```

---

### ANNOUNCMENTS FROM USER

#### Get all announcments

```http
  GET /announcments
```

| access_token   | Type     | Description                     |
| :------------- | :------- | :------------------------------ |
| `access_token` | `string` | **Required**. User access token |

_Response (200 - Ok)_

```
[
    {
        "_id": "6147749300ede5dadecfa43f",
        "title": "ini adalah pengumuman lagi 1 test",
        "announcment": "descripsi pengumuman yang akan panjang",
        "date": "2021-09-19T17:34:11.646Z",
        "dinas": "61469eb1e31c5469ea2b970e",
        "__v": 0
    },
    {
        "_id": "6147749300ede5dadecfa43f",
        "title": "ini adalah pengumuman lagi 2 test",
        "announcment": "descripsi pengumuman 2 yang akan panjang",
        "date": "2021-09-19T17:34:11.646Z",
        "dinas": "61469eb1e31c5469ea2b970e",
        "__v": 0
    },
    ...
]
```

_Response (500 - Internal Server Error)_

````

### ANNOUNCMENTS FROM USER

#### Get all announcments

```http
  GET /announcments
````

| access_token   | Type     | Description                     |
| :------------- | :------- | :------------------------------ |
| `access_token` | `string` | **Required**. User access token |

_Response (200 - Ok)_

```
[
    {
        "_id": "6147749300ede5dadecfa43f",
        "title": "ini adalah pengumuman lagi 1 test",
        "announcment": "descripsi pengumuman yang akan panjang",
        "date": "2021-09-19T17:34:11.646Z",
        "dinas": "61469eb1e31c5469ea2b970e",
        "__v": 0
    },
    {
        "_id": "6147749300ede5dadecfa43f",
        "title": "ini adalah pengumuman lagi 2 test",
        "announcment": "descripsi pengumuman 2 yang akan panjang",
        "date": "2021-09-19T17:34:11.646Z",
        "dinas": "61469eb1e31c5469ea2b970e",
        "__v": 0
    },
    ...
]
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

_Response (401 - ID not verified)_

```
{
    "message": "Id is not verified"
}
```

_Response (401 - No Access Token)_

```
{
    "message": "You do not have aceess token"
}
```

---

### NOTIFICATIONS

#### Get all notifications

```http
  GET /notifications
```

| access_token   | Type     | Description                     |
| :------------- | :------- | :------------------------------ |
| `access_token` | `string` | **Required**. User access token |

_Response (200 - Ok)_

```
[
  [
    {
        "_id": "6146f037cd375aa55c70a0a3",
        "description": "Laporan kamu dengan nama Pembunuhan sedang ditangani oleh dinas pengamanan",
        "date": "2021-09-19T08:09:27.527Z",
        "user": "61469e4d4579b4fd616f9519",
        "__v": 0
    },
    {
        "_id": "6146f048cd375aa55c70a0ad",
        "description": "Laporan kamu dengan nama Pembunuhan sudah selesai ditangani oleh dinas pengamanan",
        "date": "2021-09-19T08:09:44.784Z",
        "user": "61469e4d4579b4fd616f9519",
        "__v": 0
    },
    ...
]
]
```

_Response (500 - Internal Server Error)_

```
{
  "message": "Internal Server Error"
}
```

_Response (401 - ID not verified)_

```
{
    "message": "Id is not verified"
}
```

_Response (401 - No Access Token)_

```
{
    "message": "You do not have aceess token"
}
```

---
