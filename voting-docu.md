# Voting APIs Documentation

### Table of Contents 
- [Voting APIs Documentation](#voting-apis-documentation)
    - [Table of Contents](#table-of-contents)
- [Overview](#overview)
- [APIs](#apis)
  - [HTTP verbs](#http-verbs)
  - [HTTP status codes](#http-status-codes)
  - [Environments](#environments)
  - [Context path](#context-path)
  - [Authentication](#authentication)
  - [API's Resources](#apis-resources)
  - [Users](#users)
      - [Sign-in](#sign-in)
      - [Example Request](#example-request)
      - [Example Response](#example-response)
      - [Create a user](#create-a-user)
      - [Example Request](#example-request-1)
      - [Example Response](#example-response-1)
      - [Get user details](#get-user-details)
      - [Example Response](#example-response-2)
      - [Get all user details](#get-all-user-details)
      - [Example Response](#example-response-3)
      - [Get all labels](#get-all-labels)
      - [Example Response](#example-response-4)

# Overview

    This documentation is all about Voting API guide.

# APIs

    Collection of API that provide access to read, write, and update many types of data in Voting

## HTTP verbs

    Voting Service tries to stick as closely as possible to the standard HTTP and REST conventions in its use of HTTP verbs

| Verb   | Usage                                                          |
| ------ | -------------------------------------------------------------- |
| GET    | Used to retrieve a resource                                    |
| POST   | Used to create a new resource                                  |
| PUT    | Used to update an existing resource, including partial updates |
| DELETE | Used to delete an existing resource                            |

## HTTP status codes

    Voting Service tries to stick as closely as possible to the standard HTTP and REST conventions in its use of HTTP status codes

| Status code               | Usage                                                                                         |
| ------------------------- | --------------------------------------------------------------------------------------------- |
| 200 OK                    | The request has succeeded                                                                     |
| 201 Created               | The request has been fulfilled and resulted in a new resource being created                   |
| 400 Bad Request           | The request could not be understood by the server due to malformed syntax                     |
| 401 Unauthorized          | The request requires user authentication                                                      |
| 403 Forbidden             | The server understood the request, but is refusing to fulfill it.                             |
| 404 Not Found             | The requested resource did not exist                                                          |
| 500 Internal Server Error | The server encountered an unexpected condition which prevented it from fulfilling the request |

## Environments

    Voting Service is deployed in multiple environment

| Environment                   | Description                                                                | URL |
| ----------------------------- | -------------------------------------------------------------------------- | --- |
| Development (dev)             | The environment wherein developers test their codes                        | TBD |
| User Acceptance Testing (uat) | The environment wherein clients test the quality assurance tested features | TBD |
| Staging (stg)                 | TBD                                                                        | TBD |
| Production (prod)             | TBD                                                                        | TBD |

## Context path

    Voting Service follows a context path pattern on deployment. The standard context path is as follows /api/{version}

| Code         | Description                | Example |
| ------------ | -------------------------- | ------- |
| code version | The current system version | v1      |

## Authentication

    Voting Service uses Authentication to secure its API. This means you can’t access it directly

| HTTP Header     | Description          | Required |
| --------------- | -------------------- | -------- |
| x-client-id     | credential unique id | true     |
| x-client-secret | credential secret    | true     |
| Authorization   | Authorization Token  | Token    |

## API's Resources

## Users

#### Sign-in

| Method | URL    |
| ------ | ------ |
| POST   | auth/sign-in |

#### Example Request

```json
{   
    "votersIdNumber": "8541-2588-5245-9517",
    "password": "password"
}
```

#### Example Response

```json
{
    "result": {
        "message": "Sign-in success",
        "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Miwidm90ZXJzSWROdW1iZXIiOiI4NTQxLTI1ODgtNTI0NS05NTE3IiwiaWF0IjoxNzM1NTMyMTU5LCJleHAiOjE3MzU2MTg1NTl9.8Z_Uf8jc4SQDLXuO39ynsPGItyKqDdnj2GmlbQy4Wxo"
    }
}
```

#### Create a user

| Method | URL                        |
| ------ | -------------------------- |
| POST   | /user |

#### Example Request

```json
{   
    "userType": 1,
    "firstName": "Azula",
    "middleName": "Rando",
    "lastName": "Subrera",
    "email": "azulasubrera@gmail.com", 
    "mobileNumber": "09259958545", 
    "votersIdNumber": "8541-2588-5245-9517",
    "password": "password"
}
```

#### Example Response

```json
{
    "message": "Success",
    "details": "User created successfully"
}
```

#### Get user details

| Method | URL                        |
| ------ | -------------------------- |
| Get   | /user/{votersIdNumber} | 

#### Example Response

```json
{
    "message": "Success",
    "data": {
        "firstName": "Azula",
        "middleName": "Rando",
        "lastName": "Subrera",
        "email": "azulasubrera@gmail.com",
        "mobileNumber": "09259958545",
        "votersIdNumber": "8541-2588-5245-9517",
        "userType": {
            "id": 1,
            "identifier": "VOTER",
            "text": "Voter"
        }
    }
}
```
#### Get all user details

| Method | URL                        |
| ------ | -------------------------- |
| Get   | /user/?{page}&{size} | 

#### Example Response

```json
{
    "message": "Success",
    "data": [
        {
            "id": 2,
            "firstName": "Azula",
            "middleName": "Rando",
            "lastName": "Subrera",
            "email": "azulasubrera@gmail.com",
            "mobileNumber": "09259958545",
            "votersIdNumber": "8541-2588-5245-9517",
            "userType": {
                "id": 1,
                "identifier": "VOTER",
                "text": "Voter"
            }
        }
    ],
    "page": 1,
    "size": 1,
    "total": 3,
    "pages": 3
}
```
#### Get all labels

| Method | URL                        |
| ------ | -------------------------- |
| Get   | /label/?{page}&{size}&{search} | 

#### Example Response

```json
{
    "message": "Success",
    "data": [
        {
            "id": 1,
            "type": "missionText",
            "identifier": "HOME",
            "text": "Home"
        }
    ],
    "page": 1,
    "size": 1,
    "total": 2,
    "pages": 2
}
```