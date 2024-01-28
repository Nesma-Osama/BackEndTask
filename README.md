# BackEndTask
## 1.Introduction
This document provides a step-by-step guide for setting up, running, and testing a Node.js server with authentication features. The server facilitates user registration, login, password recovery, and post creation functionalities.
## 2.Packages
```
2.1 express
2.2 mongoose
2.3 bcrypt
2.4 jsonwebtoken
2.5 dotenv
2.6 nodemailer
```
## 3.Prerequisites
Ensure that you have the following prerequisites:

### 3.1 Node.js

### 3.2 npm 

### 3.3 Text Editor or IDE

## 4.Installation

### 4.1 Clone the server repository from the provided URL

### 4.2 Navigate to the project directory

### 4.3 Install project dependencies using npm:
```
npm install
```
      

## 5.Configuration
In order to run the server successfully, you need to configure certain parameters in .env file.

Please follow the steps below to fill in the necessary information:

### 5.1 URL

Set the URL to your MongoDB Atlas URL:
```
// Example in .env
const URL = 'mongodb+srv://<username>:<password>@cluster0.pscuqr8.mongodb.net/'
```
### 5.2 Access and Refresh Tokens

Obtain access and refresh tokens from the authentication provider and replace <YOUR_ACCESS_TOKEN> and <YOUR_REFRESH_TOKEN> in the .env file:
```
// Example in .env
const AccessToken = <YOUR_ACCESS_TOKEN>;
const RefreshToken = <YOUR_REFRESH_TOKEN>;
```
### 5.3 Token, Refresh Token and Link Expiration Times

Configure the expiration times for access token, refresh token, and password link:
```
// Example in .env
const ExpireIn = '10m';
const ExpireInRefresh = '1y';
const LinkExpire = '15m';
```
### 5.4 Email Configuration

Provide your email address and App password.
```
// `Example in .env
const EmailAddress = 'your.email@example.com';
const AppPassword = 'your_AppPassword';
```

To get the App password, follow these steps:
```
1.Click on your profile picture in the top-right corner.
2.Select "Google Account."
3.In the left-hand menu, click on "Security."
4.Under "Signing in to Google," find the "2-Step Verification" section.
5.Click on "2-Step Verification" to begin the setup process.
6.Follow the on-screen instructions.
7.Take the password and replace AppPassword in .env file with this password
```
## 6.Running the Server
Start the server using the following command:
```
npm run dev
```
The server will start and listen on port 3100 for incoming requests.

## 7.API Endpoints

### 7.1 Register User

Endpoint: /User/SignUp

Method: POST

Request Format:
```
{
  "Name": "string",
  "Email": "string",
  "Password": "string"
}
```
Response Format:
```

{
   "Msg": "Created"
}
```
### 7.2 Login

Endpoint: /User/Login

Method: POST

Request Format:
```
{
  "Email": "string",
  "Password": "string"
}
```
Response Format:
```
{
  "Token": "authentication_token",
  "RdfreshToken":"refresh_authentication_token",
  "Msg": "Logged successfully"
}
```
### 7.3 Forget Password Email

Endpoint: /User/PasswordLink

Method: POST

Request Format:
```
{
  "Email": "string"
}
```
Response Format:
```
{
    "Msg": "The email was sent."
}
```

### 7.4 Change Password

Url: Url in the Email

Method: POST

Request Format:
```
{
"Password:"string"
}
```
Response Format:
```
{
"Msg": "Password is changed successfully"
}

```

### 7.5 Get User Name

Endpoint: /User/GetUser

Method: GET

Request Format:
```
7.5.1 Open Postman
7.5.2 Put URL
7.5.3 Go to the "Headers" section.
7.5.4 Add a new header with the key "Authorization" and the value "Bearer YOUR_ACCESS_TOKEN".
```
Response Format:
```
{
  "Name": "string"
}

```
### 7.6 Refresh Token

Endpoint: /User/RefreshToken

Method: POST

Request Format:
```
{
"RefreshToken":"Refresh_Token"
}
```
Response Format:
```
{
 "Token": "authentication_token",
  "RdfreshToken":"refresh_authentication_token",
  "Msg": "Generate token successfully"
}

```

### 7.7 Create Posts

Endpoint: /Post/Create

Method: POST

Request Format:
```
7.7.1 Open Postman
7.7.2 Put URL
7.7.3 Go to the "Headers" section.
7.7.4 Add a new header with the key "Authorization" and the value "Bearer YOUR_ACCESS_TOKEN".
7.7.5 Go to the "Body" section.
7.7.6 Put this body:
  {
        "Title": "string",
        "Description": "string"
   }
``````
Response Format:
```
{
   "Msg": "Created successfully"
}
```
### 7.8 Get Posts

Endpoint: /Post/Get

Method: GET

Request Format:
```
7.8.1 Open Postman
7.8.2 Put URL
7.8.3 Go to the "Headers" section.
7.8.4 Add a new header with the key "Authorization" and the value "Bearer YOUR_ACCESS_TOKEN".
``````
Response Format:
```
{
    {
        "_id": "string",
        "Title": "string",
        "Description": "string",
        "UserId": "string",
        "__v": 0
    }
}
```
## 8.Testing

Use your preferred testing tool (e.g., Postman) to test the API endpoints by sending requests as per the specified formats

## 9.Conclusion
You have successfully set up, run, and tested the Node.js server with authentication features.
