# BackEndTask
## 1.Introduction
This document provides a step-by-step guide for setting up, running, and testing a Node.js server with authentication features. The server facilitates user registration, login, password recovery, and post creation functionalities.
## 2.Prerequisites
Ensure that you have the following prerequisites:

### 2.1 Node.js

### 2.2 npm 

### 2.3 Text Editor or IDE

## 3.Installation

### 3.1 Clone the server repository from the provided URL

### 3.2 Navigate to the project directory

### 3.3 Install project dependencies using npm:
```
npm install
```
      

## 4.Configuration
In order to run the server successfully, you need to configure certain parameters in .env file.

Please follow the steps below to fill in the necessary information:

### 4.1 URL

Set the URL to your MongoDB Atlas URL:
```
// Example in .env
const URL = 'mongodb+srv://<username>:<password>@cluster0.pscuqr8.mongodb.net/'
```
### 4.2 Access and Refresh Tokens

Obtain access and refresh tokens from the authentication provider and replace <YOUR_ACCESS_TOKEN> and <YOUR_REFRESH_TOKEN> in the .env file:
```
// Example in .env
const AccessToken = <YOUR_ACCESS_TOKEN>;
const RefreshToken = <YOUR_REFRESH_TOKEN>;
```
### 4.3 Token, Refresh Token and Link Expiration Times

Configure the expiration times for access token, refresh token, and password link:
```
// Example in .env
const ExpireIn = '10m';
const ExpireInRefresh = '1y';
const LinkExpire = '15m';
```
### 4.4 Email Configuration

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
## 5.Running the Server
Start the server using the following command:
```
npm run dev
```
The server will start and listen on port 3100 for incoming requests.

